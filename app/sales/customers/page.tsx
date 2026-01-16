import { CustomersTable } from "@/components/customers-table";
import data from "./data.json";

export default function CustomersPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <CustomersTable data={data} />
        </div>
      </div>
    </div>
  );
}
