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
              At CosmoCrafters, we&apos;re on a mission to revolutionize file
              conversion across the digital universe. Our flagship product,
              Cosmo Converter, is designed to break down the barriers between
              file formats, allowing seamless transformation of data across all
              digital dimensions.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TeamMember
                name="Daniel Poh"
                role="Co-Founder of CosmoCrafters"
                image="/placeholder.svg?height=100&width=100"
                description="A visionary leader with extensive experience in software development and a passion for innovation."
              />
              <TeamMember
                name="Tan Han Jay"
                role="Co-Founder of CosmoCrafters"
                image="/placeholder.svg?height=100&width=100"
                description="A tech expert with a deep understanding of algorithms and a drive to push the boundaries of technology."
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Journey</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Founded in 2025, CosmoCrafters started as a small team of
              passionate developers and designers who believed in the power of
              seamless data transformation. Today, we&apos;re proud to serve
              millions of users across the galaxy, constantly pushing the
              boundaries of what&apos;s possible in file conversion technology.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
