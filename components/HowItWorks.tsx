"use client";

import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";

export default function HowItWorks() {
  const { t } = useLang();
  return (
    <section className="w-full bg-[#2a2a2a] py-12">
      <div className="section">
        <hr
          style={{
            border: "none",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
            margin: "40px 0",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
          style={{
            backgroundColor: "#f4efe0",
            color: "#111",
            padding: "60px 20px",
            borderRadius: "16px",
            boxShadow: "0 0 30px rgba(249, 214, 92, 0.2)",
            margin: "60px auto",
            maxWidth: "900px",
            fontSize: "1.15rem",
            lineHeight: "1.8",
          }}
        >
          <h2 className="text-[#D4AF37] text-3xl md:text-4xl font-bold mb-6">{t("howItWorksTitle")}</h2>
          <p>
            {t("howItWorksText")}
          </p>
        </motion.div>
        <hr
          style={{
            border: "none",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
            margin: "40px 0",
          }}
        />
      </div>
    </section>
  );
}

