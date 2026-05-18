import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { FeaturedDoctors } from "@/components/home/FeaturedDoctors";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PlatformFeatures } from "@/components/home/PlatformFeatures";
import { WebsiteSpotlight } from "@/components/home/WebsiteSpotlight";
import { FinalCTA } from "@/components/home/FinalCTA";
import { getHeroSections, getDoctors } from "@/lib/api";

export default async function HomePage() {
  // Fetch data in parallel
  const [heroes, doctors] = await Promise.all([
    getHeroSections(),
    getDoctors(),
  ]);

  const hero = heroes[0]; // Use first hero section
  const featuredDoctors = doctors.slice(0, 3);

  return (
    <main>
      {hero && <Hero data={hero} />}
      <StatsBar />
      {featuredDoctors.length > 0 && (
        <FeaturedDoctors doctors={featuredDoctors} />
      )}
      <HowItWorks />
      <PlatformFeatures />
      <WebsiteSpotlight />
      <FinalCTA />
    </main>
  );
}

// Made with Bob
