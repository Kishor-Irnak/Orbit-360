import {
  IconPackage,
  IconReceipt2,
  IconTrendingDown,
  IconTrendingUp,
  IconTruck,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartRadialStacked } from "./chart-radial";
import { DistributionBar } from "@/components/ui/distribution-bar";
import { ShippingChartRadialStacked } from "./shipping-chart-radial";

const shippingDistribution = [
  {
    label: "Air",
    value: 0,
    percentage: 0,
    color: "#3b82f6", // blue-500
  },
  {
    label: "Surface",
    value: 330,
    percentage: 100,
    color: "#6366f1", // indigo-500
    activeColor: "#4f46e5", // indigo-600
  },
  {
    label: "SDD/NDD",
    value: 0,
    percentage: 0,
    color: "#f97316", // orange-500
  },
];

export function TrackingSectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Shipments</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,250
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-emerald-500">
              <IconTrendingUp className="size-3" />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <div className="flex-1 px-6 flex items-center">
          <div className="p-2 rounded-lg bg-primary/10">
            <IconPackage className="size-6 text-primary" />
          </div>
        </div>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Current active shipments in transit
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Shipping Mode</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Express
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-amber-500">
              <IconTrendingDown className="size-3" />
              -2%
            </Badge>
          </CardAction>
        </CardHeader>
        <div className="flex-1 px-6 flex flex-col justify-center">
          <DistributionBar items={shippingDistribution} />
        </div>
      </Card>
      <ChartRadialStacked />
      <ShippingChartRadialStacked />
    </div>
  );
}
