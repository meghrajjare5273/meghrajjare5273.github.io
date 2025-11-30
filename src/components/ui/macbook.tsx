import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface MacbookProProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  src?: string;
}

export const MacbookPro = forwardRef<SVGSVGElement, MacbookProProps>(
  ({ width = 650, height = 400, src, className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox="0 0 650 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("overflow-visible", className)}
        {...props}
      >
        {/* --- LID GROUP (Screen, Bezel, Camera) --- */}
        {/* Origin is set to the hinge pivot point (approx y=345) */}
        <g className="macbook-lid origin-[50%_345px]">
          {/* Lid Aluminum Shell */}
          <path
            fill="#a4a5a7"
            d="M79.56,13.18h491.32c7.23,0,13.1,5.87,13.1,13.1v336.61H66.46V26.28c0-7.23,5.87-13.1,13.1-13.1Z"
          />
          {/* Lid Bezel (Black) */}
          <path
            fill="#000"
            d="M570.25,15.74H80.34c-6.12,0-11.08,4.96-11.08,11.08v336.07h512.08V26.82c0-6.12-4.96-11.08-11.08-11.08ZM575.74,345.17H74.52V27.31c0-3.31,2.68-5.99,5.99-5.99h489.24c3.31,0,5.99,2.68,5.99,5.99v317.86Z"
          />
          {/* Camera Dot */}
          <path
            fill="#222"
            d="M325.11,25.14c-1.99.03-1.99-3.09,0-3.06,1.99-.03,1.99,3.09,0,3.06Z"
          />

          {/* Screen Content Wrapper */}
          <g className="macbook-screen-content opacity-0">
            <rect
              fill="currentColor"
              x="74.52"
              y="21.32"
              width="501.22"
              height="323.85"
              rx="5"
              ry="5"
              className="text-neutral-900 dark:text-neutral-800"
            />
            {src && (
              <image
                href={src}
                x="74.52"
                y="21.32"
                width="501.22"
                height="323.85"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#roundedCorners)"
              />
            )}
          </g>

          {/* Screen Reflection/Gloss */}
          <path
            fill="url(#screen-reflection)"
            fillOpacity="0.1"
            d="M74.52,21.32 h501.22 v323.85 H74.52 Z"
            style={{ mixBlendMode: "overlay", pointerEvents: "none" }}
          />
        </g>

        {/* --- BASE GROUP (Keyboard, Chassis, Trackpad) --- */}
        <g className="macbook-base">
          {/* Hinge Connector */}
          <rect
            fill="#1d1d1d"
            x="69.09"
            y="350.51"
            width="512.11"
            height="12.48"
          />

          {/* Top of Base (Aluminum) */}
          <path
            fill="#acadaf"
            d="M19.04,362.77h611.92v10.39c0,5.95-4.83,10.79-10.79,10.79H29.83c-5.95,0-10.79-4.83-10.79-10.79v-10.39h0Z"
          />

          {/* Keyboard Well */}
          <path
            fill="#222"
            d="M79.96,364h490.45c0,0,0,0,0,0v-5H67.59v5c0,0,0,0,0,0Z"
            opacity="0.3"
          />

          {/* Side Ports & Chassis Details */}
          <polygon
            fill="#b9b9bb"
            points="600.06 385.39 567.29 385.39 565.84 383.95 601.82 383.95 600.06 385.39"
          />
          <polygon
            fill="#292929"
            points="598.73 386.82 568.64 386.82 567.32 385.39 600.35 385.39 598.73 386.82"
          />
          <polygon
            fill="#b9b9bb"
            points="82.64 385.39 49.87 385.39 48.43 383.95 84.41 383.95 82.64 385.39"
          />
          <polygon
            fill="#292929"
            points="81.31 386.82 51.23 386.82 49.9 385.39 82.93 385.39 81.31 386.82"
          />

          {/* Trackpad */}
          <path
            fill="#8f9091"
            d="M278.11,362.6h94.05c0,3.63-2.95,6.58-6.58,6.58h-80.89c-3.63,0-6.58-2.95-6.58-6.58h0Z"
          />
        </g>

        <defs>
          <clipPath id="roundedCorners">
            <rect
              x="74.52"
              y="21.32"
              width="501.22"
              height="323.85"
              rx="5"
              ry="5"
            />
          </clipPath>
          <linearGradient id="screen-reflection" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.1" />
            <stop offset="50%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
);

MacbookPro.displayName = "MacbookPro";
