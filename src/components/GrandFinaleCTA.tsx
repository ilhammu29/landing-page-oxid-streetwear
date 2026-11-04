'use client';

import { ArrowRight } from 'lucide-react';

interface GrandFinaleCTAProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export function GrandFinaleCTA({ onOpenAuth }: GrandFinaleCTAProps) {
  return (
    <section className="py-28 sm:py-44 px-6 bg-[#0a0a0c] border-t border-[#27272a] text-center select-none relative overflow-hidden">
      {/* Background Cyber Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,102,0.08)_0%,rgba(10,10,12,0)_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        {/* OXID STUDIO Kinetic Mark */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 mb-8 cursor-pointer group flex items-center justify-center">
          <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-3xl bg-[#121214] border border-[#27272a] group-hover:border-[#00ff66] flex items-center justify-center transition-all duration-500 shadow-[0_0_30px_rgba(0,255,102,0.2)] group-hover:shadow-[0_0_50px_rgba(0,255,102,0.5)]">
            <span className="w-8 h-8 rounded-full bg-[#00ff66] shadow-[0_0_20px_#00ff66] animate-pulse" />
          </div>
        </div>

        {/* Grand Headline in Milk White */}
        <div className="inline-flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-[0.25em] text-[#00ff66]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
          <span>AUTONOMOUS COUTURE ARCHIVE</span>
        </div>

        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-display font-black tracking-[-0.04em] text-[#faf9f6] leading-[0.92] mb-10 uppercase">
          ENTER THE <br />
          <span className="text-[#00ff66]">SOVEREIGN</span> ATELIER
        </h2>

        {/* Action Button in Neon Green */}
        <div className="mb-6">
          <button
            onClick={() => onOpenAuth('signup')}
            className="px-9 py-4 rounded-full bg-[#00ff66] hover:bg-[#10ff70] text-black font-mono font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(0,255,102,0.45)] hover:shadow-[0_0_50px_rgba(0,255,102,0.75)] active:scale-95 flex items-center gap-3"
          >
            <span>Request Client Credentials</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm font-mono text-[#a1a1aa]">
          Already an authenticated client?{' '}
          <button
            onClick={() => onOpenAuth('login')}
            className="text-[#00ff66] font-bold underline underline-offset-4 hover:text-[#10ff70] transition-colors"
          >
            Enter Terminal
          </button>
        </p>
      </div>
    </section>
  );
}
