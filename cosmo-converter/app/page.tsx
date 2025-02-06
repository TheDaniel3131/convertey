"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Rocket, FileUp, Zap, Globe, Sun, Moon, Menu } from "lucide-react"
import Link from "next/link"
import type React from "react" // Import React

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function Home() {
  const [darkMode, setDarkMode] = useState<boolean>(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="stars"></div>
      <header className="bg-transparent backdrop-blur-md dark:bg-opacity-20 shadow-md relative z-20">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          >
            CosmoCrafters
          </Link>
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
              className="rounded-full ml-4 bg-transparent border-purple-400 dark:border-purple-600 text-purple-600 dark:text-purple-400"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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
            <NavLink href="/contact" className="block py-2 px-4">
              Contact
            </NavLink>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600">
            Cosmo Converter
          </h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
            Transform your files across the digital universe
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full"
          >
            <Rocket className="mr-2 h-5 w-5" /> Launch Converter
          </Button>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Cosmic Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FileUp className="h-10 w-10 text-purple-500" />}
              title="Universal Formats"
              description="Convert files across dimensions and formats with unparalleled precision."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-pink-500" />}
              title="Quantum Speed"
              description="Experience conversions at the speed of light, powered by advanced algorithms."
            />
            <FeatureCard
              icon={<Globe className="h-10 w-10 text-blue-500" />}
              title="Galactic Access"
              description="Access and convert your files from any corner of the known universe."
            />
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Ready to Transform Your Files?
            </h2>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
              Join Cosmo Converter today and experience the future of file conversion across the digital universe.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full"
              >
                Sign Up Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-purple-500 text-purple-500 hover:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-transparent backdrop-blur-md dark:bg-opacity-20 py-12 mt-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">About Us</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                CosmoCrafters is revolutionizing file conversion with our cutting-edge Cosmo Converter technology.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#demo"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
                  >
                    Try It
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">Connect</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">&copy; 2025 CosmoCrafters. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg p-6 rounded-lg text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="mb-4 transform transition-transform duration-300 hover:scale-110 flex justify-center items-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}

function NavLink({ href, children, className = "" }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 ${className}`}
    >
      {children}
    </Link>
  )
}

