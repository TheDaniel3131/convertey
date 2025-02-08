import type { ReactNode } from "react";
import SideBar from "@/components/dashboard/SideBar";
import NotificationsPopover from "@/components/notification/NotificationsPopover";
import LoadingTransition from "@/components/Transitioning";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <LoadingTransition>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <SideBar />
        <div className="flex-1 flex flex-col">
          <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-end">
              <NotificationsPopover />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
        </div>
      </div>
    </LoadingTransition>
  );
}
