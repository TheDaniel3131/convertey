"use client";

import { useState, useEffect } from "react";
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
import { createSupabaseClient } from "@/lib/utils/supabase/client";
import { toast } from "sonner";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function ProfilePage() {
  const [supabase] = useState(() => createSupabaseClient());
  
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
  });

  const [newPassword, setNewPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
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
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error("Failed to load user data");
      }
    };

    fetchUserData();
  }, [supabase]);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || !e.target.files[0]) return;

      const file = e.target.files[0];
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB');
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      const fileExt = file.name.split('.').pop();
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
      const { error: uploadError } = await supabase
        .storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update user metadata with new avatar URL
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error(error instanceof Error ? error.message : "Failed to upload profile picture");
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
      if (personalInfo.email !== (await supabase.auth.getUser()).data.user?.email) {
        const { error } = await supabase.auth.updateUser({
          email: personalInfo.email
        });
        
        if (error) {
          if (error.message.includes("invalid")) {
            toast.error("Please enter a valid email address");
          } else {
            toast.error(error.message);
          }
          return;
        }
        
        toast.success("A verification email has been sent to your new email address. Please check your inbox to confirm the change.");
        return;
      }

      // If only updating name
      const { error } = await supabase.auth.updateUser({
        data: { full_name: personalInfo.fullName }
      });

      if (error) throw error;

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update profile");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword.current || !newPassword.new || !newPassword.confirm) {
      toast.error("Please fill in all password fields");
      return;
    }
  
    if (newPassword.new.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }
  
    if (newPassword.new !== newPassword.confirm) {
      toast.error("New passwords do not match");
      return;
    }
  
    // Add check for new password being same as current password
    if (newPassword.new === newPassword.current) {
      toast.error("New password must be different from your current password");
      return;
    }
  
    try {
      setLoading(true);
  
      // Get the user's email
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) {
        throw new Error('User email not found');
      }
  
      // Reauthenticate with current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: newPassword.current
      });
  
      if (signInError) {
        if (signInError.message.includes("Invalid login credentials")) {
          toast.error("Current password is incorrect");
        } else {
          toast.error(signInError.message);
        }
        return;
      }
  
      // Now update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword.new
      });
  
      if (updateError) {
        if (updateError.message.includes("different from the old password")) {
          toast.error("New password must be different from your current password");
        } else {
          throw updateError;
        }
        return;
      }
  
      setNewPassword({ current: "", new: "", confirm: "" });
      toast.success("Password updated successfully");
    } catch (error) {
      console.error('Error updating password:', error);
      if (error instanceof Error) {
        if (error.message.includes("reauthentication")) {
          toast.error("Please try again with your current password");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error("Failed to update password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">

      <Header />
      <div className="py-8">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-emerald-400 dark:text-white">My Profile</h1>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 dark:text-white">Personal Information</CardTitle>
              </CardHeader>
              <form onSubmit={handlePersonalInfoSubmit}>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20 ring-2 ring-emerald-500 ring-offset-2">
                      <AvatarImage src={previewAvatar || ""} alt="Profile" />
                      <AvatarFallback className="bg-emerald-500 text-white text-xl">
                        {personalInfo.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Label htmlFor="avatar" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Profile Picture
                      </Label>
                      <Input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        disabled={loading}
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={handlePersonalInfoChange}
                      disabled={loading}
                      className={`mt-1 ${!isValidEmail(personalInfo.email) && personalInfo.email ? "border-red-500" : ""}`}
                      placeholder="Enter your email address"
                    />
                    {!isValidEmail(personalInfo.email) && personalInfo.email && (
                      <p className="text-sm text-red-500 mt-1">Please enter a valid email address</p>
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
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 dark:text-white">Change Password</CardTitle>
              </CardHeader>
              <form onSubmit={handlePasswordSubmit}>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Current Password
                    </Label>
                    <Input
                      id="currentPassword"
                      name="current"
                      type="password"
                      value={newPassword.current}
                      onChange={handlePasswordChange}
                      disabled={loading}
                      className="mt-1"
                      placeholder="Enter your current password"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      New Password
                    </Label>
                    <Input
                      id="newPassword"
                      name="new"
                      type="password"
                      value={newPassword.new}
                      onChange={handlePasswordChange}
                      disabled={loading}
                      className="mt-1"
                      placeholder="Enter your new password"
                    />
                    <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirm"
                      type="password"
                      value={newPassword.confirm}
                      onChange={handlePasswordChange}
                      disabled={loading}
                      className="mt-1"
                      placeholder="Confirm your new password"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {loading ? "Updating..." : "Change Password"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    <Footer />
  </div>
  );
}