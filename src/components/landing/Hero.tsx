import { useRef, useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Navbar from "@/components/landing/Navbar";
import Macbook from "@/components/ui/macbook";
import IPhoneMockup from "@/components/ui/iphone";
import { GridBackground } from "../ui/grid-background";
import StatusCard from "@/components/ui/status-card";
import { introState } from "@/lib/intro-state";

gsap.registerPlugin(ScrollTrigger);

// 1. Configure ScrollTrigger to ignore address bar resizes
ScrollTrigger.config({ ignoreMobileResize: true });

export function HeroSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const macbookRef = useRef<HTMLDivElement>(null);
  const iphoneRef = useRef<HTMLDivElement>(null);
  const [canAnimate, setCanAnimate] = useState(false);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  // 2. Custom hook logic to lock height
  const [mobileHeight, setMobileHeight] = useState("100vh");

  useEffect(() => {
    // Function to set height based on innerHeight (visual viewport)
    const setHeight = () => {
      setMobileHeight(`${window.innerHeight}px`);
    };

    // Set initial height
    setHeight();

    // Only update height if WIDTH changes (orientation change), not height (address bar)
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        setHeight();
        // Force ScrollTrigger to refresh positions on orientation change
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (introState.complete) {
      setCanAnimate(true);
      return;
    }
    const handleIntroComplete = () => setCanAnimate(true);
    window.addEventListener("page-intro-complete", handleIntroComplete);
    return () =>
      window.removeEventListener("page-intro-complete", handleIntroComplete);
  }, []);

  useEffect(() => {
    const lenisInstance = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.2,
    });

    setLenis(lenisInstance);

    lenisInstance.on("scroll", ScrollTrigger.update);

    function update(time: number) {
      lenisInstance.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenisInstance.destroy();
    };
  }, []);

  useGSAP(
    () => {
      if (!canAnimate || !trackRef.current || !contentRef.current || !lenis)
        return;

      const q = gsap.utils.selector(contentRef);
      const mm = gsap.matchMedia();

      // --- SHARED INITIAL STATES ---
      gsap.set(".animate-text-reveal", { y: "110%", rotateX: -20, opacity: 0 });
      gsap.set(".animate-fade-in", { opacity: 0, y: 30 });

      gsap.set([macbookRef.current, iphoneRef.current], {
        force3D: true,
        backfaceVisibility: "hidden",
      });

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
          "start+=0.9",
        )
        .to(
          ".animate-fade-in",
          { opacity: 1, y: 0, duration: 1, stagger: 0.2 },
          "-=1.2",
        );

      // --- DESKTOP ANIMATION ---
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
          "start",
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
          0,
        );

        scrollTl.to(
          macbookRef.current,
          {
            y: "-15vh",
            scale: 1.25,
            duration: 0.3,
            ease: "power1.inOut",
          },
          0,
        );

        scrollTl.to(
          q(".macbook-content-mask"),
          {
            opacity: 1,
            duration: 0.1,
            ease: "power2.out",
          },
          0.1,
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
          0.25,
        );

        scrollTl.to(
          q(".macbook-screen-open"),
          {
            rotationX: -90,
            duration: 0.65,
            ease: "none",
          },
          0.25,
        );
      });

      // --- MOBILE ANIMATION ---
      mm.add("(max-width: 767px)", () => {
        gsap.set(iphoneRef.current, { y: "20vh", scale: 0.75, opacity: 0 });
        gsap.set(q(".iphone-content-mask"), { opacity: 0 });

        entranceTl.to(
          iphoneRef.current,
          {
            y: "5vh",
            scale: 0.85,
            opacity: 1,
            duration: 1.5,
            ease: "expo.out",
          },
          "start",
        );

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
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
          0,
        );

        scrollTl.to(
          iphoneRef.current,
          {
            y: "5dvh",
            scale: 1.1,
            duration: 0.5,
            ease: "power1.inOut",
          },
          0,
        );

        scrollTl.to(
          q(".iphone-content-mask"),
          {
            opacity: 1,
            duration: 0.1,
            ease: "power2.out",
          },
          0.1,
        );
      });

      ScrollTrigger.refresh();
      return () => {
        mm.revert();
      };
    },
    { scope: contentRef, dependencies: [canAnimate, lenis] },
  );

  return (
    <div className="relative w-full font-bromo bg-[#eceae8] dark:bg-[#0e0e0e]">
      {/* 3. Apply the locked mobileHeight to the container */}
      <div
        ref={contentRef}
        style={{ height: mobileHeight }}
        className="fixed top-0 left-0 w-full text-neutral-900 dark:text-white overflow-hidden z-0 flex flex-col"
      >
        <GridBackground />
        <Navbar />

        <div className="absolute inset-0 flex items-end justify-center z-0 pb-[15vh] md:pb-[10vh]">
          <div className="block md:hidden transform-gpu origin-bottom">
            <IPhoneMockup ref={iphoneRef} className="will-change-transform">
              <div className="iphone-content-mask w-full h-full">
                <StatusCard />
              </div>
            </IPhoneMockup>
          </div>

          <div className="hidden md:block transform-gpu scale-[0.85] lg:scale-[0.6] xl:scale-80 origin-bottom transition-transform duration-500 ease-out">
            <Macbook
              ref={macbookRef}
              className="drop-shadow-2xl will-change-transform"
            >
              <StatusCard />
            </Macbook>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-between pt-28 md:pt-[25vh] pb-8 md:pb-24 px-6 md:px-12 max-w-480 mx-auto w-full min-h-full pointer-events-none">
          <div className="hero-text-container w-full">
            <h1 className="group font-space font-medium text-[10vw] md:text-[6vw] leading-[0.9] tracking-tight uppercase cursor-default w-fit pointer-events-auto pt-2">
              <div className="overflow-y-visible perspective-[1000px]">
                <span className="block animate-text-reveal origin-top transform-gpu font-about-complement">
                  Software
                </span>
              </div>
              <div className="overflow-y-visible perspective-[1000px] pl-[6vw] md:pl-[6vw] font-about-complement">
                <span className="block animate-text-reveal origin-top transform-gpu text-neutral-400 dark:text-neutral-600 transition-colors duration-500 group-hover:text-neutral-900 dark:group-hover:text-white w-fit">
                  Engineer
                </span>
              </div>
            </h1>
          </div>

          <div className="hero-sub-text flex flex-col md:grid md:grid-cols-12 gap-y-8 md:gap-y-0 w-full content-end min-h-70 md:min-h-0 will-change-transform">
            <div className="order-2 md:order-1 md:col-span-4 self-end group cursor-default min-h-40 md:min-h-0">
              <div className="flex flex-col gap-6 animate-fade-in">
                <div className="w-12 h-12 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center group-hover:animate-none transition-all">
                  <ArrowDown
                    className="w-5 h-5 animate-caret-blink hover:transition-transform group-hover:animate-none"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="w-full md:w-fit font-about text-base md:text-lg leading-relaxed max-w-[320px] uppercase tracking-wide transition-transform duration-500 ease-out group-hover:translate-x-4 backdrop-blur-md md:backdrop-blur-none rounded-md p-2 md:p-0 pointer-events-auto">
                  I build and design full stack web applications using modern
                  tech &amp; AI.
                </p>
              </div>
            </div>

            <div className="order-1 md:order-2 md:col-start-7 md:col-end-13 self-end text-left md:text-right">
              <h2 className="w-full md:w-fit ml-auto text-[10vw] md:text-[6vw] leading-[0.85] tracking-tighter uppercase transition-all duration-500 ease-out hover:-skew-x-6 cursor-default hover:text-neutral-700 dark:hover:text-neutral-300 pointer-events-auto pt-2">
                <div className="overflow-y-visible perspective-[1000px]">
                  <span className="block animate-text-reveal origin-top transform-gpu font-about-complement ">
                    Meghraj
                  </span>
                </div>
                <div className="overflow-y-visible perspective-[1000px]">
                  <span className="block animate-text-reveal origin-top transform-gpu font-about-complement">
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
        className="relative w-full h-[150vh] md:h-[250vh] pointer-events-none z-10"
      />
    </div>
  );
}

export default HeroSection;
