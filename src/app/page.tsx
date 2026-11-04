'use client';

import { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { AuthModal } from '@/components/AuthModal';
import { IntroMotionCinema } from '@/components/IntroMotionCinema';
import { HeroSlider } from '@/components/HeroSlider';
import { CreatorGrid } from '@/components/CreatorGrid';
import { FullBleedTestimonial } from '@/components/FullBleedTestimonial';
import { ImageGridWithTitle } from '@/components/ImageGridWithTitle';
import { FloatingProductUI } from '@/components/FloatingProductUI';
import { BusinessParallax } from '@/components/BusinessParallax';
import { GrandFinaleCTA } from '@/components/GrandFinaleCTA';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [promoOpen, setPromoOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f5f5f0] antialiased selection:bg-[#00ff66] selection:text-black font-sans">
      {/* Top Precision Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#00ff66] origin-left z-50 pointer-events-none shadow-[0_0_8px_#00ff66]"
        style={{ scaleX }}
      />

      {/* 15-Second Japanese Motion Cinema Opening Overlay */}
      <IntroMotionCinema
        forceOpen={promoOpen}
        onClose={() => setPromoOpen(false)}
      />

      {/* Global Authentication Modal */}
      <AuthModal
        isOpen={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitchMode={(newMode) => setAuthMode(newMode)}
      />

      {/* Global Redesigned Luxury Atelier Navbar */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
        onOpenPromo={() => setPromoOpen(true)}
      />

      {/* Exact 7-Module Structure of Patreon Homepage */}
      <main id="main-content">
        {/* Module 1: Home Hero (Carousel with direct runway videos & GSAP clip-path transitions) */}
        <HeroSlider
          onNavigate={handleNavigate}
          onOpenAuth={handleOpenAuth}
        />

        {/* Module 2: Creator Grid (Infinite glitch-free conveyor of 7 sovereign looks) */}
        <CreatorGrid />

        {/* Module 3: Full-Bleed Parallax Testimonial (Atelier Director with GSAP scrub) */}
        <FullBleedTestimonial />

        {/* Module 4: Complete creative control (ImageGridWithTitle with differential card parallax) */}
        <ImageGridWithTitle />

        {/* Module 5: Direct Runway Film Showcase */}
        <FloatingProductUI />

        {/* Module 6: Atelier Telemetry & Cordura Allocation Terminal */}
        <BusinessParallax />

        {/* Module 7: Grand Finale Call to Action */}
        <GrandFinaleCTA onOpenAuth={handleOpenAuth} />
      </main>

      {/* Global Mega Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
