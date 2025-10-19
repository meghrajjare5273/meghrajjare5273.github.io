"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { X } from "lucide-react";

// Single Bento Card (non-interactive, used in grid)
const AboutBentoCard = ({
  eyebrow,
  title,
  description,
  graphic,
  className = "",
  onClick,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  graphic?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={clsx(
      className,
      "group relative flex flex-col overflow-hidden rounded-lg ring-1 ring-white/10 shadow-sm bg-black dark:bg-transparent",
      "data-[dark]:bg-gray-800 data-[dark]:ring-white/15 cursor-pointer"
    )}
    onClick={onClick}
  >
    <div className="relative h-[20rem] shrink-0">{graphic}</div>
    <div className="relative p-7 z-10 isolate -mt-16 min-h-[8rem] backdrop-blur-xl text-white">
      <p className="text-xs font-mono text-sky-300">{eyebrow}</p>
      <h2 className="mt-1 text-xl font-semibold text-white leading-tight">
        {title}
      </h2>
      <p className="mt-2 text-sm text-gray-300">{description}</p>
    </div>
  </motion.div>
);

// Modal for expanded information
const AboutModal = ({
  card,
  isOpen,
  onClose,
}: {
  card: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen || !card) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed inset-0 flex items-center justify-center z-40 bg-black/60 backdrop-blur-xl"
      >
        <motion.div
          className="relative w-full max-w-lg rounded-xl overflow-hidden bg-gray-950/90 shadow-xl p-8"
          initial={{ y: 20, scale: 0.97 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 20, scale: 0.97, transition: { duration: 0.15 } }}
          onClick={onClose}
        >
          {card.graphic && <div className="mb-4">{card.graphic}</div>}
          <h2 className="text-2xl font-geistMono text-white mb-2">
            {card.title}
          </h2>
          <div className="text-gray-300 mb-2">{card.description}</div>
          {card.longDescription && (
            <p className="mt-3 text-base text-gray-400">
              {card.longDescription}
            </p>
          )}
          <motion.button
            className="absolute top-3 right-3 rounded-full bg-gray-900/70 p-2 hover:bg-gray-700 transition"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4 text-white" />
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function About() {
  // Example card data (customize for your story, skills, and sections)
  const CARDS = [
    {
      id: 1,
      eyebrow: "Background",
      title: "Full-stack Developer",
      description:
        "Modern React/Next.js specialist building scalable web apps and AI automation.",
      longDescription:
        "Extensive experience creating legal tech, data pipelines, and modern UIs. Passionate about frontend beauty and backend performance.",
      graphic: (
        <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/ghyfFEStl6BNusZl0ZQd5r7JpM.png)] object-cover bg-center bg-no-repeat opacity-40" />
      ),
      className: "lg:col-span-3 lg:rounded-tl-3xl",
    },
    {
      id: 2,
      eyebrow: "Interests",
      title: "Machine Learning & AI",
      description:
        "Building systems for legal automation and exploring RL, GPU programming, ML model training.",
      longDescription:
        "Recent work includes contract review AI, job application bots, and sensor data RL systems.",
      graphic: (
        <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/7CJtT0Pu3w1vNADktNltoMFC9J4.png)] object-cover bg-center opacity-40" />
      ),
      className: "lg:col-span-3",
    },
    {
      id: 3,
      eyebrow: "Tools",
      title: "React, TypeScript, Python",
      description:
        "Rapid prototyping with modern tooling and cloud deployment. Obsessed with smooth animations and clean design.",
      longDescription:
        "Codebases: LegalMind AI Assistant, debating chatbot, interactive portfolio. Usage: FastAPI, Astro.js, Framer Motion.",
      graphic: (
        <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/gR21e8Wh6l3pU6CciDrqt8wjHM.png)] object-cover bg-left opacity-40" />
      ),
      className: "lg:col-span-2 lg:rounded-bl-3xl",
    },
    {
      id: 4,
      eyebrow: "UX Philosophy",
      title: "Clean, Fast, Responsive",
      description:
        "Create interfaces that feel alive but never cluttered. Every pixel matters.",
      longDescription:
        "Designer for utility-first layouts and thoughtful gradients. Break nothing, polish everything.",
      graphic: (
        <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/PTO3RQ3S65zfZRFEGZGpiOom6aQ.png)] object-fill bg-right opacity-40" />
      ),
      className: "lg:col-span-2",
    },
    {
      id: 5,
      eyebrow: "Open Source",
      title: "LegalMind, DebateBot",
      description:
        "Active contributor on GitHub, focused on legal AI and automation.",
      longDescription:
        "Open code, open solutions. Community-driven and future-ready.",
      graphic: (
        <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/h496iPSwtSnGZwpJyErl6cLWdtE.png)] object-cover bg-center opacity-40" />
      ),
      className: "lg:col-span-2 lg:rounded-br-3xl",
    },
  ];

  const [selectedCard, setSelectedCard] = useState<any>(null);

  return (
    <section className="container mx-auto pt-24 pb-16 px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-geistMono text-3xl md:text-5xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900/90 to-gray-500/40 dark:from-white dark:to-white/40"
      >
        About Me
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-3 mb-8 max-w-2xl text-lg md:text-xl font-medium tracking-tight bg-gradient-to-br from-black/90 to-gray-400/20 bg-clip-text text-transparent dark:from-white dark:to-white/40"
      >
        Building legal technology, AI automation, and stunning UIs. Always
        learning, always shipping.
      </motion.p>
      <div className="mt-7 grid grid-cols-1 gap-4 sm:mt-12 lg:grid-cols-6 lg:grid-rows-2">
        {CARDS.map((card) => (
          <AboutBentoCard
            key={card.id}
            {...card}
            onClick={() => setSelectedCard(card)}
          />
        ))}
      </div>
      <AboutModal
        card={selectedCard}
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </section>
  );
}
