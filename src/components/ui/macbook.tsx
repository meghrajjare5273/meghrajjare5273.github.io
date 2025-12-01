import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

type MacbookProps = {
  imageSrc?: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode; // Added children prop
};

export const Macbook = forwardRef<HTMLDivElement, MacbookProps>(
  ({ imageSrc, alt = "Macbook screen", className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "macbook group relative mx-auto -mt-24 mb-5 flex w-[860px] flex-col items-center",
          className
        )}
      >
        <div className="macbook-screen">
          <div className="macbook-screen-close" />

          <div className="macbook-screen-open">
            {/* Logic: Render Children if present, otherwise render Image */}
            <div className="macbook-content-mask absolute inset-0 overflow-hidden rounded-md bg-[#151515] w-[96%] h-[88%] left-[2%] top-[5%]">
              {children ? (
                <div className="w-full h-full text-white">{children}</div>
              ) : (
                imageSrc && (
                  <img
                    src={imageSrc}
                    alt={alt}
                    className="w-full h-full object-cover"
                  />
                )
              )}
            </div>
          </div>
        </div>
        <div className="macbook-body" />

        <style>{`
          .macbook-screen {
            height: 580px;
            position: relative;
            transform-style: preserve-3d;
            perspective: 2500px;
            perspective-origin: center bottom;
          }

          .macbook-screen-close {
            position: absolute;
            transform-origin: center bottom -580px;
            /* Initial transform states are now handled by GSAP in Hero.tsx */
            width: 860px;
            height: 13px;
            background: linear-gradient(
              to bottom,
              #acadb3 0%,
              #acadb3 2%,
              #91939b 2%,
              #91939b 4%,
              #a7a9b0 4%,
              #f5f6f7 67%,
              #f5f6f7 100%
            );
            border-radius: 150px/9px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            margin-bottom: 2px;
            box-shadow: inset 10px 0 10px -12px #000,
              inset 60px 0 70px -60px #fff, inset 60px 0 70px -60px #fff,
              inset 100px 0 150px -100px #000, inset -10px 0 10px -12px #000,
              inset -60px 0 70px -60px #fff, inset -60px 0 70px -60px #fff,
              inset -100px 0 150px -100px #000, 0 4px 0 -3px #727379,
              0 6px 0 -4px #1a1a1c;
          }

          .macbook-screen-open {
            transform-origin: center bottom;
            /* Initial transform states are now handled by GSAP in Hero.tsx */
            height: 578px;
            width: 856px;
            position: relative;
            border-radius: 26px 26px 10px 10px;
            background-color: #000;
            border: 2px solid #c8c9cc;
            border-bottom: none;
            box-shadow: inset 0 -11px 0 0 #16191d, inset 0 -12px 0 0 #111418,
              inset 0 -13px 0 0 #262a2f, inset 0 -14px 0 0 #16191d,
              inset 0 0 0 1px #1b1e21, inset 0 0 0 2px #3d4248,
              inset 0 0 0 3px #181b1f;
          }

          .macbook-screen-open::before {
            content: "";
            width: 9px;
            height: 9px;
            border-radius: 4px;
            left: 50%;
            margin-left: -4px;
            top: 13px;
            box-shadow: inset 1px 1px 0 0 #0d1115, inset 2px 2px 0 0 #090c0f,
              inset 3px 3px 0 0 #0c0e12, inset 4px 4px 0 0 #0b1628,
              inset -1px -1px 0 0 #202428, inset -2px -2px 0 0 #1c1f23,
              inset -3px -3px 0 0 #15171a, inset -4px -4px 0 0 #171d25;
            background: #041423;
            position: absolute;
            z-index: 1000;
          }

          .macbook-body {
            position: relative;
            width: 100%;
            height: 27px;
            border-radius: 30px/10px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            background: linear-gradient(
              to bottom,
              #ffffff 0%,
              #fefdff 2%,
              #dfdee3 2%,
              #dfdee3 58%,
              #adadb5 58%,
              #adadb5 60%,
              #8e8e96 60%,
              #8e8e96 65%,
              #96969e 65%,
              #62626a 84%,
              #28282a 98%,
              #28282a 100%
            );
            box-shadow: inset 10px 0 10px -12px #000,
              inset 60px 0 70px -60px #fff, inset 60px 0 70px -60px #fff,
              inset 100px 0 150px -100px #000, inset -10px 0 10px -12px #000,
              inset -60px 0 70px -60px #fff, inset -60px 0 70px -60px #fff,
              inset -100px 0 150px -100px #000;
          }

          .macbook-body::before {
            content: "";
            width: 120px;
            margin-left: -60px;
            height: 10px;
            position: absolute;
            background: linear-gradient(
              to bottom,
              #afafb7 0%,
              #c9cacf 31%,
              #ccccce 100%
            );
            top: 0;
            left: 50%;
            border-radius: 0 0 10px 10px;
            box-shadow: inset 10px 0 10px -10px #000,
              inset -10px 0 10px -10px #000,
              inset 0 -10px 2px -10px rgba(0, 0, 0, 0.2);
          }

          .macbook-screen-image {
            position: absolute;
            width: 94%;
            left: 3%;
            height: 88%;
            top: 6%;
            background: #151515;
            object-fit: cover;
            /* Opacity handled by GSAP */
          }


          
        `}</style>
      </div>
    );
  }
);

Macbook.displayName = "Macbook";

export default Macbook;
