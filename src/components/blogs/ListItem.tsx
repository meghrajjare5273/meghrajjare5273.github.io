import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import type { BlogPost } from "@/lib/blog-content";

interface BlogListItemProps {
  post: BlogPost;
  index: number;
}

export default function BlogListItem({ post, index }: BlogListItemProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const dateWrapperRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    const dateWrapper = dateWrapperRef.current;
    const textWrapper = textWrapperRef.current;

    if (!link || !dateWrapper || !textWrapper) return;

    // Initial state - ensure transforms are set
    gsap.set([dateWrapper, textWrapper], { y: 0 });

    const handleEnter = () => {
      // Kill any running tweens to prevent conflicts
      gsap.killTweensOf([dateWrapper, textWrapper]);

      // Animate both wrappers up by 100% of their height (which contains 3 identical spans)
      gsap.to([dateWrapper, textWrapper], {
        y: "-33.333%",
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.02,
      });
    };

    const handleLeave = () => {
      gsap.killTweensOf([dateWrapper, textWrapper]);

      gsap.to([dateWrapper, textWrapper], {
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.02,
      });
    };

    link.addEventListener("mouseenter", handleEnter);
    link.addEventListener("mouseleave", handleLeave);

    return () => {
      link.removeEventListener("mouseenter", handleEnter);
      link.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <li className="border-b border-gray-200 last:border-b-0">
      <a
        ref={linkRef}
        href={`/blog/${post.slug}`}
        className="group flex items-baseline py-6 md:py-8 px-0 hover:bg-gray-50/50 transition-colors duration-300"
      >
        {/* Date Column */}
        <div className="w-32 md:w-40 flex-shrink-0 overflow-hidden">
          <div
            ref={dateWrapperRef}
            className="flex flex-col will-change-transform"
          >
            {/* Three identical spans for the roll effect */}
            <span className="text-sm md:text-base text-black font-medium leading-relaxed">
              {post.date}
            </span>
            <span className="text-sm md:text-base text-black font-medium leading-relaxed">
              {post.date}
            </span>
            <span className="text-sm md:text-base text-black font-medium leading-relaxed">
              {post.date}
            </span>
          </div>
        </div>

        {/* Title Column */}
        <div className="flex-1 overflow-hidden min-w-0">
          <div
            ref={textWrapperRef}
            className="flex flex-col will-change-transform"
          >
            {/* Three identical spans for the roll effect */}
            <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-black leading-tight tracking-tight truncate">
              {post.title}
            </span>
            <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-black leading-tight tracking-tight truncate">
              {post.title}
            </span>
            <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-black leading-tight tracking-tight truncate">
              {post.title}
            </span>
          </div>
        </div>
      </a>
    </li>
  );
}
