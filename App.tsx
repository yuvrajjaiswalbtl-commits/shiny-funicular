/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowUp, PhoneCall, Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutStory } from './components/AboutStory';
import { InteractiveMenu } from './components/InteractiveMenu';
import { BanquetSection } from './components/BanquetSection';
import { PhotoGallery } from './components/PhotoGallery';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationFooter } from './components/LocationFooter';
import { ReservationModal } from './components/ReservationModal';
import { DeliveryDrawer } from './components/DeliveryDrawer';
import { AudioController } from './components/AudioController';
import { MenuItem, CartItem } from './types';
import { sound } from './services/soundService';
import { RESTAURANT_INFO } from './data/restaurantData';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [preselectedHall, setPreselectedHall] = useState<string | undefined>();
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Smooth scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Sync theme with document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Back to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.menuItem.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.menuItem.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.menuItem.id === itemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenReservation = (hallName?: string) => {
    setPreselectedHall(hallName);
    setIsReservationOpen(true);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToTop = () => {
    sound.playWoodClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070e1c] text-slate-100 font-body transition-colors duration-300 relative selection:bg-amber-400 selection:text-slate-950">
      {/* Scroll Progress Bar at the Top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 origin-left z-50 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
        style={{ scaleX }}
      />

      {/* Top Navbar */}
      <Navbar
        onOpenReservation={() => handleOpenReservation()}
        onOpenDelivery={() => setIsDeliveryOpen(true)}
        cartCount={totalCartCount}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Sections */}
      <main>
        {/* 1. Hero Section with Motion Texts & Trust Strip */}
        <Hero
          onOpenReservation={() => handleOpenReservation()}
          onOpenDelivery={() => setIsDeliveryOpen(true)}
        />

        {/* 2. Heritage Story & Culinary Roots */}
        <AboutStory />

        {/* 3. Interactive Menu with Search, Filters & Quick Ordering */}
        <InteractiveMenu
          onAddToCart={handleAddToCart}
          onOpenDelivery={() => setIsDeliveryOpen(true)}
          cartCount={totalCartCount}
        />

        {/* 4. Grand Banquet & Events Hall Planner */}
        <BanquetSection onOpenBanquetBooking={handleOpenReservation} />

        {/* 5. Authentic Photo Gallery & Lightbox */}
        <PhotoGallery />

        {/* 6. Google Maps Reviews & FAQs */}
        <ReviewsSection />
      </main>

      {/* Location, Contacts & Subfooter */}
      <LocationFooter
        onOpenReservation={() => handleOpenReservation()}
        onOpenDelivery={() => setIsDeliveryOpen(true)}
      />

      {/* Floating Procedural Audio Controller (Himalayan soundscape & volume) */}
      <AudioController />

      {/* Floating Action: Quick Delivery Callout (Right bottom) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {totalCartCount > 0 && (
          <button
            type="button"
            onClick={() => {
              sound.playChime();
              setIsDeliveryOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-xl transition-all active:scale-95 animate-bounce"
          >
            <span>Tray ({totalCartCount})</span>
          </button>
        )}

        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="p-3 rounded-full bg-slate-900/90 hover:bg-amber-400 border border-amber-500/30 text-amber-400 hover:text-slate-950 shadow-xl backdrop-blur-md transition-all active:scale-90"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Reservation & Banquet Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        preselectedHall={preselectedHall}
      />

      {/* Delivery / Takeaway Drawer */}
      <DeliveryDrawer
        isOpen={isDeliveryOpen}
        onClose={() => setIsDeliveryOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
