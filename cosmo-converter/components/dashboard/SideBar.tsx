"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Home,
  FileUp,
  History,
  Settings,
  LogOut,
  Menu,
  BarChart,
  X,
} from "lucide-react";
import { createSupabaseClient } from "@/lib/utils/supabase/client";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: FileUp, label: "Convert", href: "/dashboard/convert" },
  { icon: History, label: "History", href: "/dashboard/history" },
  { icon: BarChart, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [supabase] = useState(() => {
    const client = createSupabaseClient();
    if (!client) {
      console.error("Failed to create Supabase client");
      return null;
    }
    return client;
  });

  // Dark mode handling
  useEffect(() => {
    if (!supabase) return;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, [supabase]);

  // Auth handling
  useEffect(() => {
    if (!supabase) return;
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user ? { id: user.id, email: user.email ?? "" } : null);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setUser(
          session?.user
            ? { id: session.user.id, email: session.user.email ?? "" }
            : null
        );
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push("/");
  };

  // Close sidebar on route change/resize
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu />
      </Button>

      <div
        className={`
        fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity 
        ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside
        className={`
        fixed left-0 top-0 z-50 h-screen w-64 
        bg-white dark:bg-gray-900 
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:h-screen
      `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-20 px-4 border-b border-gray-200 dark:border-gray-700">
            <Link href="/" className="flex items-center ml-2 mt-1">
              <Image
                src={
                  darkMode
                    ? "/cosmoconverter-home-light.png"
                    : "/cosmoconverter-home-dark.png"
                }
                alt="CosmoConverter Logo"
                width={250}
                height={48.44}
              />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} passHref>
                    <Button
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      className="w-full justify-start dark:hover:bg-gray-800"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {user ? (
              <Button
                variant="outline"
                className="w-full dark:hover:bg-gray-800"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full dark:hover:bg-gray-800"
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="default"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
