"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";

export default function Hero() {
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => {
      const threshold = 200; // start fading after 200px
      setFadeOut(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          fadeOut ? "opacity-0" : "opacity-100"
        } blur-[2px]`}
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex h-full items-center justify-start text-left px-12 md:px-20">
        <div>
          <h1 className="font-brand text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            {t("appTitle").split("–")[0].trim()}
          </h1>
          <h2 className="font-brand text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2">
            {t("appTitle").split("–")[1]?.trim()}
          </h2>
          <p className="mt-4 text-white/80 text-lg md:text-2xl">
            {t("heroSubtitle")}
          </p>
          <a
            href="#order"
            className="inline-flex items-center justify-center mt-10 px-6 py-3 rounded-xl border-2 border-white text-white font-semibold hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
          >
            <span className="mr-2">{t("ctaStartOrder")}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v12.69l4.22-4.22a.75.75 0 111.06 1.06l-5.5 5.5a.75.75 0 01-1.06 0l-5.5-5.5a.75.75 0 111.06-1.06l4.22 4.22V4.5A.75.75 0 0112 3.75z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center">
        <a href="#order" className="animate-bounce text-[#D4AF37]" aria-label="scroll down">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path fillRule="evenodd" d="M12 3a1 1 0 011 1v11.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5A1 1 0 016.707 12.293L10 15.586V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </section>
  );
}


