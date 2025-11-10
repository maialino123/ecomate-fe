/**
 * Format a number with thousand separators
 * @param value - The number to format
 * @returns Formatted string (e.g., 1000 -> "1.000")
 */
export function formatNumber(value: number): string {
  return value.toLocaleString('vi-VN');
}

/**
 * Format a number as Vietnamese currency
 * @param value - The amount to format
 * @returns Formatted currency string (e.g., 1000000 -> "1.000.000đ")
 */
export function formatCurrency(value: number): string {
  return `${value.toLocaleString('vi-VN')}đ`;
}

/**
 * Abbreviate large numbers with suffixes
 * @param value - The number to abbreviate
 * @returns Abbreviated string (e.g., 50000 -> "50K")
 */
export function abbreviateNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
}
