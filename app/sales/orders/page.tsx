import React from "react";
import { OrdersTable } from "@/components/orders-table";
import { OrdersCards } from "@/components/orders-cards";
import data from "./data.json";
import { DateRangeSelector } from "@/components/date-range-selector";

export default function OrdersPage() {
  return (
    <div className="flex flex-1 flex-col gap-4  pt-0">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="px-6 pt-4 w-[320px]">
          <DateRangeSelector defaultValue="today" />
        </div>
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <OrdersCards />
          <React.Suspense
            fallback={
              <div className="h-[400px] w-full animate-pulse bg-muted rounded-lg" />
            }
          >
            <OrdersTable data={data} />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}
