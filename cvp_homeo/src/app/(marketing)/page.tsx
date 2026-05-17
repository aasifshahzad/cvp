import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { FeaturedDoctors } from "@/components/home/FeaturedDoctors";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PlatformFeatures } from "@/components/home/PlatformFeatures";
import { WebsiteSpotlight } from "@/components/home/WebsiteSpotlight";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <FeaturedDoctors />
      <HowItWorks />
      <PlatformFeatures />
      <WebsiteSpotlight />
      <FinalCTA />
    </main>
  );
}

// Made with Bob
