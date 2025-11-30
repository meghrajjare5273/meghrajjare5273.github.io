// src/hooks/use-gsap-animation.ts
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

let gsapInitialized = false;

export function initGSAP() {
  if (typeof window !== "undefined" && !gsapInitialized) {
    gsap.registerPlugin(ScrollTrigger, );
    gsapInitialized = true;
  }
}

export function useScrollAnimation(
  animationFn: () => gsap.core.Timeline | void,
  deps: any[] = []
) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    initGSAP();
    const animation = animationFn();

    return () => {
      if (animation && "kill" in animation) {
        animation.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, deps);

  return containerRef;
}
