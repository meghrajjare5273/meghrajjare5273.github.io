"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SignatureLogo from "../loading/signature-logo";

interface PageOrchestratorProps {
  children: React.ReactNode;
}

const SIGNATURE_DRAW_DURATION = 2.5;

export function PageOrchestrator({ children }: PageOrchestratorProps) {
  const [introFinished, setIntroFinished] = useState(false);
  const introContainerRef = useRef<HTMLDivElement>(null);
  const signatureWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Lock body scroll initially
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIntroFinished(true);
        document.body.style.overflow = originalOverflow;
      },
    });

    // Initial Setup
    gsap.set(contentRef.current, {
      zIndex: 1,
      opacity: 1, // Content is visible underneath the curtain
    });

    gsap.set(introContainerRef.current, {
      zIndex: 50,
      yPercent: 0,
    });

    // === ANIMATION SEQUENCE ===

    // 1. Allow Signature to Draw (2.5s)
    // Note: The internal animation of SignatureLogo runs automatically on mount.
    // We just simply wait here for sync.
    tl.to({}, { duration: SIGNATURE_DRAW_DURATION * 0.85 });

    // 2. Cinematic Signature Exit (Float Up & Fade)
    tl.to(
      signatureWrapperRef.current,
      {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
      },
      "exit"
    );

    // 3. Curtain Lift (The Reveal)
    // We slide the black background up to reveal the content
    tl.to(
      introContainerRef.current,
      {
        yPercent: -100,
        duration: 1.4,
        ease: "power4.inOut", // Dramatic, premium ease
        onStart: () => {
          // Trigger the Hero animations just as the curtain starts moving fast
          window.dispatchEvent(
            new CustomEvent("page-intro-complete", {
              detail: { timestamp: Date.now() },
            })
          );
        },
      },
      "exit+=0.4"
    ); // Overlap slightly with signature fade

    // Cleanup
    return () => {
      document.body.style.overflow = originalOverflow;
      tl.kill();
    };
  }, []);

  return (
    <>
      {/* Intro Curtain */}
      {!introFinished && (
        <div
          ref={introContainerRef}
          className="fixed inset-0 w-full h-full bg-background text-foreground flex items-center justify-center will-change-transform"
          style={{ zIndex: 9999 }} // Ensure it's on top
        >
          <div ref={signatureWrapperRef} className="relative z-10 p-4">
            <SignatureLogo
              className="w-[280px] md:w-[360px] text-foreground"
              duration={SIGNATURE_DRAW_DURATION}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div ref={contentRef} className="relative min-h-screen bg-background">
        {children}
      </div>
    </>
  );
}
