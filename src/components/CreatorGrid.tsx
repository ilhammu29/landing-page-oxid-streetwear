'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface LookItem {
  id: string;
  code: string;
  jp: string;
  name: string;
  category: string;
  image: string;
  spec: string;
  width: number;
  height: number;
  marginTop: number;
}

// 7 Sovereign Streetwear Looks from OXID STUDIO Atelier
const LOOKS: LookItem[] = [
  {
    id: 'look-01',
    code: 'OX-01',
    jp: '戦術パーカー',
    name: 'Ballistic Parka Shell',
    category: 'Outerwear',
    image: '/fashion/look1.jpg',
    spec: 'Cordura 500D · DWR Coating',
    width: 390,
    height: 500,
    marginTop: 40,
  },
  {
    id: 'look-02',
    code: 'OX-02',
    jp: 'サイバー着物',
    name: 'Cyber Atelier Drape',
    category: 'Avant-Garde',
    image: '/fashion/look2.jpg',
    spec: 'Laser Seams · Acid Webbing',
    width: 440,
    height: 550,
    marginTop: -25,
  },
  {
    id: 'look-03',
    code: 'OX-03',
    jp: '戦術リグ',
    name: 'Tactical Chest Rig',
    category: 'Hardware',
    image: '/fashion/look3.jpg',
    spec: 'Fidlock® Buckles · Molle Matrix',
    width: 520,
    height: 540,
    marginTop: 50,
  },
  {
    id: 'look-04',
    code: 'OX-04',
    jp: 'レーザーカーゴ',
    name: 'Laser Bungee Cargos',
    category: 'Trousers',
    image: '/fashion/look4.jpg',
    spec: 'Articulated Knee · Kinetic Fit',
    width: 380,
    height: 480,
    marginTop: -45,
  },
  {
    id: 'look-05',
    code: 'OX-05',
    jp: 'ディレクターコート',
    name: 'Chiaroscuro Tailored Coat',
    category: 'Couture',
    image: '/fashion/look5.jpg',
    spec: 'Milk Collar · Sculptural Wool',
    width: 360,
    height: 460,
    marginTop: 35,
  },
  {
    id: 'look-06',
    code: 'OX-06',
    jp: 'ヘビーフーディ',
    name: '500GSM Boxy Hoodie',
    category: 'Fleece',
    image: '/fashion/look6.jpg',
    spec: 'Milk White · Neon Screenprint',
    width: 430,
    height: 530,
    marginTop: -30,
  },
  {
    id: 'look-07',
    code: 'OX-07',
    jp: 'カーボンハイ',
    name: 'Carbon High-Top Unit',
    category: 'Footwear',
    image: '/fashion/look7.jpg',
    spec: 'Luminescent Sole · Carbon Plate',
    width: 380,
    height: 470,
    marginTop: 20,
  },
];

