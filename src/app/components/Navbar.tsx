import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import OTPLogin from "./OTPLogin";

// Assets
import logo from "../../assets/icons/logo.png";
import searchIcon from "../../assets/icons/search.png";
import cartIcon from "../../assets/icons/cart.png";
import userIcon from "../../assets/icons/user.png";
import menuIcon from "../../assets/icons/menu.png";
import closeIcon from "../../assets/icons/close.png";
import { useCart } from "../../context/cartContext";
import LoginModal from "../components/LoginModal"; // adjust path if needed
interface User {
  _id: string;
  name: string;
  mobile: string;
}


export default function Navbar() {
  const { cart } = useCart();
  const [user, setUser] = useState<User | null>(
  JSON.parse(localStorage.getItem("user") || "null"),
);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();
  // 🔥 Hover state
  const [activeIndex, setActiveIndex] = useState(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const navRefs = useRef([]);

  const navLinks = [
    {
      name: "Shop",
      dropdown: ["All Products", "Best Sellers", "Trending"],
    },
    {
      name: "Collections",
      dropdown: ["Summer Wear", "Festive", "New Arrivals"],
    },
    { name: "New Arrivals" },
    { name: "Festive" },
    { name: "Summer" },
    { name: "Contact Us" },
  ];

  // 🔥 Handle hover for underline
  const handleHover = (index) => {
    const el = navRefs.current[index];
    if (el) {
      setUnderlineStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
    setActiveIndex(index);
  };
  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
  };
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Kargee Logo" className="h-10 md:h-14" />
          </Link>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center space-x-12 relative">
            {navLinks.map((link, index) => (
              <div
                key={link.name}
                ref={(el) => (navRefs.current[index] = el)}
                className="relative"
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* TEXT */}
                <motion.span
                  onClick={() => navigate("/products")}
                  whileHover={{ y: -2 }}
                  className="text-base md:text-lg text-gray-700 hover:text-[#5E2A14] cursor-pointer font-medium"
                >
                  {link.name}
                </motion.span>

                {/* DROPDOWN */}
                <AnimatePresence>
                  {link.dropdown && activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-0 top-full mt-4 w-52 bg-white shadow-2xl border border-gray-100 rounded-xl"
                    >
                      <div className="py-3">
                        {link.dropdown.map((item) => (
                          <motion.a
                            key={item}
                            href="#"
                            whileHover={{ x: 6 }}
                            className="block px-4 py-2 text-gray-700 hover:text-[#5E2A14] transition"
                          >
                            {item}
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* 🔥 SLIDING UNDERLINE */}
            <motion.div
              className="absolute bottom-0 h-[2px] bg-[#5E2A14]"
              animate={{
                left: underlineStyle.left,
                width: underlineStyle.width,
                opacity: activeIndex !== null ? 1 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          {/* ICONS */}
          <div className="flex items-center space-x-5 md:space-x-7">
            <button>
              <img src={searchIcon} className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            <button onClick={() => navigate("/cart")} className="relative">
              <img src={cartIcon} className="w-6 h-6 md:w-7 md:h-7" />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#5E2A14] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                if (user) {
                  navigate("/profile");
                } else {
                  setIsLoginOpen(true);
                }
              }}
            >
              <img src={userIcon} className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            {/* MOBILE MENU */}
            <button
              className="md:hidden"
              onClick={() => {
                if (user) {
                  navigate("/profile");
                } else {
                  setIsLoginOpen(true);
                }
              }}
            >
              <img
                src={isMobileMenuOpen ? closeIcon : menuIcon}
                className="w-7 h-7"
              />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <div key={link.name}>
                <p className="text-base text-gray-700">{link.name}</p>

                {link.dropdown && (
                  <div className="ml-4 mt-2 space-y-1">
                    {link.dropdown.map((item) => (
                      <p key={item} className="text-sm text-gray-500">
                        {item}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OTP LOGIN */}
      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </nav>
  );
}
