import { useRef, useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/landing/Navbar";
// import { ParallaxDotsBackground } from "@/components/ui/grid-background";
import { MacbookPro } from "../ui/macbook";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
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
      if (!canAnimate) return;
      // Ensure initial states are set before animation starts to prevent flashing
      gsap.set(".animate-text-reveal", { y: "110%", rotateX: -20, opacity: 0 });
      gsap.set(".animate-fade-in", { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2, // Slight delay before starting everything
      });

      // 1. Enhanced Text Reveal (Staggered with slight 3D rotation)
      tl.to(".animate-text-reveal", {
        y: "0%",
        rotateX: 0,
        opacity: 1,
        duration: 1.4,
        stagger: 0.15, // Increased stagger for more drama
        ease: "power4.out",
      });

      // 2. Secondary Elements Fade In
      tl.to(
        ".animate-fade-in",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
        },
        "-=1.0" // Overlap significantly with the main text reveal
      );
    },
    { scope: containerRef, dependencies: [canAnimate] }
  );

  return (
    <section
      ref={containerRef}
      // Added significant top padding (pt-[25vh]) to push content down from navbar
      className="relative min-h-screen w-full bg-[#f5f5f0] dark:bg-neutral-950 text-neutral-900 dark:text-white overflow-hidden"
    >
      {/* <MacbookPro
        src="https://utfs.io/f/6e654499-f7f4-4d5f-8a96-57255f6775e7-12vlav.jpg"
        className="size-fit"
      /> */}
      <Navbar />
      {/* Main Grid Container */}
      {/* // Changed justify-end to justify-between to spread content vertically */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen pt-[25vh] pb-12 md:pb-24 px-6 md:px-12 max-w-[1920px] mx-auto">
        {/* --- TOP ROW: ROLE TITLE --- */}
        <div className="grid grid-cols-12 gap-x-5 w-fit">
          <div className="col-span-12">
            {/* Microinteraction: Group hover makes 'Developer' turn solid color */}
            <h1 className="group font-space font-medium text-[11vw] md:text-[9vw] leading-[0.85] tracking-tight uppercase cursor-default">
              <div className="overflow-hidden perspective-[1000px]">
                <span className="block animate-text-reveal origin-top transform-gpu">
                  Software
                </span>
              </div>
              {/* Added indent and color transition on hover */}
              <div className="overflow-hidden perspective-[1000px] pl-[4vw] md:pl-[6vw]">
                <span className="block animate-text-reveal origin-top transform-gpu text-neutral-400 dark:text-neutral-600 transition-colors duration-500 group-hover:text-neutral-900 dark:group-hover:text-white">
                  Engineer
                </span>
              </div>
            </h1>
          </div>
        </div>

        {/* --- BOTTOM ROW: DETAILS & NAME --- */}
        <div className="grid grid-cols-12 gap-x-5 w-full content-end mt-24 md:mt-0">
          {/* Microinteraction: Hovering this block slides the text right */}
          <div className="col-span-6 md:col-span-4 self-end group cursor-default">
            <div className="flex flex-col gap-6 animate-fade-in">
              {/* Arrow stops bouncing on hover */}
              <div className="w-12 h-12 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center group-hover:animate-none transition-all">
                <ArrowDown
                  className="w-5 h-5 animate-caret-blink hover:transition-transform group-hover:animate-none"
                  strokeWidth={1.5}
                />
              </div>
              {/* Text slides right on hover */}
              <p className="w-fit mr-auto font-space text-sm md:text-lg leading-relaxed max-w-[280px] uppercase tracking-wide transition-transform duration-500 ease-out group-hover:translate-x-4">
                I support designers and agencies with creative development &amp;
                AI Engineering.
              </p>
            </div>
          </div>

          {/* Microinteraction: Hovering name adds a subtle skew effect */}
          <div className="col-span-6 md:col-start-7 md:col-end-13 self-end text-right">
            <h2 className="w-fit ml-auto text-right font-space font-medium text-[8vw] md:text-[7vw] leading-[0.85] tracking-tighter uppercase transition-all duration-500 ease-out hover:-skew-x-6 cursor-default hover:text-neutral-700 dark:hover:text-neutral-300">
              <div className="overflow-hidden perspective-[1000px]">
                <span className="block animate-text-reveal origin-top transform-gpu">
                  Meghraj
                </span>
              </div>
              <div className="overflow-hidden perspective-[1000px]">
                <span className="block animate-text-reveal origin-top transform-gpu">
                  Jare
                </span>
              </div>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
