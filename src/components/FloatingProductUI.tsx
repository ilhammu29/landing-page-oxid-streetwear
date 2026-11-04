'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function FloatingProductUI() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !mediaRef.current || !textColRef.current) return;

    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    // Patreon's exact gsap.quickTo parallax controllers
    const quickMediaY = gsap.quickTo(mediaRef.current, 'yPercent', {
      duration: 0.65,
      ease: 'power2.out',
    });

    const quickTextY = gsap.quickTo(textColRef.current, 'y', {
      duration: 0.5,
      ease: 'power2.out',
    });

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: false,
      onUpdate: (self) => {
        const a = self.progress;
        // Exact Patreon formula: -40 * a + 20 for media yPercent
        quickMediaY(-40 * a + 20);
        // Exact Patreon formula: (12 * a - 6) / 100 * innerHeight for text y
        quickTextY(((12 * a - 6) / 100) * window.innerHeight);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="direct-access"
      className="relative w-full py-28 sm:py-44 px-6 sm:px-16 bg-[#0a0a0c] overflow-hidden select-none border-t border-[#27272a]"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Authentic Streetwear Atelier Manifesto */}
          <div
            ref={textColRef}
            className="lg:col-span-7 space-y-8 max-w-2xl will-change-transform"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-[#00ff66]">
              Direct Atelier Dispatch
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-[4.1rem] xl:text-[4.5rem] font-display font-extrabold tracking-[-0.04em] text-[#faf9f6] leading-[0.96] uppercase">
              DIRECT RUNWAY.
              <br />
              <span className="text-[#00ff66]">ZERO</span> GATEKEEPERS.
            </h2>

            <p className="text-xl sm:text-2xl text-[#f5f5f0] leading-relaxed font-sans font-normal tracking-[-0.02em]">
              OXID STUDIO eliminates fashion middlemen, retail markups, and arbitrary seasonal calendars.
            </p>

            <div className="space-y-4 text-sm sm:text-base font-mono text-[#a1a1aa] leading-relaxed">
              <p>
                Every drop is broadcast in synchronized kinetic runway cuts. Members receive direct release coordinates, cryptographic reserve allocation, and priority fabrication slots before public release.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#27272a]">
                <div className="p-4 rounded-2xl bg-[#121214] border border-[#27272a]">
                  <div className="text-2xl font-display font-bold text-[#00ff66]">0.0%</div>
                  <div className="text-xs text-[#a1a1aa] mt-0.5">Commercial Markup</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#121214] border border-[#27272a]">
                  <div className="text-2xl font-display font-bold text-[#faf9f6]">Direct</div>
                  <div className="text-xs text-[#a1a1aa] mt-0.5">Atelier Access</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Runway Video */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              ref={mediaRef}
              className="relative w-full max-w-[420px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#121214] will-change-transform border border-[#27272a] shadow-[0_0_40px_rgba(0,0,0,0.9)] group"
            >
              {/* Top Video Header */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-xs font-mono uppercase bg-[#0a0a0c]/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#27272a]">
                <span className="text-[#faf9f6] font-medium">Kinetic Runway</span>
                <span className="text-[#a1a1aa]">Autumn Winter</span>
              </div>

              <video
                src="/fashion/oxid-runway-120bpm.mp4"
                poster="/fashion/look1.jpg"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover block filter brightness-[0.98] contrast-[1.08]"
              />

              {/* Bottom Subtle Bar */}
              <div className="p-4 bg-[#121214] border-t border-[#27272a] flex items-center justify-between text-xs font-mono">
                <span className="text-[#a1a1aa]">Runway Stream · 24 FPS</span>
                <span className="text-[#faf9f6]">Atelier Cut</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
