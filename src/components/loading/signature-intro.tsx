"use client";

import React, { useEffect, useState } from "react";
import SignatureLogo from "./signature-logo";

const INTRO_DURATION_MS = 3000; // Total intro screen duration

const SignatureIntro: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Optional: only show once per session
    const alreadySeen = sessionStorage.getItem("signature-intro-played");
    if (alreadySeen) {
      setVisible(false);
      // Dispatch event immediately if already seen
      window.dispatchEvent(
        new CustomEvent("signature-animation-complete", {
          detail: { skipped: true },
        })
      );
      return;
    }

    sessionStorage.setItem("signature-intro-played", "1");

    // Lock scroll while intro is visible
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timeout = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = originalOverflow;
    }, INTRO_DURATION_MS);

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
    // Dispatch custom event that Hero section can listen to
    window.dispatchEvent(
      new CustomEvent("signature-animation-complete", {
        detail: { skipped: false },
      })
    );
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-neutral-950 text-white">
      <div
        className={`pointer-events-none transition-opacity duration-700 ${
          animationComplete ? "opacity-0" : "opacity-100"
        }`}
      >
        <SignatureLogo
          className="w-[280px] md:w-[360px]"
          duration={2.2}
          onComplete={handleAnimationComplete}
        />
      </div>
    </div>
  );
};

export default SignatureIntro;
