"use client";

import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";

export default function AboutUs() {
  const { t } = useLang();
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative bg-gradient-to-t from-[#111111] via-[#1a1a1a] to-[#2a2a2a] py-20 text-center scroll-mt-20"
    >
      <div className="section relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-6">{t("aboutTitle")}</h2>
        <p className="max-w-3xl mx-auto text-white/80 text-lg leading-relaxed">
          {t("aboutText")}
        </p>
      </div>
      {/* subtle musical overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.07),_transparent_60%)]" />
    </motion.section>
  );
}


