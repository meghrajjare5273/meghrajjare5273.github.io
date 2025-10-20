// src/components/landing/About.tsx
"use client";

// import React, { useState, useMemo } from "react";

import { motion } from "motion/react";
import { AdaptiveMorphDialog } from "@/components/ui/cards/morph";
import PixelCard from "@/components/ui/cards/pixel-card";
import ElectricCard from "@/components/ui/cards/electric-card";
import { useState } from "react";

// ============================================================================
// MAIN ABOUT
// ============================================================================
export default function About() {
  const [selected, setSelected] = useState  <any | null>(null);

  const CARDS = [
    {
      id: 1,
      type: "electric",
      variant: "swirl",
      color: "#C3E41D",
      eyebrow: "Background",
      title: "Full-Stack Developer",
      description:
        "Modern React/Next.js specialist building scalable web apps and AI automation.",
      longDescription:
        "Extensive experience creating legal tech solutions, data processing pipelines, and modern user interfaces. Passionate about frontend aesthetics and backend performance optimization. Built production applications serving thousands of users.",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "FastAPI",
        "PostgreSQL",
      ],
      image: "/images/about/bg-fullstack.jpg", // NEW
      className: "lg:col-span-2 lg:row-span-2",
    },
    {
      id: 2,
      type: "pixel",
      eyebrow: "Interests",
      title: "Machine Learning & AI",
      description:
        "Building systems for legal automation and exploring RL, GPU programming, ML model training.",
      longDescription:
        "Recent work includes contract review AI systems, job application automation bots, and sensor data reinforcement learning implementations. Experienced with TensorFlow, PyTorch, and Stable Baselines 3.",
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "CUDA", "RL"],
      image: "/images/about/bg-ml.jpg", // NEW
      className: "lg:col-span-2 lg:row-span-1",
    },
    {
      id: 3,
      type: "electric",
      variant: "hue",
      color: "#6366f1",
      eyebrow: "Tools",
      title: "Modern Tech Stack",
      description:
        "Rapid prototyping with modern tooling and cloud deployment.",
      longDescription:
        "Obsessed with smooth animations and clean design. Built projects like LegalMind AI Assistant, debating chatbot, and interactive portfolios. Expert with FastAPI, Astro.js, Framer Motion, and Motion.",
      skills: ["Astro", "Motion", "GSAP", "Tailwind CSS", "Docker", "Vercel"],
      image: "/images/about/bg-tools.jpg", // NEW
      className: "lg:col-span-1 lg:row-span-2",
    },
    {
      id: 5,
      type: "pixel",
      eyebrow: "Open Source",
      title: "LegalMind, DebateBot",
      description:
        "Active contributor on GitHub, focused on legal AI and automation.",
      longDescription:
        "Open code, open solutions. Community-driven and future-ready. All projects available on GitHub for learning and collaboration.",
      skills: ["Git", "GitHub", "Open Source", "Documentation"],
      image: "/images/about/bg-oss.jpg", // NEW
      className: "lg:col-span-1 lg:row-span-1",
    },
  ];

  const renderCard = (card: any, lid: string) => {
    const handleClick = () => setSelected({ ...card, layoutId: lid });
    switch (card.type) {
      case "electric":
        return (
          <motion.div layoutId={lid} className="h-full">
            <ElectricCard
              variant={card.variant}
              color={card.color}
              badge={card.eyebrow}
              title={card.title}
              description={card.description}
              image={card.image}
              onClick={handleClick}
            />
          </motion.div>
        );
      case "pixel":
        return (
          <motion.div layoutId={lid} className="h-full">
            <PixelCard
              eyebrow={card.eyebrow}
              title={card.title}
              description={card.description}
              image={card.image}
              onClick={handleClick}
            />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="container mx-auto pt-24 pb-16 px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-['Space_Grotesk_Variable'] text-3xl md:text-5xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900/90 to-gray-500/40 dark:from-white dark:to-white/40"
      >
        About Me
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-3 mb-8 max-w-2xl text-lg md:text-xl font-medium tracking-tight bg-gradient-to-br from-black/90 to-gray-400/20 bg-clip-text text-transparent dark:from-white dark:to-white/40 font-['Space_Grotesk_Variable']"
      >
        Building legal technology, AI automation, and stunning UIs. Always
        learning, always shipping.
      </motion.p>

      <div className="mt-7 grid grid-cols-1 gap-4 sm:mt-12 lg:grid-cols-4 lg:grid-rows-4 lg:gap-4">
        {CARDS.map((card, index) => {
          const lid = `about-card-${card.id}`;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${card.className} min-h-[200px] sm:min-h-[250px]`}
            >
              {renderCard(card, lid)}
            </motion.div>
          );
        })}
      </div>

      <AdaptiveMorphDialog
        open={!!selected}
        onOpenChange={(v) => !v && setSelected(null)}
        layoutId={selected?.layoutId || "about-card-0"}
        title={selected?.title}
        subtitle={selected?.eyebrow}
        description={selected?.longDescription ?? selected?.description}
        image={selected?.image}
      >
        {selected?.skills && (
          <div className="flex flex-wrap gap-2">
            {selected.skills.map((s: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white text-xs md:text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </AdaptiveMorphDialog>
    </section>
  );
}
