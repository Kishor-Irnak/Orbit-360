import data from "./data.json";
import { RtoCardSection } from "@/components/rto-card-section";
import { DeliveryAttemptsChart } from "@/components/delivery-attempts-chart";

export default function ReturnsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 pt-0">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="py-2">
          <RtoCardSection rtoReasons={data.rtoReasons} />
        </div>
      </div>
    </div>
  );
}
