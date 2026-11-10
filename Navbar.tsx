import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Moon, Sun, Menu as MenuIcon, X, CalendarCheck, PhoneCall } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { sound } from '../services/soundService';
import { AnnapurnaLogo } from './AnnapurnaLogo';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenDelivery: () => void;
  cartCount: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onOpenDelivery,
  cartCount,
  theme,
  onToggleTheme
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(sound.isAmbientActive());
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    sound.subscribeAmbientState((active) => setIsAudioActive(active));
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    sound.playChime();
    const active = sound.toggleAmbientSound();
    setIsAudioActive(active);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMute = !isMuted;
    sound.setMuted(nextMute);
    setIsMuted(nextMute);
    if (!nextMute) {
      sound.playWoodClick();
    }
  };

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Banquet & Events', href: '#banquet' },
    { label: 'Heritage Story', href: '#story' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#091428]/95 dark:bg-[#070e1c]/95 bg-white/95 backdrop-blur-md shadow-md border-b border-amber-500/20'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent dark:from-[#070e1c]/90'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar Contract: Zone 1 (Brand) — Zone 2 (Nav links) — Zone 3 (Primary Action) */}
          <div className="flex items-center justify-between gap-8 h-20">
            {/* Zone 1: Single element brand wordmark */}
            <a
              href="#"
              onClick={() => sound.playWoodClick()}
              className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-full border border-amber-400/60 bg-slate-950/80 dark:bg-slate-900/90 flex items-center justify-center p-1.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
                <AnnapurnaLogo className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg sm:text-xl font-bold tracking-wider text-amber-400 dark:text-amber-300">
                  ANNAPURNA HERITAGE
                </span>
                <span className="text-[10px] tracking-widest uppercase text-slate-300 dark:text-slate-400 font-medium -mt-1 hidden sm:block">
                  Restaurant & Banquet · Siddharthanagar
                </span>
              </div>
            </a>

            {/* Zone 2: 4–5 single-line clean text navigation links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => sound.playWoodClick()}
                  className="whitespace-nowrap shrink-0 text-slate-200 hover:text-amber-400 dark:text-slate-300 dark:hover:text-amber-300 transition-colors duration-150 py-1 border-b-2 border-transparent hover:border-amber-400/60"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: Primary Actions (Audio, Theme, Delivery Cart & Reserve Table) */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Audio Soundscape Toggle Button with live wave indicator */}
              <button
                type="button"
                onClick={handleToggleSound}
                title={isAudioActive ? "Ambient music playing - click to pause" : "Click to play soothing Himalayan ambient music"}
                className={`relative flex items-center gap-2 px-2.5 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 ${
                  isAudioActive
                    ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                    : 'border-white/20 bg-black/30 hover:border-amber-400/50 text-slate-300'
                }`}
                aria-label="Toggle ambient Himalayan music"
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                ) : (
                  <Volume2 className={`w-3.5 h-3.5 ${isAudioActive ? 'text-amber-400 animate-pulse' : 'text-slate-300'}`} />
                )}
                <span className="hidden xl:inline text-[11px] whitespace-nowrap">
                  {isAudioActive ? "Music: On" : "Music"}
                </span>

                {isAudioActive && (
                  <span className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-amber-400 animate-bounce" style={{ height: '70%', animationDelay: '0ms' }} />
                    <span className="w-0.5 bg-amber-400 animate-bounce" style={{ height: '100%', animationDelay: '150ms' }} />
                    <span className="w-0.5 bg-amber-400 animate-bounce" style={{ height: '50%', animationDelay: '300ms' }} />
                  </span>
                )}
              </button>

              {/* Theme Toggle (Dark / Light) */}
              <button
                type="button"
                onClick={() => {
                  sound.playWoodClick();
                  onToggleTheme();
                }}
                className="p-2 rounded-full border border-white/20 bg-black/20 hover:border-amber-400/50 text-slate-200 hover:text-amber-300 transition-colors"
                title={theme === 'dark' ? "Switch to daylight mode" : "Switch to royal dark mode"}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-200" />}
              </button>

              {/* Delivery Cart Trigger */}
              <button
                type="button"
                onClick={() => {
                  sound.playChime();
                  onOpenDelivery();
                }}
                className="relative hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-medium transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">Delivery</span>
                {cartCount > 0 && (
                  <span className="ml-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Primary Action: Reserve Table */}
              <button
                type="button"
                onClick={() => {
                  sound.playChime();
                  onOpenReservation();
                }}
                className="px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 rounded-full shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Reserve Table</span>
              </button>

              {/* Mobile menu hamburger */}
              <button
                type="button"
                onClick={() => {
                  sound.playWoodClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="lg:hidden p-2 rounded-md text-slate-200 hover:text-amber-400 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-950/95 backdrop-blur-xl flex flex-col p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-6 border-b border-amber-500/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-amber-400/60 bg-slate-900 flex items-center justify-center p-1.5 shadow-md">
                <AnnapurnaLogo className="w-full h-full" />
              </div>
              <span className="font-heading font-bold text-lg text-amber-400">
                Annapurna Heritage
              </span>
            </div>
            <button
              onClick={() => {
                sound.playWoodClick();
                setMobileMenuOpen(false);
              }}
              className="p-2 text-slate-300 hover:text-amber-400"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-4 py-8 text-lg font-medium text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  sound.playWoodClick();
                  setMobileMenuOpen(false);
                }}
                className="py-2 border-b border-white/5 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-amber-500/20">
            <button
              onClick={() => {
                sound.playChime();
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3 text-center text-slate-950 bg-amber-400 hover:bg-amber-300 font-semibold rounded-xl shadow-lg shadow-amber-500/30"
            >
              Reserve a Table
            </button>
            <button
              onClick={() => {
                sound.playChime();
                setMobileMenuOpen(false);
                onOpenDelivery();
              }}
              className="w-full py-3 text-center text-amber-300 border border-amber-500/40 rounded-xl bg-amber-500/10 font-medium"
            >
              Call Delivery: {RESTAURANT_INFO.deliveryHotline1}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
