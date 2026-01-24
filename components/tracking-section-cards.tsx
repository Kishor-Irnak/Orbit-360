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

export function SectionCards() {
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
        <div className="flex-1 px-6 flex flex-col justify-center gap-2 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="font-medium text-foreground">Air</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              <span className="font-medium text-foreground">Surface</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              <span className="font-medium text-foreground">SDD/NDD</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-muted-foreground mt-2">
            <div>
              0 <span className="text-[10px]">0.00%</span>
            </div>
            <div className="text-indigo-600 font-medium">
              330 <span className="text-[10px]">100.00%</span>
            </div>
            <div>
              0 <span className="text-[10px]">0.00%</span>
            </div>
          </div>
          <div className="h-4 w-full rounded-sm bg-indigo-100 overflow-hidden flex">
            <div className="h-full bg-indigo-600 w-full" />
          </div>
        </div>
      </Card>
      <ChartRadialStacked />
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Shipping Charges</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ₹4,500
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-emerald-500">
              <IconTrendingUp className="size-3" />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <div className="flex-1 px-6 flex items-center">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <IconReceipt2 className="size-6 text-emerald-500" />
          </div>
        </div>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Average cost per shipment</div>
        </CardFooter>
      </Card>
    </div>
  );
}
