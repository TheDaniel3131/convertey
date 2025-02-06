import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    /* Hero Section */
    <section className="py-48 text-center gap-4">
      <h1 className="text-7xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600">
        Welcome To CosmoConverter
      </h1>
      <p className="text-xl md:text-1xl mb-12 font-semibold text-gray-600 dark:text-gray-400">
        Transform your files at the speed of light across the digital universe!
      </p>
      <Button
        size={null}
        className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full text-xl py-4 px-8"
      >
        <Rocket className="mr-2 h-5 w-5" /> Launch File Converter
      </Button>
    </section>
  );
}
