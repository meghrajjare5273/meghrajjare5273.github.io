import React, { useRef, useState, useEffect } from "react";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "../landing/Navbar";
import { GridBackground } from "@/components/ui/grid-background";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const [canAnimate, setCanAnimate] = useState(false);

  // Refs for specific animation targets
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const profileImageRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);

  // Listen for the custom event from PageOrchestrator
  useEffect(() => {
    const handleIntroComplete = () => setCanAnimate(true);
    window.addEventListener("page-intro-complete", handleIntroComplete);
    return () =>
      window.removeEventListener("page-intro-complete", handleIntroComplete);
  }, []);

  useGSAP(
    () => {
      if (!canAnimate) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Initial States
      gsap.set(contentWrapperRef.current, { scale: 1.1, opacity: 0 }); // Start slightly zoomed in

      // 1. Container Parallax "Landing"
      tl.to(contentWrapperRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
      });

      // 2. Title Reveal (Slide up + Fade)
      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0, rotateX: 10 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: "power4.out" },
        "-=1.2"
      );

      // 3. Label "ENGINEER" Reveal (Staggered)
      tl.fromTo(
        labelRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        "<+0.2"
      );

      // 4. Profile Image Wipe Reveal
      // Using clip-path for a sharp, modern reveal
      tl.fromTo(
        profileImageRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", scale: 1.2 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.4,
          ease: "expo.out",
        },
        "-=1.0"
      );

      // 5. Bio, CTA, Portfolio (Staggered Upward Motion)
      const secondaryElements = [
        bioRef.current,
        ctaRef.current,
        portfolioRef.current,
      ];
      tl.fromTo(
        secondaryElements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.4)", // Subtle bounce for UI elements
        },
        "-=0.8"
      );
    },
    { scope: containerRef, dependencies: [canAnimate] }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
    >
      <GridBackground />
      <Navbar />

      {/* This wrapper is crucial for the "Zoom Out" parallax effect 
        during the curtain lift. 
      */}
      <div
        ref={contentWrapperRef}
        className="origin-top w-full h-full py-20 px-6 opacity-0"
      >
        <div className="mx-auto max-w-7xl relative z-20">
          {/* HEADLINE SECTION */}
          <div className="relative pt-12 md:pt-20 perspective-1000">
            <h1
              ref={titleRef}
              className="z-20 text-primary relative font-bold text-center tracking-[-7px] text-7xl md:text-9xl xl:tracking-[-1rem] md:tracking-[-14px] xl:text-[10rem] will-change-transform origin-bottom"
            >
              Meghraj
            </h1>

            <p
              ref={labelRef}
              className="text-3xl md:text-4xl mt-4 md:mt-0 text-center md:text-left md:absolute md:-bottom-12 md:right-24 font-thin tracking-[6px]"
            >
              ENGINEER
            </p>
          </div>

          {/* PROFILE IMAGE & SKILLS */}
          <div className="mt-24 md:mt-32 flex flex-col md:flex-row gap-8 md:gap-0 items-center md:items-start justify-center relative">
            <div
              ref={bioRef}
              className="bg-secondary/50 backdrop-blur-sm border border-border/50 w-full max-w-xl p-8 md:p-10 space-y-4 shadow-sm rounded-sm"
            >
              <div className="font-semibold text-lg md:text-xl space-y-2 text-foreground/80">
                <div>/ WEB DEVELOPMENT</div>
                <div>/ MACHINE LEARNING</div>
                <div>/ ARTIFICIAL INTELLIGENCE</div>
              </div>
            </div>

            <div className="relative md:max-w-0.1 md:w-auto flex justify-center md:block md:absolute md:left-1/2 md:-translate-x-1/2 md:-top-16 group z-30">
              <div
                ref={profileImageRef}
                className="relative w-fit bg-secondary left-10 shadow-2xl md:ml-36 overflow-hidden will-change-transform"
              >
                <img
                  src="./prof.jpeg"
                  alt="Meghraj - Full Stack Developer"
                  className="h-80 w-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                />
                <div className="absolute top-0 left-0 bottom-0 bg-secondary text-left p-3 rotate-180 [writing-mode:vertical-rl] text-xs font-medium tracking-widest border-l border-border">
                  BASED IN PUNE MAHARASHTRA
                </div>
              </div>
            </div>
          </div>

          {/* BIO TEXT */}
          <div ref={bioRef} className="mt-20 md:mt-32">
            <p className="mx-auto max-w-2xl font-mono text-center text-sm md:text-base font-medium tracking-wide leading-relaxed text-foreground/70">
              I'M A PASSIONATE ENGINEER
              <br />
              WHO BUILDS SCALABLE AND
              <br />
              DEPLOYMENT-READY APPLICATIONS
            </p>
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="flex justify-center pt-8">
            <Button
              size="lg"
              className="text-base px-8 py-6 rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_-5px_rgba(0,0,0,0.1)]"
            >
              Book a call
            </Button>
          </div>

          {/* PORTFOLIO SNEAK PEEK */}
          {/* <div
            ref={portfolioRef}
            className="mt-32 flex flex-col md:flex-row items-start md:items-end justify-between gap-12"
          >
            <div className="relative w-full md:w-auto group perspective-1000">
              <div className="w-72 h-40 shadow-xl border border-border bg-background rounded-md overflow-hidden transition-all duration-500 group-hover:-translate-x-4 group-hover:translate-y-4 group-hover:rotate-[-5deg]">
                <img
                  src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="w-72 h-40 absolute left-4 -top-4 shadow-xl border border-border bg-background rounded-md overflow-hidden transition-all duration-500 z-10 group-hover:-translate-x-2 group-hover:translate-y-2 group-hover:-rotate-2">
                <img
                  src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
              <div className="w-72 h-40 absolute left-8 -top-8 shadow-2xl border border-border bg-background rounded-md overflow-hidden transition-all duration-500 z-20 group-hover:scale-105">
                <img
                  src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg"
                  className="w-full h-full object-cover"
                />
              </div>
            </div> */}

          {/* <div className="w-full md:w-auto">
              <div className="flex items-center md:justify-end gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                <span className="text-base md:text-lg font-medium tracking-wider">
                  RECENT WORK
                </span>
                <ArrowDownRight className="size-5 md:size-6 animate-bounce" />
              </div>

              <div className="mt-4 overflow-hidden">
                <h2 className="text-4xl md:text-5xl uppercase tracking-[-4px] md:text-right hover:text-primary transition-colors cursor-default">
                  Design without Limits
                </h2>
              </div>
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
