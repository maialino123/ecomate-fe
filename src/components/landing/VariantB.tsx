'use client';

import { useState } from 'react';
import type { Variant } from '@/lib/ab-testing';
import { Button, Input, Card, CardContent } from '@/components/ui';

interface VariantProps {
  variant: Variant;
}

/**
 * Variant B: Emotional & Impact-focused
 * Emphasizes environmental urgency and emotional connection
 * Now using base components from UI library
 */
export default function VariantB({ variant }: VariantProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Track conversion
    console.log('Variant B - Email submitted:', email, 'Variant:', variant);
    alert('Welcome to the movement!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-emerald-300 mb-2">🌱 EcoMate</h1>
            <p className="text-sm text-emerald-200 uppercase tracking-wide">
              Every action counts
            </p>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            The Planet Needs You.<br />
            <span className="text-emerald-300">Start Making a Difference Today.</span>
          </h2>

          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Climate change is real. But so is hope. Join a global movement of everyday heroes creating lasting environmental change.
          </p>

          {/* Urgent CTA */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl mb-12 max-w-2xl mx-auto border border-white/20">
            <p className="text-2xl font-bold mb-6 text-emerald-200">
              Together, We&apos;ve Already Saved 2M Tons of CO₂
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  inputSize="lg"
                  className="border-2 border-emerald-300 focus-visible:ring-emerald-400 text-gray-900"
                />
                <Button
                  type="submit"
                  size="xl"
                  className="bg-emerald-500 hover:bg-emerald-400 shadow-xl hover:scale-105"
                >
                  Join the Movement - It&apos;s Free
                </Button>
              </div>
            </form>
          </div>

          {/* Emotional Impact Stories */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <div className="text-5xl mb-4">🌊</div>
              <h3 className="text-2xl font-bold mb-3 text-emerald-200">
                Save Our Oceans
              </h3>
              <p className="text-emerald-100 leading-relaxed">
                Every small action ripples into massive change. Your choices today protect marine life for generations.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <div className="text-5xl mb-4">🌳</div>
              <h3 className="text-2xl font-bold mb-3 text-emerald-200">
                Restore Our Forests
              </h3>
              <p className="text-emerald-100 leading-relaxed">
                Together, we&apos;re planting hope. Join 50,000+ members actively reversing deforestation.
              </p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
            <p className="text-emerald-200 italic text-lg mb-2">
              &quot;EcoMate helped me realize that my daily choices matter. I&apos;ve cut my carbon footprint by 40% in just 3 months!&quot;
            </p>
            <p className="text-emerald-300 font-semibold">- Sarah K., Community Member</p>
          </div>

          {/* Variant Indicator (for testing) */}
          <div className="mt-16 text-xs text-emerald-400/50">
            Variant: {variant}
          </div>
        </div>
      </div>
    </div>
  );
}
