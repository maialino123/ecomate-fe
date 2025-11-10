/**
 * PRESENTATION COMPONENT: Testimonial Card
 * Pure UI component for customer testimonials
 * Responsive: mobile-first design
 * Spacing: 8pt grid
 */
export interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  rating?: number;
  avatar?: string;
}

export function Testimonial({
  quote,
  author,
  role,
  rating = 5,
  avatar
}: TestimonialProps) {
  return (
    <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100">
      {/* Rating Stars */}
      {rating > 0 && (
        <div className="flex gap-1 mb-4 md:mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-xl md:text-2xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 md:mb-8">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center gap-3 md:gap-4">
        {avatar ? (
          <img
            src={avatar}
            alt={author}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-lg md:text-xl">
            {author.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-bold text-sm md:text-base">{author}</div>
          <div className="text-xs md:text-sm text-gray-500">{role}</div>
        </div>
      </div>
    </div>
  );
}
