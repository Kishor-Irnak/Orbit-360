"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // We treat '/' and '/login' as auth pages where sidebar/header should be hidden
  const isAuthPage = pathname === "/" || pathname === "/login";

  return (
    <SidebarProvider>
      {!isAuthPage && <AppSidebar variant="inset" />}
      <SidebarInset
        className={isAuthPage ? "bg-white dark:bg-white min-h-screen" : ""}
      >
        {!isAuthPage && <SiteHeader />}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
