// src/components/ui/AnimatedButton.tsx
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";

interface AnimatedButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "outline" | "filled";
  showArrow?: boolean;
  className?: string;
  external?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  href,
  onClick,
  children,
  variant = "outline",
  showArrow = false,
  className = "",
  external = false,
}) => {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    const text = textRef.current;
    if (!text) return;

    // Create sliding text effect
    gsap.to(text, {
      y: "-100%",
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    const text = textRef.current;
    if (!text) return;

    gsap.to(text, {
      y: "0%",
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const baseClasses = `
    relative overflow-hidden cursor-pointer
    px-[3vw] md:px-[2vw] py-[1.5vw] md:py-[0.65vw]
    border transition-colors duration-300
    ${
      variant === "outline"
        ? "border-white/60 hover:border-white bg-transparent"
        : "border-white bg-[#242A23] hover:bg-[#2a3229]"
    }
    ${className}
  `;

  const content = (
    <div className="links h-[1rem] md:h-[1.3rem] overflow-hidden flex items-center gap-2">
      <span ref={textRef} className="block">
        <span className="flex items-center gap-2 text-white text-[4vw] md:text-[1.3vw] leading-[1] font-medium uppercase tracking-wide">
          {children}
          {showArrow && <ArrowUpRight className="w-4 h-4" />}
        </span>
      </span>
      <span className="absolute top-full left-0 w-full">
        <span className="flex items-center gap-2 text-white text-[4vw] md:text-[1.3vw] leading-[1] font-medium uppercase tracking-wide">
          {children}
          {showArrow && <ArrowUpRight className="w-4 h-4" />}
        </span>
      </span>
    </div>
  );

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={baseClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </button>
  );
};
