'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function FullBleedTestimonial() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;

    const isMobile = window.innerWidth <= 768;

    // Scroll reveal for the manifesto quote
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }

    // Exact Patreon GSAP parallax formula
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: false,
      onUpdate: (self) => {
        if (imageRef.current) {
          const moveAmount = (isMobile ? 15 : 30) * self.progress;
          gsap.to(imageRef.current, {
            y: `-${moveAmount}vh`,
            duration: 0.5,
            overwrite: 'auto',
            ease: 'power1.out',
          });
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="quote"
      className="relative w-full min-h-[90vh] sm:min-h-[110vh] flex flex-col justify-between overflow-hidden bg-[#0a0a0c] text-[#f5f5f0] select-none py-24 sm:py-36 border-t border-b border-[#27272a]"
    >
      {/* Background Image Container with calc(100% + 30vh) */}
      <div
        className="absolute inset-0 w-full overflow-hidden pointer-events-none"
        style={{
          height: 'calc(100% + 30vh)',
          top: 0,
          left: 0,
        }}
      >
        <img
          ref={imageRef}
          src="/fashion/look5.jpg"
          alt="OXID Creative Direction"
          className="absolute inset-0 w-full h-full object-cover object-[65%_25%] sm:object-[60%_center] filter brightness-[0.55] contrast-[1.2] will-change-transform"
        />
        {/* Chiaroscuro Vignette & Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-[#0a0a0c]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a0a0c_95%)]" />
      </div>

      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-16 pt-12 flex-1 flex flex-col justify-center">
        {/* Editorial Subhead */}
        <div className="mb-8 text-xs font-mono uppercase tracking-widest text-[#00ff66]">
          Manifesto · Autonomous Atelier
        </div>

        {/* Massive Indented Quote Text in Milk White */}
        <blockquote
          ref={quoteRef}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.6rem] font-display font-extrabold tracking-[-0.04em] leading-[1.05] max-w-5xl sm:indent-20 md:indent-32 mb-12 text-[#faf9f6] uppercase will-change-transform"
        >
          &ldquo;We reject temporary hype. OXID STUDIO is the sovereign convergence of brutalist architecture, technical utility, and runway couture.&rdquo;
        </blockquote>

        {/* Right-aligned Author */}
        <div className="flex items-center justify-end gap-4 text-right pr-4 sm:pr-8">
          <div>
            <div className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-[#faf9f6]">
              OXID ATELIER
            </div>
            <div className="text-xs font-mono uppercase text-[#00ff66] tracking-wider mt-0.5">
              Creative Direction · Paris & Tokyo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
