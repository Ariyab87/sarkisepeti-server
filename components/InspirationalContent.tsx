"use client";

import { useEffect, useRef, useState } from "react";
import ImageCarousel from "./ImageCarousel";
import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";

export default function InspirationalContent({ images }: { images: string[] }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const { t } = useLang();
  return (
    <section
      className="relative py-20 text-center overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 50% 20%, rgba(212,175,55,0.35) 0%, rgba(0,0,0,0.95) 80%, #000000 100%)",
      }}
    >
      {/* subtle vertical glow behind the image */}
      <div className="absolute inset-x-0 top-1/2 h-[400px] bg-gradient-to-b from-[#D4AF37]/20 to-transparent blur-3xl" />
      <div className="section relative z-10" ref={ref}>
        {/* optional faint separator */}
        <div className="h-px w-3/4 mx-auto bg-[#D4AF37]/20 mb-12" />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-white text-2xl md:text-3xl font-semibold mb-8 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
            {t("inspireHeadline")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="mx-auto rounded-xl border border-[#D4AF37]/60 shadow-[0_0_45px_rgba(212,175,55,0.4)] hover:scale-105 transition-transform duration-700 ease-out overflow-hidden max-w-4xl">
            <ImageCarousel images={images} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}


