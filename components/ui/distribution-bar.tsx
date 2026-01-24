"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DistributionItem {
  label: string;
  value: number;
  percentage: number;
  color: string;
  dotColor?: string;
  activeColor?: string;
}

interface DistributionBarProps {
  items: DistributionItem[];
  className?: string;
}

export function DistributionBar({ items, className }: DistributionBarProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5 text-xs">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.dotColor || item.color }}
            />
            <span className="font-medium text-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-muted-foreground mt-2 text-xs">
        {items.map((item) => (
          <div
            key={item.label}
            className={cn(item.percentage > 0 && "font-medium")}
            style={{
              color:
                item.percentage > 0
                  ? item.activeColor || item.color
                  : undefined,
            }}
          >
            {item.value.toLocaleString()}{" "}
            <span className="text-[10px]">{item.percentage.toFixed(2)}%</span>
          </div>
        ))}
      </div>

      <div className="h-4 w-full rounded-sm bg-muted/30 overflow-hidden flex">
        {items.map((item) => (
          <div
            key={item.label}
            className="h-full transition-all duration-500 ease-in-out"
            style={{
              width: `${item.percentage}%`,
              backgroundColor:
                item.percentage > 0
                  ? item.activeColor || item.color
                  : "transparent",
            }}
          />
        ))}
      </div>
    </div>
  );
}
