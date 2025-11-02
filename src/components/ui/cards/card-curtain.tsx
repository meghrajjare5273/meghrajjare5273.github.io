"use client";

import * as React from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface CardCurtainRevealContextValue {
  isMouseIn: boolean;
}

const CardCurtainRevealContext = React.createContext<
  CardCurtainRevealContextValue | undefined
>(undefined);

function useCardCurtainRevealContext() {
  const ctx = React.useContext(CardCurtainRevealContext);
  if (!ctx)
    throw new Error(
      "useCardCurtainRevealContext must be used within a CardCurtainReveal"
    );
  return ctx;
}

const CardCurtainReveal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const [isMouseIn, setIsMouseIn] = React.useState(false);
  const onIn = React.useCallback(() => setIsMouseIn(true), []);
  const onOut = React.useCallback(() => setIsMouseIn(false), []);

  return (
    <CardCurtainRevealContext.Provider value={{ isMouseIn }}>
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col gap-2 overflow-hidden",
          className
        )}
        onMouseEnter={onIn}
        onMouseLeave={onOut}
        {...props}
      >
        {children}
      </div>
    </CardCurtainRevealContext.Provider>
  );
});
CardCurtainReveal.displayName = "CardCurtainReveal";

const CardCurtainRevealFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext();
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!elementRef.current) return;

    gsap.to(elementRef.current, {
      clipPath: isMouseIn
        ? "polygon(0 0,100% 0,100% 100%,0 100%)"
        : "polygon(50% 0,50% 0,50% 100%,50% 100%)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, [isMouseIn]);

  return (
    <div
      ref={(node) => {
        elementRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className={className}
      style={{
        clipPath: "polygon(50% 0,50% 0,50% 100%,50% 100%)",
      }}
      {...props}
    />
  );
});
CardCurtainRevealFooter.displayName = "CardCurtainRevealFooter";

const CardCurtainRevealBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1 p-6", className)} {...props} />
));
CardCurtainRevealBody.displayName = "CardCurtainRevealBody";

const CardCurtainRevealTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext();
  const elementRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    if (!elementRef.current) return;

    gsap.to(elementRef.current, {
      y: isMouseIn ? 0 : 8,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [isMouseIn]);

  return (
    <h2
      ref={(node) => {
        elementRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className={className}
      {...props}
    />
  );
});
CardCurtainRevealTitle.displayName = "CardCurtainRevealTitle";

const CardCurtain = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext();
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!elementRef.current) return;

    gsap.to(elementRef.current, {
      clipPath: isMouseIn
        ? "polygon(0 0,100% 0,100% 100%,0 100%)"
        : "polygon(50% 0,50% 0,50% 100%,50% 100%)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, [isMouseIn]);

  return (
    <div
      ref={(node) => {
        elementRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className={cn(
        "pointer-events-none absolute inset-0 size-full mix-blend-difference",
        className
      )}
      style={{
        clipPath: "polygon(50% 0,50% 0,50% 100%,50% 100%)",
      }}
      {...props}
    />
  );
});
CardCurtain.displayName = "CardCurtain";

const CardCurtainRevealDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext();
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!elementRef.current) return;

    gsap.to(elementRef.current, {
      clipPath: isMouseIn
        ? "polygon(0 0,100% 0,100% 100%,0 100%)"
        : "polygon(50% 0,50% 0,50% 100%,50% 100%)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, [isMouseIn]);

  return (
    <div
      ref={(node) => {
        elementRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className={className}
      style={{
        clipPath: "polygon(50% 0,50% 0,50% 100%,50% 100%)",
      }}
      {...props}
    />
  );
});
CardCurtainRevealDescription.displayName = "CardCurtainRevealDescription";

export {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealFooter,
  CardCurtainRevealDescription,
  CardCurtainRevealTitle,
  CardCurtain,
};
