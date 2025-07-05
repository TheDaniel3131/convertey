import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import type { PricingCardProps } from "@/types/interfaces";

export default function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant,
  buttonLink,
  icon,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div className="relative">
      {highlighted && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <span className="bg-emerald-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <Card
        className={`flex flex-col h-full ${
          highlighted ? "border-emerald-500 dark:border-emerald-400" : ""
        }`}
      >
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            {icon}
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="text-4xl font-bold mb-4 text-emerald-700">
            {price}
            {period && <span className="text-lg font-normal">{period}</span>}
          </div>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="mr-2 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          {buttonLink ? (
            <Link href={buttonLink} className="w-full">
              <Button className="w-full" variant={buttonVariant}>
                {buttonText}
              </Button>
            </Link>
          ) : (
            <Button className="w-full" variant={buttonVariant}>
              {buttonText}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
