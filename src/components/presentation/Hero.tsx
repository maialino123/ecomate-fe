import { ReactNode } from 'react';

/**
 * PRESENTATION COMPONENT: Hero Section
 * Pure UI component for hero sections - no business logic
 * Responsive: mobile-first with md/lg/xl breakpoints
 * Spacing: 8pt grid (p-4/6/8, gap-4/6/8)
 */
export interface HeroProps {
  badge?: string;
  title: ReactNode;
  subtitle: string;
  children?: ReactNode;
  stats?: Array<{ value: string; label: string }>;
  variant?: 'default' | 'gradient' | 'minimal';
}

export function Hero({
  badge,
  title,
  subtitle,
  children,
  stats,
  variant = 'default'
}: HeroProps) {
  const variantClasses = {
    default: 'bg-gradient-to-b from-white to-gray-50',
    gradient: 'bg-gradient-to-br from-primary-50 via-white to-primary-50',
    minimal: 'bg-white',
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center px-4 py-24 md:py-32 ${variantClasses[variant]}`}>
      <div className="max-w-6xl mx-auto w-full text-center">
        {/* Badge */}
        {badge && (
          <div className="mb-6 md:mb-8">
            <span className="inline-block px-4 py-2 md:px-6 md:py-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-sm font-medium text-gray-700 tracking-wide">
              {badge}
            </span>
          </div>
        )}

        {/* Title - responsive text sizing following 8pt scale */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed px-4">
          {subtitle}
        </p>

        {/* CTA or Custom Content */}
        {children && (
          <div className="mb-12 md:mb-16">
            {children}
          </div>
        )}

        {/* Stats Grid */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
