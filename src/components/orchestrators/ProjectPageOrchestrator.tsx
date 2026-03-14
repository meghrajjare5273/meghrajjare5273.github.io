import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ProjectsPageOrchestratorProps {
  children: React.ReactNode;
}

const ANIM = {
  duration: 0.75,
  ease: "power4.inOut",
  stagger: {
    amount: 0.2,
    grid: "auto" as const,
    axis: "x" as const,
  },
} as const;

export function ProjectsPageOrchestrator({
  children,
}: ProjectsPageOrchestratorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const isAnimating = useRef(false);

  panelsRef.current = [];
  const addToPanelsRef = (el: HTMLDivElement | null) => {
    if (el && !panelsRef.current.includes(el)) {
      panelsRef.current.push(el);
    }
  };

  // Only animate panels visible in the current viewport
  const getVisiblePanels = () =>
    panelsRef.current.filter((el) => el.offsetWidth > 0);

  useGSAP(
    () => {
      // FOUC guard — reveal content only after GSAP context is ready
      gsap.set(contentRef.current, { visibility: "visible", opacity: 1 });

      const visiblePanels = getVisiblePanels();

      // --- ENTRANCE: panels drop down to reveal content ---
      gsap.set(containerRef.current, { autoAlpha: 1, pointerEvents: "all" });
      gsap.set(visiblePanels, { yPercent: 0 });

      gsap.to(visiblePanels, {
        yPercent: 100,
        duration: ANIM.duration,
        ease: ANIM.ease,
        stagger: ANIM.stagger,
        onComplete: () => {
          gsap.set(containerRef.current, {
            autoAlpha: 0,
            pointerEvents: "none",
          });
        },
      });

      // --- EXIT: panels rise up to cover content ---
      const handleBeforePreparation = () => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        tl.current?.kill();

        const visiblePanels = getVisiblePanels();

        gsap.set(containerRef.current, { autoAlpha: 1, pointerEvents: "all" });
        gsap.set(visiblePanels, { yPercent: -100 });

        tl.current = gsap
          .timeline()
          .to(visiblePanels, {
            yPercent: 0,
            duration: ANIM.duration,
            ease: ANIM.ease,
            stagger: ANIM.stagger,
          })
          .call(
            () => {
              window.dispatchEvent(
                new CustomEvent("page-transition-complete", {
                  detail: { timestamp: Date.now() },
                }),
              );
            },
            undefined,
            "+=0.1",
          );
      };

      document.addEventListener(
        "astro:before-preparation",
        handleBeforePreparation,
      );
      return () =>
        document.removeEventListener(
          "astro:before-preparation",
          handleBeforePreparation,
        );
    },
    { scope: containerRef },
  );

  return (
    <>
      {/* ORCHESTRATOR OVERLAY */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-100000 pointer-events-none grid grid-cols-3 md:grid-cols-5 h-full w-screen overflow-hidden"
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            ref={addToPanelsRef}
            className={`
              relative h-full w-full min-h-dvh
              will-change-transform transform-gpu
              bg-[#2a2a2a] dark:bg-[#0e0e0e]
              border-r border-neutral-800/50 dark:border-neutral-900/50 last:border-r-0
              outline-4 outline-[#2a2a2a] dark:outline-[#0e0e0e] -outline-offset-2
              ${index > 2 ? "hidden md:block" : "block"}
            `}
          />
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div ref={contentRef} style={{ minHeight: "100vh", width: "100%" }}>
        {children}
      </div>
    </>
  );
}
