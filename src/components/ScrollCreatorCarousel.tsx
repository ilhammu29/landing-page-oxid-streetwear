'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CARDS = [
  {
    id: 'card8',
    image: 'https://c14.patreon.com/thumbnail_Component_Card_8_dbf120bf79.png',
  },
  {
    id: 'card11',
    image: 'https://c14.patreon.com/thumbnail_Component_Card_11_18b523208f.png',
  },
  {
    id: 'card6',
    image: 'https://c14.patreon.com/thumbnail_Component_Card_6_00ed3428aa.png',
  },
];

export function ScrollCreatorCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const rotateCard = (nextIndex: number) => {
    if (!cardRef.current || nextIndex === activeIdx) return;

    // Patreon's exact 45 degree rotational motion
    gsap.to(cardRef.current, {
      rotation: -35,
      x: -70,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIdx(nextIndex);
        gsap.fromTo(
          cardRef.current,
          { rotation: 35, x: 70, opacity: 0 },
          {
            rotation: 0,
            x: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'back.out(1.2)',
          }
        );
      },
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      rotateCard((activeIdx + 1) % CARDS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIdx]);

  return (
    <section
      id="creative-control"
      ref={sectionRef}
      className="py-24 sm:py-36 px-6 sm:px-12 bg-white border-t border-neutral-100 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Patreon Text */}
          <div className="lg:col-span-6 space-y-6 max-w-xl">
            <h2 className="text-5xl sm:text-7xl font-normal tracking-[-0.05em] text-black leading-[1.02]">
              Complete creative control
            </h2>
            <p className="text-lg sm:text-2xl text-neutral-600 leading-relaxed font-normal">
              Patreon is your space to create what excites you most, rough or polished, big or small. Hundreds of thousands of creators use Patreon to share videos, podcasts, writing, art, music, recipes, and more with their most passionate fans.
            </p>
          </div>

          {/* Right Column: Rotating Component Card */}
          <div className="lg:col-span-6 flex items-center justify-center p-4">
            <div
              ref={cardRef}
              onClick={() => rotateCard((activeIdx + 1) % CARDS.length)}
              className="relative w-full max-w-md cursor-pointer will-change-transform drop-shadow-2xl"
            >
              <img
                src={CARDS[activeIdx].image}
                alt="Patreon Multi-format Creative Experience"
                className="w-full h-auto object-contain block rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
