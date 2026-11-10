import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquareQuote, CheckCircle2, ChevronDown, ChevronUp, MapPin, ExternalLink } from 'lucide-react';
import { REVIEWS, FAQS, RESTAURANT_INFO } from '../data/restaurantData';
import { sound } from '../services/soundService';

export const ReviewsSection: React.FC = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    sound.playWoodClick();
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <section id="reviews" className="py-24 bg-white dark:bg-[#091428] text-slate-800 dark:text-slate-100 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold mb-2 block">
            Google Maps Verified Reviews
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Loved by Siddharthanagar & Travelers
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            Proudly maintaining a 4.8-star reputation across weddings, milestone family dinners, and daily food deliveries.
          </p>

          {/* Google Maps Score Box */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 p-4 rounded-2xl bg-amber-500/10 dark:bg-slate-800/80 border border-amber-500/30">
            <div className="flex items-center gap-2">
              <span className="font-heading text-3xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                4.8
              </span>
              <div className="flex flex-col items-start">
                <div className="flex items-center text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Based on 68 Google Reviews
                </span>
              </div>
            </div>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>
            <div className="text-xs text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">Price:</span> {RESTAURANT_INFO.priceRange}
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {REVIEWS.map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0d1c33] border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:border-amber-400/40 transition-colors"
            >
              <div>
                {/* Header: Author + Rating */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                        {rev.author}
                      </h4>
                      <span title="Verified Customer" className="inline-flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {rev.location}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-amber-400 bg-amber-500/10 px-2 py-1 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="text-xs font-bold ml-1 text-slate-800 dark:text-amber-300 tabular-nums">
                      {rev.rating}
                    </span>
                  </div>
                </div>

                {/* Event tag */}
                <div className="mb-3 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                  {rev.eventOrDish}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Google Verified Feedback</span>
                <span className="text-amber-600 dark:text-amber-400 font-medium">Hotel Atithi International</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="text-center mb-8">
            <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Common questions about dining, delivery, banquet hosting, and parking.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-heading font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
