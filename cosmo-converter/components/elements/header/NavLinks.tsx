import type { NavLinkProps } from "@/types/interfaces";
import Link from "next/link";

export default function NavLink({
  href,
  children,
  className = "",
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 ${className}`}
    >
      {children}
    </Link>
  );
}
