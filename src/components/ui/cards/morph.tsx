// src/components/ui/adaptive-morph-dialog.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useIsMobile } from "@/hooks/use-media-query";

type AdaptiveMorphDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  layoutId: string; // must match the card's container layoutId
  title?: string;
  subtitle?: string;
  description?: React.ReactNode;
  image?: string; // optional hero image in modal
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
  const backdropRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prevOpenRef = useRef(open);

  useEffect(() => {
    if (!backdropRef.current || !dialogRef.current) return;

    const backdrop = backdropRef.current;
    const dialog = dialogRef.current;

    if (open && !prevOpenRef.current) {
      // Opening animation
      gsap.set(backdrop, { opacity: 0 });
      gsap.to(backdrop, {
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      });

      if (isMobile) {
        gsap.set(dialog, { y: "100%", opacity: 0 });
        gsap.to(dialog, {
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease: "back.out(1.2)",
        });
      } else {
        gsap.set(dialog, { y: 10, opacity: 0, scale: 0.95 });
        gsap.to(dialog, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: "back.out(1.2)",
        });
      }
    } else if (!open && prevOpenRef.current) {
      // Closing animation
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      });

      if (isMobile) {
        gsap.to(dialog, {
          y: "100%",
          opacity: 0,
          duration: 0.35,
          ease: "back.in(1.2)",
        });
      } else {
        gsap.to(dialog, {
          y: 10,
          opacity: 0,
          scale: 0.95,
          duration: 0.35,
          ease: "back.in(1.2)",
        });
      }
    }

    prevOpenRef.current = open;
  }, [open, isMobile]);

  // Close button hover effects
  const handleCloseButtonHover = () => {
    if (closeButtonRef.current) {
      gsap.to(closeButtonRef.current, {
        scale: 1.05,
        rotation: 90,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleCloseButtonLeave = () => {
    if (closeButtonRef.current) {
      gsap.to(closeButtonRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleCloseButtonDown = () => {
    if (closeButtonRef.current) {
      gsap.to(closeButtonRef.current, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
      });
    }
  };

  const handleCloseButtonUp = () => {
    if (closeButtonRef.current) {
      gsap.to(closeButtonRef.current, {
        scale: 1.05,
        duration: 0.1,
        ease: "power2.out",
      });
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-60 bg-white/40 dark:bg-black/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Container - Responsive positioning */}
      <div
        className={[
          "fixed inset-0 z-70 flex",
          isMobile ? "items-end justify-center" : "items-center justify-center",
        ].join(" ")}
      >
        <div
          ref={dialogRef}
          data-layout-id={layoutId}
          className={[
            "relative overflow-hidden",
            "bg-neutral-950/85 text-white",
            "shadow-2xl ring-1 ring-white/10",
            isMobile
              ? "w-full max-h-[88vh] rounded-t-3xl"
              : "w-[900px] max-h-[80vh] rounded-2xl",
          ].join(" ")}
          style={{ backdropFilter: "blur(12px) saturate(130%)" }}
          role="dialog"
          aria-modal="true"
        >
          {/* Electric perimeter */}
          <div className="absolute inset-0 electric-border" />

          {/* Drawer handle for mobile */}
          {isMobile && (
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 rounded-full bg-white/30" />
            </div>
          )}

          {/* Optional header image */}
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
                className="h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/60" />
            </div>
          )}

          {/* Soft progressive blur at edges */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-0 top-0 h-24 [backdrop-filter:blur(3px)] mask-[linear-gradient(to_bottom,black,transparent)]" />
            <div className="absolute inset-x-0 bottom-0 h-24 [backdrop-filter:blur(3px)] mask-[linear-gradient(to_top,black,transparent)]" />
          </div>

          {/* Scrollable Content */}
          <div
            className={[
              "relative overflow-y-auto",
              isMobile
                ? "max-h-[calc(88vh-3rem)] p-5"
                : "max-h-[calc(80vh-2rem)] p-6 md:p-8",
              image ? "pt-4" : "",
            ].join(" ")}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.3) transparent",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {subtitle && (
                  <p className="text-[11px] font-mono uppercase tracking-widest text-white/70">
                    {subtitle}
                  </p>
                )}
                {title && (
                  <h3
                    className={[
                      "mt-1 font-semibold",
                      isMobile ? "text-xl" : "text-2xl md:text-3xl",
                    ].join(" ")}
                  >
                    {title}
                  </h3>
                )}
              </div>
              <button
                ref={closeButtonRef}
                className="rounded-full bg-white/10 hover:bg-white/20 p-2 shrink-0"
                onClick={() => onOpenChange(false)}
                onMouseEnter={handleCloseButtonHover}
                onMouseLeave={handleCloseButtonLeave}
                onMouseDown={handleCloseButtonDown}
                onMouseUp={handleCloseButtonUp}
                aria-label="Close"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="opacity-90"
                >
                  <path
                    fill="currentColor"
                    d="M18.3 5.71L12 12.01l-6.3-6.3-1.4 1.41L10.59 13.4l-6.3 6.3 1.41 1.41 6.3-6.3 6.3 6.3 1.41-1.41-6.3-6.3 6.3-6.3z"
                  />
                </svg>
              </button>
            </div>

            {description && (
              <div
                className={[
                  "mt-4 text-white/80 leading-relaxed",
                  isMobile ? "text-sm" : "text-sm md:text-base",
                ].join(" ")}
              >
                {description}
              </div>
            )}
            {children && <div className="mt-6 space-y-4">{children}</div>}
          </div>
        </div>
      </div>
    </>
  );
}
