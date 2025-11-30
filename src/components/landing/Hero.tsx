import { useRef, useState, useEffect } from "react";
import {
  ArrowDown,
  Briefcase,
  Code2,
  ExternalLink,
  MapPin,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/landing/Navbar";
import Macbook from "@/components/ui/macbook";
import { GridBackground } from "../ui/grid-background";

gsap.registerPlugin(ScrollTrigger);

const StatusCard = () => (
  <div className="w-full h-full flex items-center justify-center bg-neutral-950 relative overflow-hidden">
    {/* Subtle gradient bg inside screen */}
    <div className="absolute inset-0 bg-linear-to-tr from-indigo-950/30 to-purple-950/30 opacity-50" />

    <div className="relative z-10 flex flex-col gap-6 p-10 max-w-lg w-full">
      <div className="flex items-center gap-3 text-neutral-400 text-sm font-mono uppercase tracking-widest border-b border-neutral-800 pb-4">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        System Status: Online
      </div>

      <div className="space-y-4">
        <h3 className="text-3xl text-white font-space font-medium">
          Currently building the future at{" "}
          <span className="text-indigo-400">TechCorp Inc.</span>
        </h3>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-3 text-neutral-300">
            <Briefcase className="w-4 h-4 text-neutral-500" />
            <span className="text-sm">Senior Frontend Eng.</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-300">
            <MapPin className="w-4 h-4 text-neutral-500" />
            <span className="text-sm">San Francisco, CA</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-300 col-span-2">
            <Code2 className="w-4 h-4 text-neutral-500" />
            <span className="text-sm">Stack: Next.js 15, Rust, WebGL</span>
          </div>
        </div>
      </div>

      <button className="mt-4 flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md w-fit transition-colors text-sm font-medium">
        View Project Details <ExternalLink className="w-3 h-3" />
      </button>
    </div>
  </div>
);

export function HeroSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const macbookRef = useRef<HTMLDivElement>(null);
  const [canAnimate, setCanAnimate] = useState(false);

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

      // --- MACBOOK INITIAL STATE (Closed) ---
      // Note: scale: 0.8 is the animation start size.
      // The CSS Base Scale (responsiveness) is handled in the wrapper div below.
      gsap.set(macbookRef.current, { y: "20vh", scale: 0.8 });

      gsap.set(q(".macbook-screen-close"), {
        rotationX: 90,
        scale: 0.9,
        bottom: -5,
      });
      gsap.set(q(".macbook-screen-open"), { rotationX: 0, z: -580 });
      gsap.set(q(".macbook-content-mask"), { opacity: 0 });

      // --- ENTRANCE TIMELINE ---
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
        // Animate Macbook into starting position
        .to(
          macbookRef.current,
          { y: "10vh", scale: 1, duration: 1.5, ease: "expo.out" },
          "-=1.2"
        );

      // --- SCROLL ANIMATION ---
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5, // Increased scrub smoothing (makes it feel heavier/slower)
        },
      });

      // 1. Text Exits (0% - 10%) - Quick exit to clear stage
      scrollTl.to(
        [".hero-text-container", ".hero-sub-text"],
        {
          y: -150,
          opacity: 0,
          duration: 0.1, // Short duration relative to timeline
          ease: "power1.in",
        },
        0
      );

      // 2. Macbook Centers (0% - 30%)
      scrollTl.to(
        macbookRef.current,
        {
          y: "-15vh", // Move up slightly
          scale: 1.3, // slight zoom in
          duration: 0.3,
          ease: "power1.inOut",
        },
        0
      );

      // 3. Lid Opens (20% - 80%) - THIS IS THE LONG PART
      // We span this across 60% of the scroll distance so it doesn't feel like it "closes too soon"
      scrollTl.to(
        q(".macbook-screen-close"),
        {
          rotationX: 0,
          scale: 1,
          bottom: 0,
          duration: 0.6,
          ease: "none",
        },
        0.2
      );

      scrollTl.to(
        q(".macbook-screen-open"),
        {
          rotationX: -90,
          duration: 0.6,
          ease: "none",
        },
        0.2
      );

      // 4. Screen Content Fades In (70% - 90%)
      scrollTl.to(
        q(".macbook-content-mask"),
        {
          opacity: 1,
          duration: 0.2,
        },
        0.7
      );

      ScrollTrigger.refresh();
    },
    { scope: contentRef, dependencies: [canAnimate] }
  );

  return (
    <div className="relative w-full font-bromo">
      <div
        ref={contentRef}
        className="fixed top-0 left-0 h-dvh w-full bg-[#f5f5f0] dark:bg-neutral-950 text-neutral-900 dark:text-white overflow-hidden z-0 flex flex-col"
      >
        <GridBackground />
        <Navbar />

        {/* Responsiveness Strategy:
            We use a wrapper to scale the ENTIRE 3D component based on screen width.
            scale-[0.35] = Mobile (tiny screen)
            scale-[0.6] = Tablet 
            scale-[1] = Desktop
            
            origin-bottom: Ensures it scales from the table up, keeping it grounded.
        */}
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-0 pb-[15vh] md:pb-[10vh]">
          <div className="transform-gpu scale-[0.35] sm:scale-[0] lg:scale-[0.6] xl:scale-80 origin-bottom transition-transform duration-500 ease-out">
            <Macbook
              ref={macbookRef}
              className="drop-shadow-2xl will-change-transform"
            >
              <StatusCard />
            </Macbook>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-between pt-28 md:pt-[25vh] pb-8 md:pb-24 px-6 md:px-12 max-w-[1920px] mx-auto w-full min-h-dvh">
          {/* Top Title */}
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

          {/* Bottom Details */}
          <div className="hero-sub-text flex flex-col md:grid md:grid-cols-12 gap-y-8 md:gap-y-0 w-full content-end min-h-[280px] md:min-h-0 will-change-transform">
            {/* Description */}
            <div className="order-2 md:order-1 md:col-span-4 self-end group cursor-default min-h-40 md:min-h-0">
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

            {/* Name */}
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

      {/* Scroll Track Spacer */}
      <div
        ref={trackRef}
        className="relative w-full h-[250vh] pointer-events-none z-10"
      />
    </div>
  );
}

export default HeroSection;
