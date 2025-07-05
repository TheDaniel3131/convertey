export default function AboutPricing() {
  return (
    <div className="mt-16 text-center">
      <h2 className="text-2xl font-bold mb-8">
        Frequently Asked Questions About Convertey Pricing
      </h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
        <div>
          <h3 className="font-semibold mb-2">Can I change my plan anytime?</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Yes! You can upgrade or downgrade your plan at any time. Changes
            take effect immediately.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">
            What happens to unused conversions?
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Unused conversions don&apos;t roll over to the next month. We
            recommend choosing a plan that fits your typical usage.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Yes, we offer a 30-day money-back guarantee on all paid plans. No
            questions asked.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Is there a free trial?</h3>
          <p className="text-gray-600 dark:text-gray-400">
            All paid plans come with a 7-day free trial. No credit card required
            to start.
          </p>
        </div>
      </div>
    </div>
  );
}
