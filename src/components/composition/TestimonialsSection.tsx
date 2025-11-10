import { ReactNode } from 'react';
import { Testimonial, type TestimonialProps } from '../presentation';

/**
 * COMPOSITION COMPONENT: Testimonials Section
 * Combines Testimonial cards with data and layout logic
 * Handles responsive grid layout
 */
export interface TestimonialsSectionProps {
  title: ReactNode;
  subtitle?: string;
  testimonials: TestimonialProps[];
}

export function TestimonialsSection({
  title,
  subtitle,
  testimonials
}: TestimonialsSectionProps) {
  return (
    <section className="py-16 md:py-24 px-4 bg-white">
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, i) => (
            <Testimonial key={i} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
