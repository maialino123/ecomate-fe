/**
 * PRESENTATION COMPONENT: Product Card
 * Pure UI component for displaying product information
 * Responsive: mobile-first with hover effects
 * Spacing: 8pt grid system
 */
export interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  tag?: string;
  onViewDetails?: () => void;
}

export function ProductCard({
  name,
  price,
  image,
  tag,
  onViewDetails
}: ProductCardProps) {
  return (
    <div className="group relative">
      {/* Tag Badge */}
      {tag && (
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block px-3 py-1 md:px-4 md:py-1 rounded-full bg-primary-600 text-white text-xs md:text-sm font-semibold">
            {tag}
          </span>
        </div>
      )}

      {/* Image Container - aspect-square for consistent sizing */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-lg mb-4 md:mb-6 aspect-square">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover CTA Button */}
        {onViewDetails && (
          <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={onViewDetails}
              className="w-full bg-white text-gray-900 py-2 md:py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Xem Chi Tiết
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="px-2">
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 line-clamp-2">
          {name}
        </h3>
        <p className="text-xl md:text-2xl font-bold text-primary-600">
          {price}
        </p>
      </div>
    </div>
  );
}
