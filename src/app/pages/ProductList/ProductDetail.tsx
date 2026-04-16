import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import Layout from "../../components/layout";
import cartIcon from "../../../assets/icons/cart.svg";
import favIcon from "../../../assets/icons/wishlist.svg";
import { useCart } from "../../../context/cartContext";
import { useToast } from "../../../context/toastContext";

/* ================= ZOOM IMAGE ================= */
function ZoomImage({ src }: { src: string }) {
  const [zoomStyle, setZoomStyle] = useState<any>({});
  const [showZoom, setShowZoom] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${src})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "200%",
    });
  };

  return (
    <div
      className="relative w-full overflow-hidden cursor-zoom-in bg-gray-100"
      style={{ aspectRatio: "3 / 4" }} // ✅ KEY FIX
      onMouseMove={handleMove}
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
    >
      <img
        src={src}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {showZoom && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={zoomStyle}
        />
      )}
    </div>
  );
}

/* ================= MAIN ================= */
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const API = import.meta.env.VITE_API_URL;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
        setSelectedSize(data.sizes?.[0] || "");
        setSelectedColor(data.colors?.[0] || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <Layout><p className="p-6">Loading...</p></Layout>;
  if (!product) return <Layout><p className="p-6">Product not found</p></Layout>;

  const validate = () => {
    if (!selectedSize) return showToast("Select size");
    if (!selectedColor) return showToast("Select color");
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

    showToast("Added to cart");
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
      {/* ✅ Added top padding for navbar */}
      <section className="pt-24 md:pt-28 min-h-screen">

        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_420px]">

          {/* ================= LEFT: IMAGE GRID ================= */}
          <div className="grid grid-cols-2">
            {product.images?.map((img: string, i: number) => (
              <ZoomImage key={i} src={img} />
            ))}
          </div>

          {/* ================= RIGHT: STICKY SIDEBAR ================= */}
          <div className="sticky top-28 h-fit px-6 space-y-5">

            {/* CATEGORY + RATING */}
            {/* <div className="flex justify-between text-sm text-gray-500">
              <span>{product.category}</span>
              <span className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500 fill-yellow-400" />
                4.2
              </span>
            </div> */}

            {/* NAME */}
            <h1 className="text-2xl md:text-3xl font-medium">
              {product.name}
            </h1>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-600">{product.description}</p>

            {/* COLORS */}
            <div>
              <h4 className="text-sm mb-2">
                Color — {selectedColor}
              </h4>
              <div className="flex gap-2">
                {product.colors?.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 rounded-full border-2 ${selectedColor === color
                      ? "border-[#5E2A14] scale-110"
                      : "border-gray-300"
                      }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            {/* SIZES */}
            <div>
              <h4 className="text-sm mb-2">
                Size — {selectedSize}
              </h4>
              <div className="flex gap-2 flex-wrap">
                {product.sizes?.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-3 py-1 text-sm ${selectedSize === size
                      ? "bg-[#5E2A14] text-white"
                      : "border-gray-300"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE */}
            <div className="flex gap-3 items-center">
              <span className="text-2xl font-semibold text-[#5E2A14]">
                ₹{product.discountPrice}
              </span>
              <span className="line-through text-gray-400">
                ₹{product.price}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 flex-wrap">

              {/* QTY */}
              <div className="flex border">
                <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)} className="px-3">-</button>
                <span className="px-4">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3">+</button>
              </div>

              {/* BUY */}
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-[#5E2A14] text-white px-6 py-3"
              >
                Buy Now
              </button>

              {/* CART */}
              <button onClick={handleAddToCart} className="bg-[#5E2A14] p-3">
                <img src={cartIcon} className="w-5 h-5" />
              </button>

              {/* WISHLIST */}
              <button className="bg-[#5E2A14] p-3">
                <img src={favIcon} className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}