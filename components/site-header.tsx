"use client";

import * as React from "react";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSearchParams } from "next/navigation";

import { Suspense } from "react";

export function SiteHeader() {
  return (
    <header className="flex h-[--header-height] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 p-2">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Suspense
          fallback={<div className="h-4 w-32 animate-pulse bg-muted rounded" />}
        >
          <HeaderBreadcrumbs />
        </Suspense>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://www.evoclabs.com/"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              Evoc Labs.
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function HeaderBreadcrumbs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");

  const segments = pathname.split("/").filter((segment) => segment.length > 0);

  const capitalize = (str: string) =>
    str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.length === 0 ? (
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        ) : (
          segments.map((segment, index) => {
            const isLast = index === segments.length - 1 && !activeTab;
            const href = `/${segments.slice(0, index + 1).join("/")}`;

            return (
              <Fragment key={href}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href}>
                      {capitalize(segment)}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < segments.length - 1 && <BreadcrumbSeparator />}
                {index === segments.length - 1 && activeTab && (
                  <BreadcrumbSeparator />
                )}
              </Fragment>
            );
          })
        )}

        {activeTab && (
          <BreadcrumbItem>
            <BreadcrumbPage>{capitalize(activeTab)}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
