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
 * LANDING PAGE A - Modern Minimalist Luxury
 * Target: Gia đình trẻ 25-35 tuổi, thu nhập cao
 * Design: Sang trọng, tối giản, tinh tế
 * NO inline styles - Pure Tailwind CSS
 */
export default function LandingA() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('LandingA - Email:', email);
    alert('✨ Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.');
    setEmail('');
  };

  // Mock data
  const products = [
    {
      name: 'Bộ Chén Gốm Cao Cấp',
      price: formatCurrency(1290000),
      image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80',
      tag: 'Best Seller',
    },
    {
      name: 'Bộ Dao Nhà Bếp Professional',
      price: formatCurrency(2490000),
      image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80',
      tag: 'Premium',
    },
    {
      name: 'Bộ Nồi Inox 5 Đáy',
      price: formatCurrency(3890000),
      image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80',
      tag: 'Luxury',
    },
  ];

  const features = [
    {
      icon: '✨',
      title: 'Chất Lượng Premium',
      description: 'Sản phẩm cao cấp từ các thương hiệu quốc tế',
    },
    {
      icon: '🎁',
      title: 'Miễn Phí Vận Chuyển',
      description: 'Giao hàng miễn phí toàn quốc cho đơn từ 500K',
    },
    {
      icon: '🔒',
      title: 'Bảo Hành 5 Năm',
      description: 'Cam kết bảo hành dài hạn, đổi mới trong 30 ngày',
    },
    {
      icon: '💎',
      title: 'Thiết Kế Tinh Tế',
      description: 'Phong cách tối giản, sang trọng cho ngôi nhà hiện đại',
    },
  ];

  const stats = [
    { value: '50K', suffix: '+', label: 'Khách Hàng Hài Lòng' },
    { value: '15K', suffix: '+', label: 'Sản Phẩm Premium' },
    { value: '99', suffix: '%', label: 'Đánh Giá 5 Sao' },
  ];

  return (
    <LandingLayout className="bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <Hero
        badge="✨ PREMIUM HOME COLLECTION 2025"
        title={
          <>
            Không Gian Sống
            <br />
            <span className="text-primary-600">Tinh Tế & Sang Trọng</span>
          </>
        }
        subtitle="Khám phá bộ sưu tập đồ gia dụng cao cấp, thiết kế tối giản, mang đến trải nghiệm sống đẳng cấp cho ngôi nhà của bạn."
        stats={stats}
        variant="gradient"
      >
        {/* Email CTA Form */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-gray-200">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              required
              className="flex-1 border-0 text-base md:text-lg"
            />
            <Button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 md:px-8 py-3 rounded-xl font-semibold text-base md:text-lg transition-colors"
            >
              Nhận Ưu Đãi
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            🎁 Giảm 20% cho đơn hàng đầu tiên. Miễn phí vận chuyển.
          </p>
        </form>
      </Hero>

      {/* Products Section */}
      <ProductsSection
        title={
          <>
            Bộ Sưu Tập <span className="text-primary-600">Nổi Bật</span>
          </>
        }
        subtitle="Những sản phẩm được tuyển chọn kỹ lưỡng, kết hợp giữa thẩm mỹ và công năng"
        products={products}
      />

      {/* Features Section */}
      <FeaturesSection
        title={
          <>
            Tại Sao Chọn <span className="text-primary-600">EcoMate</span>?
          </>
        }
        features={features}
        columns={4}
      />

      {/* Final CTA */}
      <CTA
        title={
          <>
            Bắt Đầu Hành Trình <span className="text-primary-600">Sang Trọng</span>
          </>
        }
        description="Đăng ký ngay để nhận ưu đãi 20% cho đơn hàng đầu tiên"
        variant="bordered"
      >
        <Button className="bg-primary-600 hover:bg-primary-700 text-white px-8 md:px-12 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-colors">
          Khám Phá Ngay
        </Button>
      </CTA>
    </LandingLayout>
  );
}
