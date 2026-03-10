import { useRef, useLayoutEffect, useMemo } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"; // Add this import
import type { ProjectDetailData } from "@/lib/project-content";
import DOMPurify from "isomorphic-dompurify";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";

import MagneticScrambleButton from "@/components/projects/details/ScrambleButton";
import ProjectMediaCarousel from "@/components/projects/details/VideoCarousel";
import ProjectDetailsSidebar from "@/components/projects/details/DetailSidebar";

// Register DrawSVGPlugin alongside the others
gsap.registerPlugin(SplitText, ScrollTrigger, DrawSVGPlugin);

interface ProjectDetailProps {
  project: ProjectDetailData;
  onReturn?: () => void;
}

export const ProjectDetail = ({ project, onReturn }: ProjectDetailProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const splitTextInstances = useRef<SplitText[]>([]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    const ctx = gsap.context(() => {
      splitTextInstances.current.forEach((st) => st.revert());
      splitTextInstances.current = [];

      const titleEl = q(".gsap-anim-title")[0];
      const yearEl = q(".gsap-anim-year")[0];
      const taglineEl = q(".gsap-anim-tagline")[0];
      const closeBtnEl = q(".gsap-anim-close-btn");
      const liveLinkEl = q(".gsap-anim-live-link");
      const githubLinkEl = q(".gsap-anim-github-link");
      const imageContainerEl = q(".gsap-anim-image-container")[0];
      const imageInnerEl = q(".gsap-anim-image-inner")[0];
      const techStackEl = q(".gsap-anim-techstack")[0];
      const highlightsEl = q(".gsap-anim-highlights")[0];
      const descriptionEl = q(".gsap-anim-description")[0];

      // ── Text splits & SVG setup ──────────────────────────────────
      let titleAnimTargets: gsap.TweenTarget;
      let svgPathsTargets: gsap.TweenTarget | null = null;

      if (project.svgTitle) {
        titleAnimTargets = titleEl;
        // Select all possible drawable shapes inside the injected SVG
        svgPathsTargets = q(
          ".gsap-anim-title svg path, .gsap-anim-title svg line, .gsap-anim-title svg polyline, .gsap-anim-title svg polygon, .gsap-anim-title svg circle, .gsap-anim-title svg rect",
        );

        gsap.set(titleAnimTargets, { yPercent: 105, opacity: 0 });
        if (svgPathsTargets) {
          gsap.set(svgPathsTargets, { drawSVG: "0%" }); // Hide strokes initially
        }
      } else {
        const titleSplit = new SplitText(titleEl, {
          type: "chars",
          mask: "chars",
        });
        splitTextInstances.current.push(titleSplit);
        titleAnimTargets = titleSplit.chars;
        gsap.set(titleAnimTargets, { yPercent: 105 });
      }

      const yearSplit = new SplitText(yearEl, {
        type: "chars",
        mask: "chars",
      });
      const taglineSplit = new SplitText(taglineEl, {
        type: "words",
        mask: "words",
      });
      splitTextInstances.current.push(yearSplit, taglineSplit);

      // ── Initial states ───────────────────────────────────────────
      gsap.set(navbarRef.current, { y: -24, opacity: 0 });
      gsap.set(footerRef.current, { y: 24, opacity: 0 });
      gsap.set(contentWrapperRef.current, { opacity: 0 });
      gsap.set(yearSplit.chars, { yPercent: 105 });
      gsap.set(taglineSplit.words, { yPercent: 105 });

      gsap.set(imageContainerEl, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });
      gsap.set(imageInnerEl, { scale: 1.15 });

      gsap.set(
        [
          techStackEl,
          highlightsEl,
          descriptionEl,
          closeBtnEl,
          liveLinkEl,
          githubLinkEl,
        ],
        { y: 22, opacity: 0 },
      );

      // ── Master timeline ──────────────────────────────────────────
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.05,
      });

      tl.to(navbarRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power4.out",
        onComplete: () => {
          gsap.set(navbarRef.current, { clearProps: "all" });
        },
      }).to(
        contentWrapperRef.current,
        {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.35",
      );

      // 3. Title chars ribbon-cascade or SVG draw
      if (project.svgTitle) {
        tl.to(
          titleAnimTargets,
          {
            yPercent: 0,
            opacity: 1, // Fix: actually reveal the wrapper
            duration: 0.4,
            ease: "expo.out",
          },
          "-=0.25",
        );

        // Draw the SVG strokes if shapes were found
        if (svgPathsTargets && svgPathsTargets) {
          tl.to(
            svgPathsTargets,
            {
              drawSVG: "100%",
              duration: 0.8,
              stagger: 0.05,
              ease: "elastic.out",
            },
            "<", // Run concurrently with the wrapper sliding up
          );
        }
      } else {
        tl.to(
          titleAnimTargets,
          {
            yPercent: 0,
            duration: 0.4,
            stagger: 0.022,
            ease: "expo.out",
          },
          "-=0.25",
        );
      }

      // Continue the rest of the timeline
      tl.to(
        yearSplit.chars,
        {
          yPercent: 0,
          duration: 0.5,
          stagger: 0.025,
          ease: "power4.out",
        },
        "-=0.5",
      )
        .to(
          taglineSplit.words,
          {
            yPercent: 0,
            duration: 0.45,
            stagger: 0.03,
            ease: "power4.out",
          },
          "-=0.38",
        )
        .to(
          closeBtnEl,
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.4)",
          },
          "-=0.3",
        )
        .to(
          imageContainerEl,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.85,
            ease: "expo.inOut",
          },
          "-=0.4",
        )
        .to(
          imageInnerEl,
          {
            scale: 1,
            duration: 1.0,
            ease: "expo.out",
          },
          "<",
        )
        .to(
          liveLinkEl,
          {
            y: 0,
            opacity: 1,
            duration: 0.38,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .to(
          githubLinkEl,
          {
            y: 0,
            opacity: 1,
            duration: 0.38,
            ease: "power3.out",
          },
          "-=0.28",
        )
        .to(
          descriptionEl,
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.35",
        )
        .to(
          [techStackEl, highlightsEl],
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .to(
          footerRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.2",
        );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(imageInnerEl, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      return () => mm.revert();
    }, containerRef);

    return () => {
      splitTextInstances.current.forEach((st) => st.revert());
      ctx.revert();
    };
  }, [project]);

  const handleReturn = () => {
    if (!containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.in" },
        onComplete: () => {
          window.history.length > 1
            ? window.history.back()
            : (window.location.href = "/");
        },
      });

      tl.to([navbarRef.current, footerRef.current], {
        y: (i) => (i === 0 ? -20 : 20),
        opacity: 0,
        duration: 0.35,
        stagger: 0.04,
      })
        .to(
          [
            q(".gsap-anim-title"),
            q(".gsap-anim-year"),
            q(".gsap-anim-tagline"),
          ],
          { yPercent: -25, opacity: 0, duration: 0.4, stagger: 0.025 },
          "-=0.25",
        )
        .to(
          q(".gsap-anim-image-container"),
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            duration: 0.5,
            ease: "expo.inOut",
          },
          "-=0.3",
        )
        .to(
          [
            q(".gsap-anim-description"),
            q(".gsap-anim-techstack"),
            q(".gsap-anim-highlights"),
            q(".gsap-anim-close-btn"),
            q(".gsap-anim-live-link"),
            q(".gsap-anim-github-link"),
          ],
          { y: 16, opacity: 0, duration: 0.3, stagger: 0.02 },
          "-=0.4",
        );
    }, containerRef);
  };

  const containerAspectRatio = useMemo(
    () => project.media[0]?.aspectRatio || "16/9",
    [project.media],
  );

  return (
    <div className="relative min-h-screen bg-[#eceae8] dark:bg-[#0a0a0a]">
      <div
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-50 bg-[#eceae8]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md"
      >
        <Navbar />
      </div>

      <div
        ref={containerRef}
        className="infoverview flex flex-col lg:flex-row px-4 sm:px-6 lg:px-[2vw] py-20 lg:py-[4vw] min-h-screen w-full relative z-[2] text-neutral-900 dark:text-white overflow-hidden pt-24 lg:pt-[100px] pb-16 lg:pb-[80px]"
      >
        <div
          ref={contentWrapperRef}
          className="left-part w-full lg:w-[44%] flex flex-col"
        >
          <MagneticScrambleButton
            text="GO BACK"
            onClick={handleReturn}
            wrapperClassName="gsap-anim-close-btn relative z-10 w-fit"
            buttonClassName="closeBtn relative z-10"
            textClassName="text-sm sm:text-base lg:text-[1.3vw] leading-[1.25]"
          />

          <div className="heading mt-6 lg:mt-[1.5vw]">
            <div className="gsap-anim-title projecttitle">
              {project.svgTitle ? (
                <div
                  className="w-full max-w-[80vw] lg:max-w-[35vw] text-foreground [&>svg]:w-full [&>svg]:h-auto"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(project.svgTitle),
                  }}
                />
              ) : (
                <h3
                  className="text-4xl sm:text-5xl lg:text-[7.6vw] leading-[1] text-foreground uppercase tracking-tight"
                  style={{
                    fontFamily: "'Oswald', 'Anton', 'Impact', sans-serif",
                  }}
                >
                  {project.title}
                </h3>
              )}
            </div>

            <div className="subheading flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-[2vw] mt-3 lg:mt-2">
              <h2 className="gsap-anim-year projectyear text-foreground text-xl sm:text-2xl lg:text-[2vw] font-about-complement">
                {project.year}
              </h2>
              <h4 className="gsap-anim-tagline projectshorttag text-foreground text-base sm:text-lg lg:text-[1.3vw] font-about-proj leading-tight">
                {project.tagline}
              </h4>
            </div>

            <div className="flex flex-wrap gap-3 lg:gap-[1vw] mt-6 lg:mt-[1vw]">
              <MagneticScrambleButton
                text="LIVE LINK"
                href={project.link}
                wrapperClassName="gsap-anim-live-link"
                buttonClassName="bg-primary text-primary-foreground hover:bg-primary/90"
                textClassName="text-sm sm:text-base lg:text-[1.3vw] leading-[1.2]"
              />
              {project.githubLink && (
                <MagneticScrambleButton
                  text="GITHUB REPO"
                  href={project.githubLink}
                  wrapperClassName="gsap-anim-github-link"
                  buttonClassName="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  textClassName="text-sm sm:text-base lg:text-[1.3vw] leading-[1.2]"
                />
              )}
            </div>
          </div>

          <div className="mt-6 lg:mt-0">
            <ProjectMediaCarousel
              project={project}
              containerAspectRatio={containerAspectRatio}
            />
          </div>
        </div>

        <div className="right-part mt-8 lg:mt-auto lg:h-full flex flex-col justify-end w-full lg:w-[56%]">
          <ProjectDetailsSidebar
            description={project.description}
            techStack={project.techStack}
            highlights={project.highlights}
          />
        </div>
      </div>

      <div ref={footerRef} className="relative bottom-0 left-0 right-0 z-40">
        <Footer />
      </div>
    </div>
  );
};

export default ProjectDetail;
