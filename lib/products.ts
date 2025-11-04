export type Question =
  | { id: string; label: string; type: "text"; placeholder?: string; required?: boolean }
  | { id: string; label: string; type: "textarea"; placeholder?: string; required?: boolean }
  | { id: string; label: string; type: "select"; options: string[]; required?: boolean }
  | { id: string; label: string; type: "radio"; options: string[]; required?: boolean }
  | { id: string; label: string; type: "file"; multiple?: boolean; required?: boolean };

export type Product = {
  id: string;
  // legacy title kept for fallback; do not rely on it in UI
  title: string;
  questions: Question[];
};

const commonQuestions: Question[] = [
  { id: "name", label: "Your Name / Adınız", type: "text", required: true },
  { id: "email", label: "Email", type: "text", required: true },
  { id: "phone", label: "Phone / Telefon", type: "text" },
  { id: "language", label: "Language / Şarkı dili", type: "select", options: ["Turkish 🇹🇷", "English 🇬🇧", "Both 🇹🇷/🇬🇧", "Doesn’t matter 🎵"] },
  { id: "vocalist", label: "Who should sing it? / Vokal", type: "radio", options: ["Male 👨", "Female 👩", "Duet 👩‍❤️‍👨", "Doesn’t matter 🎤"] },
  { id: "tempo", label: "Song tempo / Tempo", type: "radio", options: ["Slow 🐢", "Medium 🚶", "Fast 🚀", "Doesn’t matter 🎼"] },
  { id: "genre", label: "Type of music / Tür", type: "select", options: ["Pop 🎧", "Rock 🎸", "Jazz 🎷", "Rap 🎤", "R&B 🎹", "Acoustic 🎻", "Classical 🎼", "Folk 🪕", "Other ✨"] },
  { id: "mood", label: "Mood / Ruh hali", type: "select", options: ["Happy 🙂", "Romantic 💖", "Nostalgic 🕰️", "Epic 🏔️", "Calm 🌙", "Surprise 🎁", "Other ✨"] },
  { id: "story", label: "Special words, story, or names / Özel notlar", type: "textarea", placeholder: "Key names, dates, your story..." },
  { id: "referenceSong", label: "Reference song (URL)", type: "text", placeholder: "Spotify/YouTube link (optional)" },
  { id: "publish", label: "Publish? / Yayınlansın mı?", type: "select", options: ["Spotify 🟢", "YouTube 🔴", "Instagram 📸", "Keep private 🔒"] },
  { id: "attachments", label: "Upload files (lyrics, refs)", type: "file", multiple: true }
];

export const products: Product[] = [
  { id: "wedding-song", title: "Unutulmaz Bir Düğün İçin Şarkınız!", questions: commonQuestions },
  { id: "proposal-song", title: "Evlilik Teklifinizi Şarkınızla Yapın", questions: commonQuestions },
  { id: "love-song", title: "Aşkınıza Özel Şarkınız!", questions: commonQuestions },
  { id: "poem", title: "Aşkınızı Şiire Dönüştürün", questions: [
      ...commonQuestions,
      { id: "delivery", label: "Delivery format (poem/song)", type: "select", options: ["Poem text", "Spoken word", "Song"] }
    ] },
  { id: "birthday", title: "Doğum Günü İçin Özel Bir Şarkı", questions: commonQuestions },
  { id: "wedding-album", title: "Düğün/Kına 10 Şarkılık Özel Albüm", questions: [
      ...commonQuestions,
      { id: "numSongs", label: "Number of songs", type: "select", options: ["5", "10", "15"] }
    ] },
  { id: "lullaby", title: "Bebeğinize Ninni ve Uyku Müzikleri", questions: [
      ...commonQuestions,
      { id: "babyName", label: "Baby name / Bebek adı", type: "text" }
    ] },
  { id: "event-launch", title: "Özel Organizasyon / Ürün Lansmanı / Fuar için Şarkınız", questions: [
      ...commonQuestions,
      { id: "brand", label: "Brand / Marka", type: "text" }
    ] },
  { id: "business-soundscapes", title: "İşletmeniz İçin Özel Müzikler (Soundscapes)", questions: [
      ...commonQuestions,
      { id: "useCase", label: "Use case (store, app, etc.)", type: "text" }
    ] }
];

export type Lang = "en" | "tr" | "nl";

export const productTitleByLang: Record<string, Record<Lang, string>> = {
  "wedding-song": {
    en: "Your Song for an Unforgettable Wedding",
    tr: "Unutulmaz Bir Düğün İçin Şarkınız!",
    nl: "Jouw Lied voor een Onvergetelijke Bruiloft",
  },
  "proposal-song": {
    en: "Propose with Your Song",
    tr: "Evlilik Teklifinizi Şarkınızla Yapın",
    nl: "Doe Je Aanzoek met Jouw Lied",
  },
  "love-song": {
    en: "A Custom Love Song for You",
    tr: "Aşkınıza Özel Şarkınız!",
    nl: "Een Persoonlijk Liefdeslied",
  },
  poem: {
    en: "Turn Your Love into Poetry",
    tr: "Aşkınızı Şiire Dönüştürün",
    nl: "Verander Jullie Liefde in Poëzie",
  },
  birthday: {
    en: "A Special Birthday Song",
    tr: "Doğum Günü İçin Özel Bir Şarkı",
    nl: "Een Speciaal Verjaardagslied",
  },
  "wedding-album": {
    en: "Wedding/Henna 10-Song Special Album",
    tr: "Düğün/Kına 10 Şarkılık Özel Albüm",
    nl: "Bruiloft/Henna Album met 10 Liedjes",
  },
  lullaby: {
    en: "Lullabies and Sleep Music for Your Baby",
    tr: "Bebeğinize Ninni ve Uyku Müzikleri",
    nl: "Slaapliedjes en Muziek voor je Baby",
  },
  "event-launch": {
    en: "Song for Events / Product Launch / Fair",
    tr: "Özel Organizasyon / Ürün Lansmanı / Fuar için Şarkınız",
    nl: "Lied voor Event / Productlancering / Beurs",
  },
  "business-soundscapes": {
    en: "Custom Music for Your Business (Soundscapes)",
    tr: "İşletmeniz İçin Özel Müzikler (Soundscapes)",
    nl: "Maatwerk Muziek voor je Bedrijf (Soundscapes)",
  },
};

