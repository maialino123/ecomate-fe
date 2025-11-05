'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

// Social links configuration
const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    icon: '📘',
    url: 'https://facebook.com/ecomate',
    color: 'from-blue-500 to-blue-600',
    hoverColor: 'group-hover:from-blue-400 group-hover:to-blue-500',
  },
  {
    name: 'Shopee',
    icon: '🛒',
    url: 'https://shopee.vn/ecomate',
    color: 'from-orange-500 to-red-500',
    hoverColor: 'group-hover:from-orange-400 group-hover:to-red-400',
  },
  {
    name: 'TikTok Shop',
    icon: '🎵',
    url: 'https://tiktok.com/@ecomate',
    color: 'from-pink-500 to-purple-600',
    hoverColor: 'group-hover:from-pink-400 group-hover:to-purple-500',
  },
];

// Navigation links
const NAV_LINKS = [
  { name: 'Shopee Store', url: 'https://shopee.vn/ecomate', external: true },
  { name: 'TikTok Shop', url: 'https://tiktok.com/@ecomate', external: true },
  { name: 'Web Store', url: '/store', external: false },
  { name: 'Về Chúng Tôi', url: '/about', external: false },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.98]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 20]);

  // Scroll behavior - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logo animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.header-logo', {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.6)',
        delay: 0.2,
      });

      gsap.from('.nav-link', {
        y: -30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: 0.5,
      });

      gsap.from('.social-icon', {
        scale: 0,
        rotation: 360,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.8)',
        delay: 0.8,
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <motion.header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-2 md:py-3' : 'py-4 md:py-6'
        }`}
        style={{
          opacity: headerOpacity,
          backdropFilter: `blur(${headerBlur}px)`,
        }}
        animate={{
          y: hidden ? -100 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Animated background with gradient */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className={`absolute inset-0 transition-all duration-500 ${
              isScrolled
                ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-amber-200/50'
                : 'bg-gradient-to-b from-white/50 to-transparent backdrop-blur-sm'
            }`}
          />

          {/* Animated particles in header */}
          {!isScrolled && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-amber-400/30"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: '50%',
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            {/* Logo / App Icon */}
            <Link href="/" className="header-logo relative group">
              <motion.div
                className="relative w-12 h-12 md:w-16 md:h-16"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {/* 3D effect background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl"
                  animate={{
                    boxShadow: [
                      '0 4px 20px rgba(251, 191, 36, 0.4)',
                      '0 8px 30px rgba(251, 191, 36, 0.6)',
                      '0 4px 20px rgba(251, 191, 36, 0.4)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl">
                  🏠
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-amber-400/0 via-amber-400/50 to-amber-400/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.name}
                  className="nav-link relative"
                  onHoverStart={() => setHoveredLink(index)}
                  onHoverEnd={() => setHoveredLink(null)}
                >
                  {link.external ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative px-4 py-2 text-sm xl:text-base font-medium text-gray-700 hover:text-amber-600 transition-colors"
                    >
                      <span className="relative z-10">{link.name}</span>

                      {/* Animated underline */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hoveredLink === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Magnetic hover background */}
                      {hoveredLink === index && (
                        <motion.div
                          layoutId="navHover"
                          className="absolute inset-0 bg-amber-50 rounded-lg -z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </a>
                  ) : (
                    <Link
                      href={link.url}
                      className="relative px-4 py-2 text-sm xl:text-base font-medium text-gray-700 hover:text-amber-600 transition-colors"
                    >
                      <span className="relative z-10">{link.name}</span>

                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hoveredLink === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      {hoveredLink === index && (
                        <motion.div
                          layoutId="navHover"
                          className="absolute inset-0 bg-amber-50 rounded-lg -z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Social Icons - Desktop */}
            <div className="hidden md:flex items-center gap-2 xl:gap-3">
              {SOCIAL_LINKS.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon group relative"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <div className={`w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-gradient-to-br ${social.color} ${social.hoverColor} flex items-center justify-center text-xl xl:text-2xl shadow-lg transition-all duration-300`}>
                    {social.icon}
                  </div>

                  {/* Tooltip */}
                  <motion.div
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
                    initial={{ y: -10 }}
                    whileHover={{ y: 0 }}
                  >
                    {social.name}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                  </motion.div>

                  {/* Animated ring on hover */}
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-30 blur-md -z-10`}
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  className="w-full h-0.5 bg-gray-700 rounded-full"
                  animate={{
                    rotate: mobileMenuOpen ? 45 : 0,
                    y: mobileMenuOpen ? 9 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-gray-700 rounded-full"
                  animate={{
                    opacity: mobileMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-gray-700 rounded-full"
                  animate={{
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? -9 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute top-20 right-4 left-4 bg-white rounded-3xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50 opacity-50" />

              <div className="relative p-6 space-y-6">
                {/* Navigation Links */}
                <nav className="space-y-2">
                  {NAV_LINKS.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {link.external ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name} →
                        </a>
                      ) : (
                        <Link
                          href={link.url}
                          className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Social Icons */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-500 mb-3">Theo dõi chúng tôi</p>
                  <div className="flex items-center gap-3">
                    {SOCIAL_LINKS.map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4 + index * 0.1, type: 'spring' }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center text-2xl shadow-lg`}>
                          {social.icon}
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
