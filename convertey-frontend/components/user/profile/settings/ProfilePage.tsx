"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { createSupabaseClient } from "@/lib/utils/supabase/client";
import { toast } from "sonner";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function ProfilePage() {
  const [supabase] = useState(() => createSupabaseClient());
  const router = useRouter();
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
  });

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 2FA States
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [twoFALoading, setTwoFALoading] = useState(false);

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setPersonalInfo({
            fullName: user.user_metadata?.full_name || "",
            email: user.email || "",
          });

          // Get avatar URL if it exists
          if (user.user_metadata?.avatar_url) {
            setAvatarUrl(user.user_metadata.avatar_url);
            setPreviewAvatar(user.user_metadata.avatar_url);
          }

          // Check if 2FA is enabled
          setTwoFAEnabled(user.user_metadata?.two_factor_enabled || false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
      }
    };

    fetchUserData();
  }, [supabase]);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || !e.target.files[0]) return;

      const file = e.target.files[0];

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size must be less than 5MB");
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        throw new Error("File must be an image");
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;

      // Show preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewAvatar(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);

      setLoading(true);

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fileName);

      // Update user metadata with new avatar URL
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to upload profile picture"
      );
      // Reset preview to the last valid avatar if upload fails
      setPreviewAvatar(avatarUrl);
    } finally {
      setLoading(false);
    }
  };

  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email before submission
    if (!isValidEmail(personalInfo.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      // If email is being changed
      if (
        personalInfo.email !== (await supabase.auth.getUser()).data.user?.email
      ) {
        const { error } = await supabase.auth.updateUser({
          email: personalInfo.email,
        });

        if (error) {
          if (error.message.includes("invalid")) {
            toast.error("Please enter a valid email address");
          } else {
            toast.error(error.message);
          }
          return;
        }

        toast.success(
          "A verification email has been sent to your new email address. Please check your inbox to confirm the change."
        );
        return;
      }

      // If only updating name
      const { error } = await supabase.auth.updateUser({
        data: { full_name: personalInfo.fullName },
      });

      if (error) throw error;

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update profile");
      }
    } finally {
      setLoading(false);
    }
  };

  // Generate QR Code for 2FA setup
  const generateQRCode = async () => {
    try {
      setTwoFALoading(true);
      const response = await fetch("/api/auth/2fa/qrcode");
      const data = await response.json();

      if (response.ok) {
        setQrCodeData(data.data);
        setSecret(data.secret);
        setShowQRDialog(true);
      } else {
        throw new Error(data.error || "Failed to generate QR code");
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
      toast.error("Failed to generate QR code");
    } finally {
      setTwoFALoading(false);
    }
  };

  // Verify 2FA code and enable 2FA
  const verifyAndEnable2FA = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error("Please enter a 6-digit verification code");
      return;
    }

    try {
      setTwoFALoading(true);

      // Verify the code with your backend
      const response = await fetch("/api/auth/2fa/verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: verificationCode,
          secret: secret,
        }),
      });

      const data = await response.json();

      if (response.ok && data.verified) {
        // Update user metadata to enable 2FA
        const { error } = await supabase.auth.updateUser({
          data: {
            two_factor_enabled: true,
            two_factor_secret: secret, // Store the secret securely
          },
        });

        if (error) throw error;

        setTwoFAEnabled(true);
        setShowQRDialog(false);
        setVerificationCode("");
        toast.success("Two-factor authentication enabled successfully!");
      } else {
        toast.error("Invalid verification code. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying 2FA:", error);
      toast.error("Failed to verify code");
    } finally {
      setTwoFALoading(false);
    }
  };

  // Disable 2FA
  const disable2FA = async () => {
    try {
      setTwoFALoading(true);

      const { error } = await supabase.auth.updateUser({
        data: {
          two_factor_enabled: false,
          two_factor_secret: null,
        },
      });

      if (error) throw error;

      setTwoFAEnabled(false);
      toast.success("Two-factor authentication disabled successfully!");
    } catch (error) {
      console.error("Error disabling 2FA:", error);
      toast.error("Failed to disable 2FA");
    } finally {
      setTwoFALoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <div className="py-8">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-emerald-400 dark:text-white">
            Settings
          </h1>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 dark:text-white">
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <form onSubmit={handlePersonalInfoSubmit}>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-20 w-20 ring-2 ring-emerald-500 ring-offset-2">
                        <AvatarImage src={previewAvatar || ""} alt="Profile" />
                        <AvatarFallback className="bg-emerald-500 text-white text-xl">
                          {personalInfo.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div>
                          <Label
                            htmlFor="avatar"
                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Profile Picture
                          </Label>
                          <div className="mt-1">
                            <Input
                              id="avatar"
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarChange}
                              disabled={loading}
                              className="hidden"
                            />
                            <Label
                              htmlFor="avatar"
                              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {loading ? "Uploading..." : "Choose File"}
                            </Label>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Max file size: 5MB
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="fullName"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={personalInfo.fullName}
                        onChange={handlePersonalInfoChange}
                        disabled={loading}
                        className="mt-1"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={handlePersonalInfoChange}
                        disabled={loading}
                        className={`mt-1 ${
                          !isValidEmail(personalInfo.email) &&
                          personalInfo.email
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder="Enter your email address"
                      />
                      {!isValidEmail(personalInfo.email) &&
                        personalInfo.email && (
                          <p className="text-sm text-red-500 mt-1">
                            Please enter a valid email address
                          </p>
                        )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <div className="space-y-6">
                {/* Change Password Section */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800 dark:text-white">
                      Change Your Password
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      type="button"
                      variant="outline"
                      className="px-6 py-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900"
                      onClick={() => {
                        router.push("/profile/change-password");
                      }}
                    >
                      Change Password
                    </Button>
                    {/* <p className="text-sm text-gray-500 mt-2 text-center">
                      Click to update your account password
                    </p> */}
                  </CardContent>
                </Card>

                {/* Two-Factor Authentication Section */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800 dark:text-white">
                      Two-Factor Authentication
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          Authenticator App
                        </h3>
                        <p className="text-sm text-gray-500">
                          {twoFAEnabled
                            ? "Two-factor authentication is currently enabled"
                            : "Use an authenticator app to generate secure codes"}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {twoFAEnabled && (
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-green-600 font-medium">
                              Enabled
                            </span>
                          </div>
                        )}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={twoFALoading}
                          className={`${
                            twoFAEnabled
                              ? "border-red-600 text-red-600 hover:bg-red-50"
                              : "border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                          } dark:hover:bg-emerald-900`}
                          onClick={twoFAEnabled ? disable2FA : generateQRCode}
                        >
                          {twoFALoading
                            ? "Processing..."
                            : twoFAEnabled
                            ? "Disable"
                            : "Enable"}
                        </Button>
                      </div>
                    </div>

                    {/* <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          SMS Authentication
                        </h3>
                        <p className="text-sm text-gray-500">
                          Receive verification codes via text message
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900"
                        onClick={() => {
                          toast.info("SMS 2FA setup functionality coming soon");
                        }}
                      >
                        Enable
                      </Button>
                    </div> */}

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-blue-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                            About Two-Factor Authentication
                          </h3>
                          <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                            <p>
                              Two-factor authentication adds an extra layer of
                              security to your account by requiring a second
                              form of verification.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* 2FA Setup Dialog */}
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Set up Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Scan the QR code below with your authenticator app, then enter the
              6-digit code to verify.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            {qrCodeData && (
              <div className="flex justify-center p-4 bg-white rounded-lg">
                <Image
                  src={qrCodeData}
                  alt="QR Code"
                  width={192}
                  height={192}
                  className="w-48 h-48"
                />
              </div>
            )}
            <div className="w-full space-y-2">
              <Label htmlFor="verification-code">Verification Code</Label>
              <Input
                id="verification-code"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
            </div>
            <div className="flex space-x-3 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowQRDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={verifyAndEnable2FA}
                disabled={twoFALoading || verificationCode.length !== 6}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {twoFALoading ? "Verifying..." : "Verify & Enable"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
