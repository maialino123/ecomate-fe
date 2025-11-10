import { ReactNode } from 'react';
import { Header, Footer } from '../common';

/**
 * COMPOSITION COMPONENT: Landing Page Layout
 * Provides consistent layout structure for all landing pages
 * Includes Header and Footer
 */
export interface LandingLayoutProps {
  children: ReactNode;
  className?: string;
}

export function LandingLayout({ children, className = '' }: LandingLayoutProps) {
  return (
    <div className={`min-h-screen ${className}`}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
