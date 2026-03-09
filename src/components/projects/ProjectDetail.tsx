import { useRef, useLayoutEffect, useMemo } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/all";
import type { ProjectDetailData } from "@/lib/project-content";
import DOMPurify from "isomorphic-dompurify";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";

// Extracted Components
import MagneticScrambleButton from "@/components/projects/details/ScrambleButton";
import ProjectMediaCarousel from "@/components/projects/details/VideoCarousel";
import ProjectDetailsSidebar from "@/components/projects/details/DetailSidebar";

gsap.registerPlugin(SplitText, Flip);

interface ProjectDetailProps {
  project: ProjectDetailData;
  onReturn?: () => void;
}

export const ProjectDetail = ({ project, onReturn }: ProjectDetailProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const splitTextInstances = useRef<SplitText[]>([]);

  const animate = useMemo(() => {
    return {
      chars: { type: "chars", charsClass: "char-anim" },
      words: { type: "words", wordsClass: "word-anim" },
    };
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    const ctx = gsap.context(() => {
      splitTextInstances.current.forEach((st) => st.revert());
      splitTextInstances.current = [];

      // Query elements using scoped class names from child components
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

      const yearSplit = new SplitText(yearEl, animate.chars);
      const taglineSplit = new SplitText(taglineEl, animate.words);

      if (yearSplit.chars) splitTextInstances.current.push(yearSplit);
      if (taglineSplit.words) splitTextInstances.current.push(taglineSplit);

      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.1 });

      gsap.set(navbarRef.current, { y: -100, opacity: 0 });
      gsap.set(footerRef.current, { y: 100, opacity: 0 });
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
        { y: 40, opacity: 0 },
      );

      tl.to(titleAnimTargets, {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        stagger: project.svgTitle ? 0 : { each: 0.03, from: "start" },
      })
        .to(
          yearSplit.chars,
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.05 },
          "-=0.9",
        )
        .to(
          taglineSplit.words,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.04,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .to(
          closeBtnEl,
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.5",
        )
        .to(
          imageContainerEl,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.4,
            ease: "expo.inOut",
          },
          "-=0.8",
        )
        .to(imageInnerEl, { scale: 1, duration: 1.6 }, "-=1.4")
        .to(
          liveLinkEl,
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=1",
        )
        .to(
          githubLinkEl,
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.6",
        )
        .to(
          descriptionEl,
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        )
        .to(
          [techStackEl, highlightsEl],
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .to(
          navbarRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            onComplete: () => {
              if (navbarRef.current) {
                gsap.set(navbarRef.current, { clearProps: "all" });
              }
            },
          },
          "-=0.8",
        )
        .to(footerRef.current, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .add(() => {
          gsap.set([closeBtnEl, liveLinkEl, githubLinkEl], {
            pointerEvents: "auto",
          });
        }, "-=0.3");

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(imageInnerEl, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
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
        y: (i) => (i === 0 ? -100 : 100),
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.in",
      })
        .to(
          [
            q(".gsap-anim-title"),
            q(".gsap-anim-year"),
            q(".gsap-anim-tagline"),
          ],
          {
            yPercent: -50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "power3.in",
          },
          "-=0.3",
        )
        .to(
          q(".gsap-anim-image-container"),
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            duration: 0.8,
            ease: "expo.inOut",
          },
          "-=0.4",
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
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power3.in",
          },
          "-=0.6",
        );
    }, containerRef);
    return () => ctx.revert();
  };

  const containerAspectRatio = useMemo(
    () => project.media[0]?.aspectRatio || "4/3",
    [project.media],
  );

  return (
    <div className="relative min-h-screen bg-[#1d1f1d]">
      <div ref={navbarRef} className="absolute top-0 left-0 right-0">
        <Navbar />
      </div>

      <div
        ref={containerRef}
        className="infoverview flex md:flex-row flex-col px-[2vw] md:px-[1.5vw] py-[4vw] md:py-[2vw] min-h-screen w-full relative z-[2] bg-[#9f9a95] dark:bg-[#1d1d1d] text-white overflow-hidden pt-[80px] md:pt-[100px] pb-[60px] md:pb-[80px]"
      >
        <div className="left-part h-[48%] md:h-full w-full md:w-[44%] flex flex-col">
          <MagneticScrambleButton
            text="GO BACK"
            onClick={handleReturn}
            wrapperClassName="gsap-anim-close-btn relative z-10"
            buttonClassName="closeBtn relative z-10"
            textClassName="text-[4vw] md:text-[1.3vw] leading-[1.25]"
          />

          <div className="heading mt-[2.5vw] md:mt-[1.5vw]">
            <div className="overflow-hidden projecttitle">
              <div className="gsap-anim-title">
                {project.svgTitle ? (
                  <div
                    className="w-full max-w-[70vw] md:max-w-[35vw] text-white [&>svg]:w-full [&>svg]:h-auto"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(project.svgTitle),
                    }}
                  />
                ) : (
                  <h3
                    className="text-[14vw] md:text-[7.6vw] leading-[1] text-white uppercase tracking-tight"
                    style={{
                      fontFamily: "'Oswald', 'Anton', 'Impact', sans-serif",
                    }}
                  >
                    {project.title}
                  </h3>
                )}
              </div>
            </div>
            <div className="subheading flex items-center gap-[3vw] md:gap-[2vw] mt-2">
              <div className="year">
                <h2 className="gsap-anim-year projectyear text-white text-[4vw] leading-[1.1] md:text-[2vw] font-about-complement">
                  {project.year}
                </h2>
              </div>
              <div className="shortdescription">
                <h4 className="gsap-anim-tagline projectshorttag text-white text-[3vw] leading-[1] md:text-[1.3vw] font-about-proj">
                  {project.tagline}
                </h4>
              </div>
            </div>

            <div className="flex flex-wrap gap-[2vw] md:gap-[1vw] mt-[3vw] md:mt-[1vw]">
              <MagneticScrambleButton
                text="LIVE LINK"
                href={project.link}
                wrapperClassName="gsap-anim-live-link"
                buttonClassName="bg-[#242A23]"
                textClassName="text-[4vw] md:text-[1.3vw] leading-[1.2]"
              />

              {project.githubLink && (
                <MagneticScrambleButton
                  text="GITHUB REPO"
                  href={project.githubLink}
                  wrapperClassName="gsap-anim-github-link"
                  buttonClassName="bg-[#242A23]"
                  textClassName="text-[4vw] md:text-[1.3vw] leading-[1.2]"
                />
              )}
            </div>
          </div>

          <ProjectMediaCarousel
            project={project}
            containerAspectRatio={containerAspectRatio}
          />
        </div>

        <div className="right-part h-[52%] mt-auto md:h-full flex flex-col justify-end w-full md:w-[56%]">
          <ProjectDetailsSidebar
            description={project.description}
            techStack={project.techStack}
            highlights={project.highlights}
          />
        </div>
      </div>

      <div ref={footerRef} className="relative bottom-0 left-0 right-0 z-50">
        <Footer />
      </div>
    </div>
  );
};

export default ProjectDetail;
