import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { ArrowUpRight, X } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
}

// --- Types ---
export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  thumbnail?: string;
}

export interface AwwwardsProjectData {
  title: string;
  slug: string;
  description: string;
  metadata: {
    industry: string;
    year: string;
    services: string[];
    repoLink: string;
    deploymentLink?: string;
  };
  media: {
    carousel: MediaItem[];
  };
  hero: {
    heading: string[];
  };
  background?: {
    heading: string;
    text: string;
  };
  challenge?: {
    objective: string;
    detail: string;
  };
  techStack: {
    heading: string;
    description: string;
    stack: string[];
    team: { name: string; role: string }[];
  };
  stats?: {
    heading: string;
    description: string;
    snapshotDate?: string;
    services: {
      name: string;
      status: string;
      description: string;
      updatedAt: string;
    }[];
  };
  testimonial?: {
    quote: string;
    author: { name: string; role: string };
  };
}

interface ProjectDetailOverlayProps {
  project: AwwwardsProjectData | null;
  isOpen: boolean;
  onClose: () => void;
  // Optional: pass the source element for FLIP animation
  sourceElement?: HTMLElement | null;
}

// --- Double-Text Reveal Link Component (Exact match to design) ---
const HoverLink = ({
  href,
  children,
  external = false,
  variant = "default",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: "default" | "filled";
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [splitInstances, setSplitInstances] = useState<{
    top: SplitText | null;
    bottom: SplitText | null;
  }>({ top: null, bottom: null });

  useEffect(() => {
    if (linkRef.current && typeof window !== "undefined") {
      const topText = linkRef.current.querySelector(".link-text-top");
      const bottomText = linkRef.current.querySelector(".link-text-bottom");

      if (topText && bottomText) {
        setSplitInstances({
          top: new SplitText(topText, { type: "chars" }),
          bottom: new SplitText(bottomText, { type: "chars" }),
        });
      }
    }

    return () => {
      splitInstances.top?.revert();
      splitInstances.bottom?.revert();
    };
  }, []);

  const handleMouseEnter = () => {
    if (!splitInstances.top || !splitInstances.bottom) return;

    gsap.to(splitInstances.top.chars, {
      duration: 0.3,
      y: "-100%",
      stagger: 0.025,
      ease: "power3.inOut",
    });
    gsap.to(splitInstances.bottom.chars, {
      duration: 0.3,
      y: "-100%",
      stagger: 0.025,
      ease: "power3.inOut",
    });
  };

  const handleMouseLeave = () => {
    if (!splitInstances.top || !splitInstances.bottom) return;

    gsap.to(splitInstances.top.chars, {
      duration: 0.3,
      y: "0%",
      stagger: -0.025,
      ease: "power3.inOut",
    });
    gsap.to(splitInstances.bottom.chars, {
      duration: 0.3,
      y: "0%",
      stagger: -0.025,
      ease: "power3.inOut",
    });
  };

  const linkProps = external ? { target: "_blank", rel: "noreferrer" } : {};
  const isFilled = variant === "filled";

  return (
    <a
      ref={linkRef}
      href={href}
      {...linkProps}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group block w-fit border border-white cursor-pointer px-[3vw] md:px-[2vw] py-[1.5vw] md:py-[0.65vw] overflow-hidden ${
        isFilled ? "bg-[#242A23]" : "bg-transparent"
      }`}
    >
      <div className="relative h-[1em] overflow-hidden flex items-center justify-center">
        <span className="link-text-top text-white text-[4vw] md:text-[1.3vw] leading-[1] font-space uppercase tracking-wider block">
          {children}
        </span>
        <span className="link-text-bottom text-white text-[4vw] md:text-[1.3vw] leading-[1] font-space uppercase tracking-wider absolute top-full block">
          {children}
        </span>
      </div>
    </a>
  );
};

// --- Close Button with Character Animation ---
const CloseButton = ({ onClick }: { onClick: () => void }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [splitInstances, setSplitInstances] = useState<{
    top: SplitText | null;
    bottom: SplitText | null;
  }>({ top: null, bottom: null });

  useEffect(() => {
    if (btnRef.current && typeof window !== "undefined") {
      const topText = btnRef.current.querySelector(".close-text-top");
      const bottomText = btnRef.current.querySelector(".close-text-bottom");

      if (topText && bottomText) {
        setSplitInstances({
          top: new SplitText(topText, { type: "chars" }),
          bottom: new SplitText(bottomText, { type: "chars" }),
        });
      }
    }

    return () => {
      splitInstances.top?.revert();
      splitInstances.bottom?.revert();
    };
  }, []);

  const handleMouseEnter = () => {
    if (!splitInstances.top || !splitInstances.bottom) return;

    gsap.to(splitInstances.top.chars, {
      duration: 0.3,
      y: "-100%",
      stagger: 0.025,
      ease: "power3.inOut",
    });
    gsap.to(splitInstances.bottom.chars, {
      duration: 0.3,
      y: "-100%",
      stagger: 0.025,
      ease: "power3.inOut",
    });
  };

  const handleMouseLeave = () => {
    if (!splitInstances.top || !splitInstances.bottom) return;

    gsap.to(splitInstances.top.chars, {
      duration: 0.3,
      y: "0%",
      stagger: -0.025,
      ease: "power3.inOut",
    });
    gsap.to(splitInstances.bottom.chars, {
      duration: 0.3,
      y: "0%",
      stagger: -0.025,
      ease: "power3.inOut",
    });
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="closeBtn fixed top-[2vw] right-[2vw] z-[100] flex items-center gap-2 text-white border border-white/30 px-4 py-2 hover:border-white transition-colors"
    >
      <div className="relative h-[1em] overflow-hidden">
        <span className="close-text-top text-[3vw] md:text-[0.9vw] uppercase tracking-widest block">
          Close
        </span>
        <span className="close-text-bottom text-[3vw] md:text-[0.9vw] uppercase tracking-widest absolute top-full block">
          Close
        </span>
      </div>
      <X size={16} strokeWidth={1} />
    </button>
  );
};

// --- Media Display Component ---
const ProjectMedia = ({ media }: { media: MediaItem[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (media.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  return (
    <div
      ref={containerRef}
      className="projectflip relative w-full h-full overflow-hidden cursor-pointer group bg-[#1a1f18]"
      onClick={handleNext}
    >
      {media.length > 1 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full uppercase tracking-widest text-[0.8vw]">
          Next <ArrowUpRight size={14} />
        </div>
      )}

      <div className="project-img overflow-hidden h-full w-full relative">
        {media.map((item, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              idx === currentIndex
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-105 z-0"
            }`}
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={item.src}
                alt={item.alt || "Project media"}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {media.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {media.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                idx === currentIndex ? "bg-white scale-150" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// --- Main Project Detail Overlay Component ---
export default function ProjectDetailOverlay({
  project,
  isOpen,
  onClose,
  sourceElement,
}: ProjectDetailOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // SplitText refs
  const titleSplitRef = useRef<SplitText | null>(null);
  const yearSplitRef = useRef<SplitText | null>(null);
  const tagSplitRef = useRef<SplitText | null>(null);

  useEffect(() => {
    if (!isOpen || !project || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(".projectoverlay .colordivs", { y: "100%" });

      if (titleSplitRef.current) {
        gsap.set(titleSplitRef.current.chars, { y: "100%" });
      }
      if (yearSplitRef.current) {
        gsap.set(yearSplitRef.current.chars, { y: "100%" });
      }
      if (tagSplitRef.current) {
        gsap.set(tagSplitRef.current.words, { y: "100%" });
      }

      gsap.set(
        [
          ".closeBtn",
          ".livelink",
          ".description h2",
          ".techstackandhighlights h2",
          ".right-part-wrapper",
        ],
        { autoAlpha: 0 },
      );

      // Build timeline
      const tl = gsap.timeline({
        delay: 0.1,
      });

      // If we have a source element, perform FLIP animation
      if (sourceElement && imageContainerRef.current) {
        const state = Flip.getState(sourceElement);

        tl.add(() => {
          imageContainerRef.current?.appendChild(sourceElement);
          Flip.from(state, {
            duration: 1,
            ease: "power3.inOut",
            absolute: true,
            scale: true,
          });
        });
      }

      // Color bands wipe up
      tl.to(".projectoverlay .colordivs", {
        y: "0%",
        duration: 1,
        stagger: {
          each: 0.07,
          from: "edges",
        },
        ease: "power2.inOut",
      });

      // Reveal content
      tl.to(
        [
          ".closeBtn",
          ".livelink",
          ".description h2",
          ".techstackandhighlights h2",
          ".right-part-wrapper",
        ],
        {
          autoAlpha: 1,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "reveal",
      );

      // Text animations
      if (titleSplitRef.current) {
        tl.to(
          titleSplitRef.current.chars,
          {
            y: "0%",
            stagger: 0.05,
            duration: 1.4,
            ease: "expo.out",
          },
          "reveal",
        );
      }

      if (yearSplitRef.current) {
        tl.to(
          yearSplitRef.current.chars,
          {
            y: "0%",
            stagger: 0.05,
            duration: 1.4,
            ease: "expo.out",
          },
          "reveal+=0.1",
        );
      }

      if (tagSplitRef.current) {
        tl.to(
          tagSplitRef.current.words,
          {
            y: "0%",
            stagger: 0.08,
            duration: 1.5,
            ease: "power2.out",
          },
          "reveal+=0.2",
        );
      }

      timelineRef.current = tl;
    }, overlayRef);

    return () => ctx.revert();
  }, [isOpen, project, sourceElement]);

  // Handle close animation
  const handleClose = () => {
    if (!overlayRef.current) return;

    const tl = gsap.timeline({
      onComplete: onClose,
    });

    // Hide content first
    tl.to(
      [
        ".closeBtn",
        ".livelink",
        ".description h2",
        ".techstackandhighlights h2",
        ".right-part-wrapper",
      ],
      {
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "close",
    );

    // Hide text
    if (titleSplitRef.current) {
      tl.to(
        titleSplitRef.current.chars,
        {
          y: "100%",
          stagger: 0.05,
          duration: 1.4,
          ease: "expo.out",
        },
        "close",
      );
    }

    if (yearSplitRef.current) {
      tl.to(
        yearSplitRef.current.chars,
        {
          y: "100%",
          stagger: 0.05,
          duration: 1.4,
          ease: "expo.out",
        },
        "close",
      );
    }

    if (tagSplitRef.current) {
      tl.to(
        tagSplitRef.current.words,
        {
          y: "100%",
          stagger: 0.05,
          duration: 1.2,
          ease: "expo.out",
        },
        "close",
      );
    }

    // Color bands wipe away
    tl.to(".projectoverlay .colordivs", {
      y: "-100%",
      duration: 1,
      stagger: {
        each: 0.07,
        from: "edges",
      },
      ease: "power2.inOut",
    });

    // FLIP back if needed
    if (sourceElement) {
      tl.add(() => {
        // Return element to original parent would happen here
        // This requires storing the original parent reference
      });
    }
  };

  // Initialize SplitText when content mounts
  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Title split
      const titleEl = contentRef.current?.querySelector(".projecttitle");
      if (titleEl) {
        titleSplitRef.current = new SplitText(titleEl, {
          type: "chars",
          mask: "chars",
        });
        gsap.set(titleSplitRef.current.chars, { y: "100%" });
      }

      // Year split
      const yearEl = contentRef.current?.querySelector(".projectyear");
      if (yearEl) {
        yearSplitRef.current = new SplitText(yearEl, {
          type: "chars",
          mask: "chars",
        });
        gsap.set(yearSplitRef.current.chars, { y: "100%" });
      }

      // Tag split
      const tagEl = contentRef.current?.querySelector(".projectshorttag");
      if (tagEl) {
        tagSplitRef.current = new SplitText(tagEl, {
          type: "words",
          mask: "words",
        });
        gsap.set(tagSplitRef.current.words, { y: "100%" });
      }
    }, contentRef);

    return () => {
      titleSplitRef.current?.revert();
      yearSplitRef.current?.revert();
      tagSplitRef.current?.revert();
      ctx.revert();
    };
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  const heroTagline = project.hero?.heading?.join(" ") || "Project Overview";

  return (
    <div
      ref={overlayRef}
      className="projectoverlay fixed inset-0 z-[90] w-full h-screen overflow-hidden"
    >
      {/* 5 Vertical Color Bands Background */}
      <div className="absolute inset-0 z-0 flex w-full h-full pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="colordivs h-full w-[20%] bg-[#242A23]"
            style={{ transform: "translateY(100%)" }}
          />
        ))}
      </div>

      {/* Close Button */}
      <CloseButton onClick={handleClose} />

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full overflow-y-auto"
      >
        <div className="min-h-screen w-full px-[2vw] md:px-[1.5vw] lg:px-[1.2vw] py-[4vw] md:py-[2vw] flex flex-col md:flex-row items-start">
          {/* LEFT PART (Sticky on Desktop) */}
          <div className="left-part w-full md:w-[44%] md:sticky md:top-32 flex flex-col justify-between h-auto md:h-[calc(100vh-10vw)]">
            <div>
              {/* Title Section */}
              <div className="heading">
                <h3 className="projecttitle text-[14vw] md:text-[7.6vw] lg:text-[12vw] leading-[0.85] text-white uppercase tracking-tighter font-bold">
                  {project.title}
                </h3>

                <div className="subheading flex items-center gap-[3vw] md:gap-[2vw] mt-[2vw] md:mt-[1vw]">
                  <div className="year">
                    <h2 className="projectyear text-white text-[4vw] md:text-[2vw] leading-[1.1] font-light">
                      {project.metadata?.year || "2024"}
                    </h2>
                  </div>
                  <div className="shortdescription">
                    <h4 className="projectshorttag text-white text-[3vw] md:text-[1.3vw] leading-[1] font-light max-w-[35vw] md:max-w-[20vw]">
                      {heroTagline}
                    </h4>
                  </div>
                </div>

                {/* Live Link Button */}
                {project.metadata?.deploymentLink && (
                  <div className="livelink mt-[3vw] md:mt-[1vw]">
                    <HoverLink
                      href={project.metadata.deploymentLink}
                      external
                      variant="filled"
                    >
                      live link
                    </HoverLink>
                  </div>
                )}
              </div>
            </div>

            {/* Image Container */}
            <div className="w-full h-[40vh] md:h-[55%] mt-[8vw] md:mt-0">
              <div ref={imageContainerRef} className="w-full h-full">
                {project.media?.carousel && (
                  <ProjectMedia media={project.media.carousel} />
                )}
              </div>
            </div>
          </div>

          {/* RIGHT PART (Scrollable Content) */}
          <div className="right-part w-full md:w-[56%] mt-12 md:mt-0 flex flex-col items-start md:pl-[2vw]">
            <div className="right-part-wrapper w-full pb-32">
              {/* Description */}
              <div className="description">
                <h2 className="text-white text-[5.5vw] md:text-[2.5vw] uppercase font-light tracking-wide">
                  description
                </h2>
                <h4 className="text-[2.5vw] md:text-[1.2vw] mt-[2.5vw] md:mt-[1.3vw] text-white leading-[1.2] font-light whitespace-pre-line">
                  {project.description}
                  {project.background?.text && `\n\n${project.background.text}`}
                </h4>
              </div>

              {/* Tech Stack & Highlights */}
              <div className="techstackandhighlights mt-[8vw] md:mt-[4vw] w-full flex flex-col md:flex-row gap-[6vw] md:gap-0">
                <div className="techstack flex flex-col w-full md:w-[35%]">
                  <h2 className="text-white text-[4.5vw] md:text-[1.8vw] uppercase font-light tracking-wide mb-[3vw] md:mb-[1.5vw]">
                    tech Stack
                  </h2>
                  <div className="flex flex-col gap-[1vw] md:gap-[0.4vw]">
                    {(project.techStack?.stack || ["N/A"]).map((tech, i) => (
                      <h4
                        key={i}
                        className="text-white text-[2.5vw] md:text-[0.8vw] leading-[1.1] font-light"
                      >
                        {tech}
                      </h4>
                    ))}
                  </div>
                </div>

                <div className="highlights flex flex-col w-full md:w-[65%]">
                  <h2 className="text-white text-[4.5vw] md:text-[1.8vw] uppercase font-light tracking-wide mb-[3vw] md:mb-[1.5vw]">
                    highlights
                  </h2>
                  <div className="flex flex-col gap-[1.5vw] md:gap-[0.8vw]">
                    {(project.metadata?.services || ["Development"]).map(
                      (service, i) => (
                        <h4
                          key={i}
                          className="text-white text-[2.5vw] md:text-[1vw] leading-[1.2] font-light"
                        >
                          {service}
                        </h4>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* The Challenge */}
              {(project.challenge?.objective || project.challenge?.detail) && (
                <div className="mt-[8vw] md:mt-[4vw]">
                  <h2 className="text-white text-[4.5vw] md:text-[1.8vw] font-light uppercase tracking-wide mb-[1.5vw] opacity-60">
                    the challenge
                  </h2>
                  <h4 className="text-[2.5vw] md:text-[1.2vw] text-white leading-[1.2] font-light">
                    {project.challenge.objective}
                  </h4>
                  {project.challenge.detail && (
                    <p className="mt-4 text-[2vw] md:text-[0.9vw] text-white/70 font-light max-w-[80%]">
                      {project.challenge.detail}
                    </p>
                  )}
                </div>
              )}

              {/* Team */}
              {project.techStack?.team?.length > 0 && (
                <div className="mt-[8vw] md:mt-[4vw]">
                  <h2 className="text-white text-[4.5vw] md:text-[1.8vw] font-light uppercase tracking-wide mb-[1.5vw]">
                    team
                  </h2>
                  <div className="flex flex-col gap-[0.5vw]">
                    {project.techStack.team.map((member, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-baseline border-b border-white/20 pb-[0.5vw]"
                      >
                        <span className="text-white text-[2.5vw] md:text-[1vw] font-light">
                          {member.name}
                        </span>
                        <span className="text-white/60 text-[2vw] md:text-[0.8vw] uppercase tracking-widest">
                          {member.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats & Services */}
              {project.stats?.services?.length > 0 && (
                <div className="mt-[8vw] md:mt-[4vw]">
                  <div className="flex justify-between items-end mb-[2.5vw] md:mb-[1.5vw]">
                    <h2 className="text-white text-[4.5vw] md:text-[1.8vw] font-light uppercase tracking-wide">
                      {project.stats.heading}
                    </h2>
                    {project.stats.snapshotDate && (
                      <span className="text-white/40 text-[2vw] md:text-[0.7vw] uppercase tracking-widest text-right">
                        snapshot:
                        <br />
                        {project.stats.snapshotDate}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-[1vw]">
                    {project.stats.services.map((svc, i) => (
                      <div
                        key={i}
                        className="flex flex-col gap-[0.5vw] p-[3vw] md:p-[1.5vw] bg-white/[0.03] border border-white/5"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="text-white text-[2.5vw] md:text-[1vw] font-light">
                            {svc.name}
                          </h4>
                          <div className="flex items-center gap-[0.5vw]">
                            <span
                              className={`w-[0.8vw] h-[0.8vw] md:w-2 md:h-2 rounded-full ${
                                svc.status === "active"
                                  ? "bg-emerald-400 animate-pulse"
                                  : "bg-amber-400"
                              }`}
                            />
                            <span className="text-white/50 text-[2vw] md:text-[0.7vw] uppercase tracking-widest">
                              {svc.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-white/50 text-[2vw] md:text-[0.85vw] font-light leading-[1.3]">
                          {svc.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonial */}
              {project.testimonial && (
                <div className="mt-[8vw] md:mt-[4vw] p-[3vw] md:p-[2vw] border-l-2 border-white/20">
                  <p className="text-[3vw] md:text-[1.2vw] text-white/90 font-light leading-[1.4] italic">
                    "{project.testimonial.quote}"
                  </p>
                  <div className="mt-4">
                    <span className="text-white text-[2.5vw] md:text-[0.9vw] font-medium">
                      {project.testimonial.author.name}
                    </span>
                    <span className="text-white/50 text-[2vw] md:text-[0.8vw] uppercase tracking-widest ml-2">
                      {project.testimonial.author.role}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
