// src/components/SignatureIntro.tsx
import React, { useEffect, useState } from "react";
import SignatureLogo from "./signature-logo";

const INTRO_DURATION_MS = 2800; // match SignatureLogo duration + a bit of padding

const SignatureIntro: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Optional: only show once per session
    const alreadySeen = sessionStorage.getItem("signature-intro-played");
    if (alreadySeen) {
      setVisible(false);
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

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-neutral-950 text-white">
      <div className="animate-fade-out pointer-events-none">
        <SignatureLogo className="w-[280px] md:w-[360px]" duration={2.2} />
      </div>
    </div>
  );
};

export default SignatureIntro;
