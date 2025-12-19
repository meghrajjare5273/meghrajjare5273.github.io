import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectShowcaseProps {
  videoSrc: string;
  alt: string;
  loop?: boolean;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  videoSrc,
  alt,
  loop = true,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const { contextSafe } = useGSAP(
    () => {
      const videoEl = videoRef.current;
      if (!videoEl) return;

      // 1. Entrance Animation
      // We removed clipPath to ensure border-radius works perfectly.
      // Instead, we use a clean Scale + Opacity reveal.
      gsap.fromTo(
        ".video-wrapper",
        {
          scale: 0.92,
          opacity: 0,
          y: 40,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Autoplay Logic
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom", // Plays as soon as it enters viewport
        end: "bottom top", // Stops when it fully leaves viewport
        onEnter: () => videoEl.play().catch(() => {}),
        onEnterBack: () => videoEl.play().catch(() => {}),
        onLeave: () => videoEl.pause(),
        onLeaveBack: () => videoEl.pause(),
      });
    },
    { scope: containerRef }
  );

  const toggleMute = contextSafe(() => {
    if (videoRef.current) {
      const newMuteState = !isMuted;
      videoRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
    }
  });

  return (
    <section
      ref={containerRef}
      className="w-full max-w-[1920px] mx-auto px-6 md:px-12 py-12"
    >
      <div
        className="video-wrapper relative w-full xl:w-10/12 xl:mx-auto aspect-video bg-[#eceae8] dark:bg-[#0e0e0e] shadow-2xl isolate"
        // This style block forces the border radius on all browsers
        style={{
          borderRadius: "24px", // Defines the roundness
          overflow: "hidden", // Cuts off content outside
          // The mask-image is the "Nuclear Option" to force rounded corners on video
          maskImage: "radial-gradient(white, black)",
          WebkitMaskImage: "-webkit-radial-gradient(white, black)",
          // Fixes safari border-radius glitches
          transform: "translateZ(0)",
        }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          loop={loop}
          muted={isMuted}
          playsInline
          preload="auto"
          aria-label={alt}
        />

        {/* Overlay for better icon visibility */}
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />

        {/* Mute Button */}
        <div className="absolute bottom-6 right-6 z-20">
          <button
            onClick={toggleMute}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#eceae8]/80 dark:bg-[#0e0e0e]/80 backdrop-blur-md border border-[#0e0e0e]/10 dark:border-[#eceae8]/20 hover:scale-105 transition-all duration-300 group shadow-sm"
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#0e0e0e] dark:text-[#eceae8] opacity-70 group-hover:opacity-100"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" x2="17" y1="9" y2="15" />
                <line x1="17" x2="23" y1="9" y2="15" />
              </svg>
            ) : (
              <div className="flex items-end gap-[3px] h-4 pointer-events-none">
                <span className="w-[3px] h-2 bg-[#0e0e0e] dark:bg-[#eceae8] animate-[bounce_1s_infinite] rounded-full opacity-80" />
                <span
                  className="w-[3px] h-4 bg-[#0e0e0e] dark:bg-[#eceae8] animate-[bounce_1.2s_infinite] rounded-full opacity-80"
                  style={{ animationDelay: "0.1s" }}
                />
                <span
                  className="w-[3px] h-3 bg-[#0e0e0e] dark:bg-[#eceae8] animate-[bounce_0.8s_infinite] rounded-full opacity-80"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
