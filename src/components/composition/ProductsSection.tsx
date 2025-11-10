import { ReactNode } from 'react';
import { ProductCard, type ProductCardProps } from '../presentation';

/**
 * COMPOSITION COMPONENT: Products Section
 * Combines ProductCard with data and layout logic
 * Handles grid layout and responsive columns
 */
export interface ProductsSectionProps {
  title: ReactNode;
  subtitle?: string;
  products: ProductCardProps[];
}

export function ProductsSection({
  title,
  subtitle,
  products
}: ProductsSectionProps) {
  return (
    <section className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, i) => (
            <ProductCard key={i} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
