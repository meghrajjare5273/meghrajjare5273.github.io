"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

interface SmoothScrollHeroProps {
  scrollHeight?: number;
  desktopImage: string;
  mobileImage: string;
  initialClipPercentage?: number;
  finalClipPercentage?: number;
  title: string;
  subtitle?: string;
  description?: string;
}

interface SmoothScrollHeroBackgroundProps extends SmoothScrollHeroProps {}

// Global tuning for the "give it some time" hold and the fade-out window
const HOLD_BEFORE_FADE_PX = 200; // how long to linger after text finishes entering
const FADE_OUT_DURATION_PX = 500; // how long the fade-out takes
const EXTRA_HOLD_PX = HOLD_BEFORE_FADE_PX + FADE_OUT_DURATION_PX + 200; // ensures background stays pinned through fade

/**
 * Background layer:
 * - Maintains clipPath reveal tied to scroll.
 * - Adds a synchronized blur filter that ramps from 0px to maxBlur as the reveal completes.
 */
const SmoothScrollHeroBackground: React.FC<SmoothScrollHeroBackgroundProps> = ({
  scrollHeight = 1500,
  desktopImage,
  mobileImage,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
}) => {
  const { scrollY } = useScroll();

  // Image reveal via clip-path (polygon animates from a smaller rect to full).
  const clipStart = useTransform(
    scrollY,
    [0, scrollHeight],
    [initialClipPercentage, 0]
  );
  const clipEnd = useTransform(
    scrollY,
    [0, scrollHeight],
    [finalClipPercentage, 100]
  );

  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

  // Background size subtle settle
  const backgroundSize = useTransform(
    scrollY,
    [0, scrollHeight + 500],
    ["170%", "100%"]
  );

  // Blur synchronized with reveal completion
  const maxBlur = 12;
  const revealProgress = useTransform(
    clipEnd,
    [finalClipPercentage, 100],
    [0, 1],
    { clamp: true }
  );
  const blurPx = useTransform(revealProgress, [0, 1], [0, maxBlur]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <motion.div
      className="sticky top-0 h-screen w-full bg-black overflow-hidden"
      style={{
        clipPath,
        willChange: "clip-path, transform, filter",
      }}
    >
      {/* Mobile background */}
      <motion.div
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage: `url(${mobileImage})`,
          backgroundSize,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          filter,
          willChange: "filter, background-size",
        }}
      />
      {/* Desktop background */}
      <motion.div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: `url(${desktopImage})`,
          backgroundSize,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          filter,
          willChange: "filter, background-size",
        }}
      />
    </motion.div>
  );
};

/**
 * Foreground text:
 * - Appears only after background reveal reaches the gate.
 * - Title mounts at gate to trigger per-character slide-up/fade-in.
 * - Subtitle and description fade/slide in after, staggered by scroll distance.
 * - Scroll indicator fades on initial scroll.
 * - NEW: After a short hold, all text fades out while the background remains pinned.
 */
const SmoothScrollHeroText: React.FC<{
  title: string;
  subtitle?: string;
  description?: string;
  scrollHeight: number;
}> = ({ title, subtitle, description, scrollHeight }) => {
  const { scrollY } = useScroll();

  // Gate when image is "fully revealed"
  const gateStart = scrollHeight * 0.6;

  // Title mounts at gate for per-character entrance
  const [showTitle, setShowTitle] = React.useState(false);
  React.useEffect(() => {
    setShowTitle(false);
  }, []);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!showTitle && latest >= gateStart) {
      setShowTitle(true);
    }
  });

  // Entrance sequencing windows
  const titleRange: [number, number] = [gateStart, gateStart + 200];
  const subtitleRange: [number, number] = [gateStart + 150, gateStart + 350];
  const descriptionRange: [number, number] = [gateStart + 300, gateStart + 500];

  const titleOpacity = useTransform(scrollY, titleRange, [0, 1], {
    clamp: true,
  });
  const titleY = useTransform(scrollY, titleRange, [20, 0], { clamp: true });
  const titleScale = useTransform(scrollY, titleRange, [0.98, 1], {
    clamp: true,
  });

  const subtitleOpacity = useTransform(scrollY, subtitleRange, [0, 1], {
    clamp: true,
  });
  const subtitleY = useTransform(scrollY, subtitleRange, [24, 0], {
    clamp: true,
  });

  const descriptionOpacity = useTransform(scrollY, descriptionRange, [0, 1], {
    clamp: true,
  });
  const descriptionY = useTransform(scrollY, descriptionRange, [28, 0], {
    clamp: true,
  });

  // Scroll indicator fades immediately on start
  const indicatorOpacity = useTransform(scrollY, [0, 60], [1, 0], {
    clamp: true,
  });

  // NEW: Global text fade-out after a hold
  const fadeOutStart = descriptionRange[1] + HOLD_BEFORE_FADE_PX; // after description finishes + hold
  const fadeOutEnd = fadeOutStart + FADE_OUT_DURATION_PX; // gradual fade window
  const overallTextOpacity = useTransform(
    scrollY,
    [fadeOutStart, fadeOutEnd],
    [1, 0],
    {
      clamp: true,
    }
  );

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none"
      style={{ opacity: overallTextOpacity }} // apply global fade-out
    >
      <div className="text-center text-white px-4 max-w-4xl">
        {/* Title */}
        {showTitle && (
          <motion.h1
            style={{
              y: titleY,
              opacity: titleOpacity,
              scale: titleScale,
            }}
            className="text-4xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 leading-tight tracking-tight"
          >
            {title.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05, // per-character stagger
                  duration: 0.45,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
        )}

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            style={{
              y: subtitleY,
              opacity: subtitleOpacity,
            }}
            className="text-xl md:text-3xl lg:text-4xl font-light mb-4 md:mb-6 text-gray-200"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Description */}
        {description && (
          <motion.p
            style={{
              y: descriptionY,
              opacity: descriptionOpacity,
            }}
            className="text-lg md:text-xl lg:text-2xl font-normal max-w-2xl mx-auto text-gray-300 leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {/* Scroll indicator: bottom-center, fades on first scroll */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/80 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

/**
 * A smooth scroll hero component with parallax background effect and interactive typography.
 * Ensures the background remains pinned through the fade-out window by extending the scroll container.
 */
const SmoothScrollHero: React.FC<SmoothScrollHeroProps> = ({
  scrollHeight = 1500,
  desktopImage,
  mobileImage,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
  title,
  subtitle,
  description,
}) => {
  return (
    <>
      {/* Extend container height so sticky background stays pinned during the fade-out stage */}
      <div
        style={{
          height: `calc(${scrollHeight}px + ${EXTRA_HOLD_PX}px + 100vh)`,
        }}
        className="relative w-full"
      >
        <SmoothScrollHeroBackground
          scrollHeight={scrollHeight}
          desktopImage={desktopImage}
          mobileImage={mobileImage}
          initialClipPercentage={initialClipPercentage}
          finalClipPercentage={finalClipPercentage}
          title={title}
          subtitle={subtitle}
          description={description}
        />

        {/* Text overlay */}
        <SmoothScrollHeroText
          title={title}
          subtitle={subtitle}
          description={description}
          scrollHeight={scrollHeight}
        />
      </div>
    </>
  );
};

export default SmoothScrollHero;
