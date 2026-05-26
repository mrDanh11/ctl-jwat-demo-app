"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";

export default function DashboardPage() {
  const router = useRouter();
  const { logout, loading } = useAuth();

  useEffect(() => {
    const exp = localStorage.getItem("token_exp");

    // There's no token expiration time, force logout
    if (!exp) {
      router.replace("/login");
      return;
    }

    // Calculate remaining time until token expiration
    const remainingTime = Number(exp) * 1000 - Date.now();

    // Token has already expired, force logout
    if (remainingTime <= 0) {
      localStorage.removeItem("token_exp");
      router.replace("/login");
      return;
    }

    // Auto logout when token expires
    const timeout = setTimeout(() => {
      localStorage.removeItem("token_exp");
      router.replace("/login");
    }, remainingTime);

    // Cleanup
    return () => clearTimeout(timeout);
  }, [router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      <p className="text-xl text-green-600">Login successfully!</p>

      <button
        onClick={handleLogout}
        disabled={loading}
        className="rounded-lg bg-red-500 px-6 py-3 text-white transition hover:bg-red-600 disabled:opacity-50"
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
