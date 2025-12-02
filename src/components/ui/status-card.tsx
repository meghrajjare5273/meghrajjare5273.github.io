import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Copy } from "lucide-react";

// --- Sub-components for cleaner structure ---

const SectionLabel = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`block text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-500 font-medium mb-2 ${className}`}
  >
    {children}
  </span>
);

const MetricBlock = ({
  label,
  value,
  subtext,
}: {
  label: string;
  value: string;
  subtext: string;
}) => (
  <div className="flex flex-col items-start reveal-element">
    <SectionLabel>{label}</SectionLabel>
    <span className="text-[28px] md:text-[32px] leading-tight font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
      {value}
    </span>
    <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-[120px] leading-relaxed">
      {subtext}
    </span>
  </div>
);

const TechItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1 reveal-element">
    <span className="text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-600">
      {label}
    </span>
    <span className="text-[13px] md:text-[14px] font-medium text-neutral-800 dark:text-neutral-200">
      {value}
    </span>
  </div>
);

// --- Main Component ---

const StatusCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Minimalist GSAP Entry
  useGSAP(
    () => {
      // Set initial state to avoid flash of unstyled content
      gsap.set(".reveal-element", { y: 20, opacity: 0 });
      gsap.set(".divider", { scaleX: 0, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Fade in container border/bg (optional if handled by parent, but nice here)
      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 }
      );

      // 2. Staggered reveal of text content
      tl.to(
        ".reveal-element",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
        },
        "-=0.3"
      );

      // 3. Expand dividers horizontally
      tl.to(
        ".divider",
        {
          scaleX: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "expo.out",
        },
        "-=0.8"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="group relative w-full h-[560px] sm:max-h-[560px] bg-white dark:bg-[#0A0A0A] border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 md:p-8 font-about flex flex-col gap-4 md:gap-8 transition-colors duration-300 overflow-hidden pointer-events-none"
    >
      {/* Optional: Subtle hover state for the whole card border */}
      <div className="absolute inset-0 border border-neutral-900/0 dark:border-neutral-100/0 rounded-lg group-hover:border-neutral-900/5 dark:group-hover:border-neutral-100/5 transition-colors duration-500 pointer-events-none" />

      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-6 reveal-element">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {/* <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <SectionLabel className="mb-0!">Current Status</SectionLabel> */}
          </div>
          <h2 className="text-2xl md:text-3xl font-medium text-neutral-900 dark:text-neutral-50 tracking-tight">
            Available for <br className="hidden md:block" />
            Software Engg. Roles
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Building revolutionary applications leveraging modern technologies.
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-1 md:gap-0 mt-2 md:mt-0">
          <SectionLabel className="mb-1!">Last Updated</SectionLabel>
          <span className="text-xs font-mono text-neutral-800 dark:text-neutral-300">
            DEC 2025
          </span>
          <span className="text-[10px] text-neutral-400 dark:text-neutral-600">
            PUNE, MH
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="divider h-px w-full bg-neutral-200 dark:bg-neutral-800 origin-left" />

      {/* --- Metrics Row --- */}
      <div className="flex flex-wrap gap-x-12 gap-y-4 md:gap-y-8">
        <MetricBlock
          label="Years Experience"
          value="2+"
          subtext="Building full-stack applications"
        />
        <MetricBlock
          label="Projects Shipped"
          value="5"
          subtext="Production-grade applications"
        />
      </div>

      {/* Divider */}
      <div className="divider h-px w-full bg-neutral-200 dark:bg-neutral-800 origin-left" />

      {/* --- Tech Stack Section --- */}
      {/* <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between reveal-element">
          <SectionLabel className="mb-0!">Tech Stack</SectionLabel> */}
      {/* Subtle CTA/Icon */}
      {/* <ArrowUpRight className="w-4 h-4 text-neutral-400 dark:text-neutral-600" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
          <TechItem
            label="Frontend"
            value="React, Next.js, TypeScript, Tailwind"
          />
          <TechItem
            label="Styling & Motion"
            value="Tailwind CSS, GSAP, Framer Motion"
          />
          <TechItem label="Tooling" value="Git, Vite, Webpack, Turborepo" />
          <TechItem label="Backend" value="Node.js, Express, PostgreSQL" />
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default StatusCard;
