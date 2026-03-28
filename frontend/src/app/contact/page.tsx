"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-12 md:py-20">
      <AnimatedSection>
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-[0.3rem] text-[#2d3435] mb-4">
            Get in Touch
          </h1>
          <p className="text-lg font-light tracking-widest text-[#5f5e5e] max-w-md mx-auto">
            We&apos;d love to hear from you
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Form */}
        <AnimatedSection>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="text-[0.6875rem] tracking-widest uppercase font-bold text-[#2d3435] block mb-3">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-0 border-b border-[#2d3435]/20 py-3 text-[0.875rem] tracking-wide focus:outline-none focus:border-[#2d3435] transition-colors placeholder:text-[#adb3b4]"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="text-[0.6875rem] tracking-widest uppercase font-bold text-[#2d3435] block mb-3">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-0 border-b border-[#2d3435]/20 py-3 text-[0.875rem] tracking-wide focus:outline-none focus:border-[#2d3435] transition-colors placeholder:text-[#adb3b4]"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-[0.6875rem] tracking-widest uppercase font-bold text-[#2d3435] block mb-3">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent border-0 border-b border-[#2d3435]/20 py-3 text-[0.875rem] tracking-wide focus:outline-none focus:border-[#2d3435] transition-colors placeholder:text-[#adb3b4]"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label className="text-[0.6875rem] tracking-widest uppercase font-bold text-[#2d3435] block mb-3">
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-0 border-b border-[#2d3435]/20 py-3 text-[0.875rem] tracking-wide focus:outline-none focus:border-[#2d3435] transition-colors text-[#2d3435]"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="custom">Custom Order</option>
                <option value="returns">Returns &amp; Exchanges</option>
                <option value="appointment">Book an Appointment</option>
              </select>
            </div>
            <div>
              <label className="text-[0.6875rem] tracking-widest uppercase font-bold text-[#2d3435] block mb-3">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-transparent border-0 border-b border-[#2d3435]/20 py-3 text-[0.875rem] tracking-wide focus:outline-none focus:border-[#2d3435] transition-colors placeholder:text-[#adb3b4] resize-none"
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#2d3435] text-[#faf7f6] py-5 text-[0.75rem] font-bold tracking-[0.25rem] uppercase hover:bg-[#535252] transition-all active:scale-[0.98]"
            >
              {submitted ? "Message Sent!" : "Send Message"}
            </button>
          </form>
        </AnimatedSection>

        {/* Contact Info */}
        <AnimatedSection delay={0.2}>
          <div className="space-y-12">
            <div>
              <h3 className="text-[0.75rem] tracking-[0.2rem] uppercase font-bold text-[#2d3435] mb-6">
                Visit Our Boutique
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#5f5e5e] mt-0.5">
                    location_on
                  </span>
                  <p className="text-sm font-light tracking-wide text-[#5a6061] leading-relaxed">
                    523 Madison Avenue
                    <br />
                    New York, NY 10022
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#5f5e5e]">
                    phone
                  </span>
                  <p className="text-sm font-light tracking-wide text-[#5a6061]">
                    +1 (212) 555-0189
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#5f5e5e]">
                    mail
                  </span>
                  <p className="text-sm font-light tracking-wide text-[#5a6061]">
                    concierge@misuni.com
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[0.75rem] tracking-[0.2rem] uppercase font-bold text-[#2d3435] mb-6">
                Business Hours
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-light tracking-wide text-[#5a6061]">
                  <span>Monday — Friday</span>
                  <span>10:00 AM — 8:00 PM</span>
                </div>
                <div className="flex justify-between text-sm font-light tracking-wide text-[#5a6061]">
                  <span>Saturday</span>
                  <span>10:00 AM — 6:00 PM</span>
                </div>
                <div className="flex justify-between text-sm font-light tracking-wide text-[#5a6061]">
                  <span>Sunday</span>
                  <span>12:00 PM — 5:00 PM</span>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-[4/3] bg-surface-container-high flex items-center justify-center">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-[#adb3b4] mb-2 block">
                  map
                </span>
                <p className="text-[0.6875rem] tracking-widest uppercase text-[#757c7d]">
                  523 Madison Avenue, NYC
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
