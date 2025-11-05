'use client';

import { useState } from 'react';
import type { Variant } from '@/lib/ab-testing';

interface VariantProps {
  variant: Variant;
}

/**
 * Variant A: Professional & Trust-focused
 * Emphasizes credibility, statistics, and professional design
 */
export default function VariantA({ variant }: VariantProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Track conversion
    console.log('Variant A - Email submitted:', email, 'Variant:', variant);
    alert('Thank you for signing up!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-green-700 mb-2">EcoMate</h1>
            <p className="text-sm text-gray-600 uppercase tracking-wide">
              Trusted by 50,000+ eco-conscious individuals
            </p>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Make Sustainable Living <span className="text-green-600">Simple</span>
          </h2>

          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of people reducing their carbon footprint with our science-backed sustainability platform.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-green-600">50K+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-green-600">2M+</div>
              <div className="text-sm text-gray-600">CO₂ Tons Saved</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-green-600">4.9/5</div>
              <div className="text-sm text-gray-600">User Rating</div>
            </div>
          </div>

          {/* CTA Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Get Started
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Free forever. No credit card required.
            </p>
          </form>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Track Your Impact</h3>
              <p className="text-gray-600">
                Monitor your carbon footprint with detailed analytics and insights.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Personalized Goals</h3>
              <p className="text-gray-600">
                Set and achieve sustainability goals tailored to your lifestyle.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3">Community Impact</h3>
              <p className="text-gray-600">
                Join a community making real, measurable environmental change.
              </p>
            </div>
          </div>

          {/* Variant Indicator (for testing) */}
          <div className="mt-16 text-xs text-gray-400">
            Variant: {variant}
          </div>
        </div>
      </div>
    </div>
  );
}
