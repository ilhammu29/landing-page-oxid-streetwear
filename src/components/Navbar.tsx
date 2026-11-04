'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export function Navbar({ onNavigate, onOpenAuth }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const collectionCategories = [
    { title: 'Drop 01 // Tactical Parka', desc: 'Cordura weatherproof ballistic outerwear', tag: 'LIMITED' },
    { title: 'Drop 02 // Cyber Kimono', desc: 'Tokyo brutalist silhouette with neon webbing', tag: 'SOLD OUT' },
    { title: 'Drop 03 // Modular Vest', desc: 'Fidlock magnetic quick-release hardware', tag: 'IN STOCK' },
    { title: 'Drop 04 // Laser Cargos', desc: 'Wide-leg technical trousers with neon bungees', tag: 'FEW LEFT' },
    { title: 'Drop 05 // Heavy Hoodie', desc: '500GSM milk white boxy brutalist fleece', tag: 'NEW' },
  ];

  const specsLinks = [
    { title: 'Materials & Cordura Shell', desc: 'Grade-A 500D ballistic nylon & DWR waterproofing' },
    { title: 'Fidlock® Hardware', desc: 'German magnetic quick-release tactical buckles' },
    { title: 'NFC Drop Verification', desc: 'Encrypted chip woven into every garment hem' },
    { title: '120BPM Kinetic Fit', desc: 'Ergonomic articulated joints for street movement' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a0c]/90 backdrop-blur-xl text-[#f5f5f0] border-b border-[#27272a] py-3.5 shadow-2xl'
            : 'bg-transparent text-[#f5f5f0] py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Left: Navigation links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-mono tracking-wider uppercase">
            {/* Collections Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('collections')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="flex items-center gap-1.5 text-[#f5f5f0] hover:text-[#00ff66] transition-colors py-2"
              >
                <span>Collections</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#00ff66]" />
              </button>

              {activeDropdown === 'collections' && (
                <div className="absolute top-full left-0 pt-3 w-80 animate-in fade-in duration-150">
                  <div className="bg-[#121214] rounded-2xl p-4 shadow-2xl border border-[#27272a] text-[#f5f5f0] space-y-1">
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-[#00ff66] tracking-widest flex items-center gap-1.5 border-b border-[#27272a]/80 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse" />
                      Atelier Capsule Archive
                    </div>
                    {collectionCategories.map((c) => (
                      <div
                        key={c.title}
                        onClick={() => {
                          setActiveDropdown(null);
                          onNavigate('creator-grid');
                        }}
                        className="p-2.5 rounded-xl hover:bg-[#1a1a1e] cursor-pointer transition flex items-center justify-between group"
                      >
                        <div>
                          <div className="text-sm font-sans font-medium text-[#f5f5f0] group-hover:text-[#00ff66] transition-colors">
                            {c.title}
                          </div>
                          <div className="text-xs text-[#a1a1aa] mt-0.5">{c.desc}</div>
                        </div>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30">
                          {c.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Garment Specs Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('specs')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="flex items-center gap-1.5 text-[#f5f5f0] hover:text-[#00ff66] transition-colors py-2"
              >
                <span>Garment Specs</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#00ff66]" />
              </button>

              {activeDropdown === 'specs' && (
                <div className="absolute top-full left-0 pt-3 w-84 animate-in fade-in duration-150">
                  <div className="bg-[#121214] rounded-2xl p-4 shadow-2xl border border-[#27272a] text-[#f5f5f0] space-y-1">
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-[#00ff66] tracking-widest flex items-center gap-1.5 border-b border-[#27272a]/80 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse" />
                      Tactical Engineering
                    </div>
                    {specsLinks.map((s) => (
                      <div
                        key={s.title}
                        onClick={() => {
                          setActiveDropdown(null);
                          onNavigate('creative-control');
                        }}
                        className="p-2.5 rounded-xl hover:bg-[#1a1a1e] cursor-pointer transition group"
                      >
                        <div className="text-sm font-sans font-medium text-[#f5f5f0] group-hover:text-[#00ff66] transition-colors">
                          {s.title}
                        </div>
                        <div className="text-xs text-[#a1a1aa] mt-0.5">{s.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('direct-access')}
              className="text-[#f5f5f0] hover:text-[#00ff66] transition-colors"
            >
              120BPM Runway
            </button>

            <button
              onClick={() => onNavigate('quote')}
              className="text-[#f5f5f0] hover:text-[#00ff66] transition-colors"
            >
              Manifesto
            </button>

            <button
              onClick={() => onNavigate('business')}
              className="text-[#f5f5f0] hover:text-[#00ff66] transition-colors"
            >
              Atelier Terminal
            </button>
          </nav>

          {/* Center: Official OXID STUDIO Brand Wordmark */}
          <div
            onClick={() => onNavigate('hero')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            {/* Brutalist Geometric Mark with Neon Dot */}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#18181b] border border-[#27272a] group-hover:border-[#00ff66] transition-colors">
              <span className="w-3 h-3 rounded-full bg-[#00ff66] shadow-[0_0_12px_#00ff66]" />
            </div>

            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl sm:text-2xl tracking-[-0.04em] uppercase text-[#faf9f6] group-hover:text-[#00ff66] transition-colors">
                OXID STUDIO
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#00ff66] -mt-1 uppercase">
                Atelier // 120BPM
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => onOpenAuth('login')}
              className="hidden sm:block text-xs font-mono uppercase tracking-wider text-[#a1a1aa] hover:text-[#f5f5f0] transition-colors"
            >
              VIP Login
            </button>

            <button
              onClick={() => onOpenAuth('signup')}
              className="relative px-5 sm:px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 flex items-center gap-2 bg-[#00ff66] text-black hover:bg-[#10ff70] hover:shadow-[0_0_25px_rgba(0,255,102,0.5)] active:scale-95"
            >
              <span>Enter Atelier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#f5f5f0] hover:bg-[#18181b] transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0a0a0c] border-b border-[#27272a] px-6 py-8 space-y-6 animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-4 text-base font-mono uppercase">
              <div
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('creator-grid');
                }}
                className="py-2 text-[#faf9f6] border-b border-[#18181b] flex items-center justify-between"
              >
                <span>Collections</span>
                <span className="text-[10px] text-[#00ff66] border border-[#00ff66]/30 px-2 py-0.5 rounded-full">
                  DROP 01-07
                </span>
              </div>
              <div
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('creative-control');
                }}
                className="py-2 text-[#faf9f6] border-b border-[#18181b]"
              >
                Garment Specs
              </div>
              <div
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('direct-access');
                }}
                className="py-2 text-[#faf9f6] border-b border-[#18181b] flex items-center justify-between"
              >
                <span>120BPM Runway</span>
                <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
              </div>
              <div
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('quote');
                }}
                className="py-2 text-[#faf9f6] border-b border-[#18181b]"
              >
                Manifesto
              </div>
              <div
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('business');
                }}
                className="py-2 text-[#faf9f6] border-b border-[#18181b]"
              >
                Atelier Terminal
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="w-full py-3 rounded-xl border border-[#27272a] font-mono text-xs uppercase tracking-wider text-center text-[#faf9f6]"
              >
                VIP Member Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signup');
                }}
                className="w-full py-3 rounded-xl bg-[#00ff66] font-mono text-xs uppercase tracking-wider font-semibold text-center text-black shadow-[0_0_20px_rgba(0,255,102,0.4)]"
              >
                Request Drop Access
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
