'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SlideItem {
  id: string;
  line1: string;
  line2: string;
  creatorName: string;
  creatorAvatar: string;
  creatorBio: string;
  creatorUrl: string;
  mediaType: 'video' | 'image';
  mediaUrl: string;
  posterUrl?: string;
  tag: string;
}

const SLIDES: SlideItem[] = [
  {
    id: 'drop01',
    line1: 'SOVEREIGN',
    line2: 'STREETWEAR',
    creatorName: 'Drop 01 — Tactical Parka',
    creatorAvatar: '/fashion/look1.jpg',
    creatorBio: 'Weatherproof ballistic cordura with acid neon webbing',
    creatorUrl: '#creator-grid',
    mediaType: 'video',
    mediaUrl: '/fashion/oxid-runway-120bpm.mp4',
    posterUrl: '/fashion/look1.jpg',
    tag: 'Autumn Runway',
  },
  {
    id: 'drop02',
    line1: 'ENGINEERED',
    line2: 'CYBER BRUTALISM',
    creatorName: 'Drop 02 — Tokyo Kimono',
    creatorAvatar: '/fashion/look2.jpg',
    creatorBio: 'Avant-garde oversized drape with laser-bonded seams',
    creatorUrl: '#creator-grid',
    mediaType: 'image',
    mediaUrl: '/fashion/look2.jpg',
    tag: 'Limited Capsule',
  },
  {
    id: 'drop03',
    line1: 'MODULAR',
    line2: 'TACTICAL COUTURE',
    creatorName: 'Drop 03 — Chest Rig Vest',
    creatorAvatar: '/fashion/look3.jpg',
    creatorBio: 'Fidlock® magnetic quick-release and utility cargo specs',
    creatorUrl: '#creator-grid',
    mediaType: 'image',
    mediaUrl: '/fashion/look3.jpg',
    tag: 'Hardware Spec',
  },
  {
    id: 'drop04',
    line1: 'KINETIC',
    line2: 'RUNWAY MOVEMENT',
    creatorName: 'Drop 04 — Laser Cargo',
    creatorAvatar: '/fashion/look4.jpg',
    creatorBio: 'Articulated ballistic pants engineered for kinetic movement',
    creatorUrl: '#creator-grid',
    mediaType: 'image',
    mediaUrl: '/fashion/look4.jpg',
    tag: 'High-Vis Spec',
  },
  {
    id: 'drop05',
    line1: 'HEAVYWEIGHT',
    line2: '500GSM FLEECE',
    creatorName: 'Drop 05 — Milk Hoodie',
    creatorAvatar: '/fashion/look6.jpg',
    creatorBio: 'Milk white boxy brutalism with high-density neon ink',
    creatorUrl: '#creator-grid',
    mediaType: 'image',
    mediaUrl: '/fashion/look6.jpg',
    tag: 'Signature Drop',
  },
];

interface HeroSliderProps {
  onNavigate: (sectionId: string) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export function HeroSlider({ onNavigate, onOpenAuth }: HeroSliderProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [zone, setZone] = useState<-1 | 0 | 1>(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const avatarImgRef = useRef<HTMLImageElement>(null);
  const avatarWrapRef = useRef<HTMLDivElement>(null);
  const arrowBtnRef = useRef<HTMLButtonElement>(null);
  const isAnimatingRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);

  // Patreon exact clipPath inset mask line reveal animation
  const animateLinesTransition = useCallback((
    outgoingElements: HTMLElement[],
    onMidpoint: () => void,
    onDone: () => void
  ) => {
    const tl = gsap.timeline({
      onComplete: onDone,
    });

    // 1. Outgoing lines with inset clip-path
    if (outgoingElements.length > 0) {
      outgoingElements.forEach((el, i) => {
        const proxy = { yPercent: 0 };
        tl.to(
          proxy,
          {
            yPercent: 100,
            duration: 0.45,
            ease: 'expo.in',
            onUpdate: () => {
              const n = proxy.yPercent;
              gsap.set(el, {
                yPercent: n,
                clipPath: `inset(${-n + 10}% -10% ${n - 10}% -10%)`,
              });
            },
          },
          i * 0.04
        );
      });
    }

    // Avatar zoom out
    if (avatarImgRef.current) {
      tl.to(avatarImgRef.current, { scale: 1.6, duration: 0.45, ease: 'power2.in' }, 0);
    }

    // Midpoint: switch active slide
    tl.call(() => {
      onMidpoint();
    });

    // 2. Incoming lines reveal
    tl.call(() => {
      const incoming = [line1Ref.current, line2Ref.current].filter(Boolean) as HTMLElement[];
      incoming.forEach((el, i) => {
        const proxy = { yPercent: -100 };
        gsap.set(el, {
          yPercent: -100,
          clipPath: `inset(110% -10% -110% -10%)`,
        });
        gsap.to(proxy, {
          yPercent: 0,
          duration: 0.65,
          delay: 0.08 + i * 0.06,
          ease: 'power3.out',
          onUpdate: () => {
            const n = proxy.yPercent;
            gsap.set(el, {
              yPercent: n,
              clipPath: `inset(${-n + 10}% -10% ${n - 10}% -10%)`,
            });
          },
        });
      });

      if (avatarImgRef.current && avatarWrapRef.current) {
        gsap.fromTo(
          avatarImgRef.current,
          { scale: 1.6 },
          { scale: 1, duration: 0.55, ease: 'power2.out', delay: 0.1 }
        );
        gsap.fromTo(
          avatarWrapRef.current,
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)', delay: 0.05 }
        );
      }
    });
  }, []);

