'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';

// Footer navigation structure for SEO
const FOOTER_SECTIONS = [
  {
    title: 'Sản Phẩm',
    links: [
      { name: 'Nhà Thông Minh', url: '/products/smart-home' },
      { name: 'Phòng Khách', url: '/products/living-room' },
      { name: 'Nhà Bếp', url: '/products/kitchen' },
      { name: 'Phòng Ngủ', url: '/products/bedroom' },
      { name: 'Phòng Tắm', url: '/products/bathroom' },
    ],
  },
  {
    title: 'Hỗ Trợ',
    links: [
      { name: 'Liên Hệ', url: '/contact' },
      { name: 'Hướng Dẫn Mua Hàng', url: '/guide' },
      { name: 'Chính Sách Đổi Trả', url: '/return-policy' },
      { name: 'Bảo Hành', url: '/warranty' },
      { name: 'FAQ', url: '/faq' },
    ],
  },
  {
    title: 'Về Ecomate',
    links: [
      { name: 'Giới Thiệu', url: '/about' },
      { name: 'Tầm Nhìn', url: '/vision' },
      { name: 'Đối Tác', url: '/partners' },
      { name: 'Tuyển Dụng', url: '/careers' },
      { name: 'Blog', url: '/blog' },
    ],
  },
  {
    title: 'Pháp Lý',
    links: [
      { name: 'Điều Khoản Sử Dụng', url: '/terms' },
      { name: 'Chính Sách Bảo Mật', url: '/privacy' },
      { name: 'Chính Sách Cookie', url: '/cookies' },
      { name: 'Quy Định Giao Dịch', url: '/trading-rules' },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    icon: '📘',
    url: 'https://facebook.com/ecomate',
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Shopee',
    icon: '🛒',
    url: 'https://shopee.vn/ecomate',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'TikTok',
    icon: '🎵',
    url: 'https://tiktok.com/@ecomate',
    color: 'from-pink-500 to-purple-600',
  },
  {
    name: 'Zalo',
    icon: '💬',
    url: 'https://zalo.me/ecomate',
    color: 'from-blue-400 to-blue-500',
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-100px' });

  // GSAP animations on mount
  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      // Wave animation
      gsap.to('.footer-wave', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Floating particles
      gsap.to('.footer-particle', {
        y: -30,
        x: (i) => (Math.random() - 0.5) * 40,
        opacity: 0.8,
        stagger: {
          each: 0.2,
          repeat: -1,
          yoyo: true,
        },
        duration: 4,
        ease: 'sine.inOut',
      });

      // Footer sections reveal
      gsap.from('.footer-section', {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Social icons bounce in
      gsap.from('.footer-social', {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        scale: 0,
        rotation: -180,
        stagger: 0.1,
        duration: 1,
        ease: 'elastic.out(1, 0.6)',
        delay: 0.5,
      });
    }, footerRef);

    return () => ctx.revert();
  }, [isInView]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    alert('Cảm ơn bạn đã đăng ký nhận tin! 🎉');
    setEmail('');
  };

  return (
    <footer ref={footerRef} className="relative bg-gradient-to-b from-gray-900 via-slate-900 to-black text-white overflow-hidden">
      {/* Animated wave background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          className="footer-wave absolute bottom-0 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="0.3"
            d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,154.7C672,149,768,171,864,165.3C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <svg
          className="footer-wave absolute bottom-0 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ transform: 'translateY(20px)' }}
        >
          <path
            fill="currentColor"
            fillOpacity="0.2"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Floating particles - "Rồng bay phượng múa" effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="footer-particle absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                i % 3 === 0
                  ? 'rgba(251, 191, 36, 0.6)'
                  : i % 3 === 1
                  ? 'rgba(245, 158, 11, 0.6)'
                  : 'rgba(249, 115, 22, 0.6)'
              }, transparent)`,
              filter: 'blur(2px)',
            }}
            animate={{
              y: [0, -50, 0],
              x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main footer content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-16 pb-8">
        {/* Top section - Newsletter & Social */}
        <div className="footer-section mb-12 md:mb-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Newsletter heading with gradient */}
            <motion.h3
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              Đăng Ký Nhận Tin & Ưu Đãi Đặc Biệt
            </motion.h3>

            <p className="text-gray-400 text-base md:text-lg">
              Nhận thông tin mới nhất về sản phẩm và khuyến mãi độc quyền
            </p>

            {/* Newsletter form */}
            <motion.form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  required
                  className="w-full px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                />
                {/* Animated border on focus */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 focus-within:opacity-20 blur-xl transition-opacity pointer-events-none" />
              </div>

              <motion.button
                type="submit"
                className="relative px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full font-semibold text-gray-900 shadow-lg overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Đăng Ký</span>
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.button>
            </motion.form>

            {/* Social icons */}
            <div className="flex items-center justify-center gap-4 pt-6">
              {SOCIAL_LINKS.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social group relative"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center text-2xl md:text-3xl shadow-xl transition-all duration-300`}>
                    {social.icon}
                  </div>

                  {/* Pulsing ring effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-50 blur-lg -z-10`}
                    animate={{
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-gray-900 text-xs font-medium px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {social.name}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12 md:mb-16">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/50 to-amber-400/0 blur-sm"
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Footer columns - SEO content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {FOOTER_SECTIONS.map((section, sectionIndex) => (
            <div key={section.title} className="footer-section space-y-4">
              <h4 className="text-lg md:text-xl font-bold text-amber-400">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ x: -10, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : {}}
                    transition={{
                      delay: sectionIndex * 0.1 + linkIndex * 0.05,
                    }}
                  >
                    <Link
                      href={link.url}
                      className="text-sm md:text-base text-gray-400 hover:text-amber-400 transition-colors inline-flex items-center group"
                    >
                      <motion.span
                        className="inline-block mr-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -5 }}
                        whileHover={{ x: 0 }}
                      >
                        →
                      </motion.span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <motion.div
          className="footer-section bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-12 border border-white/10"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h5 className="font-semibold text-amber-400 mb-2">📍 Địa Chỉ</h5>
              <p className="text-sm text-gray-400">
                123 Đường ABC, Quận 1<br />
                TP. Hồ Chí Minh, Việt Nam
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-amber-400 mb-2">📞 Liên Hệ</h5>
              <p className="text-sm text-gray-400">
                Hotline: 1900-xxxx<br />
                Email: hello@ecomate.vn
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-amber-400 mb-2">⏰ Giờ Làm Việc</h5>
              <p className="text-sm text-gray-400">
                T2 - T6: 8:00 - 18:00<br />
                T7 - CN: 9:00 - 17:00
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom section - Copyright */}
        <div className="relative">
          {/* Animated top border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© 2024 Ecomate. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Made with <span className="text-red-500 animate-pulse">❤️</span> in Vietnam
            </p>
          </div>
        </div>
      </div>

      {/* Floating "Back to top" button */}
      <motion.button
        className="fixed bottom-8 right-8 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-2xl flex items-center justify-center text-2xl z-50 group"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        ⬆️
        <motion.div
          className="absolute inset-0 rounded-full bg-amber-400 opacity-0 group-hover:opacity-50 blur-xl"
          animate={{
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.button>
    </footer>
  );
}
