import React, { Suspense } from "react";
import { DateRangeSelector } from "@/components/date-range-selector";
import { TrackingTable } from "@/components/tracking-table";
import data from "./data.json";
import { TrackingSectionCards } from "@/components/tracking-section-cards";

export default function TrackingPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 pt-0">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="px-6 pt-4 w-[320px]">
          <DateRangeSelector defaultValue="today" />
        </div>
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <TrackingSectionCards />
          <Suspense
            fallback={
              <div className="h-[400px] w-full animate-pulse bg-muted rounded-lg" />
            }
          >
            <TrackingTable data={data} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
