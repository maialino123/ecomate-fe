/**
 * PRESENTATION COMPONENT: Feature Card
 * Pure UI component for displaying features
 * Responsive: mobile-first design
 * Spacing: 8pt grid (p-6/8, gap-4/6)
 */
export interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

export function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      {/* Icon */}
      <div className="text-5xl md:text-6xl mb-4 md:mb-6">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
