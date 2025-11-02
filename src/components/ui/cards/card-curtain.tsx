// src/components/ui/cards/card-curtain.tsx
"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface CardCurtainRevealContextValue {
  isMouseIn: boolean;
}
const CardCurtainRevealContext = React.createContext<
  CardCurtainRevealContextValue | undefined
>(undefined);
function useCardCtx() {
  const ctx = React.useContext(CardCurtainRevealContext);
  if (!ctx)
    throw new Error(
      "useCardCurtainRevealContext must be used within a CardCurtainReveal"
    );
  return ctx;
}

// Shapes: closed = inset(0% 50% 0% 50%), open = inset(0% 0% 0% 0%)
const CLOSED = "inset(0% 50% 0% 50%)";
const OPEN = "inset(0% 0% 0% 0%)";

export const CardCurtainReveal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const [isMouseIn, setIsMouseIn] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      // Set initial states
      gsap.set(
        q(
          "[data-curtain='cover'],[data-curtain='desc'],[data-curtain='footer']"
        ),
        {
          clipPath: CLOSED,
          willChange: "clip-path",
        }
      );
      gsap.set(q("[data-curtain='title']"), { y: 8, willChange: "transform" });

      // One timeline to rule them all
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "expo.out", duration: 0.34, overwrite: "auto" },
      });
      tl.to(
        q(
          "[data-curtain='cover'],[data-curtain='desc'],[data-curtain='footer']"
        ),
        { clipPath: OPEN },
        0
      ).to(q("[data-curtain='title']"), { y: 0, duration: 0.22 }, 0.02);

      // Enter/leave control
      rootRef.current?.addEventListener("pointerenter", () => tl.play());
      rootRef.current?.addEventListener("pointerleave", () => tl.reverse());

      return () => {
        tl.kill();
      };
    },
    { scope: rootRef }
  );

  return (
    <CardCurtainRevealContext.Provider value={{ isMouseIn }}>
      <div
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        className={cn(
          "relative flex flex-col gap-2 overflow-hidden",
          className
        )}
        onPointerEnter={() => setIsMouseIn(true)}
        onPointerLeave={() => setIsMouseIn(false)}
        {...props}
      >
        {children}
      </div>
    </CardCurtainRevealContext.Provider>
  );
});
CardCurtainReveal.displayName = "CardCurtainReveal";

export const CardCurtainRevealBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1 p-6", className)} {...props} />
));
CardCurtainRevealBody.displayName = "CardCurtainRevealBody";

export const CardCurtainRevealTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return <h2 ref={ref} data-curtain="title" className={className} {...props} />;
});
CardCurtainRevealTitle.displayName = "CardCurtainRevealTitle";

export const CardCurtainRevealDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-curtain="desc"
      className={className}
      style={{ ...style, clipPath: CLOSED }}
      {...props}
    />
  );
});
CardCurtainRevealDescription.displayName = "CardCurtainRevealDescription";

export const CardCurtainRevealFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-curtain="footer"
      className={className}
      style={{ ...style, clipPath: CLOSED }}
      {...props}
    />
  );
});
CardCurtainRevealFooter.displayName = "CardCurtainRevealFooter";

export const CardCurtain = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-curtain="cover"
      className={cn(
        "pointer-events-none absolute inset-0 size-full mix-blend-difference",
        className
      )}
      style={{ ...style, clipPath: CLOSED }}
      {...props}
    />
  );
});
CardCurtain.displayName = "CardCurtain";
