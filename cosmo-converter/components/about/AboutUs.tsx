import { Card, CardContent } from "@/components/ui/card";
import TeamMember from "@/components/elements/about/TeamMember";

export default function AboutUs() {
  return (
    <main className="container mx-auto px-4 py-16 relative z-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        About CosmoCrafters
      </h1>
      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300">
              At CosmoCrafters, we aim to create a faster, user-friendlier, and
              efficient file conversion website. Therefore, we create
              CosmoConverter, where users are able to upload and convert files
              easily and swiftly while we take care of the background process
              and the rest of the stuffs.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Meet The Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TeamMember
                name="Daniel Poh"
                role="Co-Founder of CosmoCrafters"
                image="/placeholder.svg?height=100&width=100"
                description="Hi, I am Daniel. I like to dev."
              />
              <TeamMember
                name="Tan Han Jay"
                role="Co-Founder of CosmoCrafters"
                image="/placeholder.svg?height=100&width=100"
                description="A tech enthusiast and upcoming software engineer."
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Background</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Founded in 4 February 2025, CosmoCrafters started as a small team
              of passionate software developers with a vision to create a better
              file conversion website for user to use.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
