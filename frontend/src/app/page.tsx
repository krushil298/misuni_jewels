import { HeroSection } from "@/components/home/HeroSection";
import { CategoryIndex } from "@/components/home/CategoryIndex";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { MetalStory } from "@/components/home/MetalStory";
import { CraftSection } from "@/components/home/CraftSection";
import { ClosingPanel } from "@/components/home/ClosingPanel";

/**
 * Homepage, read as a numbered register:
 * masthead → 01 forms → 02 pieces → 03 metals → 04 atelier → 05 visit.
 *
 * Section 04 breaks to a full-width tinted band deliberately; five ruled
 * sections in a row would flatten into wallpaper.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryIndex />
      <FeaturedSection />
      <MetalStory />
      <CraftSection />
      <ClosingPanel />
    </>
  );
}
