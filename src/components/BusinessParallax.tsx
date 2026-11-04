'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function BusinessParallax() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !mediaRef.current || !textColRef.current) return;

    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    // Exact Patreon quickTo parallax controllers
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
        // Exact Patreon formula
        quickMediaY(-40 * a + 20);
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
      id="business"
      className="relative w-full py-28 sm:py-44 px-6 sm:px-16 bg-[#0a0a0c] overflow-hidden select-none border-t border-[#27272a]"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Authentic Atelier Text with Parallax */}
          <div
            ref={textColRef}
            className="lg:col-span-6 space-y-10 max-w-xl will-change-transform"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00ff66]">
              <span className="w-2 h-2 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66]" />
              <span>ATELIER TELEMETRY // CLIENT TERMINAL</span>
            </div>

            <h2 className="text-5xl sm:text-7xl md:text-[5.5rem] font-display font-extrabold tracking-[-0.04em] text-[#faf9f6] leading-[0.96] uppercase">
              SOVEREIGN <br />
              <span className="text-[#00ff66]">DROP</span> TERMINAL
            </h2>

            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#faf9f6] uppercase flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#00ff66]" />
                Direct Allocation Ledger
              </h3>
              <p className="text-sm sm:text-base font-mono text-[#a1a1aa] leading-relaxed">
                Clients monitor drop reserves, fabric batch inspections, and laser-cutting status in real time. No waitlists, no reseller markups, no automated bot intercepts.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#faf9f6] uppercase flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#00ff66]" />
                VIP Capsule Unlocks
              </h3>
              <p className="text-sm sm:text-base font-mono text-[#a1a1aa] leading-relaxed">
                Holding encrypted NFC garment credentials unlocks private studio drops, bespoke bespoke sizing adjustments, and invitations to Tokyo & Paris underground runway showcases.
              </p>
            </div>
          </div>

          {/* Right Column: Floating Tactical Terminal Mockup with quickTo Parallax */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div
              ref={mediaRef}
              className="relative w-full max-w-[420px] rounded-[2.5rem] p-6 bg-[#121214] will-change-transform border border-[#27272a] shadow-2xl space-y-6"
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#faf9f6]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66] animate-pulse" />
                  <span>OXID TERMINAL // v2.6</span>
                </div>
                <span className="text-[10px] font-mono text-[#00ff66] bg-[#00ff66]/10 px-2.5 py-0.5 rounded-full border border-[#00ff66]/30">
                  ONLINE
                </span>
              </div>

              {/* Live Metric 1 */}
              <div className="p-4 rounded-2xl bg-[#0a0a0c] border border-[#27272a] space-y-2">
                <div className="flex justify-between text-xs font-mono text-[#a1a1aa]">
                  <span>DROP 01 // CORDURA ALLOCATION</span>
                  <span className="text-[#00ff66]">94% RESERVED</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#18181b] overflow-hidden">
                  <div className="w-[94%] h-full bg-[#00ff66] shadow-[0_0_12px_#00ff66]" />
                </div>
              </div>

              {/* Live Metric 2 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#0a0a0c] border border-[#27272a]">
                  <div className="text-[10px] font-mono text-[#a1a1aa] uppercase">Active Clients</div>
                  <div className="text-2xl font-display font-bold text-[#faf9f6] mt-1">4,820</div>
                  <div className="text-[10px] font-mono text-[#00ff66] mt-0.5">+18% this drop</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#0a0a0c] border border-[#27272a]">
                  <div className="text-[10px] font-mono text-[#a1a1aa] uppercase">Tempo Sync</div>
                  <div className="text-2xl font-display font-bold text-[#00ff66] mt-1">120 BPM</div>
                  <div className="text-[10px] font-mono text-[#a1a1aa] mt-0.5">Runway Master</div>
                </div>
              </div>

              {/* NFC Chip Status */}
              <div className="p-4 rounded-2xl bg-[#0a0a0c] border border-[#27272a] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#18181b] border border-[#27272a] flex items-center justify-center text-[#00ff66]">
                    &bull;
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-[#faf9f6]">NFC CRYPTO HARDWARE</div>
                    <div className="text-[10px] font-mono text-[#a1a1aa]">Woven Authentication Chip</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#00ff66] font-bold">VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
