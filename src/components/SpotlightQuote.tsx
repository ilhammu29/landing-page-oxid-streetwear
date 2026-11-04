'use client';

import { useState } from 'react';
import { Quote, Headphones, Play, Pause, Sparkles, Disc, Radio } from 'lucide-react';

export function SpotlightQuote() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="quote" className="py-24 sm:py-36 px-4 sm:px-6 bg-canvas-subtle border-t border-border-subtle relative overflow-hidden">
      {/* Background Subtle Waveform Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Decorative Quote Icon & Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border-subtle shadow-sm mb-8">
          <Sparkles className="w-4 h-4 text-patreon-coral" />
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-ink">
            CREATOR SPOTLIGHT &bull; SOVEREIGN VOICE
          </span>
        </div>

        {/* Massive Editorial Quote Headline (Patreon Direct Style) */}
        <blockquote className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-ink tracking-tight leading-[1.18] sm:leading-[1.15] mb-10 max-w-4xl mx-auto">
          &ldquo;Patreon provides a space for artists to{' '}
          <span className="font-extrabold italic text-ink underline decoration-patreon-coral decoration-wavy decoration-2">
            sustain ourselves
          </span>{' '}
          by connecting us directly to our own communities.&rdquo;
        </blockquote>

        {/* Creator Attribution & Interactive Audio Pill */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          {/* Creator Profile Info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-ink flex items-center justify-center text-white font-black text-sm">
                K
              </div>
            </div>
            <div className="text-left">
              <div className="font-bold text-ink text-base">KAMAUU</div>
              <div className="text-xs text-ink-secondary">Musician, Recording Artist & Poet</div>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-border-strong" />

          {/* Interactive Audio Note Snippet */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-3 px-5 py-2.5 rounded-full text-xs font-bold transition shadow-sm ${
              isPlaying
                ? 'bg-patreon-coral text-white shadow-patreon-coral/30'
                : 'bg-white hover:bg-canvas text-ink border border-border-subtle'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause Voice Note</span>
                <div className="flex items-center gap-0.5">
                  <span className="w-0.5 h-3 bg-white animate-pulse" />
                  <span className="w-0.5 h-5 bg-white animate-pulse delay-75" />
                  <span className="w-0.5 h-2 bg-white animate-pulse delay-150" />
                </div>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Listen to KAMAUU’s Story (1:12)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
