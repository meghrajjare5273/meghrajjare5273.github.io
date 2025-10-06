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
} from "lucide-react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import ThemeToggleButton from "@/components/ui/theme-button";

const HeroLetterReveal = () => {
  // Tech logos - you can replace these with custom SVG imports
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
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 overflow-hidden">
      {/* Existing overlay and grid code remains the same */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_50%)]" />

      <div className="absolute inset-0 z-[1]">
        <FlickeringGrid
          squareSize={6}
          gridGap={6}
          colorLight="#0B0F19"
          colorDark="#FFFFFF"
          minOpacity={0.1}
          maxOpacity={0.24}
          flickerChance={0.4}
          minOpacityDark={0.01}
          maxOpacityDark={0.14}
          className="min-h-screen w-full"
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_50%)]" />

      {/* ADD THEME TOGGLE BUTTON HERE */}
      <div className="absolute top-0 right-0 z-50">
        <ThemeToggleButton />
      </div>

      <div className="relative z-10 px-6 py-12 text-center">
        {/* Existing content remains the same */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase mb-50 text-neutral-500 dark:text-neutral-400  font-light"
        >
          Full-Stack Developer • AI Engineer
        </motion.p>
        
        <LetterReveal
          text="Meghraj"
          images={techLogos}
          className="top-32 bg-clip-text text-transparent bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400"
          imageScale={1.8}
        />
      </div>
    </section>
  );
};

export { HeroLetterReveal };
