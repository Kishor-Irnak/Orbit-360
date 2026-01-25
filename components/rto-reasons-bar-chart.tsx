"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

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

export const description = "A bar chart with a custom label";

const chartConfig = {
  count: {
    label: "Count",
  },
} satisfies ChartConfig;

export function RtoBarChart({
  data,
  className,
}: {
  data: any[];
  className?: string;
}) {
  return (
    <Card className={cn("flex flex-col @container/card", className)}>
      <CardHeader className="pb-0">
        <CardTitle>RTO Reasons</CardTitle>
        <CardDescription>Major reasons for returns</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: 10,
              right: 40,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="reason"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" layout="vertical" radius={5}>
              <LabelList
                dataKey="reason"
                position="insideLeft"
                offset={8}
                className="fill-white font-medium"
                fontSize={12}
              />
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                className="fill-foreground font-semibold"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Top reason: {data?.[0]?.reason} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none text-xs">
          Showing distribution of RTO causes from available data
        </div>
      </CardFooter>
    </Card>
  );
}
