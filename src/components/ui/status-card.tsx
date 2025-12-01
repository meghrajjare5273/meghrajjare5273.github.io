import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Briefcase, Code2, ArrowUpRight, MapPin, Cpu, Zap } from "lucide-react";

const StatusCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const secondarySpotlightRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for prefers-reduced-motion on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // --- Entry & Continuous Animations ---
  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(".status-element", { opacity: 1, y: 0, filter: "blur(0px)" });
        gsap.set(".pulse-ring", { scale: 1, opacity: 0.75 });
        return;
      }

      // Prepare for GPU acceleration
      gsap.set(".status-element", { willChange: "transform, opacity" });

      // 1. Entry Animation: Cinematic "blur-up" reveal with improved stagger
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          gsap.set(".status-element", { clearProps: "willChange" });
        },
      });

      tl.fromTo(
        ".status-element",
        { y: 20, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: { amount: 0.3, from: "start" },
          duration: 0.9,
        }
      );

      // 2. Animated pulse with color shift and multiple rings
      gsap.to(".pulse-ring", {
        scale: 2.5,
        opacity: 0,
        duration: 2.5,
        repeat: -1,
        ease: "power1.out",
      });

      gsap.to(".pulse-ring-secondary", {
        scale: 2,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power1.out",
        delay: 0.3,
      });

      // 3. Subtle glow animation on status badge
      gsap.to(".status-badge", {
        boxShadow:
          "0 0 20px rgba(52, 211, 153, 0.4), inset 0 0 10px rgba(52, 211, 153, 0.1)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  // --- Mouse Movement Interaction ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    if (!spotlightRef.current || !borderRef.current || !containerRef.current)
      return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Move the primary spotlight gradient
    gsap.to(spotlightRef.current, {
      x: x,
      y: y,
      duration: 0.6,
      ease: "power2.out",
    });

    // Move the border spotlight (sharper, faster)
    gsap.to(borderRef.current, {
      x: x,
      y: y,
      duration: 0.2,
      ease: "power1.out",
    });

    // Move secondary spotlight (slower lag)
    if (secondarySpotlightRef.current) {
      gsap.to(secondarySpotlightRef.current, {
        x: x * 0.5,
        y: y * 0.5,
        duration: 1,
        ease: "power1.out",
      });
    }
  };

  // --- Button Magnetic Interaction ---
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(buttonRef.current, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleButtonMouseLeave = () => {
    if (prefersReducedMotion || !buttonRef.current) return;

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  // --- Hover State Management ---
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // --- Detail Item Hover Animation ---
  const handleDetailItemHover = (
    e: React.MouseEvent<HTMLDivElement>,
    isEnter: boolean
  ) => {
    if (prefersReducedMotion) return;

    gsap.to(e.currentTarget, {
      scale: isEnter ? 1.02 : 1,
      x: isEnter ? 3 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full h-[560px] max-h-[560px] md:min-h-80 lg:min-h-[360px] flex flex-col justify-between overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800/50 p-4 md:p-6 lg:p-8 pointer-events-auto select-none touch-auto md:touch-auto"
      style={{
        boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* --- Ambient Gradient Mesh Layers --- */}

      {/* 1. Base Gradient with depth */}
      <div className="absolute inset-0 bg-linear-to-b from-neutral-900/50 to-neutral-950 z-0 pointer-events-none" />

      {/* 2. Animated Radial Gradients */}
      <div className="absolute inset-0 opacity-30 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.08),transparent_40%)]" />
      </div>

      {/* 3. Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

      {/* 4. Primary Mouse Follower Spotlight (Inner Glow) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      />

      {/* 5. Secondary Accent Spotlight */}
      <div
        ref={secondarySpotlightRef}
        className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-400/5 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          mixBlendMode: "screen",
        }}
      />

      {/* 6. Mouse Follower Border Highlight Container */}
      <div className="absolute inset-0 z-10 pointer-events-none rounded-2xl overflow-hidden">
        <div
          ref={borderRef}
          className="absolute top-0 left-0 w-[300px] h-[300px] bg-linear-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      </div>

      {/* --- Content Layer --- */}
      <div className="relative z-20 flex flex-col h-full justify-between gap-6 md:gap-8">
        {/* Header: Status Indicator
        <div className="status-element flex items-center justify-between">
          <div className="status-badge flex items-center gap-3 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800/60 backdrop-blur-xl">
            <div className="relative flex items-center justify-center w-2.5 h-2.5">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span
                className="pulse-ring-secondary absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50"
                style={{ animationDelay: "0.3s" }}
              ></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
            </div>
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-neutral-400 font-medium">
              Available for projects
            </span>
          </div>
          <Cpu className="w-5 h-5 text-neutral-600 group-hover:text-neutral-500 transition-colors duration-300" />
        </div> */}

        {/* Main Body */}
        <div className="space-y-6 md:space-y-8">
          {/* Headline with gradient */}
          <div className="status-element">
            <h3 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-[450] tracking-[-0.02em] text-neutral-100 leading-[1.1]">
              Currently working on{" "}
              {/* <a
                href="https://www.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-block relative bg-linear-to-r from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent font-semibold hover:from-indigo-300 hover:via-purple-300 hover:to-indigo-200 transition-all duration-300"
              > */}
              something different
              {/* Animated underline */}
              <span className="absolute left-0 bottom-0 w-full h-px bg-linear-to-r from-indigo-500/50 to-purple-500/50 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-83" />
              {/* </a> */}
            </h3>
          </div>

          {/* Detail Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 md:gap-4">
            {/* Role Detail */}
            <div
              className="status-element group/item flex items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10 cursor-pointer backdrop-blur-sm hover:backdrop-blur-md"
              onMouseEnter={(e) => handleDetailItemHover(e, true)}
              onMouseLeave={(e) => handleDetailItemHover(e, false)}
            >
              <div className="p-2.5 rounded-lg bg-neutral-900/60 text-neutral-500 group-hover/item:text-indigo-400 group-hover/item:bg-neutral-800/80 transition-all duration-300 backdrop-blur-sm">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-neutral-600 font-mono uppercase tracking-wider">
                  Role
                </span>
                <span className="text-sm md:text-base text-neutral-200 font-medium">
                  Open to Work
                </span>
              </div>
            </div>

            {/* Location Detail */}
            <div
              className="status-element group/item flex items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10 cursor-pointer backdrop-blur-sm hover:backdrop-blur-md"
              onMouseEnter={(e) => handleDetailItemHover(e, true)}
              onMouseLeave={(e) => handleDetailItemHover(e, false)}
            >
              <div className="p-2.5 rounded-lg bg-neutral-900/60 text-neutral-500 group-hover/item:text-indigo-400 group-hover/item:bg-neutral-800/80 transition-all duration-300 backdrop-blur-sm">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-neutral-600 font-mono uppercase tracking-wider">
                  Base
                </span>
                <span className="text-sm md:text-base text-neutral-200 font-medium">
                  Pune, MH
                </span>
              </div>
            </div>

            {/* Tech Stack Detail - Full Width */}
            <div
              className="status-element md:col-span-2 group/item flex items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10 cursor-pointer backdrop-blur-sm hover:backdrop-blur-md"
              onMouseEnter={(e) => handleDetailItemHover(e, true)}
              onMouseLeave={(e) => handleDetailItemHover(e, false)}
            >
              <div className="p-2.5 rounded-lg bg-neutral-900/60 text-neutral-500 group-hover/item:text-indigo-400 group-hover/item:bg-neutral-800/80 transition-all duration-300 backdrop-blur-sm">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-0.5 flex-1">
                <span className="text-[10px] text-neutral-600 font-mono uppercase tracking-wider">
                  Active Stack
                </span>
                <span className="text-sm md:text-base text-neutral-200 font-medium">
                  Next.js · Rust
                </span>
              </div>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="status-element grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900/40 border border-neutral-800/50 backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5 text-yellow-500/70" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-neutral-100">2+</span>
                <span className="text-[10px] text-neutral-500 font-mono">
                  Years
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900/40 border border-neutral-800/50 backdrop-blur-sm">
              <div className="w-3.5 h-3.5 rounded-full bg-linear-to-br from-indigo-500 to-purple-500" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-neutral-100">5+</span>
                <span className="text-[10px] text-neutral-500 font-mono">
                  Projects
                </span>
              </div>
            </div>
            {/* <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900/40 border border-neutral-800/50 backdrop-blur-sm md:col-span-1 col-span-2">
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/70" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-neutral-100">
                  PST 9-6
                </span>
                <span className="text-[10px] text-neutral-500 font-mono">
                  Active
                </span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Footer / CTA */}
        <div className="status-element pt-4">
          <button
            ref={buttonRef}
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
            onClick={() => (window.location.href = "/")}
            className="group/btn relative overflow-hidden rounded-lg bg-linear-to-br from-neutral-100 to-neutral-200 hover:from-white hover:to-neutral-100 text-neutral-950 px-5 md:px-6 py-3 md:py-3.5 text-sm font-semibold w-full md:w-auto flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg hover:shadow-xl mb-8"
          >
            <span className="relative z-10">Explore My Work</span>
            <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />

            {/* Button Hover Fill Effect */}
            <div className="absolute inset-0 bg-linear-to-br from-neutral-700 to-neutral-800 translate-y-full transition-transform duration-300 ease-out group-hover/btn:translate-y-0 z-0 rounded-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
