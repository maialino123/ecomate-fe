'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Variant } from '@/lib/ab-testing';
import { Button, Input } from '@/components/ui';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface VariantProps {
  variant: Variant;
}

/**
 * Variant D: Vietnamese Ecosystem - Premium Landing Page
 *
 * Features:
 * - GSAP animations for smooth, professional effects
 * - Scroll-triggered animations
 * - 8pt spacing system
 * - Modern landing page patterns
 * - Vietnamese content focused on ecosystem/sustainability
 */
export default function VariantD({ variant }: VariantProps) {
  const [email, setEmail] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // GSAP Hero Animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
      .from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5')
      .from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4')
      .from('.hero-badge', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }, '-=0.3');

      // Floating animation for hero elements
      gsap.to('.float-1', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      gsap.to('.float-2', {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 0.5,
      });

      gsap.to('.float-3', {
        y: -25,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Track conversion
    console.log('Variant D - Email submitted:', email, 'Variant:', variant);

    // Success animation
    gsap.from('.success-message', {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
    });

    alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ sớm.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-primary-50">
      {/* Hero Section - Animated with GSAP */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary-200 rounded-full blur-3xl opacity-30 float-1" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-primary-300 rounded-full blur-3xl opacity-20 float-2" />
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-25 float-3" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Trust Badge */}
            <motion.div className="hero-badge inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">
                Được tin cậy bởi <strong className="text-primary-600">50,000+</strong> người dùng
              </span>
            </motion.div>

            {/* Hero Title */}
            <h1 className="hero-title text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight">
              Xây Dựng{' '}
              <span className="text-primary-600 relative inline-block">
                Tương Lai
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 2 150 2 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
              <br />
              Bền Vững
            </h1>

            {/* Hero Subtitle */}
            <p className="hero-subtitle text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Tham gia cộng đồng hơn 50,000 người đang kiến tạo một hệ sinh thái xanh,
              giảm thiểu tác động môi trường và lan tỏa giá trị bền vững cho thế hệ tương lai
            </p>

            {/* Hero CTA */}
            <motion.form
              onSubmit={handleSubmit}
              className="hero-cta max-w-2xl mx-auto mb-12"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl shadow-2xl">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  required
                  inputSize="lg"
                  className="flex-1 border-0 focus:ring-0"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="px-8 whitespace-nowrap shadow-lg hover:shadow-xl transition-shadow"
                >
                  Bắt Đầu Ngay →
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                ✨ Miễn phí mãi mãi • Không cần thẻ tín dụng • Hủy bất cứ lúc nào
              </p>
            </motion.form>

            {/* Social Proof Stats */}
            <AnimatedStats />
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-gray-400 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section with Scroll Animations */}
      <FeaturesSection />

      {/* Impact Numbers Section */}
      <ImpactSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Final CTA Section */}
      <FinalCTASection onSubmit={handleSubmit} email={email} setEmail={setEmail} />

      {/* Variant Indicator */}
      <div className="text-center py-4 text-xs text-gray-400">
        Variant: {variant}
      </div>
    </div>
  );
}

// Animated Stats Component with Count-Up
function AnimatedStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { value: 50000, suffix: '+', label: 'Người dùng' },
    { value: 2000000, suffix: '+', label: 'Tấn CO₂ giảm' },
    { value: 4.9, suffix: '/5', label: 'Đánh giá' },
  ];

  return (
    <div ref={ref} className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.2, type: 'spring', stiffness: 100 }}
          className="text-center"
        >
          <div className="text-4xl font-bold text-primary-600">
            <CountUp end={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

// Count Up Animation Component
function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {end >= 1000 ? count.toLocaleString('vi-VN') : count.toFixed(1)}
      {suffix}
    </span>
  );
}

