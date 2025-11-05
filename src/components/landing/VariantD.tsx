'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useSpring as useFramerSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Variant } from '@/lib/ab-testing';
import { Button, Input } from '@/components/ui';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom hook for mouse position tracking
function useMousePosition() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return { x, y };
}

// Custom hook for magnetic button effect
function useMagneticEffect(ref: React.RefObject<HTMLElement | null>, strength = 0.3) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useFramerSpring(x, { stiffness: 150, damping: 15 });
  const springY = useFramerSpring(y, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      const maxDistance = 150;

      if (distance < maxDistance) {
        x.set(distanceX * strength);
        y.set(distanceY * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, x, y, strength]);

  return { x: springX, y: springY };
}

// High-quality Unsplash images for Ecomate smart home theme
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=3540&auto=format&fit=crop', // Bright modern living room
  heroOverlay: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=80&w=3540&auto=format&fit=crop', // Smart home tablet
  feature1: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=3540&auto=format&fit=crop', // Modern kitchen interior
  feature2: 'https://images.unsplash.com/photo-1617104678098-ab8e2a3e8c66?q=80&w=3540&auto=format&fit=crop', // Bedroom with warm lighting
  impact: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=3540&auto=format&fit=crop', // Modern family home
  testimonial: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=3540&auto=format&fit=crop', // Cozy home interior
  cta: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=3540&auto=format&fit=crop', // Beautiful modern apartment
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
  const [cursorTrail, setCursorTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  // Mouse position for interactive parallax
  const { x: mouseX, y: mouseY } = useMousePosition();

  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Interactive parallax based on mouse position
  const heroParallaxX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-20, 20]);
  const heroParallaxY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-20, 20]);

  // Cursor trail effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorTrail((prev) => {
        const newTrail = [
          ...prev,
          { x: e.clientX, y: e.clientY, id: Date.now() },
        ].slice(-8); // Keep last 8 positions
        return newTrail;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-primary-50 relative">
      {/* Warm Ambient Cursor Trail Effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {cursorTrail.map((point, index) => (
          <motion.div
            key={point.id}
            className="absolute w-4 h-4 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, rgba(245, 158, 11, 0.4) 50%, transparent 70%)',
              left: point.x - 8,
              top: point.y - 8,
              filter: 'blur(3px)',
            }}
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* Hero Section - Animated with GSAP */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background Image Layers with Mouse Interaction */}
        <motion.div
          style={{
            y,
            opacity,
            x: heroParallaxX,
          }}
          className="absolute inset-0 z-0"
        >
          {/* Main background image */}
          <div className="absolute inset-0">
            <Image
              src={IMAGES.hero}
              alt="Modern Smart Living Room"
              fill
              priority
              className="object-cover float-1"
              style={{ objectPosition: 'center center' }}
            />
            {/* Warm gradient overlays for cozy home feeling */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 via-orange-900/20 to-primary-50/95" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-slate-800/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-50/90 via-transparent to-transparent" />

            {/* Ambient warm glow effect - breathing animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-amber-500/10 via-transparent to-transparent"
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          {/* Smart home controls overlay with subtle parallax */}
          <motion.div
            className="absolute top-0 right-0 w-1/3 h-full opacity-30 float-2"
            style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '15%']) }}
          >
            <Image
              src={IMAGES.heroOverlay}
              alt="Smart Home Controls"
              fill
              className="object-cover mix-blend-soft-light"
            />
          </motion.div>

          {/* Soft ambient light particles - slower, warmer */}
          <div className="absolute inset-0 float-3">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, transparent 70%)',
                }}
                animate={{
                  y: [-10, 10],
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="container mx-auto px-4 relative z-10"
          style={{ x: useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-10, 10]) }}
        >
          <div className="max-w-5xl mx-auto text-center">
            {/* Trust Badge with enhanced styling */}
            <motion.div
              className="hero-badge inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl mb-6 border border-primary-100"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
            >
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-800">
                Được tin cậy bởi <strong className="text-primary-600">15,000+</strong> gia đình Việt
              </span>
            </motion.div>

            {/* Hero Title with warm, welcoming typography */}
            <h1
              className="hero-title text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              style={{
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.3), 0 0 40px rgba(251, 146, 60, 0.2)',
              }}
            >
              Tiện Ích{' '}
              <span
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 0.6))',
                }}
              >
                Mỗi Ngày
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 2 150 2 198 10" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
              <br />
              Trong Từng Căn Phòng
            </h1>

            {/* Hero Subtitle with warm, inviting tone */}
            <p
              className="hero-subtitle text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed font-medium"
              style={{
                color: '#fef3c7',
                textShadow: '0 2px 8px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.4)',
              }}
            >
              Khám phá <span className="text-amber-200 font-bold">giải pháp nhà thông minh</span> và tiện ích gia dụng hiện đại,
              biến không gian sống của bạn thành nơi an lạc, tiện nghi và đầy cảm hứng
            </p>

            {/* Hero CTA with Magnetic Button */}
            <MagneticCTA onSubmit={handleSubmit} email={email} setEmail={setEmail} />

            {/* Social Proof Stats */}
            <AnimatedStats />
          </div>
        </motion.div>

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

