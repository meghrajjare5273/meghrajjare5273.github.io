import { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
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
        if (video && video.duration)
          return Math.max(video.duration * 1000, 4000);
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
        if (video.readyState >= 2) startAutoplay();
        else video.onloadedmetadata = startAutoplay;
      } else startAutoplay();
    } else startAutoplay();
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
        className="relative w-full mt-5 overflow-hidden bg-transparent group/carousel"
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

        {/* Subtle Vignette */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-500" />

        {/* ─────────────────────────────────────────────────────────
            AWWWARDS CONTROL STRIP
            A single compact pill: ← | segments + counter | ▶ | 🔊 | →
        ───────────────────────────────────────────────────────── */}
        {project.media.length > 1 && (
          <div
            className="
              absolute bottom-5 left-1/2 -translate-x-1/2 z-30
              flex items-center
              bg-black/40 backdrop-blur-xl
              rounded-full
              border border-white/[0.08]
              overflow-hidden
              opacity-0 translate-y-2
              group-hover/carousel:opacity-100 group-hover/carousel:translate-y-0
              transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
              shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]
            "
          >
            {/* ← Prev */}
            <button
              onClick={goToPrev}
              disabled={isTransitioning}
              aria-label="Previous slide"
              className="
                flex items-center justify-center px-3 py-2.5
                text-white/40 hover:text-white
                hover:bg-white/[0.06]
                transition-all duration-200
                disabled:opacity-20 disabled:cursor-not-allowed
                group/btn
              "
            >
              <ChevronLeft
                size={13}
                strokeWidth={1.8}
                className="transition-transform duration-200 group-hover/btn:-translate-x-px"
              />
            </button>

            {/* Hairline divider */}
            <div className="w-px h-3.5 bg-white/10 shrink-0" />

            {/* Segmented Progress Tracks */}
            <div className="flex items-center gap-1 px-3 py-2.5">
              {project.media.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  disabled={isTransitioning}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed"
                  style={{
                    width: idx === currentSlide ? "28px" : "10px",
                    background:
                      idx < currentSlide
                        ? "rgba(255,255,255,0.45)"
                        : "rgba(255,255,255,0.15)",
                  }}
                >
                  {/* Animated fill for the active segment */}
                  {idx === currentSlide && !isPaused && (
                    <div
                      key={progressKey.current}
                      className="absolute inset-0 origin-left rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.9)",
                        animation: `progressCinematic ${getSlideDuration(currentSlide)}ms cubic-bezier(0.25,0.46,0.45,0.94) forwards`,
                      }}
                    />
                  )}
                  {/* Static white fill when paused on current */}
                  {idx === currentSlide && isPaused && (
                    <div className="absolute inset-0 rounded-full bg-white/60" />
                  )}
                </button>
              ))}
            </div>

            {/* Monospace Counter */}
            <div className="flex items-baseline gap-0.5 pr-3 font-sans">
              <span className="text-[10px] text-white/60 tabular-nums leading-none">
                {currentIndexFormatted}
              </span>
              <span className="text-[9px] text-white/20 leading-none">/</span>
              <span className="text-[10px] text-white/25 tabular-nums leading-none">
                {totalIndexFormatted}
              </span>
            </div>

            {/* Hairline divider */}
            <div className="w-px h-3.5 bg-white/10 shrink-0" />

            {/* ▶ / ⏸ Play · Pause */}
            <button
              onClick={togglePause}
              aria-label={isPaused ? "Play" : "Pause"}
              className="
                flex items-center justify-center px-3 py-2.5
                text-white/50 hover:text-white
                hover:bg-white/[0.06]
                transition-all duration-200
              "
            >
              {isPaused ? (
                <Play size={11} strokeWidth={0} className="fill-current" />
              ) : (
                <Pause size={11} strokeWidth={0} className="fill-current" />
              )}
            </button>

            {/* 🔊 Mute toggle — only for videos */}
            {isCurrentVideo && (
              <>
                <div className="w-px h-3.5 bg-white/10 shrink-0" />
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="
                    flex items-center justify-center px-3 py-2.5
                    text-white/50 hover:text-white
                    hover:bg-white/[0.06]
                    transition-all duration-200
                  "
                >
                  {isMuted ? (
                    <VolumeX size={13} strokeWidth={1.6} />
                  ) : (
                    <Volume2 size={13} strokeWidth={1.6} />
                  )}
                </button>
              </>
            )}

            {/* Hairline divider */}
            <div className="w-px h-3.5 bg-white/10 shrink-0" />

            {/* → Next */}
            <button
              onClick={goToNext}
              disabled={isTransitioning}
              aria-label="Next slide"
              className="
                flex items-center justify-center px-3 py-2.5
                text-white/40 hover:text-white
                hover:bg-white/[0.06]
                transition-all duration-200
                disabled:opacity-20 disabled:cursor-not-allowed
                group/btn
              "
            >
              <ChevronRight
                size={13}
                strokeWidth={1.8}
                className="transition-transform duration-200 group-hover/btn:translate-x-px"
              />
            </button>
          </div>
        )}

        {/* Keyboard hint */}
        <div className="absolute top-4 right-4 z-30 opacity-0 focus-within:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] text-white/40 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm font-mono tracking-widest">
            ← →
          </span>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes progressCinematic {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </>
  );
};

export default ProjectMediaCarousel;
