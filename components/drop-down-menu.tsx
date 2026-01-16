"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const dateRangeLabels: Record<string, string> = {
  custom: "Custom date range",
  today: "Today",
  yesterday: "Yesterday",
  "last-30-minutes": "Last 30 minutes",
  "last-12-hours": "Last 12 hours",
  "last-7-days": "Last 7 days",
  "last-30-days": "Last 30 days",
  "last-90-days": "Last 90 days",
  "last-365-days": "Last 365 days",
  "last-month": "Last month",
  "last-12-months": "Last 12 months",
  "last-year": "Last year",
  "week-to-date": "Week to date",
  "month-to-date": "Month to date",
  "quarter-to-date": "Quarter to date",
  "year-to-date": "Year to date",
  "all-time": "All time",
};

export function DropdownMenuDemo() {
  const [dateRange, setDateRange] = React.useState("today");
  const [customStartDate, setCustomStartDate] = React.useState<
    Date | undefined
  >();
  const [customEndDate, setCustomEndDate] = React.useState<Date | undefined>();
  const [openStartCalendar, setOpenStartCalendar] = React.useState(false);
  const [openEndCalendar, setOpenEndCalendar] = React.useState(false);

  const handleRangeChange = (value: string) => {
    setDateRange(value);
  };

  const getButtonText = () => {
    if (dateRange === "custom" && customStartDate && customEndDate) {
      return `${formatDate(customStartDate)} - ${formatDate(customEndDate)}`;
    }
    return dateRangeLabels[dateRange] || "Select Range";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-auto min-w-[200px] justify-start"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {getButtonText()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="start">
        <DropdownMenuLabel>Date range</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={dateRange}
          onValueChange={handleRangeChange}
        >
          <DropdownMenuRadioItem value="custom">
            <div className="flex w-full flex-col gap-3">
              <span>Custom date range</span>
              {dateRange === "custom" && (
                <div
                  className="flex flex-col gap-3 pl-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-muted-foreground">
                      Start Date
                    </span>
                    <Popover
                      open={openStartCalendar}
                      onOpenChange={setOpenStartCalendar}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !customStartDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {customStartDate
                            ? formatDate(customStartDate)
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={customStartDate}
                          onSelect={(date) => {
                            setCustomStartDate(date);
                            setOpenStartCalendar(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-muted-foreground">
                      End Date
                    </span>
                    <Popover
                      open={openEndCalendar}
                      onOpenChange={setOpenEndCalendar}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !customEndDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {customEndDate
                            ? formatDate(customEndDate)
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={customEndDate}
                          onSelect={(date) => {
                            setCustomEndDate(date);
                            setOpenEndCalendar(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuSeparator />
          <DropdownMenuRadioItem value="today">Today</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="yesterday">
            Yesterday
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="last-30-minutes">
            Last 30 minutes
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="last-12-hours">
            Last 12 hours
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="last-7-days">
            Last 7 days
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="last-30-days">
            Last 30 days
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="last-90-days">
            Last 90 days
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="last-365-days">
            Last 365 days
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="last-month">
            Last month
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="last-12-months">
            Last 12 months
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="last-year">
            Last year
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="week-to-date">
            Week to date
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="month-to-date">
            Month to date
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="quarter-to-date">
            Quarter to date
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="year-to-date">
            Year to date
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="all-time">
            All time
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