// Magnetic CTA Component with Ripple Effect
function MagneticCTA({ onSubmit, email, setEmail }: any) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMagneticEffect(buttonRef, 0.4);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRipples((prev) => [...prev, { x, y, id: Date.now() }]);
      setTimeout(() => setRipples((prev) => prev.slice(1)), 1000);
    }
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      className="hero-cta max-w-2xl mx-auto mb-12"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex flex-col sm:flex-row gap-3 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-primary-100/50">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email nhận ưu đãi 20%"
          required
          inputSize="lg"
          className="flex-1 border-0 focus:ring-2 focus:ring-amber-400 transition-all"
        />
        <motion.div
          ref={buttonRef}
          style={{ x, y }}
          className="relative"
          onClick={handleClick}
        >
          {/* Ripple effects */}
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="absolute rounded-full bg-white/50"
              style={{
                left: ripple.x,
                top: ripple.y,
              }}
              initial={{ width: 0, height: 0, opacity: 1 }}
              animate={{ width: 100, height: 100, opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          ))}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="px-8 whitespace-nowrap shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group"
          >
            <span className="relative z-10">Khám Phá Ngay →</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </motion.div>
      </div>
      <p className="text-sm mt-3 font-medium" style={{ color: '#e5e7eb', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
        🎁 Giảm 20% đơn đầu • 🚚 Freeship toàn quốc • ⭐ Hỗ trợ 24/7
      </p>
    </motion.form>
  );
}

