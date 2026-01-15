"use client";

import * as React from "react";
import Image from "next/image";
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
  Package,
  Plug,
  Settings,
  ShoppingCart,
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
import { ModeToggle } from "@/components/mode-toggle";

const data = {
  user: {
    name: "Kishor Irnak",
    email: "kishorirnak@gmail.com",
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
      url: "#",
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
          url: "#",
        },
        {
          title: "Products",
          url: "#",
        },
        {
          title: "Customers",
          url: "#",
        },
      ],
    },
    {
      title: "Marketing",
      url: "#",
      icon: Megaphone,
      items: [
        {
          title: "Campaigns",
          url: "#",
        },
        {
          title: "Creatives",
          url: "#",
        },
        {
          title: "Performance",
          url: "#",
        },
      ],
    },
    {
      title: "Logistics",
      url: "#",
      icon: Truck,
      items: [
        {
          title: "Tracking",
          url: "#",
        },
        {
          title: "Returns",
          url: "#",
        },
        {
          title: "Warehouses",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChart3,
    },
    {
      title: "Automation",
      url: "#",
      icon: Zap,
    },
    {
      title: "Integrations",
      url: "#",
      icon: Plug,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({
    Dashboard: true,
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Determine which logo to use based on theme
  // Use dark logo as default during SSR to avoid hydration mismatch
  const currentTheme = mounted ? resolvedTheme || theme : "dark";
  const logoSrc =
    currentTheme === "dark" ? "/orbit360-logo.png" : "/orbit360-logoBlack.png";

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden">
                <Image
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
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <>
                      <SidebarMenuButton
                        tooltip={item.title}
                        onClick={() => toggleItem(item.title)}
                        isActive={item.isActive}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight
                          className={`ml-auto transition-transform duration-200 ${
                            openItems[item.title] ? "rotate-90" : ""
                          }`}
                        />
                      </SidebarMenuButton>

                      {openItems[item.title] && (
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={item.isActive}
                      asChild
                    >
                      <a href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-1.5">
              <ModeToggle />
              <span className="text-sm font-medium">Theme</span>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="h-8 w-8 rounded-lg bg-slate-200 flex items-center justify-center">
                <span className="text-xs font-medium text-black">KI</span>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{data.user.name}</span>
                <span className="truncate text-xs">{data.user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
