"use client";

import { useEffect } from "react";
import { mockDashboardData } from "@/data/mock-data";

export default function DemoPage() {
  useEffect(() => {
    sessionStorage.setItem(
      "colddev.clientSession",
      JSON.stringify({
        token: "demo-client-session",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        data: mockDashboardData,
      }),
    );
    window.location.replace("/dashboard");
  }, []);

  return <main className="loading-screen"><div className="loader" aria-label="Открываем демо" /></main>;
}

