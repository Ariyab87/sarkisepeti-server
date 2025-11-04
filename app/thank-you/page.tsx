"use client";
import { useLang } from "@/components/LanguageProvider";

export default function ThankYou() {
  const { t } = useLang();
  return (
    <main className="section py-24 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-[#D4AF37]">{t("thankYou")}</h1>
      <p className="mt-4 text-white/80">{t("contactSoon")}</p>
      <a href="/" className="inline-block mt-8 gold-button">{t("backHome")}</a>
    </main>
  );
}


