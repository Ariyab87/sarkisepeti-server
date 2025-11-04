"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";
import { useLang } from "./LanguageProvider";
import { getProductTitle, type Lang } from "@/lib/products";

// Simple SVG Icons
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const MinusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

function formatTl(priceTl: number) {
  try {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    }).format(priceTl);
  } catch {
    return `${priceTl.toLocaleString("tr-TR")} ₺`;
  }
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const { t, lang } = useLang();

  const handleCheckout = () => {
    console.log("Checkout clicked", { items, totalPrice });
    // For now, just log. Later can navigate to checkout page
    // window.location.href = "/checkout";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full md:max-w-md bg-gradient-to-b from-[#111111] via-[#1a1a1a] to-[#2a2a2a] shadow-[0_0_50px_rgba(212,175,55,0.3)] z-50 flex flex-col border-l border-[#D4AF37]/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#D4AF37]/30">
              <h2 className="text-2xl font-semibold text-[#D4AF37]">
                {t("cartTitle")}
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-[#D4AF37]/20 rounded-lg transition-colors"
                aria-label="Close cart"
              >
                <XIcon className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-white/70 text-lg mb-2">
                    {t("cartEmpty")}
                  </p>
                  <p className="text-white/50 text-sm">
                    {t("cartEmptySubtext")}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-black/70 border border-[#D4AF37]/30 rounded-xl p-4 shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                    >
                      <div className="flex gap-4">
                        {/* Product Image Placeholder */}
                        <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[#D4AF37]/20 to-black border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <span className="text-3xl">🎵</span>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold mb-1 line-clamp-2">
                            {item.id.startsWith("addon-") 
                              ? (item.id === "addon-spotify" ? t("addonSpotify") : 
                                 item.id === "addon-youtube" ? t("addonYouTube") : 
                                 t("addonOwnVoice"))
                              : getProductTitle(item.id, lang as Lang)}
                          </h3>
                          <p className="text-[#D4AF37] font-bold text-lg mb-3">
                            {formatTl(item.priceTl)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1.5 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <MinusIcon className="w-4 h-4 text-[#D4AF37]" />
                            </button>
                            <span className="text-white font-semibold min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1.5 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <PlusIcon className="w-4 h-4 text-[#D4AF37]" />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-auto p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                              aria-label="Remove item"
                            >
                              <TrashIcon className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Total and Checkout */}
            {items.length > 0 && (
              <div className="border-t border-[#D4AF37]/30 p-6 bg-black/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white/70 text-lg">
                    {t("cartTotal")}:
                  </span>
                  <span className="text-[#D4AF37] font-bold text-2xl">
                    {formatTl(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-6 text-sm text-white/50">
                  <span>{t("cartItems")}: {totalItems}</span>
                  <span>{t("cartSubtotal")}: {formatTl(totalPrice)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full text-center font-semibold cursor-pointer rounded-xl transition-all duration-300 ease-in-out py-4"
                  style={{
                    backgroundColor: "#f4efe0",
                    color: "#111",
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
                  {t("checkout")}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

