import {
  IconTrendingDown,
  IconTrendingUp,
  IconBox,
  IconAlertCircle,
  IconShoppingCart,
  IconStar,
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

export function ProductCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Products</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            2,345
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +5.4%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Catalog growing steadily <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Active SKUs in inventory</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Low Stock Items</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            15
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconAlertCircle />
              Attention
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Reorder point reached <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Items needing replenishment
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Out of Stock</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconBox />
              Urgent
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Potential revenue loss <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">Immediate action required</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Top Selling Category</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Electronics
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconStar />
              #1
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            35% of total revenue <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">High demand sector</div>
        </CardFooter>
      </Card>
    </div>
  );
}
