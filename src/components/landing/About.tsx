// src/components/landing/About.tsx
"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import PixelCard from "@/components/ui/cards/pixel-card";
import { AdaptiveMorphDialog } from "@/components/ui/cards/morph";
import { gsap } from "gsap";
import { useGSAP as useGSAPHook } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAPHook);
}
const useGSAP = useGSAPHook;

type Card = {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  longDescription?: string;
  skills?: string[];
  image?: string;
  className: string;
};

export default function About() {
  const [selected, setSelected] = useState<any | null>(null);

  // Cards: convert any former "electric" entries to PixelCard while preserving content.
  const CARDS: Card[] = useMemo(
    () => [
      {
        id: 1,
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
        image: "/images/about/bg-fullstack.jpg",
        className: "lg:col-span-2 lg:row-span-2",
      },
      {
        id: 2,
        eyebrow: "Interests",
        title: "Machine Learning & AI",
        description:
          "Building systems for legal automation and exploring RL, GPU programming, ML model training.",
        longDescription:
          "Recent work includes contract review AI systems, job application automation bots, and sensor data reinforcement learning implementations. Experienced with TensorFlow, PyTorch, and Stable Baselines 3.",
        skills: [
          "Python",
          "TensorFlow",
          "PyTorch",
          "Scikit-learn",
          "CUDA",
          "RL",
        ],
        image: "/images/about/bg-ml.jpg",
        className: "lg:col-span-2 lg:row-span-1",
      },
      {
        id: 3,
        eyebrow: "Tools",
        title: "Modern Tech Stack",
        description:
          "Rapid prototyping with modern tooling and cloud deployment.",
        longDescription:
          "Obsessed with smooth animations and clean design. Built projects like LegalMind AI Assistant, debating chatbot, and interactive portfolios. Expert with FastAPI, Astro.js, GSAP, and Tailwind.",
        skills: ["Astro", "GSAP", "Tailwind CSS", "Docker", "Vercel"],
        image: "/images/about/bg-tools.jpg",
        className: "lg:col-span-1 lg:row-span-2",
      },
      {
        id: 5,
        eyebrow: "Open Source",
        title: "LegalMind, DebateBot",
        description:
          "Active contributor on GitHub, focused on legal AI and automation.",
        longDescription:
          "Open code, open solutions. Community-driven and future-ready. All projects available on GitHub for learning and collaboration.",
        skills: ["Git", "GitHub", "Open Source", "Documentation"],
        image: "/images/about/bg-oss.jpg",
        className: "lg:col-span-1 lg:row-span-1",
      },
    ],
    []
  );

  // GSAP intro animations (scoped/context for safe cleanup)
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.from(paraRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.15,
        ease: "power2.out",
      });
      const cards = gsap.utils.toArray<HTMLElement>(
        ".about-grid > .about-cell"
      );
      gsap.from(cards, {
        opacity: 0,
        y: 20,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.08,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="container mx-auto pt-24 pb-16 px-6">
      <h1
        ref={headingRef}
        className="font-['Space_Grotesk_Variable'] text-3xl md:text-5xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900/90 to-gray-500/40 dark:from-white dark:to-white/40"
      >
        About Me
      </h1>

      <p
        ref={paraRef}
        className="mt-3 mb-8 max-w-2xl text-lg md:text-xl font-medium tracking-tight bg-gradient-to-br from-black/90 to-gray-400/20 bg-clip-text text-transparent dark:from-white dark:to-white/40 font-['Space_Grotesk_Variable']"
      >
        Building legal technology, AI automation, and stunning UIs. Always
        learning, always shipping.
      </p>

      {/* Restructured Bento grid remains responsive and gap-consistent */}
      <div className="about-grid mt-7 grid grid-cols-1 gap-4 sm:mt-12 lg:grid-cols-4 lg:grid-rows-4 lg:gap-4">
        {CARDS.map((card) => {
          const lid = `about-card-${card.id}`;
          return (
            <div
              key={card.id}
              className={`about-cell ${card.className} min-h-[200px] sm:min-h-[250px]`}
            >
              {/* Keep only this layoutId wrapper to preserve morph effect */}
              <motion.div layoutId={lid} className="h-full">
                <PixelCard
                  eyebrow={card.eyebrow}
                  title={card.title}
                  description={card.description}
                  image={card.image}
                  onClick={() => setSelected({ ...card, layoutId: lid })}
                />
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Morph dialog preserved exactly, driven by layoutId for the shared-element transition */}
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
