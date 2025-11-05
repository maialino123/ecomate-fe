'use client';

import { useState } from 'react';
import type { Variant } from '@/lib/ab-testing';
import { Button, Input } from '@/components/ui';

interface VariantProps {
  variant: Variant;
}

/**
 * Variant C: Simple & Action-focused
 * Minimalist design with clear, direct CTA
 * Now using base components from UI library
 */
export default function VariantC({ variant }: VariantProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Track conversion
    console.log('Variant C - Email submitted:', email, 'Variant:', variant);
    alert('You\'re in! Check your email.');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Minimal */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          {/* Simple Logo */}
          <div className="mb-16 text-center">
            <div className="inline-block mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-3xl">
                🌿
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">EcoMate</h1>
          </div>

          {/* Clear Value Prop */}
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Reduce your carbon footprint in <span className="text-green-600">10 minutes</span>
            </h2>

            <p className="text-2xl text-gray-600 mb-12">
              Simple. Effective. Free.
            </p>

            {/* Big CTA - Using base components */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                inputSize="lg"
                className="w-full mb-4 border-2"
              />
              <Button
                type="submit"
                variant="primary"
                size="xl"
                className="w-full shadow-lg"
              >
                Get Started Now →
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </div>

          {/* Simple Benefits - 3 points */}
          <div className="mt-24 space-y-12">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                ✓
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Track in Seconds
                </h3>
                <p className="text-lg text-gray-600">
                  Log your activities and see your impact instantly. No complicated setup.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                ✓
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Get Personalized Tips
                </h3>
                <p className="text-lg text-gray-600">
                  Receive actionable recommendations based on your lifestyle.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                ✓
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  See Real Results
                </h3>
                <p className="text-lg text-gray-600">
                  Watch your carbon footprint decrease week by week.
                </p>
              </div>
            </div>
          </div>

          {/* Simple Social Proof */}
          <div className="mt-24 text-center">
            <p className="text-gray-500 text-lg mb-4">
              Trusted by people at
            </p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <div className="text-gray-400 font-semibold">Google</div>
              <div className="text-gray-400 font-semibold">Amazon</div>
              <div className="text-gray-400 font-semibold">Microsoft</div>
              <div className="text-gray-400 font-semibold">Apple</div>
            </div>
          </div>

          {/* Repeat CTA - Using base components */}
          <div className="mt-24 text-center p-12 bg-gray-50 rounded-2xl">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to make an impact?
            </h3>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <Button
                type="submit"
                variant="primary"
                size="xl"
                className="w-full shadow-lg"
              >
                Start Free Today →
              </Button>
            </form>
          </div>

          {/* Variant Indicator (for testing) */}
          <div className="mt-16 text-center text-xs text-gray-400">
            Variant: {variant}
          </div>
        </div>
      </div>
    </div>
  );
}
