"use client";

import { getAuth } from "@/lib/isAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { QueryProvider } from "@/components/provider/query-provider";
import { useAuth } from "@/hooks/useAuth";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  //const { user, loading, login, logout } = useAuth();
  useEffect(() => {
    /*getAuth().then((data) => {
      if (data === null) {
        router.push("/login");
      } else {
        console.log("Utilisateur connecté :", data.payload);
      }
    });*/
    /*if (user === null) {
      router.push("/login");
    } else {
      console.log("Utilisateur connecté :", user);
    }*/
  }, [router]);

  return (
    <QueryProvider>
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
    </QueryProvider>
  );
};

export default DashboardLayout;
