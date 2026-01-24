"use client";

import { IconTrendingUp } from "@tabler/icons-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A radial chart with stacked sections";

const chartData = [
  {
    month: "january",
    Forward: 850,
    OverWeight: 420,
    RTO: 150,
  },
];

const chartConfig = {
  Forward: {
    label: "Forward",
    color: "var(--chart-1)",
  },
  OverWeight: {
    label: "OverWeight",
    color: "var(--chart-2)",
  },
  RTO: {
    label: "RTO",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function ShippingChartRadialStacked() {
  const totalShipments =
    chartData[0].Forward + chartData[0].OverWeight + chartData[0].RTO;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>shipping Charges</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-16/10 w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={120}
            cy="85%"
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 20}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalShipments.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 2}
                          className="fill-muted-foreground"
                        >
                          Shipments
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="Forward"
              fill="var(--color-Forward)"
              stackId="a"
              cornerRadius={10}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="OverWeight"
              fill="var(--color-OverWeight)"
              stackId="a"
              cornerRadius={10}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="RTO"
              fill="var(--color-RTO)"
              stackId="a"
              cornerRadius={10}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1.5 text-sm pt-0">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up this month{" "}
          <IconTrendingUp className="h-4 w-4 text-emerald-500" />
        </div>
        <div className="leading-none text-muted-foreground text-xs">
          Showing total shipments for the current period
        </div>
      </CardFooter>
    </Card>
  );
}
