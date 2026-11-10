import React from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, Sparkles, Utensils, Phone, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { sound } from '../services/soundService';

interface HeroProps {
  onOpenReservation: () => void;
  onOpenDelivery: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onOpenDelivery }) => {
  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#091428] via-[#0b1b36] to-[#070e1c] dark:from-[#070e1c] dark:via-[#091428] dark:to-[#040812] text-white">
      {/* Subtle decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Motion Typography and CTAs (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Location & Trust Kicker (Unboxed text with typographic separators per zero-pill rule) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-amber-400 tracking-wide mb-4"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Hotel Atithi International
              </span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>Siddharthanagar, Lumbini</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="flex items-center gap-1 text-amber-300 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                4.8 / 5.0 (68 Google Reviews)
              </span>
            </motion.div>

            {/* Main Headline with Smooth Motion Stagger */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-100 leading-[1.15] text-balance max-w-2xl"
            >
              Where Royal Nepalese Hospitality Meets{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                Grand Celebrations
              </span>
            </motion.h1>

            {/* Value Proposition Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal"
            >
              Welcome to <strong className="text-slate-100 font-semibold">{RESTAURANT_INFO.fullName}</strong>. Experience authentic Himalayan flavors, exquisite multi-cuisine fine dining, and Siddharthanagar’s premier 400-guest luxury banquet hall for weddings, conferences, and milestone memories.
            </motion.p>

            {/* Quick Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex flex-wrap gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-300"
            >
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-400" />
                <span>Fine Dine-in & Takeaway</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Luxury Banquet with Stage & AC</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Open 9:00 AM – 10:00 PM</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={() => {
                  sound.playSuccess();
                  onOpenReservation();
                }}
                className="px-7 py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm tracking-wide rounded-xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-200 active:scale-95 flex items-center gap-2"
              >
                <span>Book Table / Banquet</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="#menu"
                onClick={() => sound.playWoodClick()}
                className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-amber-400/40 text-slate-200 hover:text-amber-300 font-medium text-sm rounded-xl transition-all duration-200 active:scale-95 flex items-center gap-2"
              >
                <span>View Digital Menu</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  sound.playChime();
                  onOpenDelivery();
                }}
                className="px-5 py-3.5 text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Delivery: {RESTAURANT_INFO.deliveryHotline1}</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Visual Showcase Featuring Real Assets (col-span-5) */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-slate-900/60 backdrop-blur-sm group"
            >
              {/* Featured Visual: Interior dining lounge with wood seating & ambient lighting */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={RESTAURANT_INFO.images.interiorLounge}
                  alt="Annapurna Heritage Restaurant interior dining lounge with custom woodwork and ambient lights"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Overlaid Badge */}
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-amber-400/40 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-semibold text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.8 Rated Dining</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <p className="text-amber-400 text-xs font-medium uppercase tracking-wider">
                    Siddharthanagar Premier Destination
                  </p>
                  <h3 className="font-heading text-lg font-bold text-white mt-1">
                    Warm Handcrafted Wood Lounge & Banquet
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                    Fine multi-cuisine dining, private sound setup & acoustic live music
                  </p>
                </div>
              </div>

              {/* Mini thumbnails strip below */}
              <div className="p-3 bg-slate-950/90 border-t border-amber-500/20 grid grid-cols-3 gap-2">
                <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
                  <img
                    src={RESTAURANT_INFO.images.heroCollage}
                    alt="Banquet hall stage and celebrations"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 left-1.5 text-[10px] text-white font-medium bg-black/60 px-1 rounded">Banquet</span>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
                  <img
                    src={RESTAURANT_INFO.images.exteriorFacade}
                    alt="Exterior facade at Hotel Atithi International"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 left-1.5 text-[10px] text-white font-medium bg-black/60 px-1 rounded">Exterior</span>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
                  <img
                    src={RESTAURANT_INFO.images.brandCrest}
                    alt="Annapurna Heritage Royal Monogram"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 left-1.5 text-[10px] text-white font-medium bg-black/60 px-1 rounded">Crest</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 4-Column Live Proof Strip Below Hero (Full-width row adhering to layout rules) */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-900/70 border border-amber-500/25 backdrop-blur-md"
        >
          {/* Metric 1 */}
          <div className="flex items-center gap-3.5 p-2">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <div className="font-heading text-xl font-bold text-slate-100 tabular-nums">4.8 / 5.0</div>
              <div className="text-xs text-slate-400">68+ Google Reviews</div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="flex items-center gap-3.5 p-2 border-l border-white/5 lg:border-white/10">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading text-xl font-bold text-slate-100 tabular-nums">400+ Guests</div>
              <div className="text-xs text-slate-400">Grand Banquet & Stage</div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="flex items-center gap-3.5 p-2 border-t sm:border-t-0 sm:border-l border-white/5 lg:border-white/10">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading text-xl font-bold text-slate-100">Hotel Atithi</div>
              <div className="text-xs text-slate-400">Prime Siddharthanagar</div>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="flex items-center gap-3.5 p-2 border-t lg:border-t-0 border-l border-white/5 lg:border-white/10">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading text-lg font-bold text-slate-100 tabular-nums">071-570055</div>
              <div className="text-xs text-slate-400">Fast Home Delivery</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
