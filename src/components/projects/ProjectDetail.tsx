import {
  useRef,
  useLayoutEffect,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/all";
import type { ProjectDetailData } from "@/lib/project-content";
import DOMPurify from "isomorphic-dompurify";

// Register GSAP plugins
gsap.registerPlugin(SplitText, Flip);

interface ProjectDetailProps {
  project: ProjectDetailData;
  onReturn?: () => void;
}

export const ProjectDetail = ({ project, onReturn }: ProjectDetailProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Video-specific state to track when videos end
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const autoplayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressKey = useRef(0); // Used to force progress bar restart

  // Refs for GSAP targeting
  const titleRef = useRef<HTMLHeadingElement>(null);
  const yearRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLDivElement>(null);
  const liveLinkRef = useRef<HTMLDivElement>(null);
  const githubLinkRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  // Store SplitText instances for cleanup
  const splitTextInstances = useRef<SplitText[]>([]);

  // Memoized split configurations
  const animate = useMemo(() => {
    return {
      chars: { type: "chars", charsClass: "char-anim" },
      words: { type: "words", wordsClass: "word-anim" },
      lines: { type: "lines", linesClass: "line-anim" },
      charsWords: { type: "chars,words", charsClass: "char-anim" },
    };
  }, []);

  // Determine carousel timing based on media type
  const getSlideDuration = useCallback(
    (index: number) => {
      const item = project.media[index];
      if (item.type === "video") {
        // For videos, try to get duration from video element, fallback to 8s
        const video = videoRefs.current[index];
        if (video && video.duration) {
          return Math.max(video.duration * 1000, 4000); // At least 4 seconds
        }
        return 8000; // Default 8s for videos if duration unknown
      }
      return 4000; // 4 seconds for images
    },
    [project.media],
  );

  // Intelligent Auto-play that respects video playback and pause state
  useEffect(() => {
    if (!project.media || project.media.length <= 1 || isPaused) {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
      return;
    }

    const startAutoplay = () => {
      const duration = getSlideDuration(currentSlide);

      autoplayTimeoutRef.current = setTimeout(() => {
        if (!isTransitioning && !isPaused) {
          setIsTransitioning(true);
          setCurrentSlide((prev) => (prev + 1) % project.media.length);
          progressKey.current += 1; // Reset progress bar
          // Reset transition lock after animation completes
          setTimeout(() => setIsTransitioning(false), 1000);
        }
      }, duration);
    };

    // Clear existing timeout
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }

    // If current slide is video, wait for it to be ready
    const currentItem = project.media[currentSlide];
    if (currentItem.type === "video") {
      const video = videoRefs.current[currentSlide];
      if (video) {
        if (video.readyState >= 2) {
          startAutoplay();
        } else {
          video.onloadedmetadata = startAutoplay;
        }
      } else {
        startAutoplay();
      }
    } else {
      startAutoplay();
    }

    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [
    currentSlide,
    project.media,
    getSlideDuration,
    isTransitioning,
    isPaused,
  ]);

  // Handle video ended event for seamless looping
  const handleVideoEnded = useCallback(() => {
    if (!isTransitioning && !isPaused && project.media.length > 1) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % project.media.length);
      progressKey.current += 1;
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  }, [project.media.length, isTransitioning, isPaused]);

  // Toggle pause/play
  const togglePause = useCallback(() => {
    setIsPaused((prev) => {
      const newState = !prev;
      // Pause/play current video if exists
      const currentVideo = videoRefs.current[currentSlide];
      if (currentVideo) {
        if (newState) {
          currentVideo.pause();
        } else {
          currentVideo.play();
        }
      }
      return newState;
    });
    progressKey.current += 1; // Reset progress bar animation
  }, [currentSlide]);

  // Toggle mute for videos
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newState = !prev;
      videoRefs.current.forEach((video) => {
        if (video) {
          video.muted = newState;
        }
      });
      return newState;
    });
  }, []);

  // Manual slide change with transition lock
  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlide) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      progressKey.current += 1; // Reset progress bar
      setTimeout(() => setIsTransitioning(false), 1000);
    },
    [currentSlide, isTransitioning],
  );

  // Go to previous slide
  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    const newIndex =
      currentSlide === 0 ? project.media.length - 1 : currentSlide - 1;
    setIsTransitioning(true);
    setCurrentSlide(newIndex);
    progressKey.current += 1;
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [currentSlide, isTransitioning, project.media.length]);

  // Go to next slide
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    const newIndex = (currentSlide + 1) % project.media.length;
    setIsTransitioning(true);
    setCurrentSlide(newIndex);
    progressKey.current += 1;
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [currentSlide, isTransitioning, project.media.length]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Clear previous SplitText instances
      splitTextInstances.current.forEach((st) => st.revert());
      splitTextInstances.current = [];
      let titleAnimTargets;

      // If we have an SVG, we animate the wrapper. If text, we split it.
      if (project.svgTitle) {
        titleAnimTargets = titleRef.current;
        gsap.set(titleAnimTargets, { yPercent: 100, opacity: 0 });
      } else {
        const titleSplit = new SplitText(titleRef.current, animate.chars);
        if (titleSplit.chars) splitTextInstances.current.push(titleSplit);
        titleAnimTargets = titleSplit.chars;
        gsap.set(titleAnimTargets, { yPercent: 100, opacity: 0 });
      }
      // Create SplitText instances
      const titleSplit = new SplitText(titleRef.current, animate.chars);
      const yearSplit = new SplitText(yearRef.current, animate.chars);
      const taglineSplit = new SplitText(taglineRef.current, animate.words);

      if (titleSplit.chars) splitTextInstances.current.push(titleSplit);
      if (yearSplit.chars) splitTextInstances.current.push(yearSplit);
      if (taglineSplit.words) splitTextInstances.current.push(taglineSplit);

      // Main entrance timeline
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.1,
      });

      // Set initial states
      gsap.set([titleSplit.chars, yearSplit.chars, taglineSplit.words], {
        yPercent: 100,
        opacity: 0,
      });

      gsap.set(imageContainerRef.current, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      gsap.set(imageInnerRef.current, {
        scale: 1.4,
      });

      gsap.set(
        [
          techStackRef.current,
          highlightsRef.current,
          descriptionRef.current,
          closeBtnRef.current,
          liveLinkRef.current,
          githubLinkRef.current,
        ],
        {
          y: 40,
          opacity: 0,
        },
      );

      // Awwwards-style sequence
      tl.to(titleAnimTargets, {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        // Only stagger if it's text characters
        stagger: project.svgTitle ? 0 : { each: 0.03, from: "start" },
        ease: "expo.out",
      });

      // Awwwards-style sequence
      tl.to(titleSplit.chars, {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        stagger: { each: 0.03, from: "start" },
        ease: "expo.out",
      })
        .to(
          yearSplit.chars,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "expo.out",
          },
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
          closeBtnRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .to(
          imageContainerRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.4,
            ease: "expo.inOut",
          },
          "-=0.8",
        )
        .to(
          imageInnerRef.current,
          {
            scale: 1,
            duration: 1.6,
            ease: "expo.out",
          },
          "-=1.4",
        )
        .to(
          liveLinkRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=1",
        )
        .to(
          githubLinkRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .to(
          descriptionRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .to(
          [techStackRef.current, highlightsRef.current],
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .add(() => {
          gsap.set(
            [closeBtnRef.current, liveLinkRef.current, githubLinkRef.current],
            {
              pointerEvents: "auto",
            },
          );
        }, "-=0.3");

      // Scroll-triggered parallax on image container (only if not mobile)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(imageInnerRef.current, {
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

  // Magnetic button effect with character scramble
  const handleButtonHover = (
    e: React.MouseEvent<HTMLElement>,
    isEnter: boolean,
  ) => {
    const target = e.currentTarget;
    const textSpan = target.querySelector(".btn-text");
    if (!textSpan) return;

    const originalText = textSpan.getAttribute("data-text") || "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (isEnter) {
      let iteration = 0;
      const interval = setInterval(() => {
        textSpan.textContent = originalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iteration >= originalText.length) {
          clearInterval(interval);
          textSpan.textContent = originalText;
        }
        iteration += 1 / 2;
      }, 30);

      gsap.to(target, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(target, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleReturn = () => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onReturn,
      });

      tl.to([titleRef.current, yearRef.current, taglineRef.current], {
        yPercent: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.in",
      })
        .to(
          imageContainerRef.current,
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            duration: 0.8,
            ease: "expo.inOut",
          },
          "-=0.4",
        )
        .to(
          [
            descriptionRef.current,
            techStackRef.current,
            highlightsRef.current,
            closeBtnRef.current,
            liveLinkRef.current,
            githubLinkRef.current,
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

  // Calculate consistent aspect ratio for container
  const containerAspectRatio = useMemo(() => {
    // Use 16/9 as default, or get from first media item
    return project.media[0]?.aspectRatio || "4/3";
  }, [project.media]);

  // Check if current slide is a video
  const isCurrentVideo = project.media[currentSlide]?.type === "video";

  return (
    <div
      ref={containerRef}
      className="infoverview flex md:flex-row flex-col px-[2vw] md:px-[1.5vw] py-[4vw] md:py-[2vw] h-screen w-full relative z-[2] bg-[#9f9a95] dark:bg-[#1d1d1d] text-white overflow-hidden"
    >
      {/* Left Part */}
      <div className="left-part h-[48%] md:h-full w-full md:w-[44%] flex flex-col">
        {/* Return Button */}
        <div
          ref={closeBtnRef}
          onClick={handleReturn}
          onMouseEnter={(e) => handleButtonHover(e, true)}
          onMouseLeave={(e) => handleButtonHover(e, false)}
          className="buttondiv w-fit closeBtn border border-white/50 cursor-pointer px-[3vw] md:px-[2vw] py-[1.5vw] md:py-[0.65vw] hover:bg-white hover:text-black transition-colors duration-300 relative z-10"
        >
          <div className="links cursor-pointer h-[1rem] md:h-[1.3rem] overflow-hidden">
            <h2
              className="btn-text text-[4vw] md:text-[1.3vw] leading-[1.25] uppercase font-about-complement"
              data-text="RETURN TO HOME"
            >
              RETURN TO HOME
            </h2>
          </div>
        </div>

        {/* Headings */}
        <div className="heading mt-[2.5vw] md:mt-[1.5vw]">
          <div className="overflow-hidden projecttitle">
            <div ref={titleRef}>
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
              <h2
                ref={yearRef}
                className="projectyear text-white text-[4vw] leading-[1.1] md:text-[2vw] font-about-complement"
                // style={{
                //   fontFamily: "'Oswald', 'Anton', 'Impact', sans-serif",
                // }}
              >
                {project.year}
              </h2>
            </div>
            <div className="shortdescription">
              <h4
                ref={taglineRef}
                className="projectshorttag text-white text-[3vw] leading-[1] md:text-[1.3vw] font-about-proj"
              >
                {project.tagline}
              </h4>
            </div>
          </div>

          {/* Live Link & GitHub Buttons */}
          <div className="flex flex-wrap gap-[2vw] md:gap-[1vw] mt-[3vw] md:mt-[1vw]">
            <div ref={liveLinkRef}>
              <a
                target="_blank"
                href={project.link}
                rel="noopener noreferrer"
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
                className="inline-block"
              >
                <div className="buttondiv w-fit border border-white/50 cursor-pointer px-[3vw] md:px-[2vw] py-[1.5vw] md:py-[0.65vw] bg-[#242A23] hover:bg-white hover:text-black transition-colors duration-300">
                  <div className="links cursor-pointer h-[1rem] overflow-hidden">
                    <h2
                      className="btn-text text-[4vw] md:text-[1.3vw] leading-[1.2] uppercase font-about-complement"
                      data-text="LIVE LINK"
                    >
                      LIVE LINK
                    </h2>
                  </div>
                </div>
              </a>
            </div>

            {project.githubLink && (
              <div ref={githubLinkRef}>
                <a
                  target="_blank"
                  href={project.githubLink}
                  rel="noopener noreferrer"
                  onMouseEnter={(e) => handleButtonHover(e, true)}
                  onMouseLeave={(e) => handleButtonHover(e, false)}
                  className="inline-block"
                >
                  <div className="buttondiv w-fit border border-white/50 cursor-pointer px-[3vw] md:px-[2vw] py-[1.5vw] md:py-[0.65vw] bg-[#242A23] hover:bg-white hover:text-black transition-colors duration-300">
                    <div className="links cursor-pointer h-[1rem] overflow-hidden">
                      <h2
                        className="btn-text text-[4vw] md:text-[1.3vw] leading-[1.2] uppercase font-about-complement"
                        data-text="GITHUB REPO"
                      >
                        GITHUB REPO
                      </h2>
                    </div>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Project Media Carousel - Fixed Aspect Ratio Container */}
        <div
          ref={imageContainerRef}
          className="projectflip mt-[2.7vw] md:mt-[1.5vw] w-full flex-grow relative overflow-hidden group"
          style={{ aspectRatio: containerAspectRatio }}
        >
          <div
            ref={imageInnerRef}
            className="project-img overflow-hidden h-full w-full absolute inset-0"
          >
            {project.media.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  index === currentSlide
                    ? "opacity-100 z-10 scale-100"
                    : "opacity-0 z-0 scale-105"
                }`}
              >
                {item.type === "video" ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={item.url}
                    autoPlay={!isPaused}
                    muted={isMuted}
                    loop={project.media.length === 1} // Only loop if single video
                    playsInline
                    onEnded={handleVideoEnded}
                    className="h-full w-full object-contain bg-transparent"
                    style={{
                      aspectRatio: item.aspectRatio || containerAspectRatio,
                    }}
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.alt || `${project.title} slide ${index + 1}`}
                    className="h-full w-full object-contain bg-transparent"
                    style={{
                      aspectRatio: "auto",
                    }}
                  />
                )}
              </div>
            ))}

            {/* Carousel Controls Overlay */}
            {project.media.length > 1 && (
              <>
                {/* Navigation Arrows */}
                <button
                  onClick={goToPrev}
                  disabled={isTransitioning}
                  className="absolute left-[2vw] top-1/2 -translate-y-1/2 z-30 w-[8vw] md:w-[3vw] h-[8vw] md:h-[3vw] min-w-[40px] min-h-[40px] flex items-center justify-center bg-black/40 hover:bg-black/70 backdrop-blur-sm rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Previous slide"
                >
                  <svg
                    className="w-[40%] h-[40%] text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={goToNext}
                  disabled={isTransitioning}
                  className="absolute right-[2vw] top-1/2 -translate-y-1/2 z-30 w-[8vw] md:w-[3vw] h-[8vw] md:h-[3vw] min-w-[40px] min-h-[40px] flex items-center justify-center bg-black/40 hover:bg-black/70 backdrop-blur-sm rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Next slide"
                >
                  <svg
                    className="w-[40%] h-[40%] text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Play/Pause Button */}
                <button
                  onClick={togglePause}
                  className="absolute top-[2vw] right-[2vw] z-30 w-[6vw] md:w-[2.5vw] h-[6vw] md:h-[2.5vw] min-w-[32px] min-h-[32px] flex items-center justify-center bg-black/40 hover:bg-black/70 backdrop-blur-sm rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                  aria-label={isPaused ? "Play" : "Pause"}
                >
                  {isPaused ? (
                    <svg
                      className="w-[40%] h-[40%] text-white ml-[5%]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-[40%] h-[40%] text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  )}
                </button>

                {/* Mute/Unmute Button (only show for videos) */}
                {isCurrentVideo && (
                  <button
                    onClick={toggleMute}
                    className="absolute top-[2vw] right-[calc(2vw+8vw)] md:right-[calc(2vw+3vw)] z-30 w-[6vw] md:w-[2.5vw] h-[6vw] md:h-[2.5vw] min-w-[32px] min-h-[32px] flex items-center justify-center bg-black/40 hover:bg-black/70 backdrop-blur-sm rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <svg
                        className="w-[40%] h-[40%] text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-[40%] h-[40%] text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                        />
                      </svg>
                    )}
                  </button>
                )}

                {/* Slide Counter */}
                <div className="absolute top-[2vw] left-[2vw] z-30 px-[2vw] md:px-[1vw] py-[1vw] md:py-[0.5vw] bg-black/40 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[2.5vw] md:text-[0.9vw] font-medium text-white">
                    {currentSlide + 1} / {project.media.length}
                  </span>
                </div>
              </>
            )}

            {/* Carousel Indicators */}
            {project.media.length > 1 && (
              <div className="absolute bottom-[1.5vw] left-1/2 -translate-x-1/2 flex gap-[0.8vw] z-20">
                {project.media.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToSlide(idx);
                    }}
                    disabled={isTransitioning}
                    className={`w-[0.5vw] h-[0.5vw] min-w-[6px] min-h-[6px] rounded-full transition-all duration-500 ease-out cursor-pointer disabled:cursor-not-allowed ${
                      idx === currentSlide
                        ? "bg-white scale-[1.4]"
                        : "bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Progress Bar for Auto-play */}
            {project.media.length > 1 && !isPaused && (
              <div className="absolute bottom-0 left-0 h-[2px] bg-white/20 w-full z-20">
                <div
                  key={progressKey.current} // Force restart animation
                  className="h-full bg-white"
                  style={{
                    width: "100%",
                    animation: `progress ${getSlideDuration(currentSlide)}ms linear`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Part */}
      <div className="right-part h-[52%] md:h-full flex items-end w-full md:w-[56%]">
        <div
          ref={contentWrapperRef}
          className="right-part-wrapper px-[2vw] w-full"
        >
          {/* Description */}
          <div ref={descriptionRef} className="description">
            <h2
              className="text-white text-[5.5vw] md:text-[2.5vw] uppercase font-about-complement"
              // style={{
              //   fontFamily: "'Playfair Display', 'Times New Roman', serif",
              // }}
            >
              DESCRIPTION
            </h2>
            <h4 className="text-[2.5vw] md:text-[1.2vw] mt-[1.3vw] text-white leading-[1.2] font-about-proj whitespace-pre-line">
              {project.description}
            </h4>
          </div>

          {/* Tech Stack & Highlights */}
          <div className="techstackandhighlights mt-[4vw] md:mt-[2vw] h-[25vh] md:h-[20vh] w-full flex md:flex-row flex-col">
            <div
              ref={techStackRef}
              className="techstack flex flex-row md:flex-col justify-between h-[50%] md:h-full w-full md:w-[35%]"
            >
              <h2
                className="text-white text-[4.5vw] md:text-[1.8vw] uppercase font-about-complement"
                // style={{
                //   fontFamily: "'Playfair Display', 'Times New Roman', serif",
                // }}
              >
                TECH STACK
              </h2>
              <div className="tech flex mt-[1.5vw] flex-col gap-[0.2vw]">
                {project.techStack.map((tech, index) => (
                  <h4
                    key={index}
                    className="text-white text-[2.5vw] md:text-[0.8vw] leading-[1.1] font-about-proj"
                  >
                    {tech}
                  </h4>
                ))}
              </div>
            </div>

            <div
              ref={highlightsRef}
              className="highlights flex flex-row md:flex-col justify-between h-[50%] md:h-full w-full md:w-[65%]"
            >
              <h2
                className="text-white text-[4.5vw] md:text-[1.8vw] uppercase font-about-complement"
                // style={{
                //   fontFamily: "'Playfair Display', 'Times New Roman', serif",
                // }}
              >
                HIGHLIGHTS
              </h2>
              <div className="tech flex mt-[1.5vw] flex-col gap-[1vw] md:gap-[0.4vw]">
                {project.highlights.map((highlight, index) => (
                  <h4
                    key={index}
                    className="text-white text-[2.5vw] md:text-[1vw] leading-[1.1] font-about-proj"
                  >
                    {highlight}
                  </h4>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetail;
