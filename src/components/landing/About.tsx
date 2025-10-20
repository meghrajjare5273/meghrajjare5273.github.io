"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { PixelCanvas } from "@/components/ui/cards/pixel-canvas";

// ============================================================================
// ELECTRIC CARD
// ============================================================================
type Variant = "swirl" | "hue";

type ElectricCardProps = {
  variant?: Variant;
  color?: string;
  badge?: string;
  title?: string;
  description?: string;
  className?: string;
  onClick?: () => void;
};

const ElectricCard: React.FC<ElectricCardProps> = ({
  variant = "swirl",
  color = "#dd8448",
  badge = "Dramatic",
  title = "Original",
  description = "In case you'd like to emphasize something very dramatically.",
  className = "",
  onClick,
}) => {
  const ids = useMemo(() => {
    const key = Math.random().toString(36).slice(2, 8);
    return { swirl: `swirl-${key}`, hue: `hue-${key}` };
  }, []);

  const filterURL =
    variant === "hue" ? `url(#${ids.hue})` : `url(#${ids.swirl})`;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`ec-wrap ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <svg
        className="svg-container"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter
            id={ids.swirl}
            colorInterpolationFilters="sRGB"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="10"
              result="noise1"
              seed="1"
            />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate
                attributeName="dy"
                values="700; 0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="10"
              result="noise2"
              seed="1"
            />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate
                attributeName="dy"
                values="0; -700"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="10"
              result="noise3"
              seed="2"
            />
            <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
              <animate
                attributeName="dx"
                values="490; 0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="10"
              result="noise4"
              seed="2"
            />
            <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
              <animate
                attributeName="dx"
                values="0; -490"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>
            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend
              in="part1"
              in2="part2"
              mode="color-dodge"
              result="combinedNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>

          <filter
            id={ids.hue}
            colorInterpolationFilters="sRGB"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="7"
            />
            <feColorMatrix type="hueRotate" result="pt1">
              <animate
                attributeName="values"
                values="0;360;"
                dur=".6s"
                repeatCount="indefinite"
                calcMode="paced"
              />
            </feColorMatrix>
            <feComposite />
            <feTurbulence
              type="turbulence"
              baseFrequency="0.03"
              numOctaves="7"
              seed="5"
            />
            <feColorMatrix type="hueRotate" result="pt2">
              <animate
                attributeName="values"
                values="0; 333; 199; 286; 64; 168; 256; 157; 360;"
                dur="5s"
                repeatCount="indefinite"
                calcMode="paced"
              />
            </feColorMatrix>
            <feBlend in="pt1" in2="pt2" mode="normal" result="combinedNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="card-container"
        style={{ "--electric-border-color": color, "--f": filterURL } as any}
      >
        <div className="inner-container">
          <div className="border-outer">
            <div className="main-card" />
          </div>
          <div className="glow-layer-1" />
          <div className="glow-layer-2" />
        </div>

        <div className="overlay-1" />
        <div className="overlay-2" />
        <div className="background-glow" />

        <div className="content-container">
          <div className="content-top">
            <motion.div
              className="scrollbar-glass"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
              transition={{ duration: 0.3 }}
            >
              {badge}
            </motion.div>

            <motion.p
              className="title"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {title}
            </motion.p>
          </div>

          <hr className="divider" />

          <div className="content-bottom">
            <motion.p
              className="description"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {description}
            </motion.p>
          </div>
        </div>
      </div>

      <style>{`
        :root { --color-neutral-900: oklch(0.185 0 0); }

        .ec-wrap { position: relative; display: inline-block; color-scheme: light dark; width: 100%; height: 100%; }
        .svg-container { position: absolute; width: 0; height: 0; overflow: hidden; }

        .card-container {
          padding: 2px; border-radius: 1.5em; position: relative; width: 100%; height: 100%;
          --electric-light-color: oklch(from var(--electric-border-color) l c h);
          --gradient-color: oklch(from var(--electric-border-color) 0.3 calc(c / 2) h / 0.4);
          background: linear-gradient(-30deg, var(--gradient-color), transparent, var(--gradient-color)),
            linear-gradient(to bottom, var(--color-neutral-900), var(--color-neutral-900));
          color: oklch(0.985 0 0);
        }

        .inner-container { position: relative; width: 100%; height: 100%; }
        .border-outer { border: 2px solid oklch(from var(--electric-border-color) l c h / 0.5);
          border-radius: 1.5em; padding-right: 0.15em; padding-bottom: 0.15em; width: 100%; height: 100%; }

        .main-card { width: 100%; height: 100%; border-radius: 1.5em; border: 2px solid var(--electric-border-color);
          margin-top: -4px; margin-left: -4px; filter: var(--f); background: oklch(0.145 0 0); }

        .glow-layer-1, .glow-layer-2, .overlay-1, .overlay-2, .background-glow {
          border-radius: 24px; position: absolute; inset: 0; pointer-events: none;
        }

        .glow-layer-1 { border: 2px solid oklch(from var(--electric-border-color) l c h / 0.6); filter: blur(1px); }
        .glow-layer-2 { border: 2px solid var(--electric-light-color); filter: blur(4px); }

        .overlay-1, .overlay-2 {
          mix-blend-mode: overlay; transform: scale(1.1); filter: blur(16px);
          background: linear-gradient(-30deg, white, transparent 30%, transparent 70%, white);
        }
        .overlay-1 { opacity: 1; }
        .overlay-2 { opacity: 0.5; }

        .background-glow {
          filter: blur(32px); transform: scale(1.1); opacity: 0.3; z-index: -1;
          background: linear-gradient(-30deg, var(--electric-light-color), transparent, var(--electric-border-color));
        }

        .content-container { position: absolute; inset: 0; display: flex; flex-direction: column; padding: 1.5rem; }
        .content-top { display: flex; flex-direction: column; height: 100%; }
        .content-bottom { display: flex; flex-direction: column; }

        .scrollbar-glass {
          background: radial-gradient(47.2% 50% at 50.39% 88.37%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, 0.04);
          position: relative; transition: background 0.3s ease; border-radius: 14px; width: fit-content; height: fit-content;
          padding: 0.5em 1em; text-transform: uppercase; font-weight: bold; font-size: 0.75rem; color: rgba(255, 255, 255, 0.8);
        }

        .title { font-size: 1.5rem; font-weight: 600; margin-top: auto; font-family: 'Space Grotesk Variable', sans-serif; }
        .description { opacity: 0.7; font-size: 0.875rem; font-family: 'Space Grotesk Variable', sans-serif; }

        .divider {
          margin-top: auto; margin-bottom: 1rem; border: none; height: 1px; background-color: currentColor; opacity: 0.1;
          mask-image: linear-gradient(to right, transparent, black, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black, transparent);
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// NIHILIST CARD (adapted)
// ============================================================================
type NihilistCardProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
  onClick?: () => void;
};

const NihilistCard: React.FC<NihilistCardProps> = ({
  title = "Newsletter",
  description = "Get existential crisis delivered straight to your inbox every week.",
  buttonText = "Click me",
  className = "",
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  return (
    <div
      className={`nihilist-card ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="card__title">{title}</span>
        <p className="card__content">{description}</p>
      </motion.div>

      <motion.button
        className="card__button"
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {buttonText}
        <motion.span
          className="button-hover"
          initial={{ y: "100%" }}
          animate={{ y: buttonHovered ? "0%" : "100%" }}
          transition={{ duration: 0.3 }}
        >
          Sure?
        </motion.span>
      </motion.button>

      <style>{`
        .nihilist-card {
          width: 100%; height: 100%; padding: 20px; background: #fff; border: 6px solid #000;
          box-shadow: 12px 12px 0 #000; transition: transform 0.3s, box-shadow 0.3s; cursor: pointer;
          display: flex; flex-direction: column; justify-content: space-between; border-radius: 0.75rem;
        }
        .nihilist-card:hover { transform: translate(-5px, -5px); box-shadow: 17px 17px 0 #000; }

        .card__title {
          font-size: 2rem; font-weight: 900; color: #000; text-transform: uppercase; margin-bottom: 15px; display: block; position: relative; overflow: hidden;
          font-family: 'Space Grotesk Variable', sans-serif;
        }
        .card__title::after { content: ""; position: absolute; bottom: 0; left: 0; width: 90%; height: 3px; background-color: #000; transform: translateX(-100%); transition: transform 0.3s; }
        .nihilist-card:hover .card__title::after { transform: translateX(0); }

        .card__content { font-size: 1rem; line-height: 1.4; color: #000; margin-bottom: 20px; font-family: 'Space Grotesk Variable', sans-serif; }

        .card__button {
          border: 3px solid #000; background: #000; color: #fff; padding: 10px; font-size: 1.125rem; font-weight: bold; text-transform: uppercase;
          cursor: pointer; position: relative; overflow: hidden; transition: transform 0.3s; width: 50%; align-self: center;
          font-family: 'Space Grotesk Variable', sans-serif; border-radius: 0.5rem;
        }
        .button-hover {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #5ad641; color: #000;
          display: flex; align-items: center; justify-content: center;
        }
        .card__button:active { transform: scale(0.95); }
      `}</style>
    </div>
  );
};

// ============================================================================
// SIMPLE GRADIENT CARD
// ============================================================================
type SimpleGradientCardProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  gradient?: string;
  className?: string;
  onClick?: () => void;
};

const SimpleGradientCard: React.FC<SimpleGradientCardProps> = ({
  eyebrow,
  title,
  description,
  gradient = "from-purple-500 to-pink-500",
  className = "",
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`simple-gradient-card ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`gradient-bg bg-gradient-to-br ${gradient}`} />
      <PixelCanvas
        gap={5}
        speed={35}
        colors={["#ffffff", "#f0f0f0", "#e0e0e0"]}
      />

      <div className="card-content">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          {eyebrow}
        </motion.p>
        <motion.h2
          className="card-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="card-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {description}
        </motion.p>
      </div>

      <style>{`
        .simple-gradient-card {
          position: relative; width: 100%; height: 100%; border-radius: 1rem; overflow: hidden; cursor: pointer;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        }
        .gradient-bg { position: absolute; inset: 0; opacity: 0.9; }
        .card-content { position: relative; z-index: 10; padding: 2rem; height: 100%; display: flex; flex-direction: column; justify-content: center; }
        .eyebrow { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: rgba(255, 255, 255, 0.9); letter-spacing: 0.05em; margin-bottom: 0.5rem; font-family: 'Fira Code', monospace; }
        .card-title { font-size: 1.875rem; font-weight: 700; color: white; margin-bottom: 1rem; font-family: 'Space Grotesk Variable', sans-serif; }
        .card-description { font-size: 0.875rem; color: rgba(255, 255, 255, 0.9); line-height: 1.5; font-family: 'Space Grotesk Variable', sans-serif; }
      `}</style>
    </motion.div>
  );
};

// ============================================================================
// ENHANCED MODAL
// ============================================================================
type ModalProps = {
  card: any;
  isOpen: boolean;
  onClose: () => void;
};

const AboutModal: React.FC<ModalProps> = ({ card, isOpen, onClose }) => {
  if (!isOpen || !card) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-xl px-4"
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-2xl rounded-2xl overflow-hidden bg-neutral-950/95 shadow-2xl border border-white/10"
          initial={{ y: 50, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 50, scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 border-b border-white/10">
            <motion.button
              className="absolute top-4 right-4 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>

            <p className="text-sm font-mono text-sky-400 mb-2">
              {card.eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-white font-['Space_Grotesk_Variable']">
              {card.title}
            </h2>
          </div>

          <div className="p-8 max-h-[60vh] overflow-y-auto">
            <p className="text-lg text-gray-300 mb-6 leading-relaxed font-['Space_Grotesk_Variable']">
              {card.description}
            </p>

            {card.longDescription && (
              <div className="mt-6 p-6 bg-white/5 rounded-lg border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3 font-['Space_Grotesk_Variable']">
                  More Details
                </h3>
                <p className="text-gray-400 leading-relaxed font-['Space_Grotesk_Variable']">
                  {card.longDescription}
                </p>
              </div>
            )}

            {card.skills && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-white mb-3 font-['Space_Grotesk_Variable']">
                  Key Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {card.skills.map((skill: string, index: number) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium border border-white/20 font-['Space_Grotesk_Variable']"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ============================================================================
// MAIN ABOUT
// ============================================================================
export default function About() {
  const [selectedCard, setSelectedCard] = useState<any>(null);

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
      className: "lg:col-span-2 lg:row-span-2",
    },
    {
      id: 2,
      type: "simple",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
      eyebrow: "Interests",
      title: "Machine Learning & AI",
      description:
        "Building systems for legal automation and exploring RL, GPU programming, ML model training.",
      longDescription:
        "Recent work includes contract review AI systems, job application automation bots, and sensor data reinforcement learning implementations. Experienced with TensorFlow, PyTorch, and Stable Baselines 3.",
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "CUDA", "RL"],
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
      className: "lg:col-span-1 lg:row-span-2",
    },
    {
      id: 4,
      type: "nihilist",
      eyebrow: "UX Philosophy",
      title: "Clean & Fast",
      description:
        "Create interfaces that feel alive but never cluttered. Every pixel matters.",
      longDescription:
        "Designer for utility-first layouts and thoughtful gradients. Focus on performance, accessibility, and user delight. Break nothing, polish everything.",
      skills: ["UI/UX Design", "Figma", "Animation", "Responsive Design"],
      className: "lg:col-span-2 lg:row-span-1",
    },
    {
      id: 5,
      type: "simple",
      gradient: "from-emerald-500 to-teal-500",
      eyebrow: "Open Source",
      title: "LegalMind, DebateBot",
      description:
        "Active contributor on GitHub, focused on legal AI and automation.",
      longDescription:
        "Open code, open solutions. Community-driven and future-ready. All projects available on GitHub for learning and collaboration.",
      skills: ["Git", "GitHub", "Open Source", "Documentation"],
      className: "lg:col-span-1 lg:row-span-1",
    },
  ];

  const renderCard = (card: any) => {
    const handleClick = () => setSelectedCard(card);
    switch (card.type) {
      case "electric":
        return (
          <ElectricCard
            variant={card.variant}
            color={card.color}
            badge={card.eyebrow}
            title={card.title}
            description={card.description}
            onClick={handleClick}
          />
        );
      case "nihilist":
        return (
          <NihilistCard
            title={card.title}
            description={card.description}
            buttonText="Learn More"
            onClick={handleClick}
          />
        );
      case "simple":
        return (
          <SimpleGradientCard
            eyebrow={card.eyebrow}
            title={card.title}
            description={card.description}
            gradient={card.gradient}
            onClick={handleClick}
          />
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
        {CARDS.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${card.className} min-h-[200px] sm:min-h-[250px]`}
          >
            {renderCard(card)}
          </motion.div>
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
