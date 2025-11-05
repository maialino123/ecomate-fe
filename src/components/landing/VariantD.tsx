'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Variant } from '@/lib/ab-testing';
import { Button, Input } from '@/components/ui';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// High-quality Unsplash images for Vietnamese ecosystem theme
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=3432&auto=format&fit=crop', // Vietnamese forest
  heroOverlay: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=3413&auto=format&fit=crop', // Green leaves
  feature1: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=3540&auto=format&fit=crop', // Sustainable living
  feature2: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=3540&auto=format&fit=crop', // Green tech
  impact: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=3540&auto=format&fit=crop', // Community planting
  testimonial: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=3413&auto=format&fit=crop', // Nature background
  cta: 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=3432&auto=format&fit=crop', // Forest sunset
};

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
        {/* Parallax Background Image Layers */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          {/* Main background image */}
          <div className="absolute inset-0">
            <Image
              src={IMAGES.hero}
              alt="Vietnamese Forest Background"
              fill
              priority
              className="object-cover float-1"
              style={{ objectPosition: 'center 40%' }}
            />
            {/* Gradient overlays for text readability and depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-primary-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-transparent" />
          </div>

          {/* Floating overlay image with parallax effect */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full opacity-40 float-2"
            style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '30%']) }}
          >
            <Image
              src={IMAGES.heroOverlay}
              alt="Green Leaves Overlay"
              fill
              className="object-cover mix-blend-overlay"
            />
          </motion.div>

          {/* Animated light particles */}
          <div className="absolute inset-0 float-3">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary-300 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
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

// Features Section Component with Image Backgrounds
function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate background images on scroll
      gsap.to('.feature-bg-1', {
        scrollTrigger: {
          trigger: '.feature-bg-1',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: 100,
        scale: 1.1,
      });

      gsap.to('.feature-bg-2', {
        scrollTrigger: {
          trigger: '.feature-bg-2',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -50,
        scale: 1.05,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      {/* Background Image Layers with Parallax */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 w-1/2 h-3/4 opacity-10 feature-bg-1">
          <Image
            src={IMAGES.feature1}
            alt="Sustainable Living"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute right-0 bottom-0 w-1/2 h-3/4 opacity-10 feature-bg-2">
          <Image
            src={IMAGES.feature2}
            alt="Green Technology"
            fill
            className="object-cover"
          />
        </div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/90 to-transparent" />
      </div>

      <div className="container mx-auto max-w-7xl relative">
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

// Impact Section with Full-Screen Background Image
function ImpactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Zoom effect on scroll
      gsap.to('.impact-bg', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        scale: 1.2,
      });

      // Reveal effect for stats
      gsap.from('.impact-stat', {
        scrollTrigger: {
          trigger: '.impact-stat',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="impact-bg absolute inset-0">
          <Image
            src={IMAGES.impact}
            alt="Community Impact"
            fill
            className="object-cover"
          />
        </div>
        {/* Multi-layer gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/95 via-primary-700/90 to-primary-800/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
        {/* Animated light rays */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, white 50%, transparent 70%)',
          }}
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl text-center text-white relative z-10">
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
                className="impact-stat text-center backdrop-blur-sm bg-white/10 rounded-2xl p-6"
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

// Testimonials Section with Subtle Background
function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle parallax for background
      gsap.to('.testimonial-bg', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: 50,
        opacity: 0.15,
      });

      // Card reveal animation
      gsap.from('.testimonial-card', {
        scrollTrigger: {
          trigger: '.testimonial-card',
          start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      {/* Subtle Background Image */}
      <div className="absolute inset-0 -z-10">
        <div className="testimonial-bg absolute inset-0 opacity-5">
          <Image
            src={IMAGES.testimonial}
            alt="Nature Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gray-50/80 backdrop-blur-sm" />
      </div>

      <div className="container mx-auto max-w-7xl relative">
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
              whileHover={{ y: -8, scale: 1.02 }}
              className="testimonial-card bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all"
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

// Final CTA Section with Dramatic Background
function FinalCTASection({ onSubmit, email, setEmail }: any) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Zoom and fade effect for background
      gsap.to('.cta-bg', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        scale: 1.15,
      });

      // Pulse animation for CTA box
      gsap.from('.cta-box', {
        scrollTrigger: {
          trigger: '.cta-box',
          start: 'top 80%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Dramatic Background Image */}
      <div className="absolute inset-0 -z-10">
        <div className="cta-bg absolute inset-0">
          <Image
            src={IMAGES.cta}
            alt="Forest Sunset"
            fill
            className="object-cover"
          />
        </div>
        {/* Multi-layer overlays for depth and drama */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-primary-700/85 to-primary-900/90" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-primary-600/30 to-primary-900/70" />

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Animated gradient sweep */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          }}
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="cta-box relative rounded-[32px] p-12 text-white text-center overflow-hidden"
        >
          {/* Glass morphism effect */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-[32px] border border-white/20" />

          <div className="relative z-10">
            <motion.h2
              className="text-5xl font-bold mb-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Sẵn Sàng Tạo Thay Đổi?
            </motion.h2>
            <motion.p
              className="text-xl mb-10 opacity-90 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Tham gia cùng 50,000+ người đang xây dựng tương lai bền vững.
              Bắt đầu hành trình của bạn ngay hôm nay!
            </motion.p>

            <motion.form
              onSubmit={onSubmit}
              className="max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
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
                  className="px-8 bg-white text-primary-600 hover:bg-gray-100 shadow-lg whitespace-nowrap hover:scale-105 transition-transform"
                >
                  Bắt Đầu Miễn Phí →
                </Button>
              </div>
              <p className="text-sm mt-4 opacity-75">
                🎉 Đăng ký miễn phí • ⚡ Kích hoạt ngay lập tức • 🔒 Bảo mật tuyệt đối
              </p>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
