"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rocket, Twitter, Facebook, Linkedin } from "lucide-react";

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 15000);

    return () => clearTimeout(timer);
  }, [router]);

  const shareOnSocial = (platform: string) => {
    const urls = {
      twitter:
        "https://twitter.com/intent/tweet?text=I just supported CosmoConverter, an amazing free file conversion tool! Check it out:",
      facebook:
        "https://www.facebook.com/sharer/sharer.php?u=https://cosmo-converter.vercel.app",
      linkedin:
        "https://www.linkedin.com/shareArticle?mini=true&url=https://cosmo-converter.vercel.app&title=Support%20CosmoConverter&summary=I%20just%20supported%20CosmoConverter,%20an%20amazing%20free%20file%20conversion%20tool!",
    };

    window.open(urls[platform as keyof typeof urls], "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Thank You for Your Donation!
          </CardTitle>
          <CardDescription className="text-center text-lg mt-2">
            Your support means the world to us and helps keep CosmoConverter
            running.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center">
            Your generous contribution will go directly towards improving our
            services, maintaining our infrastructure, and developing new
            features to make file conversion even easier and more accessible for
            everyone.
          </p>
          <div className="flex justify-center">
            <Rocket className="h-16 w-16 text-purple-500" />
          </div>
          <p className="text-center font-semibold">
            With supporters like you, we&apos;re able to continue offering free
            file conversion services and push the boundaries of what&apos;s
            possible in online file conversion.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <p className="text-center mb-2">
            Help spread the word about CosmoConverter:
          </p>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => shareOnSocial("twitter")}
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => shareOnSocial("facebook")}
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => shareOnSocial("linkedin")}
            >
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
          <Link href="/">
            <Button className="mt-4">Return to Homepage</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
