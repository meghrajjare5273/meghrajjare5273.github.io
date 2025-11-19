import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import "./ImageCarousel.scss";

const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const slides = [
    {
      id: "figma",
      image: "/figma.webp",
      logo: "/figma-white.svg",
      bgColor: "bg-violet-200",
      gradientClass: "figma-background",
      indicatorColor: "#000",
      buttonColor: "text-black",
      quote:
        "Stripe's simplicity and product depth have been the foundation for how we've scaled with few people. Without integrating Stripe, I'm sure we would have needed at least five more people to handle a variety of manual processes like managing the close process, reconciling transactions between systems, keeping our AR balance in check, and troubleshooting incorrect datasets.",
      author: "Praveer Melwani, Head of Finance",
    },
    {
      id: "slack",
      image: "/slack.webp",
      logo: "/slack-white.svg",
      bgColor: "bg-orange-200",
      gradientClass: "slack-background",
      indicatorColor: "#4b0b4b",
      buttonColor: "text-[#621F69]",
      quote:
        "My team has to account for millions of transactions and Stripe is our essential source of truth that keeps everything glued together. Stripe keeps the trains moving behind the scenes, especially for our self-service model that operates at global scale",
      author: "Jonathan Gan, Head of Revenue Accounting",
    },
    {
      id: "openai",
      image: "/openai.webp",
      logo: "/openai-white.svg",
      bgColor: "bg-blue-200",
      gradientClass: "openai-background",
      indicatorColor: "#191927",
      buttonColor: "text-[#191927]",
      quote:
        "We're excited to work with Stripe to monetise our flagship products. Beyond payments, Stripe is helping us with everything from recurring billing and tax compliance to automating our financial operations.",
      author: "Peter Welinder, VP of Product and Partnerships",
    },
    {
      id: "shipt",
      image: "/shipt.webp",
      logo: "/shipt-white.svg",
      bgColor: "bg-red-200",
      gradientClass: "shipt-background",
      indicatorColor: "#25CC6B",
      buttonColor: "text-[#25CC6B]",
      quote:
        "We leveraged Stripe for the revenue recognition solution, and what used to take us eight hours…we moved to less than an hour. And we can pull a report, book our entry, do the analysis, and understand the results quickly.",
      author: "Courtney Myers, VP, Financial Controller",
    },
  ];

  useGSAP(
    () => {
      const ease = "power2.out";
      const duration = 0.5;

      // Animate images
      gsap.to(".image", { opacity: 0, duration, ease });
      gsap.to(`.image-${activeIndex}`, { opacity: 1, duration, ease });

      // Animate buttons
      gsap.to(".button", {
        filter: "grayscale(1)",
        opacity: 0.5,
        duration,
        ease,
      });
      gsap.to(`.button-${activeIndex}`, {
        filter: "grayscale(0)",
        opacity: 1,
        duration,
        ease,
      });

      // Animate pagination
      gsap.to(".pagination", { opacity: 0.5, duration, ease });
      gsap.to(`.pagination-${activeIndex}`, { opacity: 1, duration, ease });

      // Animate indicator
      gsap.to(".indicator", {
        x: `${activeIndex * 100}%`,
        backgroundColor: slides[activeIndex].indicatorColor,
        duration,
        ease,
      });

      // Animate text content
      gsap.to(".image-text-container", {
        x: `-${activeIndex * 100}%`,
        duration,
        ease,
      });

      // Animate background gradients
      gsap.to(".bg-gradient", { opacity: 0, duration, ease });
      gsap.to(`.bg-gradient-${activeIndex}`, { opacity: 1, duration, ease });
    },
    { scope: containerRef, dependencies: [activeIndex] }
  );

  const handleSlideChange = (index: any) => {
    setActiveIndex(index);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      <div className="flex flex-col items-center w-full z-10">
        <div className="w-full flex justify-between items-start h-full max-w-[1080px] mx-auto py-10 max-[1080px]:px-4">
          <div className="group relative shadow-md overflow-hidden rounded-xl w-full min-h-[395px] cursor-pointer">
            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 absolute bottom-4 z-50 left-1/2 -translate-x-1/2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`h-0.5 w-8 bg-white pagination pagination-${index} ${
                    index !== activeIndex ? "opacity-30" : ""
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Images */}
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`image image-${index} ${
                  index !== 0 ? "opacity-0" : ""
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.id}
                  className={`w-full h-full object-cover absolute scale-105 group-hover:scale-100 duration-500 ease-in-out ${slide.bgColor}`}
                />
              </div>
            ))}

            {/* Background Gradients */}
            {slides.map((slide, index) => (
              <div
                key={`gradient-${slide.id}`}
                className={`z-2 absolute w-full h-full bg-gradient bg-gradient-${index} ${
                  slide.gradientClass
                } ${index !== 0 ? "opacity-0" : ""}`}
              />
            ))}

            {/* Text Content */}
            <div className="absolute w-full h-full flex items-center justify-start z-3">
              <div className="image-text-container flex">
                {slides.map((slide, index) => (
                  <div
                    key={`text-${slide.id}`}
                    className="w-full h-full flex items-center justify-between p-6 shrink-0 image-text"
                  >
                    <div className="w-1/2 flex flex-col">
                      <div className="text-white mb-6">
                        <p className="mb-2 font-medium">{slide.quote}</p>
                        <p>{slide.author}</p>
                      </div>
                      <a
                        href="https://www.lndev.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`bg-white ${slide.buttonColor} rounded-full w-fit py-2 px-5 flex items-center gap-2`}
                      >
                        <span className="block font-medium">
                          Read full story
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </a>
                    </div>
                    <div className="flex items-center justify-center w-1/2">
                      <img src={slide.logo} alt={slide.id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="w-full flex justify-center items-center border-t border-dashed border-gray-200">
          <div className="w-full flex items-center justify-center px-4">
            <div className="relative grid grid-cols-4 h-full w-full max-w-[1080px] mx-auto">
              <div className="absolute w-1/4 h-0.5 bg-black -top-px indicator" />
              {slides.map((slide, index) => (
                <div key={`nav-${slide.id}`} className="relative">
                  <button
                    className={`w-full flex items-center justify-center py-8 button button-${index} ${
                      index !== 0 ? "grayscale opacity-50" : ""
                    }`}
                    onClick={() => handleSlideChange(index)}
                    aria-label={`View ${slide.id} testimonial`}
                  >
                    <img src={`/${slide.id}.svg`} alt={slide.id} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Grid */}
      <div className="absolute w-full h-full inset-0">
        <div className="absolute w-full h-full inset-0 px-4 py-0 pointer-events-none">
          <div className="flex justify-between items-center h-full max-w-[1080px] mx-auto">
            <div className="bg-gray-200 w-px h-full" />
            <div className="border-r border-gray-200 border-dashed h-full" />
            <div className="border-r border-gray-200 border-dashed h-full" />
            <div className="border-r border-gray-200 border-dashed h-full" />
            <div className="bg-gray-200 w-px h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
