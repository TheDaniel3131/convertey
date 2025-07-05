import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function C2A() {
  return (
    <section className="py-20 text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Ready to Transform Your Files?
        </h2>
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
          Join Cosmo Converter today and experience the future of file
          conversion across the digital universe.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/signup" passHref>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full"
            >
              Sign Up Now
            </Button>
          </Link>
          <Link href="/faq" passHref>
            <Button
              size="lg"
              variant="outline"
              className="mb-12 rounded-full border-purple-500 text-purple-500 hover:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
