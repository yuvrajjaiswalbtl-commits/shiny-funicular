import React from 'react';
import { motion } from 'motion/react';
import { Award, HeartHandshake, UtensilsCrossed, Music2, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { sound } from '../services/soundService';

export const AboutStory: React.FC = () => {
  const highlights = [
    {
      icon: UtensilsCrossed,
      title: "Himalayan Gastronomy",
      desc: "Authentic Thakali thalis, charcoal-seared sekuwa, and royal curries prepared with indigenous jimbu and timur herbs."
    },
    {
      icon: Music2,
      title: "Grand Stage & Live Music",
      desc: "Equipped with professional sound engineering, acoustic baffling, and projection for wedding bands and cultural nights."
    },
    {
      icon: HeartHandshake,
      title: "Atithi Devo Bhava",
      desc: "Grounded in genuine Nepalese hospitality, welcoming guests from Siddharthanagar, Butwal, and international Lumbini travelers."
    },
    {
      icon: Award,
      title: "Hotel Atithi Synergy",
      desc: "Centrally located with complete hotel amenities, secure parking, valet services, and executive guest accommodation."
    }
  ];

  return (
    <section id="story" className="py-24 bg-[#faf8f5] dark:bg-[#070e1c] text-slate-800 dark:text-slate-100 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold mb-2"
          >
            The Heritage & Vision
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance"
          >
            Rooted in Tradition, Crafted for Modern Celebrations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed"
          >
            Named after <em>Mata Annapurna</em>—the goddess of nourishment and abundance—Annapurna Heritage was founded to offer Lumbini Province an unmatched culinary haven where royal heritage and modern hospitality coexist.
          </motion.p>
        </div>

        {/* 2-Column Split: Visual Narrative & Editorial Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Media with Authentic Khabar Patro Feature (col-span-6) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-slate-900">
              <img
                src={RESTAURANT_INFO.images.heroCollage}
                alt="Annapurna Heritage newspaper feature in Khabar Patro showing banquet hall stage and dining areas"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-white/95 dark:bg-slate-900/95 border-t border-amber-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Press & Community Feature
                  </span>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                    Celebrated as Siddharthanagar’s Premier Dining & Event Venue
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Overlapping Detail Card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-64 p-4 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-amber-500/30 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Verified Standard</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-snug">
                Rated 4.8 Stars on Google across 68+ local and international traveler reviews.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Key Highlights (col-span-6) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              <p>
                Conveniently located within <strong className="text-slate-900 dark:text-white font-semibold">Hotel Atithi International</strong> in Siddharthanagar, our venue serves as a cultural gathering hub for both local families celebrating weddings and visitors exploring Lumbini’s UNESCO World Heritage sites.
              </p>
              <p>
                From hand-ground mountain spices to bespoke event decor, our seasoned culinary team and banquet coordinators orchestrate every detail with precision. Whether you drop in for an authentic Thakali thali lunch, an evening sizzler with friends, or host a 350-guest wedding reception, we treat you like family.
              </p>
            </div>

            {/* 4 Feature Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => sound.playWoodClick()}
                    className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-amber-400/50 transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
