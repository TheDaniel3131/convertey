"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

export type Message = {
  id: string;
  content: string;
  timestamp: Date;
  read: boolean;
  sender: "user" | "admin";
  status?: "pending" | "sent" | "replied";
};

type NotificationsContextType = {
  messages: Message[];
  unreadCount: number;
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
};

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Welcome to CosmoConverter! Need help getting started?",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: false,
      sender: "admin",
      status: "sent",
    },
    {
      id: "2",
      content: "Your file conversion is complete! Check it out.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      sender: "admin",
      status: "sent",
    },
  ]);

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setUnreadCount(messages.filter((msg) => !msg.read).length);
  }, [messages]);

  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    setMessages((prev) => [newMessage, ...prev]);
  };

  const markAsRead = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
  };

  const markAllAsRead = () => {
    setMessages((prev) => prev.map((msg) => ({ ...msg, read: true })));
  };

  return (
    <NotificationsContext.Provider
      value={{
        messages,
        unreadCount,
        addMessage,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  }
  return context;
}
