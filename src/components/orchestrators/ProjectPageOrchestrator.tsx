import React, { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ProjectsPageOrchestratorProps {
  children: React.ReactNode;
}

// We define the grid structure in CSS classes, 
// so we don't need a hardcoded "PANEL_COUNT" constant for logic anymore.
// Mobile = 3 cols, Desktop = 5 cols.

export function ProjectsPageOrchestrator({
  children,
}: ProjectsPageOrchestratorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const [isAnimating, setIsAnimating] = useState(false);

  // Clear refs on re-render to handle resizing/responsive panel counts
  panelsRef.current = [];
  const addToPanelsRef = (el: HTMLDivElement | null) => {
    if (el && !panelsRef.current.includes(el)) {
      panelsRef.current.push(el);
    }
  };

  // --- ENTRANCE ANIMATION (The Reveal on Page Load) ---
  useLayoutEffect(() => {
    if (contentRef.current) {
      gsap.set(contentRef.current, { visibility: "visible", opacity: 1 });
    }

    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, { autoAlpha: 1, pointerEvents: "all" });
      gsap.set(textRef.current, { opacity: 0 });

      // 2. Start state: Panels fully cover the screen
      gsap.set(panelsRef.current, { yPercent: 0 });

      // 3. Animate: Drop panels DOWN
      gsap.to(panelsRef.current, {
        yPercent: 100,
        duration: 0.8,
        ease: "power4.inOut",
        stagger: {
          amount: 0.25,
          from: "start",
          grid: "auto", // Helps GSAP understand the grid layout
          axis: "x",
        },
        onComplete: () => {
          gsap.set(containerRef.current, {
            autoAlpha: 0,
            pointerEvents: "none",
          });
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useGSAP(
    () => {
      // --- EXIT ANIMATION ---
      const handleBeforePreparation = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        if (tl.current) tl.current.kill();
        tl.current = gsap.timeline();

        gsap.set(containerRef.current, { autoAlpha: 1, pointerEvents: "all" });
        gsap.set(panelsRef.current, { yPercent: -100 });
        gsap.set(textRef.current, { opacity: 0, y: 30 });

        tl.current
          .to(panelsRef.current, {
            yPercent: 0,
            duration: 0.7,
            ease: "power3.inOut",
            stagger: {
              amount: 0.2,
              from: "start",
              grid: "auto",
              axis: "x",
            },
          })
          .to(
            textRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "back.out(2)",
            },
            "-=0.3"
          )
          .call(
            () => {
              window.dispatchEvent(
                new CustomEvent("page-transition-complete", {
                  detail: { timestamp: Date.now() },
                })
              );
            },
            undefined,
            "+=0.1"
          );
      };

      document.addEventListener(
        "astro:before-preparation",
        handleBeforePreparation
      );

      return () => {
        document.removeEventListener(
          "astro:before-preparation",
          handleBeforePreparation
        );
      };
    },
    { scope: containerRef }
  );

  return (
    <>
      {/* ORCHESTRATOR CONTAINER */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-100000 pointer-events-none grid grid-cols-3 md:grid-cols-5 h-full w-screen overflow-hidden"
      >
        {/* Generate 5 panels max (CSS hides the extras on mobile if needed, 
            but here we just rely on grid-cols to size them).
            
            We generate 5 divs. On mobile (grid-cols-3), the last 2 will wrap 
            to the next row unless we force row-1. 
            
            BETTER FIX: Just generate 5, forcing them all to row-1 (or just let them exist).
            Since we animate yPercent, having wrapped items is bad. 
            We must force them to stay on row 1.
        */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            ref={addToPanelsRef}
            // --- FIX IS HERE ---
            // 1. md:block hidden: Only show 3 panels on mobile (indices 0,1,2), show 5 on desktop
            //    (We conditionally hide indices 3 and 4 on mobile)
            className={`
                relative h-full w-full 
                will-change-transform 
                transform-gpu
                min-h-dvh
                bg-[#2a2a2a] dark:bg-[#0e0e0e] 
                border-r border-neutral-800/50 dark:border-neutral-900/50 last:border-r-0
                
                /* THE SEAL: Same color outline to overlap sub-pixel gaps */
                outline-4 outline-[#2a2a2a] dark:outline-[#0e0e0e] -outline-offset-2

                /* Responsive Logic: Hide 4th & 5th panel on mobile */
                ${index > 2 ? "hidden md:block" : "block"}
            `}
          />
        ))}

        {/* CENTER STAGE TEXT */}
        <div
          ref={textRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 pointer-events-none"
        >
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-akira font-bold text-[#eceae8] tracking-tighter uppercase">
            Projects
          </h2>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div ref={contentRef} style={{ minHeight: "100vh", width: "100%" }}>
        {children}
      </div>
    </>
  );
}