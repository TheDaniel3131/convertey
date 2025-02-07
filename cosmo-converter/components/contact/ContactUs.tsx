import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactInfo from "@/components/elements/contact/ContactInfo";

export default function ContactUs() {
  return (
    <main className="container mx-auto px-4 py-16 relative z-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Contact Us
      </h1>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <Input id="email" type="email" placeholder="your@email.com" />
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
                  placeholder="Your message here..."
                  rows={4}
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full">
                Send Message
              </Button>
            </form>
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
                <br />
                Sunday: Closed
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
