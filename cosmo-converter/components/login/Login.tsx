"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rocket } from "lucide-react";
import { createSupabaseClient } from "@/lib/utils/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);  // Fix this line
  const router = useRouter();
  const supabase = createSupabaseClient();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
  
    if (!supabase) {
      setError("Supabase client not initialized");
      setIsLoading(false);
      return;
    }
  
    try {
      console.log("Attempting login..."); // Debug log
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });
  
      if (error) {
        console.error("Login error:", error); // Debug log
        if (error.message === "Invalid login credentials") {
          setError("Invalid email or password. Please try again.");
        } else {
          setError(error.message);
        }
        setIsLoading(false);
        return;
      }
  
      if (data.user) {
        console.log("Login successful, redirecting..."); // Debug log
        localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
        
        // Try both methods of navigation
        try {
          await router.push("/dashboard");
          // As a fallback, use window.location
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        } catch (navigationError) {
          console.error("Navigation error:", navigationError);
          // If router.push fails, force navigation
          window.location.href = "/dashboard";
        }
      } else {
        console.log("No user data returned"); // Debug log
        setError("Login successful but no user data returned");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="stars"></div>
      <Card className="w-full max-w-md space-y-8 bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
        <CardHeader>
          <div className="text-center">
            <Image
              src="/placeholder.svg"
              alt="Cosmo Converter Logo"
              width={64}
              height={64}
              className="mx-auto h-16 w-16"
            />
            <CardTitle className="mt-6 text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Sign in to Cosmo Converter
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <Label htmlFor="email-address" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="bg-white/5"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="bg-white/5"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                  className="mr-2"
                />
                <Label htmlFor="remember-me" className="text-sm">
                  Remember me
                </Label>
              </div>
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-purple-400 hover:text-purple-300"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
            <Button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-2 px-4 text-sm font-medium"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Rocket
                    className="h-5 w-5 text-purple-300 group-hover:text-purple-200"
                    aria-hidden="true"
                  />
                </span>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-sm text-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-purple-400 hover:text-purple-300"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
