"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  BarChart3,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  Command,
  Cog,
  LayoutDashboard,
  Megaphone,
  Moon,
  Package,
  Plug,
  Settings,
  ShoppingCart,
  Sun,
  Truck,
  Zap,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Kishor Irnak",
    email: "kishorirnak@gmail.com",
    avatar: "",
  },
  teams: [
    {
      name: "Orbit 360",
      logo: Command,
      plan: "Powered by Evoc Labs.",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Sales",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "Orders",
          url: "/sales/orders",
        },
        {
          title: "Products",
          url: "/sales/products",
        },
        {
          title: "Customers",
          url: "/sales/customers",
        },
      ],
    },
    {
      title: "Marketing",
      url: "#",
      icon: Megaphone,
      items: [
        {
          title: "Performance",
          url: "/marketing/performance",
        },
        {
          title: "Campaigns",
          url: "/marketing/campaigns",
        },
        {
          title: "Creatives",
          url: "/marketing/creatives",
        },
      ],
    },
    {
      title: "Logistics",
      url: "#",
      icon: Truck,
      items: [
        {
          title: "Inventory",
          url: "/logistics/inventory",
        },
        {
          title: "Tracking",
          url: "/logistics/tracking",
        },
        {
          title: "Returns",
          url: "/logistics/returns",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
    },
    {
      title: "Automation",
      url: "/automation",
      icon: Zap,
    },
    {
      title: "Integrations",
      url: "/integrations",
      icon: Plug,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { NavMain } from "@/components/nav-main";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Determine active state helper
  const isActive = (url: string) => {
    if (url === "/" && pathname === "/") return true;
    if (url === "/") return false;

    // Normalize both by removing trailing slashes for comparison
    const normalizedPath = pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
    const normalizedUrl = url.endsWith("/") ? url.slice(0, -1) : url;

    return normalizedPath === normalizedUrl;
  };

  // Update open items based on current path
  React.useEffect(() => {
    const newOpenItems: Record<string, boolean> = { ...openItems };

    data.navMain.forEach((item) => {
      // Check if any sub-item matches the current path
      if (item.items) {
        const hasActiveSubItem = item.items.some((subItem) =>
          isActive(subItem.url),
        );
        if (hasActiveSubItem) {
          newOpenItems[item.title] = true;
        }
      }
    });

    if (Object.keys(newOpenItems).length > Object.keys(openItems).length) {
      setOpenItems(newOpenItems);
    }
  }, [pathname]);

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  // Determine which logo to use based on theme
  // Use dark logo as default during SSR to avoid hydration mismatch
  const currentTheme = mounted ? resolvedTheme || theme : "dark";
  const basePath = process.env.NODE_ENV === "production" ? "/Orbit-360" : "";
  const logoSrc =
    currentTheme === "dark"
      ? `${basePath}/orbit360-logo.png`
      : `${basePath}/orbit360-logoBlack.png`;

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden">
                <img
                  src={logoSrc}
                  alt="Orbit 360 Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain.map((item) => ({
            ...item,
            isActive: item.items
              ? item.items.some((sub) => isActive(sub.url))
              : isActive(item.url),
          }))}
        />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-foreground">
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {mounted && resolvedTheme === "dark"
                    ? "Dark Mode"
                    : "Light Mode"}
                </span>
                <span className="truncate text-xs">
                  Switch to{" "}
                  {mounted && resolvedTheme === "dark" ? "light" : "dark"}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <NavUser user={data.user} />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
