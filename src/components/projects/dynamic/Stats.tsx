import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --- Types ---

export type ServiceStatus = "active" | "degraded" | "offline";

export interface ServiceItem {
  name: string;
  status: ServiceStatus;
  description: string;
  updatedAt: string; // e.g., "12 Aug 2025"
}

export interface ProjectSystemStatusProps {
  heading?: string;
  description?: string;
  services: ServiceItem[];
  snapshotDate?: string;
}

// --- Helper for Status Visuals ---

const getStatusConfig = (status: ServiceStatus) => {
  switch (status) {
    case "active":
      return {
        label: "Operational",
        colorClass: "bg-emerald-500/80 dark:bg-emerald-400/90",
        pulseClass: "status-dot-active", // Marker for GSAP
      };
    case "degraded":
      return {
        label: "Performance Degraded",
        colorClass: "bg-amber-500/80 dark:bg-amber-400/90",
        pulseClass: "",
      };
    case "offline":
      return {
        label: "Maintenance / Offline",
        colorClass: "bg-neutral-500/80 dark:bg-neutral-600",
        pulseClass: "",
      };
    default:
      return {
        label: "Unknown",
        colorClass: "bg-gray-500",
        pulseClass: "",
      };
  }
};

export const ProjectStats: React.FC<ProjectSystemStatusProps> = ({
  heading = "System Status",
  description = "Operational snapshot of the project and its core services.",
  services,
  snapshotDate,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 1. Staggered Row Entry
      // We reveal the rows cleanly without scaling/bouncing to maintain the "serious" tone
      gsap.from(".service-row", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // 2. Subtle Pulse for Active Services
      // Only targets elements with the .status-dot-active class
      gsap.to(".status-dot-active", {
        boxShadow: "0 0 8px 2px rgba(52, 211, 153, 0.2)",
        opacity: 0.7,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 pb-12"
    >
      {/* Header Section */}
      <div className="col-span-full lg:col-span-4 flex flex-col gap-4">
        <h2 className="text-[36px] md:text-[60px] font-light dark:text-[#eceae8] text-[#101010] leading-[110%]">
          {heading}
        </h2>
        <div className="flex flex-col gap-2">
          <p className="text-[17px] md:text-[20px] dark:text-[#eceae8]/80 text-[#101010]/80 leading-[150%]">
            {description}
          </p>
          {snapshotDate && (
            <p className="text-sm font-about dark:text-[#eceae8]/50 text-[#101010]/50 uppercase tracking-widest mt-2">
              Snapshot: {snapshotDate}
            </p>
          )}
        </div>
      </div>

      {/* Services List / Grid */}
      <div className="col-span-full lg:col-span-7 lg:col-start-6 flex flex-col">
        {/* Table Header (Visible on Desktop only for editorial feel) */}
        <div className="hidden md:grid grid-cols-12 pb-4 border-b border-black/10 dark:border-white/10 text-xs uppercase tracking-widest opacity-50 font-about dark:text-[#eceae8] text-[#101010]">
          <div className="col-span-5">Service</div>
          <div className="col-span-4">Status</div>
          <div className="col-span-3 text-right">Last Updated</div>
        </div>

        {services.map((service, index) => {
          const config = getStatusConfig(service.status);

          return (
            <div
              key={index}
              className="service-row col-span-full border-b border-black/10 dark:border-white/10 py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start md:items-center group"
            >
              {/* Column 1: Name & Description */}
              <div className="md:col-span-5 flex flex-col gap-1">
                <h3 className="text-[18px] md:text-[20px] font-about dark:text-[#eceae8] text-[#101010]">
                  {service.name}
                </h3>
                <p className="text-[14px] leading-[140%] dark:text-[#eceae8]/60 text-[#101010]/60 max-w-[90%]">
                  {service.description}
                </p>
              </div>

              {/* Column 2: Status Indicator */}
              <div className="md:col-span-4 flex items-center gap-3 mt-2 md:mt-0">
                <div className="relative flex items-center justify-center w-3 h-3">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${config.colorClass} ${config.pulseClass}`}
                  ></div>
                </div>
                <span className="text-[15px] font-about dark:text-[#eceae8]/90 text-[#101010]/90">
                  {config.label}
                </span>
              </div>

              {/* Column 3: Date */}
              <div className="md:col-span-3 flex md:justify-end mt-1 md:mt-0">
                <span className="text-[14px] font-about dark:text-[#eceae8]/40 text-[#101010]/40">
                  {service.updatedAt}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
