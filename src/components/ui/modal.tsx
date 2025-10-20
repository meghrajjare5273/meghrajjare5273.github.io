"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import type { Transition } from "framer-motion";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-media-query";
import useClickOutside from "@/hooks/use-click-outside";

// ============================================================================
// CONTEXT
// ============================================================================
export type EnhancedModalContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  isMobile: boolean;
};

const EnhancedModalContext =
  React.createContext<EnhancedModalContextType | null>(null);

function useEnhancedModal() {
  const context = useContext(EnhancedModalContext);
  if (!context) {
    throw new Error("useEnhancedModal must be used within EnhancedModal");
  }
  return context;
}

// ============================================================================
// PROVIDER
// ============================================================================
type EnhancedModalProviderProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function EnhancedModalProvider({
  children,
  transition,
}: EnhancedModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null!);
  const isMobile = useIsMobile();

  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen, uniqueId, triggerRef, isMobile }),
    [isOpen, uniqueId, isMobile]
  );

  return (
    <EnhancedModalContext.Provider value={contextValue}>
      <MotionConfig
        transition={
          transition || { type: "spring", duration: 0.5, bounce: 0.1 }
        }
      >
        {children}
      </MotionConfig>
    </EnhancedModalContext.Provider>
  );
}

// ============================================================================
// MAIN MODAL COMPONENT
// ============================================================================
export type EnhancedModalProps = {
  children: React.ReactNode;
  transition?: Transition;
};

export function EnhancedModal({ children, transition }: EnhancedModalProps) {
  return (
    <EnhancedModalProvider transition={transition}>
      {children}
    </EnhancedModalProvider>
  );
}

// ============================================================================
// TRIGGER
// ============================================================================
export type EnhancedModalTriggerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function EnhancedModalTrigger({
  children,
  className,
  style,
}: EnhancedModalTriggerProps) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useEnhancedModal();

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    },
    [isOpen, setIsOpen]
  );

  return (
    <motion.button
      ref={triggerRef}
      layoutId={`enhanced-modal-${uniqueId}`}
      className={cn("relative cursor-pointer", className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={style}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
    >
      {children}
    </motion.button>
  );
}

// ============================================================================
// CONTAINER WITH PROGRESSIVE BLUR BACKDROP
// ============================================================================
export function EnhancedModalContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, uniqueId } = useEnhancedModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence initial={false} mode="sync">
      {isOpen && (
        <>
          {/* Multi-layer Progressive Blur Backdrop */}
          <motion.div
            key={`backdrop-${uniqueId}`}
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {Array.from({ length: 8 }).map((_, index) => {
              const segmentSize = 1 / 9;
              const gradientStops = [
                index * segmentSize,
                (index + 1) * segmentSize,
                (index + 2) * segmentSize,
                (index + 3) * segmentSize,
              ]
                .map((pos, posIndex) => {
                  const opacity = posIndex === 1 || posIndex === 2 ? 0.5 : 0;
                  return `rgba(0, 0, 0, ${opacity}) ${pos * 100}%`;
                })
                .join(", ");

              return (
                <div
                  key={index}
                  className="absolute inset-0"
                  style={{
                    background: "rgba(0, 0, 0, 0.2)",
                    maskImage: `linear-gradient(180deg, ${gradientStops})`,
                    WebkitMaskImage: `linear-gradient(180deg, ${gradientStops})`,
                    backdropFilter: `blur(${index * 0.5}px)`,
                    WebkitBackdropFilter: `blur(${index * 0.5}px)`,
                  }}
                />
              );
            })}
          </motion.div>

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {children}
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ============================================================================
// CONTENT WITH GLASSMORPHISM & ANIMATED BORDER
// ============================================================================
export type EnhancedModalContentProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: "default" | "glassmorphism";
};

export function EnhancedModalContent({
  children,
  className,
  style,
  variant = "glassmorphism",
}: EnhancedModalContentProps) {
  const { setIsOpen, isOpen, uniqueId, triggerRef, isMobile } =
    useEnhancedModal();
  const containerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [isOpen, setIsOpen, triggerRef]);

  useClickOutside(containerRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const glassStyles =
    variant === "glassmorphism"
      ? "bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 dark:border-white/10"
      : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800";

  return (
    <motion.div
      ref={containerRef}
      layoutId={`enhanced-modal-${uniqueId}`}
      className={cn(
        "relative overflow-hidden rounded-2xl shadow-2xl",
        glassStyles,
        isMobile ? "w-full max-h-[90vh]" : "max-w-2xl w-full max-h-[85vh]",
        className
      )}
      style={style}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
      {/* Animated Border Gradient */}
      <div className="absolute inset-0 opacity-60 pointer-events-none rounded-2xl overflow-hidden">
        <motion.div
          className="absolute -inset-[2px]"
          style={{
            background: `conic-gradient(
              from 0deg,
              transparent 0deg,
              rgba(139, 92, 246, 0.8) 60deg,
              rgba(236, 72, 153, 0.8) 180deg,
              rgba(251, 146, 60, 0.8) 300deg,
              transparent 360deg
            )`,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 overflow-y-auto max-h-[85vh] scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent">
        {children}
      </div>
    </motion.div>
  );
}

// ============================================================================
// HEADER, TITLE, DESCRIPTION
// ============================================================================
export function EnhancedModalHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { uniqueId } = useEnhancedModal();

  return (
    <motion.div
      layoutId={`modal-header-${uniqueId}`}
      className={cn("px-6 pt-6 pb-4", className)}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export function EnhancedModalTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { uniqueId } = useEnhancedModal();

  return (
    <motion.h2
      layoutId={`modal-title-${uniqueId}`}
      className={cn(
        "text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent",
        className
      )}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {children}
    </motion.h2>
  );
}

export function EnhancedModalDescription({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { uniqueId } = useEnhancedModal();

  return (
    <motion.p
      layoutId={`modal-description-${uniqueId}`}
      className={cn("mt-2 text-sm text-gray-300 dark:text-gray-400", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.15 }}
    >
      {children}
    </motion.p>
  );
}

// ============================================================================
// BODY & FOOTER
// ============================================================================
export function EnhancedModalBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={cn("px-6 py-4", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function EnhancedModalFooter({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={cn(
        "px-6 py-4 border-t border-white/10 dark:border-gray-800/50 flex gap-3 justify-end",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ delay: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// CLOSE BUTTON
// ============================================================================
export function EnhancedModalClose({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { setIsOpen } = useEnhancedModal();

  return (
    <motion.button
      onClick={() => setIsOpen(false)}
      className={cn(
        "absolute top-4 right-4 z-20 p-2 rounded-full",
        "bg-white/10 hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/30",
        "border border-white/20 dark:border-white/10",
        "text-white",
        "transition-colors duration-200",
        className
      )}
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, rotate: -90 }}
      animate={{ opacity: 1, rotate: 0 }}
      exit={{ opacity: 0, rotate: 90 }}
      transition={{ delay: 0.1 }}
      aria-label="Close modal"
    >
      {children || <XIcon size={20} />}
    </motion.button>
  );
}

// ============================================================================
// IMAGE COMPONENT
// ============================================================================
export function EnhancedModalImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const { uniqueId } = useEnhancedModal();

  return (
    <motion.img
      src={src}
      alt={alt}
      layoutId={`modal-image-${uniqueId}`}
      className={cn("w-full h-auto object-cover rounded-t-2xl", className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    />
  );
}
