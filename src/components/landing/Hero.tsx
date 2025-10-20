// src/components/landing/HeroSection04.tsx
import React, { useState } from "react";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navbar from "../landing/Navbar";

export function HeroSection() {
  const [isDark, setIsDark] = useState(true);

  // Animation variants for staggered fade-in effects
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
  };

  const fadeIn = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    viewport: { once: true },
  };

  return (
    <section className="min-h-screen overflow-hidden relative py-20">
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      <div className="mx-auto max-w-7xl relative z-20 px-6">
        {/* Hero Title Section with improved spacing */}
        <motion.div
          className="relative pt-12 md:pt-20"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Main Name - Enhanced with smooth fade-in */}
          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-20 text-primary relative font-bold text-center tracking-[-7px] text-7xl md:text-9xl xl:tracking-[-1rem] md:tracking-[-14px] xl:text-[10rem]"
          >
            Meghraj
          </motion.h1>

          {/* Engineer Label with improved positioning */}
          <motion.p
            variants={fadeIn}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl md:text-4xl mt-4 md:mt-0 text-center md:text-left md:absolute md:-bottom-12 md:right-24 font-thin tracking-[6px]"
          >
            ENGINEER
          </motion.p>
        </motion.div>

        {/* Profile Section with Fixed Spacing */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24 md:mt-32 flex flex-col md:flex-row gap-8 md:gap-0 items-center md:items-start justify-center relative"
        >
          {/* Specializations Box - Improved spacing and readability */}
          <div className="bg-secondary w-full max-w-xl p-8 md:p-10 space-y-4 shadow-lg">
            <div className="font-semibold text-lg md:text-xl space-y-2">
              <div>/ WEB DEVELOPMENT</div>
              <div>/ MACHINE LEARNING</div>
              <div>/ ARTIFICIAL INTELLIGENCE</div>
            </div>
          </div>

          {/* Desktop Portrait - Fixed spacing and visibility */}
          <div className="hidden md:flex md:absolute md:left-1/2 md:-translate-x-1/2 md:-top-16 w-fit bg-secondary shadow-lg ml-36 overflow-hidden">
            <img
              src="./prof.jpeg"
              alt="Meghraj - Full Stack Developer"
              className="h-80 w-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="bg-secondary text-left p-3 rotate-180 [writing-mode:vertical-rl] text-xs font-medium tracking-widest border-l border-border">
              BASED IN PUNE MAHARASHTRA
            </div>
          </div>

          {/* Mobile Portrait - Better layout */}
          <div className="flex md:hidden w-full max-w-xl bg-secondary shadow-lg overflow-hidden">
            <img
              src="./prof.jpeg"
              alt="Meghraj - Full Stack Developer"
              className="h-80 w-full object-cover grayscale"
            />
            <div className="bg-secondary text-left p-3 rotate-180 [writing-mode:vertical-rl] text-xs font-medium tracking-widest border-l border-border">
              BASED IN PUNE MAHARASHTRA
            </div>
          </div>
        </motion.div>

        {/* Bio Section with improved spacing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-32"
        >
          <p className="mx-auto max-w-2xl font-mono text-center text-sm md:text-base font-medium tracking-wide leading-relaxed">
            I'M A PASSIONATE ENGINEER
            <br />
            WHO BUILDS SCALABLE AND
            <br />
            DEPLOYMENT-READY APPLICATIONS
          </p>
        </motion.div>

        {/* CTA Button with hover animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center pt-8"
        >
          <Button
            size="lg"
            className="text-base px-8 hover:scale-105 transition-transform duration-300"
          >
            Book a call
          </Button>
        </motion.div>

        {/* Portfolio Preview Section with improved layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 flex flex-col md:flex-row items-start md:items-end justify-between gap-12"
        >
          {/* Stacked Cards - Fixed positioning */}
          <div className="relative w-full md:w-auto">
            <motion.div
              className="w-72 h-40 shadow-xl border border-border rounded-md overflow-hidden"
              whileHover={{ scale: 1.05, zIndex: 30 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg"
                alt="Portfolio Project 1"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="w-72 h-40 absolute left-8 -top-8 shadow-xl border border-border rounded-md overflow-hidden"
              whileHover={{ scale: 1.05, zIndex: 30 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg"
                alt="Portfolio Project 2"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="w-72 h-40 absolute left-16 -top-16 shadow-xl border border-border rounded-md overflow-hidden"
              whileHover={{ scale: 1.05, zIndex: 30 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg"
                alt="Portfolio Project 3"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Recent Work Label */}
          <div className="w-full md:w-auto">
            <motion.div
              className="flex items-center md:justify-end gap-2"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-base md:text-lg font-medium tracking-wider">
                RECENT WORK
              </span>
              <ArrowDownRight className="size-5 md:size-6" />
            </motion.div>

            <div className="mt-4">
              <h2 className="text-4xl md:text-5xl uppercase tracking-[-4px] md:text-right">
                Design without Limits
              </h2>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Light grid mask - unchanged */}
      <div
        className="absolute block dark:hidden inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e5e5 1px, transparent 1px),
            linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Dark grid mask - unchanged */}
      <div
        className="absolute hidden dark:block inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #404040 1px, transparent 1px),
            linear-gradient(to bottom, #404040 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
    </section>
  );
}

export default HeroSection;
