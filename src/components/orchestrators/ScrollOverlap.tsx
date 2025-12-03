// src/components/landing/ScrollOverlap.tsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  id?: string;
  children: React.ReactNode;
  overlapHeight?: number; // optional, px or vh based decision
};

export default function ScrollOverlap({ id, children, overlapHeight }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const fixedRef = useRef<HTMLDivElement | null>(null);
  const inFlowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!trackRef.current || !fixedRef.current || !inFlowRef.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return; // no animation

    const ctx = gsap.context(() => {
      // compute travel distance
      const trackHeight =
        overlapHeight ??
        Math.max(
          window.innerHeight * 0.9,
          trackRef.current?.offsetHeight || window.innerHeight
        );
      // Ensure track has the desired height (so page length preserved)
      gsap.set(trackRef.current, { height: `${trackHeight}px` });

      // When animation starts, hide the in-flow section so we don't show duplicates
      const showInFlow = () =>
        gsap.set(inFlowRef.current, { visibility: "visible" });
      const hideInFlow = () =>
        gsap.set(inFlowRef.current, { visibility: "hidden" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top top",
          end: () => `+=${trackHeight}`,
          scrub: true,
          onEnter: hideInFlow,
          onLeaveBack: showInFlow,
          onLeave: showInFlow,
        },
      });

      tl.fromTo(
        fixedRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, ease: "none" }
      );

      // Clean up
      ScrollTrigger.refresh();
      return () => {
        tl.kill();
      };
    }, rootRef);

    return () => ctx.revert();
  }, [overlapHeight]);

  return (
    <div ref={rootRef} id={id} className="relative">
      {/* in-flow placeholder: keeps DOM semantics and layout */}
      <div ref={inFlowRef} className="w-full">
        {children}
      </div>

      {/* track: driver element in the page flow to produce scroll distance */}
      <div ref={trackRef} className="w-full" aria-hidden />

      {/* fixed overlay used only for animation; aria-hidden so screen readers read in-flow content */}
      <div
        ref={fixedRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-screen pointer-events-none z-50"
      >
        <div className="w-full h-full pointer-events-auto">{children}</div>
      </div>
    </div>
  );
}
