"use client";
import { useAuth } from "@/hooks/useAuth";
import "../globals.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/features/spinner";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-row items-center justify-center">
        {" "}
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className="bg-zinc-200 min-h-screen flex flex-col items-center justify-center">
        {children}
      </div>
    );
  }
};

export default AuthLayout;
