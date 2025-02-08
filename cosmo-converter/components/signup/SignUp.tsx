"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Rocket, Mail } from "lucide-react"
import { createSupabaseClient } from "@/lib/utils/supabase/client"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [showVerification, setShowVerification] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createSupabaseClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
  
    if (!supabase) {
      setError("Supabase client not initialized")
      setIsLoading(false)
      return
    }
  
    try {
      // Directly attempt signup - Supabase will handle duplicate email cases
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: name,
          }
        }
      })
  
      if (authError) {
        console.error("Signup error:", authError)
        if (authError.message.includes('already registered')) {
          setError("This email is already registered. Please use a different email or try logging in.")
        } else {
          setError(authError.message)
        }
        setIsLoading(false)
        return
      }
  
      if (!authData.user) {
        setError("User creation failed")
        setIsLoading(false)
        return
      }

      // Show verification message
      setShowVerification(true)
  
      // Redirect to login page after 5 seconds
      setTimeout(() => {
        router.push("/login")
      }, 5000)
  
    } catch (err) {
      console.error("Unexpected error during signup:", err)
      setError("An unexpected error occurred during signup")
    } finally {
      setIsLoading(false)
    }
  }

  if (showVerification) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="stars"></div>
        <Card className="w-full max-w-md space-y-8 bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardHeader>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 flex items-center justify-center">
                <Mail className="h-12 w-12 text-purple-400" />
              </div>
              <CardTitle className="mt-6 text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Check Your Email
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Alert className="bg-purple-500/10 border-purple-500/20">
              <AlertDescription className="text-center py-4">
                We&apos;ve sent a verification link to <strong>{email}</strong>. 
                Please check your email and click the link to verify your account. 
                You will be redirected to the login page in a few seconds.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              variant="link"
              onClick={() => router.push("/login")}
              className="text-purple-400 hover:text-purple-300"
            >
              Go to Login Page
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

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
              Join Cosmo Converter
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <Label htmlFor="name" className="sr-only">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="bg-white/5"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
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
                  disabled={isLoading}
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
                  autoComplete="new-password"
                  required
                  className="bg-white/5"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="group relative flex w-full justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-2 px-4 text-sm font-medium"
                disabled={isLoading}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Rocket className="h-5 w-5 text-purple-300 group-hover:text-purple-200" aria-hidden="true" />
                </span>
                {isLoading ? "Signing up..." : "Sign up"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-sm text-center">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-purple-400 hover:text-purple-300">
              Sign in
            </Link>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By signing up, you agree to our{" "}
            <Link href="/terms-of-service" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}