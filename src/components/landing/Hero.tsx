import React, { useRef, useEffect, useState } from "react";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "../landing/Navbar";

export function HeroSection() {
  const [isDark, setIsDark] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(nameRef.current, {
        opacity: 0,
        y: 60,
        duration: 0.8,
      })
        .from(
          labelRef.current,
          {
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          profileRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          bioRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.2"
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
          },
          "-=0.3"
        )
        .from(
          portfolioRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
          },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="min-h-screen overflow-hidden relative py-20"
    >
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      <div className="mx-auto max-w-7xl relative z-20 px-6">
        <div className="relative pt-12 md:pt-20">
          <h1
            ref={nameRef}
            className="z-20 text-primary relative font-bold text-center tracking-[-7px] text-7xl md:text-9xl xl:tracking-[-1rem] md:tracking-[-14px] xl:text-[10rem]"
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

        <div
          ref={profileRef}
          className="mt-24 md:mt-32 flex flex-col md:flex-row gap-8 md:gap-0 items-center md:items-start justify-center relative"
        >
          <div className="bg-secondary w-full max-w-xl p-8 md:p-10 space-y-4 shadow-lg">
            <div className="font-semibold text-lg md:text-xl space-y-2">
              <div>/ WEB DEVELOPMENT</div>
              <div>/ MACHINE LEARNING</div>
              <div>/ ARTIFICIAL INTELLIGENCE</div>
            </div>
          </div>

          <div className="hidden md:flex md:absolute md:left-1/2 md:-translate-x-1/2 md:-top-16 w-fit bg-secondary shadow-lg ml-36 overflow-hidden">
            <img
              src="./prof.jpeg"
              alt="Meghraj - Full Stack Developer"
              className="h-80 w-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="bg-secondary text-left p-3 rotate-180 [writing-mode:vertical-rl] text-xs font-medium tracking-widest border-l border-border">
              BASED IN PUNE MAHARASHTRA
            </div>
          </div>

          <div className="flex md:hidden w-full max-w-xl bg-secondary shadow-lg overflow-hidden">
            <img
              src="./prof.jpeg"
              alt="Meghraj - Full Stack Developer"
              className="h-80 w-full object-cover grayscale"
            />
            <div className="bg-secondary text-left p-3 rotate-180 [writing-mode:vertical-rl] text-xs font-medium tracking-widest border-l border-border">
              BASED IN PUNE MAHARASHTRA
            </div>
          </div>
        </div>

        <div ref={bioRef} className="mt-20 md:mt-32">
          <p className="mx-auto max-w-2xl font-mono text-center text-sm md:text-base font-medium tracking-wide leading-relaxed">
            I'M A PASSIONATE ENGINEER
            <br />
            WHO BUILDS SCALABLE AND
            <br />
            DEPLOYMENT-READY APPLICATIONS
          </p>
        </div>

        <div ref={ctaRef} className="flex justify-center pt-8">
          <Button
            size="lg"
            className="text-base px-8 hover:scale-105 transition-transform duration-300"
          >
            Book a call
          </Button>
        </div>

        <div
          ref={portfolioRef}
          className="mt-32 flex flex-col md:flex-row items-start md:items-end justify-between gap-12"
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

      {/* Light grid */}
      <div
        className="absolute block dark:hidden inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e5e5 1px, transparent 1px),
            linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Dark grid */}
      <div
        className="absolute hidden dark:block inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #404040 1px, transparent 1px),
            linear-gradient(to bottom, #404040 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
    </section>
  );
}

export default HeroSection;
