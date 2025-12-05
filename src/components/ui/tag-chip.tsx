// import React, { useState } from 'react';
import { cn } from '@/lib/utils';
// import { motion, AnimatePresence } from 'framer-motion'; // Using basic CSS/GSAP is fine, but for micro-interactions standard react state works well with Tailwind.

// Micro-interaction Tag Chip
interface TagChipProps {
  label: string;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export function TagChip({ label, className, onClick, isActive }: TagChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-4 py-1.5 text-sm font-space rounded-full border transition-all duration-300 overflow-hidden group",
        isActive 
          ? "bg-primary text-primary-foreground border-primary" 
          : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-foreground",
        className
      )}
    >
      <span className="relative z-10">{label}</span>
      {/* Hover Fill Effect */}
      <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
    </button>
  );
}