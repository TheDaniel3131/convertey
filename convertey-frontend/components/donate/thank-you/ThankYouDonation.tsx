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
import {
  Rocket,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 300000);

    return () => clearTimeout(timer);
  }, [router]);

  const shareOnSocial = (platform: string) => {
    const urls = {
      twitter:
        "https://twitter.com/intent/tweet?text=I just supported Convertey, an amazing free file conversion tool! Check it out:",
      facebook:
        "https://www.facebook.com/sharer/sharer.php?u=https://minxfy.vercel.app",
      linkedin:
        "https://www.linkedin.com/shareArticle?mini=true&url=https://minxfy.vercel.app&title=Support%20Convertey&summary=I%20just%20supported%20Convertey,%20an%20amazing%20free%20file%20conversion%20tool!",
      reddit:
        "https://www.reddit.com/submit?url=https://minxfy.vercel.app&title=I just supported Convertey, an amazing free file conversion tool!",
      telegram:
        "https://t.me/share/url?url=https://minxfy.vercel.app&text=I just supported Convertey, an amazing free file conversion tool!",
      whatsapp:
        "https://wa.me/?text=I just supported Convertey, an amazing free file conversion tool! Check it out: https://minxfy.vercel.app",
      pinterest:
        "https://pinterest.com/pin/create/button/?url=https://minxfy.vercel.app&description=I just supported Convertey, an amazing free file conversion tool!",
      email:
        "mailto:?subject=Check out Convertey&body=I just supported Convertey, an amazing free file conversion tool! Check it out: https://minxfy.vercel.app",
    };

    window.open(urls[platform as keyof typeof urls], "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-emerald-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900 dark:to-cyan-900 flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-2xl shadow-sm border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-6">
            <div className="relative p-4">
              <Rocket className="h-20 w-20 text-emerald-500 animate-bounce" />
              <Sparkles className="h-4 w-4 text-cyan-400 absolute bottom-2 left-0 animate-pulse delay-300" />
              <Sparkles className="h-3 w-3 text-emerald-300 absolute top-3 left-3 animate-pulse delay-700" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Thank You for Your Donation!
          </CardTitle>
          <CardDescription className="text-center text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Your support means the world to us and helps keep Convertey soaring!
            🚀
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 px-8">
          <div className="bg-gradient-to-r from-emerald-50 to-mint-50 dark:from-emerald-900/20 dark:to-mint-900/20 p-8 rounded-xl border border-emerald-200 dark:border-emerald-700">
            <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed text-base">
              Your generous contribution will go directly towards improving our
              services, maintaining our infrastructure, and developing new
              features to make file conversion even easier and more accessible
              for everyone.
            </p>
          </div>

          <div className="text-center py-4">
            <p className="font-semibold text-lg text-emerald-600 leading-relaxed">
              With supporters like you, we&apos;re able to continue offering
              free file conversion services and push the boundaries of
              what&apos;s possible! ✨
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-center space-y-8 pt-8 pb-8">
          <div className="text-center w-full">
            <p className="text-lg font-medium mb-6 text-gray-700 dark:text-gray-300">
              🌟 Help spread the word about Convertey:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => shareOnSocial("twitter")}
                className="hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-200 hover:scale-110"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => shareOnSocial("facebook")}
                className="hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-200 hover:scale-110"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => shareOnSocial("linkedin")}
                className="hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-200 hover:scale-110"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => shareOnSocial("whatsapp")}
                className="hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 hover:scale-110"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => shareOnSocial("telegram")}
                className="hover:bg-mint-50 hover:border-mint-300 transition-all duration-200 hover:scale-110"
              >
                <Send className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => shareOnSocial("email")}
                className="hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hover:scale-110"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Link href="/">
            <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
              Return to Homepage
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
