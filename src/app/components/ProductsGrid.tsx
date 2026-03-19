import { products } from '../data/products';
import ProductCard from './ProductCard';

interface ProductsGridProps {
  title?: string;
  category?: string;
  limit?: number;
}

export default function ProductsGrid({ 
  title = 'Our Products', 
  category,
  limit 
}: ProductsGridProps) {
  let filteredProducts = products;

  if (category) {
    filteredProducts = products.filter(p => p.category === category);
  }

  if (limit) {
    filteredProducts = filteredProducts.slice(0, limit);
  }

  return (
    <section className="py-6 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4" style={{ color: '#5E2A14' }}>
            {title}
          </h2>
          {category && (
            <p className="text-gray-600 text-lg">
              Explore our {category} collection
            </p>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        )}
      </div>
    </section>
  );
}
