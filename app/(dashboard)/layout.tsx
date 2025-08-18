"use client";

import { getAuth } from "@/lib/isAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    getAuth().then((data) => {
      if (data === null) {
        router.push("/login");
      }
      console.log("Utilisateur connecté :", data?.payload);
    });
  }, []);
  return <div>{children}</div>;
};

export default DashboardLayout;
