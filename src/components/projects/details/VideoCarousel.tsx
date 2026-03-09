import { useState, useEffect, useCallback, useRef } from "react";
import type { ProjectDetailData } from "@/lib/project-content";

interface ProjectMediaCarouselProps {
  project: ProjectDetailData;
  containerAspectRatio: string;
}

export const ProjectMediaCarousel = ({
  project,
  containerAspectRatio,
}: ProjectMediaCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const autoplayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressKey = useRef(0);

  const getSlideDuration = useCallback(
    (index: number) => {
      const item = project.media[index];
      if (item.type === "video") {
        const video = videoRefs.current[index];
        if (video && video.duration) {
          return Math.max(video.duration * 1000, 4000);
        }
        return 8000;
      }
      return 4000;
    },
    [project.media],
  );

  useEffect(() => {
    if (!project.media || project.media.length <= 1 || isPaused) {
      if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);
      return;
    }

    const startAutoplay = () => {
      const duration = getSlideDuration(currentSlide);
      autoplayTimeoutRef.current = setTimeout(() => {
        if (!isTransitioning && !isPaused) {
          setDirection("next");
          setIsTransitioning(true);
          setCurrentSlide((prev) => (prev + 1) % project.media.length);
          progressKey.current += 1;
          setTimeout(() => setIsTransitioning(false), 800);
        }
      }, duration);
    };

    if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);

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
      if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);
    };
  }, [
    currentSlide,
    project.media,
    getSlideDuration,
    isTransitioning,
    isPaused,
  ]);

  const handleVideoEnded = useCallback(() => {
    if (!isTransitioning && !isPaused && project.media.length > 1) {
      setDirection("next");
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % project.media.length);
      progressKey.current += 1;
      setTimeout(() => setIsTransitioning(false), 800);
    }
  }, [project.media.length, isTransitioning, isPaused]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => {
      const newState = !prev;
      const currentVideo = videoRefs.current[currentSlide];
      if (currentVideo) {
        if (newState) currentVideo.pause();
        else currentVideo.play();
      }
      return newState;
    });
    progressKey.current += 1;
  }, [currentSlide]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newState = !prev;
      videoRefs.current.forEach((video) => {
        if (video) video.muted = newState;
      });
      return newState;
    });
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlide) return;
      setDirection(index > currentSlide ? "next" : "prev");
      setIsTransitioning(true);
      setCurrentSlide(index);
      progressKey.current += 1;
      setTimeout(() => setIsTransitioning(false), 800);
    },
    [currentSlide, isTransitioning],
  );

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    const newIndex =
      currentSlide === 0 ? project.media.length - 1 : currentSlide - 1;
    setDirection("prev");
    setIsTransitioning(true);
    setCurrentSlide(newIndex);
    progressKey.current += 1;
    setTimeout(() => setIsTransitioning(false), 800);
  }, [currentSlide, isTransitioning, project.media.length]);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    const newIndex = (currentSlide + 1) % project.media.length;
    setDirection("next");
    setIsTransitioning(true);
    setCurrentSlide(newIndex);
    progressKey.current += 1;
    setTimeout(() => setIsTransitioning(false), 800);
  }, [currentSlide, isTransitioning, project.media.length]);

  const isCurrentVideo = project.media[currentSlide]?.type === "video";
  const currentIndexFormatted = String(currentSlide + 1).padStart(2, "0");
  const totalIndexFormatted = String(project.media.length).padStart(2, "0");

  return (
    <>
      <div
        className="relative w-full mt-5 overflow-hidden bg-transparent group/carousel hover:inset-0 hover:bg-linear-to-t hover:from-black/60 hover:via-transparent hover:to-black/20"
        style={{ aspectRatio: containerAspectRatio }}
      >
        {/* Main Media Layer */}
        <div className="absolute inset-0">
          {project.media.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                index === currentSlide
                  ? "opacity-100 translate-x-0 scale-100 z-10"
                  : index < currentSlide
                    ? "opacity-0 -translate-x-full scale-105 z-0"
                    : "opacity-0 translate-x-full scale-105 z-0"
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
                  loop={project.media.length === 1}
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
                  style={{ aspectRatio: "auto" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Vignette Overlay */}
        <div className="hover:absolute hover:inset-0 hover:bg-linear-to-t hover:from-black/60 hover:via-transparent hover:to-black/20 pointer-events-none z-20 bg-transparent" />

        {/* Navigation Controls - Floating Glass Panel */}
        {project.media.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 opacity-0 translate-y-4 group-hover/carousel:opacity-100 group-hover/carousel:translate-y-0 transition-all duration-500 ease-out shadow-2xl">
            {/* Previous Button */}
            <button
              onClick={goToPrev}
              disabled={isTransitioning}
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed group/btn"
              aria-label="Previous slide"
            >
              <svg
                className="w-5 h-5 text-white transform transition-transform duration-300 group-hover/btn:-translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Play/Pause Toggle */}
            <button
              onClick={togglePause}
              className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white text-black hover:scale-110 transition-all duration-300 shadow-lg"
              aria-label={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? (
                <svg
                  className="w-5 h-5 ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              )}
            </button>

            {/* Next Button */}
            <button
              onClick={goToNext}
              disabled={isTransitioning}
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed group/btn"
              aria-label="Next slide"
            >
              <svg
                className="w-5 h-5 text-white transform transition-transform duration-300 group-hover/btn:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-white/30" />

            {/* Mute Toggle (Only for videos) */}
            {isCurrentVideo && (
              <>
                <button
                  onClick={toggleMute}
                  className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors duration-300 group/btn"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                    </svg>
                  )}
                </button>
                <div className="w-px h-6 bg-white/30" />
              </>
            )}

            {/* Typography-driven Counter */}
            <div className="flex items-baseline gap-1 font-light tracking-tight">
              <span className="text-lg text-white font-medium tabular-nums">
                {currentIndexFormatted}
              </span>
              <span className="text-sm text-white/50 font-light">/</span>
              <span className="text-sm text-white/50 tabular-nums">
                {totalIndexFormatted}
              </span>
            </div>
          </div>
        )}

        {/* Slide Indicators - Minimalist Dots */}
        {project.media.length > 1 && (
          <div className="absolute bottom-8 right-8 z-30 flex flex-col gap-3">
            {project.media.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                disabled={isTransitioning}
                className={`group relative w-2 h-2 rounded-full transition-all duration-500 ease-out ${
                  idx === currentSlide
                    ? "bg-white scale-125"
                    : "bg-white/30 hover:bg-white/60 scale-100"
                } disabled:cursor-not-allowed`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                {/* Active Indicator Ring */}
                {idx === currentSlide && (
                  <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
                )}

                {/* Hover Tooltip */}
                <span className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Cinematic Progress Bar */}
        {!isPaused && project.media.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-40 overflow-hidden">
            <div
              key={progressKey.current}
              className="h-full bg-white origin-left"
              style={{
                animation: `progressCinematic ${getSlideDuration(currentSlide)}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
              }}
            />
          </div>
        )}

        {/* Keyboard Navigation Hint (Visible on Focus) */}
        <div className="absolute top-4 right-4 z-30 opacity-0 focus-within:opacity-100 transition-opacity duration-300">
          <span className="text-xs text-white/50 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
            Use ← → keys
          </span>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes progressCinematic {
          from { 
            transform: scaleX(0);
          }
          to { 
            transform: scaleX(1);
          }
        }
        
        /* Smooth slide transitions */
        .slide-enter {
          animation: slideIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(var(--slide-direction, 20px)) scale(1.05);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default ProjectMediaCarousel;
