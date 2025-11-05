'use client';

import { useState } from 'react';
import type { Variant } from '@/lib/ab-testing';
import { Button, Input, Card, CardContent } from '@/components/ui';
import { Header, Footer } from '@/components/common';

interface VariantProps {
  variant: Variant;
}

/**
 * Variant A: Professional & Trust-focused
 * Emphasizes credibility, statistics, and professional design
 * Now using base components from UI library
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
    <>
      <Header />
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

          {/* Stats - Using Card components */}
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
            <Card variant="default">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary-600">50K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </CardContent>
            </Card>
            <Card variant="default">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary-600">2M+</div>
                <div className="text-sm text-gray-600">CO₂ Tons Saved</div>
              </CardContent>
            </Card>
            <Card variant="default">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary-600">4.9/5</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Form - Using Input and Button components */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                inputSize="lg"
                className="flex-1"
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
              >
                Get Started
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Free forever. No credit card required.
            </p>
          </form>

          {/* Features - Using Card components */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <Card variant="default">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-3">Track Your Impact</h3>
                <p className="text-gray-600">
                  Monitor your carbon footprint with detailed analytics and insights.
                </p>
              </CardContent>
            </Card>
            <Card variant="default">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3">Personalized Goals</h3>
                <p className="text-gray-600">
                  Set and achieve sustainability goals tailored to your lifestyle.
                </p>
              </CardContent>
            </Card>
            <Card variant="default">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-bold mb-3">Community Impact</h3>
                <p className="text-gray-600">
                  Join a community making real, measurable environmental change.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Variant Indicator (for testing) */}
          <div className="mt-16 text-xs text-gray-400">
            Variant: {variant}
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
