import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us | Cosmo Converter",
  description:
    "Learn about the team behind Cosmo Converter and our mission to revolutionize file conversion across the digital universe.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <main className="container mx-auto px-4 py-16 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          About CosmoCrafters
        </h1>
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300">
                At CosmoCrafters, we&apos;re on a mission to revolutionize file
                conversion across the digital universe. Our flagship product,
                Cosmo Converter, is designed to break down the barriers between
                file formats, allowing seamless transformation of data across
                all digital dimensions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TeamMember
                  name="Stella Nova"
                  role="Founder & CEO"
                  image="/placeholder.svg?height=100&width=100"
                  description="Visionary leader with a passion for breaking down digital barriers."
                />
                <TeamMember
                  name="Orion Bytes"
                  role="Chief Technology Officer"
                  image="/placeholder.svg?height=100&width=100"
                  description="Tech genius behind Cosmo Converter's cutting-edge algorithms."
                />
                <TeamMember
                  name="Luna Data"
                  role="Head of Product"
                  image="/placeholder.svg?height=100&width=100"
                  description="Expert in user experience and product strategy."
                />
                <TeamMember
                  name="Nebula Support"
                  role="Customer Success Manager"
                  image="/placeholder.svg?height=100&width=100"
                  description="Dedicated to ensuring our users have an out-of-this-world experience."
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Journey</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Founded in 2023, CosmoCrafters started as a small team of
                passionate developers and designers who believed in the power of
                seamless data transformation. Today, we&apos;re proud to serve
                millions of users across the galaxy, constantly pushing the
                boundaries of what&apos;s possible in file conversion
                technology.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  description: string;
}

function TeamMember({ name, role, image, description }: TeamMemberProps) {
  return (
    <div className="flex items-center space-x-4">
      <Image
        src={image || "/placeholder.svg"}
        alt={name}
        width={100}
        height={100}
        className="rounded-full"
      />
      <div>
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}
