import {
  IconTrendingDown,
  IconTrendingUp,
  IconSpeakerphone,
  IconClick,
  IconChartBar,
  IconCurrencyDollar,
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

export function CampaignCards({
  data,
}: {
  data: {
    title: string;
    value: string;
    badge: string;
    badgeIcon: string;
    subtext: string;
    footer: string;
  }[];
}) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {data.map((card, index) => (
        <Card key={index} className="@container/card">
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {card.badgeIcon === "trending-up" && <IconTrendingUp />}
                {card.badgeIcon === "currency-dollar" && <IconCurrencyDollar />}
                {card.badgeIcon === "click" && <IconClick />}
                {card.badge}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.subtext}
              {index === 0 && <IconTrendingUp className="size-4" />}
              {index === 1 && <IconChartBar className="size-4" />}
              {index === 2 && <IconTrendingUp className="size-4" />}
              {index === 3 && <IconTrendingUp className="size-4" />}
            </div>
            <div className="text-muted-foreground">{card.footer}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
