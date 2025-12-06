

import React, { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SignatureLogo from "../loading/signature-logo";

interface PageOrchestratorProps {
  children: React.ReactNode;
}

const SIGNATURE_DRAW_DURATION = 2.0;

export function PageOrchestrator({ children }: PageOrchestratorProps) {
  const [introFinished, setIntroFinished] = useState(false);
  const [shouldPlayIntro, setShouldPlayIntro] = useState(true);
  
  const introContainerRef = useRef<HTMLDivElement>(null);
  const signatureWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const hasVisited = sessionStorage.getItem("intro-completed");
    if (hasVisited) {
      setShouldPlayIntro(false);
      setIntroFinished(true);
    }
  }, []);

  useGSAP(() => {
    if (!shouldPlayIntro) {
      gsap.set(contentRef.current, { opacity: 1, zIndex: 1 });
      
      window.dispatchEvent(
        new CustomEvent("page-intro-complete", { detail: { timestamp: Date.now() } })
      );
      return;
    }

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
    // FIX: Increased zIndex from 50 to 9999 to correctly cover all page content
    gsap.set(introContainerRef.current, { zIndex: 9999, yPercent: 0 });

    tl.to({}, { duration: SIGNATURE_DRAW_DURATION * 0.85 });

    tl.to(signatureWrapperRef.current, {
        y: -80, opacity: 0, duration: 0.8, ease: "power2.in",
    }, "exit");

    tl.to(introContainerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        onStart: () => {
          window.dispatchEvent(
            new CustomEvent("page-intro-complete", { detail: { timestamp: Date.now() } })
          );
        },
    }, "exit+=0.2");

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
              className="w-[280px] md:w-[360px] text-foreground"
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