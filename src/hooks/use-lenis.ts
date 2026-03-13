import { useEffect, useState } from "react";
import type Lenis from "lenis";

export function useLenis(): Lenis | null {
  const [lenis, setLenis] = useState<Lenis | null>(() => {
    // On first render, grab the already-initialized global instance
    return typeof window !== "undefined"
      ? ((window as any).lenis ?? null)
      : null;
  });

  useEffect(() => {
    // If already available (most common case — script runs before islands hydrate)
    if ((window as any).lenis) {
      setLenis((window as any).lenis);
      return;
    }

    // Fallback: wait for the 'lenis:ready' event
    const handleReady = (e: Event) => {
      setLenis((e as CustomEvent<Lenis>).detail);
    };
    document.addEventListener("lenis:ready", handleReady);
    return () => document.removeEventListener("lenis:ready", handleReady);
  }, []);

  // Stay in sync after each navigation (astro:after-swap re-inits Lenis + dispatches lenis:ready)
  useEffect(() => {
    const handleReady = (e: Event) => {
      setLenis((e as CustomEvent<Lenis>).detail);
    };
    document.addEventListener("lenis:ready", handleReady);
    return () => document.removeEventListener("lenis:ready", handleReady);
  }, []);

  return lenis;
}
