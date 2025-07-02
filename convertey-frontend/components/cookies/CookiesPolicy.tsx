import { Card, CardContent } from "@/components/ui/card";

export default function Cookies() {
  return (
    <main className="container mx-auto px-4 py-16 relative z-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600 pb-2">
        Cookies Policy
      </h1>
      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">What are Cookies?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Cookies are small text files stored on your device when you visit our website. 
              They enable us to provide enhanced functionality and analyze website performance. 
              Cookies contain information about your browsing preferences, session data, and 
              site interactions. Session cookies are temporary and deleted when you close your 
              browser, while persistent cookies remain on your device for a predetermined period 
              to remember your preferences across visits.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">How Convertey Uses Cookies</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Convertey employs cookies to optimize your user experience and maintain 
              platform functionality. Our cookie implementation includes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>
                <strong>Essential Cookies:</strong> Required for core website functionality 
                and security features.
              </li>
              <li>
                <strong>Performance Cookies:</strong> Collect anonymous data to analyze 
                website performance and user interactions.
              </li>
              <li>
                <strong>Functional Cookies:</strong> Store your preferences and settings 
                to personalize your experience.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand user behavior 
                to improve our services and features.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Cookie Management</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You maintain full control over cookie preferences through your browser settings. 
              Most browsers allow you to view, delete, and block cookies. Please note that 
              disabling certain cookies may impact website functionality and require manual 
              reconfiguration of preferences during each visit. We recommend reviewing your 
              browser&apos;s help documentation for specific cookie management instructions.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              For comprehensive information about cookies and privacy management, 
              we recommend visiting{" "}
              <a
                href="https://www.aboutcookies.org/"
                className="text-emerald-500 hover:text-emerald-600"
              >
                aboutcookies.org
              </a>{" "}
              or{" "}
              <a
                href="https://www.allaboutcookies.org/"
                className="text-emerald-500 hover:text-emerald-600"
              >
                allaboutcookies.org
              </a>
              .
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              For questions regarding our cookie policy or privacy practices, 
              please contact our team at{" "}
              <a
                href="mailto:official.convertey@outlook.com"
                className="text-emerald-500 hover:text-emerald-600"
              >
                official.convertey@outlook.com
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
