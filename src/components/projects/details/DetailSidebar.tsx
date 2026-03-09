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
    <div className="right-part-wrapper px-[2vw] w-full">
      {/* Description */}
      <div className="gsap-anim-description description">
        <h2 className="text-white text-[5.5vw] md:text-[2.5vw] uppercase font-about-complement">
          DESCRIPTION
        </h2>
        <h4 className="text-[2.5vw] md:text-[1.2vw] mt-[1.3vw] text-white leading-[1.2] font-about-proj whitespace-pre-line">
          {description}
        </h4>
      </div>

      {/* Tech Stack & Highlights */}
      <div className="techstackandhighlights mt-[4vw] md:mt-[2vw] w-full flex md:flex-row flex-col">
        <div className="gsap-anim-techstack techstack flex flex-row md:flex-col justify-between md:h-auto w-full md:w-[35%]">
          <h2 className="text-white text-[4.5vw] md:text-[1.8vw] uppercase font-about-complement">
            TECH STACK
          </h2>
          <div className="tech flex mt-[1.5vw] flex-col gap-[0.2vw]">
            {techStack.map((tech, index) => (
              <h4
                key={index}
                className="text-white text-[2.5vw] md:text-[0.8vw] leading-[1.1] font-about-proj"
              >
                {tech}
              </h4>
            ))}
          </div>
        </div>

        <div className="gsap-anim-highlights highlights flex flex-row md:flex-col justify-between h-[50%] md:h-full w-full md:w-[65%]">
          <h2 className="text-white text-[4.5vw] md:text-[1.8vw] uppercase font-about-complement">
            HIGHLIGHTS
          </h2>
          <div className="tech flex mt-[1.5vw] flex-col gap-[1vw] md:gap-[0.4vw]">
            {highlights.map((highlight, index) => (
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
  );
};

export default ProjectDetailsSidebar;