  const changeSlide = useCallback((newIndex: number) => {
    if (isAnimatingRef.current || newIndex === activeIdx) return;
    isAnimatingRef.current = true;

    const nextIdx = (newIndex + SLIDES.length) % SLIDES.length;
    const lines = [line1Ref.current, line2Ref.current].filter(Boolean) as HTMLElement[];

    animateLinesTransition(
      lines,
      () => {
        setActiveIdx(nextIdx);
      },
      () => {
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 300);
      }
    );
  }, [activeIdx, animateLinesTransition]);

  // Mouse move handler for split-screen navigation zones
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    setIsHovering(true);
    setZone(relX < rect.width / 2 ? -1 : 1);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setZone(0);
  };

  // Full-hero click navigation
  const handleHeroClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('a') ||
      target.closest('.creator-pill')
    ) {
      return;
    }
    if (zone === -1) changeSlide(activeIdx - 1);
    else changeSlide(activeIdx + 1);
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) changeSlide(activeIdx - 1);
      else changeSlide(activeIdx + 1);
    }
    touchStartXRef.current = null;
  };

  // Autoplay loop every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      changeSlide(activeIdx + 1);
    }, 6500);
    return () => clearInterval(timer);
  }, [activeIdx, changeSlide]);

  // Bouncing arrow loop exactly like Patreon production
  useEffect(() => {
    if (!arrowBtnRef.current) return;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.5 });
    tl.fromTo(
      arrowBtnRef.current,
      { y: '0%' },
      { y: '25%', duration: 0.5, ease: 'bounce.easeIn' }
    ).to(
      arrowBtnRef.current,
      { y: '0%', duration: 0.2, ease: 'circ.easeOut' },
      0.5
    );
    return () => {
      tl.kill();
    };
  }, []);

  // Parallax glide on scroll
  useEffect(() => {
    if (!heroRef.current || !mediaWrapRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (mediaWrapRef.current) {
          gsap.set(mediaWrapRef.current, {
            yPercent: self.progress * 25,
            scale: 1 + self.progress * 0.06,
          });
        }
        if (contentRef.current) {
          gsap.set(contentRef.current, {
            yPercent: -self.progress * 20,
            opacity: 1 - self.progress * 1.3,
          });
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const slide = SLIDES[activeIdx];

  return (
    <section
      ref={heroRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleHeroClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#0a0a0c] text-[#f5f5f0] pt-28 pb-10 select-none ${
        zone === -1 ? 'cursor-w-resize' : zone === 1 ? 'cursor-e-resize' : 'cursor-default'
      }`}
    >
      {/* Background Media Layers with Parallax Glide */}
      <div
        ref={mediaWrapRef}
        className="absolute inset-0 -top-12 -bottom-12 z-0 overflow-hidden pointer-events-none will-change-transform"
      >
        {SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {s.mediaType === 'video' ? (
              <video
                src={s.mediaUrl}
                poster={s.posterUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.15]"
              />
            ) : (
              <div
                className="w-full h-full bg-cover bg-center filter brightness-[0.55] contrast-[1.15]"
                style={{ backgroundImage: `url(${s.mediaUrl})` }}
              />
            )}
            {/* Matte Black Cinematic Vignette with Neon Cyber Edge */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-[#0a0a0c]/70" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,12,0.85)_100%)]" />
          </div>
        ))}
      </div>

      {/* Top Editorial Status Line */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 sm:px-12 flex items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-widest text-[#a1a1aa]">
        <div className="flex items-center gap-3">
          <span className="text-[#faf9f6] font-medium tracking-wider">Autumn Winter Capsule</span>
          <span className="text-[#3f3f46]">·</span>
          <span className="text-[#a1a1aa]">Oxid Studio Edition</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#a1a1aa] tracking-widest">
          <span>Edition 01 — 05</span>
        </div>
      </div>

      {/* Floating Left Zone Chevron */}
      <div
        className={`pointer-events-none absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 z-30 transition-all duration-300 ${
          zone === -1 && isHovering ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-90 -translate-x-3'
        }`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            changeSlide(activeIdx - 1);
          }}
          className="pointer-events-auto w-13 h-13 rounded-full border border-[#00ff66]/40 bg-[#0a0a0c]/80 backdrop-blur-md flex items-center justify-center text-[#f5f5f0] shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:border-[#00ff66] hover:scale-105 transition"
          aria-label="Previous drop slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 text-[#00ff66]">
            <path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* Floating Right Zone Chevron */}
      <div
        className={`pointer-events-none absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 z-30 transition-all duration-300 ${
          zone === 1 && isHovering ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-90 translate-x-3'
        }`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            changeSlide(activeIdx + 1);
          }}
          className="pointer-events-auto w-13 h-13 rounded-full border border-[#00ff66]/40 bg-[#0a0a0c]/80 backdrop-blur-md flex items-center justify-center text-[#f5f5f0] shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:border-[#00ff66] hover:scale-105 transition"
          aria-label="Next drop slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 text-[#00ff66]">
            <path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Main Content Area */}
      <div
        ref={contentRef}
        className="relative z-20 max-w-[1440px] w-full mx-auto px-6 sm:px-12 flex-1 flex flex-col justify-center will-change-transform"
      >
        <div className="max-w-6xl">
          {/* Big Editorial Headline in Milk White */}
          <h1 className="text-[7.2vw] sm:text-[5.6vw] md:text-6xl lg:text-[5.4rem] font-display font-extrabold tracking-[-0.04em] leading-[0.92] mb-8 text-[#faf9f6] uppercase overflow-hidden">
            <span
              ref={line1Ref}
              className="block font-light text-[#f5f5f0] will-change-transform"
              style={{ clipPath: 'inset(0% -10% 0% -10%)' }}
            >
              {slide.line1}
            </span>
            <span
              ref={line2Ref}
              className="block font-extrabold text-[#faf9f6] will-change-transform"
              style={{ clipPath: 'inset(0% -10% 0% -10%)' }}
            >
              {slide.line2}
            </span>
          </h1>

          {/* Streetwear Drop Spec Pill */}
          <a
            href={slide.creatorUrl}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('creator-grid');
            }}
            className="creator-pill inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-[#121214]/90 hover:bg-[#18181b] backdrop-blur-xl border border-[#27272a] hover:border-[#00ff66] transition-all duration-300 group max-w-full shadow-2xl"
          >
            <div
              ref={avatarWrapRef}
              className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#00ff66]/50 shadow-[0_0_10px_rgba(0,255,102,0.4)]"
            >
              <img
                ref={avatarImgRef}
                src={slide.creatorAvatar}
                alt={slide.creatorName}
                className="w-full h-full object-cover will-change-transform"
              />
            </div>
            <div className="text-xs sm:text-sm truncate pr-2 font-mono">
              <span className="font-bold text-[#faf9f6] group-hover:text-[#00ff66] transition-colors">
                {slide.creatorName}
              </span>{' '}
              <span className="text-[#a1a1aa] font-normal hidden sm:inline">
                — {slide.creatorBio}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 19 19"
                className="w-4 h-4 inline-block ml-2 text-[#00ff66] transition-transform duration-300 group-hover:translate-x-1.5"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.75"
                  d="M4 9.5h10.5m-5.25 5.25L14.5 9.5 9.25 4.25"
                />
              </svg>
            </div>
          </a>
        </div>
      </div>

      {/* Bottom Control Row */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 sm:px-12 flex items-center justify-between">
        <div className="text-xs font-mono text-[#a1a1aa] tracking-widest flex items-center gap-2 select-none">
          <span className="text-[#00ff66] font-bold">0{activeIdx + 1}</span>
          <span>/</span>
          <span>0{SLIDES.length}</span>
          <span className="text-[#52525b] ml-2 hidden sm:inline">AUTONOMOUS ATELIER</span>
        </div>

        {/* Bouncing Arrow Down Button */}
        <button
          ref={arrowBtnRef}
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('creator-grid');
          }}
          className="w-12 h-12 rounded-full border border-[#27272a] hover:border-[#00ff66] bg-[#121214]/80 backdrop-blur-md flex items-center justify-center text-[#f5f5f0] hover:text-[#00ff66] transition hover:shadow-[0_0_20px_rgba(0,255,102,0.4)] cursor-pointer shadow-lg will-change-transform"
          aria-label="Scroll down to lookbook archive"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 78 77"
            className="w-4 h-4 fill-current"
          >
            <path
              d="M43.5 0v59.244l27.34-26.955 6.319 6.408-35 34.507L39 76.319l-3.16-3.115-35-34.507 6.319-6.408L34.5 59.244V0h9z"
            />
          </svg>
        </button>

        <div className="text-xs font-mono text-[#71717a] tracking-widest hidden sm:block select-none">
          SWIPE / CLICK TO ADVANCE
        </div>
      </div>
    </section>
  );
}
