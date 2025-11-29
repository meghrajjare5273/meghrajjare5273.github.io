// "use client";

// import React, { useRef, useState } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import SignatureLogo from "../loading/signature-logo";

// interface PageOrchestratorProps {
//   children: React.ReactNode;
// }

// const SIGNATURE_DRAW_DURATION = 2.5;

// export function PageOrchestratorIris({ children }: PageOrchestratorProps) {
//   const [introFinished, setIntroFinished] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const signatureWrapperRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);

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
//     gsap.set(contentRef.current, { zIndex: 1, opacity: 1 });
//     // We start with the clip path covering everything (circle at 0%)
//     // But since it's an overlay, we actually want the overlay to be full
//     // and then we "cut a hole" in it.
//     // CSS clip-path usually shows what's INSIDE the shape.
//     // So to "reveal" underneath, we actually animate the clip-path of the CONTAINER
//     // from "full" to "nothing", OR we use a mask.
//     // Easier approach: The intro container is a solid block. We animate its clipPath
//     // from circle(150%...) [fully visible] to circle(0%...) [hidden] -> WAIT, that hides the intro.

//     // Correct Logic:
//     // The Intro Container starts fully visible.
//     // We animate a clipPath: circle(0% at 50% 50%) -> circle(150% at 50% 50%)
//     // applying this to the *content*? No, that hides content initially.

//     // Better Logic (Inverted Mask):
//     // We animate the Intro Container's clipPath from `circle(150% at 50% 50%)` (full screen)
//     // to `circle(0% at 50% 50%)`. This would shrink the black screen to a dot.
//     // EFFECT: The black screen shrinks away into the center.

//     gsap.set(containerRef.current, {
//       zIndex: 50,
//       clipPath: "circle(150% at 50% 50%)"
//     });

//     // === ANIMATION SEQUENCE ===

//     // 1. Wait for signature (2.5s)
//     tl.to({}, { duration: SIGNATURE_DRAW_DURATION * 0.8 });

//     // 2. Signature Exit - Zoom in slightly and fade
//     tl.to(signatureWrapperRef.current, {
//       scale: 1.1,
//       opacity: 0,
//       duration: 0.5,
//       ease: "power2.in",
//     }, "exit");

//     // 3. Iris Wipe (The Reveal)
//     // The black overlay shrinks into the center (or expands out if we inverted logic).
//     // Let's do "Expand Out" (Hole opens in center).
//     // To do a hole opening in a solid div with simple CSS clip-path is hard (requires SVG mask).
//     // ALTERNATIVE: We shrink the black overlay to 0.

//     tl.to(containerRef.current, {
//       clipPath: "circle(0% at 50% 50%)", // Shrink black overlay to center dot
//       duration: 1.5,
//       ease: "expo.inOut",
//       onStart: () => {
//         window.dispatchEvent(
//           new CustomEvent("page-intro-complete", {
//             detail: { timestamp: Date.now() },
//           })
//         );
//       }
//     }, "exit+=0.3");

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
//           className="fixed inset-0 w-full h-full bg-neutral-950 flex items-center justify-center z-[9999]"
//         >
//           <div ref={signatureWrapperRef} className="relative z-10 p-4">
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
