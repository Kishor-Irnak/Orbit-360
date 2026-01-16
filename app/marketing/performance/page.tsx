"use client";
import * as React from "react";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { DataTable } from "@/components/data-table";
import { PerformanceCards } from "@/components/performance-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DateRangeSelector } from "@/components/date-range-selector";

import data from "./data.json";

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
        <div className="px-6 pt-4">
          <DateRangeSelector defaultValue="today" />
        </div>
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <PerformanceCards />
          <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 lg:gap-6 lg:px-6">
            <Card className="@container/card">
              <CardHeader>
                <CardTitle>Weekly Performance</CardTitle>
                <CardDescription>Desktop vs Mobile traffic</CardDescription>
              </CardHeader>
              <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                  config={chartConfig}
                  className="aspect-auto h-[250px] w-full"
                >
                  <BarChart accessibilityLayer data={data.barChartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={4}
                    />
                    <Bar
                      dataKey="mobile"
                      fill="var(--color-mobile)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <ChartAreaInteractive data={data.areaChartData} />
          </div>
          <DataTable data={data.tableData} />
        </div>
      </div>
    </div>
  );
}
