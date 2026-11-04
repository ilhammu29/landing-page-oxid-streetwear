'use client';

import { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  Users,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  Sparkles,
} from 'lucide-react';

interface TurningPassionsProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export function TurningPassions({ onOpenAuth }: TurningPassionsProps) {
  const [patronCount, setPatronCount] = useState<number>(450);
  const [tierPrice, setTierPrice] = useState<number>(12);

  const monthlyGross = patronCount * tierPrice;
  const annualGross = monthlyGross * 12;
  const equivalentAdViews = Math.round(monthlyGross / 0.003); // assuming $3 CPM

  return (
    <section id="business" className="py-24 sm:py-36 px-4 sm:px-6 bg-canvas border-t border-border-subtle">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-patreon-coral uppercase mb-2 block">
            SUSTAINABLE CREATOR ECONOMY
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-ink leading-[1.08]">
            Turning passions into{' '}
            <span className="font-extrabold text-ink underline decoration-patreon-coral/40 decoration-wavy decoration-2">
              businesses.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-ink-secondary mt-4 leading-relaxed">
            Patreon allows creators to replace unpredictable algorithm payouts with predictable, monthly recurring income from their most passionate fans.
          </p>
        </div>

        {/* Dual Pillar Cards (Direct Patreon Layout) */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Card 1: More ways to earn */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-border-subtle shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-patreon-coralLight text-patreon-coral flex items-center justify-center mb-6">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-ink mb-3">More ways to earn</h3>
              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-6">
                On Patreon, you can build a lasting business outside of the ad-based ecosystem, with revenue streams ranging from membership for offering ongoing benefits, to online shops for selling individual videos, podcast episodes, and more.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-border-subtle">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-ink font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Monthly Recurring Memberships with custom billing dates</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-ink font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Standalone Digital Product Shops with instant checkout</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-ink font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Zero chargeback fraud protection & global currency settlement</span>
              </div>
            </div>
          </div>

          {/* Card 2: Unlock growth */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-border-subtle shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-patreon-blue flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-ink mb-3">Unlock growth</h3>
              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-6">
                Patreon isn’t just for creative growth, it’s for professional growth too. Get in-depth analytics about your fans, dig into powerful relationship management tools, and tap into a growing creator community.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-border-subtle">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-ink font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Granular retention metrics & churn reduction dashboards</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-ink font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Automated benefit fulfillment & Discord role syncing</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-ink font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Dedicated creator partner support for six-figure studios</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Earnings Calculator Widget */}
        <div className="rounded-3xl bg-dark-surface border border-dark-border p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-dark-border gap-6">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-patreon-coral block mb-1">
                  INTERACTIVE EARNINGS SIMULATOR
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Estimate Your Monthly Recurring Income
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-zinc-400">0% upfront fee to start</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 py-8 items-center">
              {/* Sliders Input Column */}
              <div className="lg:col-span-7 space-y-8">
                {/* Slider 1: Number of Members */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-white">
                      Estimated Patrons / Members
                    </label>
                    <span className="text-xl font-mono font-extrabold text-patreon-coral">
                      {patronCount.toLocaleString()} fans
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="50"
                    value={patronCount}
                    onChange={(e) => setPatronCount(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-patreon-coral"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                    <span>50 fans</span>
                    <span>1,000 fans</span>
                    <span>5,000 fans</span>
                  </div>
                </div>

                {/* Slider 2: Average Tier Price */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-white">
                      Average Monthly Tier Price
                    </label>
                    <span className="text-xl font-mono font-extrabold text-patreon-coral">
                      ${tierPrice} / mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="50"
                    step="1"
                    value={tierPrice}
                    onChange={(e) => setTierPrice(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-patreon-coral"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                    <span>$3 / mo (Supporter)</span>
                    <span>$12 / mo (Insider)</span>
                    <span>$50 / mo (VIP Patron)</span>
                  </div>
                </div>
              </div>

              {/* Earnings Output Display Card */}
              <div className="lg:col-span-5 rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold block mb-1">
                    PROJECTED EARNINGS
                  </span>
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white mb-1">
                    ${monthlyGross.toLocaleString()}
                    <span className="text-sm font-normal text-zinc-400">/mo</span>
                  </div>
                  <div className="text-sm font-mono text-emerald-400 font-bold mb-6">
                    ${annualGross.toLocaleString()} annualized recurring
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-300 space-y-1 mb-6">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Equivalent Ad-Driven Output:</span>
                    </div>
                    <p>
                      To make this on YouTube, you’d need ~<strong>{equivalentAdViews.toLocaleString()}</strong> video views every single month.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenAuth('signup')}
                  className="w-full py-3.5 rounded-full bg-patreon-coral hover:bg-patreon-coralDark text-white font-bold text-sm transition shadow-xl shadow-patreon-coral/30 flex items-center justify-center gap-2 group"
                >
                  <span>Launch Your Patreon Page</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
