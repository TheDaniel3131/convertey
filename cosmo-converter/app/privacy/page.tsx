import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy | Cosmo Converter",
  description:
    "Learn about how Cosmo Converter protects your privacy and handles your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <main className="container mx-auto px-4 py-16 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Privacy Policy
        </h1>
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                At Cosmo Converter, we take your privacy seriously. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website or use our file
                conversion services.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Information We Collect
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We collect information that you provide directly to us, such as
                when you create an account, use our services, or contact us for
                support. This may include:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Personal information (e.g., name, email address)</li>
                <li>Payment information</li>
                <li>File data that you upload for conversion</li>
                <li>Usage data and analytics</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">
                How We Use Your Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>
                  Send you technical notices, updates, and support messages
                </li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns and improve user experience</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We implement appropriate technical and organizational measures
                to protect the security of your personal information. However,
                please note that no method of transmission over the Internet or
                electronic storage is 100% secure.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Depending on your location, you may have certain rights
                regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>
                  The right to access and receive a copy of your personal
                  information
                </li>
                <li>
                  The right to rectify or update your personal information
                </li>
                <li>The right to delete your personal information</li>
                <li>
                  The right to restrict or object to our processing of your
                  personal information
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Changes to This Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last updated&quot; date.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Email:{" "}
                <a
                  href="mailto:privacy@cosmocrafters.com"
                  className="text-purple-500 hover:text-purple-600"
                >
                  privacy@cosmocrafters.com
                </a>
                <br />
                Address: 123 Starship Avenue, Nebula City, CC 90210
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
