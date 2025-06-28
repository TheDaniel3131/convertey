import { Button } from "@/components/ui/button";
// import { FaPaypal } from "react-icons/fa";
import { FaCoffee } from "react-icons/fa";
import { SiKofi } from "react-icons/si";

export default function ExternalDonationLinks() {
  return (
    <div className="space-y-4">
      {/* <Button
        variant="outline"
        className="w-full"
        onClick={() =>
          window.open(
            "https://www.paypal.com/donate/?hosted_button_id=YOUR_PAYPAL_BUTTON_ID",
            "_blank"
          )
        }
      >
        <FaPaypal className="mr-2" /> Donate with PayPal
      </Button> */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => window.open("buymeacoffee.com/cosmoconverter", "_blank")}
      >
        <FaCoffee className="mr-2" /> Buy Me a Coffee
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() =>
          window.open("https://ko-fi.com/cosmoconverter", "_blank")
        }
      >
        <SiKofi className="mr-2" /> Support on Ko-fi
      </Button>
    </div>
  );
}
