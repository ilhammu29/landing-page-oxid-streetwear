'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, ArrowRight, Play } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenPromo?: () => void;
}

export function Navbar({ onNavigate, onOpenAuth, onOpenPromo }: NavbarProps) {
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
    { code: '01', title: 'Drop 01 — Tactical Parka', desc: 'Cordura weatherproof ballistic outerwear' },
    { code: '02', title: 'Drop 02 — Cyber Kimono', desc: 'Tokyo brutalist silhouette with neon webbing' },
    { code: '03', title: 'Drop 03 — Modular Vest', desc: 'Fidlock magnetic quick-release hardware' },
    { code: '04', title: 'Drop 04 — Laser Cargos', desc: 'Wide-leg technical trousers with kinetic fit' },
    { code: '05', title: 'Drop 05 — Heavy Hoodie', desc: '500GSM milk white boxy brutalist fleece' },
  ];

  const specsLinks = [
    { code: 'MAT', title: 'Ballistic Cordura 500D', desc: 'DWR water-repellent shell membrane' },
    { code: 'HW', title: 'Fidlock® Magnetic Fasteners', desc: 'German engineering quick-release hardware' },
    { code: 'NFC', title: 'Encrypted Garment Provenance', desc: 'Tamper-proof physical-digital verification' },
    { code: 'FIT', title: 'Kinetic Articulation', desc: 'Joint mobility patterns engineered for movement' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a0c]/95 backdrop-blur-md text-[#f5f5f0] border-b border-[#222226] py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#0a0a0c]/90 via-[#0a0a0c]/40 to-transparent text-[#f5f5f0] py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Left: Brand Identity */}
          <div
            onClick={() => onNavigate('hero')}
            className="cursor-pointer flex items-center gap-3.5 group select-none"
          >
            {/* Geometric Brutalist Monogram */}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-none bg-[#121214] border border-[#27272a] group-hover:border-[#00ff66] transition-colors">
              <span className="w-2.5 h-2.5 bg-[#faf9f6] group-hover:bg-[#00ff66] transition-colors" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl sm:text-2xl tracking-[-0.04em] uppercase text-[#faf9f6] group-hover:text-[#00ff66] transition-colors leading-none">
                  OXID STUDIO
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest text-[#00ff66] opacity-80">
                  オキシド
                </span>
              </div>
              <span className="text-[9px] font-mono tracking-widest text-[#71717a] uppercase mt-0.5">
                Autonomous Atelier · Tokyo / Paris
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[12px] font-mono tracking-widest uppercase">
            {/* Collections Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('collections')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="flex items-center gap-1.5 text-[#a1a1aa] hover:text-[#faf9f6] transition-colors py-2"
              >
                <span>Collections</span>
                <ChevronDown className="w-3 h-3 text-[#71717a]" />
              </button>

              {activeDropdown === 'collections' && (
                <div className="absolute top-full left-0 pt-3 w-88 animate-in fade-in duration-150">
                  <div className="bg-[#0f0f12] rounded-none p-4 shadow-2xl border border-[#27272a] text-[#f5f5f0] space-y-1">
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-[#00ff66] tracking-widest border-b border-[#222226] mb-1 flex justify-between">
                      <span>Archive Catalogue</span>
                      <span className="text-[#71717a]">アーカイブ</span>
                    </div>
                    {collectionCategories.map((c) => (
                      <div
                        key={c.code}
                        onClick={() => {
                          setActiveDropdown(null);
                          onNavigate('creator-grid');
                        }}
                        className="p-2.5 hover:bg-[#18181c] cursor-pointer transition flex items-start gap-3 group"
                      >
                        <span className="text-[11px] font-mono text-[#00ff66] mt-0.5">{c.code}</span>
                        <div>
                          <div className="text-sm font-sans font-medium text-[#faf9f6] group-hover:text-[#00ff66] transition-colors">
                            {c.title}
                          </div>
                          <div className="text-xs text-[#71717a] mt-0.5">{c.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Garment Specs Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('specs')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="flex items-center gap-1.5 text-[#a1a1aa] hover:text-[#faf9f6] transition-colors py-2"
              >
                <span>Specs</span>
                <ChevronDown className="w-3 h-3 text-[#71717a]" />
              </button>

              {activeDropdown === 'specs' && (
                <div className="absolute top-full left-0 pt-3 w-88 animate-in fade-in duration-150">
                  <div className="bg-[#0f0f12] rounded-none p-4 shadow-2xl border border-[#27272a] text-[#f5f5f0] space-y-1">
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-[#00ff66] tracking-widest border-b border-[#222226] mb-1 flex justify-between">
                      <span>Engineering Matrix</span>
                      <span className="text-[#71717a]">仕様規格</span>
                    </div>
                    {specsLinks.map((s) => (
                      <div
                        key={s.code}
                        onClick={() => {
                          setActiveDropdown(null);
                          onNavigate('creative-control');
                        }}
                        className="p-2.5 hover:bg-[#18181c] cursor-pointer transition flex items-start gap-3 group"
                      >
                        <span className="text-[10px] font-mono text-[#00ff66] mt-0.5">{s.code}</span>
                        <div>
                          <div className="text-sm font-sans font-medium text-[#faf9f6] group-hover:text-[#00ff66] transition-colors">
                            {s.title}
                          </div>
                          <div className="text-xs text-[#71717a] mt-0.5">{s.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 15s Motion Promo Video Quick Play */}
            {onOpenPromo && (
              <button
                onClick={onOpenPromo}
                className="flex items-center gap-1.5 text-[#00ff66] hover:text-[#10ff70] transition-colors"
                title="Watch 15-second promo motion video"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Promo Film</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('direct-access')}
              className="text-[#a1a1aa] hover:text-[#faf9f6] transition-colors"
            >
              Runway
            </button>

            <button
              onClick={() => onNavigate('quote')}
              className="text-[#a1a1aa] hover:text-[#faf9f6] transition-colors"
            >
              Manifesto
            </button>

            <button
              onClick={() => onNavigate('business')}
              className="text-[#a1a1aa] hover:text-[#faf9f6] transition-colors"
            >
              Terminal
            </button>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => onOpenAuth('login')}
              className="hidden sm:block text-xs font-mono uppercase tracking-widest text-[#a1a1aa] hover:text-[#faf9f6] transition-colors"
            >
              VIP Login
            </button>

            <button
              onClick={() => onOpenAuth('signup')}
              className="relative px-5 sm:px-6 py-2.5 rounded-none text-xs font-mono uppercase tracking-widest font-bold transition-all duration-300 flex items-center gap-2 bg-[#00ff66] text-black hover:bg-[#10ff70] hover:shadow-[0_0_25px_rgba(0,255,102,0.4)] active:scale-95"
            >
              <span>Enter Atelier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-none text-[#faf9f6] hover:bg-[#18181b] transition border border-[#27272a]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0a0a0c] border-b border-[#27272a] px-6 py-8 space-y-6 animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-4 text-sm font-mono uppercase tracking-wider">
              <div
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('creator-grid');
                }}
                className="py-2.5 text-[#faf9f6] border-b border-[#18181b] flex items-center justify-between cursor-pointer"
              >
                <span>01 コレクション Collections</span>
                <span className="text-[11px] text-[#00ff66]">DROP 01—07</span>
              </div>

              <div
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('creative-control');
                }}
                className="py-2.5 text-[#faf9f6] border-b border-[#18181b] flex items-center justify-between cursor-pointer"
              >
                <span>02 仕様 Garment Specs</span>
                <span className="text-[11px] text-[#71717a]">CORDURA / FIDLOCK</span>
              </div>

              {onOpenPromo && (
                <div
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPromo();
                  }}
                  className="py-2.5 text-[#00ff66] border-b border-[#18181b] flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    03 プロモ映像 Promo Film (15s)
                  </span>
                  <span className="text-[11px] text-[#00ff66]">120 BPM</span>
                </div>
              )}

              <div
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('direct-access');
                }}
                className="py-2.5 text-[#faf9f6] border-b border-[#18181b] flex items-center justify-between cursor-pointer"
              >
                <span>04 ランウェイ Runway Film</span>
                <span className="text-[11px] text-[#71717a]">DIRECT</span>
              </div>

              <div
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('quote');
                }}
                className="py-2.5 text-[#faf9f6] border-b border-[#18181b] cursor-pointer"
              >
                05 理念 Manifesto
              </div>

              <div
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('business');
                }}
                className="py-2.5 text-[#faf9f6] border-b border-[#18181b] cursor-pointer"
              >
                06 端末 Atelier Terminal
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signup');
                }}
                className="w-full py-3 bg-[#00ff66] text-black font-mono font-bold text-xs uppercase tracking-widest text-center"
              >
                Enter Atelier
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="w-full py-3 bg-[#18181b] text-[#a1a1aa] hover:text-white font-mono text-xs uppercase tracking-widest text-center border border-[#27272a]"
              >
                VIP Member Login
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
