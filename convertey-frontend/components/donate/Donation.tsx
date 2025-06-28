import type React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface DonationFormProps {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
}

export default function DonationForm({ amount, setAmount }: DonationFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.log("[error]", error);
      } else {
        console.log("[PaymentMethod]", paymentMethod);
        // Here you would typically send the paymentMethod.id to your server
        // to complete the payment. After confirming the payment was successful:
        router.push("/donate/thank-you");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium mb-1">
          Donation Amount ($)
        </label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min="1"
          step="1"
        />
      </div>
      <div>
        <label
          htmlFor="card-element"
          className="block text-sm font-medium mb-1"
        >
          Credit or debit card
        </label>
        <div className="border rounded-md p-3">
          <CardElement id="card-element" />
        </div>
      </div>
      <Button type="submit" disabled={!stripe} className="w-full">
        Donate ${amount}
      </Button>
    </form>
  );
}
