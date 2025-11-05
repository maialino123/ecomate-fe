/**
 * A/B Testing Utilities
 * Handles variant assignment and routing logic
 */

export type Variant = 'A' | 'B' | 'C' | 'D';

export interface ABTestConfig {
  variants: Variant[];
  weights: Record<Variant, number>; // Weight distribution (sum should be 100)
}

// Default configuration for A/B testing
export const DEFAULT_AB_CONFIG: ABTestConfig = {
  variants: ['A', 'B', 'C', 'D'],
  weights: {
    A: 25,
    B: 25,
    C: 25,
    D: 25,
  },
};

/**
 * Get variant from cookie or assign new one
 */
export function getVariant(existingVariant?: string): Variant {
  // If user already has a variant assigned, keep them in same group
  if (existingVariant && isValidVariant(existingVariant)) {
    return existingVariant as Variant;
  }

  // Assign new variant based on weights
  return assignVariant();
}

/**
 * Check if variant is valid
 */
function isValidVariant(variant: string): boolean {
  return DEFAULT_AB_CONFIG.variants.includes(variant as Variant);
}

/**
 * Assign variant based on weighted distribution
 */
function assignVariant(): Variant {
  const random = Math.random() * 100;
  let cumulative = 0;

  for (const variant of DEFAULT_AB_CONFIG.variants) {
    cumulative += DEFAULT_AB_CONFIG.weights[variant];
    if (random <= cumulative) {
      return variant;
    }
  }

  // Fallback to variant A
  return 'A';
}

/**
 * Cookie name for storing user's variant
 */
export const VARIANT_COOKIE_NAME = 'ab_variant';

/**
 * Cookie max age (30 days)
 */
export const VARIANT_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
