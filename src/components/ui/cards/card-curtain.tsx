"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const curtainVariants: Variants = {
  visible: {
    clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
    transition: { duration: 0.4, ease: ["easeOut", [0.25, 1.5, 0.5, 1]] },
  },
  hidden: {
    clipPath: "polygon(50% 0,50% 0,50% 100%,50% 100%)",
    transition: { duration: 0.3, ease: ["easeOut", [0.25, 1.5, 0.5, 1]] },
  },
};

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
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext();
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={curtainVariants}
      animate={isMouseIn ? "visible" : "hidden"}
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
  HTMLMotionProps<"h2">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext();
  return (
    <motion.h2
      ref={ref}
      className={className}
      animate={isMouseIn ? { y: 0 } : { y: 170 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    />
  );
});
CardCurtainRevealTitle.displayName = "CardCurtainRevealTitle";

const CardCurtain = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => {
    const { isMouseIn } = useCardCurtainRevealContext();
    return (
      <motion.div
        ref={ref}
        className={cn(
          "pointer-events-none absolute inset-0 size-full mix-blend-difference",
          className
        )}
        variants={curtainVariants}
        animate={isMouseIn ? "visible" : "hidden"}
        {...props}
      />
    );
  }
);
CardCurtain.displayName = "CardCurtain";

const CardCurtainRevealDescription = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext();
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={curtainVariants}
      animate={isMouseIn ? "visible" : "hidden"}
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
