"use client";

import React from "react";
import { format } from "date-fns";
import { Check, CheckCheck } from "lucide-react";
import {
  useNotifications,
  type Message,
} from "@/components/contexts/NotificationsContext";

export function NotificationMessage({ message }: { message: Message }) {
  const { markAsRead } = useNotifications();

  React.useEffect(() => {
    if (!message.read) {
      const timer = setTimeout(() => {
        markAsRead(message.id);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message.id, message.read, markAsRead]);

  return (
    <div
      className={`p-3 rounded-lg transition-colors ${
        message.read
          ? "bg-gray-100 dark:bg-gray-800"
          : "bg-blue-50 dark:bg-blue-900/20"
      }`}
      onClick={() => markAsRead(message.id)}
    >
      <div className="flex justify-between items-start mb-1">
        <span className="font-medium">
          {message.sender === "admin" ? "CosmoConverter Team" : "You"}
        </span>
        <span className="text-xs text-gray-500">
          {format(message.timestamp, "MMM d, h:mm a")}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {message.content}
      </p>
      {message.sender === "user" && message.status && (
        <div className="flex items-center justify-end mt-1">
          {message.status === "sent" ? (
            <Check className="h-4 w-4 text-gray-400" />
          ) : message.status === "replied" ? (
            <CheckCheck className="h-4 w-4 text-blue-500" />
          ) : null}
        </div>
      )}
    </div>
  );
}
