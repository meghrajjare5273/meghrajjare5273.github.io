"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SignatureLogo from "../loading/signature-logo";

interface PageOrchestratorProps {
  children: React.ReactNode;
}

const SIGNATURE_DRAW_DURATION = 2.2; // SVG draw duration
const SIGNATURE_FADE_DURATION = 0.7; // Fade out duration
const HERO_DELAY = 0.2; // Small gap between intro fade and hero start

export function PageOrchestrator({ children }: PageOrchestratorProps) {
  const [introComplete, setIntroComplete] = useState(false);
  const introRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    // Lock scroll during intro
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Create master timeline
    const masterTl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        document.body.style.overflow = originalOverflow;
      },
    });

    masterTimelineRef.current = masterTl;

    // Initial states
    gsap.set(contentRef.current, { opacity: 0 });
    gsap.set(introRef.current, { opacity: 1 });

    // Timeline sequence:
    // 1. SVG signature draws (handled by SignatureLogo internally)
    // 2. Wait for signature to complete
    // 3. Fade out intro screen
    // 4. Dispatch event + show content
    // 5. Hero section animates in (handled in Hero component)

    masterTl
      .to({}, { duration: SIGNATURE_DRAW_DURATION }) // Wait for SVG to draw
      .to(
        introRef.current,
        {
          opacity: 0,
          duration: SIGNATURE_FADE_DURATION,
          onComplete: () => {
            setIntroComplete(true);
            // Dispatch event for Hero to start animating
            window.dispatchEvent(
              new CustomEvent("page-intro-complete", {
                detail: { timestamp: Date.now() },
              })
            );
          },
        },
        `+=${HERO_DELAY}` // Small pause after draw completes
      )
      .to(
        contentRef.current,
        {
          opacity: 1,
          duration: 0.01, // Instant visibility, animations handled by children
        },
        "-=0.3" // Start showing content slightly before intro fully fades
      );

    return () => {
      document.body.style.overflow = originalOverflow;
      masterTl.kill();
    };
  }, []);

  return (
    <>
      {/* Intro Screen */}
      {!introComplete && (
        <div
          ref={introRef}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-neutral-950 text-white"
          style={{ pointerEvents: introComplete ? "none" : "auto" }}
        >
          <SignatureLogo
            className="w-[280px] md:w-[360px]"
            duration={SIGNATURE_DRAW_DURATION}
          />
        </div>
      )}

      {/* Main Content - Always mounted but initially hidden */}
      <div ref={contentRef} style={{ opacity: 0 }}>
        {children}
      </div>
    </>
  );
}
