import React, { useRef, useState, useEffect } from "react";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "../landing/Navbar";
import { GridBackground } from "@/components/ui/grid-background";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [signatureComplete, setSignatureComplete] = useState(false);

  // Refs for elements we want to animate
  const refs = useRef<{ [key: string]: HTMLElement | null }>({});
  const addRef = (key: string) => (el: any) => {
    if (el) refs.current[key] = el;
  };

  // Listen for signature animation completion
  useEffect(() => {
    const handleSignatureComplete = (e: Event) => {
      const customEvent = e as CustomEvent;
      setSignatureComplete(true);
    };

    window.addEventListener(
      "signature-animation-complete",
      handleSignatureComplete
    );

    return () => {
      window.removeEventListener(
        "signature-animation-complete",
        handleSignatureComplete
      );
    };
  }, []);

  useGSAP(
    () => {
      // Don't start animation until signature is complete
      if (!signatureComplete) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.3, // Small delay after signature completes for smooth transition
      });

      // 1. Set initial state to prevent FOUC
      gsap.set(
        [
          refs.current.name,
          refs.current.label,
          refs.current.profile,
          refs.current.bio,
          refs.current.cta,
          refs.current.portfolio,
        ],
        {
          opacity: 0,
          y: 40,
        }
      );

      // 2. Animate in sequence
      tl.to(refs.current.name, {
        opacity: 1,
        y: 0,
        duration: 1.2,
      })
        .to(
          refs.current.label,
          {
            opacity: 1,
            duration: 1,
          },
          "-=0.8"
        )
        .to(
          [refs.current.profile, refs.current.bio, refs.current.cta],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
          },
          "-=0.5"
        )
        .to(
          refs.current.portfolio,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.4"
        );
    },
    { scope: containerRef, dependencies: [signatureComplete] }
  );

  return (
    <section
      ref={containerRef}
      className="min-h-screen overflow-hidden relative py-20"
    >
      {/* Reusable Background Component */}
      <GridBackground />

      <Navbar />

      <div className="mx-auto max-w-7xl relative z-20 px-6">
        <div className="relative pt-12 md:pt-20">
          <h1
            ref={addRef("name")}
            className="z-20 text-primary relative font-bold text-center tracking-[-7px] text-7xl md:text-9xl xl:tracking-[-1rem] md:tracking-[-14px] xl:text-[10rem] opacity-0 will-change-transform"
          >
            Meghraj
          </h1>

          <p
            ref={addRef("label")}
            className="text-3xl md:text-4xl mt-4 md:mt-0 text-center md:text-left md:absolute md:-bottom-12 md:right-24 font-thin tracking-[6px] opacity-0"
          >
            ENGINEER
          </p>
        </div>

        <div
          ref={addRef("profile")}
          className="mt-24 md:mt-32 flex flex-col md:flex-row gap-8 md:gap-0 items-center md:items-start justify-center relative opacity-0 will-change-transform"
        >
          <div className="bg-secondary w-full max-w-xl p-8 md:p-10 space-y-4 shadow-lg">
            <div className="font-semibold text-lg md:text-xl space-y-2">
              <div>/ WEB DEVELOPMENT</div>
              <div>/ MACHINE LEARNING</div>
              <div>/ ARTIFICIAL INTELLIGENCE</div>
            </div>
          </div>

          <div className="relative w-full md:w-auto flex justify-center md:block md:absolute md:left-1/2 md:-translate-x-1/2 md:-top-16 group">
            <div className="relative w-fit bg-secondary shadow-lg md:ml-36 overflow-hidden">
              <img
                src="./prof.jpeg"
                alt="Meghraj - Full Stack Developer"
                className="h-80 w-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute top-0 left-0 bottom-0 bg-secondary text-left p-3 rotate-180 [writing-mode:vertical-rl] text-xs font-medium tracking-widest border-l border-border">
                BASED IN PUNE MAHARASHTRA
              </div>
            </div>
          </div>
        </div>

        <div
          ref={addRef("bio")}
          className="mt-20 md:mt-32 opacity-0 will-change-transform"
        >
          <p className="mx-auto max-w-2xl font-mono text-center text-sm md:text-base font-medium tracking-wide leading-relaxed">
            I'M A PASSIONATE ENGINEER
            <br />
            WHO BUILDS SCALABLE AND
            <br />
            DEPLOYMENT-READY APPLICATIONS
          </p>
        </div>

        <div
          ref={addRef("cta")}
          className="flex justify-center pt-8 opacity-0 will-change-transform"
        >
          <Button
            size="lg"
            className="text-base px-8 hover:scale-105 transition-transform duration-300"
          >
            Book a call
          </Button>
        </div>

        <div
          ref={addRef("portfolio")}
          className="mt-32 flex flex-col md:flex-row items-start md:items-end justify-between gap-12 opacity-0 will-change-transform"
        >
          <div className="relative w-full md:w-auto">
            <div className="w-72 h-40 shadow-xl border border-border rounded-md overflow-hidden hover:scale-105 transition-transform duration-300">
              <img
                src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg"
                alt="Portfolio Project 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-72 h-40 absolute left-8 -top-8 shadow-xl border border-border rounded-md overflow-hidden hover:scale-105 transition-transform duration-300">
              <img
                src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg"
                alt="Portfolio Project 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-72 h-40 absolute left-16 -top-16 shadow-xl border border-border rounded-md overflow-hidden hover:scale-105 transition-transform duration-300">
              <img
                src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg"
                alt="Portfolio Project 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-auto">
            <div className="flex items-center md:justify-end gap-2">
              <span className="text-base md:text-lg font-medium tracking-wider">
                RECENT WORK
              </span>
              <ArrowDownRight className="size-5 md:size-6" />
            </div>

            <div className="mt-4">
              <h2 className="text-4xl md:text-5xl uppercase tracking-[-4px] md:text-right">
                Design without Limits
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