// Features Section Component
function FeaturesSection() {
  const features = [
    {
      icon: '🌱',
      title: 'Theo Dõi Dấu Chân Carbon',
      description: 'Giám sát và phân tích lượng phát thải carbon của bạn với công nghệ AI hiện đại, nhận insights chi tiết để cải thiện.',
    },
    {
      icon: '📊',
      title: 'Báo Cáo Chi Tiết',
      description: 'Dashboard trực quan với biểu đồ và số liệu theo thời gian thực, giúp bạn hiểu rõ tác động của mình đến môi trường.',
    },
    {
      icon: '🎯',
      title: 'Mục Tiêu Cá Nhân Hóa',
      description: 'Đặt và theo dõi các mục tiêu bền vững phù hợp với lối sống, nhận gợi ý thông minh để đạt được chúng.',
    },
    {
      icon: '🌍',
      title: 'Cộng Đồng Toàn Cầu',
      description: 'Kết nối với hàng ngàn người có cùng chí hướng, chia sẻ kinh nghiệm và cùng nhau tạo ra tác động tích cực.',
    },
    {
      icon: '🏆',
      title: 'Thành Tựu & Phần Thưởng',
      description: 'Nhận huy chương và phần thưởng khi đạt được các mốc quan trọng, biến hành trình xanh thành trải nghiệm thú vị.',
    },
    {
      icon: '💚',
      title: 'Tác Động Thực Tế',
      description: 'Mỗi hành động của bạn đều được quy đổi thành giá trị cụ thể, từ cây xanh được trồng đến năng lượng được tiết kiệm.',
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Tính Năng Nổi Bật
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Công cụ toàn diện giúp bạn theo dõi, cải thiện và lan tỏa phong cách sống bền vững
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Feature Card with Hover Animation
function FeatureCard({ feature, index }: { feature: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
    >
      <motion.div
        className="text-5xl mb-4"
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {feature.icon}
      </motion.div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
        {feature.title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

// Impact Section
function ImpactSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div className="container mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold mb-6">
            Cùng Nhau Tạo Nên Tác Động
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Hơn 50,000 thành viên đã tiết kiệm được 2 triệu tấn CO₂,
            tương đương với việc trồng 90 triệu cây xanh
          </p>

          <div className="grid md:grid-cols-4 gap-8 mt-16">
            {[
              { icon: '🌳', number: '90M+', label: 'Cây xanh tương đương' },
              { icon: '⚡', number: '500K+', label: 'kWh tiết kiệm' },
              { icon: '♻️', number: '300K+', label: 'Tấn rác tái chế' },
              { icon: '💧', number: '1M+', label: 'Lít nước tiết kiệm' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <div className="text-4xl font-bold mb-2">{item.number}</div>
                <div className="text-lg opacity-90">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Nguyễn Minh Anh',
      role: 'Founder, GreenTech Startup',
      content: 'EcoMate đã thay đổi hoàn toàn cách tôi nhìn nhận về tác động môi trường. Sau 3 tháng, tôi đã giảm 40% lượng phát thải carbon!',
      avatar: '👩',
    },
    {
      name: 'Trần Hoàng Long',
      role: 'Marketing Manager',
      content: 'Giao diện trực quan, dữ liệu chi tiết và cộng đồng hỗ trợ nhiệt tình. Đây là công cụ tôi đã tìm kiếm từ lâu.',
      avatar: '👨',
    },
    {
      name: 'Lê Thu Hà',
      role: 'Teacher',
      content: 'Tôi sử dụng EcoMate để dạy học sinh về bảo vệ môi trường. Các em rất hứng thú và tích cực tham gia!',
      avatar: '👩‍🏫',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Người Dùng Nói Gì
          </h2>
          <p className="text-xl text-gray-600">
            Những câu chuyện truyền cảm hứng từ cộng đồng
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-3xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="text-5xl mr-4">{testimonial.avatar}</div>
                <div>
                  <div className="font-bold text-lg">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="mt-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTASection({ onSubmit, email, setEmail }: any) {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-[32px] p-12 text-white text-center shadow-2xl"
        >
          <h2 className="text-5xl font-bold mb-6">
            Sẵn Sàng Tạo Thay Đổi?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Tham gia cùng 50,000+ người đang xây dựng tương lai bền vững.
            Bắt đầu hành trình của bạn ngay hôm nay!
          </p>

          <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-md p-2 rounded-2xl">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                required
                inputSize="lg"
                className="flex-1 border-0 bg-white text-gray-900"
              />
              <Button
                type="submit"
                size="lg"
                className="px-8 bg-white text-primary-600 hover:bg-gray-100 shadow-lg whitespace-nowrap"
              >
                Bắt Đầu Miễn Phí →
              </Button>
            </div>
            <p className="text-sm mt-4 opacity-75">
              🎉 Đăng ký miễn phí • ⚡ Kích hoạt ngay lập tức • 🔒 Bảo mật tuyệt đối
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
