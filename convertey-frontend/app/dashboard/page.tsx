"use client";

import { useState, useEffect } from "react";
import { DashboardContent } from "@/components/dashboard/Dashboard";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null; // The LoadingTransition component will handle the loading state
  }

  return (
    <div className="space-y-6">
      <DashboardContent />
    </div>
  );
}
