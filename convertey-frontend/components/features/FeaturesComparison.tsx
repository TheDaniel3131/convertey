import { Check } from "lucide-react";

export default function FeaturesComparison() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-16">
      <h2 className="text-2xl font-bold text-center mb-8">
        Feature Comparison
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-4 px-6">Feature</th>
              <th className="text-center py-4 px-6">Free</th>
              <th className="text-center py-4 px-6">Standard</th>
              <th className="text-center py-4 px-6">Pro</th>
              <th className="text-center py-4 px-6">Enterprise</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-400">
            <tr className="border-b border-gray-100 dark:border-gray-700">
              <td className="py-4 px-6 font-medium">Daily Conversions</td>
              <td className="text-center py-4 px-6">5</td>
              <td className="text-center py-4 px-6">50</td>
              <td className="text-center py-4 px-6">Unlimited</td>
              <td className="text-center py-4 px-6">Unlimited</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-700">
              <td className="py-4 px-6 font-medium">File Size Limit</td>
              <td className="text-center py-4 px-6">10MB</td>
              <td className="text-center py-4 px-6">50MB</td>
              <td className="text-center py-4 px-6">500MB</td>
              <td className="text-center py-4 px-6">Unlimited</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-700">
              <td className="py-4 px-6 font-medium">Supported Formats</td>
              <td className="text-center py-4 px-6">20+</td>
              <td className="text-center py-4 px-6">50+</td>
              <td className="text-center py-4 px-6">100+</td>
              <td className="text-center py-4 px-6">All + Custom</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-700">
              <td className="py-4 px-6 font-medium">Conversion Speed</td>
              <td className="text-center py-4 px-6">Standard</td>
              <td className="text-center py-4 px-6">Priority</td>
              <td className="text-center py-4 px-6">Fastest</td>
              <td className="text-center py-4 px-6">Dedicated</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-700">
              <td className="py-4 px-6 font-medium">Batch Processing</td>
              <td className="text-center py-4 px-6">-</td>
              <td className="text-center py-4 px-6">5 files</td>
              <td className="text-center py-4 px-6">20 files</td>
              <td className="text-center py-4 px-6">Unlimited</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-700">
              <td className="py-4 px-6 font-medium">API Access</td>
              <td className="text-center py-4 px-6">-</td>
              <td className="text-center py-4 px-6">-</td>
              <td className="text-center py-4 px-6">-</td>
              <td className="text-center py-4 px-6">
                <Check className="h-4 w-4 text-emerald-500 mx-auto" />
              </td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-700">
              <td className="py-4 px-6 font-medium">Advanced Editing</td>
              <td className="text-center py-4 px-6">-</td>
              <td className="text-center py-4 px-6">Basic</td>
              <td className="text-center py-4 px-6">
                <Check className="h-4 w-4 text-emerald-500 mx-auto" />
              </td>
              <td className="text-center py-4 px-6">
                <Check className="h-4 w-4 text-emerald-500 mx-auto" />
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-medium">Support Level</td>
              <td className="text-center py-4 px-6">Community</td>
              <td className="text-center py-4 px-6">Email</td>
              <td className="text-center py-4 px-6">Priority</td>
              <td className="text-center py-4 px-6">Dedicated</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
