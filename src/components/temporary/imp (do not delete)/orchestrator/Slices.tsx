// "use client";

// import React, { useRef, useState } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import SignatureLogo from "../loading/signature-logo";

// interface PageOrchestratorProps {
//   children: React.ReactNode;
// }

// const SIGNATURE_DRAW_DURATION = 2.5;

// export function PageOrchestratorSlices({ children }: PageOrchestratorProps) {
//   const [introFinished, setIntroFinished] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const signatureWrapperRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);

//   // Refs for the 5 slices
//   const slicesRef = useRef<HTMLDivElement>(null);

//   useGSAP(() => {
//     const originalOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     const tl = gsap.timeline({
//       onComplete: () => {
//         setIntroFinished(true);
//         document.body.style.overflow = originalOverflow;
//       },
//     });

//     // Initial Setup
//     const slices = gsap.utils.toArray(".intro-slice"); // Select all slices

//     gsap.set(contentRef.current, { zIndex: 1, opacity: 1 });
//     gsap.set(containerRef.current, { zIndex: 50 });
//     gsap.set(slices, { scaleY: 1, transformOrigin: "top" }); // Start full height

//     // === ANIMATION SEQUENCE ===

//     // 1. Wait for signature (2.5s)
//     tl.to({}, { duration: SIGNATURE_DRAW_DURATION * 0.8 });

//     // 2. Signature Exit - Scale down and fade out
//     tl.to(
//       signatureWrapperRef.current,
//       {
//         scale: 0.8,
//         opacity: 0,
//         duration: 0.6,
//         ease: "back.in(1.7)",
//       },
//       "exit"
//     );

//     // 3. Shutter Reveal
//     // The slices slide UP (scaleY -> 0) in a staggered wave
//     tl.to(
//       slices,
//       {
//         scaleY: 0,
//         duration: 1.2,
//         stagger: {
//           amount: 0.25, // Total time to stagger across all elements
//           from: "start", // "start", "center", "end", or "random"
//         },
//         ease: "power4.inOut",
//         onStart: () => {
//           // Trigger Hero animation slightly before slices finish
//           window.dispatchEvent(
//             new CustomEvent("page-intro-complete", {
//               detail: { timestamp: Date.now() },
//             })
//           );
//         },
//       },
//       "exit+=0.4"
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
//           className="fixed inset-0 w-full h-full z-[9999] pointer-events-none flex"
//         >
//           {/* THE 5 SLICES */}
//           {/* We render 5 divs that split the screen width evenly */}
//           {[...Array(5)].map((_, i) => (
//             <div
//               key={i}
//               className="intro-slice h-full bg-neutral-950 border-r border-neutral-900/10"
//               style={{ width: "20%" }} // 5 slices * 20% = 100% width
//             />
//           ))}

//           {/* Signature sits ON TOP of the slices absolutely */}
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
