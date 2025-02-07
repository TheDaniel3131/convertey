import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import PricingCard from "../elements/pricing/PricingCard";

export default function Pricing() {
  return (
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
            <Check className="mr-2 text-green-500" /> Access to all file formats
          </li>
        </ul>
        <Button variant="outline">Start Converting</Button>
      </div>
    </main>
  );
}
