"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { useGSAP as useGSAPHook } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button"; // using Button styles for compact badge look
import { Command, Plus, Settings2 } from "lucide-react";

import { BentoGridShowcase } from "@/components/ui/bento-grid";
import {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealFooter,
  CardCurtainRevealTitle,
  CardCurtainRevealDescription,
  CardCurtain,
} from "@/components/ui/cards/card-curtain";

import { AdaptiveMorphDialog } from "@/components/ui/cards/morph";

// register gsap/react safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAPHook as any);
}
const useGSAP = useGSAPHook as unknown as typeof useGSAPHook;

type SlotData = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  chips?: string[];
};

export default function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);

  const [selected, setSelected] = useState<SlotData | null>(null);
  const cardChrome =
    "group relative h-full rounded-2xl border border-white/10 " +
    "bg-neutral-50/80 dark:bg-neutral-900/60 shadow " +
    "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl";

  // a tiny badge style
  const chipCls =
    "px-2.5 py-0.5 rounded-full border border-white/15 " +
    "bg-white/10 text-[10px] md:text-xs text-neutral-700 " +
    "dark:text-neutral-300/90";
  const SLOTS = useMemo(
    () => ({
      integration: {
        id: "about-slot-integration",
        title: "About Me",
        subtitle: "Full‑Stack + ML",
        description:
          "Engineer focused on legal tech, AI automations, and polished UIs with a product, performance-first mindset.",
        image:
          "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&auto=format&fit=crop",
        chips: ["React/Next", "TypeScript", "FastAPI", "Python", "Postgres"],
      },
      trackers: {
        id: "about-slot-trackers",
        title: "Core Stack",
        subtitle: "Daily Drivers",
        description:
          "React, Next.js, TypeScript, Python, and FastAPI power most builds and prototypes.",
        image:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&auto=format&fit=crop",
        chips: ["React", "Next.js", "TypeScript", "Python", "FastAPI"],
      },
      statistic: {
        id: "about-slot-statistic",
        title: "AI × Web",
        subtitle: "Systems + UX",
        description:
          "Shipping practical AI—RAG, RL, GPU workflows—wrapped in interactive, accessible UX.",
        image:
          "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&auto=format&fit=crop",
        chips: ["NLP", "RAG", "RL", "GPU", "SB3"],
      },
      focus: {
        id: "about-slot-focus",
        title: "Current Focus",
        subtitle: "ML Ops + UI",
        description:
          "RL experiments, contract analysis tooling, and refined motion patterns for production UIs.",
        image:
          "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&auto=format&fit=crop",
        chips: ["RL", "Contracts AI", "UI Motion", "Performance"],
      },
      productivity: {
        id: "about-slot-productivity",
        title: "Open Source",
        subtitle: "Community",
        description:
          "Reusable UI and ML components with docs, examples, and pragmatic patterns.",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&auto=format&fit=crop",
        chips: ["LegalMind", "DebateBot", "UI Kits"],
      },
      shortcuts: {
        id: "about-slot-shortcuts",
        title: "Quick Actions",
        subtitle: "Let’s collaborate",
        description:
          "Get the resume, browse the code, or reach out for scoped projects and consulting.",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&auto=format&fit=crop",
        chips: ["Resume", "GitHub", "Email"],
      },
    }),
    []
  );

  // GSAP entrance animations, reduced-motion aware
  useGSAP(
    (ctx) => {
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
        delay: 0.12,
        ease: "power2.out",
      });

      const items = gsap.utils.toArray<HTMLElement>(".bento-about .grid-item");
      gsap.from(items, {
        opacity: 0,
        y: 20,
        duration: 0.45,
        stagger: 0.08,
        ease: "power2.out",
      });
    },
    { scope: sectionRef }
  );

  // card shell helper
  const CardShell = ({
    data,
    children,
    className = "h-full",
  }: {
    data: SlotData;
    children: React.ReactNode;
    className?: string;
  }) => (
    <motion.div
      layoutId={data.id}
      className={`grid-item ${className}`}
      onClick={() => setSelected(data)}
    >
      {children}
    </motion.div>
  );

  return (
    <section
      ref={sectionRef}
      className="container mx-auto pt-24 pb-16 px-6 bento-about"
    >
      <h1
        ref={headingRef}
        className="font-SpaceGroteskVariable text-3xl md:text-5xl tracking-tight bg-clip-text text-transparent bg-linear-to-r from-gray-900/90 to-gray-500/40 dark:from-white dark:to-white/40"
      >
        About Me
      </h1>
      <p
        ref={paraRef}
        className="mt-3 mb-8 max-w-2xl text-lg md:text-xl font-medium tracking-tight bg-linear-to-br from-black/90 to-gray-400/20 bg-clip-text text-transparent dark:from-white dark:to-white/40 font-SpaceGroteskVariable"
      >
        Building legal technology, AI automation, and elegant UIs, with an
        iterative, performance‑minded approach.
      </p>

      <BentoGridShowcase
        /* Tall left: About Me */
        integration={
          <CardShell data={SLOTS.integration}>
            <CardCurtainReveal className={cardChrome}>
              <CardCurtainRevealBody className="p-6 md:p-8">
                <CardCurtainRevealTitle className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {SLOTS.integration.title}
                </CardCurtainRevealTitle>
                <CardCurtainRevealDescription className="mt-3 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
                  <p>{SLOTS.integration.description}</p>
                </CardCurtainRevealDescription>
                <CardCurtain className="bg-neutral-50 dark:bg-neutral-900" />
              </CardCurtainRevealBody>
              <CardCurtainRevealFooter className="mt-auto">
                <img
                  width="100%"
                  height="100%"
                  alt="About"
                  className="h-48 w-full object-cover"
                  src={SLOTS.integration.image!}
                />
              </CardCurtainRevealFooter>
            </CardCurtainReveal>
          </CardShell>
        }
        /* Top middle: Core Stack */
        trackers={
          <CardShell data={SLOTS.trackers}>
            <CardCurtainReveal className={cardChrome}>
              <CardCurtainRevealBody className="p-6">
                <CardCurtainRevealTitle className="text-xl md:text-2xl font-semibold">
                  {SLOTS.trackers.title}
                </CardCurtainRevealTitle>
                <CardCurtainRevealDescription className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                  <p>{SLOTS.trackers.description}</p>
                </CardCurtainRevealDescription>
                <CardCurtain className="bg-neutral-50 dark:bg-neutral-900" />
              </CardCurtainRevealBody>
              <CardCurtainRevealFooter>
                <img
                  width="100%"
                  height="100%"
                  alt="Core stack"
                  className="h-36 w-full object-cover"
                  src={SLOTS.trackers.image!}
                />
              </CardCurtainRevealFooter>
            </CardCurtainReveal>
          </CardShell>
        }
        /* Top right: AI × Web */
        statistic={
          <CardShell data={SLOTS.statistic}>
            <CardCurtainReveal className={cardChrome}>
              <CardCurtainRevealBody className="p-6">
                <CardCurtainRevealTitle className="text-xl md:text-2xl font-semibold">
                  {SLOTS.statistic.title}
                </CardCurtainRevealTitle>
                <CardCurtainRevealDescription className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                  <p>{SLOTS.statistic.description}</p>
                </CardCurtainRevealDescription>
                <CardCurtain className="bg-neutral-50 dark:bg-neutral-900" />
              </CardCurtainRevealBody>
              <CardCurtainRevealFooter>
                <img
                  width="100%"
                  height="100%"
                  alt="AI and web"
                  className="h-36 w-full object-cover"
                  src={SLOTS.statistic.image!}
                />
              </CardCurtainRevealFooter>
            </CardCurtainReveal>
          </CardShell>
        }
        /* Middle middle: Current Focus */
        focus={
          <CardShell data={SLOTS.focus}>
            <CardCurtainReveal className={cardChrome}>
              <CardCurtainRevealBody className="p-6">
                <CardCurtainRevealTitle className="text-xl md:text-2xl font-semibold">
                  {SLOTS.focus.title}
                </CardCurtainRevealTitle>
                <CardCurtainRevealDescription className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                  <p>{SLOTS.focus.description}</p>
                </CardCurtainRevealDescription>
                <CardCurtain className="bg-neutral-50 dark:bg-neutral-900" />
              </CardCurtainRevealBody>
              <CardCurtainRevealFooter>
                <img
                  width="100%"
                  height="100%"
                  alt="Focus"
                  className="h-36 w-full object-cover"
                  src={SLOTS.focus.image!}
                />
              </CardCurtainRevealFooter>
            </CardCurtainReveal>
          </CardShell>
        }
        /* Middle right: Open Source */
        productivity={
          <CardShell data={SLOTS.productivity}>
            <CardCurtainReveal className={cardChrome}>
              <CardCurtainRevealBody className="p-6">
                <CardCurtainRevealTitle className="text-xl md:text-2xl font-semibold">
                  {SLOTS.productivity.title}
                </CardCurtainRevealTitle>
                <CardCurtainRevealDescription className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                  <p>{SLOTS.productivity.description}</p>
                </CardCurtainRevealDescription>
                <CardCurtain className="bg-neutral-50 dark:bg-neutral-900" />
              </CardCurtainRevealBody>
              <CardCurtainRevealFooter>
                <img
                  width="100%"
                  height="100%"
                  alt="Open source"
                  className="h-36 w-full object-cover"
                  src={SLOTS.productivity.image!}
                />
              </CardCurtainRevealFooter>
            </CardCurtainReveal>
          </CardShell>
        }
        /* Bottom wide (2 cols): Quick Actions */
        shortcuts={
          <CardShell data={SLOTS.shortcuts}>
            <CardCurtainReveal className={cardChrome}>
              <CardCurtainRevealBody className="p-6 md:p-8">
                <CardCurtainRevealTitle className="text-2xl font-semibold">
                  {SLOTS.shortcuts.title}
                </CardCurtainRevealTitle>
                <CardCurtainRevealDescription className="mt-3 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
                  <p>{SLOTS.shortcuts.description}</p>
                </CardCurtainRevealDescription>
                <CardCurtain className="bg-neutral-50 dark:bg-neutral-900" />
              </CardCurtainRevealBody>
              <CardCurtainRevealFooter>
                <img
                  width="100%"
                  height="100%"
                  alt="Shortcuts"
                  className="h-40 w-full object-cover"
                  src={SLOTS.shortcuts.image!}
                />
              </CardCurtainRevealFooter>
            </CardCurtainReveal>
          </CardShell>
        }
      />

      {/* Morph dialog – preserves your shared-element layoutId pattern and drawer-on-mobile behavior */}
      <AdaptiveMorphDialog
        open={!!selected}
        onOpenChange={(v) => !v && setSelected(null)}
        layoutId={selected?.id ?? "about-slot-integration"}
        title={selected?.title}
        subtitle={selected?.subtitle}
        description={
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {selected?.description}
            </p>
            {!!selected?.chips?.length && (
              <div className="flex flex-wrap gap-2 pt-2">
                {selected!.chips!.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white text-xs md:text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        }
        image={selected?.image}
      />
    </section>
  );
}
