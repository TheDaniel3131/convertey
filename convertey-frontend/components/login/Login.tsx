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
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { createSupabaseClient } from "@/lib/utils/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      console.log("Attempting login...");
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error("Login error:", error);
        if (error.message === "Invalid login credentials") {
          setError("Invalid email or password. Please try again.");
        } else {
          setError(error.message);
        }
        setIsLoading(false);
        return;
      }

      if (data.user) {
        console.log("Login successful, redirecting...");
        localStorage.setItem("rememberMe", JSON.stringify(rememberMe));

        try {
          await router.push("/dashboard");
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        } catch (navigationError) {
          console.error("Navigation error:", navigationError);
          window.location.href = "/dashboard";
        }
      } else {
        console.log("No user data returned");
        setError("Login successful but no user data returned");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google") => {
    setError(null);
    setIsLoading(true);

    if (!supabase) {
      setError("Supabase client not initialized");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
      });

      if (error) {
        console.error("OAuth error:", error);
        setError(error.message);
        setIsLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Unexpected OAuth error:", err);
      setError("An unexpected error occurred during OAuth login");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="stars"></div>
        <Card className="w-full max-w-md bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800/30">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-white shadow-md flex items-center justify-center border-slate-100 border">
              <Image
              src="/placeholder.svg"
              alt="Convertey Logo"
              width={32}
              height={32}
              className="h-8 w-8"
              />
            </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Convertey
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email-address" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Email Address
                </Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="h-11 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-emerald-400"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="h-11 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-emerald-400 pr-10"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    onClick={togglePasswordVisibility}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-4 w-4" />
                    ) : (
                      <FaEye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                  className="border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <Label htmlFor="remember-me" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  Sign in
                  <FaArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            onClick={() => handleOAuthLogin("google")}
            disabled={isLoading}
            variant="outline"
            className="w-full h-11 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center"
          >
            <FcGoogle className="h-5 w-5 mr-3" />
            Continue with Google
          </Button>
        </CardContent>
        
        <CardFooter className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Create account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
