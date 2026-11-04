'use client';

import { useState } from 'react';
import {
  Sparkles,
  Play,
  Pause,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Lock,
  Download,
  Headphones,
  FileText,
  Video,
  Heart,
  Share2,
} from 'lucide-react';

interface ShowcaseItem {
  id: string;
  category: 'Podcasts' | 'Video' | 'Music' | 'Art' | 'Writing' | 'Gaming';
  categoryLabel: string;
  title: string;
  creator: string;
  handle: string;
  members: string;
  desc: string;
  aspect: 'tall' | 'wide' | 'square';
  accentColor: string;
  benefits: string[];
  sampleTitle?: string;
  mediaType: 'audio' | 'video' | 'post' | 'art';
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 's1',
    category: 'Art',
    categoryLabel: 'VISUAL ART & WORLDBUILDING',
    title: 'World of Nima & Anime Masterclasses',
    creator: 'Ross Draws',
    handle: '@rossdraws',
    members: '42,100 members',
    desc: 'High-resolution PSDs, brush packs, anime design walkthroughs, and live mentorship critiques.',
    aspect: 'tall',
    accentColor: '#F59E0B',
    benefits: ['Monthly Custom Brushes', 'Layered PSD Files', 'Private Discord Hangouts', 'Video Tutorials'],
    sampleTitle: 'Ep 12: Painting Cinematic Rim Light',
    mediaType: 'art',
  },
  {
    id: 's2',
    category: 'Podcasts',
    categoryLabel: 'AUDIO & PODCASTING',
    title: 'The Sovereign Sound & Family Empire',
    creator: 'Ellis Ever After',
    handle: '@elliseverafter',
    members: '14,200 members',
    desc: 'Weekly private listener RSS feed, unreleased story recordings, and uncensored Q&A episodes.',
    aspect: 'wide',
    accentColor: '#FF424D',
    benefits: ['Ad-Free RSS Feed', 'Bonus Weekly Episodes', 'Discord Audio Lounge', 'Physical Merch Box'],
    sampleTitle: 'The Unfiltered Backstage Story (48 mins)',
    mediaType: 'audio',
  },
  {
    id: 's3',
    category: 'Writing',
    categoryLabel: 'ESSAYS & CULTURE',
    title: 'Culture Study & Decentering the Algorithm',
    creator: 'Anne Helen Petersen',
    handle: '@ahpetersen',
    members: '36,800 members',
    desc: 'In-depth long-form cultural essays, weekly subscriber threads, and community book club discussions.',
    aspect: 'square',
    accentColor: '#0E87EB',
    benefits: ['Weekly Subscriber Essays', 'Archive Access (500+ posts)', 'Author Q&A Threads', 'Direct Inbox Drops'],
    sampleTitle: 'Why Can’t We Log Off Anymore?',
    mediaType: 'post',
  },
  {
    id: 's4',
    category: 'Music',
    categoryLabel: 'VOCALS & R&B PRODUCTION',
    title: 'Vocal Masterclasses & Acoustic Stems',
    creator: 'Jade Novah',
    handle: '@jadenovah',
    members: '28,600 members',
    desc: 'Full studio vocal stems, harmonies breakdowns, livestreamed songwriting sessions, and warm-up tracks.',
    aspect: 'tall',
    accentColor: '#8B5CF6',
    benefits: ['Lossless WAV Stems', 'Monthly Live Masterclass', 'Early Concert Tickets', 'Behind the Booth Vlogs'],
    sampleTitle: 'Harmonizing in 5ths: Vocal Practice Track',
    mediaType: 'audio',
  },
  {
    id: 's5',
    category: 'Video',
    categoryLabel: 'CINEMATIC COSPLAY & VLOGS',
    title: 'Vintage Transformations & Studio Vlogs',
    creator: 'Rachel Maksy',
    handle: '@rachelmaksy',
    members: '25,300 members',
    desc: 'Full-length costume patterning blueprints, blooper reels, vintage thrifting diaries, and live builds.',
    aspect: 'wide',
    accentColor: '#10B981',
    benefits: ['Sewing Patterns & PDFs', 'Extended Director Cuts', 'Private Livestreams', 'Monthly Sticker Mailers'],
    sampleTitle: 'Making a 1700s Pirate Coat from Scratch',
    mediaType: 'video',
  },
  {
    id: 's6',
    category: 'Gaming',
    categoryLabel: 'SOVEREIGN GAME DEV & AI',
    title: 'Dot AI Desktop Companion & Local Models',
    creator: 'OXID Autonomous Lab',
    handle: '@oxidlabs',
    members: '12,400 members',
    desc: 'Open-source 45MB transparent desktop companion, Groq fast inference hooks, and private git worktrees.',
    aspect: 'square',
    accentColor: '#EC4899',
    benefits: ['Private Git Repos', 'Nightly Release Builds', 'Architecture RFCs', 'VIP Dev Discord'],
    sampleTitle: 'Sub-15ms Voice Streaming Prototype',
    mediaType: 'post',
  },
];

