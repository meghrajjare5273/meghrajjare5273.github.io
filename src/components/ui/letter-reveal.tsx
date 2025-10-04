"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LetterRevealProps {
  text: string;
  images: React.ReactNode[];
  className?: string;
  imageScale?: number;
}

const LetterReveal = ({
  text,
  images,
  className = "",
  imageScale = 1.5,
}: LetterRevealProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const letters = text.split("");

  return (
    <h1
      className={[
        "relative inline-block",
        "font-display font-bold tracking-tight",
        "text-7xl md:text-8xl lg:text-[12rem] xl:text-[14rem]",
        "select-none",
        "text-black",
        className,
      ].join(" ")}
    >
      {letters.map((char, index) => {
        const imageIndex = index % images.length;
        const isHovered = hoveredIndex === index;

        return (
          <span
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative inline-block"
            style={{
              zIndex: isHovered ? 50 : 1,
            }}
          >
            {/* The letter itself */}
            <span className="relative z-10 inline-block">
              {char === " " ? "\u00A0" : char}
            </span>

            {/* The image overlay on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 15 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{
                    transform: `scale(${imageScale})`,
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    {images[imageIndex]}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </span>
        );
      })}
    </h1>
  );
};

export { LetterReveal };