// Animated Stats Component with Count-Up
function AnimatedStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { value: 15000, suffix: '+', label: 'Gia đình' },
    { value: 50000, suffix: '+', label: 'Sản phẩm' },
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
          <div className="text-4xl font-bold text-amber-600">
            <CountUp end={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-sm text-slate-700 mt-1">{stat.label}</div>
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
      // Animate background images on scroll with rotation
      gsap.to('.feature-bg-1', {
        scrollTrigger: {
          trigger: '.feature-bg-1',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: 100,
        scale: 1.1,
        rotation: 3,
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
        rotation: -3,
      });

      // Dramatic section title reveal
      gsap.from('.features-title', {
        scrollTrigger: {
          trigger: '.features-title',
          start: 'top 85%',
          once: true,
          toggleActions: 'play none none none',
        },
        scale: 0.5,
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.7)',
      });

      // Subtitle wave reveal
      gsap.from('.features-subtitle', {
        scrollTrigger: {
          trigger: '.features-subtitle',
          start: 'top 85%',
          once: true,
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: '🏠',
      title: 'Nhà Thông Minh',
      description: 'Giải pháp IoT hiện đại giúp điều khiển ánh sáng, nhiệt độ, an ninh từ xa. Tiết kiệm điện năng và nâng cao trải nghiệm sống.',
    },
    {
      icon: '🛋️',
      title: 'Phòng Khách Hiện Đại',
      description: 'Tủ trang trí thông minh, kệ TV đa năng, đèn LED điều chỉnh màu sắc. Biến phòng khách thành không gian tiếp khách ấn tượng.',
    },
    {
      icon: '🍳',
      title: 'Bếp Tiện Nghi',
      description: 'Thiết bị nhà bếp thông minh, giá để đồ thông minh, máy lọc nước RO. Nấu nướng dễ dàng, gian bếp gọn gàng.',
    },
    {
      icon: '🛏️',
      title: 'Phòng Ngủ An Lạc',
      description: 'Đèn ngủ cảm ứng, tủ quần áo thông minh, máy khuếch tán tinh dầu. Không gian nghỉ ngơi lý tưởng cho giấc ngủ sâu.',
    },
    {
      icon: '🚿',
      title: 'Phòng Tắm Sang Trọng',
      description: 'Vòi cảm ứng, kệ treo thông minh, gương LED hiện đại. Nâng tầm trải nghiệm thư giãn mỗi ngày.',
    },
    {
      icon: '🎨',
      title: 'Phong Cách Cá Nhân',
      description: 'Kết hợp đa dạng phong cách từ tối giản, Bắc Âu, đến hiện đại Nhật Bản. Tạo dựng không gian riêng biệt.',
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
        <div className="text-center mb-16">
          <h2 className="features-title text-5xl font-bold text-gray-900 mb-4">
            Giải Pháp Toàn Diện
          </h2>
          <p className="features-subtitle text-xl text-gray-600 max-w-2xl mx-auto">
            Từ phòng khách đến phòng ngủ, từ nhà bếp đến phòng tắm - Ecomate đồng hành cùng mọi không gian sống
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Feature Card with 3D Tilt and Hover Animation
function FeatureCard({ feature, index }: { feature: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-100/0 to-primary-200/0 rounded-3xl"
        animate={{
          background: rotateX !== 0 || rotateY !== 0
            ? 'linear-gradient(135deg, rgba(134, 239, 172, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(134, 239, 172, 0) 0%, rgba(34, 197, 94, 0) 100%)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `radial-gradient(circle at ${((rotateY + 10) / 20) * 100}% ${((rotateX + 10) / 20) * 100}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
          opacity: rotateX !== 0 || rotateY !== 0 ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />

      <div className="relative z-10" style={{ transform: 'translateZ(50px)' }}>
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
      </div>
    </motion.div>
  );
}

// Impact Section with Full-Screen Background Image
function ImpactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Progressive image reveal with clip-path animation
      gsap.from('.impact-bg', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
          toggleActions: 'play none none none',
        },
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        duration: 1.5,
        ease: 'power3.out',
      });

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

      // Impressive bounce reveal for stats with scale + rotation
      gsap.from('.impact-stat', {
        scrollTrigger: {
          trigger: '.impact-stat',
          start: 'top 80%',
          once: true,
          toggleActions: 'play none none none',
        },
        scale: 0,
        y: 80,
        rotation: -15,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'elastic.out(1, 0.6)',
      });

      // Dramatic title reveal with split animation
      gsap.from('.impact-title', {
        scrollTrigger: {
          trigger: '.impact-title',
          start: 'top 85%',
          once: true,
          toggleActions: 'play none none none',
        },
        y: 100,
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'power4.out',
      });

      // Description slide in from left
      gsap.from('.impact-description', {
        scrollTrigger: {
          trigger: '.impact-description',
          start: 'top 85%',
          once: true,
          toggleActions: 'play none none none',
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden min-h-[600px] flex items-center">
      {/* Background Image with Warm Home Overlays */}
      <div className="absolute inset-0 -z-10">
        <div className="impact-bg absolute inset-0">
          <Image
            src={IMAGES.impact}
            alt="Happy Family in Modern Home"
            fill
            className="object-cover"
          />
        </div>
        {/* Warm, inviting gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/90 via-orange-600/85 to-amber-700/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-slate-900/30" />
        {/* Ambient warm glow sweep */}
        <motion.div
          className="absolute inset-0 opacity-15"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(251, 191, 36, 0.8) 50%, transparent 70%)',
          }}
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        {/* Breathing ambient light */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-amber-400/20 via-transparent to-transparent"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl text-center text-white relative z-10">
        <div>
          <h2 className="impact-title text-5xl font-bold mb-6">
            Hành Trình Cùng Khách Hàng
          </h2>
          <p className="impact-description text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            15,000+ gia đình Việt đã tin tưởng và lựa chọn Ecomate,
            biến ngôi nhà thành không gian sống lý tưởng
          </p>

          <div className="grid md:grid-cols-4 gap-8 mt-16">
            {[
              { icon: '🏠', number: '15K+', label: 'Gia đình tin dùng' },
              { icon: '📦', number: '50K+', label: 'Sản phẩm bán ra' },
              { icon: '⭐', number: '4.9/5', label: 'Đánh giá trung bình' },
              { icon: '🚚', number: '24h', label: 'Giao hàng nhanh' },
            ].map((item, index) => (
              <div
                key={index}
                className="impact-stat text-center backdrop-blur-sm bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all cursor-pointer"
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <div className="text-4xl font-bold mb-2">{item.number}</div>
                <div className="text-lg opacity-90">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
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

      // Dramatic 3D flip card reveal animation
      gsap.from('.testimonial-card', {
        scrollTrigger: {
          trigger: '.testimonial-card',
          start: 'top 85%',
          once: true,
          toggleActions: 'play none none none',
        },
        rotationY: -90,
        y: 60,
        opacity: 0,
        transformOrigin: 'left center',
        stagger: 0.2,
        duration: 1.2,
        ease: 'back.out(1.7)',
      });

      // Section title dramatic reveal
      gsap.from('.testimonials-title', {
        scrollTrigger: {
          trigger: '.testimonials-title',
          start: 'top 85%',
          once: true,
          toggleActions: 'play none none none',
        },
        scale: 0.5,
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });

      // Subtitle slide in
      gsap.from('.testimonials-subtitle', {
        scrollTrigger: {
          trigger: '.testimonials-subtitle',
          start: 'top 85%',
          once: true,
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      name: 'Chị Nguyễn Thu Hà',
      role: 'Nội trợ, Quận 7, TP.HCM',
      content: 'Mua bộ kệ bếp thông minh của Ecomate, gian bếp nhà mình gọn gàng hơn hẳn. Giá cả phải chăng, chất lượng tốt, giao hàng nhanh. Rất hài lòng!',
      avatar: '👩',
    },
    {
      name: 'Anh Trần Minh Quân',
      role: 'Kỹ sư IT, Hà Nội',
      content: 'Đèn LED thông minh điều khiển bằng app rất tiện. Setup dễ dàng, tiết kiệm điện đáng kể. Nhà mình giờ hiện đại hơn nhiều. Recommend!',
      avatar: '👨',
    },
    {
      name: 'Chị Phạm Lan Anh',
      role: 'Kinh doanh online, Đà Nẵng',
      content: 'Mua máy khuếch tán tinh dầu và đèn ngủ cho phòng ngủ. Chất lượng vượt mong đợi với mức giá này. Sẽ ủng hộ Ecomate lâu dài!',
      avatar: '👩‍💼',
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
        <div className="text-center mb-16">
          <h2 className="testimonials-title text-5xl font-bold text-gray-900 mb-4">
            Khách Hàng Nói Gì
          </h2>
          <p className="testimonials-subtitle text-xl text-gray-600">
            Phản hồi chân thực từ những gia đình đã tin tưởng Ecomate
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8" style={{ perspective: '2000px' }}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonial Card with Interactive Hover
function TestimonialCard({ testimonial, index }: { testimonial: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ y: -12, scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="testimonial-card bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group"
    >
      {/* Animated gradient background on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(134, 239, 172, 0.05) 0%, rgba(34, 197, 94, 0.05) 100%)',
        }}
      />

      {/* Quote decoration */}
      <motion.div
        className="absolute -top-4 -left-4 text-8xl text-primary-200 opacity-20 font-serif"
        animate={{ scale: isHovered ? 1.2 : 1 }}
        transition={{ duration: 0.3 }}
      >
        "
      </motion.div>

      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <motion.div
            className="text-5xl mr-4"
            animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            {testimonial.avatar}
          </motion.div>
          <div>
            <div className="font-bold text-lg text-gray-900">{testimonial.name}</div>
            <div className="text-sm text-primary-600 font-medium">{testimonial.role}</div>
          </div>
        </div>
        <p className="text-gray-700 italic leading-relaxed mb-4">
          "{testimonial.content}"
        </p>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.3, rotate: 360 }}
              className="text-yellow-400 text-xl"
            >
              ⭐
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Final CTA Section with Dramatic Background
function FinalCTASection({ onSubmit, email, setEmail }: any) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Progressive image reveal with clip-path
      gsap.from('.cta-bg', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
          toggleActions: 'play none none none',
        },
        clipPath: 'circle(0% at 50% 50%)',
        duration: 1.5,
        ease: 'power4.out',
      });

      // Zoom effect on scroll
      gsap.to('.cta-bg', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        scale: 1.15,
      });

      // Dramatic bounce reveal for CTA box
      gsap.from('.cta-box', {
        scrollTrigger: {
          trigger: '.cta-box',
          start: 'top 80%',
          once: true,
          toggleActions: 'play none none none',
        },
        scale: 0.3,
        rotation: -10,
        opacity: 0,
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)',
      });

      // CTA title with split reveal
      gsap.from('.cta-title', {
        scrollTrigger: {
          trigger: '.cta-title',
          start: 'top 85%',
          once: true,
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'back.out(1.7)',
      });

      // CTA description fade in
      gsap.from('.cta-description', {
        scrollTrigger: {
          trigger: '.cta-description',
          start: 'top 85%',
          once: true,
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Warm, Inviting Background Image */}
      <div className="absolute inset-0 -z-10">
        <div className="cta-bg absolute inset-0">
          <Image
            src={IMAGES.cta}
            alt="Modern Apartment Setup"
            fill
            className="object-cover"
          />
        </div>
        {/* Warm home gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/88 via-orange-600/85 to-amber-800/90" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-amber-500/20 to-slate-900/60" />

        {/* Soft ambient particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, transparent 70%)',
                filter: 'blur(2px)',
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 0.6, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 5 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Warm ambient glow sweep */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.15), transparent)',
          }}
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Breathing light effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-amber-300/10 via-transparent to-transparent"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
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
            <h2 className="cta-title text-5xl font-bold mb-6">
              Sẵn Sàng Nâng Cấp Ngôi Nhà?
            </h2>
            <p className="cta-description text-xl mb-10 opacity-90 max-w-2xl mx-auto">
              Khám phá 5,000+ sản phẩm tiện ích tại Shopee Store.
              Mua sắm dễ dàng, giao hàng nhanh chóng ngay hôm nay!
            </p>

            <FinalMagneticCTA onSubmit={onSubmit} email={email} setEmail={setEmail} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Final Magnetic CTA with Enhanced Interactivity
function FinalMagneticCTA({ onSubmit, email, setEmail }: any) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMagneticEffect(buttonRef, 0.5);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRipples((prev) => [...prev, { x, y, id: Date.now() }]);
      setTimeout(() => setRipples((prev) => prev.slice(1)), 1000);
    }
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      className="max-w-2xl mx-auto"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email nhận ưu đãi đặc biệt"
          required
          inputSize="lg"
          className="flex-1 border-0 bg-white text-gray-900 focus:ring-2 focus:ring-white/50"
        />
        <motion.div
          ref={buttonRef}
          style={{ x, y }}
          className="relative"
          onClick={handleClick}
        >
          {/* Ripple effects */}
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="absolute rounded-full bg-primary-300/50"
              style={{
                left: ripple.x,
                top: ripple.y,
              }}
              initial={{ width: 0, height: 0, opacity: 1 }}
              animate={{ width: 120, height: 120, opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          ))}
          <Button
            type="submit"
            size="lg"
            className="px-8 bg-white text-primary-600 hover:bg-gray-100 shadow-lg whitespace-nowrap relative overflow-hidden group"
          >
            <span className="relative z-10 font-bold">Mua Ngay Trên Shopee →</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-100 to-primary-50"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </motion.div>
      </div>
      <motion.p
        className="text-sm mt-4 font-medium"
        style={{ color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        🎁 Miễn phí vận chuyển • ⚡ Giao hàng trong 24h • 🔒 Thanh toán an toàn
      </motion.p>
    </motion.form>
  );
}
