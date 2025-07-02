import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <main className="container mx-auto px-4 py-16 relative z-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600 pb-2">
        Privacy Policy
      </h1>
      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              At Convertey, we are committed to protecting your privacy and maintaining the confidentiality of your personal information. This Privacy Policy outlines how we collect, use, process, and safeguard your data when you access our website and utilize our file conversion services.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We collect information that you voluntarily provide to us through various interactions with our platform. This information may include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>Personal identification information (name, email address, contact details)</li>
              <li>Account credentials and profile information</li>
              <li>Payment and billing information for premium services</li>
              <li>Files and documents uploaded for conversion purposes</li>
              <li>Usage analytics and service interaction data</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We utilize the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>Deliver, maintain, and enhance our conversion services</li>
              <li>Process payments and manage subscription services</li>
              <li>Provide customer support and technical assistance</li>
              <li>Communicate service updates, security alerts, and important notices</li>
              <li>Analyze service performance and optimize user experience</li>
              <li>Ensure compliance with legal obligations and platform security</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Data Security & Protection</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We employ industry-standard security measures and encryption protocols to protect your personal information from unauthorized access, disclosure, or misuse. While we maintain robust security practices, we acknowledge that no digital transmission or storage method can guarantee absolute security.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Privacy Rights</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Subject to applicable privacy laws and regulations, you may exercise the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>Access and obtain copies of your personal data</li>
              <li>Request correction or updating of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to or restrict certain processing activities</li>
              <li>Data portability for information you have provided</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Policy Updates
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We reserve the right to modify this Privacy Policy as necessary to reflect changes in our practices, legal requirements, or service offerings. Material changes will be communicated through our platform, and the updated policy will include a revised effective date.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              For questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us at:
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Email:{" "}
              <a
                href="mailto:official.convertey@outlook.com"
                className="text-emerald-500 hover:text-emerald-600"
              >
                official.convertey@outlook.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
