// Interfaces for components

// FeatureCardProps: Props for the Features component
export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// NavLinkProps: Props for the Header component
export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

// TeamMemberProps: Props for the About Us component
export interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  description: string;
}

// PricingCardProps: Props for the Pricing component
export interface PricingCardProps {
  title: string;
  price: string | React.ReactNode; // Allow both string and React element
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: "outline" | "default";
  buttonLink?: string;
  icon?: string | React.ReactNode;
  badge?: string;
  highlighted?: boolean;
}
