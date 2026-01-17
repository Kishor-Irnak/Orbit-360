import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateRangeSelector } from "@/components/date-range-selector";
import data from "./data.json";

export default function CreativesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="px-6 pt-4 w-[320px]">
          <DateRangeSelector defaultValue="today" />
        </div>
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {data.map((creative) => (
                <Card key={creative.id} className="overflow-hidden gap-0 py-0">
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image
                      src={creative.image}
                      alt={creative.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base line-clamp-1 pt-4">
                      {creative.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-xs">
                      {creative.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-muted-foreground uppercase">
                          ROAS
                        </span>
                        <span className="text-lg font-semibold text-success tabular-nums">
                          {creative.roas}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-muted-foreground uppercase">
                          CTR
                        </span>
                        <span className="text-lg font-semibold tabular-nums">
                          {creative.ctr}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-muted-foreground uppercase">
                          CPC
                        </span>
                        <span className="text-lg font-semibold text-success tabular-nums">
                          {creative.cpc}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-muted-foreground uppercase">
                          Purchases
                        </span>
                        <span className="text-lg font-semibold tabular-nums">
                          {creative.purchases}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
