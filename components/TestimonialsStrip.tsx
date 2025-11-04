"use client";

import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";

type Testimonial = { name: string; textKey: string };

const testimonials: Testimonial[] = [
  { name: "Elif & Mehmet", textKey: "testimonial1Text" },
  { name: "Sofia", textKey: "testimonial2Text" },
  { name: "Deniz", textKey: "testimonial3Text" },
  { name: "Mert & Selin", textKey: "testimonial4Text" },
  { name: "Anna", textKey: "testimonial5Text" },
];

export default function TestimonialsStrip() {
  const { t } = useLang();
  
  // Get translated testimonials
  const translatedTestimonials = testimonials.map(testimonial => ({
    name: testimonial.name,
    text: t(testimonial.textKey as any),
  }));
  
  const strip = [...translatedTestimonials, ...translatedTestimonials];

  return (
    <section className="bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] py-16 overflow-hidden relative">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center text-white text-2xl md:text-3xl font-semibold mb-10"
      >
        {t("testimonialsTitle")}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative"
      >
        {/* left/right gradient masks for smooth edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10" />

        <div className="flex whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex space-x-6 px-6 animate-[marquee_40s_linear_infinite] sm:animate-[marquee_30s_linear_infinite]">
            {strip.map((item, idx) => (
              <article
                key={`${item.name}-${idx}`}
                className="min-w-[260px] bg-black/70 border border-[#D4AF37]/30 rounded-xl p-5 shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-3">
                  <p className="text-[#D4AF37] font-semibold truncate">{item.name}</p>
                </div>
                <p className="text-gray-200 italic">"{item.text}"</p>
              </article>
            ))}
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}


