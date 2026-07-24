"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[current];

  return (
    <section className="py-16 sm:py-24 bg-surface-container-low relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[0.6rem] sm:text-[0.65rem] tracking-[0.3rem] sm:tracking-[0.4rem] font-medium uppercase text-primary mb-3 sm:mb-4 block flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-primary" />
              What They Say
              <span className="w-8 h-px bg-primary" />
            </span>
            <h2 className="text-3xl sm:text-5xl font-light uppercase tracking-[0.15rem] sm:tracking-[0.2rem] text-on-surface">
              Testimonials
            </h2>
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto text-center min-h-[200px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Star rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#b8956a"
                    stroke="none"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-lg sm:text-xl font-light tracking-wide text-on-surface/80 leading-relaxed mb-8 italic max-w-2xl">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div>
                <p className="text-[0.75rem] font-bold uppercase tracking-[0.2rem] text-on-surface mb-1">
                  {testimonial.name}
                </p>
                <p className="text-[0.65rem] uppercase tracking-[0.15rem] text-on-surface-variant">
                  {testimonial.location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-primary w-6"
                  : "bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
