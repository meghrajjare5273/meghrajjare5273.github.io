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

  const SLOTS = useMemo(
    () => ({
      integration: {
        id: "about-slot-integration",
        title: "About Me",
        subtitle: "Full‑Stack + ML",
        description:
          "Building legal tech, AI automations, and polished UIs with a product mindset and performance-first approach.",
        image: "images/about/bg-fullstack.jpg",
        chips: ["React/Next", "TypeScript", "FastAPI", "Python", "Postgres"],
      },
      trackers: {
        id: "about-slot-trackers",
        title: "Core Stack",
        subtitle: "Daily Drivers",
        description:
          "React, Next.js, TypeScript, Python, and FastAPI compose the backbone of most builds.",
        chips: ["React", "Next.js", "TypeScript", "Python", "FastAPI"],
      },
      statistic: {
        id: "about-slot-statistic",
        title: "AI × Web",
        subtitle: "Systems + UX",
        description:
          "Where ML pipelines meet interactive UX: shipping practical AI for real products.",
        chips: ["NLP", "RAG", "RL", "GPU", "SB3"],
      },
      focus: {
        id: "about-slot-focus",
        title: "Current Focus",
        subtitle: "ML Ops + UI",
        description:
          "Reinforcement learning experiments, contract analysis tooling, and refined UI motion.",
        chips: ["RL", "Contracts AI", "UI Motion", "Performance"],
      },
      productivity: {
        id: "about-slot-productivity",
        title: "Open Source",
        subtitle: "Community",
        description:
          "Actively sharing code and re-usable UI/ML building blocks on GitHub.",
        chips: ["LegalMind", "DebateBot", "UI Kits"],
      },
      shortcuts: {
        id: "about-slot-shortcuts",
        title: "Quick Actions",
        subtitle: "Open to collaborate",
        description:
          "Get the resume, browse the code, or ping for scoped projects.",
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
        /* Tall left card: narrative + CTA */
        integration={
          <CardShell data={SLOTS.integration}>
            <CardCurtainReveal className="h-full rounded-2xl border border-white/10 bg-linear-to-b from-neutral-50/70 to-neutral-100/30 dark:from-neutral-900/60 dark:to-neutral-900/20 shadow-lg">
              <CardCurtain />
              <CardCurtainRevealBody className="p-6 md:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/50">
                  <span className="text-2xl" role="img" aria-label="sparkles">
                    ✳️
                  </span>
                </div>
                <CardCurtainRevealTitle className="text-2xl md:text-3xl font-semibold">
                  {SLOTS.integration.title}
                </CardCurtainRevealTitle>
                <CardCurtainRevealDescription className="mt-2 text-sm text-muted-foreground">
                  {SLOTS.integration.description}
                </CardCurtainRevealDescription>
              </CardCurtainRevealBody>
              <CardCurtainRevealFooter className="mt-auto flex items-center justify-between border-t border-white/10 p-4">
                <button className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm hover:bg-white/10 transition">
                  <Settings2 className="mr-2 h-4 w-4" />
                  Read more
                </button>
                <span className="inline-flex items-center text-xs text-muted-foreground">
                  Hover to reveal
                </span>
              </CardCurtainRevealFooter>
            </CardCurtainReveal>
          </CardShell>
        }
        /* Top middle: avatars/stack */
        trackers={
          <CardShell data={SLOTS.trackers}>
            <div className="h-full rounded-2xl border border-white/10 bg-background/60 p-6 backdrop-blur">
              <div>
                <div className="text-base font-medium">Core Stack</div>
                <div className="text-sm text-muted-foreground">
                  Daily Drivers
                </div>
              </div>
              <div className="mt-6 flex -space-x-2 overflow-hidden">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-white ring-2 ring-background">
                  TS
                </div>
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white ring-2 ring-background">
                  Py
                </div>
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-700 text-white ring-2 ring-background">
                  Rx
                </div>
              </div>
            </div>
          </CardShell>
        }
        /* Top right: big symbol */
        statistic={
          <CardShell data={SLOTS.statistic}>
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />
              <div className="relative z-10 flex h-full items-center justify-center p-6">
                <span className="text-6xl md:text-7xl font-bold text-foreground/90">
                  AI×Web
                </span>
              </div>
            </div>
          </CardShell>
        }
        /* Middle middle: focus */
        focus={
          <CardShell data={SLOTS.focus}>
            <div className="h-full rounded-2xl border border-white/10 bg-background/60 p-6 backdrop-blur">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-base font-medium">Current Focus</div>
                  <div className="text-sm text-muted-foreground">
                    Productivity Analytics
                  </div>
                </div>
                <span className="rounded-full border border-orange-300 px-2 py-0.5 text-xs text-orange-600">
                  Range Ratio
                </span>
              </div>
              <div className="mt-2">
                <span className="text-5xl font-bold">42%</span>
              </div>
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>Depth work</span>
                <span>Monthly avg</span>
              </div>
            </div>
          </CardShell>
        }
        /* Middle right: open source */
        productivity={
          <CardShell data={SLOTS.productivity}>
            <div className="h-full rounded-2xl border border-white/10 bg-background/60 p-6 backdrop-blur">
              <div className="text-base font-medium">Open Source</div>
              <div className="text-sm text-muted-foreground">
                Reusable UI/ML components and tools
              </div>
            </div>
          </CardShell>
        }
        /* Bottom wide: shortcuts */
        shortcuts={
          <CardShell data={SLOTS.shortcuts}>
            <div className="h-full rounded-2xl border border-white/10 bg-background/60 p-6 md:p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-base font-medium">Quick Actions</div>
                <div className="text-sm text-muted-foreground">
                  Resume, GitHub, Contact
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md border bg-background font-mono text-xs font-medium text-muted-foreground">
                  <Command className="h-3 w-3" />
                </div>
                <Plus className="h-3 w-3 text-muted-foreground" />
                <div className="flex h-7 w-7 items-center justify-center rounded-md border bg-background font-mono text-xs font-medium text-muted-foreground">
                  M
                </div>
              </div>
            </div>
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
