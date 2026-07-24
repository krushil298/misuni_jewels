import { HeroSection } from "@/components/home/HeroSection";
import { CategoryCircles } from "@/components/home/CategoryCircles";
import { BestsellersSection } from "@/components/home/BestsellersSection";
import { CollectionsGrid } from "@/components/home/CollectionsGrid";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { EditorialSection } from "@/components/home/EditorialSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryCircles />
      <BestsellersSection />
      <TestimonialsSection />
      <CollectionsGrid />
      <EditorialSection />
    </>
  );
}
