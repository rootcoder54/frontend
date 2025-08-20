"use client";
import { useAuth } from "@/hooks/useAuth";
import "../globals.css";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();
  if (user) {
    router.push("/");
  }
  return (
    <div className="bg-zinc-200 min-h-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
