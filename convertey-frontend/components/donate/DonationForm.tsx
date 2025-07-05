// DonationForm Component
import type React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Loader2, CreditCard } from "lucide-react";
import { Heart } from "lucide-react";
import { useState } from "react";

interface DonationFormProps {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
}

export default function DonationForm({ amount, setAmount }: DonationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const presetAmounts = [5, 10, 25, 50, 100];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);

      if (cardElement) {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

        if (error) {
          console.error("[error]", error);
        } else {
          console.log("[PaymentMethod]", paymentMethod);
          router.push("/donate/thank-you");
        }
      }
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Amount Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Choose Amount
        </label>
        <div className="grid grid-cols-5 gap-3 mb-6">
          {presetAmounts.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(preset)}
              className={`py-3 px-4 text-sm font-semibold rounded-xl border-2 transition-all duration-200 ${
                amount === preset
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent shadow-lg transform scale-105"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-emerald-300 hover:shadow-md"
              }`}
            >
              ${preset}
            </button>
          ))}
        </div>

        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold text-lg">
            $
          </span>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min="1"
            step="1"
            className="pl-8 h-14 text-lg border-2 border-gray-200 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
            placeholder="Custom amount"
          />
        </div>
      </div>

      {/* Payment Information */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 ">
          <CreditCard className="w-4 h-4" />
          Payment Information
        </label>
        <div className="border-2 border-gray-200 dark:border-gray-600 rounded-xl p-6 focus-within:border-emerald-500 transition-colors bg-white dark:bg-gray-700">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#374151",
                  fontFamily: '"Inter", sans-serif',
                  "::placeholder": {
                    color: "#9CA3AF",
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!stripe || amount < 1 || isLoading}
        className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Heart className="w-5 h-5 mr-2" />
            Donate ${amount} to Convertey
          </>
        )}
      </Button>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        🔒 Your payment is secured by Stripe. We never store your payment
        information.
      </p>
    </form>
  );
}
