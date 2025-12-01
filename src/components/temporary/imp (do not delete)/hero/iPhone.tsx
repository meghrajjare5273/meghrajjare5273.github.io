// import React, { forwardRef } from "react";
// import { cn } from "@/lib/utils";

// type IPhoneMockupProps = {
//   backgroundImage?: string;
//   alt?: string;
//   className?: string;
//   children?: React.ReactNode;
// };

// export const IPhoneMockup = forwardRef<HTMLDivElement, IPhoneMockupProps>(
//   ({ backgroundImage, alt = "iPhone screen", className, children }, ref) => {
//     return (
//       <div
//         ref={ref}
//         className={cn(
//           "iphone-mockup group relative mx-auto flex aspect-[9/19.5] w-[300px] flex-col items-center",
//           className
//         )}
//       >
//         <div className="iphone-front-speaker" />
//         <div className="iphone-dynamic-island">
//           <div className="iphone-front-camera" />
//         </div>
//         <div className="iphone-content">
//           {children ? (
//             <div className="iphone-content-wrapper">{children}</div>
//           ) : (
//             backgroundImage && (
//               <img
//                 src={backgroundImage}
//                 alt={alt}
//                 className="iphone-screen-image"
//               />
//             )
//           )}
//         </div>
//         <div className="iphone-antenna-bands">
//           <div className="iphone-top-band" />
//           <div className="iphone-bottom-band" />
//         </div>
//         <div className="iphone-left-buttons">
//           <div className="iphone-slider" />
//           <div className="iphone-volume-up" />
//           <div className="iphone-volume-down" />
//         </div>
//         <div className="iphone-right-buttons">
//           <div className="iphone-side-button" />
//         </div>

//         <style>{`
//           .iphone-mockup {
//             position: relative;
//             aspect-ratio: 9/19.5;
//             width: 260px;
//             border-radius: 45px;
//             box-shadow: inset 0 0 0 8px #000, 0px 0px 0px 1px #c3c0c0,
//               0px 0px 0px 2px #a9a3a4, 0px 0px 0px 3px #dcdcdc;
//             border: 2px solid #4a4153;
//             margin: 0 auto;
//           }

//           .iphone-front-speaker {
//             position: absolute;
//             width: 60px;
//             height: 4px;
//             top: 17px;
//             left: 50%;
//             transform: translateX(-50%);
//             background: #000;
//             border-radius: 2px;
//             z-index: 10;
//           }

//           .iphone-dynamic-island {
//             position: absolute;
//             width: 80px;
//             height: 20px;
//             top: 15px;
//             left: 50%;
//             transform: translateX(-50%);
//             background: #000;
//             border-radius: 10px;
//             z-index: 10;
//           }

//           .iphone-front-camera {
//             position: absolute;
//             right: 8px;
//             top: 5px;
//             width: 10px;
//             height: 10px;
//             background: #111;
//             border-radius: 50%;
//             border: 2px solid #1a1a1a;
//             box-shadow: inset 13px 0px 2px -11px rgba(164, 164, 164, 0.2),
//               inset -13px 0px 2px -10px rgba(86, 115, 149, 0.3);
//           }

//           .iphone-content {
//             position: absolute;
//             width: 100%;
//             height: 100%;
//             z-index: 1;
//             background: #;
//             border-radius: 45px;
//             overflow: hidden;
//             border: 7px solid #000000;
//             // color: #ffffff;
//           }

//           .iphone-content-wrapper {
//             width: 100%;
//             height: 100%;
//             color: white;
//           }

//           .iphone-screen-image {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//           }

//           .iphone-antenna-bands {
//             position: absolute;
//             width: 100%;
//             height: 100%;
//             pointer-events: none;
//           }

//           .iphone-top-band,
//           .iphone-bottom-band {
//             position: absolute;
//             width: 264px;
//             height: 5px;
//             left: -4px;

//             border-left: 2px solid #766e80;
//             border-right: 2px solid #766e80;
//           }

//           .iphone-top-band {
//             top: 60px;
//           }

//           .iphone-bottom-band {
//             bottom: 60px;
//           }

//           .iphone-antenna-bands::before,
//           .iphone-antenna-bands::after {
//             content: "";
//             position: absolute;
//             width: 5px;
//             height: 4px;
//             background: #766e80;
//           }

//           .iphone-antenna-bands::before {
//             top: -4px;
//             right: 60px;
//           }

//           .iphone-antenna-bands::after {
//             bottom: -4px;
//             left: 60px;
//           }

//           .iphone-left-buttons > div,
//           .iphone-right-buttons > div {
//             position: absolute;
//             width: 2.5px;
//             background: linear-gradient(0deg, #564c5d, #4c4652);
//             box-shadow: inset 1px 3px 3px -2px #9d8e78, inset 1px -3px 2px -2px #9d8e78;
//           }

//           .iphone-left-buttons > div {
//             border-radius: 2px 0 0 2px;
//             left: -6px;
//             box-shadow: inset 1px 3px 3px -2px #9d8e78, inset 1px -3px 2px -2px #9d8e78,
//               -1px 0px 0px #b3aeb7;
//           }

//           .iphone-right-buttons > div {
//             border-radius: 0 2px 2px 0px;
//             right: -6px;
//           }

//           .iphone-slider {
//             height: 20px;
//             top: 100px;
//           }

//           .iphone-volume-up {
//             top: 140px;
//             height: 50px;
//           }

//           .iphone-volume-down {
//             top: 200px;
//             height: 50px;
//           }

//           .iphone-side-button {
//             top: 150px;
//             height: 70px;
//           }
//         `}</style>
//       </div>
//     );
//   }
// );

// IPhoneMockup.displayName = "IPhoneMockup";

// export default IPhoneMockup;
