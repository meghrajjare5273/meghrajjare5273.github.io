// Menu-Component.tsx
"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const cn = (...arr: Array<string | false | null | undefined>) =>
  arr.filter(Boolean).join(" ");

// Update the navigationItems array in Menu-Component.tsx to match your Navbar structure:
const navigationItems = [
  { name: "Home", href: "#", description: "Start here" },
  { name: "About", href: "#", description: "Who I am" },
  { name: "Projects", href: "#", description: "What I build" },
  { name: "Experience", href: "#", description: "Where I worked" },
  { name: "Education", href: "#", description: "What I learned" },
  { name: "Writing", href: "#", description: "What I think" },
  { name: "Contact", href: "#", description: "Let's talk" },
];

const STAGGER = 0.035;

export const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
}> = ({ children, className, center = false }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const letters = children.split("");

  const { contextSafe } = useGSAP(
    () => {
      // Set initial state for the bottom row
      gsap.set(".letter-bottom", { y: "100%" });
    },
    { scope: containerRef }
  );

  const handleMouseEnter = contextSafe(() => {
    gsap.to(".letter-top", {
      y: "-100%",
      duration: 0.4,
      ease: "power2.inOut",
      stagger: {
        each: STAGGER,
        from: center ? "center" : "start",
      },
      overwrite: true,
    });

    gsap.to(".letter-bottom", {
      y: "0%",
      duration: 0.4,
      ease: "power2.inOut",
      stagger: {
        each: STAGGER,
        from: center ? "center" : "start",
      },
      overwrite: true,
    });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(".letter-top", {
      y: "0%",
      duration: 0.4,
      ease: "power2.inOut",
      stagger: {
        each: STAGGER,
        from: center ? "center" : "start",
      },
      overwrite: true,
    });

    gsap.to(".letter-bottom", {
      y: "100%",
      duration: 0.4,
      ease: "power2.inOut",
      stagger: {
        each: STAGGER,
        from: center ? "center" : "start",
      },
      overwrite: true,
    });
  });

  return (
    <span
      ref={containerRef}
      className={cn("relative block overflow-hidden cursor-pointer", className)}
      style={{ lineHeight: 0.75 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={children}
    >
      {/* Top Row (Initially Visible) */}
      <div>
        {letters.map((l, i) => (
          <span key={`top-${i}`} className="letter-top inline-block relative">
            {l === " " ? "\u00A0" : l}
          </span>
        ))}
      </div>

      {/* Bottom Row (Initially Hidden below) */}
      <div className="absolute inset-0">
        {letters.map((l, i) => (
          <span
            key={`bot-${i}`}
            className="letter-bottom inline-block relative"
          >
            {l === " " ? "\u00A0" : l}
          </span>
        ))}
      </div>
    </span>
  );
};

export const Skiper58: React.FC<{ className?: string }> = ({ className }) => (
  <ul
    className={cn(
      "flex min-h-full w-full flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl px-7 py-3 backdrop-blur-sm",
      className
    )}
  >
    {navigationItems.map((item, index) => (
      <li className="relative flex flex-col items-center" key={index}>
        <a
          href={item.href}
          className="group relative block cursor-pointer select-none"
          aria-label={item.name}
        >
          <TextRoll
            center
            className="text-4xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em] transition-colors lg:text-5xl"
          >
            {item.name}
          </TextRoll>

          <div className="mt-1 flex items-center justify-center">
            <span className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">
              {item.description}
            </span>
          </div>

          {/* Underline effect - keeping as pure CSS for simple hover states is often cleaner, 
              but could be GSAP'd if complex timing is needed */}
          <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-current transition-all duration-300 group-hover:w-full" />
        </a>
      </li>
    ))}
  </ul>
);
