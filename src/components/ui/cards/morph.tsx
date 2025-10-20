// src/components/ui/adaptive-morph-dialog.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";

type AdaptiveMorphDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  layoutId: string; // must match the card’s container layoutId
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
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : false;

  return (
    <AnimatePresence initial={false} mode="sync">
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-white/40 dark:bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Container */}
          <div
            className={[
              "fixed inset-0 z-[70] flex",
              isMobile
                ? "items-end justify-center"
                : "items-center justify-center",
            ].join(" ")}
          >
            <motion.div
              layoutId={layoutId}
              className={[
                "relative overflow-hidden rounded-2xl",
                "bg-neutral-950/85 text-white",
                "shadow-2xl ring-1 ring-white/10",
                isMobile
                  ? "w-[92vw] max-h-[88vh] mb-4"
                  : "w-[900px] max-h-[80vh]",
              ].join(" ")}
              style={{ backdropFilter: "blur(12px) saturate(130%)" }}
              initial={isMobile ? { y: 40, opacity: 0 } : { y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={isMobile ? { y: 40, opacity: 0 } : { y: 10, opacity: 0 }}
              transition={{
                type: isMobile ? "tween" : "spring",
                duration: 0.28,
                stiffness: 260,
                damping: 28,
              }}
              role="dialog"
              aria-modal="true"
            >
              {/* Electric perimeter */}
              <div className="absolute inset-0 electric-border" />

              {/* Optional header image */}
              {image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
                </div>
              )}

              {/* Soft progressive blur at edges */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-24 [backdrop-filter:blur(3px)] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
                <div className="absolute inset-x-0 bottom-0 h-24 [backdrop-filter:blur(3px)] [mask-image:linear-gradient(to_top,black,transparent)]" />
              </div>

              {/* Content */}
              <div
                className={["relative p-6 md:p-8", image ? "pt-4" : ""].join(
                  " "
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {subtitle && (
                      <p className="text-[11px] font-mono uppercase tracking-widest text-white/70">
                        {subtitle}
                      </p>
                    )}
                    {title && (
                      <h3 className="mt-1 text-2xl md:text-3xl font-semibold">
                        {title}
                      </h3>
                    )}
                  </div>
                  <motion.button
                    className="rounded-full bg-white/10 hover:bg-white/20 p-2"
                    onClick={() => onOpenChange(false)}
                    whileHover={{ scale: 1.05, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
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
                  </motion.button>
                </div>

                {description && (
                  <div className="mt-4 text-sm md:text-base text-white/80 leading-relaxed">
                    {description}
                  </div>
                )}
                {children && <div className="mt-6 space-y-4">{children}</div>}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
