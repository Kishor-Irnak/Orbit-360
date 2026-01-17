"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardAction,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Generate 90 days of mock data
const generateData = () => {
  const data = [];
  const end = new Date();
  for (let i = 90; i >= 0; i--) {
    const date = new Date(end);
    date.setDate(date.getDate() - i);
    // Random ROAS between 2.0 and 6.0
    const roas = 2.0 + Math.random() * 4.0;
    data.push({
      date: date.toISOString().split("T")[0],
      roas: Number(roas.toFixed(2)),
    });
  }
  return data;
};

const fullData = generateData();

const chartConfig = {
  roas: {
    label: "ROAS",
    color: "oklch(0.488 0.243 264.376)",
  },
} satisfies ChartConfig;

export function RoasTrendChart() {
  const [timeRange, setTimeRange] = React.useState("7d");

  const filteredData = React.useMemo(() => {
    const daysToSubtract =
      timeRange === "30d" ? 30 : timeRange === "7d" ? 7 : 90;
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - daysToSubtract);

    return fullData.filter((item) => {
      const date = new Date(item.date);
      return date >= startDate;
    });
  }, [timeRange]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>ROAS Trend</CardTitle>
        <CardDescription>
          Daily ROAS for the last{" "}
          {timeRange === "90d"
            ? "3 months"
            : timeRange === "30d"
            ? "30 days"
            : "7 days"}
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => value && setTimeRange(value)}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 7 days" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="line"
                />
              }
            />
            <Area
              dataKey="roas"
              type="natural"
              fill="var(--color-roas)"
              fillOpacity={0.4}
              stroke="var(--color-roas)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
