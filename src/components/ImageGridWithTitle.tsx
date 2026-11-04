'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CARDS = [
  {
    id: 'card1',
    image: '/fashion/look3.jpg',
    code: 'SPEC 01 // MODULAR VEST',
    name: 'Fidlock® Magnetic Rig',
    speed: -25,
  },
  {
    id: 'card2',
    image: '/fashion/look7.jpg',
    code: 'SPEC 02 // CARBON UNIT',
    name: 'Luminescent Sole High-Top',
    speed: -45,
  },
  {
    id: 'card3',
    image: '/fashion/look6.jpg',
    code: 'SPEC 03 // 500GSM FLEECE',
    name: 'Brutalist Milk White Hoodie',
    speed: -35,
  },
  {
    id: 'card4',
    image: '/fashion/look1.jpg',
    code: 'SPEC 04 // BALLISTIC SHELL',
    name: 'Cordura Storm Parka',
    speed: -55,
  },
];

export function ImageGridWithTitle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Multi-layer differential parallax scrub on scroll
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;

        cardRefs.current.forEach((el, idx) => {
          if (el) {
            const speed = CARDS[idx]?.speed || -30;
            gsap.set(el, {
              yPercent: p * speed,
            });
          }
        });

        if (titleRef.current) {
          gsap.set(titleRef.current, {
            yPercent: p * -12,
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
      id="creative-control"
      ref={containerRef}
      className="relative w-full overflow-hidden select-none bg-[#0a0a0c]"
      style={{
        minHeight: '1700px',
        backgroundImage: `
          radial-gradient(70% 60% at 50% 30%, rgba(0, 255, 102, 0.05) 0%, rgba(10, 10, 12, 0) 70%),
          radial-gradient(100% 100% at 80% 80%, rgba(24, 24, 27, 0.7) 0%, rgba(10, 10, 12, 1) 100%)
        `,
      }}
    >
      {/* Background Cyber Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 102, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 102, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* 1920px Centered Grid Container */}
      <div className="relative w-full max-w-[1920px] mx-auto h-[1700px] overflow-hidden">
        {/* Card 1: Modular Vest (Top Right) */}
        <div
          ref={(el) => {
            cardRefs.current[0] = el;
          }}
          className="absolute z-20 will-change-transform rounded-3xl overflow-hidden shadow-2xl border border-[#27272a] hover:border-[#00ff66] transition-colors"
          style={{
            width: '32rem',
            left: 'calc(50% + 12rem)',
            top: '4rem',
          }}
        >
          <div className="relative aspect-[3/4] bg-[#121214] group">
            <img
              src={CARDS[0].image}
              alt={CARDS[0].name}
              className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.1] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono text-[#00ff66] block uppercase tracking-widest">{CARDS[0].code}</span>
              <span className="text-base font-display font-bold text-[#faf9f6]">{CARDS[0].name}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Carbon High-Top Sneaker (Top Left) */}
        <div
          ref={(el) => {
            cardRefs.current[1] = el;
          }}
          className="absolute z-20 will-change-transform rounded-3xl overflow-hidden shadow-2xl border border-[#27272a] hover:border-[#00ff66] transition-colors"
          style={{
            width: '28rem',
            left: 'calc(50% - 46rem)',
            top: '20rem',
          }}
        >
          <div className="relative aspect-[3/4] bg-[#121214] group">
            <img
              src={CARDS[1].image}
              alt={CARDS[1].name}
              className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.1] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono text-[#00ff66] block uppercase tracking-widest">{CARDS[1].code}</span>
              <span className="text-base font-display font-bold text-[#faf9f6]">{CARDS[1].name}</span>
            </div>
          </div>
        </div>

        {/* Big Editorial Headline in Milk White */}
        <h2
          ref={titleRef}
          className="absolute z-10 w-[90%] max-w-[1300px] left-1/2 -translate-x-1/2 text-center will-change-transform uppercase"
          style={{ top: '34rem' }}
        >
          <span className="block text-[11px] font-mono text-[#00ff66] tracking-[0.3em] uppercase mb-4">
            // MODULAR ARCHITECTURE //
          </span>
          <span className="block font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[7.8rem] leading-[0.88] tracking-[-0.04em] text-[#faf9f6]">
            COMPLETE
          </span>
          <span className="block font-display font-light text-6xl sm:text-8xl md:text-9xl lg:text-[7.8rem] leading-[0.88] tracking-[-0.04em] text-[#f5f5f0]">
            TECHNICAL
          </span>
          <span className="block font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[7.8rem] leading-[0.88] tracking-[-0.04em] text-[#00ff66]">
            CONTROL
          </span>
        </h2>

        {/* Card 3: Milk White Boxy Hoodie (Bottom Right) */}
        <div
          ref={(el) => {
            cardRefs.current[2] = el;
          }}
          className="absolute z-20 will-change-transform rounded-3xl overflow-hidden shadow-2xl border border-[#27272a] hover:border-[#00ff66] transition-colors"
          style={{
            width: '30rem',
            left: 'calc(50% + 18rem)',
            top: '74rem',
          }}
        >
          <div className="relative aspect-[3/4] bg-[#121214] group">
            <img
              src={CARDS[2].image}
              alt={CARDS[2].name}
              className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.1] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono text-[#00ff66] block uppercase tracking-widest">{CARDS[2].code}</span>
              <span className="text-base font-display font-bold text-[#faf9f6]">{CARDS[2].name}</span>
            </div>
          </div>
        </div>

        {/* Card 4: Ballistic Storm Parka (Bottom Left) */}
        <div
          ref={(el) => {
            cardRefs.current[3] = el;
          }}
          className="absolute z-20 will-change-transform rounded-3xl overflow-hidden shadow-2xl border border-[#27272a] hover:border-[#00ff66] transition-colors"
          style={{
            width: '26rem',
            left: 'calc(50% - 44rem)',
            top: '86rem',
          }}
        >
          <div className="relative aspect-[3/4] bg-[#121214] group">
            <img
              src={CARDS[3].image}
              alt={CARDS[3].name}
              className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.1] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono text-[#00ff66] block uppercase tracking-widest">{CARDS[3].code}</span>
              <span className="text-base font-display font-bold text-[#faf9f6]">{CARDS[3].name}</span>
            </div>
          </div>
        </div>

        {/* Bottom Technical Editorial Blocks */}
        <div
          className="absolute z-30 w-full max-w-4xl px-8 left-1/2 -translate-x-1/2 grid md:grid-cols-2 gap-10 text-[#f5f5f0]"
          style={{ top: '124rem' }}
        >
          <div className="p-8 rounded-3xl bg-[#121214]/90 backdrop-blur-xl border border-[#27272a] space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00ff66]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
              MODULAR HARDWARE MATRIX
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#faf9f6]">
              Engineered with zero commercial compromise.
            </h3>
            <p className="text-sm font-mono text-[#a1a1aa] leading-relaxed">
              Every seam is ultrasound-sealed. Outer fabrics are treated with hydrophobic nanotech, while modular magnetic Fidlock® attachment points let you reconfigure your kit in seconds.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#121214]/90 backdrop-blur-xl border border-[#27272a] space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00ff66]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
              NFC ENCRYPTED PROVENANCE
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#faf9f6]">
              Cryptographic authenticity in every drop.
            </h3>
            <p className="text-sm font-mono text-[#a1a1aa] leading-relaxed">
              Each piece contains an encrypted cryptographic microchip embedded beneath the woven atelier label, giving you irreversible ownership verification and VIP access to future drops.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
