import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Cookies Policy | Cosmo Converter",
  description:
    "Learn about how Cosmo Converter uses cookies to enhance your experience.",
};

export default function CookiesPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Header />
      <main className="container mx-auto px-4 py-16 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Cookies Policy
        </h1>
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">What are Cookies?</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Cookies are small text files that are placed on your computer or
                mobile device when you visit a website. They are widely used to
                make websites work more efficiently and provide information to
                the owners of the site. They can store information about your
                browsing activity on a particular website, such as your
                preferences, login details, or items in your shopping cart.
                There are different types of cookies, each serving a specific
                purpose. For example, &quot;session cookies&quot; are temporary
                and expire when you close your browser, while &quot;persistent
                cookies&quot; remain on your device for a specified period.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">
                How We Use Cookies
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Cosmo Converter uses cookies to enhance your experience on our
                website. We use different types of cookies for various purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>
                  Essential cookies: These are necessary for the website to
                  function properly.
                </li>
                <li>
                  Analytical/performance cookies: These help us to improve how
                  our website works.
                </li>
                <li>
                  Functionality cookies: These allow us to remember your
                  preferences.
                </li>
                <li>
                  Targeting cookies: These record your visit to our website, the
                  pages you have visited and the links you have followed.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You can control and/or delete cookies as you wish. You can
                delete all cookies that are already on your computer and you can
                set most browsers to prevent them from being placed. However, if
                you do this, you may have to manually adjust some preferences
                every time you visit a site and some services and
                functionalities may not work.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">More Information</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                For more information about cookies and how to manage them, visit{" "}
                <a
                  href="https://www.aboutcookies.org/"
                  className="text-purple-500 hover:text-purple-600"
                >
                  aboutcookies.org
                </a>{" "}
                or{" "}
                <a
                  href="https://www.allaboutcookies.org/"
                  className="text-purple-500 hover:text-purple-600"
                >
                  allaboutcookies.org
                </a>
                .
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about our use of cookies, please
                contact us at{" "}
                <a
                  href="mailto:privacy@cosmocrafters.com"
                  className="text-purple-500 hover:text-purple-600"
                >
                  privacy@cosmocrafters.com
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
