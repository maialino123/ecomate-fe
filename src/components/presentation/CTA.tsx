import { ReactNode } from 'react';

/**
 * PRESENTATION COMPONENT: Call-to-Action Section
 * Pure UI component for CTA blocks
 * Responsive: mobile-first design
 * Spacing: 8pt grid
 */
export interface CTAProps {
  title: ReactNode;
  description?: string;
  children?: ReactNode;
  variant?: 'default' | 'gradient' | 'bordered';
}

export function CTA({
  title,
  description,
  children,
  variant = 'default'
}: CTAProps) {
  const variantClasses = {
    default: 'bg-white shadow-xl',
    gradient: 'bg-gradient-to-br from-primary-500 to-primary-700 text-white',
    bordered: 'bg-white/90 backdrop-blur-sm border-2 border-primary-600',
  };

  const textColorClass = variant === 'gradient' ? 'text-white' : 'text-gray-900';
  const descColorClass = variant === 'gradient' ? 'text-primary-50' : 'text-gray-600';

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className={`rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 text-center ${variantClasses[variant]}`}>
          {/* Title */}
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 ${textColorClass}`}>
            {title}
          </h2>

          {/* Description */}
          {description && (
            <p className={`text-lg md:text-xl mb-6 md:mb-8 ${descColorClass}`}>
              {description}
            </p>
          )}

          {/* Action Button or Custom Content */}
          {children && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
