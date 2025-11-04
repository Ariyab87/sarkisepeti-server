"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "tr" | "nl";

type Dictionary = Record<string, Record<Lang, string>>;

const dict: Dictionary = {
  appTitle: {
    en: "SarkıSepeti – Create Your Own Song",
    tr: "SarkıSepeti – Kendi Şarkını Yarat",
    nl: "SarkıSepeti – Maak Jouw Eigen Lied",
  },
  heroSubtitle: {
    en: "Turn your love story into music",
    tr: "Aşk hikayenizi müziğe dönüştürün",
    nl: "Verander je liefdesverhaal in muziek",
  },
  ctaStartOrder: { en: "Start Your Order", tr: "Siparişe Başla", nl: "Bestelling Starten" },
  formTitle: { en: "Order your custom song", tr: "Özel şarkınızı sipariş edin", nl: "Bestel je eigen lied" },
  formSubtitle: { en: "Select a product, then answer the questions.", tr: "Bir ürün seçin ve soruları yanıtlayın.", nl: "Kies een product en beantwoord de vragen." },
  productLabel: { en: "Product", tr: "Ürün", nl: "Product" },
  chooseProduct: { en: "Choose a product", tr: "Bir ürün seçin", nl: "Kies een product" },
  selectAnOption: { en: "Select an option", tr: "Bir seçenek seçin", nl: "Kies een optie" },
  submit: { en: "Submit", tr: "Gönder", nl: "Versturen" },
  submitting: { en: "Submitting...", tr: "Gönderiliyor...", nl: "Versturen..." },
  thankYou: { en: "Thank you!", tr: "Teşekkürler!", nl: "Bedankt!" },
  contactSoon: { en: "We’ll contact you soon.", tr: "Sizinle yakında iletişime geçeceğiz.", nl: "We nemen snel contact op." },
  backHome: { en: "Back to Home", tr: "Ana sayfaya dön", nl: "Terug naar Home" },
  footer: {
    en: "© 2025 SarkıSepeti | Custom Songs for Every Moment",
    tr: "© 2025 SarkıSepeti | Her An için Özel Şarkılar",
    nl: "© 2025 SarkıSepeti | Persoonlijke Liedjes voor Elk Moment",
  },
  languages: { en: "English", tr: "Türkçe", nl: "Nederlands" },
  navOrder: { en: "Order", tr: "Sipariş", nl: "Bestellen" },
  navPricing: { en: "Pricing", tr: "Fiyatlar", nl: "Prijzen" },
  navAbout: { en: "About Us", tr: "Hakkımızda", nl: "Over Ons" },
  pricingTitle: { en: "Choose Your Song Package", tr: "Şarkı Paketini Seç", nl: "Kies Jouw Liedpakket" },
  pricingSubtitle: { en: "Make your memories unforgettable with a song written just for you.", tr: "Anılarınızı size özel yazılan bir şarkıyla unutulmaz kılın.", nl: "Maak herinneringen onvergetelijk met een lied op maat." },
  orderSong: { en: "Order Song", tr: "Şarkı Sipariş Et", nl: "Lied Bestellen" },
  addonsLabel: { en: "Add-ons", tr: "Ek Hizmetler", nl: "Extra’s" },
  addonSpotify: { en: "Publish on Spotify", tr: "Spotify’da Yayınla", nl: "Publiceer op Spotify" },
  addonYouTube: { en: "Publish on YouTube", tr: "YouTube’da Yayınla", nl: "Publiceer op YouTube" },
  addonOwnVoice: { en: "Use My Own Voice", tr: "Kendi Sesimi Kullanmak İstiyorum", nl: "Mijn Eigen Stem Gebruiken" },
  aboutTitle: { en: "About Us", tr: "Hakkımızda", nl: "Over Ons" },
  aboutText: {
    en: "We create songs that turn emotions into unforgettable melodies. Our team combines creativity, reliability, and professional sound quality to bring your story to life through music. Every project is delivered on time, with care and originality — because your song deserves nothing less than perfection.",
    tr: "Duyguları unutulmaz melodilere dönüştüren şarkılar üretiyoruz. Ekibimiz yaratıcılığı, güvenilirliği ve profesyonel ses kalitesini birleştirerek hikayenizi müzikle hayata geçirir. Her proje özenle, zamanında ve özgün olarak teslim edilir — çünkü şarkınız mükemmellikten daha azını hak etmiyor.",
    nl: "Wij maken liedjes die emoties omzetten in onvergetelijke melodieën. Ons team combineert creativiteit, betrouwbaarheid en professionele geluidskwaliteit om jouw verhaal tot leven te brengen met muziek. Elk project wordt op tijd, met zorg en originaliteit opgeleverd — want jouw lied verdient niets minder dan perfectie."
  },
  inspireHeadline: {
    en: "Make the best moments truly yours — turn your memories into a song.",
    tr: "En güzel anlar size özel olsun — anılarınızı bir şarkıya dönüştürün.",
    nl: "Maak de mooiste momenten echt van jou — verander herinneringen in een lied."
  },
  howItWorksTitle: { en: "How It Works", tr: "Nasıl Çalışır", nl: "Hoe Het Werkt" },
  howItWorksText: {
    en: "Creating your custom song is easy and personal. Choose your occasion, fill out the form with your story and details, and our creative team will compose and produce a unique, professional-quality song just for you.",
    tr: "Özel şarkınızı oluşturmak kolay ve kişiseldir. Töreninizi seçin, formu hikayeniz ve detaylarınızla doldurun, yaratıcı ekibimiz sizin için benzersiz, profesyonel kalitede bir şarkı besteleyip üretecektir.",
    nl: "Je eigen lied maken is gemakkelijk en persoonlijk. Kies je gelegenheid, vul het formulier in met je verhaal en details, en ons creatieve team zal een uniek, professioneel lied speciaal voor jou componeren en produceren."
  },
  testimonialsTitle: { en: "What Our Users Say", tr: "Kullanıcılarımız Ne Diyor", nl: "Wat Onze Gebruikers Zeggen" },
  addToBasket: { en: "Add to Basket", tr: "Sepete Ekle", nl: "Toevoegen aan Winkelwagen" },
  cartTitle: { en: "Shopping Basket", tr: "Alışveriş Sepeti", nl: "Winkelwagen" },
  cartEmpty: { en: "Your basket is empty", tr: "Sepetiniz boş", nl: "Uw winkelwagen is leeg" },
  cartEmptySubtext: { en: "Add items to get started", tr: "Başlamak için ürün ekleyin", nl: "Voeg items toe om te beginnen" },
  cartTotal: { en: "Total", tr: "Toplam", nl: "Totaal" },
  cartItems: { en: "Items", tr: "Ürün", nl: "Items" },
  cartSubtotal: { en: "Subtotal", tr: "Ara Toplam", nl: "Subtotaal" },
  checkout: { en: "Checkout", tr: "Ödeme", nl: "Afrekenen" },
  // Form question labels
  formLabelName: { en: "Your Name", tr: "Adınız", nl: "Uw Naam" },
  formLabelEmail: { en: "Email", tr: "E-posta", nl: "E-mail" },
  formLabelPhone: { en: "Phone", tr: "Telefon", nl: "Telefoon" },
  formLabelLanguage: { en: "Language", tr: "Şarkı Dili", nl: "Taal" },
  formLabelVocalist: { en: "Who should sing it?", tr: "Vokal", nl: "Wie moet het zingen?" },
  formLabelTempo: { en: "Song tempo", tr: "Tempo", nl: "Tempo" },
  formLabelGenre: { en: "Type of music", tr: "Tür", nl: "Muziektype" },
  formLabelMood: { en: "Mood", tr: "Ruh Hali", nl: "Sfeer" },
  formLabelStory: { en: "Special words, story, or names", tr: "Özel Notlar", nl: "Speciale woorden, verhaal of namen" },
  formLabelReferenceSong: { en: "Reference song (URL)", tr: "Referans Şarkı (URL)", nl: "Referentielied (URL)" },
  formLabelPublish: { en: "Publish?", tr: "Yayınlansın mı?", nl: "Publiceren?" },
  formLabelAttachments: { en: "Upload files (lyrics, refs)", tr: "Dosya Yükle (sözler, referanslar)", nl: "Bestanden uploaden (teksten, referenties)" },
  formLabelDelivery: { en: "Delivery format (poem/song)", tr: "Teslimat Formatı (şiir/şarkı)", nl: "Leveringsformaat (gedicht/lied)" },
  formLabelNumSongs: { en: "Number of songs", tr: "Şarkı Sayısı", nl: "Aantal liedjes" },
  formLabelBabyName: { en: "Baby name", tr: "Bebek Adı", nl: "Babynaam" },
  formLabelBrand: { en: "Brand", tr: "Marka", nl: "Merk" },
  formLabelUseCase: { en: "Use case (store, app, etc.)", tr: "Kullanım Durumu (mağaza, uygulama, vb.)", nl: "Gebruiksgeval (winkel, app, etc.)" },
  // Form option values
  formOptionTurkish: { en: "Turkish 🇹🇷", tr: "Türkçe 🇹🇷", nl: "Turks 🇹🇷" },
  formOptionEnglish: { en: "English 🇬🇧", tr: "İngilizce 🇬🇧", nl: "Engels 🇬🇧" },
  formOptionBoth: { en: "Both 🇹🇷/🇬🇧", tr: "Her İkisi 🇹🇷/🇬🇧", nl: "Beide 🇹🇷/🇬🇧" },
  formOptionDoesntMatter: { en: "Doesn't matter 🎵", tr: "Önemli Değil 🎵", nl: "Maakt niet uit 🎵" },
  formOptionMale: { en: "Male 👨", tr: "Erkek 👨", nl: "Man 👨" },
  formOptionFemale: { en: "Female 👩", tr: "Kadın 👩", nl: "Vrouw 👩" },
  formOptionDuet: { en: "Duet 👩‍❤️‍👨", tr: "Düet 👩‍❤️‍👨", nl: "Duet 👩‍❤️‍👨" },
  formOptionSlow: { en: "Slow 🐢", tr: "Yavaş 🐢", nl: "Langzaam 🐢" },
  formOptionMedium: { en: "Medium 🚶", tr: "Orta 🚶", nl: "Gemiddeld 🚶" },
  formOptionFast: { en: "Fast 🚀", tr: "Hızlı 🚀", nl: "Snel 🚀" },
  formOptionPop: { en: "Pop 🎧", tr: "Pop 🎧", nl: "Pop 🎧" },
  formOptionRock: { en: "Rock 🎸", tr: "Rock 🎸", nl: "Rock 🎸" },
  formOptionJazz: { en: "Jazz 🎷", tr: "Caz 🎷", nl: "Jazz 🎷" },
  formOptionRap: { en: "Rap 🎤", tr: "Rap 🎤", nl: "Rap 🎤" },
  formOptionRnB: { en: "R&B 🎹", tr: "R&B 🎹", nl: "R&B 🎹" },
  formOptionAcoustic: { en: "Acoustic 🎻", tr: "Akustik 🎻", nl: "Acoustisch 🎻" },
  formOptionClassical: { en: "Classical 🎼", tr: "Klasik 🎼", nl: "Klassiek 🎼" },
  formOptionFolk: { en: "Folk 🪕", tr: "Halk 🪕", nl: "Volks 🪕" },
  formOptionOther: { en: "Other ✨", tr: "Diğer ✨", nl: "Anders ✨" },
  formOptionHappy: { en: "Happy 🙂", tr: "Mutlu 🙂", nl: "Blij 🙂" },
  formOptionRomantic: { en: "Romantic 💖", tr: "Romantik 💖", nl: "Romantisch 💖" },
  formOptionNostalgic: { en: "Nostalgic 🕰️", tr: "Nostaljik 🕰️", nl: "Nostalgisch 🕰️" },
  formOptionEpic: { en: "Epic 🏔️", tr: "Destansı 🏔️", nl: "Episch 🏔️" },
  formOptionCalm: { en: "Calm 🌙", tr: "Sakin 🌙", nl: "Rustig 🌙" },
  formOptionSurprise: { en: "Surprise 🎁", tr: "Sürpriz 🎁", nl: "Verrassing 🎁" },
  formOptionSpotify: { en: "Spotify 🟢", tr: "Spotify 🟢", nl: "Spotify 🟢" },
  formOptionYouTube: { en: "YouTube 🔴", tr: "YouTube 🔴", nl: "YouTube 🔴" },
  formOptionInstagram: { en: "Instagram 📸", tr: "Instagram 📸", nl: "Instagram 📸" },
  formOptionKeepPrivate: { en: "Keep private 🔒", tr: "Gizli Tut 🔒", nl: "Privé houden 🔒" },
  formOptionPoemText: { en: "Poem text", tr: "Şiir metni", nl: "Gedichttekst" },
  formOptionSpokenWord: { en: "Spoken word", tr: "Sözlü kelime", nl: "Gesproken woord" },
  formOptionSong: { en: "Song", tr: "Şarkı", nl: "Lied" },
  // Form placeholders
  formPlaceholderStory: { en: "Key names, dates, your story...", tr: "Önemli isimler, tarihler, hikayeniz...", nl: "Belangrijke namen, data, jouw verhaal..." },
  formPlaceholderReferenceSong: { en: "Spotify/YouTube link (optional)", tr: "Spotify/YouTube bağlantısı (isteğe bağlı)", nl: "Spotify/YouTube link (optioneel)" },
  formPlaceholderPaytrName: { en: "Your Name", tr: "Adınız", nl: "Uw Naam" },
  formPlaceholderPaytrEmail: { en: "Email", tr: "E-posta", nl: "E-mail" },
  // Package descriptions
  packageDescWeddingSong: { en: "A fully customized song composed for your wedding day.", tr: "Düğün gününüz için tamamen özelleştirilmiş bir şarkı.", nl: "Een volledig op maat gemaakte lied voor uw trouwdag." },
  packageDescProposalSong: { en: "A romantic and unique proposal song just for you.", tr: "Sadece sizin için romantik ve benzersiz bir evlilik teklifi şarkısı.", nl: "Een romantisch en uniek aanzoeklied speciaal voor u." },
  packageDescLoveSong: { en: "Tell your story with a personal love song.", tr: "Kişisel bir aşk şarkısıyla hikayenizi anlatın.", nl: "Vertel uw verhaal met een persoonlijk liefdeslied." },
  packageDescPoem: { en: "Your love, crafted into poetry or spoken word.", tr: "Aşkınız, şiir veya sözlü kelimeye dönüştürülmüş.", nl: "Uw liefde, verwerkt in poëzie of gesproken woord." },
  packageDescBirthday: { en: "A celebratory track tailored to a special day.", tr: "Özel bir güne uyarlanmış kutlama şarkısı.", nl: "Een feestelijk nummer op maat gemaakt voor een speciale dag." },
  packageDescWeddingAlbum: { en: "A full album experience designed for your event.", tr: "Etkinliğiniz için tasarlanmış tam bir albüm deneyimi.", nl: "Een volledig album ervaring ontworpen voor uw evenement." },
  packageDescLullaby: { en: "Soothing lullabies personalized for your baby.", tr: "Bebeğiniz için kişiselleştirilmiş yatıştırıcı ninniler.", nl: "Kalmerende slaapliedjes gepersonaliseerd voor uw baby." },
  packageDescEventLaunch: { en: "Make your brand memorable with a custom song.", tr: "Özel bir şarkıyla markanızı unutulmaz kılın.", nl: "Maak uw merk onvergetelijk met een op maat gemaakt lied." },
  packageDescBusinessSoundscapes: { en: "Tailored ambience and sound design for your space.", tr: "Alanınız için özel olarak tasarlanmış atmosfer ve ses tasarımı.", nl: "Op maat gemaakte sfeer en sound design voor uw ruimte." },
  packageDescAddonSpotify: { en: "We'll publish your track on Spotify.", tr: "Şarkınızı Spotify'da yayınlayacağız.", nl: "We publiceren uw nummer op Spotify." },
  packageDescAddonYouTube: { en: "We'll publish your track on YouTube.", tr: "Şarkınızı YouTube'da yayınlayacağız.", nl: "We publiceren uw nummer op YouTube." },
  packageDescAddonOwnVoice: { en: "Sing it yourself — we'll guide and produce.", tr: "Kendiniz söyleyin — biz rehberlik edip prodüksiyon yapacağız.", nl: "Zing het zelf — wij begeleiden en produceren." },
  pricingNote: { en: "All songs are custom-produced and delivered digitally. Optional publishing services available on Spotify and YouTube.", tr: "Tüm şarkılar özel olarak üretilir ve dijital olarak teslim edilir. Spotify ve YouTube'da isteğe bağlı yayınlama hizmetleri mevcuttur.", nl: "Alle liedjes worden op maat geproduceerd en digitaal geleverd. Optionele publicatieservices beschikbaar op Spotify en YouTube." },
  // Testimonials
  testimonial1Text: { en: "Our wedding song was more beautiful than we imagined!", tr: "Düğün şarkımız hayal ettiğimizden daha güzeldi!", nl: "Ons trouwlied was mooier dan we ons hadden voorgesteld!" },
  testimonial2Text: { en: "I surprised my boyfriend with a song — he cried with joy!", tr: "Erkek arkadaşımı bir şarkıyla şaşırttım — sevinçten ağladı!", nl: "Ik verraste mijn vriend met een lied — hij huilde van vreugde!" },
  testimonial3Text: { en: "Such a creative gift idea, thank you SarkıSepeti!", tr: "Çok yaratıcı bir hediye fikri, teşekkürler SarkıSepeti!", nl: "Zo'n creatief cadeau-idee, bedankt SarkıSepeti!" },
  testimonial4Text: { en: "They turned our story into perfect lyrics!", tr: "Hikayemizi mükemmel sözlere dönüştürdüler!", nl: "Ze hebben ons verhaal omgezet in perfecte teksten!" },
  testimonial5Text: { en: "Quick delivery and amazing quality!", tr: "Hızlı teslimat ve harika kalite!", nl: "Snelle levering en geweldige kwaliteit!" },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: keyof typeof dict) => string };
const LanguageCtx = createContext<Ctx | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("lang") : null;
    if (saved === "en" || saved === "tr" || saved === "nl") setLang(saved);
  }, []);

  const value = useMemo<Ctx>(() => ({
    lang,
    setLang: (l) => {
      setLang(l);
      try { window.localStorage.setItem("lang", l); } catch {}
    },
    t: (key) => dict[key]?.[lang] ?? key,
  }), [lang]);

  return <LanguageCtx.Provider value={value}>{children}</LanguageCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageCtx);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}


