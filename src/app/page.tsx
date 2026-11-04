'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { AuthModal } from '@/components/AuthModal';
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
      {/* Global Authentication Modal */}
      <AuthModal
        isOpen={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitchMode={(newMode) => setAuthMode(newMode)}
      />

      {/* Global Patreon Header */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
      />

      {/* Exact 7-Module Structure of Patreon Homepage */}
      <main id="main-content">
        {/* Module 1: Home Hero (Carousel of 8 Creators with looping videos & GSAP transition) */}
        <HeroSlider
          onNavigate={handleNavigate}
          onOpenAuth={handleOpenAuth}
        />

        {/* Module 2: Creator Grid (Infinite horizontal wave conveyor & "Creativity powered by fandom") */}
        <CreatorGrid />

        {/* Module 3: Full-Bleed Parallax Testimonial (KAMAUU portrait with GSAP scrub) */}
        <FullBleedTestimonial />

        {/* Module 4: Complete creative control (Patreon's exact ImageGridWithTitle with differential card parallax) */}
        <ImageGridWithTitle />

        {/* Module 5: "Creators. Fans. Nothing in between." with Chelsea video parallax */}
        <FloatingProductUI />

        {/* Module 6: "Turning passions into businesses" with Mobile Insights parallax */}
        <BusinessParallax />

        {/* Module 7: "Your world to create" with Official Animated Living Logomark */}
        <GrandFinaleCTA onOpenAuth={handleOpenAuth} />
      </main>

      {/* Global Mega Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
