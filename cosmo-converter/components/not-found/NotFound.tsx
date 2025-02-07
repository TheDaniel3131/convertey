import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Home } from "lucide-react";

export default function NotFound() {
  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
      <CardContent className="p-6 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          404 - Lost in Space
        </h1>
        <p className="text-xl mb-6 text-gray-600 dark:text-gray-400">
          Oops! It seems you&apos;ve ventured into uncharted space.
        </p>
        <div className="mb-6">
          <Rocket className="inline-block h-24 w-24 text-purple-500 animate-bounce" />
        </div>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Don&apos;t worry, even the best space explorers get lost sometimes.
          Let&apos;s get you back on course.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            asChild
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
