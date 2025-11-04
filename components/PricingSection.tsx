"use client";

import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";
import { getProductTitle, type Lang } from "@/lib/products";
import { useCart } from "./CartContext";

type Package = { id: string; priceTl: number; description: string };

const getPackageDescriptions = (t: (key: string) => string) => [
  { id: "wedding-song", priceTl: 499, descriptionKey: "packageDescWeddingSong" },
  { id: "proposal-song", priceTl: 499, descriptionKey: "packageDescProposalSong" },
  { id: "love-song", priceTl: 499, descriptionKey: "packageDescLoveSong" },
  { id: "poem", priceTl: 499, descriptionKey: "packageDescPoem" },
  { id: "birthday", priceTl: 499, descriptionKey: "packageDescBirthday" },
  { id: "wedding-album", priceTl: 2499, descriptionKey: "packageDescWeddingAlbum" },
  { id: "lullaby", priceTl: 499, descriptionKey: "packageDescLullaby" },
  { id: "event-launch", priceTl: 499, descriptionKey: "packageDescEventLaunch" },
  { id: "business-soundscapes", priceTl: 2499, descriptionKey: "packageDescBusinessSoundscapes" },
];

const getAddons = (t: (key: string) => string) => [
  { id: "addon-spotify", title: "Publish on Spotify", priceTl: 249, descriptionKey: "packageDescAddonSpotify" },
  { id: "addon-youtube", title: "Publish on YouTube", priceTl: 249, descriptionKey: "packageDescAddonYouTube" },
  { id: "addon-own-voice", title: "Use My Own Voice", priceTl: 999, descriptionKey: "packageDescAddonOwnVoice" },
];

function formatTl(priceTl: number) {
  try {
    return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(priceTl);
  } catch {
    return `${priceTl.toLocaleString("tr-TR")} ₺`;
  }
}

export default function PricingSection() {
  const { lang, t } = useLang() as any;
  const { addItem } = useCart();
  
  const packages = getPackageDescriptions(t).map(pkg => ({
    ...pkg,
    description: t(pkg.descriptionKey),
  }));
  
  const addons = getAddons(t).map(addon => ({
    ...addon,
    description: t(addon.descriptionKey),
  }));

  const handleAddToBasket = (pkg: Package) => {
    addItem({
      id: pkg.id,
      name: getProductTitle(pkg.id, lang as Lang),
      priceTl: pkg.priceTl,
    });
  };

  const handleAddAddonToBasket = (addon: typeof addons[0]) => {
    const addonTitle = addon.id === "addon-spotify" ? t("addonSpotify") : 
                      addon.id === "addon-youtube" ? t("addonYouTube") : 
                      t("addonOwnVoice");
    addItem({
      id: addon.id,
      name: addonTitle,
      priceTl: addon.priceTl,
    });
  };

  async function buyNow(pkg: Package) {
    try {
      const name = (document.getElementById("paytrName") as HTMLInputElement)?.value || "SarkiSepeti User";
      const email = (document.getElementById("paytrEmail") as HTMLInputElement)?.value || "test@example.com";
      const res = await fetch("/api/paytr/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, productId: pkg.id, title: getProductTitle(pkg.id, lang as Lang), priceTl: pkg.priceTl })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Payment init failed");
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else if (data.token) {
        // Some flows return token to POST to PayTR page
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://www.paytr.com/odeme/guvenli";
        const input = document.createElement("input");
        input.type = "hidden"; input.name = "token"; input.value = data.token;
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
      }
    } catch (e: any) {
      alert(e.message || "Payment could not be started.");
    }
  }

  return (
    <section id="pricing" className="relative bg-gradient-to-b from-[#111111] via-[#1a1a1a] to-[#2a2a2a] py-20 scroll-mt-20">
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-white text-3xl md:text-4xl font-semibold">{t("pricingTitle")}</h2>
          <p className="text-white/70 mt-3">{t("pricingSubtitle")}</p>
        </motion.div>

        {/* optional quick inputs for name/email used for payment init */}
        <div className="max-w-3xl mx-auto mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input id="paytrName" className="input-base w-full" placeholder={t("formPlaceholderPaytrName")} />
          <input id="paytrEmail" className="input-base w-full" placeholder={t("formPlaceholderPaytrEmail")} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.03 }}
              viewport={{ once: true }}
              className="bg-black/70 border border-[#D4AF37]/30 rounded-2xl p-6 shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] flex flex-col h-full min-h-[280px]"
            >
              <h3 className="text-lg font-semibold text-[#D4AF37] mb-3 line-clamp-3 min-h-[4.5rem]">{getProductTitle(pkg.id, lang as Lang)}</h3>
              <p className="text-white/70 text-sm mb-4 line-clamp-3 flex-grow">{pkg.description}</p>
              <div className="text-2xl font-bold mb-4">{formatTl(pkg.priceTl)}</div>
              <div className="mt-auto flex flex-col gap-2">
                <button
                  onClick={() => handleAddToBasket(pkg)}
                  className="w-full text-center font-semibold cursor-pointer rounded-xl transition-all duration-300 ease-in-out border-2 border-[#D4AF37] bg-transparent text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                  style={{
                    padding: "12px 28px",
                    fontWeight: 600,
                  }}
                >
                  {t("addToBasket")}
                </button>
                <button
                  onClick={() => buyNow(pkg)}
                  className="w-full text-center font-semibold cursor-pointer rounded-xl transition-all duration-300 ease-in-out"
                  style={{
                    backgroundColor: "#f4efe0",
                    color: "#111",
                    padding: "12px 28px",
                    fontWeight: 600,
                    boxShadow: "0 0 20px rgba(249, 214, 92, 0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#d4af37";
                    e.currentTarget.style.color = "#111";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f4efe0";
                    e.currentTarget.style.color = "#111";
                  }}
                >
                  {t("orderSong")}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-center text-[#D4AF37] text-2xl font-semibold mb-6">{t("addonsLabel")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {addons.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.03 }}
                viewport={{ once: true }}
                className="bg-black/70 border border-[#D4AF37]/30 rounded-2xl p-6 shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] flex flex-col h-full"
              >
                <div className="text-white font-medium mb-3">{a.id === "addon-spotify" ? t("addonSpotify") : a.id === "addon-youtube" ? t("addonYouTube") : t("addonOwnVoice")}</div>
                <div className="text-2xl font-bold mb-4">{formatTl(a.priceTl)}</div>
                <p className="text-white/70 text-sm mb-4 flex-grow">{a.description}</p>
                <button
                  onClick={() => handleAddAddonToBasket(a)}
                  className="mt-auto w-full text-center font-semibold cursor-pointer rounded-xl transition-all duration-300 ease-in-out border-2 border-[#D4AF37] bg-transparent text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                  style={{
                    padding: "12px 28px",
                    fontWeight: 600,
                  }}
                >
                  {t("addToBasket")}
                </button>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-white/60 mt-8 text-sm">{t("pricingNote")}</p>
        </motion.div>
      </div>
    </section>
  );
}


