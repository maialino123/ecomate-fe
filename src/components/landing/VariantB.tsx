'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
 * 🏡 VARIANT B - WARM FAMILY VIBES
 *
 * Design Philosophy:
 * - Ấm áp, gần gũi, đáng tin cậy
 * - Target: Gia đình truyền thống, sinh viên 18-45 tuổi
 * - Colors: Warm Orange, Terracotta, Cream, Sage Green
 * - Typography: Poppins (friendly, rounded)
 *
 * Special Features:
 * ✨ Hand-drawn SVG Illustrations
 * ✨ Morphing Shape Animations
 * ✨ Story-telling Scroll Animations
 * ✨ Interactive Product Cards with Tilt
 * ✨ Heartbeat Micro-interactions
 * ✨ Cozy, welcoming atmosphere
 */
export default function VariantB({ variant }: VariantProps) {
  const [email, setEmail] = useState('');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const isStoryInView = useInView(storyRef, { once: true });

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Bouncy entrance animation
      gsap.from('.hero-content', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        delay: 0.2,
      });

      // Floating animation for illustrations
      gsap.to('.floating-element', {
        y: -20,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 0.5,
          from: 'random',
        },
      });

      // Heartbeat animation
      gsap.to('.heartbeat', {
        scale: 1.1,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Price tags pop in
      gsap.from('.price-tag', {
        scrollTrigger: {
          trigger: '.products-section',
          start: 'top 80%',
        },
        scale: 0,
        rotation: -180,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(2)',
      });

      // Story sections reveal
      gsap.from('.story-item', {
        scrollTrigger: {
          trigger: '.story-section',
          start: 'top 70%',
        },
        x: (i) => (i % 2 === 0 ? -100 : 100),
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Variant B - Email submitted:', email, 'Variant:', variant);

    // Celebration animation
    gsap.to('.cta-form', {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    });

    alert('🎉 Chào mừng bạn đến với gia đình EcoMate!');
  };

  // Product data with affordable pricing
  const products = [
    {
      name: 'Bộ 6 Ly Thủy Tinh',
      price: '149.000đ',
      originalPrice: '199.000đ',
      image: 'https://images.unsplash.com/photo-1584642979561-c7392dcef929?w=800&q=80',
      badge: '🔥 Bán Chạy',
      discount: '-25%',
    },
    {
      name: 'Thớt Gỗ Tự Nhiên',
      price: '89.000đ',
      originalPrice: '129.000đ',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
      badge: '💚 Sinh Viên Yêu Thích',
      discount: '-31%',
    },
    {
      name: 'Bộ Dao Kéo Nhà Bếp',
      price: '199.000đ',
      originalPrice: '299.000đ',
      image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80',
      badge: '⭐ Top Deal',
      discount: '-33%',
    },
    {
      name: 'Hộp Đựng Cơm 3 Ngăn',
      price: '69.000đ',
      originalPrice: '99.000đ',
      image: 'https://images.unsplash.com/photo-1610433367090-fd5ade1a4c0d?w=800&q=80',
      badge: '🎒 Dành Cho Sinh Viên',
      discount: '-30%',
    },
  ];

  const features = [
    {
      icon: '💰',
      title: 'Giá Cả Phải Chăng',
      desc: 'Chất lượng tốt nhưng giá rất sinh viên. Từ 49K!',
      color: 'from-orange-400 to-red-400',
    },
    {
      icon: '🚚',
      title: 'Giao Hàng Nhanh',
      desc: 'Nhận hàng trong 2-3 ngày. COD toàn quốc.',
      color: 'from-teal-400 to-green-400',
    },
    {
      icon: '❤️',
      title: 'Tin Cậy & An Toàn',
      desc: '50,000+ gia đình đã tin dùng. Đổi trả dễ dàng.',
      color: 'from-pink-400 to-rose-400',
    },
    {
      icon: '🌿',
      title: 'Thân Thiện Môi Trường',
      desc: 'Sản phẩm tự nhiên, không độc hại cho gia đình.',
      color: 'from-green-400 to-emerald-400',
    },
  ];

  const story = [
    {
      emoji: '👨‍👩‍👧‍👦',
      title: 'Cho Gia Đình Bạn',
      desc: 'Sản phẩm an toàn, chất lượng để chăm sóc những người thân yêu',
    },
    {
      emoji: '🎓',
      title: 'Sinh Viên Tiết Kiệm',
      desc: 'Giá phải chăng, phù hợp với túi tiền sinh viên và người mới đi làm',
    },
    {
      emoji: '🏠',
      title: 'Tổ Ấm Ấm Áp',
      desc: 'Biến căn phòng trọ, nhà nhỏ thành không gian sống đáng yêu',
    },
  ];

  return (
    <>
      <Header />

      {/* Custom Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

        .variant-b-wrapper {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(180deg, #FFF8E7 0%, #FFE4CC 50%, #FFF8E7 100%);
        }

        .warm-orange {
          color: #FF6B35;
        }

        .warm-gradient {
          background: linear-gradient(135deg, #FF6B35 0%, #E8956F 100%);
        }

        .terracotta {
          background: #E8956F;
        }

        .sage-green {
          color: #7EA16B;
        }

        .cozy-shadow {
          box-shadow: 0 20px 40px rgba(255, 107, 53, 0.15), 0 0 0 1px rgba(255, 107, 53, 0.05);
        }

        .product-card-b {
          background: white;
          border-radius: 24px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .product-card-b:hover {
          transform: translateY(-12px) rotate(1deg);
        }

        .product-card-b::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #FF6B35, #E8956F, #7EA16B);
        }

        .badge-bounce {
          animation: badge-bounce 2s ease-in-out infinite;
        }

        @keyframes badge-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .wave-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 0, 50 10 T 100 10' stroke='%23FF6B35' stroke-width='2' fill='none' opacity='0.1'/%3E%3C/svg%3E");
          background-repeat: repeat-x;
        }

        .doodle-border {
          border: 3px solid #FF6B35;
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          animation: morph 8s ease-in-out infinite;
        }

        @keyframes morph {
          0%, 100% {
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          }
          50% {
            border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%;
          }
        }
      `}</style>

      <div className="variant-b-wrapper min-h-screen relative overflow-hidden">

        {/* Decorative Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Floating circles */}
          <div className="floating-element absolute top-20 left-10 w-32 h-32 rounded-full bg-orange-200/30 blur-2xl" />
          <div className="floating-element absolute top-40 right-20 w-40 h-40 rounded-full bg-green-200/30 blur-2xl" />
          <div className="floating-element absolute bottom-20 left-1/4 w-36 h-36 rounded-full bg-rose-200/30 blur-2xl" />
        </div>

        {/* Hero Section */}
        <section ref={heroRef} className="relative px-4 pt-32 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left: Text Content */}
              <motion.div
                className="hero-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block mb-6"
                >
                  <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full warm-gradient text-white text-sm font-semibold shadow-lg">
                    <span className="heartbeat">❤️</span>
                    50,000+ Gia Đình Tin Dùng
                  </span>
                </motion.div>

                {/* Headline */}
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                  Đồ Gia Dụng
                  <br />
                  <span className="warm-orange">Ấm Áp & Tiện Nghi</span>
                  <br />
                  Cho Mọi Nhà
                </h1>

                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  Từ căn phòng trọ sinh viên đến tổ ấm gia đình -
                  chúng tôi mang đến sản phẩm chất lượng với <strong className="warm-orange">giá cả phải chăng</strong>.
                </p>

                {/* CTA Form */}
                <motion.form
                  onSubmit={handleSubmit}
                  className="cta-form mb-8"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-3xl p-3 cozy-shadow">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Nhập email để nhận ưu đãi 🎁"
                      required
                      inputSize="lg"
                      className="flex-1 border-0 text-lg"
                    />
                    <Button
                      type="submit"
                      className="warm-gradient text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all"
                    >
                      Nhận Ngay Giảm 30%
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                    <span>✅</span> Miễn phí ship cho đơn từ 200K
                    <span className="mx-2">•</span>
                    <span>✅</span> Đổi trả trong 7 ngày
                  </p>
                </motion.form>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    <span><strong>4.8/5</strong> từ 12,000 đánh giá</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📦</span>
                    <span><strong>200,000+</strong> đơn hàng</span>
                  </div>
                </div>
              </motion.div>

              {/* Right: Illustration / Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="relative"
              >
                <div className="doodle-border relative aspect-square max-w-lg mx-auto p-8">
                  <img
                    src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80"
                    alt="Warm Family Kitchen"
                    className="w-full h-full object-cover rounded-[30px]"
                  />

                  {/* Floating badges */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl cozy-shadow"
                  >
                    <div className="text-3xl">🎁</div>
                    <div className="text-xs font-bold warm-orange">Giảm 30%</div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                    className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl cozy-shadow"
                  >
                    <div className="text-3xl">🚚</div>
                    <div className="text-xs font-bold text-green-600">Ship Nhanh</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="products-section py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">
                Sản Phẩm <span className="warm-orange">Bán Chạy</span>
              </h2>
              <p className="text-xl text-gray-600">
                Giá tốt nhất cho sinh viên & gia đình ⚡
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, i) => (
                <motion.div
                  key={i}
                  className="product-card-b cozy-shadow"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="warm-gradient text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg badge-bounce">
                      {product.discount}
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden rounded-t-3xl">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredCard === i ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="text-sm font-semibold mb-2 text-gray-500">
                      {product.badge}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{product.name}</h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="price-tag text-3xl font-bold warm-orange">
                        {product.price}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {product.originalPrice}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      className="w-full warm-gradient text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all"
                    >
                      Thêm Vào Giỏ 🛒
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section ref={storyRef} className="story-section py-20 px-4 bg-white/50 wave-pattern">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">
                EcoMate - <span className="warm-orange">Người Bạn Của Mọi Nhà</span>
              </h2>
            </div>

            <div className="space-y-12">
              {story.map((item, i) => (
                <motion.div
                  key={i}
                  className="story-item flex items-center gap-8 bg-white rounded-3xl p-8 cozy-shadow"
                  style={{
                    opacity: isStoryInView ? 1 : 0,
                    transform: isStoryInView ? 'translateX(0)' : `translateX(${i % 2 === 0 ? -100 : 100}px)`,
                  }}
                >
                  <div className="text-7xl flex-shrink-0">{item.emoji}</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-lg text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-3xl p-8 text-center cozy-shadow hover:scale-105 transition-transform"
                >
                  <div className="text-6xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-50 to-rose-50 rounded-3xl p-12 cozy-shadow"
            >
              <h2 className="text-4xl font-bold mb-6">
                Bắt Đầu Trang Trí <span className="warm-orange">Tổ Ấm</span> Của Bạn! 🏡
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Giảm 30% cho đơn hàng đầu tiên + Freeship toàn quốc
              </p>
              <Button className="warm-gradient text-white px-12 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all">
                Mua Sắm Ngay
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Variant Indicator */}
        <div className="text-center py-4 text-xs text-gray-400">
          Variant: {variant} - Warm Family Vibes
        </div>
      </div>

      <Footer />
    </>
  );
}
