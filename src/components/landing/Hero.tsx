import { useRef, useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/landing/Navbar";
import Macbook from "@/components/ui/macbook";
import IPhoneMockup from "@/components/ui/iphone";
import { GridBackground } from "../ui/grid-background";
import StatusCard from "@/components/ui/status-card";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const macbookRef = useRef<HTMLDivElement>(null);
  const iphoneRef = useRef<HTMLDivElement>(null);
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
      const mm = gsap.matchMedia();

      // --- SHARED INITIAL STATES ---
      gsap.set(".animate-text-reveal", { y: "110%", rotateX: -20, opacity: 0 });
      gsap.set(".animate-fade-in", { opacity: 0, y: 30 });

      const entranceTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      entranceTl
        .to(
          ".animate-text-reveal",
          {
            y: "0%",
            rotateX: 0,
            opacity: 1,
            duration: 1.4,
            stagger: 0.15,
            ease: "power4.out",
          },
          "start+=0.9"
        )
        .to(
          ".animate-fade-in",
          { opacity: 1, y: 0, duration: 1, stagger: 0.2 },
          "-=1.2"
        );

      // --- 1. DESKTOP ANIMATION (>768px) ---
      mm.add("(min-width: 768px)", () => {
        gsap.set(macbookRef.current, { y: "20vh", scale: 0.8 });
        gsap.set(q(".macbook-screen-close"), {
          rotationX: 90,
          scale: 0.9,
          bottom: -5,
        });
        gsap.set(q(".macbook-screen-open"), { rotationX: 0, z: -580 });
        gsap.set(q(".macbook-content-mask"), { opacity: 0 });

        entranceTl.to(
          macbookRef.current,
          { y: "10vh", scale: 1, duration: 1.5, ease: "expo.out" },
          "start"
        );

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });

        scrollTl.to(
          [".hero-text-container", ".hero-sub-text"],
          {
            y: -150,
            opacity: 0,
            duration: 0.1,
            ease: "power1.in",
          },
          0
        );

        scrollTl.to(
          macbookRef.current,
          {
            y: "-15vh",
            scale: 1.25, // Reduced slightly from 1.3 for better fit
            duration: 0.3,
            ease: "power1.inOut",
          },
          0
        );

        scrollTl.to(
          q(".macbook-content-mask"),
          {
            opacity: 1,
            duration: 0.1,
            ease: "power2.out",
          },
          0.1
        );

        scrollTl.to(
          q(".macbook-screen-close"),
          {
            rotationX: 0,
            scale: 1,
            bottom: 0,
            duration: 0.65,
            ease: "none",
          },
          0.25
        );

        scrollTl.to(
          q(".macbook-screen-open"),
          {
            rotationX: -90,
            duration: 0.65,
            ease: "none",
          },
          0.25
        );
      });

      // --- 2. MOBILE ANIMATION (<767px) ---
      mm.add("(max-width: 767px)", () => {
        // Init: Start smaller (0.75)
        gsap.set(iphoneRef.current, { y: "20vh", scale: 0.75, opacity: 0 });
        gsap.set(q(".iphone-content-mask"), { opacity: 0 });

        // Entrance: Land at 0.85 (Smaller resting size)
        entranceTl.to(
          iphoneRef.current,
          {
            y: "5vh",
            scale: 0.85, // REDUCED: Was 1, now 0.85
            opacity: 1,
            duration: 1.5,
            ease: "expo.out",
          },
          "start"
        );

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });

        scrollTl.to(
          [".hero-text-container", ".hero-sub-text"],
          {
            y: -100,
            opacity: 0,
            duration: 0.1,
            ease: "power1.in",
          },
          0
        );

        // Scroll: Zoom to 1.1 (Smaller zoomed size)
        scrollTl.to(
          iphoneRef.current,
          {
            y: "5dvh",
            scale: 1.1, // REDUCED: Was 1.35, now 1.1 to fit screen edges
            duration: 0.3,
            ease: "power1.inOut",
          },
          0
        );

        scrollTl.to(
          q(".iphone-content-mask"),
          {
            opacity: 1,
            duration: 0.1,
            ease: "power2.out",
          },
          0.1
        );
      });

      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { scope: contentRef, dependencies: [canAnimate] }
  );

  return (
    <div className="relative w-full font-bromo">
      <div
        ref={contentRef}
        className="fixed top-0 left-0 h-svh w-full bg-[#eceae8] dark:bg-[#101010] text-neutral-900 dark:text-white overflow-hidden z-0 flex flex-col"
      >
        <GridBackground />
        <Navbar />

        <div className="absolute inset-0 flex items-end justify-center z-0 pb-[15vh] md:pb-[10vh]">
          {/* Mobile Component (iPhone) - Initial wrapper class tuned */}
          <div className="block md:hidden transform-gpu origin-bottom">
            <IPhoneMockup
              ref={iphoneRef}
              className="drop-shadow-2xl will-change-transform"
            >
              <div className="iphone-content-mask w-full h-full">
                <StatusCard />
              </div>
            </IPhoneMockup>
          </div>

          {/* Desktop Component (Macbook) */}
          <div className="hidden md:block transform-gpu scale-[0.85] lg:scale-[0.6] xl:scale-80 origin-bottom transition-transform duration-500 ease-out">
            <Macbook
              ref={macbookRef}
              className="drop-shadow-2xl will-change-transform"
            >
              <StatusCard />
            </Macbook>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-between pt-28 md:pt-[25vh] pb-8 md:pb-24 px-6 md:px-12 max-w-[1920px] mx-auto w-full min-h-svh pointer-events-none">
          <div className="hero-text-container w-full">
            <h1 className="group font-space font-medium text-[10vw] md:text-[6vw] leading-[0.9] tracking-tight uppercase cursor-default w-fit pointer-events-auto">
              <div className="overflow-hidden perspective-[1000px]">
                <span className="block animate-text-reveal origin-top transform-gpu font-geo">
                  Software
                </span>
              </div>
              <div className="overflow-hidden perspective-[1000px] pl-[6vw] md:pl-[6vw] font-geo">
                <span className="block animate-text-reveal origin-top transform-gpu text-neutral-400 dark:text-neutral-600 transition-colors duration-500 group-hover:text-neutral-900 dark:group-hover:text-white w-fit">
                  Engineer
                </span>
              </div>
            </h1>
          </div>

          <div className="hero-sub-text flex flex-col md:grid md:grid-cols-12 gap-y-8 md:gap-y-0 w-full content-end min-h-[280px] md:min-h-0 will-change-transform">
            <div className="order-2 md:order-1 md:col-span-4 self-end group cursor-default min-h-40 md:min-h-0">
              <div className="flex flex-col gap-6 animate-fade-in">
                <div className="w-12 h-12 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center group-hover:animate-none transition-all">
                  <ArrowDown
                    className="w-5 h-5 animate-caret-blink hover:transition-transform group-hover:animate-none"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="w-full md:w-fit font-space text-base md:text-lg leading-relaxed max-w-[320px] uppercase tracking-wide transition-transform duration-500 ease-out group-hover:translate-x-4 backdrop-blur-md md:backdrop-blur-none rounded-md p-2 md:p-0 pointer-events-auto">
                  I build and design full stack web appplications using modern
                  tech &amp; AI.
                </p>
              </div>
            </div>

            <div className="order-1 md:order-2 md:col-start-7 md:col-end-13 self-end text-left md:text-right">
              <h2 className="w-full md:w-fit ml-auto font-medium text-[10vw] md:text-[6vw] leading-[0.85] tracking-tighter uppercase transition-all duration-500 ease-out hover:-skew-x-6 cursor-default hover:text-neutral-700 dark:hover:text-neutral-300 pointer-events-auto">
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

      <div
        ref={trackRef}
        className="relative w-full h-[180vh] md:h-[25 0vh] pointer-events-none z-10"
      />
    </div>
  );
}

export default HeroSection;
