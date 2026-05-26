"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await apiClient.getMe();

        // Có đăng nhập
        router.replace("/dashboard");
      } catch {
        // Chưa đăng nhập
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg">Checking authentication...</p>
    </div>
  );
}
