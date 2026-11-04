'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface LookItem {
  id: string;
  code: string;
  name: string;
  category: string;
  image: string;
  spec: string;
  width: number;
  height: number;
  marginTop: number;
}

// 7 Sovereign Streetwear Looks from OXID STUDIO Nano Banana Pro Atelier
const LOOKS: LookItem[] = [
  {
    id: 'look-01',
    code: 'OX-01 Tactical',
    name: 'Ballistic Parka Shell',
    category: 'Outerwear',
    image: '/fashion/look1.jpg',
    spec: 'Cordura 500D · DWR Coating',
    width: 390,
    height: 490,
    marginTop: 60,
  },
  {
    id: 'look-02',
    code: 'OX-02 Kimono',
    name: 'Cyber Atelier Drape',
    category: 'Avant-Garde',
    image: '/fashion/look2.jpg',
    spec: 'Laser Seams · Acid Webbing',
    width: 430,
    height: 540,
    marginTop: -30,
  },
  {
    id: 'look-03',
    code: 'OX-03 Modular',
    name: 'Tactical Chest Rig',
    category: 'Hardware',
    image: '/fashion/look3.jpg',
    spec: 'Fidlock® Buckles · Molle Matrix',
    width: 580,
    height: 580,
    marginTop: 70,
  },
  {
    id: 'look-04',
    code: 'OX-04 Runway',
    name: 'Laser Bungee Cargos',
    category: 'Trousers',
    image: '/fashion/look4.jpg',
    spec: 'Articulated Knee · Kinetic Fit',
    width: 360,
    height: 460,
    marginTop: -80,
  },
  {
    id: 'look-05',
    code: 'OX-05 Director',
    name: 'Chiaroscuro Tailored Coat',
    category: 'Couture',
    image: '/fashion/look5.jpg',
    spec: 'Milk Collar · Sculptural Wool',
    width: 340,
    height: 440,
    marginTop: 40,
  },
  {
    id: 'look-06',
    code: 'OX-06 Heavy',
    name: '500GSM Boxy Hoodie',
    category: 'Fleece',
    image: '/fashion/look6.jpg',
    spec: 'Milk White · Neon Screenprint',
    width: 440,
    height: 520,
    marginTop: -40,
  },
  {
    id: 'look-07',
    code: 'OX-07 Sneaker',
    name: 'Carbon High-Top Unit',
    category: 'Footwear',
    image: '/fashion/look7.jpg',
    spec: 'Luminescent Sole · Carbon Plate',
    width: 370,
    height: 470,
    marginTop: 30,
  },
];

