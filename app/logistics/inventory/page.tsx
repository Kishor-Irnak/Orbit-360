import React, { Suspense } from "react";
import { DateRangeSelector } from "@/components/date-range-selector";
import { InventoryTable } from "@/components/inventory-table";
import data from "./data.json";

export default function WarehousesPage() {
  return (
    <div className="flex flex-1 flex-col gap-4  pt-0">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <Suspense
            fallback={
              <div className="h-[400px] w-full animate-pulse bg-muted rounded-lg" />
            }
          >
            <InventoryTable data={data} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
