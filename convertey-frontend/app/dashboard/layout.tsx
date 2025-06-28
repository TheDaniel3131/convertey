"use client";

import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import SideBar from "@/components/dashboard/SideBar";
import NotificationsPopover from "@/components/notification/NotificationsPopover";
import LoadingTransition from "@/components/Transitioning";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Search } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <LoadingTransition>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <SideBar darkMode={darkMode} />
        <div className="flex-1 flex flex-col">
          <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-end items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  <Search className="absolute left-2 top-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                  aria-label="Toggle theme"
                  className="rounded-full bg-transparent border-purple-400 dark:border-purple-600 text-purple-600 dark:text-purple-400"
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
                <NotificationsPopover />
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
        </div>
      </div>
    </LoadingTransition>
  );
}
