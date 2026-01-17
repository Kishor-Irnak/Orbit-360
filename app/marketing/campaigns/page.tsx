import { CampaignsTable } from "@/components/campaigns-table";
import { CampaignCards } from "@/components/campaign-cards";
import data from "./data.json";
import { DateRangeSelector } from "@/components/date-range-selector";

export default function CampaignsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 pt-0">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="px-6 pt-4 w-[320px]">
          <DateRangeSelector defaultValue="today" />
        </div>
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <CampaignCards />
          <CampaignsTable data={data} />
        </div>
      </div>
    </div>
  );
}
