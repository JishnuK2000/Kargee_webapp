import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { Star } from "lucide-react";
import Layout from "../../components/layout";
import { productsData } from "../../../data/products";
import cartIcon from "../../../assets/icons/cart.svg";
import favIcon from "../../../assets/icons/wishlist.svg";
export default function ProductDetail() {
  const { id } = useParams(); // React Router way
  const product = productsData.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(product?.images[0]);

  if (!product)
    return (
      <Layout>
        <p className="p-6">Product not found</p>
      </Layout>
    );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <section className="min-h-screen pb-24 md:pb-0 font-[Inter]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* IMAGE SECTION */}
          <div className="space-y-4">
            <div className="relative w-full overflow-hidden">
              <img
                src={selectedImage}
                className="w-full object-cover  transition duration-500"
              />
            </div>
            {/* Thumbnail images */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className={`w-20 h-20 object-cover  border cursor-pointer transition ${
                    selectedImage === img
                      ? "border-[#5E2A14]"
                      : "border-gray-200"
                  }`}
                  onMouseEnter={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* PRODUCT DETAILS */}
          {/* PRODUCT DETAILS */}
          <div className="space-y-5">
            {/* CATEGORY + RATING */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{product.category}</span>
              <span className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500 fill-yellow-400" />
                4.2 <span className="text-gray-400">(10 reviews)</span>
              </span>
            </div>

            {/* PRODUCT NAME */}
            <h1 className="text-2xl md:text-3xl font-medium font-[Inter]">{product.name}</h1>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* COLORS */}
            <div>
              <h4 className="text-sm font-medium mb-2">Colors</h4>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="w-6 h-6 rounded-full border cursor-pointer"
                    style={{ backgroundColor: color.toLowerCase() }}
                  ></span>
                ))}
              </div>
            </div>

            {/* SIZES */}
            <div>
              <h4 className="text-sm font-medium mb-2">Sizes</h4>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="border px-3 py-1 text-sm cursor-pointer hover:border-[#5E2A14]"
                  >
                    {size}
                  </span>
                ))}
              </div>

              {/* SIZE GUIDE */}
              <button className="mt-2 text-sm underline text-[#5E2A14]">
                View Size Guide
              </button>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl font-semibold text-[#5E2A14]">
                ₹{product.discountPrice}
              </span>
              <span className="line-through text-gray-400 text-sm">
                ₹{product.price}
              </span>
            </div>

            {/* QUANTITY + BUTTONS */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Quantity Selector */}
              <div className="flex items-center border ">
                <button className="px-3 py-2 text-lg">-</button>
                <span className="px-4 text-sm">1</span>
                <button className="px-3 py-2 text-lg">+</button>
              </div>

              {/* Buy Now */}
              <button className="flex-1 md:flex-none md:min-w-[200px] bg-[#5E2A14] text-white px-6 py-3  text-sm font-medium hover:opacity-90 transition">
                Buy Now
              </button>

              {/* Cart */}
              <button className="bg-[#5E2A14] p-3  flex items-center justify-center hover:opacity-90 transition">
                <img src={cartIcon} alt="cart" className="w-5 h-5 " />
              </button>

              {/* Wishlist */}
              <button className="bg-[#5E2A14] p-3  flex items-center justify-center hover:opacity-90 transition">
                <img src={favIcon} alt="wishlist" className="w-5 h-5 " />
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