export function getProductOptions(lang: Lang) {
  return products.map((p) => ({ value: p.id, label: productTitleByLang[p.id]?.[lang] ?? p.title }));
}

export function getProductTitle(productId: string, lang: Lang) {
  return productTitleByLang[productId]?.[lang] ?? products.find(p => p.id === productId)?.title ?? productId;
}

export function getQuestions(productId?: string): Question[] {
  if (!productId) return [];
  const p = products.find((x) => x.id === productId);
  return p ? p.questions : [];
}

// Translation mapping for form labels and options
// This function should be used with the translation system from LanguageProvider
export function getTranslatedQuestions(productId: string | undefined, t: (key: string) => string, lang: Lang): Question[] {
  if (!productId) return [];
  
  const labelMap: Record<string, string> = {
    name: t("formLabelName"),
    email: t("formLabelEmail"),
    phone: t("formLabelPhone"),
    language: t("formLabelLanguage"),
    vocalist: t("formLabelVocalist"),
    tempo: t("formLabelTempo"),
    genre: t("formLabelGenre"),
    mood: t("formLabelMood"),
    story: t("formLabelStory"),
    referenceSong: t("formLabelReferenceSong"),
    publish: t("formLabelPublish"),
    attachments: t("formLabelAttachments"),
    delivery: t("formLabelDelivery"),
    numSongs: t("formLabelNumSongs"),
    babyName: t("formLabelBabyName"),
    brand: t("formLabelBrand"),
    useCase: t("formLabelUseCase"),
  };

  const optionMap: Record<string, Record<string, string>> = {
    language: {
      "Turkish 🇹🇷": t("formOptionTurkish"),
      "English 🇬🇧": t("formOptionEnglish"),
      "Both 🇹🇷/🇬🇧": t("formOptionBoth"),
      "Doesn't matter 🎵": t("formOptionDoesntMatter"),
    },
    vocalist: {
      "Male 👨": t("formOptionMale"),
      "Female 👩": t("formOptionFemale"),
      "Duet 👩‍❤️‍👨": t("formOptionDuet"),
      "Doesn't matter 🎤": t("formOptionDoesntMatter"),
    },
    tempo: {
      "Slow 🐢": t("formOptionSlow"),
      "Medium 🚶": t("formOptionMedium"),
      "Fast 🚀": t("formOptionFast"),
      "Doesn't matter 🎼": t("formOptionDoesntMatter"),
    },
    genre: {
      "Pop 🎧": t("formOptionPop"),
      "Rock 🎸": t("formOptionRock"),
      "Jazz 🎷": t("formOptionJazz"),
      "Rap 🎤": t("formOptionRap"),
      "R&B 🎹": t("formOptionRnB"),
      "Acoustic 🎻": t("formOptionAcoustic"),
      "Classical 🎼": t("formOptionClassical"),
      "Folk 🪕": t("formOptionFolk"),
      "Other ✨": t("formOptionOther"),
    },
    mood: {
      "Happy 🙂": t("formOptionHappy"),
      "Romantic 💖": t("formOptionRomantic"),
      "Nostalgic 🕰️": t("formOptionNostalgic"),
      "Epic 🏔️": t("formOptionEpic"),
      "Calm 🌙": t("formOptionCalm"),
      "Surprise 🎁": t("formOptionSurprise"),
      "Other ✨": t("formOptionOther"),
    },
    publish: {
      "Spotify 🟢": t("formOptionSpotify"),
      "YouTube 🔴": t("formOptionYouTube"),
      "Instagram 📸": t("formOptionInstagram"),
      "Keep private 🔒": t("formOptionKeepPrivate"),
    },
    delivery: {
      "Poem text": t("formOptionPoemText"),
      "Spoken word": t("formOptionSpokenWord"),
      "Song": t("formOptionSong"),
    },
  };

  const placeholderMap: Record<string, string> = {
    story: t("formPlaceholderStory"),
    referenceSong: t("formPlaceholderReferenceSong"),
  };

  const p = products.find((x) => x.id === productId);
  if (!p) return [];

  return p.questions.map((q) => {
    const translatedLabel = labelMap[q.id] || q.label;
    
    if (q.type === "select" || q.type === "radio") {
      const translatedOptions = q.options.map((opt) => {
        // Check if this option needs translation
        if (optionMap[q.id] && optionMap[q.id][opt]) {
          return optionMap[q.id][opt];
        }
        return opt;
      });
      
      return {
        ...q,
        label: translatedLabel,
        options: translatedOptions,
      } as Question;
    }
    
    if (q.type === "textarea" || q.type === "text") {
      const translatedPlaceholder = placeholderMap[q.id] || q.placeholder;
      return {
        ...q,
        label: translatedLabel,
        placeholder: translatedPlaceholder,
      } as Question;
    }
    
    return {
      ...q,
      label: translatedLabel,
    } as Question;
  });
}


