"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BentoGridShowcaseProps {
  integration: React.ReactNode;
  trackers: React.ReactNode;
  statistic: React.ReactNode;
  focus: React.ReactNode;
  productivity: React.ReactNode;
  shortcuts: React.ReactNode;
  className?: string;
}

export function BentoGridShowcase({
  integration,
  trackers,
  statistic,
  focus,
  productivity,
  shortcuts,
  className,
}: BentoGridShowcaseProps) {
  return (
    <section
      className={cn(
        "grid w-full grid-cols-1 gap-5 md:grid-cols-3",
        "md:grid-rows-3",
        "auto-rows-[minmax(140px,auto)] md:auto-rows-[minmax(130px,auto)] xl:auto-rows-[minmax(120px,auto)]",
        className
      )}
    >
      <div className="md:col-span-1 md:row-span-3 grid-item">{integration}</div>

      <div className="md:col-span-1 md:row-span-1 grid-item">{trackers}</div>

      <div className="md:col-span-1 md:row-span-1 grid-item">{statistic}</div>

      <div className="md:col-span-1 md:row-span-1 grid-item">{focus}</div>

      <div className="md:col-span-1 md:row-span-1 grid-item">
        {productivity}
      </div>

      <div className="md:col-span-2 md:row-span-1 grid-item">{shortcuts}</div>
    </section>
  );
}