export function ShowcaseGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<ShowcaseItem | null>(null);

  const categories = ['All', 'Podcasts', 'Video', 'Music', 'Art', 'Writing', 'Gaming'];

  const filtered = selectedCategory === 'All'
    ? SHOWCASE_ITEMS
    : SHOWCASE_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="showcase" className="py-24 sm:py-32 px-4 sm:px-6 bg-canvas border-t border-border-subtle relative">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header (Patreon Direct Match) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-patreon-coral uppercase mb-2 block">
              COMMUNITY DIRECTORY
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-ink leading-[1.08]">
              Creativity powered by{' '}
              <span className="font-extrabold text-ink underline decoration-patreon-coral/40 decoration-wavy decoration-2">
                fandom.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-ink-secondary mt-4 leading-relaxed">
              Patreon is the best place to build community with your biggest fans, share exclusive work, and turn your passion into a lasting creative business.
            </p>
          </div>

          {/* Category Filter Pills Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-ink text-white shadow-md'
                    : 'bg-white text-ink-secondary hover:text-ink border border-border-subtle hover:border-border-medium'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white border border-border-subtle hover:border-border-strong p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top Header Card */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-white text-lg shadow-md shrink-0"
                      style={{ backgroundColor: item.accentColor }}
                    >
                      {item.creator.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-ink text-base group-hover:text-patreon-coral transition">
                          {item.creator}
                        </h3>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      </div>
                      <span className="text-xs text-ink-muted">{item.handle}</span>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-canvas-subtle border border-border-subtle text-ink-secondary">
                    {item.members}
                  </span>
                </div>

                {/* Card Title & Description */}
                <h4 className="text-lg font-bold text-ink mb-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* Included Membership Benefits Pill List */}
                <div className="space-y-2 mb-6 pt-4 border-t border-border-subtle">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted font-bold block">
                    What patrons get:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {item.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-ink-secondary">
                        <div className="w-1.5 h-1.5 rounded-full bg-patreon-coral shrink-0" />
                        <span className="truncate">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Trigger */}
              <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                {/* Audio Sample Player Toggle if available */}
                {item.mediaType === 'audio' && (
                  <button
                    onClick={() => setActiveAudioId(activeAudioId === item.id ? null : item.id)}
                    className="flex items-center gap-2 text-xs font-bold text-ink hover:text-patreon-coral transition"
                  >
                    {activeAudioId === item.id ? (
                      <>
                        <Pause className="w-4 h-4 text-patreon-coral" />
                        <span className="text-patreon-coral">Playing audio sample</span>
                      </>
                    ) : (
                      <>
                        <Headphones className="w-4 h-4" />
                        <span>Play Sample</span>
                      </>
                    )}
                  </button>
                )}

                {item.mediaType !== 'audio' && (
                  <div className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Member-only drops</span>
                  </div>
                )}

                {/* View Tier Preview Button */}
                <button
                  onClick={() => setSelectedPreview(item)}
                  className="px-3.5 py-1.5 rounded-full bg-canvas-subtle hover:bg-ink hover:text-white text-ink text-xs font-bold transition flex items-center gap-1 group/btn"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Dialog for Member Tier Preview */}
      {selectedPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="fixed inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={() => setSelectedPreview(null)}
          />
          <div className="relative w-full max-w-lg bg-canvas rounded-3xl p-6 sm:p-8 shadow-2xl border border-border-subtle z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-4 border-b border-border-subtle mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white text-xl"
                  style={{ backgroundColor: selectedPreview.accentColor }}
                >
                  {selectedPreview.creator.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ink">{selectedPreview.creator}</h3>
                  <p className="text-xs text-ink-secondary">{selectedPreview.title}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPreview(null)}
                className="p-1 rounded-full text-ink-muted hover:text-ink"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-patreon-coral">
                TIER BENEFITS BREAKDOWN
              </h4>
              <div className="space-y-2.5">
                {selectedPreview.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-border-subtle text-xs sm:text-sm font-medium text-ink">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedPreview(null)}
              className="w-full py-3.5 rounded-full bg-patreon-coral hover:bg-patreon-coralDark text-white font-bold text-sm transition shadow-lg shadow-patreon-coral/30"
            >
              Join Tier & Unlock Access
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
