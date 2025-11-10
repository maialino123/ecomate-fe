'use client';

import { useState } from 'react';
import { LandingLayout } from '../composition/LandingLayout';
import { Hero } from '../presentation/Hero';
import { ProductsSection } from '../composition/ProductsSection';
import { FeaturesSection } from '../composition/FeaturesSection';
import { CTA } from '../presentation/CTA';
import { Button, Input } from '../ui';
import { formatCurrency } from '@/lib/utils/formatNumber';

/**
 * LANDING PAGE C - Smart Home & Tech
 * Target: Người yêu công nghệ, smart home
 * Design: Hiện đại, công nghệ, tương lai
 */
export default function LandingC() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('LandingC - Email:', email);
    alert('🚀 Chào mừng bạn đến với tương lai!');
    setEmail('');
  };

  const products = [
    {
      name: 'Robot Hút Bụi Thông Minh',
      price: formatCurrency(5990000),
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      tag: 'AI Powered',
    },
    {
      name: 'Nồi Cơm Điện Tử IH',
      price: formatCurrency(3490000),
      image: 'https://images.unsplash.com/photo-1556911261-6bd341186b2f?w=800&q=80',
      tag: 'Smart Tech',
    },
    {
      name: 'Máy Lọc Không Khí IoT',
      price: formatCurrency(7890000),
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      tag: 'IoT Ready',
    },
  ];

  const features = [
    {
      icon: '🤖',
      title: 'Điều Khiển Bằng AI',
      description: 'Trí tuệ nhân tạo học hỏi thói quen của bạn',
    },
    {
      icon: '📱',
      title: 'Kết Nối IoT',
      description: 'Điều khiển mọi thiết bị qua smartphone',
    },
    {
      icon: '⚡',
      title: 'Tiết Kiệm Năng Lượng',
      description: 'Tối ưu hóa điện năng tiêu thụ thông minh',
    },
    {
      icon: '🔔',
      title: 'Thông Báo Thông Minh',
      description: 'Nhận cảnh báo và cập nhật realtime',
    },
  ];

  const stats = [
    { value: '1M', suffix: '+', label: 'Thiết Bị Kết Nối' },
    { value: '30', suffix: '%', label: 'Tiết Kiệm Điện' },
    { value: '4.9', suffix: '/5', label: 'Đánh Giá Trung Bình' },
  ];

  return (
    <LandingLayout className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <Hero
        badge="🚀 SMART HOME REVOLUTION"
        title={
          <>
            Ngôi Nhà <span className="text-primary-400">Thông Minh</span>
            <br />
            Của <span className="text-primary-400">Tương Lai</span>
          </>
        }
        subtitle="Trải nghiệm cuộc sống hiện đại với các thiết bị gia dụng thông minh, kết nối IoT, điều khiển bằng AI."
        stats={stats}
        variant="minimal"
      >
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 bg-gray-800/80 backdrop-blur-sm rounded-2xl p-3 border border-primary-500/30">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email của bạn"
              required
              className="flex-1 bg-gray-900 border-gray-700 text-white text-base md:text-lg"
            />
            <Button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 md:px-8 py-3 rounded-xl font-semibold"
            >
              Trải Nghiệm
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            ⚡ Ưu đãi đặc biệt cho 100 khách hàng đầu tiên
          </p>
        </form>
      </Hero>

      {/* Products Section */}
      <ProductsSection
        title={
          <>
            Thiết Bị <span className="text-primary-400">Thông Minh</span>
          </>
        }
        subtitle="Công nghệ tiên tiến, dễ sử dụng"
        products={products}
      />

      {/* Features Section */}
      <FeaturesSection
        title={
          <>
            Tại Sao Chọn <span className="text-primary-400">Smart Home</span>?
          </>
        }
        features={features}
        columns={4}
      />

      {/* Final CTA */}
      <CTA
        title="Bước Vào Kỷ Nguyên Smart Home"
        description="Nâng cấp ngôi nhà của bạn với công nghệ tương lai"
        variant="gradient"
      >
        <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 md:px-12 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-colors">
          Khám Phá Ngay
        </Button>
      </CTA>
    </LandingLayout>
  );
}
