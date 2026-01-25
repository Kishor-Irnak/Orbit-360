import React, { Suspense } from "react";
import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import data from "./data.json";
import { DateRangeSelector } from "@/components/date-range-selector";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="px-6 pt-4 w-[320px]">
          <DateRangeSelector defaultValue="today" />
        </div>
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive data={data.areaChartData} />
          </div>
          <Suspense
            fallback={
              <div className="h-[400px] w-full animate-pulse bg-muted rounded-lg" />
            }
          >
            <DataTable data={data.tableData} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
