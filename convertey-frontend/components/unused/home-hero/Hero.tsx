import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="py-20 md:py-44 text-center gap-4">
      <h1 className="text-5xl sm:text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600">
        Welcome To CosmoConverter
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-8 md:mb-12 font-semibold text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Transform your files at the speed of light across the digital universe!
      </p>

      <Button
        size={null}
        className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full text-lg md:text-xl py-3 px-6 md:py-4 md:px-8"
      >
        <Rocket className="mr-2 h-4 w-4 md:h-5 md:w-5" />
        Launch File Converter
      </Button>
    </section>
  );
}
