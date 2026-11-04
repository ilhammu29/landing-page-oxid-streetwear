'use client';

import { useState } from 'react';
import {
  Video,
  Mic,
  PenTool,
  ShoppingBag,
  Play,
  Pause,
  Lock,
  Download,
  Share2,
  Heart,
  MessageCircle,
  Check,
  Copy,
  Sparkles,
  ArrowRight,
  Maximize2,
  Volume2,
} from 'lucide-react';

export function CompleteCreativeControl() {
  const [activeTab, setActiveTab] = useState<'video' | 'podcast' | 'writing' | 'shop'>('video');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<'1x' | '1.5x' | '2x'>('1x');
  const [copiedRss, setCopiedRss] = useState(false);
  const [likedCount, setLikedCount] = useState(342);
  const [hasLiked, setHasLiked] = useState(false);

  const handleCopyRss = () => {
    navigator.clipboard?.writeText('https://patreon.com/rss/ellis-ever-after/private-feed-token-987a6b5');
    setCopiedRss(true);
    setTimeout(() => setCopiedRss(false), 2000);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikedCount((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikedCount((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  return (
    <section id="creative-control" className="py-24 sm:py-36 px-4 sm:px-6 bg-canvas border-t border-border-subtle">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-patreon-coral uppercase mb-2 block">
            MULTI-FORMAT PUBLISHING
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-ink leading-[1.08]">
            Complete{' '}
            <span className="font-extrabold text-ink underline decoration-patreon-coral/40 decoration-wavy decoration-2">
              creative control.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-ink-secondary mt-4 leading-relaxed">
            Patreon is your space to create what excites you most, rough or polished, big or small. Hundreds of thousands of creators use Patreon to share videos, podcasts, writing, art, music, recipes, and more with their most passionate fans.
          </p>
        </div>

        {/* Interactive Format Navigation Tabs */}
        <div className="flex items-center gap-2 pb-4 overflow-x-auto no-scrollbar mb-8">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition shrink-0 ${
              activeTab === 'video'
                ? 'bg-ink text-white shadow-md'
                : 'bg-white text-ink-secondary hover:text-ink border border-border-subtle'
            }`}
          >
            <Video className="w-4 h-4 text-patreon-coral" />
            <span>HD Video Drops</span>
          </button>

          <button
            onClick={() => setActiveTab('podcast')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition shrink-0 ${
              activeTab === 'podcast'
                ? 'bg-ink text-white shadow-md'
                : 'bg-white text-ink-secondary hover:text-ink border border-border-subtle'
            }`}
          >
            <Mic className="w-4 h-4 text-patreon-blue" />
            <span>Podcasts & Private RSS</span>
          </button>

          <button
            onClick={() => setActiveTab('writing')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition shrink-0 ${
              activeTab === 'writing'
                ? 'bg-ink text-white shadow-md'
                : 'bg-white text-ink-secondary hover:text-ink border border-border-subtle'
            }`}
          >
            <PenTool className="w-4 h-4 text-amber-500" />
            <span>Direct Newsletters</span>
          </button>

          <button
            onClick={() => setActiveTab('shop')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition shrink-0 ${
              activeTab === 'shop'
                ? 'bg-ink text-white shadow-md'
                : 'bg-white text-ink-secondary hover:text-ink border border-border-subtle'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-emerald-500" />
            <span>Digital Product Commerce</span>
          </button>
        </div>

        {/* Tab Content Display Area */}
        <div className="rounded-3xl bg-white border border-border-subtle p-6 sm:p-10 shadow-xl overflow-hidden min-h-[460px] flex items-center justify-center">
          {/* TAB 1: VIDEO PLAYER PREVIEW */}
          {activeTab === 'video' && (
            <div className="w-full max-w-4xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="relative rounded-2xl bg-dark-surface overflow-hidden aspect-video border border-dark-border flex flex-col justify-between p-6 text-white group shadow-2xl">
                {/* Top Video Header */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-patreon-coral font-mono text-[10px] font-bold text-white uppercase tracking-wider">
                      PATRON EXCLUSIVE
                    </span>
                    <span className="text-xs font-mono text-zinc-400">4K 60FPS &bull; HDR</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span>Director’s Uncut Edition</span>
                  </div>
                </div>

                {/* Center Play Button Overlay */}
                <div className="flex flex-col items-center justify-center text-center z-10">
                  <button
                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                    className="w-16 h-16 rounded-full bg-white/10 hover:bg-patreon-coral backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all transform hover:scale-110 active:scale-95 shadow-2xl mb-3"
                  >
                    {isVideoPlaying ? (
                      <Pause className="w-7 h-7" />
                    ) : (
                      <Play className="w-7 h-7 fill-current translate-x-0.5" />
                    )}
                  </button>
                  <p className="text-sm font-bold text-white">
                    {isVideoPlaying ? 'Playing: Behind The Canvas Masterclass' : 'Click to preview patron video playback'}
                  </p>
                  <span className="text-xs text-zinc-400 mt-0.5">Runtime: 42m 18s &bull; Ross Draws</span>
                </div>

                {/* Bottom Video Controls Scrubber */}
                <div className="space-y-2 z-10 pt-4 border-t border-white/10">
                  {/* Scrubber Bar */}
                  <div className="relative w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                    <div
                      className={`h-full bg-patreon-coral transition-all duration-300 ${
                        isVideoPlaying ? 'w-2/3 animate-pulse' : 'w-1/4'
                      }`}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>14:20 / 42:18</span>
                    <div className="flex items-center gap-4">
                      <Volume2 className="w-4 h-4 hover:text-white cursor-pointer" />
                      <Maximize2 className="w-4 h-4 hover:text-white cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div>
                  <h3 className="text-lg font-bold text-ink">Zero Ad Injections. Zero Third-Party Tracker Cookies.</h3>
                  <p className="text-xs sm:text-sm text-ink-secondary">Hosted natively on high-speed CDN with zero compression degradation.</p>
                </div>
                <button className="px-5 py-2.5 rounded-full bg-canvas-subtle hover:bg-ink hover:text-white text-ink text-xs font-bold transition self-start sm:self-auto">
                  Upload Video Specs
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PODCAST & PRIVATE RSS */}
          {activeTab === 'podcast' && (
            <div className="w-full max-w-4xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="rounded-2xl bg-dark-surface p-6 sm:p-8 text-white border border-dark-border shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-dark-border gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-patreon-coral to-amber-500 flex items-center justify-center font-black text-2xl shadow-lg">
                      🎙️
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-patreon-blue/20 text-patreon-blue font-bold">
                          PRIVATE RSS STREAM
                        </span>
                        <span className="text-xs text-zinc-400">Lossless FLAC & MP3</span>
                      </div>
                      <h4 className="text-lg font-bold text-white mt-0.5">
                        Episode 89: Disintermediating The Social Monopoly
                      </h4>
                    </div>
                  </div>

                  {/* Playback Speed Toggles */}
                  <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white/10 p-1 rounded-full text-xs font-mono">
                    {(['1x', '1.5x', '2x'] as const).map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setAudioSpeed(spd)}
                        className={`px-2.5 py-1 rounded-full transition ${
                          audioSpeed === spd ? 'bg-white text-ink font-bold' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {spd}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated Audio Waveform Bar */}
                <div className="py-8">
                  <div className="flex items-center justify-between gap-1 h-14">
                    {[40, 65, 80, 50, 90, 75, 40, 30, 85, 100, 60, 45, 70, 95, 80, 60, 35, 75, 90, 100, 70, 55, 85, 95, 60, 40, 50, 75, 90, 65, 45, 80, 100, 70, 50, 40, 65, 85, 95, 70, 50, 35].map((height, i) => (
                      <div
                        key={i}
                        className={`w-full rounded-full transition-all duration-200 ${
                          i < 18
                            ? 'bg-patreon-coral'
                            : 'bg-white/20 hover:bg-white/50 cursor-pointer'
                        } ${isAudioPlaying ? 'animate-pulse' : ''}`}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mt-4">
                    <span>18:42</span>
                    <span>54:10</span>
                  </div>
                </div>

                {/* Player Controls & Private RSS URL Generator */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-dark-border">
                  <button
                    onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-ink font-bold text-xs hover:bg-zinc-200 transition"
                  >
                    {isAudioPlaying ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" />
                        <span>Pause Audio Episode</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>Play Audio Stream</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyRss}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/15 text-xs text-zinc-300 transition"
                    >
                      {copiedRss ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Private RSS Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Private RSS Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WRITING & NEWSLETTERS */}
          {activeTab === 'writing' && (
            <div className="w-full max-w-3xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="rounded-2xl bg-canvas p-6 sm:p-10 border border-border-subtle shadow-md">
                <div className="flex items-center justify-between pb-4 border-b border-border-subtle text-xs text-ink-muted mb-6">
                  <span>DISPATCH #118 &bull; PUBLISHED 2 HOURS AGO</span>
                  <span className="font-mono text-patreon-coral font-bold">SUBSCRIBER INBOX DROP</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ink leading-tight mb-4">
                  The Architecture of Stillness: Why Our Best Work Happens in Walled Gardens
                </h3>

                <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-6 font-serif">
                  When you decouple your creative output from algorithmic engagement loops, something remarkable happens to the quality of your thoughts. You stop writing for rage-clicks, and begin writing for people who actually care...
                </p>

                {/* Gated Paywall Teaser */}
                <div className="p-4 rounded-xl bg-canvas-subtle border border-border-subtle flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-patreon-coral" />
                    <div>
                      <span className="text-xs font-bold text-ink block">Remainder of essay reserved for Patrons</span>
                      <span className="text-[11px] text-ink-muted">Includes 4,200 words + full downloadable PDF</span>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 rounded-full bg-patreon-coral text-white text-xs font-bold hover:bg-patreon-coralDark transition">
                    Unlock
                  </button>
                </div>

                {/* Reader Claps / Like Micro-interaction */}
                <div className="flex items-center justify-between pt-4 border-t border-border-subtle text-xs text-ink-muted">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition ${
                      hasLiked ? 'bg-rose-50 text-patreon-coral font-bold' : 'hover:bg-canvas-subtle text-ink-secondary'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${hasLiked ? 'fill-patreon-coral text-patreon-coral' : ''}`} />
                    <span>{likedCount} Likes</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4" />
                    <span>84 Patron Comments</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DIGITAL COMMERCE STORE */}
          {activeTab === 'shop' && (
            <div className="w-full max-w-4xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Product 1 */}
                <div className="rounded-2xl bg-canvas p-6 border border-border-subtle shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                        INSTANT DOWNLOAD
                      </span>
                      <span className="text-lg font-black text-ink">$24.00</span>
                    </div>
                    <h4 className="text-base font-bold text-ink mb-1">
                      Ross Draws: Master Brush Kit & Texture Pack v4
                    </h4>
                    <p className="text-xs text-ink-secondary mb-4 leading-relaxed">
                      65 custom Procreate & Photoshop brushes, high-res canvas textures, and a 40-minute application video.
                    </p>
                  </div>
                  <button className="w-full py-2.5 rounded-full bg-ink hover:bg-black text-white text-xs font-bold transition flex items-center justify-center gap-2">
                    <Download className="w-3.5 h-3.5" />
                    <span>Buy Once &bull; Instant Access</span>
                  </button>
                </div>

                {/* Product 2 */}
                <div className="rounded-2xl bg-canvas p-6 border border-border-subtle shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-patreon-blue font-bold border border-blue-200">
                        LOSSLESS AUDIO PACK
                      </span>
                      <span className="text-lg font-black text-ink">$35.00</span>
                    </div>
                    <h4 className="text-base font-bold text-ink mb-1">
                      Jade Novah: Unreleased Studio Stems & Harmonies
                    </h4>
                    <p className="text-xs text-ink-secondary mb-4 leading-relaxed">
                      12 multitrack studio stems, dry vocals, reverb tails, and commercial license for creators.
                    </p>
                  </div>
                  <button className="w-full py-2.5 rounded-full bg-ink hover:bg-black text-white text-xs font-bold transition flex items-center justify-center gap-2">
                    <Download className="w-3.5 h-3.5" />
                    <span>Buy Once &bull; Instant Access</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
