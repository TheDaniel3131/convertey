"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Sun,
  Moon,
  Menu,
  User,
  Info,
  DollarSign,
  Mail,
  // LayoutDashboard,
  LogOut,
  LogIn,
  UserPlus,
  // Bell,
  History,
} from "lucide-react";
import Link from "next/link";
import NavLink from "@/components/elements/header/NavLinks";
import { createSupabaseClient } from "@/lib/utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";
// import NotificationsPopover from "@/components/notification/NotificationsPopover";

/**
 * Added `forceUnauthenticated` prop so pages such as the password–reset flow
 * can *pretend* the user is logged‐out even though Supabase holds a temporary
 * recovery session.  This keeps the Header UI consistent with expectations.
 */
export default function Header({
  forceUnauthenticated = false,
}: {
  /**  If `true`, the header will *never* show the signed‑in state  */
  forceUnauthenticated?: boolean;
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [supabase] = useState(() => {
    const client = createSupabaseClient();
    if (!client) {
      console.error("Failed to create Supabase client");
      return null;
    }
    return client;
  });
  const router = useRouter();
  const pathname = usePathname();

  // ---------------------------------------------------------------------------
  // 1️⃣  Detect the real Supabase session
  // ---------------------------------------------------------------------------
  const checkUser = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session?.user) {
      setUser(null);
    } else {
      setUser({
        id: data.session.user.id,
        email: data.session.user.email ?? "",
      });
    }
  }, [supabase]);

  useEffect(() => {
    // Theme -----------------------------------------------------------
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Auth ------------------------------------------------------------
    if (!supabase) return;

    checkUser();

    // Listen for auth changes so header reacts instantly
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(
        session?.user
          ? { id: session.user.id, email: session.user.email ?? "" }
          : null
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [darkMode, supabase, checkUser]);

  // ---------------------------------------------------------------------------
  // 2️⃣  Treat user as *logged‑out* in specific situations
  //     – For example when we are on a recovery link ("/reset-password"), sign-up
  // ---------------------------------------------------------------------------
  const effectiveUser =
    forceUnauthenticated || pathname.startsWith("/reset-password")
      ? null
      : user;

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    await checkUser(); // force refresh
    router.push("/");
  };

  return (
    <header className="bg-transparent backdrop-blur-md dark:bg-opacity-33 shadow-md z-20 sticky top-0">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="flex items-center ml-2 mt-1">
          <Image
            src="/convertey-logo-transparent.png"
            alt="Convertey Logo"
            width={35}
            height={35}
          />
          <span
            className="ml-3 text-3xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight"
            style={{ fontFamily: "Ebrima" }}
          >
            Convertey
          </span>
        </Link>

        {/* -------------------- Desktop Navigation -------------------- */}
        <div className="hidden md:flex space-x-5 items-center font-semibold">
          {/* {effectiveUser && <NavLink href="/dashboard">Dashboard</NavLink>} */}
          <NavLink href="/about">About Us</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/contact">Contact Us</NavLink>
          <NavLink href="/donate">Donate</NavLink>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            className="rounded-full bg-transparent border-emerald-400 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* ---------- Auth controls (hidden if forceUnauthenticated) ---------- */}
          {effectiveUser ? (
            <>
              <Button
                variant="outline"
                size="icon"
                aria-label="History"
                onClick={() => router.push("/history")}
                className="rounded-full bg-transparent border-emerald-400 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400"
              >
                <History className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Settings"
                onClick={() => router.push("/dashboard/profile/settings")}
                className="rounded-full bg-transparent border-emerald-400 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400"
              >
                <User className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="rounded-full border-emerald-400 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => router.push("/login")}
                className="rounded-full border-emerald-400 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400 px-7 py-3"
              >
                Login
              </Button>
              <Button
                variant="default"
                onClick={() => router.push("/signup")}
                className="rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* -------------------- Mobile buttons -------------------- */}
        <div className="md:hidden flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            className="rounded-full mr-2 bg-transparent border-emerald-400 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="rounded-full text-emerald-600 dark:text-emerald-400"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      {/* -------------------- Mobile Navigation -------------------- */}
      {mobileMenuOpen && (
        <div className="md:hidden font-semibold text-center items-center justify-center bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md py-2">
          <NavLink
            href="/about"
            className="py-2 px-4 flex items-center justify-center my-2"
          >
            <Info className="mr-2" /> About
          </NavLink>
          <NavLink
            href="/pricing"
            className="py-2 px-4 flex items-center justify-center my-2"
          >
            <DollarSign className="mr-2" /> Pricing
          </NavLink>
          <NavLink
            href="/contact"
            className="py-2 px-4 flex items-center justify-center my-2"
          >
            <Mail className="mr-2" /> Contact
          </NavLink>

          {effectiveUser ? (
            <>
              {/* <NavLink
                href="/dashboard"
                className="py-2 px-4 flex items-center justify-center my-2"
              >
                <LayoutDashboard className="mr-2" /> Dashboard
              </NavLink> */}
              <NavLink
                href="/dashboard/profile/settings"
                className="py-2 px-4 flex items-center justify-center my-2"
              >
                <User className="mr-2" /> Profile
              </NavLink>
              <NavLink
                href="/history"
                className="py-2 px-4 flex items-center justify-center my-2"
              >
                <History className="mr-2" /> History
              </NavLink>
              <button
                onClick={handleSignOut}
                className="py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center my-2"
              >
                <LogOut className="mr-2" /> Sign Out
              </button>
            </>
          ) : (
            <>
              <NavLink
                href="/login"
                className="py-2 px-4 flex items-center justify-center my-2"
              >
                <LogIn className="mr-2" /> Login
              </NavLink>
              <NavLink
                href="/signup"
                className="py-2 px-4 flex items-center justify-center my-2"
              >
                <UserPlus className="mr-2" /> Sign Up
              </NavLink>
            </>
          )}
        </div>
      )}
    </header>
  );
}
