// src/components/ui/SplitText.tsx
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
  delay?: number;
  stagger?: number;
  animate?: "chars" | "words" | "lines";
  triggerOnScroll?: boolean;
  scrollTriggerOptions?: ScrollTrigger.Vars;
}

export const SplitText: React.FC<SplitTextProps> = ({
  children,
  className = "",
  as: Component = "span",
  delay = 0,
  stagger = 0.02,
  animate = "chars",
  triggerOnScroll = false,
  scrollTriggerOptions,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  const getElements = () => {
    if (!containerRef.current) return [];
    return animate === "chars"
      ? containerRef.current.querySelectorAll(".char")
      : animate === "words"
        ? containerRef.current.querySelectorAll(".word")
        : containerRef.current.querySelectorAll(".line");
  };

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const elements = getElements();
    if (elements.length === 0) return;

    const animateElements = () => {
      hasAnimated.current = true;
      gsap.fromTo(
        elements,
        {
          y: "100%",
          opacity: 0,
          rotateX: -90,
        },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: stagger,
          ease: "power3.out",
          delay: delay,
        },
      );
    };

    if (triggerOnScroll && scrollTriggerOptions) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        ...scrollTriggerOptions,
        onEnter: () => {
          if (!hasAnimated.current) animateElements();
        },
      });
    } else {
      // Small delay to ensure DOM is ready
      setTimeout(animateElements, 50);
    }

    return () => {
      if (triggerOnScroll) {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === containerRef.current) st.kill();
        });
      }
    };
  }, [delay, stagger, animate, triggerOnScroll, scrollTriggerOptions]);

  const splitContent = () => {
    if (animate === "chars") {
      return children.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block"
          style={{
            display: "inline-block",
            transformOrigin: "center bottom",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }

    if (animate === "words") {
      return children.split(" ").map((word, i) => (
        <span key={i} className="word inline-block mr-[0.25em]">
          <span
            className="inline-block"
            style={{ transformOrigin: "center bottom" }}
          >
            {word}
          </span>
        </span>
      ));
    }

    // lines
    return children.split("\n").map((line, i) => (
      <span key={i} className="line block overflow-hidden">
        <span
          className="inline-block"
          style={{ transformOrigin: "center bottom" }}
        >
          {line}
        </span>
      </span>
    ));
  };

  return (
    <Component
      ref={containerRef as any}
      className={`inline-block ${className}`}
      style={{ perspective: "1000px" }}
    >
      {splitContent()}
    </Component>
  );
};
