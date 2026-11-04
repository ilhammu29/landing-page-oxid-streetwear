'use client';

import { useRef, useEffect } from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';

interface PromoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PromoVideoModal({ isOpen, onClose }: PromoVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0c]/95 backdrop-blur-xl flex flex-col justify-center items-center p-4 sm:p-8 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#121214] border border-[#27272a] shadow-2xl overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#27272a] bg-[#0d0d10]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#00ff66]" />
            <span className="font-display font-extrabold text-sm uppercase tracking-wider text-[#faf9f6]">
              OXID STUDIO · PROMO FILM (15S / 120BPM)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#a1a1aa] hover:text-[#00ff66] transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <video
            ref={videoRef}
            src="/fashion/oxid-studio-promo.mp4"
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
        </div>

        {/* Bottom Bar */}
        <div className="px-6 py-3 border-t border-[#27272a] bg-[#0d0d10] flex items-center justify-between text-xs font-mono text-[#71717a]">
          <span className="text-[#00ff66]">120 BPM · JAPANESE KINETIC MOTION</span>
          <span>AUTONOMOUS ATELIER · TOKYO & PARIS</span>
        </div>
      </div>
    </div>
  );
}
