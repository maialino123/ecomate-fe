'use client';

import { useEffect, useRef, useState, useCallback, useMemo, memo } from 'react';
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

// Performance: Custom hook to memoize particle positions (prevent regeneration on every render)
function useMemoizedParticles(count: number) {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 10 + Math.random() * 14,
      opacity: 0.5 + Math.random() * 0.3,
      blur: 3 + Math.random() * 3,
      delay: Math.random() * 4,
      duration: 5 + Math.random() * 5,
      moveX: (Math.random() - 0.5) * 20,
      moveY: 25 + Math.random() * 35,
    }));
  }, [count]); // Only regenerate if count changes
}

// Performance: Custom hook to memoize geometric pattern positions
function useMemoizedGeometry() {
  return useMemo(() => ({
    hexagons: Array.from({ length: 4 }, (_, i) => ({
      id: i,
      left: 15 + i * 20,
      top: 20 + (i % 3) * 25,
      rotateDuration: 20 + i * 3,
      opacityDuration: 6 + i,
    })),
    circles: Array.from({ length: 2 }, (_, i) => ({
      id: i,
      right: 15 + i * 30,
      top: 20 + i * 30,
      duration: 8 + i * 2,
      delay: i * 1.5,
    })),
    mobileCircles: Array.from({ length: 2 }, (_, i) => ({
      id: i,
      right: 20 + i * 50,
      top: 25 + i * 40,
      duration: 8 + i * 2,
      delay: i * 2,
    })),
    waves: Array.from({ length: 2 }, (_, i) => ({
      id: i,
      top: 35 + i * 35,
      duration: 10 + i * 2,
      delay: i * 4,
    })),
    lightRays: Array.from({ length: 4 }, (_, i) => ({
      id: i,
      left: 25 + i * 18,
      duration: 4 + i * 1.5,
      delay: i * 0.8,
    })),
  }), []); // Empty deps - static data
}

// Performance: Custom hook to memoize mobile particles
function useMemoizedMobileParticles() {
  return useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      left: 20 + i * 30,
      top: 30 + i * 20,
      duration: 6 + i * 2,
      delay: i * 1.5,
    }));
  }, []); // Static data
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

// High-quality Unsplash images for Ecomate smart home theme - Curated for cohesion
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=3840&auto=format&fit=crop', // Modern cozy living room with warm tones
  heroOverlay: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=3840&auto=format&fit=crop', // Smart home control panel
  heroLayer2: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=3840&auto=format&fit=crop', // Elegant home interior
  heroLayer3: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=3840&auto=format&fit=crop', // Warm family space
  feature1: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=3540&auto=format&fit=crop', // Modern kitchen interior
  feature2: 'https://images.unsplash.com/photo-1617104678098-ab8e2a3e8c66?q=80&w=3540&auto=format&fit=crop', // Bedroom with warm lighting
  impact: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=3540&auto=format&fit=crop', // Modern family home
  testimonial: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=3540&auto=format&fit=crop', // Cozy home interior
  cta: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=3540&auto=format&fit=crop', // Beautiful modern apartment
};

