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
import PyramidAnimation from "../ui/pyramid";

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
      <div className="absolute inset-0 z-0 flex items-center justify-center mb-10 dark:opacity-10">
        <PyramidAnimation
          wireframe={false}
          color={true}
          speed={0.02}
          axis="y"
          edges={true}
        />
      </div>
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_50%)]" />

      <div className="relative z-10 px-6 py-12 text-center">
        {/* Subtitle above */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase mb-50 text-neutral-500 dark:text-neutral-400  font-light"
        >
          Full-Stack Developer • AI Engineer
        </motion.p>
        {/* Main title with letter reveal */}
        <LetterReveal
          text="Meghraj Jare"
          images={techLogos}
          className="top-32 bg-clip-text text-transparent bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400"
          imageScale={1.8}
        />
        {/* Description below
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-base md:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed"
        >
          Building intelligent applications and seamless user experiences
          <br className="hidden md:block" />
          with modern technologies
        </motion.p> */}
        {/* Optional CTA
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex gap-4 justify-center"
        >
          <button className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg font-medium hover:scale-105 transition-transform">
            View Projects
          </button>
          <button className="px-6 py-3 border-2 border-neutral-300 dark:border-neutral-700 rounded-lg font-medium hover:border-neutral-900 dark:hover:border-white transition-colors">
            Contact Me
          </button>
        </motion.div> */}
      </div>
    </section>
  );
};

export { HeroLetterReveal };
