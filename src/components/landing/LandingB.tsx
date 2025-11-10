'use client';

import { useState } from 'react';
import { LandingLayout } from '../composition/LandingLayout';
import { Hero } from '../presentation/Hero';
import { ProductsSection } from '../composition/ProductsSection';
import { FeaturesSection } from '../composition/FeaturesSection';
import { TestimonialsSection } from '../composition/TestimonialsSection';
import { CTA } from '../presentation/CTA';
import { Button, Input } from '../ui';
import { formatCurrency } from '@/lib/utils/formatNumber';

/**
 * LANDING PAGE B - Eco-Friendly & Natural
 * Target: Millennials quan tâm môi trường
 * Design: Xanh, tự nhiên, thân thiện
 */
export default function LandingB() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('LandingB - Email:', email);
    alert('🌱 Cảm ơn bạn đã quan tâm đến môi trường!');
    setEmail('');
  };

  const products = [
    {
      name: 'Bộ Đồ Ăn Tre Tự Nhiên',
      price: formatCurrency(890000),
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      tag: 'Eco-Friendly',
    },
    {
      name: 'Túi Vải Canvas Organic',
      price: formatCurrency(290000),
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
      tag: '100% Natural',
    },
    {
      name: 'Hộp Đựng Thực Phẩm Tre',
      price: formatCurrency(490000),
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80',
      tag: 'Biodegradable',
    },
  ];

  const features = [
    {
      icon: '🌱',
      title: '100% Tự Nhiên',
      description: 'Sản phẩm từ nguyên liệu thiên nhiên, an toàn cho sức khỏe',
    },
    {
      icon: '♻️',
      title: 'Có Thể Tái Chế',
      description: 'Góp phần bảo vệ môi trường với sản phẩm tái chế được',
    },
    {
      icon: '🌍',
      title: 'Thân Thiện Môi Trường',
      description: 'Giảm thiểu rác thải nhựa, hướng đến tương lai xanh',
    },
    {
      icon: '❤️',
      title: 'An Toàn Cho Gia Đình',
      description: 'Không chất độc hại, an toàn tuyệt đối cho trẻ em',
    },
  ];

  const testimonials = [
    {
      quote: 'Sản phẩm rất tốt, chất lượng cao và thân thiện với môi trường. Gia đình tôi rất hài lòng!',
      author: 'Nguyễn Thị Lan',
      role: 'Khách hàng thân thiết',
      rating: 5,
    },
    {
      quote: 'Mình rất thích concept xanh của shop. Giá cả hợp lý, đóng gói cẩn thận.',
      author: 'Trần Văn Nam',
      role: 'Người dùng mới',
      rating: 5,
    },
    {
      quote: 'Chuyển sang dùng sản phẩm tự nhiên, da tôi đỡ dị ứng hẳn. Cảm ơn EcoMate!',
      author: 'Lê Thị Hương',
      role: 'Khách hàng VIP',
      rating: 5,
    },
  ];

  const stats = [
    { value: '10K', suffix: '+', label: 'Cây Xanh Được Trồng' },
    { value: '5', suffix: ' tấn', label: 'Nhựa Được Giảm Thiểu' },
    { value: '98', suffix: '%', label: 'Khách Hài Lòng' },
  ];

  return (
    <LandingLayout className="bg-gradient-to-b from-primary-50 via-white to-primary-50">
      {/* Hero Section */}
      <Hero
        badge="🌱 SỐNG XANH - SỐNG KHỎE"
        title={
          <>
            Lựa Chọn <span className="text-primary-600">Xanh</span>
            <br />
            Cho Tương Lai <span className="text-primary-600">Bền Vững</span>
          </>
        }
        subtitle="Khám phá bộ sưu tập đồ gia dụng thân thiện môi trường, từ nguyên liệu tự nhiên, góp phần bảo vệ hành tinh xanh."
        stats={stats}
        variant="gradient"
      >
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 bg-white rounded-2xl p-3 shadow-xl">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email của bạn"
              required
              className="flex-1 text-base md:text-lg"
            />
            <Button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 md:px-8 py-3 rounded-xl font-semibold"
            >
              Đăng Ký
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            🌍 Cùng nhau xây dựng một tương lai xanh hơn
          </p>
        </form>
      </Hero>

      {/* Products Section */}
      <ProductsSection
        title={
          <>
            Sản Phẩm <span className="text-primary-600">Xanh</span>
          </>
        }
        subtitle="Từ thiên nhiên, cho thiên nhiên"
        products={products}
      />

      {/* Features Section */}
      <FeaturesSection
        title={
          <>
            Tại Sao Chọn <span className="text-primary-600">Sản Phẩm Xanh</span>?
          </>
        }
        features={features}
        columns={4}
      />

      {/* Testimonials */}
      <TestimonialsSection
        title="Khách Hàng Nói Gì Về Chúng Tôi"
        subtitle="Trải nghiệm thực tế từ những người đã tin dùng"
        testimonials={testimonials}
      />

      {/* Final CTA */}
      <CTA
        title="Cùng Nhau Bảo Vệ Môi Trường"
        description="Mỗi sản phẩm bạn chọn là một bước tiến cho hành tinh xanh"
        variant="gradient"
      >
        <Button className="bg-white text-primary-600 hover:bg-gray-100 px-8 md:px-12 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-colors">
          Tham Gia Ngay
        </Button>
      </CTA>
    </LandingLayout>
  );
}
