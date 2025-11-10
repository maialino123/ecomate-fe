import { formatNumber, formatCurrency, abbreviateNumber } from '@/lib/utils/formatNumber';

describe('formatNumber', () => {
  it('formats numbers with thousand separators', () => {
    expect(formatNumber(1000)).toBe('1.000');
    expect(formatNumber(50000)).toBe('50.000');
    expect(formatNumber(1500000)).toBe('1.500.000');
  });

  it('handles zero and small numbers', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(99)).toBe('99');
  });
});

describe('formatCurrency', () => {
  it('formats currency with đ suffix', () => {
    expect(formatCurrency(1000000)).toBe('1.000.000đ');
    expect(formatCurrency(2490000)).toBe('2.490.000đ');
  });

  it('handles zero amount', () => {
    expect(formatCurrency(0)).toBe('0đ');
  });
});

describe('abbreviateNumber', () => {
  it('abbreviates large numbers with K suffix', () => {
    expect(abbreviateNumber(1000)).toBe('1K');
    expect(abbreviateNumber(15000)).toBe('15K');
    expect(abbreviateNumber(50000)).toBe('50K');
  });

  it('abbreviates millions with M suffix', () => {
    expect(abbreviateNumber(1000000)).toBe('1.0M');
    expect(abbreviateNumber(2500000)).toBe('2.5M');
  });

  it('returns small numbers as-is', () => {
    expect(abbreviateNumber(0)).toBe('0');
    expect(abbreviateNumber(99)).toBe('99');
    expect(abbreviateNumber(500)).toBe('500');
  });
});
