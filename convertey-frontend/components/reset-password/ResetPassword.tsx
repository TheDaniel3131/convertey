"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createSupabaseClient } from "@/lib/utils/supabase/client";
import { FaArrowRight } from "react-icons/fa";

export default function ResetPasswordPage({
  setIsSuccess,
}: {
  setIsSuccess: (value: boolean) => void;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const supabase = createSupabaseClient();

  useEffect(() => {
    // ✅ Check if user is already signed in via Supabase recovery
    supabase.auth.getSession().then(({ data, error }) => {
      if (!data.session) {
        setError("Your session has expired. Please request a new reset link.");
        console.error("Session error:", error);
      }
    });
  }, [supabase]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setError(error.message);
        return;
      }

      setSuccess(true);
      setIsSuccess(true);

      setTimeout(() => {
        router.push("/login");
      }, 0);
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-start justify-center px-4 sm:px-6 lg:px-8 pt-12">
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
            Reset Your Password
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter your new password below.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success ? (
            <div className="text-sm text-green-600 dark:text-green-400 text-center">
              Password reset successful! Redirecting to login...
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <Label htmlFor="new-password" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  New Password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  required
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-emerald-400"
                />
              </div>

              <div>
                <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-11 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-emerald-400"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  "Resetting..."
                ) : (
                  <>
                    Reset Password
                    <FaArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="text-center flex justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Back to{" "}
            <Link
              href="/login"
              className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