export function CreatorGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const dragScrollStartRef = useRef(0);

  // Triple repeat for truly infinite seamless conveyor
  const sets = [LOOKS, LOOKS, LOOKS];

  // Animated scroll state in ref for 60fps buttery transform
  const virtualScrollRef = useRef(0);
  const speedRef = useRef(0.75);
  const singleSetWidthRef = useRef(3200);

  // Recalculate track geometry
  const updateTrackMetrics = useCallback(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.innerWidth <= 768;
    const scale = isMobile ? 0.68 : 1.0;
    const gap = isMobile ? 32 : 56;

    let setWidth = 0;
    LOOKS.forEach((item) => {
      setWidth += item.width * scale + gap;
    });
    singleSetWidthRef.current = setWidth;
  }, []);

  useEffect(() => {
    updateTrackMetrics();
    window.addEventListener('resize', updateTrackMetrics);
    return () => window.removeEventListener('resize', updateTrackMetrics);
  }, [updateTrackMetrics]);

  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;

    let animId: number;
    let lastTime = performance.now();
    let scrollBoost = 0;

    // Connect ScrollTrigger velocity for dynamic physics response
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const vel = self.getVelocity();
        scrollBoost += Math.abs(vel) * 0.00035;
      },
    });

    const renderLoop = (now: number) => {
      const dt = Math.min(now - lastTime, 40);
      lastTime = now;

      scrollBoost *= 0.94;

      if (!isDraggingRef.current) {
        const activeSpeed = isPaused ? 0.05 : speedRef.current + scrollBoost;
        virtualScrollRef.current += dt * activeSpeed * 0.07;
      }

      const singleWidth = singleSetWidthRef.current || 3200;
      // Flawless modulo: normalize to [0, singleWidth)
      const currentOffset = ((virtualScrollRef.current % singleWidth) + singleWidth) % singleWidth;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(-${currentOffset}px, 0, 0)`;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      scrollTrigger.kill();
    };
  }, [isPaused]);

  // Touch and Mouse Drag interactions
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    dragScrollStartRef.current = virtualScrollRef.current;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = startXRef.current - e.clientX;
    virtualScrollRef.current = dragScrollStartRef.current + deltaX * 1.5;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].clientX;
    dragScrollStartRef.current = virtualScrollRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = startXRef.current - e.touches[0].clientX;
    virtualScrollRef.current = dragScrollStartRef.current + deltaX * 1.5;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const nudgeConveyor = (direction: -1 | 1) => {
    virtualScrollRef.current += direction * 450;
  };

  return (
    <section
      id="creator-grid"
      ref={containerRef}
      className="relative w-full overflow-hidden select-none bg-[#0a0a0c] pt-24 pb-20"
      style={{
        minHeight: '1000px',
        backgroundImage: `
          radial-gradient(75% 75% at 50% 50%, rgba(0, 255, 102, 0.05) 0%, rgba(10, 10, 12, 0) 70%),
          radial-gradient(120% 120% at 20% 10%, rgba(20, 20, 24, 0.8) 0%, rgba(10, 10, 12, 1) 100%)
        `,
      }}
    >
      {/* Background Cyber Blueprint Grid Lines */}
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

      {/* Top Left Headline: ATELIER COUTURE */}
      <div className="absolute left-6 sm:left-14 md:left-20 top-14 sm:top-20 z-30 pointer-events-none mix-blend-exclusion">
        <div className="text-[11px] font-mono tracking-widest text-[#00ff66] uppercase mb-1 flex items-center gap-2">
          <span>02 ARCHIVE COLLECTION</span>
          <span className="text-[#a1a1aa]">·</span>
          <span>アーカイブ</span>
        </div>
        <h2 className="text-[#faf9f6] leading-[0.85] tracking-[-0.05em] font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] uppercase">
          <span className="block text-[#faf9f6]">ATELIER</span>
          <span className="block text-[#00ff66]">COUTURE</span>
        </h2>
      </div>

      {/* Bottom Right Headline: OXID DROPS */}
      <div className="absolute right-6 sm:right-14 md:right-20 bottom-12 sm:bottom-16 z-30 pointer-events-none mix-blend-exclusion text-right">
        <h2 className="text-[#faf9f6] leading-[0.85] tracking-[-0.05em] font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] uppercase">
          <span className="block text-[#00ff66]">OXID</span>
          <span className="block text-[#faf9f6]">DROPS</span>
        </h2>
        <div className="text-[11px] font-mono tracking-widest text-[#a1a1aa] uppercase mt-2">
          TOKYO · PARIS · SOVEREIGN SPEC
        </div>
      </div>

      {/* Manual Conveyor Controls */}
      <div className="absolute right-6 sm:right-14 md:right-20 top-14 sm:top-20 z-30 flex items-center gap-2">
        <button
          onClick={() => nudgeConveyor(-1)}
          className="w-11 h-11 rounded-none border border-[#27272a] bg-[#121214]/80 backdrop-blur-md flex items-center justify-center text-[#faf9f6] hover:text-[#00ff66] hover:border-[#00ff66] transition shadow-lg cursor-pointer"
          aria-label="Previous look"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => nudgeConveyor(1)}
          className="w-11 h-11 rounded-none border border-[#27272a] bg-[#121214]/80 backdrop-blur-md flex items-center justify-center text-[#faf9f6] hover:text-[#00ff66] hover:border-[#00ff66] transition shadow-lg cursor-pointer"
          aria-label="Next look"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Main Continuous Glitch-Free Conveyor Stream */}
      <div
        className="relative w-full h-[760px] sm:h-[840px] my-auto overflow-hidden flex items-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          isDraggingRef.current = false;
          setHoveredIdx(null);
        }}
      >
        {/* Continuous Horizontal Strip Translating as ONE Unified Block */}
        <div
          ref={trackRef}
          className="flex items-center gap-8 sm:gap-14 will-change-transform"
        >
          {sets.map((setArray, setIndex) => (
            <div key={`set-${setIndex}`} className="flex items-center gap-8 sm:gap-14 shrink-0">
              {setArray.map((look, i) => {
                const uniqueKey = `${look.id}-s${setIndex}-${i}`;
                const isLook2 = look.id === 'look-02';

                return (
                  <div
                    key={uniqueKey}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`relative shrink-0 rounded-none overflow-hidden transition-all duration-300 border ${
                      isLook2
                        ? 'border-[#00ff66]/70 shadow-[0_0_30px_rgba(0,255,102,0.25)]'
                        : 'border-[#27272a] hover:border-[#00ff66] hover:shadow-[0_0_30px_rgba(0,255,102,0.3)]'
                    } group bg-[#111114]`}
                    style={{
                      width: `${look.width}px`,
                      height: `${look.height}px`,
                      marginTop: `${look.marginTop}px`,
                    }}
                  >
                    {/* Look Image with Clean Pan-Zoom Hover */}
                    <div className="w-full h-full relative overflow-hidden">
                      <img
                        src={look.image}
                        alt={look.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92] contrast-[1.12] group-hover:brightness-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/25 to-transparent pointer-events-none" />

                      {/* Top Japanese Watermark / Spec Index */}
                      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-[#00ff66] font-bold tracking-wider">
                          {look.code} · {look.jp}
                        </span>
                        <span className="text-[#71717a] uppercase tracking-widest text-[9px]">
                          {look.category}
                        </span>
                      </div>

                      {/* Bottom Technical Spec Information Card */}
                      <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between">
                        <div>
                          <div className="text-lg sm:text-xl font-display font-bold tracking-tight text-[#faf9f6] group-hover:text-[#00ff66] transition-colors">
                            {look.name}
                          </div>
                          <div className="text-xs font-mono text-[#a1a1aa] mt-1 flex items-center gap-2">
                            <span>{look.spec}</span>
                          </div>
                        </div>

                        {/* Quick View Trigger Button */}
                        <div className="w-10 h-10 rounded-none bg-[#18181b]/90 border border-[#27272a] group-hover:border-[#00ff66] group-hover:bg-[#00ff66] text-[#faf9f6] group-hover:text-black flex items-center justify-center transition-all duration-300 shrink-0">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
