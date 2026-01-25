"use client";

import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Pie, PieChart } from "recharts";

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

export const description = "A pie chart with a label";

const chartData = [
  { attempt: "1st Attempt", count: 50, fill: "var(--color-attempt1)" },
  { attempt: "2nd Attempt", count: 180, fill: "var(--color-attempt2)" },
  { attempt: "3rd Attempt", count: 200, fill: "var(--color-attempt3)" },
  { attempt: "4th+ Attempt", count: 450, fill: "var(--color-attempt4)" },
];

const chartConfig = {
  count: {
    label: "Total Orders",
  },
  attempt1: {
    label: "1st Attempt",
    color: "var(--chart-1)",
  },
  attempt2: {
    label: "2nd Attempt",
    color: "var(--chart-2)",
  },
  attempt3: {
    label: "3rd Attempt",
    color: "var(--chart-3)",
  },
  attempt4: {
    label: "4th+ Attempt",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function ShipmentByStatus({ className }: { className?: string }) {
  return (
    <Card className={cn("flex flex-col @container/card", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Shipment by Status</CardTitle>
        <CardDescription>Current Performance</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px]  pb-0"
        >
          <PieChart className="pt-2">
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="count" label nameKey="attempt" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          75% orders delivered on 1st attempt <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing distribution of delivery attempts for all RTO orders
        </div>
      </CardFooter>
    </Card>
  );
}
