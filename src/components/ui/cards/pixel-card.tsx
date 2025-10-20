// src/components/ui/cards/pixel-card.tsx
"use client";

import React from "react";
import { motion } from "motion/react";
import { PixelCanvas } from "@/components/ui/cards/pixel-canvas";

type PixelCardProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: string; // optional background image
  colors?: string[]; // pixel canvas colors
  gap?: number;
  speed?: number;
  className?: string;
  onClick?: () => void;
};

export default function PixelCard({
  eyebrow,
  title,
  description,
  image,
  colors = ["#ffffff", "#f0f0f0", "#e0e0e0"],
  gap = 5,
  speed = 35,
  className,
  onClick,
}: PixelCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={[
        "relative w-full h-full rounded-2xl overflow-hidden cursor-pointer shadow-lg",
        "ring-1 ring-white/10 dark:ring-white/10",
        className || "",
      ].join(" ")}
      onClick={onClick}
    >
      {/* Optional background image */}
      {image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        </div>
      )}

      {/* Pixel energy layer */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70">
        <PixelCanvas gap={gap} speed={speed} colors={colors} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 flex h-full flex-col">
        {eyebrow && (
          <p className="text-[11px] font-mono uppercase tracking-widest text-white/80">
            {eyebrow}
          </p>
        )}
        {title && (
          <h3 className="mt-auto text-2xl font-semibold text-white">{title}</h3>
        )}
        {description && (
          <p className="mt-2 text-sm text-white/80">{description}</p>
        )}
      </div>

      {/* Electric border perimeter */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl electric-border" />
    </motion.div>
  );
}
