import { FileUp, Zap, Globe } from "lucide-react";
import FeatureCard from "@/components/elements/home-features/FeatureCard";

export default function Features() {
  return (
    /* Features Section */
    <section id="features" className="py-20">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Cosmic Capabilities
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<FileUp className="h-10 w-10 text-purple-500" />}
          title="Universal Formats"
          description="Convert files across dimensions and formats with unparalleled precision."
        />
        <FeatureCard
          icon={<Zap className="h-10 w-10 text-pink-500" />}
          title="Quantum Speed"
          description="Experience conversions at the speed of light, powered by advanced algorithms."
        />
        <FeatureCard
          icon={<Globe className="h-10 w-10 text-blue-500" />}
          title="Galactic Access"
          description="Access and convert your files from any corner of the known universe."
        />
      </div>
    </section>
  );
}
