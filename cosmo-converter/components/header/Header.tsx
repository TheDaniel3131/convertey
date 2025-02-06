"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, User } from "lucide-react";
import Link from "next/link";
import type { NavLinkProps } from "@/types/interfaces";

export default function Header() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="bg-transparent backdrop-blur-md dark:bg-opacity-33 shadow-md z-20 sticky top-0">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center ml-2 mt-1">
          <Image
            src={
              darkMode
                ? "/cosmoconverter-home-light.png"
                : "/cosmoconverter-home-dark.png"
            }
            alt="CosmoConverter Icon"
            width={250}
            height={250}
            className=""
          />
          {/* <span className="text-2xl uppercase font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        CosmoConverter
          </span> */}
        </Link>
        <div className="hidden md:flex space-x-6 items-center font-semibold">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/contact">Contact Us</NavLink>
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
          <Button
            variant="outline"
            size="icon"
            aria-label="Login"
            className="rounded-full bg-transparent border-purple-400 dark:border-purple-600 text-purple-600 dark:text-purple-400"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
        <div className="md:hidden flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            className="rounded-full mr-2 bg-transparent border-purple-400 dark:border-purple-600 text-purple-600 dark:text-purple-400"
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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="rounded-full text-purple-600 dark:text-purple-400"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md py-2">
          <NavLink href="/" className="block py-2 px-4">
            Home
          </NavLink>
          <NavLink href="/about" className="block py-2 px-4">
            About
          </NavLink>
          <NavLink href="/pricing" className="block py-2 px-4">
            Pricing
          </NavLink>
          <NavLink href="/contact" className="block py-2 px-4">
            Contact
          </NavLink>
          <NavLink href="/login" className="block py-2 px-4">
            Login
          </NavLink>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children, className = "" }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 ${className}`}
    >
      {children}
    </Link>
  );
}
