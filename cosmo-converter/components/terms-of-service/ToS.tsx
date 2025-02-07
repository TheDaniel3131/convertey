import { Card, CardContent } from "@/components/ui/card";

export default function ToS() {
  return (
    <main className="container mx-auto px-4 py-16 relative z-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Terms of Service
      </h1>
      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Last Updated: February 7, 2025
            </p>
            <h2 className="text-2xl font-semibold mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              By accessing or using Cosmo Converter (&quot;Service&quot;), you
              agree to be bound by these Terms of Service (&quot;Terms&quot;).
              If you disagree with any part of the terms, you may not access the
              Service.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              2. Description of Service
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Cosmo Converter provides file conversion services that allow users
              to convert files between different formats. The Service may be
              accessed through our website or API.
            </p>
            <h3 className="text-xl font-semibold mb-2">
              2.1 Service Limitations
            </h3>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>Free tier users are limited to 5 conversions per day</li>
              <li>Maximum file size varies by subscription tier</li>
              <li>
                Certain file formats may only be available to premium users
              </li>
              <li>
                Service availability is subject to maintenance and updates
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              3.1 You must be at least 13 years old to use the Service.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              3.2 You are responsible for maintaining the security of your
              account and password. The company cannot and will not be liable
              for any loss or damage from your failure to comply with this
              security obligation.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              4.1 Subscription fees are charged in advance on a monthly or
              annual basis.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              4.2 Refunds are processed according to our Refund Policy.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              4.3 You agree to provide current, complete, and accurate purchase
              and account information for all purchases made via the Service.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              5. Intellectual Property Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              5.1 The Service and its original content, features, and
              functionality are owned by CosmoCrafters and are protected by
              international copyright, trademark, patent, trade secret, and
              other intellectual property or proprietary rights laws.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              5.2 You retain all rights to your content. By uploading content to
              our Service, you grant us a worldwide license to use, copy, and
              process your content for the purpose of providing our Service.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">6. Prohibited Uses</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You agree not to use the Service for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>
                Any unlawful purpose or to solicit others to perform unlawful
                acts
              </li>
              <li>
                Uploading malicious code or attempting to breach our security
              </li>
              <li>
                Transmitting spam, chain letters, or other unsolicited
                communications
              </li>
              <li>
                Impersonating another person or misrepresenting your affiliation
              </li>
              <li>Interfering with or disrupting the Service or servers</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              7.1 In no event shall CosmoCrafters, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential, or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>
                Your access to or use of or inability to access or use the
                Service
              </li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>
                Unauthorized access, use, or alteration of your transmissions or
                content
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              8.1 We may terminate or suspend your account and bar access to the
              Service immediately, without prior notice or liability, under our
              sole discretion, for any reason whatsoever, including without
              limitation if you breach the Terms.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              8.2 Upon termination, your right to use the Service will
              immediately cease.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              9.1 We reserve the right to modify or replace these Terms at any
              time. We will provide notice of any changes by posting the new
              Terms on this page.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              9.2 Your continued use of the Service after any such changes
              constitutes your acceptance of the new Terms.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Email:{" "}
              <a
                href="mailto:legal@cosmocrafters.com"
                className="text-purple-500 hover:text-purple-600"
              >
                legal@cosmocrafters.com
              </a>
              <br />
              Address: 123 Starship Avenue, Nebula City, CC 90210
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
