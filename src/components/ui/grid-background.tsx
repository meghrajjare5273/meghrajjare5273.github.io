import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxDotsBackgroundProps {
  className?: string;
  dotCount?: number;
  depth?: number; // parallax depth [0-.5]
}

export const ParallaxDotsBackground: React.FC<ParallaxDotsBackgroundProps> = ({
  className,
  dotCount = 32,
  depth = 0.12,
}) => {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !fieldRef.current
    )
      return;

    const container = fieldRef.current;

    Array.from(container.children).forEach((dot, i) => {
      gsap.to(dot, {
        yPercent: "+=" + (i % 5) * 10 * depth,
        xPercent: "+=" + (i % 7) * 8 * depth,
        duration: 7 + (i % 4) * 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      gsap.to(dot, {
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
        y: "+=" + depth * 18 * ((i % 3) - 1),
        x: "+=" + depth * 14 * ((i % 5) - 2),
        ease: "sine.inOut",
        duration: 1.5,
      });
    });

    return () => gsap.killTweensOf("*");
  }, [dotCount, depth]);

  // Random field layout
  function randomDotStyles(index: number): React.CSSProperties {
    const size = 5 + (index % 3) * 3;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const opacity = 0.12 + (index % 5) * 0.09;

    return {
      left: `${left}%`,
      top: `${top}%`,
      width: size,
      height: size,
      opacity,
      background:
        index % 2
          ? "linear-gradient(120deg,#575757 60%,#cccccc 80%)"
          : "linear-gradient(180deg,#fff 20%,#9a9a9a 99%)",
      borderRadius: "50%",
      position: "absolute",
      pointerEvents: "none",
      filter: "blur(0.3px)",
      boxShadow: "0 0 3px 0.5px #fff9",
      transition: "opacity .3s",
    };
  }

  return (
    <div
      ref={fieldRef}
      className={cn("absolute inset-0 pointer-events-none", className)}
      aria-hidden
    >
      {Array.from({ length: dotCount }).map((_, i) => (
        <div key={i} style={randomDotStyles(i)} />
      ))}
    </div>
  );
};
