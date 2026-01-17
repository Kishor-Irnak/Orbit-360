import { ProductsTable } from "@/components/products-table";
import { ProductCards } from "@/components/product-cards";
import data from "./data.json";
import { DateRangeSelector } from "@/components/date-range-selector";

export default function ProductsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 pt-0">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="px-6 pt-4 w-[320px]">
          <DateRangeSelector defaultValue="today" />
        </div>
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <ProductCards />
          <ProductsTable data={data} />
        </div>
      </div>
    </div>
  );
}
