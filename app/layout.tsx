import "./styles/globals.css";
import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";

const brandFont = Playfair_Display({ subsets: ["latin"], weight: ["700", "800", "900"], variable: "--font-brand" });
import { LanguageProvider } from "@/components/LanguageProvider";
import { CartProvider } from "@/components/CartContext";
import TopBar from "@/components/TopBar";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "SarkıSepeti – Create Your Own Song",
  description: "Custom songs for every moment. Order your unique song today.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${brandFont.variable}`}>
      <body className="bg-black text-white min-h-screen">
        <LanguageProvider>
          <CartProvider>
            <TopBar />
            <CartDrawer />
            {children}
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}