// 3D Floating Feature Cards Data
const FLOATING_FEATURES = [
  { icon: '🏠', title: 'Smart Home', desc: 'IoT Solutions', color: 'from-amber-400 to-orange-500', delay: 0 },
  { icon: '💡', title: 'LED Control', desc: 'App Control', color: 'from-yellow-400 to-amber-500', delay: 0.2 },
  { icon: '🌡️', title: 'Climate', desc: 'Auto Adjust', color: 'from-orange-400 to-red-500', delay: 0.4 },
  { icon: '🔒', title: 'Security', desc: '24/7 Monitor', color: 'from-amber-500 to-orange-600', delay: 0.6 },
];

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

  // Performance: Memoize particles and geometry to prevent recreation on every render
  const desktopParticles = useMemoizedParticles(6);
  const mobileParticles = useMemoizedMobileParticles();
  const geometry = useMemoizedGeometry();

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
    // GSAP Hero Animation - Dramatic entrance
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Morphing background reveal
      tl.from('.hero-morph-bg', {
        clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
        duration: 1.5,
        ease: 'power4.out',
      })
      // Aura particles fade in
      .from('.aura-particle', {
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'back.out(2)',
      }, '-=0.8')
      // 3D image layers reveal with depth
      .from('.hero-layer-1', {
        scale: 1.3,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=1')
      .from('.hero-layer-2', {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.8')
      .from('.hero-layer-3', {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.9')
      // Badge with bounce
      .from('.hero-badge', {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.6)',
      }, '-=0.5')
      // Title split reveal with 3D rotation
      .from('.hero-title-word', {
        rotationX: -90,
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(2)',
        transformOrigin: 'top center',
      }, '-=0.6')
      // Subtitle wave reveal
      .from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4')
      // 3D floating cards cascade
      .from('.floating-card-3d', {
        scale: 0,
        rotationY: 180,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'back.out(1.7)',
        transformOrigin: 'center center',
      }, '-=0.5')
      // CTA magnetic reveal
      .from('.hero-cta', {
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.8)',
      }, '-=0.4')
      // Light rays sweep
      .from('.light-ray', {
        scaleX: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power2.out',
      }, '-=0.8');

      // Continuous floating animations
      gsap.to('.float-card-1', {
        y: -30,
        x: 10,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.float-card-2', {
        y: -20,
        x: -15,
        rotation: -3,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });

      gsap.to('.float-card-3', {
        y: -25,
        x: 12,
        rotation: 4,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });

      gsap.to('.float-card-4', {
        y: -35,
        x: -8,
        rotation: -5,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5,
      });

      // Floating image layers
      gsap.to('.hero-layer-float', {
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Aura breathing effect
      gsap.to('.aura-glow', {
        scale: 1.3,
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Performance: Memoize handleSubmit to prevent recreation on every render
  const handleSubmit = useCallback((e: React.FormEvent) => {
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
  }, [email, variant]); // Only recreate when email or variant changes

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

      {/* Hero Section - 3D Premium Animation */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-0" style={{ perspective: '2000px' }}>
        {/* Morphing Gradient Background - Animated */}
        <div className="hero-morph-bg absolute inset-0 z-0">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 70%)',
                'radial-gradient(circle at 80% 50%, rgba(245, 158, 11, 0.3) 0%, rgba(251, 191, 36, 0.2) 50%, transparent 70%)',
                'radial-gradient(circle at 50% 20%, rgba(251, 146, 60, 0.3) 0%, rgba(249, 115, 22, 0.2) 50%, transparent 70%)',
                'radial-gradient(circle at 50% 80%, rgba(249, 115, 22, 0.3) 0%, rgba(251, 146, 60, 0.2) 50%, transparent 70%)',
                'radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 70%)',
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        {/* 3D Layered Background Images - SMOOTH scroll-only parallax (NO mouse reactive) */}
        <div className="absolute inset-0 z-0">
          {/* Layer 1 - Base with smooth scroll parallax only */}
          <motion.div
            className="hero-layer-1 hero-layer-float absolute inset-0"
            style={{
              y,
              opacity,
            }}
          >
            <Image
              src={IMAGES.hero}
              alt="Modern Smart Living Room"
              fill
              priority
              className="object-cover"
              style={{ objectPosition: 'center center' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-amber-900/70 via-orange-900/50 to-slate-900/80 md:from-amber-900/60 md:via-orange-900/40 md:to-slate-900/75" />
          </motion.div>

          {/* Layer 2 - Mid depth - Hidden on mobile for performance */}
          <motion.div
            className="hero-layer-2 absolute left-0 top-0 w-2/5 h-full opacity-0 md:opacity-20"
            style={{
              y: useTransform(scrollYProgress, [0, 1], ['0%', '15%']),
            }}
          >
            <Image
              src={IMAGES.heroLayer2}
              alt="Modern Interior"
              fill
              className="object-cover mix-blend-overlay"
            />
          </motion.div>

          {/* Layer 3 - Front depth - Hidden on mobile for performance */}
          <motion.div
            className="hero-layer-3 absolute right-0 top-0 w-2/5 h-full opacity-0 md:opacity-15"
            style={{
              y: useTransform(scrollYProgress, [0, 1], ['0%', '10%']),
            }}
          >
            <Image
              src={IMAGES.heroLayer3}
              alt="Cozy Space"
              fill
              className="object-cover mix-blend-soft-light"
            />
          </motion.div>

          {/* Final gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-50/98 via-slate-900/50 to-transparent md:from-primary-50/95 md:via-slate-900/40" />
        </div>

        {/* Optimized Aura Particle System - Memoized positions prevent re-renders */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Desktop particles - Memoized */}
          {desktopParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="aura-particle absolute rounded-full hidden md:block"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background: `radial-gradient(circle, rgba(251, 191, 36, ${particle.opacity}) 0%, rgba(245, 158, 11, ${particle.opacity * 0.5}) 40%, transparent 70%)`,
                filter: `blur(${particle.blur}px)`,
              }}
              animate={{
                y: [0, -particle.moveY, 0],
                x: [0, particle.moveX, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
          {/* Mobile particles - Memoized */}
          {mobileParticles.map((particle) => (
            <motion.div
              key={`mobile-${particle.id}`}
              className="aura-particle absolute rounded-full md:hidden"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: '12px',
                height: '12px',
                background: `radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, rgba(245, 158, 11, 0.25) 40%, transparent 70%)`,
                filter: 'blur(3px)',
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Artistic Geometric Pattern Animations - Memoized geometry */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {/* Rotating hexagons - Desktop only - Memoized */}
          {geometry.hexagons.map((hex) => (
            <motion.div
              key={`hex-${hex.id}`}
              className="absolute hidden md:block"
              style={{
                left: `${hex.left}%`,
                top: `${hex.top}%`,
                width: '60px',
                height: '60px',
              }}
              animate={{
                rotate: [0, 360],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                rotate: {
                  duration: hex.rotateDuration,
                  repeat: Infinity,
                  ease: 'linear',
                },
                opacity: {
                  duration: hex.opacityDuration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon
                  points="50 5, 95 27.5, 95 72.5, 50 95, 5 72.5, 5 27.5"
                  fill="none"
                  stroke="rgba(251, 191, 36, 0.3)"
                  strokeWidth="2"
                />
              </svg>
            </motion.div>
          ))}

          {/* Floating circles - Desktop - Memoized */}
          {geometry.circles.map((circle) => (
            <motion.div
              key={`circle-${circle.id}`}
              className="absolute rounded-full border-2 hidden md:block"
              style={{
                right: `${circle.right}%`,
                top: `${circle.top}%`,
                width: '80px',
                height: '80px',
                borderColor: 'rgba(245, 158, 11, 0.2)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.25, 0.1],
                rotate: [0, 180, 0],
              }}
              transition={{
                duration: circle.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: circle.delay,
              }}
            />
          ))}

          {/* Mobile circles - Memoized */}
          {geometry.mobileCircles.map((circle) => (
            <motion.div
              key={`circle-mobile-${circle.id}`}
              className="absolute rounded-full border md:hidden"
              style={{
                right: `${circle.right}%`,
                top: `${circle.top}%`,
                width: '50px',
                height: '50px',
                borderColor: 'rgba(245, 158, 11, 0.15)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.08, 0.18, 0.08],
              }}
              transition={{
                duration: circle.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: circle.delay,
              }}
            />
          ))}

          {/* Wave lines - Memoized */}
          {geometry.waves.map((wave) => (
            <motion.div
              key={`wave-${wave.id}`}
              className="absolute left-0 right-0"
              style={{
                top: `${wave.top}%`,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.2), transparent)',
              }}
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: wave.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: wave.delay,
              }}
            />
          ))}
        </div>

        {/* Smooth Ambient Aura Glow - Optimized for mobile */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
          <motion.div
            className="aura-glow w-[400px] h-[400px] md:w-[700px] md:h-[700px] rounded-full opacity-20 md:opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.35) 0%, rgba(245, 158, 11, 0.18) 35%, transparent 65%)',
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Subtle Light Rays - Memoized positions */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {geometry.lightRays.map((ray) => (
            <motion.div
              key={`ray-${ray.id}`}
              className="light-ray absolute h-full"
              style={{
                left: `${ray.left}%`,
                width: '1px',
                background: 'linear-gradient(to bottom, transparent 0%, rgba(251, 191, 36, 0.4) 50%, transparent 100%)',
                transformOrigin: 'top',
              }}
              animate={{
                scaleY: [1, 1.15, 1],
                opacity: [0.03, 0.1, 0.03],
              }}
              transition={{
                duration: ray.duration,
                repeat: Infinity,
                delay: ray.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Content container - Mobile optimized spacing */}
        <div className="container mx-auto px-4 sm:px-6 relative z-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left: Content */}
              <div className="text-center lg:text-left">
                {/* Trust Badge - Mobile optimized */}
                <motion.div
                  className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 md:px-6 md:py-3 rounded-full shadow-2xl mb-6 md:mb-8 border border-white/20 text-xs md:text-sm"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                  style={{
                    boxShadow: '0 8px 32px rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <span className="w-2 h-2 md:w-3 md:h-3 bg-amber-400 rounded-full animate-pulse" />
                  <span className="font-bold text-white">
                    Được tin cậy bởi <span className="text-amber-300">15,000+</span> gia đình Việt
                  </span>
                </motion.div>

                {/* Hero Title - Mobile optimized typography */}
                <div className="mb-4 md:mb-6" style={{ perspective: '1000px' }}>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                    <div className="hero-title-word inline-block mr-3" style={{
                      color: '#ffffff',
                      textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 8px 40px rgba(0,0,0,0.3), 0 0 60px rgba(251, 191, 36, 0.3)',
                      transformStyle: 'preserve-3d',
                    }}>
                      Tiện
                    </div>
                    <div className="hero-title-word inline-block mr-3" style={{
                      color: '#ffffff',
                      textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 8px 40px rgba(0,0,0,0.3), 0 0 60px rgba(251, 191, 36, 0.3)',
                      transformStyle: 'preserve-3d',
                    }}>
                      Ích
                    </div>
                    <div className="hero-title-word inline-block relative" style={{
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fb923c 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 40px rgba(251, 191, 36, 0.8))',
                      transformStyle: 'preserve-3d',
                    }}>
                      Mỗi Ngày
                      {/* Animated underline */}
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, #fbbf24, #f59e0b, #fb923c)',
                        }}
                        animate={{
                          scaleX: [0, 1],
                          opacity: [0, 1],
                        }}
                        transition={{
                          delay: 1.5,
                          duration: 0.8,
                          ease: 'easeOut',
                        }}
                      />
                    </div>
                    <br />
                    <div className="hero-title-word inline-block mr-3" style={{
                      color: '#ffffff',
                      textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 8px 40px rgba(0,0,0,0.3), 0 0 60px rgba(251, 191, 36, 0.3)',
                      transformStyle: 'preserve-3d',
                    }}>
                      Trong
                    </div>
                    <div className="hero-title-word inline-block mr-3" style={{
                      color: '#ffffff',
                      textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 8px 40px rgba(0,0,0,0.3), 0 0 60px rgba(251, 191, 36, 0.3)',
                      transformStyle: 'preserve-3d',
                    }}>
                      Từng
                    </div>
                    <div className="hero-title-word inline-block mr-3" style={{
                      color: '#ffffff',
                      textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 8px 40px rgba(0,0,0,0.3), 0 0 60px rgba(251, 191, 36, 0.3)',
                      transformStyle: 'preserve-3d',
                    }}>
                      Căn
                    </div>
                    <div className="hero-title-word inline-block" style={{
                      color: '#ffffff',
                      textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 8px 40px rgba(0,0,0,0.3), 0 0 60px rgba(251, 191, 36, 0.3)',
                      transformStyle: 'preserve-3d',
                    }}>
                      Phòng
                    </div>
                  </h1>
                </div>

                {/* Hero Subtitle - Mobile optimized */}
                <p
                  className="hero-subtitle text-base sm:text-lg md:text-xl mb-6 md:mb-10 leading-relaxed font-medium px-2 sm:px-0"
                  style={{
                    color: '#fef3c7',
                    textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  Khám phá{' '}
                  <span
                    className="font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    giải pháp nhà thông minh
                  </span>{' '}
                  và tiện ích gia dụng hiện đại, biến không gian sống thành nơi an lạc và đầy cảm hứng
                </p>

                {/* Hero CTA with Magnetic Button */}
                <MagneticCTA onSubmit={handleSubmit} email={email} setEmail={setEmail} />

                {/* Social Proof Stats */}
                <div className="mt-8 md:mt-12">
                  <AnimatedStats />
                </div>
              </div>

              {/* Right: 3D Floating Feature Cards - Hidden on mobile for performance */}
              <div className="relative h-[400px] lg:h-[600px] hidden lg:block" style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}>
                {FLOATING_FEATURES.map((feature, index) => (
                  <FloatingCard3D
                    key={index}
                    feature={feature}
                    index={index}
                    mouseX={mouseX}
                    mouseY={mouseY}
                  />
                ))}
              </div>

              {/* Mobile: Simple Feature Grid instead of floating cards */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden mt-8">
                {FLOATING_FEATURES.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-gradient-to-br ${feature.color} rounded-2xl p-4 sm:p-5 text-white text-center shadow-lg`}
                  >
                    <div className="text-3xl sm:text-4xl mb-2">{feature.icon}</div>
                    <h3 className="text-sm sm:text-base font-bold mb-1">{feature.title}</h3>
                    <p className="text-xs sm:text-sm opacity-90">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
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

// Magnetic CTA Component - Mobile optimized (no magnetic effect on mobile)
// Performance: Memoized with React.memo to prevent unnecessary re-renders
const MagneticCTA = memo(function MagneticCTA({ onSubmit, email, setEmail }: any) {
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
      className="hero-cta max-w-2xl mx-auto mb-8 md:mb-12 px-2 sm:px-0"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 bg-white/95 backdrop-blur-md p-2 rounded-xl sm:rounded-2xl shadow-2xl border border-primary-100/50">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email nhận ưu đãi 20%"
          required
          inputSize="lg"
          className="flex-1 border-0 focus:ring-2 focus:ring-amber-400 transition-all text-sm sm:text-base"
        />
        <motion.div
          ref={buttonRef}
          style={{ x: typeof window !== 'undefined' && window.innerWidth >= 768 ? x : 0, y: typeof window !== 'undefined' && window.innerWidth >= 768 ? y : 0 }}
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
            className="w-full sm:w-auto px-6 sm:px-8 whitespace-nowrap shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group text-sm sm:text-base"
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
      <p className="text-xs sm:text-sm mt-2 sm:mt-3 font-medium text-center" style={{ color: '#e5e7eb', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
        🎁 Giảm 20% đơn đầu • 🚚 Freeship • ⭐ Hỗ trợ 24/7
      </p>
    </motion.form>
  );
});

// Animated Stats Component with Count-Up - Mobile optimized
// Performance: Memoized to prevent re-renders
const AnimatedStats = memo(function AnimatedStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { value: 15000, suffix: '+', label: 'Gia đình' },
    { value: 50000, suffix: '+', label: 'Sản phẩm' },
    { value: 4.9, suffix: '/5', label: 'Đánh giá' },
  ];

  return (
    <div ref={ref} className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-3xl mx-auto">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.2, type: 'spring', stiffness: 100 }}
          className="text-center"
        >
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-600">
            <CountUp end={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-xs sm:text-sm text-slate-700 mt-1">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
});

// Count Up Animation Component
// Performance: Memoized to prevent re-renders when stats don't change
const CountUp = memo(function CountUp({ end, suffix }: { end: number; suffix: string }) {
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
});

// Features Section Component with Image Backgrounds
// Performance: Memoized to prevent unnecessary re-renders
const FeaturesSection = memo(function FeaturesSection() {
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
});

// Feature Card with 3D Tilt and Hover Animation
// Performance: Memoized with React.memo
const FeatureCard = memo(function FeatureCard({ feature, index }: { feature: any; index: number }) {
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
});

// Impact Section with Full-Screen Background Image
// Performance: Memoized
const ImpactSection = memo(function ImpactSection() {
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
});

// Testimonials Section with Subtle Background
// Performance: Memoized
const TestimonialsSection = memo(function TestimonialsSection() {
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
});

// Testimonial Card with Interactive Hover
// Performance: Memoized
const TestimonialCard = memo(function TestimonialCard({ testimonial, index }: { testimonial: any; index: number }) {
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
});

// Final CTA Section with Dramatic Background
// Performance: Memoized
const FinalCTASection = memo(function FinalCTASection({ onSubmit, email, setEmail }: any) {
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
});

// Final Magnetic CTA with Enhanced Interactivity
// Performance: Memoized
const FinalMagneticCTA = memo(function FinalMagneticCTA({ onSubmit, email, setEmail }: any) {
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
});

// 3D Floating Feature Card Component
// Performance: Memoized
const FloatingCard3D = memo(function FloatingCard3D({ feature, index, mouseX, mouseY }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt based on mouse position
  const rotateX = useTransform(
    mouseY,
    [0, typeof window !== 'undefined' ? window.innerHeight : 1080],
    [10, -10]
  );
  const rotateY = useTransform(
    mouseX,
    [0, typeof window !== 'undefined' ? window.innerWidth : 1920],
    [-10, 10]
  );

  // Positioning for cards in a cascade layout
  const positions = [
    { top: '10%', left: '10%', rotation: -5 },
    { top: '30%', right: '15%', rotation: 5 },
    { top: '55%', left: '5%', rotation: 3 },
    { top: '75%', right: '10%', rotation: -4 },
  ];

  const position = positions[index];

  return (
    <motion.div
      ref={cardRef}
      className={`floating-card-3d float-card-${index + 1} absolute`}
      style={{
        ...position,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.1,
        zIndex: 50,
        rotateZ: 0,
      }}
    >
      <motion.div
        className="relative w-48 h-56 rounded-3xl overflow-hidden cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
        }}
      >
        {/* Glass morphism background with gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-90`}
          animate={{
            opacity: isHovered ? 1 : 0.9,
          }}
        />

        {/* Glass overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />

        {/* Border glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            border: '2px solid rgba(255, 255, 255, 0.2)',
            boxShadow: isHovered
              ? '0 20px 60px rgba(251, 191, 36, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              : '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          }}
          animate={{
            boxShadow: isHovered
              ? '0 25px 70px rgba(251, 191, 36, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
              : '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          }}
        />

        {/* Content */}
        <div
          className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-white"
          style={{
            transform: 'translateZ(50px)',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          {/* Icon with 3D float */}
          <motion.div
            className="text-6xl mb-4"
            animate={{
              rotateY: isHovered ? 360 : 0,
              scale: isHovered ? 1.2 : 1,
            }}
            transition={{
              rotateY: { duration: 0.6, ease: 'backOut' },
              scale: { duration: 0.3 },
            }}
            style={{
              filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))',
            }}
          >
            {feature.icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-2 text-center">{feature.title}</h3>

          {/* Description */}
          <p className="text-sm opacity-90 text-center">{feature.desc}</p>

          {/* Floating particles around card */}
          {isHovered && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-white"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0],
                    x: [0, (Math.random() - 0.5) * 40],
                    y: [0, (Math.random() - 0.5) * 40],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1,
                    repeat: Infinity,
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: isHovered
              ? 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)'
              : 'transparent',
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Aura ring effect */}
        {isHovered && (
          <motion.div
            className="absolute -inset-4 rounded-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1.1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              background: `radial-gradient(circle, transparent 40%, ${feature.color.includes('amber') ? 'rgba(251, 191, 36, 0.4)' : 'rgba(249, 115, 22, 0.4)'} 70%, transparent 100%)`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
});
