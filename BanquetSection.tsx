import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Calendar, Sparkles, Check, ArrowRight, ShieldCheck, Projector, Mic } from 'lucide-react';
import { BANQUET_HALLS, RESTAURANT_INFO } from '../data/restaurantData';
import { sound } from '../services/soundService';

interface BanquetSectionProps {
  onOpenBanquetBooking: (hallName?: string) => void;
}

export const BanquetSection: React.FC<BanquetSectionProps> = ({ onOpenBanquetBooking }) => {
  const [guestCount, setGuestCount] = useState<number>(200);
  const [eventType, setEventType] = useState<string>('wedding');

  const eventTypes = [
    { id: 'wedding', label: 'Wedding & Reception' },
    { id: 'corporate', label: 'Corporate & Conference' },
    { id: 'birthday', label: 'Birthday & Anniversary' },
    { id: 'cultural', label: 'Cultural & Live Musical' }
  ];

  // Dynamic estimate calculation
  const getEstimatedBasePlate = () => {
    switch (eventType) {
      case 'wedding':
        return 1250;
      case 'corporate':
        return 850;
      case 'birthday':
        return 950;
      case 'cultural':
        return 1100;
      default:
        return 1000;
    }
  };

  const recommendedHall =
    guestCount > 150
      ? 'Grand Royal Banquet Hall'
      : guestCount > 60
      ? 'Heritage Dining Lounge & Terrace'
      : 'Executive Conference & Seminar Suite';

  const basePrice = getEstimatedBasePlate();

  return (
    <section id="banquet" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
            Grand Celebrations & Corporate Events
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
            Siddharthanagar’s Grandest Banquet & Stage
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            From majestic wedding nuptials to high-profile corporate symposiums. We provide dedicated stage infrastructure, chandelier lighting, professional acoustics, and catering for up to 400+ guests.
          </p>
        </div>

        {/* 3 Banquet Hall Cards Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {BANQUET_HALLS.map((hall, idx) => (
            <motion.div
              key={hall.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="rounded-2xl overflow-hidden bg-slate-800/80 border border-slate-700 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Photo Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={hall.image}
                    alt={hall.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-xs font-semibold text-amber-400 border border-amber-500/30">
                    {hall.capacityRange}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {hall.name}
                  </h3>
                  <p className="text-xs text-amber-300/80 font-medium mt-1">
                    {hall.recommendedFor}
                  </p>

                  <div className="mt-5 space-y-2.5">
                    {hall.highlightFeatures.slice(0, 4).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card CTA */}
              <div className="p-6 pt-0 mt-4">
                <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Starting from</span>
                    <span className="font-heading text-lg font-bold text-amber-400 tabular-nums">
                      Rs {hall.startingPricePerPlate} <span className="text-xs font-normal text-slate-400">/ plate</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playChime();
                      onOpenBanquetBooking(hall.name);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <span>Inquire Hall</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Event Cost & Space Planner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-3xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-amber-500/30 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-700">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Live Banquet Planner
              </span>
              <h3 className="font-heading text-2xl font-bold text-white mt-1">
                Customize Your Celebration in Real-Time
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Mic className="w-3.5 h-3.5 text-amber-400" />
                Live Sound Included
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Projector className="w-3.5 h-3.5 text-amber-400" />
                Projector Ready
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Valet Parking
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            {/* Controls (col-span-7) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Event Type Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 block">
                  Select Event Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {eventTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        sound.playWoodClick();
                        setEventType(type.id);
                      }}
                      className={`p-2.5 text-xs font-semibold rounded-xl border text-center transition-all ${
                        eventType === type.id
                          ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-sm'
                          : 'border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Expected Number of Guests
                  </label>
                  <span className="font-heading text-xl font-bold text-amber-400 tabular-nums">
                    {guestCount} Guests
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="450"
                  step="10"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 tabular-nums">
                  <span>30 (Intimate)</span>
                  <span>150 (Mid-Size)</span>
                  <span>300 (Grand)</span>
                  <span>450 (Max Capacity)</span>
                </div>
              </div>
            </div>

            {/* Live Recommendation & Estimate Box (col-span-5) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950/80 border border-amber-500/40 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                  Recommended Venue & Package
                </span>
                <h4 className="font-heading text-lg font-bold text-white text-amber-300">
                  {recommendedHall}
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Includes full hall decoration, banquet seating, raised ceremony stage, PA sound setup, and dedicated buffet service.
                </p>

                <div className="mt-5 space-y-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Catering estimate:</span>
                    <span className="font-semibold text-white tabular-nums">Rs {basePrice} / guest</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Est. Food & Beverage Total:</span>
                    <span className="font-semibold text-amber-400 tabular-nums">
                      Rs {(basePrice * guestCount).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 text-[11px]">
                    <span>Hall Rental & Standard Sound:</span>
                    <span className="text-emerald-400">Included in Catering Package</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.playSuccess();
                  onOpenBanquetBooking(`${recommendedHall} (${guestCount} guests, ${eventType})`);
                }}
                className="mt-6 w-full py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95 text-center"
              >
                Book Date or Request Quotation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
