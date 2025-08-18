"use client";

import { getAuth } from "@/lib/isAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    getAuth().then((data) => {
      if (data === null) {
        router.push("/login");
      } else {
        console.log("Utilisateur connecté :", data.payload);
      }
    });
  }, [router]);
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)"
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
