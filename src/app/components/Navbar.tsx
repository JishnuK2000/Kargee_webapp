import { useState } from "react";
import { Link } from "react-router-dom";
import OTPLogin from "./OTPLogin";

// 👉 Import your assets
import logo from "../../assets/icons/logo.png";
import searchIcon from "../../assets/icons/search.png";
import cartIcon from "../../assets/icons/cart.png";
import userIcon from "../../assets/icons/user.png";
import menuIcon from "../../assets/icons/menu.png";
import closeIcon from "../../assets/icons/close.png";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  const navLinks = [
    { name: "Shop", href: "#shop" },
    { name: "Collections", href: "#collections" },
    { name: "New Arrivals", href: "#new-arrivals" },
    { name: "Festive", href: "#festive" },
    { name: "Summer", href: "#summer" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* 🔥 Reduced side padding */}
     <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6">
        {/* 🔥 Increased height */}
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* 🔥 Bigger Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Kargee Logo"
              className="h-10 md:h-14 object-contain"
            />
          </Link>

          {/* 🔥 Bigger Nav Text */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base md:text-lg text-gray-700 hover:text-[#5E2A14] transition-colors duration-200 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* 🔥 Bigger Icons */}
          <div className="flex items-center space-x-5 md:space-x-7">
            {/* Search */}
            <button>
              <img src={searchIcon} className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            {/* Cart */}
            <button className="relative">
              <img src={cartIcon} className="w-6 h-6 md:w-7 md:h-7" />
              <span className="absolute -top-2 -right-2 bg-[#5E2A14] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* User */}
            <button onClick={() => setIsLoginOpen(true)}>
              <img src={userIcon} className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            {/* Mobile Menu */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <img
                src={isMobileMenuOpen ? closeIcon : menuIcon}
                className="w-7 h-7"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-base text-gray-700 hover:text-[#5E2A14]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* OTP Modal */}
      {isLoginOpen && <OTPLogin onClose={() => setIsLoginOpen(false)} />}
    </nav>
  );
}
