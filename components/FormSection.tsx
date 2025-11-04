"use client";

import { motion } from "framer-motion";
import SongForm from "@/components/SongForm";

export default function FormSection() {
  return (
    <section
      id="order"
      className="relative min-h-screen flex justify-center items-center bg-gradient-to-b from-black via-[#0a0a0a] to-[#1a1a1a] py-20 px-4 overflow-hidden scroll-mt-20"
    >
      <video
        className="absolute inset-0 w-full h-full object-cover blur-sm opacity-55 pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/form.mp4/form-background.mp4" type="video/mp4" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 border border-[#D4AF37]/40 rounded-2xl shadow-[0_0_25px_rgba(212,175,55,0.15)] p-6 sm:p-8 max-w-3xl w-full bg-black/60 backdrop-blur-sm"
      >
        <SongForm />
      </motion.div>
    </section>
  );
}


