"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  value?: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

const LANGUAGES = [
  "Turkish 🇹🇷", "English 🇬🇧", "Dutch 🇳🇱", "German 🇩🇪", "French 🇫🇷", "Spanish 🇪🇸",
  "Italian 🇮🇹", "Portuguese 🇵🇹", "Russian 🇷🇺", "Arabic 🇦🇪", "Persian 🇮🇷",
  "Azerbaijani 🇦🇿", "Kurdish 🇹🇯", "Greek 🇬🇷", "Bulgarian 🇧🇬", "Romanian 🇷🇴",
  "Polish 🇵🇱", "Czech 🇨🇿", "Slovak 🇸🇰", "Hungarian 🇭🇺", "Ukrainian 🇺🇦",
  "Serbian 🇷🇸", "Croatian 🇭🇷", "Bosnian 🇧🇦", "Albanian 🇦🇱", "Georgian 🇬🇪",
  "Armenian 🇦🇲", "Hebrew 🇮🇱", "Hindi 🇮🇳", "Urdu 🇵🇰", "Bengali 🇧🇩", "Punjabi 🇮🇳",
  "Tamil 🇮🇳", "Telugu 🇮🇳", "Malayalam 🇮🇳", "Kannada 🇮🇳", "Marathi 🇮🇳",
  "Chinese (Mandarin) 🇨🇳", "Cantonese 🇭🇰", "Japanese 🇯🇵", "Korean 🇰🇷",
  "Indonesian 🇮🇩", "Malay 🇲🇾", "Filipino 🇵🇭", "Thai 🇹🇭", "Vietnamese 🇻🇳",
  "Swedish 🇸🇪", "Norwegian 🇳🇴", "Danish 🇩🇰", "Finnish 🇫🇮", "Icelandic 🇮🇸",
  "Irish 🇮🇪", "Scottish Gaelic 🏴", "Welsh 🏴", "Lithuanian 🇱🇹", "Latvian 🇱🇻",
  "Estonian 🇪🇪", "Slovenian 🇸🇮", "Macedonian 🇲🇰", "Bosnian 🇧🇦", "Catalan 🇪🇸",
  "Basque 🇪🇸", "Galician 🇪🇸", "Nepali 🇳🇵", "Swahili 🇰🇪", "Amharic 🇪🇹",
  "Somali 🇸🇴", "Yoruba 🇳🇬", "Hausa 🇳🇬", "Zulu 🇿🇦", "Afrikaans 🇿🇦"
];

export default function LanguageSelect({ value, onChange, placeholder }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LANGUAGES;
    return LANGUAGES.filter((l) => l.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div
        className="input-base w-full cursor-text flex items-center justify-between"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="truncate">{value || placeholder || "Select language"}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white/60">
          <path fillRule="evenodd" d="M12 14.5l-4-4 1.4-1.4L12 11.7l2.6-2.6L16 10.5l-4 4z" clipRule="evenodd" />
        </svg>
      </div>
      {open && (
        <div className="absolute z-20 mt-2 w-full bg-black/90 border border-[#D4AF37]/40 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
          <input
            autoFocus
            className="w-full px-3 py-2 bg-transparent text-white placeholder-white/50 focus:outline-none border-b border-[#D4AF37]/20"
            placeholder="Search language..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="max-h-56 overflow-auto">
            {filtered.map((l) => (
              <button
                key={l}
                className="w-full text-left px-3 py-2 hover:bg-white/10"
                onClick={() => { onChange(l); setOpen(false); }}
              >
                {l}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="px-3 py-2 text-white/60">No results</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


