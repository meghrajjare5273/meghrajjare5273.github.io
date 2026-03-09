import { gsap } from "gsap";

interface MagneticScrambleButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  wrapperClassName?: string;
  buttonClassName?: string;
  textClassName?: string;
}

export const MagneticScrambleButton = ({
  text,
  href,
  onClick,
  wrapperClassName = "",
  buttonClassName = "",
  textClassName = "",
}: MagneticScrambleButtonProps) => {
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

  const buttonContent = (
    <div
      onClick={onClick}
      onMouseEnter={(e) => handleButtonHover(e, true)}
      onMouseLeave={(e) => handleButtonHover(e, false)}
      className={`buttondiv w-fit border border-white/50 cursor-pointer px-[3vw] md:px-[2vw] py-[1.5vw] md:py-[0.65vw] hover:bg-white hover:text-black transition-colors duration-300 ${buttonClassName}`}
    >
      <div className="links cursor-pointer h-[1rem] md:h-[1.3rem] overflow-hidden">
        <h2
          className={`btn-text uppercase font-about-complement ${textClassName}`}
          data-text={text}
        >
          {text}
        </h2>
      </div>
    </div>
  );

  if (href) {
    return (
      <div className={wrapperClassName}>
        <a
          target="_blank"
          href={href}
          rel="noopener noreferrer"
          className="inline-block"
        >
          {buttonContent}
        </a>
      </div>
    );
  }

  return <div className={wrapperClassName}>{buttonContent}</div>;
};

export default MagneticScrambleButton;
