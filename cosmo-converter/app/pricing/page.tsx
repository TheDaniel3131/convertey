import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | Cosmo Converter",
  description: "Choose the perfect plan for your cosmic file conversion needs.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Header />
      <main className="container mx-auto px-4 py-16 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Choose Your Cosmic Plan
        </h1>
        <p className="text-xl mb-12 text-center text-gray-600 dark:text-gray-400">
          Unlock the full potential of Cosmo Converter with our flexible pricing
          options
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <PricingCard
            title="Free"
            price="$0"
            description="Perfect for occasional converters"
            features={[
              "5 conversions per day",
              "Max file size: 10MB",
              "Basic file formats",
              "Standard conversion speed",
            ]}
            buttonText="Get Started"
            buttonVariant="outline"
          />
          <PricingCard
            title="Pro"
            price="$9.99"
            period="/month"
            description="Ideal for regular users"
            features={[
              "Unlimited conversions",
              "Max file size: 100MB",
              "All file formats",
              "Priority conversion speed",
              "Advanced editing tools",
            ]}
            buttonText="Subscribe Now"
            buttonVariant="default"
            highlighted={true}
          />
          <PricingCard
            title="Enterprise"
            price="Custom"
            description="For businesses with specific needs"
            features={[
              "Unlimited conversions",
              "Custom file size limits",
              "All file formats + custom formats",
              "Fastest conversion speed",
              "API access",
              "Dedicated support",
            ]}
            buttonText="Contact Sales"
            buttonVariant="outline"
          />
        </div>
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Pay-per-Use Option</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Need flexibility? Try our pay-as-you-go option!
          </p>
          <ul className="text-left max-w-md mx-auto mb-8">
            <li className="flex items-center mb-2">
              <Check className="mr-2 text-green-500" /> $0.05 per conversion
            </li>
            <li className="flex items-center mb-2">
              <Check className="mr-2 text-green-500" /> No monthly commitment
            </li>
            <li className="flex items-center">
              <Check className="mr-2 text-green-500" /> Access to all file
              formats
            </li>
          </ul>
          <Button variant="outline">Start Converting</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: "outline" | "default";
  highlighted?: boolean;
}

function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant,
  highlighted = false,
}: PricingCardProps) {
  return (
    <Card
      className={`flex flex-col ${
        highlighted ? "border-purple-500 dark:border-purple-400" : ""
      }`}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-4xl font-bold mb-4">
          {price}
          {period && <span className="text-lg font-normal">{period}</span>}
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="mr-2 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={buttonVariant}>
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
