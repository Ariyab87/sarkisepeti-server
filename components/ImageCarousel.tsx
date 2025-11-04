"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  images?: string[]; // paths under /images/, e.g., ["photo1.jpg", "photo2.jpg"]
  intervalMs?: number;
  aspectClassName?: string; // e.g., "aspect-[16/9]"
};

export default function ImageCarousel({
  images = ["photo1.svg", "photo2.svg", "photo3.svg"],
  intervalMs = 3000,
  aspectClassName = "aspect-[16/9]",
}: Props) {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  const slides = useMemo(() => images.map((p) => `/images/${p}`), [images]);

  return (
    <div className={`relative w-full ${aspectClassName} overflow-hidden rounded-2xl border border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.1)]`}>
      {/* base fallback background so carousel never looks empty */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#1a1a1a]" />
      {/* shimmer placeholder layer */}
      {slides.map((_, idx) => (
        <div
          key={`shim-${idx}`}
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent animate-[shimmer_1.6s_infinite] ${
            loaded[idx] ? "opacity-0" : "opacity-100"
          } transition-opacity duration-500 pointer-events-none`}
          style={{ maskImage: "linear-gradient(90deg, transparent, black 20%, black 80%, transparent)" }}
          onError={() => setLoaded((l) => ({ ...l, [idx]: true }))}
        />
      ))}

      {slides.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt="SarkıSepeti moment"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            idx === active ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded((l) => ({ ...l, [idx]: true }))}
        />
      ))}

      <style jsx global>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
}


