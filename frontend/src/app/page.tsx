import { HeroSection } from "@/components/home/HeroSection";
import { CategoryCircles } from "@/components/home/CategoryCircles";
import { BestsellersSection } from "@/components/home/BestsellersSection";
import { CollectionsGrid } from "@/components/home/CollectionsGrid";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryCircles />
      <BestsellersSection />
      <CollectionsGrid />
    </>
  );
}
