// src/components/orchestrators/PageOrchestrator.tsx
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SignatureLogo from "../loading/signature-logo";
import { introState } from "@/lib/intro-state"; // ← NEW

interface PageOrchestratorProps {
  children: React.ReactNode;
}

const SIGNATURE_DRAW_DURATION = 2.0;

function computeShouldPlayIntro(): boolean {
  if (typeof window === "undefined") return false;
  const hasVisited = sessionStorage.getItem("intro-completed");
  const navEntry = performance.getEntriesByType(
    "navigation",
  )[0] as PerformanceNavigationTiming;
  return !(hasVisited && navEntry?.type !== "reload");
}

export function PageOrchestrator({ children }: PageOrchestratorProps) {
  const [shouldPlayIntro] = useState<boolean>(computeShouldPlayIntro);
  const [introFinished, setIntroFinished] = useState<boolean>(
    () => !shouldPlayIntro,
  );

  const introContainerRef = useRef<HTMLDivElement>(null);
  const signatureWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleBeforePreparation = () => {
      // Clear sessionStorage flag if navigating away from home
      if (
        window.location.pathname !== "/" &&
        window.location.pathname !== "/index.astro"
      ) {
        sessionStorage.removeItem("intro-completed");
      }
      // ── KEY CHANGE ──────────────────────────────────────────────
      // Always reset the signal so HeroSection starts fresh on the
      // next visit to "/". Without this, canAnimate would be set
      // immediately on re-entry without the animation logic running.
      introState.reset();
      // ────────────────────────────────────────────────────────────
    };

    document.addEventListener(
      "astro:before-preparation",
      handleBeforePreparation,
    );
    return () => {
      document.removeEventListener(
        "astro:before-preparation",
        handleBeforePreparation,
      );
    };
  }, []);

  useGSAP(() => {
    if (!shouldPlayIntro) {
      // Returning visitor — skip intro, make content visible immediately.
      gsap.set(contentRef.current, { opacity: 1, zIndex: 1 });

      // ── KEY CHANGE ──────────────────────────────────────────────
      // Mark the signal BEFORE dispatching. Any island whose useEffect
      // runs AFTER this point will check the flag and act immediately
      // without needing to receive the event.
      introState.markComplete();
      // ────────────────────────────────────────────────────────────

      window.dispatchEvent(
        new CustomEvent("page-intro-complete", {
          detail: { timestamp: Date.now() },
        }),
      );
      return;
    }

    // First-time visitor — run full intro animation.
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIntroFinished(true);
        document.body.style.overflow = originalOverflow;
        sessionStorage.setItem("intro-completed", "true");
      },
    });

    gsap.set(contentRef.current, { zIndex: 1, opacity: 1 });
    gsap.set(introContainerRef.current, { zIndex: 9999, yPercent: 0 });

    tl.to({}, { duration: SIGNATURE_DRAW_DURATION * 0.85 });
    tl.to(
      signatureWrapperRef.current,
      { y: -80, opacity: 0, duration: 0.8, ease: "power2.in" },
      "exit",
    );
    tl.to(
      introContainerRef.current,
      {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        onStart: () => {
          // ── KEY CHANGE ────────────────────────────────────────────
          introState.markComplete(); // mark before dispatching
          // ──────────────────────────────────────────────────────────
          window.dispatchEvent(
            new CustomEvent("page-intro-complete", {
              detail: { timestamp: Date.now() },
            }),
          );
        },
      },
      "exit+=0.2",
    );

    return () => {
      document.body.style.overflow = originalOverflow;
      tl.kill();
    };
  }, [shouldPlayIntro]);

  return (
    <>
      {shouldPlayIntro && !introFinished && (
        <div
          ref={introContainerRef}
          className="fixed inset-0 w-full h-full bg-[#eceae8] dark:bg-[#181818] text-foreground flex items-center justify-center will-change-transform"
          style={{ zIndex: 9999 }}
        >
          <div ref={signatureWrapperRef} className="relative z-10 p-4">
            <SignatureLogo
              className="w-70 md:w-90 text-foreground"
              duration={SIGNATURE_DRAW_DURATION}
            />
          </div>
        </div>
      )}
      <div ref={contentRef} className="relative min-h-screen bg-background">
        {children}
      </div>
    </>
  );
}