export function CreatorGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isHoveredRef = useRef(false);
  const hoveredIndexRef = useRef<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Double repeat for seamless infinite glitch-free wrapping
  const items = [...LOOKS, ...LOOKS];

  useEffect(() => {
    if (!containerRef.current) return;

    const isMobile = window.innerWidth <= 768;
    const scale = isMobile ? 0.65 : 1.0;
    const gap = isMobile ? 40 : 60;

    // Precalculate cumulative track positions
    let cumulative = 0;
    const offsets: number[] = [];
    const widths: number[] = [];

    items.forEach((item, idx) => {
      const w = item.width * scale;
      offsets.push(cumulative);
      widths.push(w);
      cumulative += w + gap;

      const el = cardElementsRef.current[idx];
      if (el) {
        el.style.width = `${w}px`;
        el.style.height = `${item.height * scale}px`;
        el.style.marginTop = `${item.marginTop * scale}px`;
      }
    });

    const totalTrackLength = cumulative;

    let animId: number;
    let virtualScroll = 0;
    let lastTime = performance.now();
    let scrollVelocityBonus = 0;

    // Track scroll velocity via ScrollTrigger to dynamically accelerate conveyor
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const vel = self.getVelocity();
        scrollVelocityBonus += Math.abs(vel) * 0.0004;
      },
    });

    const tick = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;

      // Smooth decay of scroll boost
      scrollVelocityBonus *= 0.93;

      // Base speed: when hovered, slow to 0.04 (almost frozen); otherwise smooth glide
      const speedMultiplier = isHoveredRef.current ? 0.04 : 0.85 + scrollVelocityBonus;
      virtualScroll += dt * speedMultiplier * 0.08;

      const currentScroll = virtualScroll % totalTrackLength;

      // 100% Glitch-free modulo wrapping algorithm
      cardElementsRef.current.forEach((el, idx) => {
        if (!el) return;
        const w = widths[idx];
        const initialX = offsets[idx];

        let posX = (initialX - currentScroll) % totalTrackLength;
        // If card scrolls past left edge, wrap around seamlessly to right edge
        if (posX < -w - gap) {
          posX += totalTrackLength;
        }

        // Sinusoidal vertical floating wave
        const waveY = Math.sin(initialX * 0.002 + virtualScroll * 0.0008) * (isMobile ? 18 : 32);

        el.style.transform = `translateX(${posX}px) translateY(calc(-50% + ${waveY}px))`;

        const isCurrentHover = hoveredIndexRef.current === idx;
        const targetZ = isCurrentHover ? 260 : 100 + (idx % 20);
        if (el.style.zIndex !== `${targetZ}`) {
          el.style.zIndex = `${targetZ}`;
        }
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      scrollTrigger.kill();
    };
  }, [items]);

  return (
    <section
      id="creator-grid"
      ref={containerRef}
      className="relative w-full overflow-hidden select-none bg-[#0a0a0c]"
      style={{
        minHeight: '1080px',
        backgroundImage: `
          radial-gradient(80% 80% at 50% 50%, rgba(0, 255, 102, 0.07) 0%, rgba(10, 10, 12, 0) 70%),
          radial-gradient(120% 120% at 10% 20%, rgba(24, 24, 27, 0.9) 0%, rgba(10, 10, 12, 1) 100%)
        `,
      }}
    >
      {/* Background Cyber Grid Lines */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Top Left Split Headline with mix-blend-exclusion */}
      <h2 className="absolute left-6 sm:left-14 md:left-20 top-16 sm:top-24 z-30 pointer-events-none text-[#faf9f6] mix-blend-exclusion leading-[0.85] tracking-[-0.05em] font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] uppercase select-none">
        <span className="block text-[#faf9f6]">ATELIER</span>
        <span className="block text-[#00ff66]">COUTURE</span>
      </h2>

      {/* Bottom Right Split Headline with mix-blend-exclusion */}
      <h2 className="absolute right-6 sm:right-14 md:right-20 bottom-16 sm:bottom-24 z-30 pointer-events-none text-[#faf9f6] mix-blend-exclusion leading-[0.85] tracking-[-0.05em] font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] uppercase select-none text-right">
        <span className="block text-[#00ff66]">OXID</span>
        <span className="block text-[#faf9f6]">DROPS</span>
      </h2>

      {/* Bottom Left Paragraph Copy with mix-blend-exclusion */}
      <div className="absolute left-6 sm:left-14 md:left-20 bottom-16 sm:bottom-24 z-30 pointer-events-none text-[#f5f5f0] mix-blend-exclusion max-w-sm sm:max-w-md select-none text-sm sm:text-base font-mono leading-relaxed">
        <div className="text-[#00ff66] font-bold text-xs uppercase tracking-widest mb-1.5">
          Archive Collection 01 — 07
        </div>
        Engineered for high-density environments. Every garment is cut from ballistic cordura, technical membranes, and magnetic hardware in limited sovereign runs.
      </div>

      {/* Flowing Streetwear Conveyor Riding Through the Center */}
      <div
        ref={streamRef}
        className="relative w-full h-[1080px] overflow-hidden"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          hoveredIndexRef.current = null;
          setHoveredIdx(null);
        }}
      >
        {items.map((c, i) => {
          const isCurrentHovered = hoveredIdx === i;
          return (
            <div
              key={`${c.id}-${i}`}
              ref={(el) => {
                cardElementsRef.current[i] = el;
              }}
              onMouseEnter={() => {
                hoveredIndexRef.current = i;
                setHoveredIdx(i);
              }}
              onMouseLeave={() => {
                if (hoveredIndexRef.current === i) {
                  hoveredIndexRef.current = null;
                  setHoveredIdx(null);
                }
              }}
              className="creator absolute top-1/2 left-0 will-change-transform cursor-pointer group rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 border border-[#27272a] hover:border-[#00ff66] hover:shadow-[0_0_35px_rgba(0,255,102,0.4)]"
              style={{
                width: `${c.width}px`,
                height: `${c.height}px`,
                marginTop: `${c.marginTop}px`,
              }}
            >
              <div className="block w-full h-full relative bg-[#121214]">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92] contrast-[1.1] group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/90 via-[#0a0a0c]/20 to-transparent pointer-events-none" />

                {/* Bottom Garment Name Tag with Technical Specs */}
                <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between text-white">
                  <div>
                    <div className="text-[11px] font-mono text-[#00ff66] tracking-wider mb-0.5">
                      {c.code}
                    </div>
                    <div className="text-lg sm:text-xl font-display font-bold tracking-tight text-[#faf9f6]">
                      {c.name}
                    </div>
                    <div className="text-[11px] font-mono text-[#a1a1aa] mt-0.5">
                      {c.spec}
                    </div>
                  </div>

                  {/* Neon Quick Action Trigger */}
                  <div className="w-10 h-10 rounded-full bg-[#18181b]/90 backdrop-blur-md border border-[#27272a] group-hover:border-[#00ff66] group-hover:bg-[#00ff66] text-[#f5f5f0] group-hover:text-black flex items-center justify-center transition-all duration-300 shadow-lg group-hover:scale-110 shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 19 19"
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 9.5h10.5m-5.25 5.25L14.5 9.5 9.25 4.25"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
