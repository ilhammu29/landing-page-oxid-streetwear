'use client';

import { useState } from 'react';
import { X, ArrowRight, CheckCircle2, Mail, Lock, User, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
  onSwitchMode: (newMode: 'login' | 'signup') => void;
}

export function AuthModal({ isOpen, mode, onClose, onSwitchMode }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (mode === 'signup') {
      confetti({
        particleCount: 60,
        spread: 70,
        colors: ['#00ff66', '#10ff70', '#ffffff', '#27272a'],
        origin: { y: 0.6 },
      });
    }

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0a0a0c]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Dialog Window */}
      <div className="relative w-full max-w-md bg-[#121214] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#27272a] z-10 animate-in fade-in zoom-in-95 duration-200 text-[#f5f5f0]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#a1a1aa] hover:text-[#f5f5f0] hover:bg-[#18181b] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#18181b] border border-[#00ff66]/60 shadow-[0_0_15px_rgba(0,255,102,0.3)] flex items-center justify-center text-[#00ff66] font-display font-black text-xl mx-auto mb-3">
            <span className="w-3 h-3 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66]" />
          </div>
          <div className="text-[10px] font-mono text-[#00ff66] uppercase tracking-widest mb-1">
            OXID STUDIO // ATELIER SECURITY
          </div>
          <h3 className="text-2xl font-display font-extrabold text-[#faf9f6] uppercase">
            {mode === 'signup' ? 'Request Drop Credentials' : 'Client Terminal Login'}
          </h3>
          <p className="text-xs sm:text-sm font-mono text-[#a1a1aa] mt-1.5">
            {mode === 'signup'
              ? 'Receive encrypted allocation keys for private runway drops.'
              : 'Sign in to access your garment provenance and dispatch status.'}
          </p>
        </div>

        {isSuccess ? (
          <div className="text-center py-8 space-y-3 font-mono">
            <div className="w-14 h-14 rounded-full bg-[#00ff66]/10 border border-[#00ff66]/40 text-[#00ff66] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,255,102,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-display font-bold text-[#faf9f6] uppercase">
              {mode === 'signup' ? 'Allocation Key Issued!' : 'Client Authenticated!'}
            </h4>
            <p className="text-xs text-[#a1a1aa]">
              Connecting to secure Tokyo/Paris atelier node...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono">
            {mode === 'signup' && (
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#a1a1aa] mb-1.5">
                  Client Codename
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#71717a] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. KRONOS-09"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0a0a0c] border border-[#27272a] text-[#f5f5f0] text-xs placeholder:text-[#52525b] focus:outline-none focus:border-[#00ff66] focus:ring-1 focus:ring-[#00ff66] transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#a1a1aa] mb-1.5">
                Client Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#71717a] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@domain.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0a0a0c] border border-[#27272a] text-[#f5f5f0] text-xs placeholder:text-[#52525b] focus:outline-none focus:border-[#00ff66] focus:ring-1 focus:ring-[#00ff66] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#a1a1aa] mb-1.5">
                Passphrase / Key
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#71717a] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0a0a0c] border border-[#27272a] text-[#f5f5f0] text-xs placeholder:text-[#52525b] focus:outline-none focus:border-[#00ff66] focus:ring-1 focus:ring-[#00ff66] transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#00ff66] hover:bg-[#10ff70] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(0,255,102,0.4)] flex items-center justify-center gap-2 mt-4 active:scale-98"
            >
              <span>{mode === 'signup' ? 'Authorize Drop Access' : 'Authenticate Key'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              {mode === 'signup' ? (
                <p className="text-xs text-[#a1a1aa]">
                  Already have allocation credentials?{' '}
                  <button
                    type="button"
                    onClick={() => onSwitchMode('login')}
                    className="text-[#00ff66] font-bold underline underline-offset-4 hover:text-[#10ff70]"
                  >
                    Enter Terminal
                  </button>
                </p>
              ) : (
                <p className="text-xs text-[#a1a1aa]">
                  New client?{' '}
                  <button
                    type="button"
                    onClick={() => onSwitchMode('signup')}
                    className="text-[#00ff66] font-bold underline underline-offset-4 hover:text-[#10ff70]"
                  >
                    Request Credentials
                  </button>
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
