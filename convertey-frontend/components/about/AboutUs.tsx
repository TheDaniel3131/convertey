import { Card, CardContent } from "@/components/ui/card";
// import TeamMember from "@/components/elements/about/TeamMember";

export default function AboutUs() {
  return (
    <main className="container mx-auto px-4 py-16 relative z-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-600 pb-2">
        About Convertey
      </h1>
      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300">
              At Convertey, we&apos;re dedicated to providing a fast, intuitive, and 
              reliable file conversion platform. Our goal is to simplify the 
              conversion process by offering seamless file uploads and instant 
              conversions, while handling all the complex processing behind 
              the scenes.
            </p>
          </CardContent>
        </Card>

        {/* <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Meet The Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TeamMember
                name="Daniel Poh"
                role="Co-Founder of Convertey"
                image="/placeholder.svg?height=100&width=100"
                description="Passionate developer focused on creating innovative solutions and exceptional user experiences."
              />
              <TeamMember
                name="Tan Han Jay"
                role="Co-Founder of Convertey"
                image="/placeholder.svg?height=100&width=100"
                description="Tech enthusiast and software engineer dedicated to building scalable and efficient applications."
              />
            </div>
          </CardContent>
        </Card> */}

        <Card className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Founded in February 2025, Convertey emerged from our shared vision 
              to revolutionize file conversion services. As a team of dedicated 
              software developers, we recognized the need for a more efficient, 
              user-friendly platform that puts simplicity and performance first.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
