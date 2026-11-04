'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, RotateCcw, Play } from 'lucide-react';

interface IntroMotionCinemaProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export function IntroMotionCinema({ forceOpen = false, onClose }: IntroMotionCinemaProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if auto-play on first visit or forced open
    if (forceOpen) {
      setIsVisible(true);
      return;
    }

    const hasSeenIntro = sessionStorage.getItem('oxid_promo_seen_v2');
    if (!hasSeenIntro) {
      setIsVisible(true);
    }
  }, [forceOpen]);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = isMuted;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser policy blocks unmuted autoplay, mute and try again
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => setIsPlaying(true));
          }
        });
    }
  }, [isVisible]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 15;
      setProgress((current / total) * 100);
    }
  };

  const handleVideoEnded = () => {
    handleDismiss();
  };

  const handleDismiss = () => {
    sessionStorage.setItem('oxid_promo_seen_v2', 'true');
    setIsVisible(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (onClose) {
      onClose();
    }
  };

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0c]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-300 select-none">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between z-10 w-full max-w-[1440px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[#00ff66]" />
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-sm sm:text-base uppercase tracking-wider text-[#faf9f6]">
              OXID STUDIO
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#00ff66]">
              オキシド・スタジオ · PROMO FILM (15S / 120BPM)
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 sm:gap-4 font-mono text-xs">
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#27272a] hover:border-[#00ff66] bg-[#121214] text-[#faf9f6] hover:text-[#00ff66] transition cursor-pointer"
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#00ff66]" />}
            <span className="hidden sm:inline">{isMuted ? 'UNMUTE' : 'AUDIO ON'}</span>
          </button>

          <button
            onClick={handleDismiss}
            className="flex items-center gap-2 px-4 py-1.5 bg-[#00ff66] text-black font-bold tracking-wider uppercase hover:bg-[#10ff70] transition active:scale-95 cursor-pointer"
          >
            <span>Skip</span>
            <span className="opacity-70 text-[10px]">スキップ</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Center Cinematic Video Container */}
      <div className="relative w-full max-w-[1440px] mx-auto aspect-video max-h-[75vh] flex items-center justify-center border border-[#27272a] bg-black overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)]">
        <video
          ref={videoRef}
          src="/fashion/oxid-studio-promo.mp4"
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          className="w-full h-full object-contain"
        />

        {/* Japanese Title Overlay at Video Start */}
        {progress < 15 && (
          <div className="absolute top-6 left-6 z-10 pointer-events-none">
            <div className="text-[11px] font-mono tracking-widest text-[#00ff66] uppercase">
              PROMOTIONAL MOTION COMPOSITION
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#faf9f6] tracking-tight">
              主権を、纏え。
            </div>
          </div>
        )}
      </div>

      {/* Bottom Telemetry & Progress Scrub */}
      <div className="w-full max-w-[1440px] mx-auto z-10 space-y-3">
        <div className="w-full h-[2px] bg-[#27272a] overflow-hidden">
          <div
            className="h-full bg-[#00ff66] transition-all duration-75 shadow-[0_0_10px_#00ff66]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a]">
          <div className="flex items-center gap-3">
            <span className="text-[#00ff66] font-bold">120 BPM KINETIC RENDER</span>
            <span>·</span>
            <span>TOKYO / PARIS ATELIER</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReplay}
              className="flex items-center gap-1 hover:text-[#00ff66] transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>REPLAY</span>
            </button>
            <span>·</span>
            <button
              onClick={handleDismiss}
              className="hover:text-[#faf9f6] transition cursor-pointer"
            >
              ENTER SITE →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
