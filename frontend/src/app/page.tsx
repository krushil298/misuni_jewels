import { HeroSection } from "@/components/home/HeroSection";
import { AssuranceStrip } from "@/components/home/AssuranceStrip";
import { CategoryRail } from "@/components/home/CategoryRail";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { MetalStory } from "@/components/home/MetalStory";
import { CraftSection } from "@/components/home/CraftSection";

/**
 * Homepage.
 *
 * Ordered as a first-time visitor reads it: what this is → why trust it →
 * what's available → the pieces themselves → how it's made → come and see.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AssuranceStrip />
      <CategoryRail />
      <FeaturedSection />
      <MetalStory />
      <CraftSection />
    </>
  );
}
