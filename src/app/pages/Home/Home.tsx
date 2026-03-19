import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Features from "../../components/Features";
import BannerSection from "../../components/BannerSection";
import CollectionGrid from "../../components/CollectionGrid";
import CategoryCards from "../../components/CategoryCards";
import PromoBanner from "../../components/PromoBanner";
import ProductShowcase from "../../components/ProductShowcase";
import Reviews from "../../components/Reviews";
import InstagramSection from "../../components/InstagramSection";
import SupportSection from "../../components/SupportSection";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div>
        <div className="w-full bg-[#5E2A14] text-white text-sm font-inter text-center py-2">
          Sign up and <strong>GET 15% OFF</strong> for your first order.{" "}
          <button className="underline font-semibold ml-1">Sign Up Now</button>
        </div>
      </div>
      <Navbar />
      <Hero />
      <Features />
      <BannerSection />
      <CollectionGrid />
      <CategoryCards />
      <PromoBanner />
      <ProductShowcase />
      <Reviews />
      <InstagramSection />
      <SupportSection />
      <Footer />
    </div>
  );
}
