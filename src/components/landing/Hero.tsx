import { useRef, useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/landing/Navbar";
import { MacbookPro } from "../ui/macbook";
import { GridBackground } from "../ui/grid-background";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const trackRef = useRef<HTMLDivElement>(null); // The scroll distance provider
  const contentRef = useRef<HTMLDivElement>(null); // The fixed visual content
  const macbookRef = useRef<SVGSVGElement>(null);
  const [canAnimate, setCanAnimate] = useState(false);

  // Listen for the custom event from PageOrchestrator
  useEffect(() => {
    const handleIntroComplete = () => setCanAnimate(true);
    window.addEventListener("page-intro-complete", handleIntroComplete);
    return () =>
      window.removeEventListener("page-intro-complete", handleIntroComplete);
  }, []);

  useGSAP(
    () => {
      if (!canAnimate || !trackRef.current || !contentRef.current) return;

      const q = gsap.utils.selector(contentRef);

      // --- INITIAL STATES ---
      gsap.set(".animate-text-reveal", { y: "110%", rotateX: -20, opacity: 0 });
      gsap.set(".animate-fade-in", { opacity: 0, y: 30 });

      // Macbook Initial State
      gsap.set(q(".macbook-lid"), { scaleY: 0.02, autoAlpha: 1 });
      gsap.set(q(".macbook-screen-content"), { opacity: 0 });
      gsap.set(macbookRef.current, { y: 200, scale: 0.8 });

      // --- ENTRANCE TIMELINE (Auto-play) ---
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      tl.to(".animate-text-reveal", {
        y: "0%",
        rotateX: 0,
        opacity: 1,
        duration: 1.4,
        stagger: 0.15,
        ease: "power4.out",
      })
        .to(
          ".animate-fade-in",
          { opacity: 1, y: 0, duration: 1, stagger: 0.2 },
          "-=1.0"
        )
        .to(
          macbookRef.current,
          { y: 100, scale: 1, duration: 1.5, ease: "expo.out" },
          "-=1.2"
        );

      // --- SCROLL ANIMATION (Scrubbed) ---
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current, // Animate based on the invisible track's position
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // 1. Text Exits
      scrollTl.to(
        [".hero-text-container", ".hero-sub-text"],
        { y: -150, opacity: 0, duration: 0.4, ease: "power1.in" },
        0
      );

      // 2. Macbook Centers
      scrollTl.to(
        macbookRef.current,
        { y: -50, scale: 1.15, duration: 0.8, ease: "power1.inOut" },
        0
      );

      // 3. Lid Opens
      scrollTl.to(
        q(".macbook-lid"),
        { scaleY: 1, duration: 1.2, ease: "none" },
        0.1
      );

      // 4. Screen Turns On
      scrollTl.to(
        q(".macbook-screen-content"),
        { opacity: 1, duration: 0.1 },
        1.0
      );

      // Force refresh to ensure About section (below) calculates start position correctly
      ScrollTrigger.refresh();
    },
    { scope: contentRef, dependencies: [canAnimate] }
  );

  return (
    <div className="relative w-full font-bromo">
      {/* 1. THE FIXED CONTENT
        This stays stuck to the screen while you scroll through the track.
        z-0 allows the next section (About) to slide OVER it (if About is z-10).
      */}
      <div
        ref={contentRef}
        className="fixed top-0 left-0 h-dvh w-full bg-[#f5f5f0] dark:bg-neutral-950 text-neutral-900 dark:text-white overflow-hidden z-0 flex flex-col"
      >
        <GridBackground />

        <Navbar />

        {/* Macbook - Centered */}
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-0 pb-10 md:pb-12">
          <MacbookPro
            ref={macbookRef}
            // src="https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1964&auto=format&fit=crop"
            src="/mac-bg.jpg"
            className="w-[90vw] md:w-[60vw] max-w-[1000px] h-auto drop-shadow-2xl will-change-transform"
          />
        </div>

        {/* Responsive Layout Fixes:
           - pt-32 on mobile (prevents nav overlap)
           - flex-col on mobile (better centering)
           - Stacked layout for bottom text 
        */}
        <div className="relative z-10 flex-1 flex flex-col justify-between pt-28 md:pt-[25vh] pb-8 md:pb-24 px-6 md:px-12 max-w-[1920px] mx-auto w-full">
          {/* Top Title - Scaled for mobile */}
          <div className="hero-text-container w-full">
            <h1 className="group font-space font-medium text-[13vw] md:text-[9vw] leading-[0.9] tracking-tight uppercase cursor-default">
              <div className="overflow-hidden perspective-[1000px]">
                <span className="block animate-text-reveal origin-top transform-gpu font-geo">
                  Software
                </span>
              </div>
              <div className="overflow-hidden perspective-[1000px] pl-[6vw] md:pl-[6vw] font-geo">
                <span className="block animate-text-reveal origin-top transform-gpu text-neutral-400 dark:text-neutral-600 transition-colors duration-500 group-hover:text-neutral-900 dark:group-hover:text-white">
                  Engineer
                </span>
              </div>
            </h1>
          </div>

          {/* Bottom Details - Stacked on Mobile, Grid on Desktop */}
          <div className="hero-sub-text flex flex-col md:grid md:grid-cols-12 gap-y-8 md:gap-y-0 w-full content-end">
            {/* Description (Mobile: Order 2, Desktop: Order 1) */}
            <div className="order-2 md:order-1 md:col-span-4 self-end group cursor-default">
              <div className="flex flex-col gap-6 animate-fade-in">
                <div className="w-12 h-12 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center group-hover:animate-none transition-all">
                  <ArrowDown
                    className="w-5 h-5 animate-caret-blink hover:transition-transform group-hover:animate-none"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="w-full md:w-fit font-space text-base md:text-lg leading-relaxed max-w-[320px] uppercase tracking-wide transition-transform duration-500 ease-out group-hover:translate-x-4 backdrop-blur-sm md:backdrop-blur-none rounded-md p-2 md:p-0">
                  I build and design full stack web appplications using modern
                  tech &amp; AI.
                </p>
              </div>
            </div>

            {/* Name (Mobile: Order 1, Desktop: Order 2) */}
            <div className="order-1 md:order-2 md:col-start-7 md:col-end-13 self-end text-left md:text-right">
              <h2 className="w-full md:w-fit ml-auto font-space font-medium text-[13vw] md:text-[7vw] leading-[0.85] tracking-tighter uppercase transition-all duration-500 ease-out hover:-skew-x-6 cursor-default hover:text-neutral-700 dark:hover:text-neutral-300">
                <div className="overflow-hidden perspective-[1000px]">
                  <span className="block animate-text-reveal origin-top transform-gpu font-geo">
                    Meghraj
                  </span>
                </div>
                <div className="overflow-hidden perspective-[1000px]">
                  <span className="block animate-text-reveal origin-top transform-gpu font-geo">
                    Jare
                  </span>
                </div>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE SCROLL TRACK (Spacer)
        This invisible div gives the page height. 
        - pointer-events-none ensures clicks go through to the fixed hero.
        - z-10 ensures it sits conceptually "above" so the next section follows it properly.
      */}
      <div
        ref={trackRef}
        className="relative w-full h-[180vh] pointer-events-none z-10"
      />
    </div>
  );
}

export default HeroSection;
