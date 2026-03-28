import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] w-full flex items-center overflow-hidden bg-surface-container-low">
        <div className="absolute inset-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPG2-Ekkl-36N8aVK9cDdbTvO2dBeWOeHa7VNv3nD7AjNBGho0uPPcNy7sa2xJBfmwZZn1U6z46Aq8j76TR0Sq9g2mFaMNR61SO0OVpGbg10kDbf1Z5zSulCiiWuID2N0MKBoTACPvFfRj4v34_LtjIQIrZELzA_af3zqSO4DvcNxxTO-VZdt8mRuLGPeEhAnXLv-b5bE7MMTAvGJ-8BzuF2A2HTkC4lGivlBL7h2W_W446aGw97mrAE2o6y0mIp5AtWqiYKPdRVuJ"
            alt="MISUNI Atelier"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#2d3435]/40" />
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-8 md:px-16 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-[0.5rem] text-white mb-4">
              Our Story
            </h1>
            <p className="text-lg md:text-xl font-light tracking-widest text-white/80 max-w-xl mx-auto">
              Three generations of crafting brilliance
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
                alt="MISUNI founder"
                width={800}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="max-w-md">
              <span className="text-[0.6875rem] tracking-[0.25rem] uppercase text-[#5f5e5e] mb-6 block">
                The Beginning
              </span>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-[0.4rem] leading-tight text-[#2d3435] mb-8">
                A Legacy of Brilliance
              </h2>
              <p className="text-base font-light tracking-wide text-[#2d3435]/80 leading-relaxed mb-6">
                Founded in the pursuit of perfection, MISUNI was born from a
                simple belief: that the finest jewelry should be accessible to
                those who appreciate true craftsmanship.
              </p>
              <p className="text-base font-light tracking-wide text-[#2d3435]/80 leading-relaxed">
                Every piece in our collection represents hours of meticulous
                handwork, from the initial sketch to the final polish. We source
                only the most exceptional stones, working with master gemologists
                to ensure every diamond meets our exacting standards.
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
              <span className="text-[0.6875rem] tracking-[0.25rem] uppercase text-[#5f5e5e] mb-4 block">
                Our Principles
              </span>
              <h2 className="text-4xl font-bold uppercase tracking-[0.3rem] text-[#2d3435]">
                What We Stand For
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                title: "Purity",
                icon: "diamond",
                desc: "We use only the finest materials — ethically sourced diamonds, conflict-free stones, and precious metals of the highest purity.",
              },
              {
                title: "Integrity",
                icon: "verified",
                desc: "Every piece comes with full certification and transparency. We believe in honest craftsmanship and fair pricing.",
              },
              {
                title: "Brilliance",
                icon: "auto_awesome",
                desc: "Our master craftsmen bring decades of expertise to every piece, ensuring that each creation achieves maximum light performance.",
              },
            ].map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.15}>
                <div className="text-center">
                  <span className="material-symbols-outlined text-4xl text-[#5f5e5e] mb-6 block">
                    {value.icon}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-[0.2rem] text-[#2d3435] mb-4">
                    {value.title}
                  </h3>
                  <p className="text-sm font-light tracking-wide text-[#5a6061] leading-relaxed max-w-xs mx-auto">
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
              <span className="text-[0.6875rem] tracking-[0.25rem] uppercase text-[#5f5e5e] mb-6 block">
                Craftsmanship
              </span>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-[0.4rem] leading-tight text-[#2d3435] mb-8">
                Made by Hand, Built to Last
              </h2>
              <p className="text-base font-light tracking-wide text-[#2d3435]/80 leading-relaxed mb-6">
                Each MISUNI piece passes through over 40 individual stages of
                creation. From wax carving to stone setting, our artisans bring
                centuries of tradition to every detail.
              </p>
              <p className="text-base font-light tracking-wide text-[#2d3435]/80 leading-relaxed">
                Our atelier in the heart of the jewelry district houses
                state-of-the-art equipment alongside traditional hand tools —
                because the best results come from combining innovation with
                time-honored technique.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="aspect-[4/5] overflow-hidden bg-surface-container-lowest">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvXiYKvp1Dhxi-4nBzmiXihyoCaVR__M6tlnWeZUQJPDCi8Cil9OftSQ53GToM9dvjPkb8yiX0Q5g7pQmuKWx-uRzSVlp5qBcA0oK6dngIlGxSWhcYDJx4LSEbWUaP2jITnzu2Rj2voMSwyFygVRoDG0YR20I3SyOeWnWlOwoFbLi5oQC8e6hPWAs1xTuTDyjwt8IrrQF1LPReRgDfI1GBQlQ6B1WQMs_Qm4aJBsSWFOiB51L1e45mcM5UHilPz31Im84Z5SYpOcrd"
                alt="MISUNI craftsmanship"
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
