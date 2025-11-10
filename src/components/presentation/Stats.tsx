/**
 * PRESENTATION COMPONENT: Stats Display
 * Pure UI component for displaying statistics
 * Responsive: mobile-first with grid layout
 * Spacing: 8pt grid
 */
export interface StatsProps {
  items: Array<{
    value: string;
    suffix?: string;
    label: string;
  }>;
  columns?: 2 | 3 | 4;
}

export function Stats({ items, columns = 3 }: StatsProps) {
  const gridColsClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  return (
    <div className={`grid ${gridColsClass[columns]} gap-6 md:gap-8`}>
      {items.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-600 mb-2">
            {stat.value}{stat.suffix}
          </div>
          <div className="text-sm md:text-base text-gray-600 font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
