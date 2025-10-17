// src/components/landing/HeroLetterReveal.tsx
"use client";

import { motion } from "motion/react";
import { LetterReveal } from "@/components/ui/letter-reveal";
import {
  Code2,
  Cpu,
  Rocket,
  Sparkles,
  Zap,
  Terminal,
  Database,
  GitBranch,
  Braces,
  Binary,
  ArrowDownRight,
} from "lucide-react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Button } from "@/components/ui/button";

const HeroLetterReveal = () => {
  // Tech logos for LetterReveal component
  const techLogos = [
    <Code2
      key="code"
      className="w-full h-full text-neutral-900 dark:text-white"
      strokeWidth={1.5}
    />,
    <Cpu
      key="cpu"
      className="w-full h-full text-neutral-900 dark:text-white"
      strokeWidth={1.5}
    />,
    <Rocket
      key="rocket"
      className="w-full h-full text-neutral-900 dark:text-white"
      strokeWidth={1.5}
    />,
    <Sparkles
      key="sparkles"
      className="w-full h-full text-neutral-900 dark:text-white"
      strokeWidth={1.5}
    />,
    <Zap
      key="zap"
      className="w-full h-full text-neutral-900 dark:text-white"
      strokeWidth={1.5}
    />,
    <Terminal
      key="terminal"
      className="w-full h-full text-neutral-900 dark:text-white"
      strokeWidth={1.5}
    />,
    <Database
      key="db"
      className="w-full h-full text-neutral-900 dark:text-white"
      strokeWidth={1.5}
    />,
    <GitBranch
      key="git"
      className="w-full h-full text-neutral-900 dark:text-white"
      strokeWidth={1.5}
    />,
    <Braces
      key="braces"
      className="w-full h-full text-neutral-900 dark:text-white"
      strokeWidth={1.5}
    />,
    <Binary
      key="binary"
      className="w-full h-full text-neutral-900 dark:text-white"
      strokeWidth={1.5}
    />,
  ];

  return (
    <section className="min-h-screen overflow-hidden relative py-20">
      {/* Dotted Grid Background - Light Mode */}
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
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Dotted Grid Background - Dark Mode */}
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
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <div className="mx-auto max-w-7xl relative z-20 px-6">
        {/* Year Badge and Main Title */}
        <div className="relative">
          <p className="text-sm absolute -top-4 left-20 font-medium tracking-wider text-neutral-500 dark:text-neutral-400">
            1,996
          </p>

          {/* Main Title with LetterReveal */}
          <div className="z-20 relative text-center">
            <LetterReveal
              text="Meghraj Jare"
              images={techLogos}
              className="bg-clip-text text-transparent bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 tracking-[-7px] md:tracking-[-14px] xl:tracking-[-1rem]"
              imageScale={1.8}
            />
          </div>

          <p className="text-4xl hidden xl:block absolute -bottom-12 right-24 font-thin tracking-[6px] text-neutral-600 dark:text-neutral-300">
            FULL-STACK DEV
          </p>
          <p className="text-4xl absolute xl:hidden -bottom-12 left-24 font-thin tracking-[6px] text-neutral-600 dark:text-neutral-300">
            FULL-STACK DEV
          </p>
        </div>

        {/* Profile Image and Services Section */}
        <div className="grid relative">
          <div className="space-y-8 pt-20 flex gap-6 justify-center">
            <div className="flex gap-6 bg-secondary w-full max-w-xl h-fit p-10 items-end space-y-2 text-xl font-bold md:text-2xl lg:text-3xl">
              <div className="font-semibold text-xl">
                <div>/ FULL-STACK DEVELOPMENT</div>
                <div>/ AI & MACHINE LEARNING</div>
                <div>/ UI/UX ENGINEERING</div>
              </div>
              <div className="absolute hidden md:flex left-1/2 -top-10 w-fit overflow-hidden bg-secondary">
                <img
                  src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/ai.jpg"
                  alt="Developer portrait"
                  className="h-100 w-full object-contain grayscale"
                />
                <div className="text-left p-2 rotate-180 [writing-mode:vertical-rl] text-xs font-medium tracking-widest">
                  BASED IN INDIA
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Image */}
          <div className="flex md:hidden left-1/2 -top-10 w-full md:w-fit overflow-hidden bg-secondary">
            <img
              src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/ai.jpg"
              alt="Developer portrait"
              className="h-100 w-full object-contain grayscale"
            />
            <div className="text-left p-2 rotate-180 [writing-mode:vertical-rl] text-xs font-medium tracking-widest">
              BASED IN INDIA
            </div>
          </div>
        </div>

        {/* Description Text */}
        <div className="md:mt-40 mt-10">
          <p className="mx-auto max-w-2xl font-mono text-center text-sm font-medium tracking-wide md:text-base text-neutral-600 dark:text-neutral-300">
            BUILDING INTELLIGENT APPLICATIONS AND
            <br />
            SEAMLESS USER EXPERIENCES WITH
            <br />
            MODERN TECHNOLOGIES
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center pt-6">
          <Button size="lg">Book a call</Button>
        </div>

        {/* Portfolio Section */}
        <div className="md:flex mt-20 items-end justify-between">
          <div className="relative">
            <div className="w-60 h-36 shadow-lg border rounded-md overflow-hidden mb-8 md:mb-0">
              <img
                src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg"
                alt="Portfolio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-60 h-36 absolute left-6 -top-6 shadow-lg border rounded-md overflow-hidden mb-8 md:mb-0">
              <img
                src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg"
                alt="Portfolio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-60 h-36 absolute left-12 -top-12 shadow-lg border rounded-md overflow-hidden mb-8 md:mb-0">
              <img
                src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg"
                alt="Portfolio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center md:justify-end gap-2">
              <span className="text-lg font-medium tracking-wider">
                RECENT WORK
              </span>
              <ArrowDownRight className="size-6" />
            </div>

            <div className="mt-3 md:text-right">
              <h2 className="text-5xl uppercase tracking-[-4px]">
                Design without Limits
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroLetterReveal;
