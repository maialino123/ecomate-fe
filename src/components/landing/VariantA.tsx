'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type { Variant } from '@/lib/ab-testing';
import { Button, Input } from '@/components/ui';
import { Header, Footer } from '@/components/common';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface VariantProps {
  variant: Variant;
}

/**
 * 🏛️ VARIANT A - MODERN MINIMALIST LUXURY
 *
 * Design Philosophy:
 * - Sang trọng, tối giản, tinh tế
 * - Target: Gia đình trẻ 25-35 tuổi, thu nhập cao
 * - Colors: White, Cream, Gold, Black
 * - Typography: Playfair Display + Inter
 *
 * Special Features:
 * ✨ 3D Product Rotation
 * ✨ Parallax Multi-layer Scrolling
 * ✨ Floating Gold Particles
 * ✨ Smooth Reveal Animations
 * ✨ Premium Interactive Elements
 */
export default function VariantA({ variant }: VariantProps) {
  const [email, setEmail] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y1 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, -400]);
  const opacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero reveal animation
      gsap.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3,
      });

      gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6,
      });

      gsap.from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.9,
      });

      // Floating particles animation
      gsap.to('.particle', {
        y: 'random(-50, 50)',
        x: 'random(-30, 30)',
        rotation: 'random(-15, 15)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 2,
          from: 'random',
        },
      });

      // Product cards scroll reveal
      gsap.from('.product-card', {
        scrollTrigger: {
          trigger: '.products-section',
          start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Stats counter animation
      gsap.from('.stat-number', {
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 80%',
        },
        textContent: 0,
        duration: 2,
        ease: 'power1.out',
        snap: { textContent: 1 },
        stagger: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Variant A - Email submitted:', email, 'Variant:', variant);

    // Success animation
    gsap.to('.hero-cta', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    alert('✨ Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.');
  };

  // Premium product showcase data
  const products = [
    {
      name: 'Bộ Chén Gốm Cao Cấp',
      price: '1.290.000đ',
      image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80',
      tag: 'Best Seller',
    },
    {
      name: 'Bộ Dao Nhà Bếp Professional',
      price: '2.490.000đ',
      image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80',
      tag: 'Premium',
    },
    {
      name: 'Bộ Nồi Inox 5 Đáy',
      price: '3.890.000đ',
      image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80',
      tag: 'Luxury',
    },
  ];

  const features = [
    {
      icon: '✨',
      title: 'Chất Lượng Premium',
      desc: 'Sản phẩm cao cấp từ các thương hiệu quốc tế',
    },
    {
      icon: '🎁',
      title: 'Miễn Phí Vận Chuyển',
      desc: 'Giao hàng miễn phí toàn quốc cho đơn từ 500K',
    },
    {
      icon: '🔒',
      title: 'Bảo Hành 5 Năm',
      desc: 'Cam kết bảo hành dài hạn, đổi mới trong 30 ngày',
    },
    {
      icon: '💎',
      title: 'Thiết Kế Tinh Tế',
      desc: 'Phong cách tối giản, sang trọng cho ngôi nhà hiện đại',
    },
  ];

  return (
    <>
      <Header />

      {/* Custom Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

        .variant-a-wrapper {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(180deg, #FFFFFF 0%, #F5F1E8 50%, #FFFFFF 100%);
        }

        .playfair {
          font-family: 'Playfair Display', serif;
        }

        .gold-text {
          background: linear-gradient(135deg, #C9A063 0%, #E8C88A 50%, #C9A063 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gold-gradient {
          background: linear-gradient(135deg, #C9A063 0%, #E8C88A 100%);
        }

        .luxury-shadow {
          box-shadow: 0 25px 50px -12px rgba(201, 160, 99, 0.15);
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(201, 160, 99, 0.1);
        }

        .product-card {
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .product-card:hover {
          transform: translateY(-12px) scale(1.02);
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: radial-gradient(circle, #C9A063 0%, transparent 70%);
          pointer-events: none;
          opacity: 0.6;
        }
      `}</style>

      <div className="variant-a-wrapper min-h-screen relative overflow-hidden">

        {/* Floating Gold Particles */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
          <motion.div
            style={{ x: mousePosition.x, y: mousePosition.y }}
            className="absolute inset-0 opacity-5 pointer-events-none"
          >
            <div className="w-full h-full bg-gradient-to-br from-[#C9A063] to-transparent" />
          </motion.div>

          <motion.div style={{ y: y1, opacity }} className="max-w-6xl mx-auto text-center relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block mb-8"
            >
              <span className="px-6 py-2 rounded-full glass-effect text-sm font-medium text-gray-700 tracking-wide">
                ✨ PREMIUM HOME COLLECTION 2025
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="hero-title playfair text-6xl md:text-8xl font-bold mb-8 leading-tight">
              Không Gian Sống
              <br />
              <span className="gold-text">Tinh Tế & Sang Trọng</span>
            </h1>

            <p className="hero-subtitle text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Khám phá bộ sưu tập đồ gia dụng cao cấp, thiết kế tối giản,
              mang đến trải nghiệm sống đẳng cấp cho ngôi nhà của bạn.
            </p>

            {/* CTA Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="hero-cta max-w-xl mx-auto mb-16"
            >
              <div className="flex flex-col sm:flex-row gap-4 glass-effect rounded-2xl p-3 luxury-shadow">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  required
                  inputSize="lg"
                  className="flex-1 border-0 bg-transparent text-lg"
                />
                <Button
                  type="submit"
                  className="gold-gradient text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
                >
                  Nhận Ưu Đãi Đặc Biệt
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                🎁 Giảm 20% cho đơn hàng đầu tiên. Miễn phí vận chuyển toàn quốc.
              </p>
            </motion.form>

            {/* Stats */}
            <div className="stats-section grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { number: '50000', suffix: '+', label: 'Khách Hàng Hài Lòng' },
                { number: '15000', suffix: '+', label: 'Sản Phẩm Premium' },
                { number: '99', suffix: '%', label: 'Đánh Giá 5 Sao' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="playfair text-4xl md:text-5xl font-bold gold-text mb-2">
                    <span className="stat-number">{stat.number}</span>{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Products Showcase Section */}
        <section ref={productsRef} className="products-section py-24 px-4 relative z-10">
          <motion.div style={{ y: y2 }} className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="playfair text-5xl md:text-6xl font-bold mb-6">
                Bộ Sưu Tập <span className="gold-text">Nổi Bật</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Những sản phẩm được tuyển chọn kỹ lưỡng, kết hợp giữa thẩm mỹ và công năng
              </p>
            </div>

            {/* Product Grid with 3D Effect */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {products.map((product, i) => (
                <motion.div
                  key={i}
                  className="product-card group relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Tag */}
                  <div className="absolute top-6 left-6 z-10">
                    <span className="gold-gradient text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                      {product.tag}
                    </span>
                  </div>

                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-3xl luxury-shadow mb-6 aspect-square">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Hover CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute bottom-6 left-6 right-6"
                    >
                      <button className="w-full bg-white text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                        Xem Chi Tiết
                      </button>
                    </motion.div>
                  </div>

                  {/* Product Info */}
                  <div className="px-2">
                    <h3 className="playfair text-2xl font-bold mb-2">{product.name}</h3>
                    <p className="text-2xl gold-text font-bold">{product.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-white to-[#F5F1E8]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="playfair text-5xl md:text-6xl font-bold mb-6">
                Tại Sao Chọn <span className="gold-text">EcoMate</span>?
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-effect rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-6xl mb-6">{feature.icon}</div>
                  <h3 className="playfair text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 gold-gradient opacity-5" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-effect rounded-3xl p-12 md:p-16 luxury-shadow"
            >
              <h2 className="playfair text-4xl md:text-5xl font-bold mb-6">
                Bắt Đầu Hành Trình <span className="gold-text">Sang Trọng</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Đăng ký ngay để nhận ưu đãi 20% cho đơn hàng đầu tiên
              </p>
              <Button className="gold-gradient text-white px-12 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
                Khám Phá Ngay
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Variant Indicator */}
        <div className="text-center py-4 text-xs text-gray-400">
          Variant: {variant} - Modern Minimalist Luxury
        </div>
      </div>

      <Footer />
    </>
  );
}
