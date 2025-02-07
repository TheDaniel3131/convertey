import type { TeamMemberProps } from "@/types/interfaces";
import Image from "next/image";

export default function TeamMember({
  name,
  role,
  image,
  description,
}: TeamMemberProps) {
  return (
    <div className="flex items-center space-x-4">
      <Image
        src={image || "/placeholder.svg"}
        alt={name}
        width={100}
        height={100}
        className="rounded-full"
      />
      <div>
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}
