import Hero from "@/components/Hero";
import SongForm from "@/components/SongForm";
import Footer from "@/components/Footer";
import InspirationalSection from "@/components/InspirationalSection";
import TestimonialsStrip from "@/components/TestimonialsStrip";
import FormSection from "@/components/FormSection";
import PricingSection from "@/components/PricingSection";
import AboutUs from "@/components/AboutUs";
import HowItWorks from "@/components/HowItWorks";

export default function Page() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <FormSection />
      <InspirationalSection />
      <TestimonialsStrip />
      <PricingSection />
      <AboutUs />
      <Footer />
    </main>
  );
}


