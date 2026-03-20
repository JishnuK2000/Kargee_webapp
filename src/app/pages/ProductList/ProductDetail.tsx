import { useParams } from "react-router-dom";
import { useState } from "react";
import { Star } from "lucide-react";
import Layout from "../../components/layout";
import { productsData } from "../../../data/products";

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

  return (
    <Layout>
      <section className="min-h-screen pb-24 md:pb-0 font-[Inter]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* IMAGE SECTION */}
          <div className="space-y-4">
            <div className="relative w-full overflow-hidden">
              <img
                src={selectedImage}
                className="w-full object-cover rounded-md transition duration-500"
              />
            </div>
            {/* Thumbnail images */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className={`w-20 h-20 object-cover rounded-md border cursor-pointer transition ${
                    selectedImage === img ? "border-[#5E2A14]" : "border-gray-200"
                  }`}
                  onMouseEnter={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* PRODUCT DETAILS */}
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-[Inter] font-medium">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{product.category}</span>
              <span>|</span>
              <span>{product.collection} Collection</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-semibold text-lg md:text-xl text-[#5E2A14]">
                ₹{product.discountPrice}
              </span>
              <span className="line-through text-gray-400 text-sm">
                ₹{product.price}
              </span>
              <div className="flex items-center gap-1">
                <Star size={18} className="text-yellow-500 fill-yellow-400" />
                <span className="text-sm text-gray-700">4.2</span>
              </div>
            </div>

            <p className="text-sm text-gray-600">{product.stock}</p>

            {/* SIZES */}
            <div>
              <h4 className="text-sm font-medium mb-2">Sizes</h4>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="border px-3 py-1 text-sm  cursor-pointer hover:border-[#5E2A14]"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* COLORS */}
            <div>
              <h4 className="text-sm font-medium mb-2">Colors</h4>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className={`w-6 h-6 rounded-full border cursor-pointer`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  ></span>
                ))}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h4 className="text-sm font-medium mb-2 font-[Inter] ">Description</h4>
              <p className="text-sm text-gray-700">{product.description}</p>
            </div>

            {/* BUTTON */}
            <button className="mt-4 w-full md:w-auto bg-[#5E2A14] text-white px-6 py-3 rounded-md">
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}