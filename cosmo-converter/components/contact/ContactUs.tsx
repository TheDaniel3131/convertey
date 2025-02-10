"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactInfo from "@/components/elements/contact/ContactInfo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setAlertMessage("");

    const formData = new FormData(e.target as HTMLFormElement); // Create FormData from the form

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
        setStatus("success");
      } else {
        const errorMessage = `Error sending message: ${
          data.error || "Please try again."
        }`;
        toast.error(errorMessage);
        setAlertMessage(errorMessage);
        setStatus("error");
      }
    } catch (error) {
      const errorMessage = "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
      setAlertMessage(errorMessage);
      console.error("Fetch Error:", error);
      setStatus("error");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <main className="container mx-auto px-4 py-16 relative z-10 overflow-y">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Contact Us
      </h1>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name" // Add name attribute
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email" // Add name attribute
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message" // Add name attribute
                  placeholder="Your message here..."
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>
            </form>
            {status === "success" && (
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{alertMessage}</AlertDescription>
              </Alert>
            )}
            {status === "error" && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{alertMessage}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ContactInfo
                  icon={<Mail />}
                  text="official.cosmocrafters@gmail.com"
                />
                <ContactInfo icon={<Phone />} text="+1 (888) COSMOS-00" />
                <ContactInfo
                  icon={<MapPin />}
                  text="123 Starship Avenue, Nebula City, CC 90210"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
            <CardHeader>
              <CardTitle>Office Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Monday - Friday: 9AM - 6PM (Galactic Standard Time)
                <br />
                Saturday: 10AM - 2PM (GST)
              </p>
              <ToastContainer />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
