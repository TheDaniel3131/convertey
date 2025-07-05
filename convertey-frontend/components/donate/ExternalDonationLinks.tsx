// ExternalDonationLinks Component
import { FaCoffee } from "react-icons/fa";
import { SiKofi } from "react-icons/si";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExternalDonationLinks() {
  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        className="w-full h-12 border-2 hover:bg-amber-50 hover:border-amber-300 transition-all duration-200"
        onClick={() => window.open("https://buymeacoffee.com/minxfy", "_blank")}
      >
        <FaCoffee className="mr-3 text-amber-600" size={18} />
        Buy Me a Coffee
        <ExternalLink className="ml-auto w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        className="w-full h-12 border-2 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
        onClick={() => window.open("https://ko-fi.com/minxfy", "_blank")}
      >
        <SiKofi className="mr-3 text-red-600" size={18} />
        Support on Ko-fi
        <ExternalLink className="ml-auto w-4 h-4" />
      </Button>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <h4 className="font-medium text-sm mb-2">Prefer other methods?</h4>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Contact us for cryptocurrency donations or bank transfers.
        </p>
      </div>
    </div>
  );
}
