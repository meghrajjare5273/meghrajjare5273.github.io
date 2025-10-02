"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
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

const SmoothScrollHeroBackground: React.FC<SmoothScrollHeroBackgroundProps> = ({
  scrollHeight = 1500,
  desktopImage,
  mobileImage,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
}) => {
  const { scrollY } = useScroll();

  // Fixed clip-path calculations - these should animate the polygon vertices correctly
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

  // Fixed background size animation - should start larger and scale down
  const backgroundSize = useTransform(
    scrollY,
    [0, scrollHeight + 500],
    ["170%", "100%"]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full bg-black overflow-hidden"
      style={{
        clipPath,
        willChange: "transform, opacity",
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
        }}
      />
    </motion.div>
  );
};

const SmoothScrollHeroText: React.FC<{
  title: string;
  subtitle?: string;
  description?: string;
  scrollHeight: number;
}> = ({ title, subtitle, description, scrollHeight }) => {
  const { scrollY } = useScroll();

  // Text animations that work with the scroll container
  const titleY = useTransform(scrollY, [0, scrollHeight * 0.5], [0, -100]);
  const titleOpacity = useTransform(scrollY, [0, scrollHeight * 0.3], [1, 0]);
  const titleScale = useTransform(scrollY, [0, scrollHeight * 0.4], [1, 0.8]);

  const subtitleY = useTransform(scrollY, [0, scrollHeight * 0.6], [0, -150]);
  const subtitleOpacity = useTransform(
    scrollY,
    [0, scrollHeight * 0.4],
    [1, 0]
  );

  const descriptionY = useTransform(
    scrollY,
    [0, scrollHeight * 0.7],
    [0, -200]
  );
  const descriptionOpacity = useTransform(
    scrollY,
    [0, scrollHeight * 0.5],
    [1, 0]
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none">
      <div className="text-center text-white px-4 max-w-4xl">
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
                delay: index * 0.05,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {subtitle && (
          <motion.p
            style={{
              y: subtitleY,
              opacity: subtitleOpacity,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className="text-xl md:text-3xl lg:text-4xl font-light mb-4 md:mb-6 text-gray-200"
          >
            {subtitle}
          </motion.p>
        )}

        {description && (
          <motion.p
            style={{
              y: descriptionY,
              opacity: descriptionOpacity,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            className="text-lg md:text-xl lg:text-2xl font-normal max-w-2xl mx-auto text-gray-300 leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {/* Scroll indicator - only show when text is visible */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{ opacity: titleOpacity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

/**
 * A smooth scroll hero component with parallax background effect and interactive typography
 * Fixed to work correctly with scroll positioning and viewport
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
      {/* This is the key fix - proper scroll container structure */}
      <div
        style={{ height: `calc(${scrollHeight}px + 100vh)` }}
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

        {/* Text overlay positioned correctly */}
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
