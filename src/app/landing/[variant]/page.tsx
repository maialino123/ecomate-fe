import { notFound } from 'next/navigation';
import type { Variant } from '@/lib/ab-testing';
import VariantA from '@/components/landing/VariantA';
import VariantB from '@/components/landing/VariantB';
import VariantC from '@/components/landing/VariantC';

interface PageProps {
  params: Promise<{
    variant: string;
  }>;
}

const variantComponents = {
  A: VariantA,
  B: VariantB,
  C: VariantC,
};

export default async function LandingPage({ params }: PageProps) {
  const { variant } = await params;

  // Validate variant
  if (!['A', 'B', 'C'].includes(variant)) {
    notFound();
  }

  const VariantComponent = variantComponents[variant as Variant];

  return (
    <main>
      <VariantComponent variant={variant as Variant} />
    </main>
  );
}

// Generate static params for all variants
export async function generateStaticParams() {
  return [
    { variant: 'A' },
    { variant: 'B' },
    { variant: 'C' },
  ];
}
