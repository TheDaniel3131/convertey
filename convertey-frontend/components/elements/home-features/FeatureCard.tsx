import type { FeatureCardProps } from "@/types/interfaces";

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg p-6 rounded-lg text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="mb-4 transform transition-transform duration-300 hover:scale-110 flex justify-center items-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
