// src/components/landing/HeroSection04.tsx
import React, { useState } from "react";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LetterReveal } from "@/components/ui/letter-reveal";

// Simple icon set for LetterReveal images (mirrors approach in HeroLetterReveal)
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
} from "lucide-react";
import Navbar from "../landing/Navbar";

const techLogos = [
  <Code2
    key="code"
    className="w-full h-full text-neutral-900 dark:text-white stroke-[1.5]"
  />,
  <Cpu
    key="cpu"
    className="w-full h-full text-neutral-900 dark:text-white stroke-[1.5]"
  />,
  <Rocket
    key="rocket"
    className="w-full h-full text-neutral-900 dark:text-white stroke-[1.5]"
  />,
  <Sparkles
    key="sparkles"
    className="w-full h-full text-neutral-900 dark:text-white stroke-[1.5]"
  />,
  <Zap
    key="zap"
    className="w-full h-full text-neutral-900 dark:text-white stroke-[1.5]"
  />,
  <Terminal
    key="terminal"
    className="w-full h-full text-neutral-900 dark:text-white stroke-[1.5]"
  />,
  <Database
    key="db"
    className="w-full h-full text-neutral-900 dark:text-white stroke-[1.5]"
  />,
  <GitBranch
    key="git"
    className="w-full h-full text-neutral-900 dark:text-white stroke-[1.5]"
  />,
  <Braces
    key="braces"
    className="w-full h-full text-neutral-900 dark:text-white stroke-[1.5]"
  />,
  <Binary
    key="binary"
    className="w-full h-full text-neutral-900 dark:text-white stroke-[1.5]"
  />,
];

export function HeroSection() {
  const [isDark, setIsDark] = useState(true);

  return (
    <section className="min-h-screen overflow-hidden relative py-20">
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      <div className="mx-auto max-w-7xl relative z-20 px-6">
        <div className="relative ">
          {/* <p className="text-sm absolute -top-4 left-20 font-medium tracking-wider">
            1,996
          </p> */}

          {/* LetterReveal replaces the static H1 while keeping your exact styling */}
          <LetterReveal
            text="Meghraj"
            images={techLogos}
            imageScale={1.8}
            className="z-20 text-primary relative font-bold text-center tracking-[-7px] text-7xl md:text-9xl xl:tracking-[-1rem] md:tracking-[-14px] xl:text-[10rem]"
          />

          <p className="text-4xl hidden xl:block absolute -bottom-12 right-24 font-thin tracking-[6px] wrap-normal">
            ENGINEER
          </p>
          <p className="text-4xl absolute xl:hidden -bottom-12 left-24 font-thin tracking-[6px]">
            ENGINEER
          </p>
        </div>

        <div className="grid relative">
          <div className="space-y-8 pt-20 flex gap-6 justify-center">
            <div className="flex gap-6 bg-secondary w-full max-w-xl h-fit p-10 items-end space-y-2 text-xl font-bold md:text-2xl lg:text-3xl">
              <div className="font-semibold text-xl">
                <div>/ WEB DEVELOPMENT</div>
                <div>/ MACHINE LEARNING</div>
                <div>/ ARTIFICIAL INTELLIGENCE</div>
              </div>

              {/* Desktop portrait block */}
              <div className="absolute hidden md:flex left-1/2 -top-10 w-fit overflow-hidden bg-secondary">
                <img
                  src="./prof.jpeg"
                  alt="Designer portrait"
                  className="h-100 w-full object-contain grayscale"
                />
                <div className="text-left p-2 rotate-180 [writing-mode:vertical-rl] text-xs font-medium tracking-widest">
                  BASED IN PUNE MAHARASHTRA
                </div>
              </div>
            </div>
          </div>

          {/* Mobile portrait block */}
          <div className="flex md:hidden left-1/2 -top-10 w-full md:w-fit overflow-hidden bg-secondary">
            <img
              src="./prof.jpeg"
              alt="Designer portrait"
              className="h-100 w-full object-contain grayscale"
            />
            <div className="text-left p-2 rotate-180 [writing-mode:vertical-rl] text-xs font-medium tracking-widest">
              BASED IN PUNE MAHARASHTRA
            </div>
          </div>
        </div>

        <div className="md:mt-40 mt-10">
          <p className="mx-auto max-w-2xl font-mono text-center text-sm font-medium tracking-wide md:text-base">
            I'M A FRESHER IN THE INDUSTRY
            <br />
            WHO CAN BUILD SCALABLE AND
            <br />
            DEPLOYMENT READY APPLICATIONS OF ALL SIZES
          </p>
        </div>

        <div className="flex justify-center pt-6">
          <Button size="lg">Book a call</Button>
        </div>

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

      {/* Light grid mask */}
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

      {/* Dark grid mask */}
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
