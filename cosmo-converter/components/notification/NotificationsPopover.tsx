"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const notifications = [
  { id: 1, message: "Your file conversion is complete", read: false },
  {
    id: 2,
    message: "New feature: Advanced conversion options now available",
    read: true,
  },
  { id: 3, message: "Maintenance scheduled for tonight", read: false },
];

export default function NotificationsPopover() {
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter((n) => !n.read).length
  );

  const markAllAsRead = () => {
    setUnreadCount(0);
    // Implement logic to mark all notifications as read
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Notifications"
          // onClick={() => router.push("/notifications")}
          className="relative rounded-full bg-transparent border-purple-400 dark:border-purple-600 text-purple-600 dark:text-purple-400"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 h-4 w-4 rounded-full bg-blue-500 text-xs text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Notifications</h3>
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </div>
        <div className="space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-2 rounded ${
                notification.read ? "bg-gray-100" : "bg-blue-50"
              }`}
            >
              {notification.message}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
