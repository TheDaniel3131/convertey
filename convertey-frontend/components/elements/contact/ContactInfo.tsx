export default function ContactInfo({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center space-x-3">
      <div className="text-purple-500 dark:text-purple-400">{icon}</div>
      <span className="text-gray-600 dark:text-gray-300">{text}</span>
    </div>
  );
}
