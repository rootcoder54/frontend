"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { QueryProvider } from "@/components/provider/query-provider";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LOGOUT_URL } from "@/types/constant";
import { Spinner } from "@/components/features/spinner";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.replace(LOGOUT_URL);
    }
  }, [user, router, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-row items-center justify-center">
        {" "}
        <Spinner />
      </div>
    );
  }
  if (!user) {
    // On retourne rien, car le router va rediriger
    return null;
  }
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
        <SidebarInset>
          <ScrollArea className="rounded-md h-[calc(100vh-40px)]">
            {children}
          </ScrollArea>
        </SidebarInset>
      </SidebarProvider>
    </QueryProvider>
  );
};

export default DashboardLayout;
