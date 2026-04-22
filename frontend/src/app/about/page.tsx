import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const DiamondIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#798d8c" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12l4 6-10 13L2 9z"/><path d="M2 9h20"/><path d="M10 3l-4 6 6 13 6-13-4-6"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#798d8c" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
  </svg>
);

const SparkleIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#798d8c" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] w-full flex items-center overflow-hidden bg-surface-container-low">
        <div className="absolute inset-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPG2-Ekkl-36N8aVK9cDdbTvO2dBeWOeHa7VNv3nD7AjNBGho0uPPcNy7sa2xJBfmwZZn1U6z46Aq8j76TR0Sq9g2mFaMNR61SO0OVpGbg10kDbf1Z5zSulCiiWuID2N0MKBoTACPvFfRj4v34_LtjIQIrZELzA_af3zqSO4DvcNxxTO-VZdt8mRuLGPeEhAnXLv-b5bE7MMTAvGJ-8BzuF2A2HTkC4lGivlBL7h2W_W446aGw97mrAE2o6y0mIp5AtWqiYKPdRVuJ"
            alt="MISUNI Jewels Atelier"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#1a2421]/40" />
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-8 md:px-16 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-[0.5rem] text-white mb-4">
              Our Story
            </h1>
            <p className="text-lg md:text-xl font-light tracking-widest text-white/80 max-w-xl mx-auto">
              Crafting diamond brilliance in gold
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-32 max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <AnimatedSection>
            <div className="aspect-[4/5] overflow-hidden bg-surface-container-lowest">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0opcWYvjPahpRLcqiBjIlPpchj-BADX-hb--1sbHFOdinl5rAVE9yK2kvGnCpdVyJe4HAa1L-9xdzbjkiaeODgBWyZGr68uPUhA5dPe3VZ_bBfO6R1khKjYe4Tvv-OWt0V6bDcLzHbcjjcgJVxKSVLhhUDTQo5Da87dkMw9YxrfLG35thiZ4TOiYF1nwGVJid5seSVqZ4IdrtZ8GwZjWcBNSNsivH5vQnaoxtv7EYt63rNpFURcKCdGblHuevaXr-qjCTSI2E4oqF"
                alt="MISUNI Jewels craftsman"
                width={800}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="max-w-md">
              <span className="text-[0.6875rem] tracking-[0.25rem] uppercase text-[#4a5553] mb-6 block">
                The Beginning
              </span>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-[0.4rem] leading-tight text-[#1a2421] mb-8">
                A Legacy of Brilliance
              </h2>
              <p className="text-base font-light tracking-wide text-[#1a2421]/80 leading-relaxed mb-6">
                Founded in the pursuit of perfection, MISUNI JEWELS was born from a
                simple belief: that the finest real diamond jewellery should be
                accessible to those who appreciate true craftsmanship.
              </p>
              <p className="text-base font-light tracking-wide text-[#1a2421]/80 leading-relaxed">
                Every piece in our collection is crafted in gold — whether it&apos;s
                the warmth of yellow gold, the elegance of white gold, or the
                romanticism of rose gold. We source only the most exceptional
                natural diamonds, working with master gemologists to ensure every
                stone meets our exacting standards and is IGI certified.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-surface-container-high">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <AnimatedSection>
            <div className="text-center mb-20">
              <span className="text-[0.6875rem] tracking-[0.25rem] uppercase text-[#4a5553] mb-4 block">
                Our Principles
              </span>
              <h2 className="text-4xl font-bold uppercase tracking-[0.3rem] text-[#1a2421]">
                What We Stand For
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                title: "Purity",
                icon: <DiamondIcon />,
                desc: "We use only natural, ethically sourced diamonds set in BIS hallmarked gold. Every stone is certified for clarity, cut, colour, and carat weight.",
              },
              {
                title: "Integrity",
                icon: <ShieldIcon />,
                desc: "Every piece comes with full IGI certification and BIS hallmarking. We believe in transparent pricing and honest craftsmanship.",
              },
              {
                title: "Brilliance",
                icon: <SparkleIcon />,
                desc: "Our master craftsmen bring decades of expertise to every piece, ensuring that each diamond achieves maximum fire, scintillation, and light performance.",
              },
            ].map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.15}>
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-[0.2rem] text-[#1a2421] mb-4">
                    {value.title}
                  </h3>
                  <p className="text-sm font-light tracking-wide text-[#4a5553] leading-relaxed max-w-xs mx-auto">
                    {value.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-32 max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <AnimatedSection>
            <div className="max-w-md">
              <span className="text-[0.6875rem] tracking-[0.25rem] uppercase text-[#4a5553] mb-6 block">
                Craftsmanship
              </span>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-[0.4rem] leading-tight text-[#1a2421] mb-8">
                Made by Hand, Built to Last
              </h2>
              <p className="text-base font-light tracking-wide text-[#1a2421]/80 leading-relaxed mb-6">
                Each MISUNI piece passes through over 40 individual stages of
                creation. From wax carving to diamond setting, our artisans bring
                generations of tradition to every detail.
              </p>
              <p className="text-base font-light tracking-wide text-[#1a2421]/80 leading-relaxed">
                Whether you choose yellow gold, white gold, or rose gold — every
                piece is BIS hallmarked and crafted with the same unwavering
                commitment to quality that defines our brand.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="aspect-[4/5] overflow-hidden bg-surface-container-lowest">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvXiYKvp1Dhxi-4nBzmiXihyoCaVR__M6tlnWeZUQJPDCi8Cil9OftSQ53GToM9dvjPkb8yiX0Q5g7pQmuKWx-uRzSVlp5qBcA0oK6dngIlGxSWhcYDJx4LSEbWUaP2jITnzu2Rj2voMSwyFygVRoDG0YR20I3SyOeWnWlOwoFbLi5oQC8e6hPWAs1xTuTDyjwt8IrrQF1LPReRgDfI1GBQlQ6B1WQMs_Qm4aJBsSWFOiB51L1e45mcM5UHilPz31Im84Z5SYpOcrd"
                alt="MISUNI Jewels diamond craftsmanship"
                width={800}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
