"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import DonationForm from "@/components/donate/Donation";
import ExternalDonationLinks from "@/components/donate/ExternalDonationLinks";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function DonationPage() {
  const [donationAmount, setDonationAmount] = useState(5);

  return (
    <div className="container mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
        Support CosmoConverter
      </h1>
      <p className="text-center mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
        Your donations help us maintain and improve CosmoConverter, keeping it
        free and accessible for everyone. Every contribution, no matter how
        small, makes a difference. Thank you for your support!
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg dark:shadow-gray-700/20">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Donate with Card
          </h2>
          <Elements stripe={stripePromise}>
            <DonationForm
              amount={donationAmount}
              setAmount={setDonationAmount}
            />
          </Elements>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg dark:shadow-gray-700/20">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Other Ways to Donate
          </h2>
          <ExternalDonationLinks />
        </div>
      </div>
    </div>
  );
}
