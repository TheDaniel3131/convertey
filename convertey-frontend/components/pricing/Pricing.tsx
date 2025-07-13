"use client";

import { Star, Zap, Building, Users } from "lucide-react";
import PricingCard from "../elements/pricing/PricingCard";
import { useState } from "react";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const getPrice = (monthlyPrice: number) => {
    if (isYearly) {
      const yearlyPrice = monthlyPrice * 12 * 0.83; // 17% discount
      return Math.round(yearlyPrice);
    }
    return monthlyPrice;
  };

  const getPriceDisplay = (monthlyPrice: number) => {
    if (isYearly) {
      const originalYearlyPrice = monthlyPrice * 12;
      const discountedPrice = getPrice(monthlyPrice);
      return (
        <>
          <span className="line-through text-teal-600">
            ${originalYearlyPrice}
          </span>{" "}
          <span className="text-emerald-400 font-bold">${discountedPrice}</span>
        </>
      );
    }
    return `$${monthlyPrice}`;
  };

  return (
    <main className="container mx-auto px-4 py-16 relative z-10">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600">
          Choose Your Perfect Plan
        </h1>
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          From personal projects to enterprise solutions, we have the right plan
          to power your file conversion needs
        </p>
        <div className="flex justify-center items-center gap-4 mb-8">
          <span className="text-gray-600 dark:text-gray-400">Monthly</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isYearly}
              onChange={(e) => setIsYearly(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
          </label>
          <span className="text-gray-600 dark:text-gray-400">
            Yearly{" "}
            <span className="text-emerald-600 font-semibold">(Save 17%)</span>
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {/* Basic Tier */}
        <PricingCard
          title="Basic"
          price="Free"
          period={`/${isYearly ? "year" : "month"}`}
          description="Perfect for trying out Convertey"
          features={[
            "5 conversions per day",
            "Max file size: 4MB",
            "10+ basic file formats",
            "Standard conversion speed",
            "Community support",
          ]}
          buttonText="Get Started"
          buttonVariant="outline"
          buttonLink="/signup"
          icon={<Users className="h-6 w-6 text-emerald-500" />}
        />

        {/* Standard Tier */}
        <PricingCard
          title="Standard"
          price={getPriceDisplay(4.99)}
          period={`/${isYearly ? "year" : "month"}`}
          description="Ideal for personal use"
          features={[
            "50 conversions per day",
            "Max file size: 50MB",
            "50+ extended file formats",
            "Priority conversion speed",
            "Email support",
            "Batch conversion (5 files)",
            "No ads",
          ]}
          buttonText="Start Free Trial"
          buttonVariant="outline"
          buttonLink="/signup?plan=standard"
          icon={<Star className="h-6 w-6 text-emerald-500" />}
        />

        {/* Pro Tier - Most Popular */}
        <PricingCard
          title="Pro"
          price={getPriceDisplay(9.99)}
          period={`/${isYearly ? "year" : "month"}`}
          description="For professionals and power users"
          features={[
            "Unlimited conversions",
            "Max file size: 500MB",
            "100+ file formats",
            "Fastest conversion speed",
            "Priority support",
            "Batch conversion (20 files)",
            "Advanced editing tools",
            "OCR capabilities",
            "Cloud storage integration",
          ]}
          buttonText="Start Free Trial"
          buttonVariant="default"
          buttonLink="/signup?plan=pro"
          highlighted={true}
          icon={<Zap className="h-6 w-6 text-emerald-500" />}
          badge="Most Popular"
        />

        {/* Enterprise Tier */}
        <PricingCard
          title="Enterprise"
          price="Custom"
          period=""
          description="For businesses and developers"
          features={[
            "Unlimited conversions",
            "Unlimited file size",
            "All formats + custom formats",
            "Dedicated processing power",
            "API access (10k calls/month)",
            "Dedicated support",
            "Unlimited batch conversion",
            "Team collaboration tools",
            "Custom branding",
            "SLA guarantee",
          ]}
          buttonText="Contact Sales"
          buttonVariant="outline"
          buttonLink="/contact?plan=enterprise"
          icon={<Building className="h-6 w-6 text-emerald-500" />}
        />
      </div>
    </main>
  );
}
