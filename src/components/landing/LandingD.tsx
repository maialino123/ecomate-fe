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
 * LANDING PAGE D - Budget-Friendly & Family
 * Target: Gia đình trung lưu, tiết kiệm
 * Design: Ấm cúng, gần gũi, giá tốt
 */
export default function LandingD() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('LandingD - Email:', email);
    alert('❤️ Cảm ơn bạn! Gia đình là số 1!');
    setEmail('');
  };

  const products = [
    {
      name: 'Bộ Nồi Gia Đình 7 Món',
      price: formatCurrency(890000),
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      tag: 'Giá Tốt',
    },
    {
      name: 'Bộ Đồ Ăn 18 Món',
      price: formatCurrency(590000),
      image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80',
      tag: 'Best Value',
    },
    {
      name: 'Bình Giữ Nhiệt 2L',
      price: formatCurrency(290000),
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
      tag: 'Hot Deal',
    },
  ];

  const features = [
    {
      icon: '💰',
      title: 'Giá Cả Hợp Lý',
      description: 'Sản phẩm chất lượng với mức giá phù hợp mọi gia đình',
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'An Toàn Cho Cả Nhà',
      description: 'Kiểm định chất lượng, an toàn tuyệt đối',
    },
    {
      icon: '🎯',
      title: 'Khuyến Mãi Hấp Dẫn',
      description: 'Chương trình ưu đãi liên tục, mua nhiều giảm nhiều',
    },
    {
      icon: '🚚',
      title: 'Giao Hàng Nhanh',
      description: 'Miễn phí ship nội thành, giao hàng trong 24h',
    },
  ];

  const testimonials = [
    {
      quote: 'Giá rẻ mà chất lượng tốt, gia đình mình dùng rất ưng. Sẽ ủng hộ dài dài!',
      author: 'Phạm Thị Mai',
      role: 'Mẹ của 2 bé',
      rating: 5,
    },
    {
      quote: 'Shop tư vấn nhiệt tình, sản phẩm đúng mô tả. Giá cả phải chăng cho sinh viên.',
      author: 'Hoàng Văn Đức',
      role: 'Sinh viên',
      rating: 5,
    },
    {
      quote: 'Mua combo đồ gia dụng được giảm giá nhiều. Chất lượng ok, giao hàng nhanh.',
      author: 'Nguyễn Thị Thu',
      role: 'Nội trợ',
      rating: 5,
    },
  ];

  const stats = [
    { value: '100K', suffix: '+', label: 'Gia Đình Tin Dùng' },
    { value: '4.8', suffix: '/5', label: 'Đánh Giá Trung Bình' },
    { value: '24h', suffix: '', label: 'Giao Hàng Nhanh' },
  ];

  return (
    <LandingLayout className="bg-gradient-to-b from-orange-50 via-white to-orange-50">
      {/* Hero Section */}
      <Hero
        badge="❤️ DÀNH CHO GIA ĐÌNH VIỆT"
        title={
          <>
            Hạnh Phúc <span className="text-orange-600">Gia Đình</span>
            <br />
            Bắt Đầu Từ <span className="text-orange-600">Nhà Bếp</span>
          </>
        }
        subtitle="Đồ gia dụng chất lượng, giá cả hợp lý cho mọi gia đình Việt. Mua nhiều giảm nhiều, freeship nội thành."
        stats={stats}
        variant="default"
      >
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 bg-white rounded-2xl p-3 shadow-xl border-2 border-orange-200">
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
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 md:px-8 py-3 rounded-xl font-semibold"
            >
              Nhận Ưu Đãi
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            🎁 Giảm ngay 15% + Freeship cho đơn đầu tiên
          </p>
        </form>
      </Hero>

      {/* Products Section */}
      <ProductsSection
        title={
          <>
            Sản Phẩm <span className="text-orange-600">Bán Chạy</span>
          </>
        }
        subtitle="Chất lượng tốt, giá cả phải chăng"
        products={products}
      />

      {/* Features Section */}
      <FeaturesSection
        title={
          <>
            Tại Sao Chọn <span className="text-orange-600">Chúng Tôi</span>?
          </>
        }
        features={features}
        columns={4}
      />

      {/* Testimonials */}
      <TestimonialsSection
        title="Gia Đình Việt Tin Dùng"
        subtitle="Hàng nghìn khách hàng hài lòng"
        testimonials={testimonials}
      />

      {/* Final CTA */}
      <CTA
        title="Mua Ngay Hôm Nay - Giảm Giá Đặc Biệt"
        description="Freeship + Giảm 15% cho đơn hàng đầu tiên"
        variant="gradient"
      >
        <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 md:px-12 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-colors shadow-lg">
          Mua Ngay
        </Button>
      </CTA>
    </LandingLayout>
  );
}
