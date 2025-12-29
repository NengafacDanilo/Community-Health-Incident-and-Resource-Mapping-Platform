import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/components/ui/carousel";

const AboutPage = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
          About the Platform
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          A community-centered digital solution for public health.
        </p>
      </header>

      <section className="mb-12">
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-video items-center justify-center p-6 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold text-blue-800 dark:text-blue-200">Community First</h3>
                      <p className="mt-2 text-lg text-blue-700 dark:text-blue-300">
                        “Empowering communities to speak up about health and sanitation challenges.”
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-video items-center justify-center p-6 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold text-green-800 dark:text-green-200">Real-Time Awareness</h3>
                      <p className="mt-2 text-lg text-green-700 dark:text-green-300">
                        “Turning everyday reports into actionable public health insights.”
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-video items-center justify-center p-6 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold text-yellow-800 dark:text-yellow-200">Informed Decision-Making</h3>
                      <p className="mt-2 text-lg text-yellow-700 dark:text-yellow-300">
                        “Supporting authorities with clear data and community-driven insights.”
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-video items-center justify-center p-6 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold text-purple-800 dark:text-purple-200">Healthier Communities</h3>
                      <p className="mt-2 text-lg text-purple-700 dark:text-purple-300">
                        “Building safer, cleaner, and healthier environments together.”
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              To improve community well-being by enabling transparent reporting of health and sanitation issues, supporting rapid response, and promoting informed decision-making through accurate, location-based insights.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What the Platform Does</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              <li>Empowers residents to report health and sanitation incidents quickly and responsibly.</li>
              <li>Provides a clear overview of reported issues across the community.</li>
              <li>Helps authorities identify trends, hotspots, and urgent cases.</li>
              <li>Encourages proactive public health and sanitation management.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Who It Serves</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              <li>Community residents seeking a reliable reporting channel.</li>
              <li>Public health and sanitation officials monitoring community conditions.</li>
              <li>Local authorities responsible for planning and response.</li>
              <li>Organizations involved in health awareness and intervention.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              <li>Faster detection of health risks.</li>
              <li>Reduced response delays.</li>
              <li>Better coordination among stakeholders.</li>
              <li>Increased community participation in public health matters.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-12 pt-8 border-t text-center text-gray-500 dark:text-gray-400">
        <p className="font-semibold">Academic Context</p>
        <p className="mt-2 text-sm">
          This platform is developed as part of an academic project under <span className="font-medium">CEC315: Introduction to Cloud Computing</span>, supervised by <span className="font-medium">Mr. Kometa Denis</span>. It demonstrates how modern digital systems can be applied to real-world community health and sanitation challenges.
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;
