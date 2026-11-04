'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RAPID_WORDS = [
  { jp: '主 権', en: 'SOVEREIGNTY', code: 'SYS.01' },
  { jp: '自律型アトリエ', en: 'AUTONOMOUS ATELIER', code: 'SYS.02' },
  { jp: 'コーデュラ 500D', en: 'BALLISTIC SHELL', code: 'MAT.03' },
  { jp: '磁気機構', en: 'FIDLOCK HARDWARE', code: 'MEC.04' },
  { jp: '暗号化 NFC', en: 'ENCRYPTED CHIP', code: 'PRV.05' },
  { jp: '動体関節設計', en: 'KINETIC TAILORING', code: 'FIT.06' },
  { jp: 'オキシド・スタジオ', en: 'OXID STUDIO', code: 'LOC.07' },
  { jp: '主権を、纏え。', en: 'SOVEREIGN STREETWEAR', code: 'ACT.08' },
];

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [hexHash, setHexHash] = useState('0x77A4·E8F9');
  const [frameTick, setFrameTick] = useState(104);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // High-speed non-linear progress counter (0 to 100% in ~2.0 seconds)
    const startTime = Date.now();
    const duration = 2000; // 2.0s fast tempo

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(1, elapsed / duration);
      // Fast exponential velocity curve
      const easeVal = t < 0.65 ? Math.pow(t / 0.65, 1.7) * 82 : 82 + ((t - 0.65) / 0.35) * 18;
      const currentPct = Math.min(100, Math.floor(easeVal));
      setProgress(currentPct);

      if (t >= 1) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setIsDone(true);
          if (onComplete) onComplete();
        }, 220);
      }
    }, 16);

    // High-speed rapid text strobing (every 160ms - intense kinetic tempo)
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % RAPID_WORDS.length);
      const randomHex = '0x' + Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase().padStart(6, '0');
      setHexHash(`${randomHex}·COR·77`);
      setFrameTick((f) => f + 7);
    }, 160);

    return () => {
      clearInterval(progressInterval);
      clearInterval(wordInterval);
    };
  }, [onComplete]);

  const currentWord = RAPID_WORDS[wordIndex];

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-50 overflow-hidden bg-[#0a0a0c] text-[#faf9f6] flex flex-col justify-between select-none pointer-events-auto"
        >
          {/* Shutter Top Half */}
          <motion.div
            exit={{ y: '-100%', transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#0a0a0c] border-b border-[#27272a] pointer-events-none z-10"
          />

          {/* Shutter Bottom Half */}
          <motion.div
            exit={{ y: '100%', transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0a0a0c] border-t border-[#27272a] pointer-events-none z-10"
          />

          {/* Background Technical Coordinate Grid */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 255, 102, 0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 255, 102, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
            }}
          />

          {/* Rapid Vertical Laser Scanline */}
          <motion.div
            animate={{ y: ['-100%', '1100%'] }}
            transition={{ repeat: Infinity, duration: 1.0, ease: 'linear' }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00ff66] to-transparent shadow-[0_0_20px_#00ff66] pointer-events-none z-20"
          />

          {/* Top Telemetry Header */}
          <div className="relative z-30 p-6 sm:p-10 flex items-start justify-between font-mono text-[11px] tracking-widest text-[#71717a]">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#faf9f6] font-bold">
                <div className="w-2.5 h-2.5 bg-[#00ff66] animate-ping" />
                <span>OXID STUDIO</span>
                <span className="text-[#00ff66]">/ オキシド</span>
              </div>
              <div className="text-[10px] text-[#52525b]">
                AUTONOMOUS ATELIER · TOKYO &bull; PARIS
              </div>
              <div className="text-[9px] text-[#00ff66]/80">
                LAT: 35.6762° N · LON: 139.6503° E
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="text-[#00ff66] font-bold">120 BPM KINETIC SYSTEM</div>
              <div className="text-[10px] text-[#a1a1aa]">TICK: FR_{frameTick}</div>
              <div className="text-[9px] text-[#52525b]">{hexHash}</div>
            </div>
          </div>

          {/* Center Monumental Rapid-Fire Stage */}
          <div className="relative z-30 max-w-5xl w-full mx-auto px-4 sm:px-6 flex flex-col items-center justify-center my-auto">
            {/* Rapid Bracket Frame */}
            <div className="relative w-full max-w-3xl py-10 px-6 sm:px-14 border border-[#27272a] bg-[#101014]/90 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center overflow-hidden">
              {/* Corner Neon Crosses */}
              <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00ff66]" />
              <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00ff66]" />
              <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00ff66]" />
              <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00ff66]" />

              {/* Sub-Tag Code */}
              <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#00ff66] mb-3">
                <span>[ {currentWord.code} ]</span>
                <span className="w-8 h-[1px] bg-[#00ff66]" />
                <span className="text-[#faf9f6]">{currentWord.en}</span>
              </div>

              {/* Strobe Japanese Kanji with High-Velocity Impact */}
              <motion.div
                key={wordIndex}
                initial={{ opacity: 0, scale: 0.95, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.08, ease: 'easeOut' }}
                className="text-center w-full"
              >
                <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.04em] text-[#faf9f6] uppercase whitespace-nowrap">
                  {currentWord.jp}
                </h1>
              </motion.div>

              {/* High-Tech Dynamic Pulse Equalizer */}
              <div className="flex items-center gap-1.5 mt-6">
                {[40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 35, 75, 85, 50].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [
                        `${(h * 0.25).toFixed(0)}px`,
                        `${h * 0.4}px`,
                        `${(h * 0.15).toFixed(0)}px`,
                      ],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.3 + (i % 4) * 0.08,
                      ease: 'easeInOut',
                    }}
                    className="w-1 bg-[#00ff66]/70 rounded-none"
                    style={{ height: `${h * 0.25}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Telemetry & Explosive 00-100% Counter */}
          <div className="relative z-30 p-6 sm:p-10 max-w-[1440px] w-full mx-auto">
            {/* Precision Micro Progress Line */}
            <div className="w-full h-[2px] bg-[#1c1c20] overflow-hidden mb-4 relative">
              <motion.div
                className="h-full bg-[#00ff66] shadow-[0_0_12px_#00ff66]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-end justify-between font-mono">
              <div className="space-y-1">
                <div className="text-[11px] text-[#00ff66] tracking-widest font-bold">
                  INITIALIZING ATELIER RUNWAY
                </div>
                <div className="text-[10px] text-[#71717a] flex items-center gap-2">
                  <span>LOAD_MODULE: COR_500D</span>
                  <span>&bull;</span>
                  <span>FIDLOCK_MAG</span>
                  <span>&bull;</span>
                  <span>NFC_ENCRYPT</span>
                </div>
              </div>

              {/* Massive Bold Percentage Counter */}
              <div className="flex items-baseline gap-1 text-[#faf9f6]">
                <span className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-tighter text-[#00ff66]">
                  {String(progress).padStart(2, '0')}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-[#71717a]">%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
