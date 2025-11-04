"use client";
import { useLang } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-24 border-t border-[#D4AF37]/40">
      <div className="section py-10 text-center text-white/70">
        {t("footer")}
      </div>
    </footer>
  );
}


