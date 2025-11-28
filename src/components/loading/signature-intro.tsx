// src/components/loading/signature-intro.tsx

import React, { useEffect, useState } from "react";
import SignatureLogo from "./signature-logo";

const INTRO_DURATION_MS = 3000;

const SignatureIntro: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Lock scroll while intro is visible
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timeout = window.setTimeout(() => {
      setVisible(false);
      setAnimationComplete(true);
      document.body.style.overflow = originalOverflow;

      // Fire the custom event for downstream entrance
      window.dispatchEvent(new CustomEvent("signature-intro-complete"));
    }, INTRO_DURATION_MS);

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-neutral-950 text-white transition-opacity duration-700">
      <div className="flex items-center justify-center w-full h-full px-4">
        <SignatureLogo className="w-[280px] md:w-[360px]" duration={2.2} />
      </div>
    </div>
  );
};
export default SignatureIntro;
