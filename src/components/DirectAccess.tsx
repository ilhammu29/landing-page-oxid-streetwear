'use client';

import { useState } from 'react';
import {
  MessageCircle,
  ShieldCheck,
  Send,
  Heart,
  Flame,
  Rocket,
  ThumbsUp,
  Headphones,
  Mail,
  Users,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export function DirectAccess() {
  const [activeChannel, setActiveChannel] = useState<'lounge' | 'backstage' | 'dms'>('lounge');
  const [reactions, setReactions] = useState<{ [key: string]: number }>({
    heart: 48,
    fire: 35,
    rocket: 62,
    clap: 29,
  });
  const [userReacted, setUserReacted] = useState<{ [key: string]: boolean }>({});

  const handleReaction = (type: string) => {
    setReactions((prev) => ({
      ...prev,
      [type]: userReacted[type] ? prev[type] - 1 : prev[type] + 1,
    }));
    setUserReacted((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <section id="direct-access" className="py-24 sm:py-36 px-4 sm:px-6 bg-canvas-subtle border-t border-border-subtle relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Interactive Real-Time Community Chat Mockup */}
          <div className="lg:col-span-6 rounded-3xl bg-dark-surface border border-dark-border p-5 sm:p-7 text-white shadow-2xl relative">
            {/* Header of Chat Mockup */}
            <div className="flex items-center justify-between pb-4 border-b border-dark-border mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-white tracking-wide">
                  {activeChannel === 'lounge' && '#general-patron-lounge'}
                  {activeChannel === 'backstage' && '#vip-backstage-qa'}
                  {activeChannel === 'dms' && '@creator-direct-inbox'}
                </span>
              </div>

              {/* Channel Tabs */}
              <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl text-[10px] font-mono">
                <button
                  onClick={() => setActiveChannel('lounge')}
                  className={`px-2 py-0.5 rounded-lg transition ${
                    activeChannel === 'lounge' ? 'bg-white text-ink font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Lounge
                </button>
                <button
                  onClick={() => setActiveChannel('backstage')}
                  className={`px-2 py-0.5 rounded-lg transition ${
                    activeChannel === 'backstage' ? 'bg-white text-ink font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Backstage
                </button>
                <button
                  onClick={() => setActiveChannel('dms')}
                  className={`px-2 py-0.5 rounded-lg transition ${
                    activeChannel === 'dms' ? 'bg-white text-ink font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  DMs
                </button>
              </div>
            </div>

            {/* Simulated Live Message Stream */}
            <div className="space-y-4 text-xs sm:text-sm font-sans mb-6">
              {/* Message 1: Loyal Patron */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-xs shrink-0">
                  SL
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">Sarah Lin</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Tier 2 Patron &bull; 10:48 AM</span>
                  </div>
                  <p className="text-zinc-300">
                    The acoustic guitar solo at 32:15 on the private stream had me in tears. Will the raw multitrack be uploaded?
                  </p>
                </div>
              </div>

              {/* Message 2: Verified Creator Reply */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-patreon-coral/15 border border-patreon-coral/30">
                <div className="w-8 h-8 rounded-full bg-patreon-coral flex items-center justify-center font-black text-xs shrink-0 text-white shadow-md">
                  P
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">Jade Novah</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-patreon-coral text-white font-bold">
                      CREATOR
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">10:50 AM</span>
                  </div>
                  <p className="text-zinc-200">
                    Yes Sarah! Dropping the 24-bit 96kHz lossless audio pack in 10 minutes for all Tier 2 & 3 members. Here’s a quick voice note preview:
                  </p>

                  {/* Playable Mini Audio Note in Chat */}
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-black/40 border border-white/10 w-fit">
                    <div className="w-6 h-6 rounded-full bg-white text-ink flex items-center justify-center text-[10px] font-bold">
                      ▶
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1 h-3 bg-patreon-coral rounded-full animate-pulse" />
                      <span className="w-1 h-5 bg-patreon-coral rounded-full animate-pulse delay-75" />
                      <span className="w-1 h-2 bg-patreon-coral rounded-full animate-pulse delay-150" />
                      <span className="w-1 h-4 bg-patreon-coral rounded-full animate-pulse delay-100" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-300">0:14 / 0:45</span>
                  </div>
                </div>
              </div>

              {/* Message 3: Group Member */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">
                  MR
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">Marcus Rowe</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Tier 3 VIP &bull; 10:52 AM</span>
                  </div>
                  <p className="text-zinc-300">
                    Cannot wait! Setting up the monitors now. Love being able to chat directly with everyone without ads.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Emoji Reaction Bar */}
            <div className="pt-3 border-t border-dark-border flex items-center justify-between">
              <span className="text-[11px] text-zinc-400">Click to react in real-time:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleReaction('heart')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition ${
                    userReacted['heart'] ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${userReacted['heart'] ? 'fill-rose-400' : ''}`} />
                  <span>{reactions.heart}</span>
                </button>

                <button
                  onClick={() => handleReaction('fire')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition ${
                    userReacted['fire'] ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  <Flame className={`w-3.5 h-3.5 ${userReacted['fire'] ? 'fill-amber-400' : ''}`} />
                  <span>{reactions.fire}</span>
                </button>

                <button
                  onClick={() => handleReaction('rocket')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition ${
                    userReacted['rocket'] ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  <Rocket className={`w-3.5 h-3.5 ${userReacted['rocket'] ? 'fill-blue-400' : ''}`} />
                  <span>{reactions.rocket}</span>
                </button>

                <button
                  onClick={() => handleReaction('clap')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition ${
                    userReacted['clap'] ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${userReacted['clap'] ? 'fill-emerald-400' : ''}`} />
                  <span>{reactions.clap}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Principles */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-patreon-coral uppercase">
              DISINTERMEDIATION ARCHITECTURE
            </span>

            {/* Exact Patreon Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-ink leading-[1.08]">
              Creators. Fans.{' '}
              <span className="font-extrabold text-ink block sm:inline underline decoration-patreon-coral/40 decoration-wavy decoration-2">
                Nothing in between.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
              Patreon gives you a direct line of access to your fan community, with no ads or gatekeepers in the way.
            </p>

            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
              Through real-time group chats, comments, DMs, and even directly over email, you can connect more deeply and directly with your community here than anywhere else.
            </p>

            {/* Three Pillar Cards */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-border-subtle shadow-sm">
                <div className="p-2.5 rounded-xl bg-patreon-coralLight text-patreon-coral shrink-0 mt-0.5">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-ink text-sm sm:text-base">100% Owned Relationship</h4>
                  <p className="text-xs sm:text-sm text-ink-secondary mt-0.5">
                    No algorithms deciding who sees your drops. When you post, every single member receives it in their app and inbox.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-border-subtle shadow-sm">
                <div className="p-2.5 rounded-xl bg-patreon-peach text-ink shrink-0 mt-0.5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-ink text-sm sm:text-base">Real-Time Mobile Community</h4>
                  <p className="text-xs sm:text-sm text-ink-secondary mt-0.5">
                    Engage in group chats, stream voice notes, run exclusive member polls, and moderate safely without spam bots.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-border-subtle shadow-sm">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-ink text-sm sm:text-base">Data Portability & Zero Lock-in</h4>
                  <p className="text-xs sm:text-sm text-ink-secondary mt-0.5">
                    Export your full patron list, email addresses, and subscription history whenever you choose. You own your business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
