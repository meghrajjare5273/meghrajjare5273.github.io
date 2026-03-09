import { useRef, useLayoutEffect, useMemo } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import type { ProjectDetailData } from "@/lib/project-content";
import DOMPurify from "isomorphic-dompurify";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";

// Extracted Components
import MagneticScrambleButton from "@/components/projects/details/ScrambleButton";
import ProjectMediaCarousel from "@/components/projects/details/VideoCarousel";
import ProjectDetailsSidebar from "@/components/projects/details/DetailSidebar";

// Register GSAP plugins
gsap.registerPlugin(SplitText);

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

  const animate = useMemo(
    () => ({
      chars: { type: "chars", charsClass: "char-anim" },
      words: { type: "words", wordsClass: "word-anim" },
    }),
    [],
  );

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    const ctx = gsap.context(() => {
      // Clean up previous SplitText instances
      splitTextInstances.current.forEach((st) => st.revert());
      splitTextInstances.current = [];

      // Query elements
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

      // Prepare title animation targets
      let titleAnimTargets;
      if (project.svgTitle) {
        titleAnimTargets = titleEl;
        gsap.set(titleAnimTargets, { yPercent: 100, opacity: 0 });
      } else {
        const titleSplit = new SplitText(titleEl, animate.chars);
        if (titleSplit.chars) splitTextInstances.current.push(titleSplit);
        titleAnimTargets = titleSplit.chars;
        gsap.set(titleAnimTargets, { yPercent: 100, opacity: 0 });
      }

      // Split text for year and tagline
      const yearSplit = new SplitText(yearEl, animate.chars);
      const taglineSplit = new SplitText(taglineEl, animate.words);

      if (yearSplit.chars) splitTextInstances.current.push(yearSplit);
      if (taglineSplit.words) splitTextInstances.current.push(taglineSplit);

      // FIX 1: Navbar - Start visible but animate in smoothly
      // Instead of starting off-screen, start with slight offset for smoother feel
      gsap.set(navbarRef.current, { y: -20, opacity: 0 });
      gsap.set(footerRef.current, { y: 20, opacity: 0 });
      gsap.set(contentWrapperRef.current, { opacity: 0, y: 20 });

      gsap.set([yearSplit.chars, taglineSplit.words], {
        yPercent: 100,
        opacity: 0,
      });

      gsap.set(imageContainerEl, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });
      gsap.set(imageInnerEl, { scale: 1.4 });

      gsap.set(
        [
          techStackEl,
          highlightsEl,
          descriptionEl,
          closeBtnEl,
          liveLinkEl,
          githubLinkEl,
        ],
        { y: 30, opacity: 0 },
      );

      // Create main timeline with better staggered timing
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.1,
      });

      // FIX 2: Animate navbar FIRST (not last) for better UX
      tl.to(navbarRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        onComplete: () => {
          gsap.set(navbarRef.current, { clearProps: "all" });
        },
      })
        .to(
          contentWrapperRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .to(
          titleAnimTargets,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.0,
            stagger: project.svgTitle ? 0 : { each: 0.03, from: "start" },
          },
          "-=0.2",
        )
        .to(
          yearSplit.chars,
          { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.05 },
          "-=0.7",
        )
        .to(
          taglineSplit.words,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.04,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .to(
          closeBtnEl,
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.4",
        )
        .to(
          imageContainerEl,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.2,
            ease: "expo.inOut",
          },
          "-=0.6",
        )
        .to(imageInnerEl, { scale: 1, duration: 1.4 }, "-=1.2")
        .to(
          liveLinkEl,
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.8",
        )
        .to(
          githubLinkEl,
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.4",
        )
        .to(
          descriptionEl,
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3",
        )
        .to(
          [techStackEl, highlightsEl],
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .to(
          footerRef.current,
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        );

      // Parallax effect for image on scroll (desktop only)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(imageInnerEl, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      return () => mm.revert();
    }, containerRef);

    return () => {
      splitTextInstances.current.forEach((st) => st.revert());
      ctx.revert();
    };
  }, [project, animate]);

  const handleReturn = () => {
    if (!containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (window.history.length > 1) {
            window.history.back();
          } else {
            window.location.href = "/";
          }
        },
      });

      tl.to([navbarRef.current, footerRef.current], {
        y: (i) => (i === 0 ? -20 : 20),
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power3.in",
      })
        .to(
          [
            q(".gsap-anim-title"),
            q(".gsap-anim-year"),
            q(".gsap-anim-tagline"),
          ],
          {
            yPercent: -30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.03,
            ease: "power3.in",
          },
          "-=0.2",
        )
        .to(
          q(".gsap-anim-image-container"),
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            duration: 0.6,
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
          {
            y: 20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.03,
            ease: "power3.in",
          },
          "-=0.4",
        );
    }, containerRef);

    return () => ctx.revert();
  };

  const containerAspectRatio = useMemo(
    () => project.media[0]?.aspectRatio || "16/9",
    [project.media],
  );

  return (
    <div className="relative min-h-screen bg-background">
      {/* FIX 3: Navbar with proper z-index and backdrop blur for better visibility */}
      <div
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 border-b border-border/50"
      >
        <Navbar />
      </div>

      <div
        ref={containerRef}
        className="infoverview flex flex-col lg:flex-row px-4 sm:px-6 lg:px-[2vw] py-20 lg:py-[4vw] min-h-screen w-full relative z-[2] bg-background/80 text-foreground overflow-hidden pt-24 lg:pt-[100px] pb-16 lg:pb-[80px]"
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
            <div className="overflow-hidden projecttitle">
              <div className="gsap-anim-title">
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
            </div>

            {/* FIX 4: Better responsive layout for subheading */}
            <div className="subheading flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-[2vw] mt-3 lg:mt-2">
              <div className="year">
                <h2 className="gsap-anim-year projectyear text-foreground text-xl sm:text-2xl lg:text-[2vw] font-about-complement">
                  {project.year}
                </h2>
              </div>
              <div className="shortdescription">
                <h4 className="gsap-anim-tagline projectshorttag text-foreground text-base sm:text-lg lg:text-[1.3vw] font-about-proj leading-tight">
                  {project.tagline}
                </h4>
              </div>
            </div>

            {/* FIX 5: Responsive button layout */}
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

          {/* FIX 6: Responsive media carousel */}
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
