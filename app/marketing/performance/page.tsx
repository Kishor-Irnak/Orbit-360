import { RoasTrendChart } from "@/components/roas-trend-chart";
import * as React from "react";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { DataTable } from "@/components/data-table";
import { PerformanceCards } from "@/components/performance-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DateRangeSelector } from "@/components/date-range-selector";

import { CampaignsTable } from "@/components/campaigns-table";
import data from "./data.json";
import campaignData from "../campaigns/data.json";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = data.chartConfig satisfies ChartConfig;

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="px-6 pt-4 w-[320px]">
          <DateRangeSelector defaultValue="today" />
        </div>
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <PerformanceCards />
          <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 lg:gap-6 lg:px-6">
            <RoasTrendChart />
            <ChartAreaInteractive data={data.areaChartData} />
          </div>
          <CampaignsTable data={campaignData} />
        </div>
      </div>
    </div>
  );
}
