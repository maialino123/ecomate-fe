import { ReactNode } from 'react';
import { Feature, type FeatureProps } from '../presentation';

/**
 * COMPOSITION COMPONENT: Features Section
 * Combines Feature cards with data and layout logic
 * Handles responsive grid layout
 */
export interface FeaturesSectionProps {
  title: ReactNode;
  subtitle?: string;
  features: FeatureProps[];
  columns?: 2 | 3 | 4;
}

export function FeaturesSection({
  title,
  subtitle,
  features,
  columns = 4
}: FeaturesSectionProps) {
  const gridColsClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-gray-50">
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

        {/* Features Grid */}
        <div className={`grid ${gridColsClass[columns]} gap-6 md:gap-8`}>
          {features.map((feature, i) => (
            <Feature key={i} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
