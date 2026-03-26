import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import Layout from "../../components/layout";
import cartIcon from "../../../assets/icons/cart.svg";
import favIcon from "../../../assets/icons/wishlist.svg";
import { useCart } from "../../../context/cartContext";
import { useToast } from "../../../context/toastContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const API = import.meta.env.VITE_API_URL;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState("");
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API}/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.images?.[0] || "");
        // auto-select first size and color
        setSelectedSize(data.sizes?.[0] || "");
        setSelectedColor(data.colors?.[0] || "");
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <p className="p-6">Loading...</p>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <p className="p-6">Product not found</p>
      </Layout>
    );
  }

  const validate = () => {
    if (!selectedSize) {
      showToast("Please select a size");
      return false;
    }
    if (!selectedColor) {
      showToast("Please select a color");
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!validate()) return;

    addToCart({
      id: product._id,
      name: product.name,
      price: product.discountPrice,
      image: product.images?.[0],
      quantity: qty,
      size: selectedSize,
      color: selectedColor,
    });

    showToast("Product added to cart successfully");
  };

  const handleBuyNow = () => {
    if (!validate()) return;

    navigate("/checkout", {
      state: {
        product: {
          id: product._id,
          name: product.name,
          price: product.discountPrice,
          image: product.images?.[0],
          quantity: qty,
          size: selectedSize,
          color: selectedColor,
        },
      },
    });
  };

  return (
    <Layout>
      <section className="min-h-screen pb-24 md:pb-0 font-[Inter]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-10 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* IMAGE SECTION */}
          <div className="space-y-4">
            <div className="relative w-full overflow-hidden">
              <img
                src={selectedImage}
                className="w-full object-cover transition duration-500"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images?.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  className={`w-20 h-20 object-cover border cursor-pointer ${
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
          <div className="space-y-5">

            {/* CATEGORY + RATING */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{product.category}</span>
              <span className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500 fill-yellow-400" />
                4.2 <span className="text-gray-400">(10 reviews)</span>
              </span>
            </div>

            {/* NAME */}
            <h1 className="text-2xl md:text-3xl font-medium font-[Inter]">
              {product.name}
            </h1>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-600">{product.description}</p>

            {/* COLORS */}
            <div>
              <h4 className="text-sm font-medium mb-2">
                Color{" "}
                {selectedColor && (
                  <span className="text-gray-400 font-normal capitalize">
                    — {selectedColor}
                  </span>
                )}
              </h4>
              <div className="flex gap-2">
                {product.colors?.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                    className={`w-7 h-7 rounded-full border-2 transition ${
                      selectedColor === color
                        ? "border-[#5E2A14] scale-110 shadow-md"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            {/* SIZES */}
            <div>
              <h4 className="text-sm font-medium mb-2">
                Size{" "}
                {selectedSize && (
                  <span className="text-gray-400 font-normal">
                    — {selectedSize}
                  </span>
                )}
              </h4>
              <div className="flex gap-2 flex-wrap">
                {product.sizes?.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-3 py-1 text-sm transition ${
                      selectedSize === size
                        ? "border-[#5E2A14] bg-[#5E2A14] text-white"
                        : "border-gray-300 hover:border-[#5E2A14]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
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

            {/* ACTIONS */}
            <div className="flex items-center gap-3 flex-wrap">

              {/* Quantity */}
              <div className="flex items-center border">
                <button
                  onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                  className="px-3 py-2 text-lg"
                >
                  -
                </button>
                <span className="px-4 text-sm">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2 text-lg"
                >
                  +
                </button>
              </div>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                className="flex-1 md:min-w-[200px] bg-[#5E2A14] text-white px-6 py-3 text-sm font-medium"
              >
                Buy Now
              </button>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="bg-[#5E2A14] p-3 flex items-center justify-center"
              >
                <img src={cartIcon} alt="cart" className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <button className="bg-[#5E2A14] p-3 flex items-center justify-center">
                <img src={favIcon} alt="wishlist" className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}