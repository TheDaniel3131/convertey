import { Card, CardContent } from "@/components/ui/card";

export default function ToS() {
  return (
    <main className="container mx-auto px-4 py-16 relative z-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
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
              By accessing or using Convertey (&quot;Service&quot;), you
              acknowledge that you have read, understood, and agree to be bound by these Terms of Service (&quot;Terms&quot;).
              If you do not agree with any provision of these terms, you must discontinue use of the
              Service immediately.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              2. Service Description
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Convertey is a comprehensive file conversion platform that enables users
              to seamlessly convert files between various formats. Our Service is accessible
              through our web application and API endpoints.
            </p>
            <h3 className="text-xl font-semibold mb-2">
              2.1 Service Limitations
            </h3>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>Free tier accounts are limited to 5 conversions per 24-hour period</li>
              <li>File size restrictions vary according to your subscription plan</li>
              <li>
                Advanced file formats and features are exclusively available to premium subscribers
              </li>
              <li>
                Service availability may be temporarily interrupted for scheduled maintenance and system updates
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              3.1 Users must be at least 13 years of age to create an account and use the Service.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              3.2 You are solely responsible for maintaining the confidentiality of your
              account credentials and all activities that occur under your account. Convertey
              shall not be held liable for any unauthorized access resulting from your failure
              to safeguard your account information.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">4. Payment and Billing</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              4.1 Subscription fees are billed in advance on a monthly or annual basis,
              depending on your selected plan.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              4.2 Refund requests will be processed in accordance with our published Refund Policy.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              4.3 You agree to provide accurate, current, and complete billing information
              for all transactions processed through the Service.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              5. Intellectual Property Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              5.1 The Service, including its design, functionality, and proprietary technology,
              is owned by Convertey and protected by international copyright, trademark,
              and other intellectual property laws.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              5.2 You retain full ownership of your uploaded content. By using our Service,
              you grant Convertey a limited, non-exclusive license to process your files
              solely for the purpose of providing conversion services.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">6. Prohibited Activities</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Users are strictly prohibited from using the Service for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>
                Any illegal activities or encouraging others to engage in unlawful conduct
              </li>
              <li>
                Uploading malicious software or attempting to compromise system security
              </li>
              <li>
                Distributing spam, unsolicited communications, or promotional materials
              </li>
              <li>
                Impersonating individuals or organizations, or misrepresenting your identity
              </li>
              <li>Disrupting, interfering with, or attempting to breach our Service infrastructure</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              7.1 To the maximum extent permitted by law, Convertey, its officers, directors,
              employees, and affiliates shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, including but not limited to
              loss of profits, data, or business opportunities, arising from:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>
                Your use of or inability to access the Service
              </li>
              <li>Third-party conduct or content within the Service</li>
              <li>Any content or materials obtained through the Service</li>
              <li>
                Unauthorized access to or modification of your data or communications
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">8. Account Termination</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              8.1 We reserve the right to suspend or terminate your account at our
              sole discretion, with or without notice, for violations of these Terms
              or any conduct we deem harmful to the Service or other users.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              8.2 Upon termination, your access to the Service will cease immediately,
              and any outstanding obligations will remain in effect.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">9. Modifications to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              9.1 Convertey reserves the right to modify these Terms at any time.
              We will notify users of material changes by updating the &quot;Last Updated&quot;
              date and posting the revised Terms on our platform.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              9.2 Continued use of the Service following the posting of revised Terms
              constitutes your acceptance of the updated agreement.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              For questions regarding these Terms of Service, please reach out to us:
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Email:{" "}
              <a
                href="mailto:official.convertey@outlook.com"
                className="text-emerald-500 hover:text-emerald-600"
              >
                official.convertey@outlook.com
              </a>
              <br />
              Business Address: 123 Innovation Drive, Tech Valley, CV 90210
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
