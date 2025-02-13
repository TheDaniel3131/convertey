"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import DonationForm from "@/components/donate/Donation";
import ExternalDonationLinks from "@/components/donate/ExternalDonationLinks";

// Replace with your Stripe publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState(5);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Support CosmoConverter
        </h1>
        <p className="text-center mb-8 max-w-2xl mx-auto">
          Your donations help us maintain and improve CosmoConverter, keeping it
          free and accessible for everyone. Every contribution, no matter how
          small, makes a difference. Thank you for your support!
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Donate with Card</h2>
            <Elements stripe={stripePromise}>
              <DonationForm
                amount={donationAmount}
                setAmount={setDonationAmount}
              />
            </Elements>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Other Ways to Donate
            </h2>
            <ExternalDonationLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
