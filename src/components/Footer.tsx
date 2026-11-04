'use client';

import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [currentLang, setCurrentLang] = useState('English (Global)');
  const [langOpen, setLangOpen] = useState(false);

  const languages = [
    'English (Global)',
    '日本語 (Tokyo)',
    'Français (Paris)',
    'Deutsch (Berlin)',
    'Bahasa Indonesia',
    '한국어 (Seoul)',
  ];

  return (
    <footer className="bg-[#0a0a0c] border-t border-[#27272a] pt-16 sm:pt-24 pb-12 px-6 sm:px-12 text-[#f5f5f0]">
      <div className="max-w-[1400px] mx-auto">
        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Column 1: Collections */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#00ff66]">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-[#a1a1aa]">
              <li>
                <button onClick={() => onNavigate('creator-grid')} className="hover:text-[#00ff66] transition">
                  Drop 01 — Tactical Parka
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('creator-grid')} className="hover:text-[#00ff66] transition">
                  Drop 02 — Cyber Kimono
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('creator-grid')} className="hover:text-[#00ff66] transition">
                  Drop 03 — Modular Rig
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('creator-grid')} className="hover:text-[#00ff66] transition">
                  Drop 04 — Laser Cargos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('creator-grid')} className="hover:text-[#00ff66] transition">
                  Drop 05 — Milk Hoodie
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Garment Specs */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#00ff66]">
              Garment Specs
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-[#a1a1aa]">
              <li>
                <button onClick={() => onNavigate('creative-control')} className="hover:text-[#00ff66] transition">
                  Cordura® 500D Ballistic
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('creative-control')} className="hover:text-[#00ff66] transition">
                  Fidlock® V-Buckles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('creative-control')} className="hover:text-[#00ff66] transition">
                  NFC Provenance Chips
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('direct-access')} className="hover:text-[#00ff66] transition">
                  Kinetic Garment Ergonomics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('creative-control')} className="hover:text-[#00ff66] transition">
                  Laser Ultrasound Seams
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Atelier */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#00ff66]">
              Atelier
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-[#a1a1aa]">
              <li>
                <button onClick={() => onNavigate('quote')} className="hover:text-[#00ff66] transition">
                  Creative Manifesto
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('direct-access')} className="hover:text-[#00ff66] transition">
                  Runway Film Archive
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('business')} className="hover:text-[#00ff66] transition">
                  Drop Allocation Ledger
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-[#00ff66] transition">
                  Autumn/Winter Archive
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#00ff66]">
              Client Access
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-[#a1a1aa]">
              <li>
                <a href="#hero" className="hover:text-[#00ff66] transition">
                  VIP Terminal Sign In
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-[#00ff66] transition">
                  NFC Authentication Key
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-[#00ff66] transition">
                  Bespoke Sizing Telemetry
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-[#00ff66] transition">
                  Tokyo Runway Invites
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Atelier Cities */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#00ff66]">
              Locations
            </h4>
            <div className="text-xs font-mono text-[#a1a1aa] space-y-2">
              <div>
                <span className="text-[#faf9f6] font-bold block">PARIS ATELIER</span>
                <span>Rue de Turenne, 3e</span>
              </div>
              <div className="pt-2">
                <span className="text-[#faf9f6] font-bold block">TOKYO LABORATORY</span>
                <span>Shibuya-ku, Jingumae</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Language, Copyright, Legal */}
        <div className="pt-8 border-t border-[#27272a] flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-[#a1a1aa]">
          {/* Left: Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121214] border border-[#27272a] hover:border-[#00ff66] transition text-[#faf9f6]"
            >
              <Globe className="w-3.5 h-3.5 text-[#00ff66]" />
              <span>{currentLang}</span>
              <ChevronDown className="w-3 h-3 text-[#a1a1aa]" />
            </button>

            {langOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-52 bg-[#121214] rounded-xl p-2 shadow-2xl border border-[#27272a] z-50">
                {languages.map((l) => (
                  <div
                    key={l}
                    onClick={() => {
                      setCurrentLang(l);
                      setLangOpen(false);
                    }}
                    className={`px-3 py-2 rounded-lg cursor-pointer text-xs transition ${
                      currentLang === l ? 'bg-[#18181b] text-[#00ff66] font-bold' : 'hover:bg-[#18181b] text-[#faf9f6]'
                    }`}
                  >
                    {l}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Center: Legal Links */}
          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <a href="#hero" className="hover:text-[#00ff66] transition">Cryptographic Provenance</a>
            <a href="#hero" className="hover:text-[#00ff66] transition">Terms of Allocation</a>
            <a href="#hero" className="hover:text-[#00ff66] transition">Security & Encryption</a>
          </div>

          {/* Right: Copyright & Trademark */}
          <div className="text-[11px] text-[#52525b] text-center md:text-right">
            &copy; 2026 OXID STUDIO ATELIER. SOVEREIGN COUTURE.
          </div>
        </div>
      </div>
    </footer>
  );
}
