import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = Math.round(((product.price - product.discountPrice) / product.price) * 100);

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100 h-[350px] sm:h-[400px]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNewArrival && (
            <span className="bg-[#5E2A14] text-white text-xs px-3 py-1 rounded-full">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
          aria-label="Add to wishlist"
        >
          <Heart className="w-5 h-5 text-gray-700" />
        </button>

        {/* Quick Add Button */}
        <button
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-[#5E2A14] px-6 py-2.5 rounded-full flex items-center gap-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-[#5E2A14] hover:text-white"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <p className="text-xs text-gray-500 mb-1">{product.category}</p>
        <h3 className="text-base md:text-lg mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl" style={{ color: '#5E2A14' }}>
            ₹{product.discountPrice.toLocaleString()}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ₹{product.price.toLocaleString()}
          </span>
        </div>

        {/* Fabric & Sizes */}
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>Fabric: {product.fabric}</span>
          <span>Sizes: {product.sizes.join(', ')}</span>
        </div>

        {/* Colors */}
        <div className="mt-3 flex gap-2">
          {product.colors.map((color, index) => (
            <div
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {color}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
