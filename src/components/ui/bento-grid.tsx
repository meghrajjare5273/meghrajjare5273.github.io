"use client";

import * as React from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

// container stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// item spring-in
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
};

interface BentoGridShowcaseProps {
  integration: React.ReactNode;
  trackers: React.ReactNode;
  statistic: React.ReactNode;
  focus: React.ReactNode;
  productivity: React.ReactNode;
  shortcuts: React.ReactNode;
  className?: string;
}

export function BentoGridShowcase({
  integration,
  trackers,
  statistic,
  focus,
  productivity,
  shortcuts,
  className,
}: BentoGridShowcaseProps) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "grid w-full grid-cols-1 gap-6 md:grid-cols-3",
        "md:grid-rows-3",
        "auto-rows-[minmax(180px,auto)]",
        className
      )}
    >
      {/* Tall left card (3 rows) */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-1 md:row-span-3"
      >
        {integration}
      </motion.div>

      {/* Top middle */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-1 md:row-span-1"
      >
        {trackers}
      </motion.div>

      {/* Top right */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-1 md:row-span-1"
      >
        {statistic}
      </motion.div>

      {/* Middle middle */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-1 md:row-span-1"
      >
        {focus}
      </motion.div>

      {/* Middle right */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-1 md:row-span-1"
      >
        {productivity}
      </motion.div>

      {/* Bottom wide (2 cols) */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-2 md:row-span-1"
      >
        {shortcuts}
      </motion.div>
    </motion.section>
  );
}
