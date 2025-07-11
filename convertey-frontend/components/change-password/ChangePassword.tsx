"use client";

import { useState } from "react";
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
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createSupabaseClient();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!supabase) {
      setError("Supabase client not initialized");
      setIsLoading(false);
      return;
    }

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // First, verify the current password by attempting to sign in
      const { data: user } = await supabase.auth.getUser();
      if (!user.user?.email) {
        setError("User not found. Please log in again.");
        setIsLoading(false);
        return;
      }

      // Verify current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.user.email,
        password: currentPassword,
      });

      if (signInError) {
        setError("Current password is incorrect");
        setIsLoading(false);
        return;
      }

      // Update to new password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError(updateError.message);
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-start justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:py-8 md:py-12">
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
            Change Password
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Update your password to keep your account secure
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {isSuccess && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg text-sm text-center">
              Password changed successfully!
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <Label
                htmlFor="current-password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block"
              >
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  required
                  placeholder="Enter your current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="h-11 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-emerald-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <Label
                htmlFor="new-password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block"
              >
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  required
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-11 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-emerald-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <Label
                htmlFor="confirm-password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block"
              >
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-11 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-emerald-400 pr-10 mb-6"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                "Updating..."
              ) : (
                <>
                  Change Password
                  <FaArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center justify-center flex pt-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need to go back?{" "}
            <Link
              href="/profile"
              className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Return to Profile
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
