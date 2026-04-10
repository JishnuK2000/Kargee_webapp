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
import LoginModal from "../../components/LoginModal";
import Home4Grid from "../../components/Home4Grid";
import { useEffect, useState } from "react";
import { User } from "../../../types";

export default function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null"),
  );

  useEffect(() => {
    const modalClosed = localStorage.getItem("loginModalClosed");
    const accessToken = localStorage.getItem("accessToken");

    if (!modalClosed && !accessToken) {
      const timer = setTimeout(() => setShowModal(true), 10000); // 10 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem("loginModalClosed", "true"); // remember user closed modal
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  return (
    <div className="min-h-screen">
      {/* Top banner */}
      {/* <div className="w-full bg-[#5E2A14] text-white text-sm font-inter text-center py-2">
        Sign up and <strong>GET 15% OFF</strong> for your first order.{" "}
        <button className="underline font-semibold ml-1">Sign Up Now</button>
      </div> */}

      {/* Login */}

      {showModal && (
        <LoginModal
          onClose={handleCloseModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Main components */}
      <Navbar />
      <Hero />
      <Features />
      <BannerSection />
      <Home4Grid />
      {/* <CollectionGrid /> */}
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
