"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import INDIA_MAP_DATA from "./india-map-data.json";

const METRIC_OPTIONS = [
  { label: "Delivered", value: "delivered" },
  { label: "RTO", value: "rto" },
  { label: "Pending", value: "pending" },
];

const getStateValue = (stateId: string, metric: string) => {
  const hash = stateId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  if (metric === "delivered") return (hash % 41) + 60; // 60-100%
  if (metric === "rto") return (hash % 15) + 5; // 5-20%
  return (hash % 15) + 2; // 2-17%
};

const getColorForValue = (value: number, metric: string) => {
  if (metric === "delivered") {
    if (value >= 90) return "fill-emerald-500";
    if (value >= 80) return "fill-indigo-500";
    if (value >= 75) return "fill-orange-500";
    if (value >= 70) return "fill-sky-400";
    return "fill-rose-500";
  }
  if (value < 8) return "fill-emerald-500";
  if (value < 12) return "fill-indigo-500";
  if (value < 15) return "fill-orange-500";
  if (value < 18) return "fill-sky-400";
  return "fill-rose-500";
};

export function StateHeatmap({ className }: { className?: string }) {
  const [metric, setMetric] = React.useState("delivered");
  const [hoveredState, setHoveredState] = React.useState<{
    name: string;
    value: number;
  } | null>(null);

  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div>
          <CardTitle className="text-base font-medium">State Heatmap</CardTitle>
          <CardDescription className="text-xs">
            Performance by shipping region
          </CardDescription>
        </div>
        <Select value={metric} onValueChange={setMetric}>
          <SelectTrigger className="h-8 w-[120px] text-xs">
            <SelectValue placeholder="Select Metric" />
          </SelectTrigger>
          <SelectContent>
            {METRIC_OPTIONS.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-xs"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="relative flex-1 flex items-center justify-center p-0 overflow-visible group">
        {/* SVG Map Container */}
        <div className="relative w-full h-[400px] flex items-center justify-center pointer-events-auto">
          <svg
            viewBox="0 0 612 696"
            className="w-full h-full max-h-[350px] p-4 transition-all duration-700 ease-in-out drop-shadow-sm group-hover:drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {INDIA_MAP_DATA.map((state, index) => {
              const value = getStateValue(state.id, metric);
              const colorClass = getColorForValue(value, metric);

              return (
                <path
                  key={state.id}
                  d={state.path}
                  onMouseEnter={() =>
                    setHoveredState({ name: state.name, value })
                  }
                  onMouseLeave={() => setHoveredState(null)}
                  style={{
                    transitionDelay: `${index * 5}ms`,
                  }}
                  className={cn(
                    "stroke-white dark:stroke-slate-900 stroke-[0.4px] cursor-pointer transition-all duration-300",
                    "hover:scale-[1.015] hover:stroke-primary hover:stroke-[1.5px] hover:z-50 hover:brightness-110 hover:drop-shadow-lg",
                    "animate-in fade-in zoom-in-95 duration-1000",
                    colorClass,
                  )}
                >
                  <title>{`${state.name}: ${value}%`}</title>
                </path>
              );
            })}
          </svg>

          {/* Hover Tooltip - Follows SVG logic but simplified for center placement if state is small */}
          {hoveredState && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-8 bg-background/95 backdrop-blur-md px-4 py-2 rounded-xl border border-primary/20 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-3 duration-300 z-50 pointer-events-none">
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full animate-pulse",
                    getColorForValue(hoveredState.value, metric),
                  )}
                />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-foreground leading-tight tracking-tight">
                    {hoveredState.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                    {metric === "delivered"
                      ? "Delivered"
                      : metric === "rto"
                        ? "RTO"
                        : "Pending"}
                    <span className="text-foreground font-bold">
                      {hoveredState.value}%
                    </span>
                  </span>
                </div>
              </div>
              <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-background border-r border-b border-primary/20 rotate-45" />
            </div>
          )}

          {/* Legend - Bottom Right */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-background/80 backdrop-blur-sm p-3 rounded-lg border shadow-sm">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {metric.charAt(0).toUpperCase() + metric.slice(1)} %
            </span>
            <div className="flex flex-col gap-1.5">
              {metric === "delivered"
                ? [
                    { label: "> 90%", color: "#10b981" },
                    { label: "80%–90%", color: "#6366f1" },
                    { label: "75%–80%", color: "#f97316" },
                    { label: "70%–75%", color: "#38BDF8" },
                    { label: "< 70%", color: "#f43f5e" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[10px] text-foreground font-medium">
                        {item.label}
                      </span>
                    </div>
                  ))
                : [
                    { label: "< 8%", color: "#10b981" },
                    { label: "8%–12%", color: "#6366f1" },
                    { label: "12%–15%", color: "#f97316" },
                    { label: "15%–18%", color: "#38BDF8" },
                    { label: "> 18%", color: "#f43f5e" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[10px] text-foreground font-medium">
                        {item.label}
                      </span>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
