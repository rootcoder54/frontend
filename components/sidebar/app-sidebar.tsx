"use client";

import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconInnerShadowTop,
  IconListDetails,
  IconUsers
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { usePathname } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg"
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/",
        icon: IconChartBar,
        isSelect: false
      },
      {
        title: "Test",
        url: "/test",
        icon: IconDashboard,
        isSelect: pathname.startsWith("/test")
      },
      {
        title: "Lifecycle",
        url: "#",
        icon: IconListDetails,
        isSelect: false
      },
      {
        title: "Analytics",
        url: "#",
        icon: IconChartBar,
        isSelect: false
      },
      {
        title: "Projects",
        url: "#",
        icon: IconFolder,
        isSelect: false
      },
      {
        title: "Team",
        url: "#",
        icon: IconUsers,
        isSelect: false
      }
    ]
  };
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />{" "}
      </SidebarFooter>
    </Sidebar>
  );
}
