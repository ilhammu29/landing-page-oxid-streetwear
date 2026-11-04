'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles, User, Layers, DollarSign, BookOpen, ExternalLink } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

interface SearchItem {
  id: string;
  title: string;
  category: 'Creators' | 'Features' | 'Pricing' | 'Resources';
  description: string;
  targetId: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  {
    id: 'c1',
    title: 'Ellis Ever After',
    category: 'Creators',
    description: 'Family podcasting empire building an authentic audio community',
    targetId: 'showcase',
  },
  {
    id: 'c2',
    title: 'Ross Draws',
    category: 'Creators',
    description: 'World-building masterclasses, digital brushes, and anime illustrations',
    targetId: 'showcase',
  },
  {
    id: 'c3',
    title: 'Jade Novah',
    category: 'Creators',
    description: 'Vocal masterclasses, music streaming, and comedy sketches',
    targetId: 'showcase',
  },
  {
    id: 'c4',
    title: 'Anne Helen Petersen',
    category: 'Creators',
    description: 'Culture study, long-form newsletters, and community discussions',
    targetId: 'showcase',
  },
  {
    id: 'c5',
    title: 'Aira Core & Codex Swarm',
    category: 'Creators',
    description: 'Autonomous multi-agent engineering guild for sovereign architecture',
    targetId: 'showcase',
  },
  {
    id: 'f1',
    title: 'Complete Creative Control',
    category: 'Features',
    description: 'Multi-format drops: HD Video, high-fidelity audio podcasts, long-form posts, digital commerce',
    targetId: 'creative-control',
  },
  {
    id: 'f2',
    title: 'Direct Access & Community Chats',
    category: 'Features',
    description: 'Real-time group chats, direct messages, voice notes, and zero ad middlemen',
    targetId: 'direct-access',
  },
  {
    id: 'f3',
    title: 'Digital Commerce & Shop',
    category: 'Features',
    description: 'Sell individual episodes, sound kits, design files, and video courses with instant payouts',
    targetId: 'business',
  },
  {
    id: 'p1',
    title: 'Free Plan & Getting Started',
    category: 'Pricing',
    description: 'Starting a Patreon is 100% free with 0% platform fee until you begin earning',
    targetId: 'business',
  },
  {
    id: 'p2',
    title: 'Membership Tiers & Earnings Calculator',
    category: 'Pricing',
    description: 'Interactive simulator to project monthly revenue based on audience size',
    targetId: 'business',
  },
  {
    id: 'r1',
    title: 'Creator Hub & Playbooks',
    category: 'Resources',
    description: 'Step-by-step guides on launching memberships, setting pricing, and growing fans',
    targetId: 'quote',
  },
];

export function SearchModal({ isOpen, onClose, onNavigate }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onNavigate('search-modal-trigger');
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  if (!isOpen) return null;

  const filteredItems = SEARCH_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleSelect = (item: SearchItem) => {
    onNavigate(item.targetId);
    onClose();
  };

  const categories = ['All', 'Creators', 'Features', 'Pricing', 'Resources'];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Creators':
        return <User className="w-4 h-4 text-patreon-coral" />;
      case 'Features':
        return <Layers className="w-4 h-4 text-patreon-blue" />;
      case 'Pricing':
        return <DollarSign className="w-4 h-4 text-emerald-500" />;
      default:
        return <BookOpen className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-canvas rounded-2xl shadow-2xl border border-border-subtle overflow-hidden z-10 transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-border-subtle bg-white">
          <Search className="w-5 h-5 text-ink-muted mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search creators, features, tools, or pricing..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-ink placeholder:text-ink-muted focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-ink-muted hover:text-ink mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-ink-muted bg-canvas-subtle border border-border-subtle rounded">
            ESC
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-canvas-subtle border-b border-border-subtle overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                activeCategory === cat
                  ? 'bg-ink text-white'
                  : 'bg-white text-ink-secondary hover:text-ink border border-border-subtle'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-ink-muted">
              <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-40 text-patreon-coral" />
              <p className="text-sm font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1">Try searching for &ldquo;podcast&rdquo;, &ldquo;video&rdquo;, or &ldquo;tiers&rdquo;</p>
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`flex items-start justify-between p-3 rounded-xl cursor-pointer transition ${
                  selectedIndex === index
                    ? 'bg-white shadow-sm border border-border-subtle'
                    : 'hover:bg-white/60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-canvas-subtle shrink-0 mt-0.5">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-ink">{item.title}</span>
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-canvas-subtle border border-border-subtle text-ink-secondary">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-ink-secondary mt-0.5 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-xs font-semibold text-patreon-coral mt-1 shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-canvas-subtle border-t border-border-subtle text-[11px] text-ink-muted">
          <span>Navigate with <strong>↑</strong> <strong>↓</strong> and press <strong>Enter</strong></span>
          <span className="text-patreon-coral font-medium">Patreon × OXID Engine</span>
        </div>
      </div>
    </div>
  );
}
