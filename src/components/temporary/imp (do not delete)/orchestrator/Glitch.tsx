// "use client";

// import React, { useRef, useState, useMemo } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// // import SignatureLogo from "../loading/signature-logo";

// interface PageOrchestratorProps {
//   children: React.ReactNode;
// }

// const SIGNATURE_DRAW_DURATION = 2.5;
// const COLS = 10; // Number of grid columns
// const ROWS = 6; // Number of grid rows

// export function PageOrchestratorGlitch({ children }: PageOrchestratorProps) {
//   const [introFinished, setIntroFinished] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const signatureWrapperRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);

//   // Generate grid cells
//   const blocks = useMemo(() => Array.from({ length: COLS * ROWS }), []);

//   useGSAP(() => {
//     const originalOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     const tl = gsap.timeline({
//       onComplete: () => {
//         setIntroFinished(true);
//         document.body.style.overflow = originalOverflow;
//       },
//     });

//     // Select all grid blocks
//     const blockElements = gsap.utils.toArray(".glitch-block");

//     gsap.set(contentRef.current, { zIndex: 1, opacity: 1 });
//     gsap.set(containerRef.current, { zIndex: 50 });
//     gsap.set(blockElements, { opacity: 1, scale: 1.05 }); // Slight overlap to prevent gaps

//     // === ANIMATION SEQUENCE ===

//     // 1. Wait for signature
//     tl.to({}, { duration: SIGNATURE_DRAW_DURATION * 0.85 });

//     // 2. Signature "Glitch" Exit
//     // Shake it briefly then vanish
//     tl.to(
//       signatureWrapperRef.current,
//       {
//         x: () => (Math.random() - 0.5) * 10, // Random X shake
//         y: () => (Math.random() - 0.5) * 10, // Random Y shake
//         opacity: 0.8,
//         duration: 0.1,
//         repeat: 3,
//         yoyo: true,
//         ease: "steps(1)", // Robotic movement
//       },
//       "glitch"
//     ).to(
//       signatureWrapperRef.current,
//       {
//         scale: 0.1,
//         opacity: 0,
//         duration: 0.2,
//         ease: "power4.in",
//       },
//       "glitch+=0.3"
//     );

//     // 3. Digital Grid Dissolve
//     // Fade out blocks randomly
//     tl.to(
//       blockElements,
//       {
//         opacity: 0,
//         scale: 0.8,
//         duration: 0.4,
//         stagger: {
//           amount: 0.8,
//           grid: [ROWS, COLS],
//           from: "random", // Key to the "digital noise" look
//         },
//         ease: "power2.inOut",
//         onStart: () => {
//           window.dispatchEvent(
//             new CustomEvent("page-intro-complete", {
//               detail: { timestamp: Date.now() },
//             })
//           );
//         },
//       },
//       "glitch+=0.4"
//     );

//     return () => {
//       document.body.style.overflow = originalOverflow;
//       tl.kill();
//     };
//   }, []);

//   return (
//     <>
//       {/* Intro Container */}
//       {!introFinished && (
//         <div
//           ref={containerRef}
//           className="fixed inset-0 w-full h-full z-[9999] pointer-events-none"
//         >
//           {/* THE GRID */}
//           <div
//             className="absolute inset-0 w-full h-full grid"
//             style={{
//               gridTemplateColumns: `repeat(${COLS}, 1fr)`,
//               gridTemplateRows: `repeat(${ROWS}, 1fr)`,
//             }}
//           >
//             {blocks.map((_, i) => (
//               <div
//                 key={i}
//                 className="glitch-block w-full h-full bg-neutral-950 border-[0.5px] border-neutral-900/20"
//               />
//             ))}
//           </div>

//           {/* Signature Overlay */}
//           <div
//             ref={signatureWrapperRef}
//             className="absolute inset-0 flex items-center justify-center z-20"
//           >
//             <SignatureLogo
//               className="w-[280px] md:w-[360px] text-white"
//               duration={SIGNATURE_DRAW_DURATION}
//             />
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div ref={contentRef} className="relative min-h-screen bg-background">
//         {children}
//       </div>
//     </>
//   );
// }
