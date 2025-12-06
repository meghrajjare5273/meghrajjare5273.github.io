import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SignatureLogo from "../loading/signature-logo";

gsap.registerPlugin(ScrollTrigger);

// --- Configuration ---
const SOCIAL_LINKS = [
  {
    name: "Discord",
    url: "https://discord.com",
    path: "M18.9419 5.51536C17.6472 4.90962 16.263 4.46941 14.8157 4.21875C14.638 4.54009 14.4303 4.9723 14.2871 5.31612C12.7487 5.08476 11.2244 5.08476 9.71428 5.31612C9.57114 4.9723 9.35878 4.54009 9.17945 4.21875C7.73066 4.46941 6.34479 4.91124 5.05015 5.51856C2.43887 9.46456 1.73099 13.3126 2.08493 17.1059C3.81687 18.3992 5.49533 19.1849 7.14546 19.6991C7.5529 19.1383 7.91626 18.5422 8.2293 17.9141C7.63311 17.6875 7.0621 17.408 6.52255 17.0834C6.66569 16.9773 6.80571 16.8665 6.94097 16.7524C10.2318 18.2917 13.8074 18.2917 17.0589 16.7524C17.1958 16.8665 17.3358 16.9773 17.4773 17.0834C16.9362 17.4096 16.3636 17.6891 15.7675 17.9157C16.0805 18.5422 16.4423 19.14 16.8513 19.7007C18.503 19.1866 20.183 18.4009 21.915 17.1059C22.3303 12.7084 21.2055 8.89579 18.9419 5.51536ZM8.67764 14.773C7.68976 14.773 6.87961 13.8507 6.87961 12.7277C6.87961 11.6047 7.67246 10.6808 8.67764 10.6808C9.68283 10.6808 10.493 11.603 10.4756 12.7277C10.4772 13.8507 9.68283 14.773 8.67764 14.773ZM15.3222 14.773C14.3344 14.773 13.5242 13.8507 13.5242 12.7277C13.5242 11.6047 14.3171 10.6808 15.3222 10.6808C16.3275 10.6808 17.1376 11.603 17.1203 12.7277C17.1203 13.8507 16.3275 14.773 15.3222 14.773Z",
  },
  {
    name: "X (Twitter)",
    url: "https://x.com",
    path: "M17.1761 4.24219H19.9362L13.9061 11.0196L21 20.2422H15.4456L11.0951 14.6488L6.11723 20.2422H3.35544L9.80517 12.993L3 4.24219H8.69545L12.6279 9.35481L17.1761 4.24219ZM16.2073 18.6176H17.7368L7.86441 5.78147H6.2232L16.2073 18.6176Z",
  },
  {
    name: "YouTube",
    url: "https://youtube.com",
    path: "M15.3317 3.0459H4.6681C2.57592 3.0459 0.879883 4.74194 0.879883 6.83412V12.1648C0.879883 14.2569 2.57592 15.953 4.6681 15.953H15.3317C17.4239 15.953 19.1199 14.2569 19.1199 12.1648V6.83412C19.1199 4.74194 17.4239 3.0459 15.3317 3.0459ZM12.7697 9.7588L7.78203 12.1376C7.64913 12.201 7.49561 12.1042 7.49561 11.9569V7.05054C7.49561 6.90122 7.65316 6.80444 7.78634 6.87194L12.774 9.39947C12.9223 9.47463 12.9197 9.68728 12.7697 9.7588Z",
  },
  {
    name: "Telegram",
    url: "https://t.me",
    path: "M2.17134 11.5528C2.17134 11.5528 11.0169 7.92255 14.0847 6.64429C15.2607 6.13299 19.2488 4.49683 19.2488 4.49683C19.2488 4.49683 21.0895 3.781 20.9361 5.51943C20.885 6.23525 20.4759 8.74063 20.0669 11.4505C19.4533 15.2853 18.7886 19.478 18.7886 19.478C18.7886 19.478 18.6864 20.654 17.8172 20.8585C16.948 21.063 15.5163 20.1427 15.2607 19.9381C15.0561 19.7847 11.4259 17.4839 10.0965 16.359C9.7386 16.0522 9.32956 15.4387 10.1476 14.7229C11.9883 13.0356 14.1869 10.9392 15.5163 9.60984C16.1299 8.99628 16.7434 7.56463 14.1869 9.30306C10.5567 11.8084 6.97757 14.1604 6.97757 14.1604C6.97757 14.1604 6.15949 14.6717 4.62559 14.2116C3.09168 13.7514 1.30213 13.1378 1.30213 13.1378C1.30213 13.1378 0.0750029 12.3709 2.17134 11.5528Z",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    path: "M4.5 3.24219C3.67157 3.24219 3 3.91376 3 4.74219V19.7422C3 20.5706 3.67157 21.2422 4.5 21.2422H19.5C20.3284 21.2422 21 20.5706 21 19.7422V4.74219C21 3.91376 20.3284 3.24219 19.5 3.24219H4.5ZM8.52076 7.24491C8.52639 8.20116 7.81061 8.79038 6.96123 8.78616C6.16107 8.78194 5.46357 8.14491 5.46779 7.24632C5.47201 6.40116 6.13998 5.72194 7.00764 5.74163C7.88795 5.76132 8.52639 6.40679 8.52076 7.24491ZM12.2797 10.0039H9.75971H9.7583V18.5638H12.4217V18.3641C12.4217 17.9842 12.4214 17.6042 12.4211 17.2241C12.4203 16.2103 12.4194 15.1954 12.4246 14.1819C12.426 13.9358 12.4372 13.6799 12.5005 13.445C12.7381 12.5675 13.5271 12.0008 14.4074 12.1401C14.9727 12.2286 15.3467 12.5563 15.5042 13.0893C15.6013 13.4225 15.6449 13.7811 15.6491 14.1285C15.6605 15.1761 15.6589 16.2237 15.6573 17.2714C15.6567 17.6412 15.6561 18.0112 15.6561 18.381V18.5624H18.328V18.3571C18.328 17.9051 18.3278 17.4532 18.3275 17.0013C18.327 15.8718 18.3264 14.7423 18.3294 13.6124C18.3308 13.1019 18.276 12.5985 18.1508 12.1049C17.9638 11.3708 17.5771 10.7633 16.9485 10.3246C16.5027 10.0124 16.0133 9.81129 15.4663 9.78879C15.404 9.7862 15.3412 9.78281 15.2781 9.7794C14.9984 9.76428 14.7141 9.74892 14.4467 9.80285C13.6817 9.95613 13.0096 10.3063 12.5019 10.9236C12.4429 10.9944 12.3852 11.0663 12.2991 11.1736L12.2797 11.1979V10.0039ZM5.68164 18.5666H8.33242V10.0095H5.68164V18.5666Z",
  },
];

