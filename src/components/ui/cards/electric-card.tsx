// // ============================================================================
// // ELECTRIC CARD (updated with optional background image + shared border)

// import { useMemo, useState } from "react";
// import { motion } from "framer-motion";

// // ============================================================================
// type Variant = "swirl" | "hue";

// type ElectricCardProps = {
//   variant?: Variant;
//   color?: string;
//   badge?: string;
//   title?: string;
//   description?: string;
//   image?: string; // NEW: optional background image
//   className?: string;
//   onClick?: () => void;
// };

// const ElectricCard: React.FC<ElectricCardProps> = ({
//   variant = "swirl",
//   color = "#dd8448",
//   badge = "Dramatic",
//   title = "Original",
//   description = "In case you'd like to emphasize something very dramatically.",
//   image,
//   className = "",
//   onClick,
// }) => {
//   const ids = useMemo(() => {
//     const key = Math.random().toString(36).slice(2, 8);
//     return { swirl: `swirl-${key}`, hue: `hue-${key}` };
//   }, []);

//   const filterURL =
//     variant === "hue" ? `url(#${ids.hue})` : `url(#${ids.swirl})`;
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className={`ec-wrap ${className}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={onClick}
//     >
//       {/* SVG filters */}
//       <svg
//         className="svg-container"
//         xmlns="http://www.w3.org/2000/svg"
//         aria-hidden="true"
//       >
//         <defs>
//           <filter
//             id={ids.swirl}
//             colorInterpolationFilters="sRGB"
//             x="-20%"
//             y="-20%"
//             width="140%"
//             height="140%"
//           >
//             <feTurbulence
//               type="turbulence"
//               baseFrequency="0.02"
//               numOctaves="10"
//               result="noise1"
//               seed="1"
//             />
//             <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
//               <animate
//                 attributeName="dy"
//                 values="700; 0"
//                 dur="6s"
//                 repeatCount="indefinite"
//                 calcMode="linear"
//               />
//             </feOffset>
//             <feTurbulence
//               type="turbulence"
//               baseFrequency="0.02"
//               numOctaves="10"
//               result="noise2"
//               seed="1"
//             />
//             <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
//               <animate
//                 attributeName="dy"
//                 values="0; -700"
//                 dur="6s"
//                 repeatCount="indefinite"
//                 calcMode="linear"
//               />
//             </feOffset>
//             <feTurbulence
//               type="turbulence"
//               baseFrequency="0.02"
//               numOctaves="10"
//               result="noise3"
//               seed="2"
//             />
//             <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
//               <animate
//                 attributeName="dx"
//                 values="490; 0"
//                 dur="6s"
//                 repeatCount="indefinite"
//                 calcMode="linear"
//               />
//             </feOffset>
//             <feTurbulence
//               type="turbulence"
//               baseFrequency="0.02"
//               numOctaves="10"
//               result="noise4"
//               seed="2"
//             />
//             <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
//               <animate
//                 attributeName="dx"
//                 values="0; -490"
//                 dur="6s"
//                 repeatCount="indefinite"
//                 calcMode="linear"
//               />
//             </feOffset>
//             <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
//             <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
//             <feBlend
//               in="part1"
//               in2="part2"
//               mode="color-dodge"
//               result="combinedNoise"
//             />
//             <feDisplacementMap
//               in="SourceGraphic"
//               in2="combinedNoise"
//               scale="30"
//               xChannelSelector="R"
//               yChannelSelector="B"
//             />
//           </filter>

//           <filter
//             id={ids.hue}
//             colorInterpolationFilters="sRGB"
//             x="-20%"
//             y="-20%"
//             width="140%"
//             height="140%"
//           >
//             <feTurbulence
//               type="turbulence"
//               baseFrequency="0.02"
//               numOctaves="7"
//             />
//             <feColorMatrix type="hueRotate" result="pt1">
//               <animate
//                 attributeName="values"
//                 values="0;360;"
//                 dur=".6s"
//                 repeatCount="indefinite"
//                 calcMode="paced"
//               />
//             </feColorMatrix>
//             <feComposite />
//             <feTurbulence
//               type="turbulence"
//               baseFrequency="0.03"
//               numOctaves="7"
//               seed="5"
//             />
//             <feColorMatrix type="hueRotate" result="pt2">
//               <animate
//                 attributeName="values"
//                 values="0; 333; 199; 286; 64; 168; 256; 157; 360;"
//                 dur="5s"
//                 repeatCount="indefinite"
//                 calcMode="paced"
//               />
//             </feColorMatrix>
//             <feBlend in="pt1" in2="pt2" mode="normal" result="combinedNoise" />
//             <feDisplacementMap
//               in="SourceGraphic"
//               scale="30"
//               xChannelSelector="R"
//               yChannelSelector="B"
//             />
//           </filter>
//         </defs>
//       </svg>

//       {/* Card base */}
//       <div
//         className="card-container"
//         style={{ "--electric-border-color": color, "--f": filterURL } as any}
//       >
//         <div className="inner-container">
//           <div className="border-outer">
//             <div className="main-card" />
//           </div>
//           <div className="glow-layer-1" />
//           <div className="glow-layer-2" />
//         </div>

//         {/* Optional background image layer under overlays */}
//         {image && (
//           <div className="absolute inset-0 overflow-hidden rounded-2xl">
//             <img
//               src={image}
//               alt=""
//               className="h-full w-full object-cover opacity-70"
//             />
//             <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
//           </div>
//         )}

//         <div className="overlay-1" />
//         <div className="overlay-2" />
//         <div className="background-glow" />

//         <div className="content-container">
//           <div className="content-top">
//             <motion.div
//               className="scrollbar-glass"
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
//               transition={{ duration: 0.3 }}
//             >
//               {badge}
//             </motion.div>

//             <motion.p
//               className="title"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: isHovered ? 1 : 0 }}
//               transition={{ duration: 0.3, delay: 0.1 }}
//             >
//               {title}
//             </motion.p>
//           </div>

//           <hr className="divider" />

//           <div className="content-bottom">
//             <motion.p
//               className="description"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: isHovered ? 1 : 0 }}
//               transition={{ duration: 0.3, delay: 0.2 }}
//             >
//               {description}
//             </motion.p>
//           </div>
//         </div>
//       </div>

//       {/* Electric perimeter echo for consistency with PixelCard and modal */}
//       <div className="pointer-events-none absolute inset-0 rounded-2xl electric-border" />

//       <style>{`
//         :root { --color-neutral-900: oklch(0.185 0 0); }

//         .ec-wrap { position: relative; display: inline-block; color-scheme: light dark; width: 100%; height: 100%; }
//         .svg-container { position: absolute; width: 0; height: 0; overflow: hidden; }

//         .card-container {
//           padding: 2px; border-radius: 1.5em; position: relative; width: 100%; height: 100%;
//           --electric-light-color: oklch(from var(--electric-border-color) l c h);
//           --gradient-color: oklch(from var(--electric-border-color) 0.3 calc(c / 2) h / 0.4);
//           background: linear-gradient(-30deg, var(--gradient-color), transparent, var(--gradient-color)),
//             linear-gradient(to bottom, var(--color-neutral-900), var(--color-neutral-900));
//           color: oklch(0.985 0 0);
//         }

//         .inner-container { position: relative; width: 100%; height: 100%; }
//         .border-outer {
//           border: 2px solid oklch(from var(--electric-border-color) l c h / 0.5);
//           border-radius: 1.5em; padding-right: 0.15em; padding-bottom: 0.15em; width: 100%; height: 100%;
//         }
//         .main-card {
//           width: 100%; height: 100%; border-radius: 1.5em; border: 2px solid var(--electric-border-color);
//           margin-top: -4px; margin-left: -4px; filter: var(--f); background: oklch(0.145 0 0);
//         }

//         .glow-layer-1, .glow-layer-2, .overlay-1, .overlay-2, .background-glow {
//           border-radius: 24px; position: absolute; inset: 0; pointer-events: none;
//         }

//         .glow-layer-1 { border: 2px solid oklch(from var(--electric-border-color) l c h / 0.6); filter: blur(1px); }
//         .glow-layer-2 { border: 2px solid var(--electric-light-color); filter: blur(4px); }

//         .overlay-1, .overlay-2 {
//           mix-blend-mode: overlay; transform: scale(1.1); filter: blur(16px);
//           background: linear-gradient(-30deg, white, transparent 30%, transparent 70%, white);
//         }
//         .overlay-1 { opacity: 1; }
//         .overlay-2 { opacity: 0.5; }

//         .background-glow {
//           filter: blur(32px); transform: scale(1.1); opacity: 0.3; z-index: -1;
//           background: linear-gradient(-30deg, var(--electric-light-color), transparent, var(--electric-border-color));
//         }

//         .content-container { position: absolute; inset: 0; display: flex; flex-direction: column; padding: 1.5rem; }
//         .content-top { display: flex; flex-direction: column; height: 100%; }
//         .content-bottom { display: flex; flex-direction: column; }

//         .scrollbar-glass {
//           background: radial-gradient(47.2% 50% at 50.39% 88.37%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, 0.04);
//           position: relative; transition: background 0.3s ease; border-radius: 14px; width: fit-content; height: fit-content;
//           padding: 0.5em 1em; text-transform: uppercase; font-weight: bold; font-size: 0.75rem; color: rgba(255, 255, 255, 0.8);
//         }

//         .title { font-size: 1.5rem; font-weight: 600; margin-top: auto; font-family: 'Space Grotesk Variable', sans-serif; }
//         .description { opacity: 0.7; font-size: 0.875rem; font-family: 'Space Grotesk Variable', sans-serif; }

//         .divider {
//           margin-top: auto; margin-bottom: 1rem; border: none; height: 1px; background-color: currentColor; opacity: 0.1;
//           mask-image: linear-gradient(to right, transparent, black, transparent);
//           -webkit-mask-image: linear-gradient(to right, transparent, black, transparent);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ElectricCard;
