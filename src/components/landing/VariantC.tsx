'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import type { Variant } from '@/lib/ab-testing';
import { Button, Input } from '@/components/ui';
import { Header, Footer } from '@/components/common';

interface VariantProps {
  variant: Variant;
}

/**
 * ⚡ VARIANT C - BOLD & VIBRANT ENERGY
 *
 * Design Philosophy:
 * - Năng động, sáng tạo, đột phá
 * - Target: Gen Z, millennials 18-28 tuổi, tech-savvy
 * - Colors: Gradient Teal → Purple → Pink, Neon accents
 * - Typography: Space Grotesk (bold, tech-forward)
 *
 * REALTIME RENDERING Features:
 * ✨ Interactive Canvas Particle System (200+ particles)
 * ✨ Liquid Blob Morphing Background
 * ✨ Text Scramble Cyberpunk Effects
 * ✨ Glassmorphism UI Elements
 * ✨ Neon Glow Animations
 * ✨ Magnetic Cursor Product Cards
 * ✨ Animated Mesh Gradients
 */

// Text Scramble Hook
const useTextScramble = (finalText: string, duration = 2000) => {
  const [scrambledText, setScrambledText] = useState(finalText);
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

  useEffect(() => {
    let frame = 0;
    const totalFrames = duration / 50;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      if (progress >= 1) {
        setScrambledText(finalText);
        clearInterval(interval);
        return;
      }

      const text = finalText
        .split('')
        .map((char, i) => {
          if (i < finalText.length * progress) {
            return finalText[i];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setScrambledText(text);
    }, 50);

    return () => clearInterval(interval);
  }, [finalText, duration]);

  return scrambledText;
};

// Canvas Particle System Component
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      life: number;

      constructor() {
        const width = canvas?.width || window.innerWidth;
        const height = canvas?.height || window.innerHeight;

        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;

        const colors = [
          'rgba(0, 212, 255, ',
          'rgba(123, 47, 247, ',
          'rgba(247, 37, 133, ',
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.life = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.002;

        const width = canvas?.width || window.innerWidth;
        const height = canvas?.height || window.innerHeight;

        // Bounce off edges
        if (this.x > width || this.x < 0) this.speedX *= -1;
        if (this.y > height || this.y < 0) this.speedY *= -1;

        // Respawn if dead
        if (this.life <= 0) {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.life = 1;
        }
      }

      draw() {
        if (!ctx) return;

        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color + this.life + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color + '1)';
        ctx.fill();
        ctx.restore();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < 150; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Connect nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(123, 47, 247, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

// Liquid Blob Component
const LiquidBlob = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div
      className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
      style={{
        background: 'linear-gradient(135deg, #00D4FF 0%, #7B2FF7 50%, #F72585 100%)',
      }}
      animate={{
        x: [0, 100, -100, 0],
        y: [0, -100, 100, 0],
        scale: [1, 1.2, 0.8, 1],
        rotate: [0, 90, 180, 270, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
};

export default function VariantC({ variant }: VariantProps) {
  const [email, setEmail] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const scrambledTitle = useTextScramble('KHÔNG GIAN SỐNG TƯƠNG LAI', 1500);

  // Mouse tracking
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Neon pulse animation
      gsap.to('.neon-text', {
        textShadow: '0 0 20px #00D4FF, 0 0 40px #00D4FF, 0 0 60px #00D4FF',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });

      // Glitch effect
      gsap.to('.glitch', {
        x: 'random(-5, 5)',
        y: 'random(-2, 2)',
        duration: 0.1,
        repeat: -1,
        repeatDelay: 2,
      });

      // Product cards magnetic effect
      const cards = document.querySelectorAll('.magnetic-card');
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Variant C - Email submitted:', email, 'Variant:', variant);

    // Cyberpunk success effect
    gsap.to('.cta-section', {
      filter: 'hue-rotate(360deg)',
      duration: 0.5,
      yoyo: true,
      repeat: 1,
    });

    alert('⚡ THÀNH CÔNG! Chào mừng đến với tương lai!');
  };

  const products = [
    {
      name: 'SMART POT PRO',
      price: '599K',
      tag: 'AI-POWERED',
      image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80',
      glow: '#00D4FF',
    },
    {
      name: 'CYBER KNIFE SET',
      price: '899K',
      tag: 'PREMIUM TECH',
      image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80',
      glow: '#7B2FF7',
    },
    {
      name: 'QUANTUM GLASS',
      price: '399K',
      tag: 'NANO-TECH',
      image: 'https://images.unsplash.com/photo-1584642979561-c7392dcef929?w=800&q=80',
      glow: '#F72585',
    },
  ];

  const features = [
    { icon: '🚀', title: 'TƯƠNG LAI HÓA', desc: 'Smart home tech trong tầm tay' },
    { icon: '⚡', title: 'SIÊU TỐC ĐỘ', desc: 'Giao hàng express 24h' },
    { icon: '🔮', title: 'CÔNG NGHỆ CAO', desc: 'AI & IoT tích hợp' },
    { icon: '💎', title: 'CHẤT LƯỢNG ĐỈnh', desc: 'Premium materials only' },
  ];

  return (
    <>
      <Header />

      {/* Custom Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        .variant-c-wrapper {
          font-family: 'Space Grotesk', sans-serif;
          background: #0A0A14;
          color: #FFFFFF;
          overflow-x: hidden;
        }

        .cyber-gradient {
          background: linear-gradient(135deg, #00D4FF 0%, #7B2FF7 50%, #F72585 100%);
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 212, 255, 0.2);
        }

        .neon-border {
          border: 2px solid #00D4FF;
          box-shadow:
            0 0 10px #00D4FF,
            0 0 20px #00D4FF,
            inset 0 0 10px rgba(0, 212, 255, 0.2);
        }

        .neon-text {
          text-shadow: 0 0 10px #00D4FF, 0 0 20px #00D4FF, 0 0 30px #00D4FF;
        }

        .holographic {
          background: linear-gradient(
            45deg,
            #00D4FF 0%,
            #7B2FF7 25%,
            #F72585 50%,
            #7B2FF7 75%,
            #00D4FF 100%
          );
          background-size: 300% 300%;
          animation: holographic-shift 8s ease infinite;
        }

        @keyframes holographic-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .scan-line {
          position: relative;
          overflow: hidden;
        }

        .scan-line::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00D4FF, transparent);
          animation: scan 3s linear infinite;
        }

        @keyframes scan {
          to { left: 100%; }
        }

        .magnetic-card {
          transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .glitch {
          position: relative;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }

        .glitch::before {
          color: #00D4FF;
          z-index: -1;
          animation: glitch-1 2s infinite;
        }

        .glitch::after {
          color: #F72585;
          z-index: -2;
          animation: glitch-2 2s infinite;
        }

        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(2px, 2px); }
        }

        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(-2px, 2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(-2px, -2px); }
        }

        .cyber-button {
          position: relative;
          overflow: hidden;
        }

        .cyber-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: width 0.6s, height 0.6s;
        }

        .cyber-button:hover::before {
          width: 300px;
          height: 300px;
        }
      `}</style>

      <div className="variant-c-wrapper min-h-screen relative">
        {/* Canvas Particle System */}
        <ParticleCanvas />

        {/* Liquid Blob Backgrounds */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <LiquidBlob delay={0} />
          <LiquidBlob delay={7} />
          <LiquidBlob delay={14} />
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            {/* Cyber Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-8"
            >
              <span className="neon-border px-6 py-2 rounded-full text-sm font-bold tracking-wider cyber-gradient bg-clip-text text-transparent">
                ⚡ NEXT-GEN HOME 2025 ⚡
              </span>
            </motion.div>

            {/* Main Title with Text Scramble */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glitch neon-text text-6xl md:text-9xl font-bold mb-8 leading-tight uppercase"
              data-text={scrambledTitle}
            >
              {scrambledTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl md:text-3xl text-cyan-300 mb-12 font-light"
            >
              Đồ gia dụng với công nghệ AI & IoT<br />
              <span className="holographic bg-clip-text text-transparent font-bold">
                Biến nhà thành SMART HOME trong 1 nốt nhạc
              </span>
            </motion.p>

            {/* CTA Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="cta-section max-w-2xl mx-auto mb-16"
            >
              <div className="glass-card rounded-3xl p-4 scan-line">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="YOUR@EMAIL.COM"
                    required
                    inputSize="lg"
                    className="flex-1 bg-white/10 border-cyan-500/50 text-white placeholder-cyan-300/50 text-lg font-mono uppercase"
                  />
                  <Button
                    type="submit"
                    className="cyber-button cyber-gradient text-white px-12 py-4 rounded-2xl font-bold text-lg uppercase tracking-wider relative z-10"
                  >
                    KHỞI ĐỘNG ⚡
                  </Button>
                </div>
                <p className="text-cyan-400 text-sm mt-4 font-mono">
                  → 50% OFF · FREE SHIPPING · 24H EXPRESS DELIVERY
                </p>
              </div>
            </motion.form>

            {/* Cyber Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { num: '100K+', label: 'SMART USERS' },
                { num: '24/7', label: 'AI SUPPORT' },
                { num: '99.9%', label: 'UPTIME' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="text-5xl font-bold cyber-gradient bg-clip-text text-transparent mb-2">
                    {stat.num}
                  </div>
                  <div className="text-sm text-cyan-400 font-mono">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-6xl font-bold mb-4 uppercase">
                <span className="holographic bg-clip-text text-transparent">
                  PREMIUM COLLECTION
                </span>
              </h2>
              <p className="text-xl text-cyan-300 font-mono">// TECH-POWERED ESSENTIALS</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {products.map((product, i) => (
                <motion.div
                  key={i}
                  className="magnetic-card glass-card rounded-3xl overflow-hidden group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  style={{
                    boxShadow: `0 8px 32px 0 ${product.glow}40`,
                  }}
                >
                  {/* Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md"
                      style={{
                        background: `${product.glow}30`,
                        border: `1px solid ${product.glow}`,
                        color: product.glow,
                      }}
                    >
                      {product.tag}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative h-80 overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity mix-blend-screen"
                      style={{ background: product.glow }}
                    />
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 uppercase">{product.name}</h3>
                    <div
                      className="text-4xl font-bold mb-4"
                      style={{ color: product.glow }}
                    >
                      {product.price}
                    </div>
                    <Button
                      className="w-full py-3 rounded-2xl font-bold uppercase tracking-wider cyber-button"
                      style={{
                        background: `linear-gradient(135deg, ${product.glow}80, ${product.glow})`,
                      }}
                    >
                      ADD TO CART →
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-3xl p-8 text-center scan-line"
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2 uppercase">{feature.title}</h3>
                <p className="text-cyan-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-12 neon-border"
            >
              <h2 className="text-5xl font-bold mb-6 uppercase">
                <span className="holographic bg-clip-text text-transparent">
                  READY TO UPGRADE?
                </span>
              </h2>
              <p className="text-2xl text-cyan-300 mb-8">
                Giảm 50% cho 100 khách hàng đầu tiên
              </p>
              <Button className="cyber-button cyber-gradient text-white px-16 py-5 rounded-2xl font-bold text-xl uppercase tracking-wider">
                MUA NGAY →
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Variant Indicator */}
        <div className="text-center py-4 text-xs text-cyan-600 font-mono">
          // VARIANT: {variant} - BOLD & VIBRANT ENERGY
        </div>
      </div>

      <Footer />
    </>
  );
}
