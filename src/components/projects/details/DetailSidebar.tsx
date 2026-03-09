interface ProjectDetailsSidebarProps {
  description: string;
  techStack: string[];
  highlights: string[];
}

export const ProjectDetailsSidebar = ({
  description,
  techStack,
  highlights,
}: ProjectDetailsSidebarProps) => {
  return (
    <div className="right-part-wrapper px-0 sm:px-2 lg:px-[2vw] w-full">
      {/* Description */}
      <div className="gsap-anim-description description mb-8 lg:mb-0">
        <h2 className="text-foreground text-2xl sm:text-3xl lg:text-[2.5vw] uppercase font-about-complement mb-4 lg:mb-[1.3vw]">
          Description
        </h2>
        <p className="text-sm sm:text-base lg:text-[1.2vw] text-muted-foreground leading-relaxed lg:leading-[1.2] font-about-proj whitespace-pre-line">
          {description}
        </p>
      </div>

      {/* Tech Stack & Highlights - Responsive Grid */}
      <div className="techstackandhighlights mt-8 lg:mt-[2vw] w-full flex flex-col lg:flex-row gap-8 lg:gap-0">
        {/* Tech Stack */}
        <div className="gsap-anim-techstack techstack w-full lg:w-[35%]">
          <h2 className="text-foreground text-xl sm:text-2xl lg:text-[1.8vw] uppercase font-about-complement mb-4 lg:mb-0">
            Tech Stack
          </h2>
          <div className="tech flex mt-0 lg:mt-[1.5vw] flex-col gap-2 lg:gap-[0.2vw]">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="text-foreground text-sm sm:text-base lg:text-[0.8vw] leading-[1.1] font-about-proj"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="gsap-anim-highlights highlights w-full lg:w-[65%]">
          <h2 className="text-foreground text-xl sm:text-2xl lg:text-[1.8vw] uppercase font-about-complement mb-4 lg:mb-0">
            Highlights
          </h2>
          <div className="tech flex mt-0 lg:mt-[1.5vw] flex-col gap-3 lg:gap-[0.4vw]">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-primary mt-1 lg:mt-0.5 flex-shrink-0">
                  •
                </span>
                <span className="text-foreground text-sm sm:text-base lg:text-[1vw] leading-[1.1] font-about-proj">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsSidebar;