const NAV_GROUPS = [
  {
    title: "Sitemap",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Documentation", href: "/docs" },
      // { label: "Brand Kit", href: "/brand" },
    ],
  },
  // Add more groups here if needed to scale the grid
];

const LEGAL_LINKS = [
  { label: "Ecosystem Disclaimer", href: "/disclaimer" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Interactions: Hover on Socials
      const socialLinks = gsap.utils.toArray<HTMLElement>(".social-link-item");
      socialLinks.forEach((link) => {
        const icon = link.querySelector("svg");
        link.addEventListener("mouseenter", () => {
          gsap.to(icon, { scale: 1.1, duration: 0.3, ease: "back.out(1.7)" });
        });
        link.addEventListener("mouseleave", () => {
          gsap.to(icon, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });

      // Entrance Animation
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          ".footer-reveal",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
          }
        );
      });
      return () => {
        mm.revert();
      }
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="relative z-40 bg-[#101010] text-[#eceae8] dark:bg-[#eceae8] dark:text-[#101010] pt-[clamp(2.5rem,2.1875vw+1.875rem,3.125rem)] pb-8 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col justify-between h-full">
        {/* --- Header Section (Title + Socials) --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-[clamp(3.125rem,2.8125vw+2.5rem,5rem)] gap-8">
          {/* Main Title / Slogan */}
          <h3 className="footer-reveal font-about text-4xl leading-[1.1] font-bold max-w-2xl tracking-wide">
            That's all folks. <br />
            Here are a few quick links to navigate through.
          </h3>

          {/* Social Icons */}
          <ul className="footer-reveal flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.name}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.name} profile link`}
                  className="social-link-item block p-3 rounded-full border border-current border-opacity-10 hover:bg-current hover:bg-opacity-10 hover:border-opacity-30 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Main Navigation Grid --- */}
        <nav className="mb-[clamp(3.75rem,3.125vw+2.8125rem,5.625rem)]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[clamp(0.9375rem,1.5625vw+0.46875rem,1.875rem)]">
            {NAV_GROUPS.map((group, idx) => (
              <div key={idx} className="footer-reveal flex flex-col gap-6">
                <ul className="flex flex-col gap-4">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="font-about text-[clamp(1.25rem,1.041667vw+0.9375rem,1.875rem)] font-medium leading-[1.2] hover:opacity-60 transition-opacity duration-300 block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="hidden lg:block"></div>
          </div>
        </nav>

        {/* --- Bottom Section --- */}
        <div className="relative flex flex-col-reverse lg:flex-row justify-center items-start lg:items-end pt-8 border-t border-current border-opacity-10">
          {/* Copyright */}
          <div className="footer-reveal font-about text-sm opacity-60">
            <span>© {currentYear} Meghraj Jare</span>
          </div>
        </div>

        {/* SVG Signature - Positioned OUTSIDE bottom section to sit ON the line */}
        <div className="footer-reveal absolute bottom-14 right-6 md:right-12 lg:right-20 -translate-y-1/2 w-[150px] h-20 md:w-[200px] md:h-[90px] md:mr-3 md:mb-2 z-20 opacity-50 hover:opacity-100 transition-opacity duration-500">
          {/* <div className="w-full h-full border border-dashed border-current border-opacity-20 flex items-center justify-center rounded-lg bg-[#101010] dark:bg-[#eceae8]">
            <span className="text-[10px] font-mono opacity-50">
              Signature Slot
            </span>
          </div> */}
          <SignatureLogo className="w-full h-full text-current" />
        </div>
      </div>
    </footer>
  );
}
