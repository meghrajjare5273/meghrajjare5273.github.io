/**
 * type: uploaded file
 * fileName: meghrajjare5273/meghrajjare5273.github.io/meghrajjare5273.github.io-gsap/src/components/ui/cards/morph.tsx
 */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useIsMobile } from "@/hooks/use-media-query";
import { useGSAP } from "@gsap/react";

type AdaptiveMorphDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  layoutId: string;
  title?: string;
  subtitle?: string;
  description?: React.ReactNode;
  image?: string;
  children?: React.ReactNode;
};

export function AdaptiveMorphDialog({
  open,
  onOpenChange,
  layoutId,
  title,
  subtitle,
  description,
  image,
  children,
}: AdaptiveMorphDialogProps) {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Internal state to keep component mounted during exit animation
  const [isRendered, setIsRendered] = useState(open);

  // Sync internal render state with open prop
  useEffect(() => {
    if (open) setIsRendered(true);
  }, [open]);

  useGSAP(
    () => {
      if (!isRendered || !backdropRef.current || !dialogRef.current) return;

      const backdrop = backdropRef.current;
      const dialog = dialogRef.current;

      if (open) {
        // OPEN ANIMATION
        // Reset initial state
        gsap.set(backdrop, { opacity: 0 });

        if (isMobile) {
          gsap.set(dialog, { y: "100%", opacity: 0 });
        } else {
          gsap.set(dialog, { y: 20, opacity: 0, scale: 0.95 });
        }

        // Animate In
        const tl = gsap.timeline();
        tl.to(backdrop, {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        }).to(
          dialog,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: isMobile ? "power3.out" : "back.out(1.1)",
          },
          "<"
        ); // start slightly overlapping or sync
      } else {
        // CLOSE ANIMATION
        const tl = gsap.timeline({
          onComplete: () => setIsRendered(false), // Unmount after animation
        });

        tl.to(backdrop, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        }).to(
          dialog,
          {
            y: isMobile ? "100%" : 10,
            opacity: 0,
            scale: isMobile ? 1 : 0.95,
            duration: 0.3,
            ease: "power2.in",
          },
          0
        ); // Run simultaneously
      }
    },
    { scope: containerRef, dependencies: [open, isRendered, isMobile] }
  );

  // Button animations
  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleCloseHover = contextSafe(() => {
    gsap.to(closeButtonRef.current, {
      scale: 1.1,
      rotation: 90,
      duration: 0.3,
    });
  });

  const handleCloseLeave = contextSafe(() => {
    gsap.to(closeButtonRef.current, { scale: 1, rotation: 0, duration: 0.3 });
  });

  if (!isRendered) return null;

  return (
    <div ref={containerRef} className="relative z-100">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-40 bg-neutral-950/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Container */}
      <div
        className={[
          "fixed inset-0 z-50 flex pointer-events-none",
          isMobile ? "items-end justify-center" : "items-center justify-center",
        ].join(" ")}
      >
        <div
          ref={dialogRef}
          data-layout-id={layoutId}
          className={[
            "pointer-events-auto relative overflow-hidden",
            "bg-neutral-950/90 text-white",
            "shadow-2xl ring-1 ring-white/10",
            isMobile
              ? "w-full max-h-[88vh] rounded-t-3xl"
              : "w-[900px] max-h-[80vh] rounded-2xl",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
        >
          {/* Electric Border */}
          <div className="absolute inset-0 electric-border opacity-50" />

          {/* Mobile Handle */}
          {isMobile && (
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 rounded-full bg-white/20" />
            </div>
          )}

          {/* Header Image */}
          {image && (
            <div
              className={[
                "relative w-full overflow-hidden",
                isMobile ? "h-40" : "h-48",
              ].join(" ")}
            >
              <img
                src={image}
                alt=""
                className="h-full w-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/50 to-neutral-950" />
            </div>
          )}

          {/* Content */}
          <div
            className={[
              "relative overflow-y-auto",
              isMobile
                ? "max-h-[calc(88vh-3rem)] p-5"
                : "max-h-[calc(80vh-2rem)] p-8",
              image ? "pt-4" : "",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {subtitle && (
                  <p className="text-xs font-mono uppercase tracking-widest text-white/50 mb-1">
                    {subtitle}
                  </p>
                )}
                {title && (
                  <h3
                    className={[
                      "font-bold",
                      isMobile ? "text-2xl" : "text-3xl",
                    ].join(" ")}
                  >
                    {title}
                  </h3>
                )}
              </div>
              <button
                ref={closeButtonRef}
                className="rounded-full bg-white/10 hover:bg-white/20 p-2 transition-colors"
                onClick={() => onOpenChange(false)}
                onMouseEnter={handleCloseHover}
                onMouseLeave={handleCloseLeave}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="text-white"
                >
                  <path
                    fill="currentColor"
                    d="M18.3 5.71L12 12.01l-6.3-6.3-1.4 1.41L10.59 13.4l-6.3 6.3 1.41 1.41 6.3-6.3 6.3 6.3 1.41-1.41-6.3-6.3 6.3-6.3z"
                  />
                </svg>
              </button>
            </div>

            {description && (
              <div className="mt-4 text-neutral-300 leading-relaxed text-lg">
                {description}
              </div>
            )}

            {children && <div className="mt-6 space-y-4">{children}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
