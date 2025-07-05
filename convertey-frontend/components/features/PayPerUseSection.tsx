import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PayPerUseSection() {
  return (
    <div className="bg-gradient-to-r from-emerald-200 to-teal-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Need Maximum Flexibility?</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Try our pay-as-you-go option - perfect for sporadic high-volume needs
      </p>
      <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
        <div className="flex items-center justify-center">
          <Check className="mr-2 text-emerald-500" />
          <span>$0.05 per conversion</span>
        </div>
        <div className="flex items-center justify-center">
          <Check className="mr-2 text-emerald-500" />
          <span>No monthly commitment</span>
        </div>
        <div className="flex items-center justify-center">
          <Check className="mr-2 text-emerald-500" />
          <span>All file formats included</span>
        </div>
      </div>
      <Button
        variant="outline"
        className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
      >
        Start Converting
      </Button>
    </div>
  );
}
