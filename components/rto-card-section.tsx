import { RtoBarChart } from "./rto-reasons-bar-chart";
import { DeliveryAttemptsChart } from "./delivery-attempts-chart";
import { ShipmentRegionChart } from "./shipment-region-chart";
import { ShipmentByStatus } from "./shipment-status";
import { StateHeatmap } from "./state-heatmap";

export function RtoCardSection({ rtoReasons }: { rtoReasons: any[] }) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <RtoBarChart data={rtoReasons} className="@xl/main:col-span-2" />

      <DeliveryAttemptsChart />
      <ShipmentByStatus />
      <ShipmentRegionChart className="@xl/main:col-span-2" />
      <StateHeatmap className="@xl/main:col-span-2" />
    </div>
  );
}
