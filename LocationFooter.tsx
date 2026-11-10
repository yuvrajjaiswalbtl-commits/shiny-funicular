import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, ShieldCheck, Heart, Download } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { sound } from '../services/soundService';
import { AnnapurnaLogo } from './AnnapurnaLogo';

interface LocationFooterProps {
  onOpenReservation: () => void;
  onOpenDelivery: () => void;
}

export const LocationFooter: React.FC<LocationFooterProps> = ({
  onOpenReservation,
  onOpenDelivery
}) => {
  return (
    <footer id="contact" className="bg-[#050b14] text-slate-300 pt-20 pb-12 border-t border-amber-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Col 1: Brand & Identity (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border border-amber-400/60 bg-slate-900 flex items-center justify-center p-1.5 shadow-md shadow-amber-500/20">
                <AnnapurnaLogo className="w-full h-full" />
              </div>
              <span className="font-heading text-xl font-bold text-white tracking-wide">
                Annapurna Heritage
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Siddharthanagar’s premier dining destination and 400-guest luxury banquet venue. Situated at Hotel Atithi International, offering royal Himalayan dining, weddings, and catering.
            </p>

            {/* Google Rating badge */}
            <div className="mt-5 p-3 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center gap-3">
              <div className="text-amber-400 font-heading text-xl font-bold">4.8 ★</div>
              <div className="text-xs text-slate-300">
                <div className="font-semibold text-white">Google Maps Verified</div>
                <div className="text-[11px] text-slate-400">68 Community Reviews</div>
              </div>
            </div>
          </div>

          {/* Col 2: Location & Directions (col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4 text-amber-400">
              Address & Venue
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Hotel Atithi International</strong>
                  <span>Siddharthanagar, Lumbini Province 00977, Nepal</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Daily Dining Hours</span>
                  <span>Open: 9:00 AM – 10:00 PM</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Hotel+Atithi+International+Siddharthanagar"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playWoodClick()}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Direct Hotlines & Delivery (col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4 text-amber-400">
              Contact & Hotline
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <span className="text-slate-400 text-[11px] block">Express Delivery Hotlines:</span>
                <a
                  href={`tel:${RESTAURANT_INFO.deliveryHotline1}`}
                  onClick={() => sound.playWoodClick()}
                  className="font-mono text-sm font-bold text-white hover:text-amber-400 block mt-0.5"
                >
                  {RESTAURANT_INFO.deliveryHotline1}
                </a>
                <a
                  href={`tel:${RESTAURANT_INFO.deliveryHotline2}`}
                  onClick={() => sound.playWoodClick()}
                  className="font-mono text-sm font-bold text-white hover:text-amber-400 block mt-0.5"
                >
                  {RESTAURANT_INFO.deliveryHotline2}
                </a>
              </div>

              <div className="pt-1">
                <span className="text-slate-400 text-[11px] block">Reception & Booking Desk:</span>
                <a
                  href={`tel:${RESTAURANT_INFO.receptionTel}`}
                  onClick={() => sound.playWoodClick()}
                  className="font-mono text-xs font-semibold text-slate-200 hover:text-amber-400 block mt-0.5"
                >
                  {RESTAURANT_INFO.receptionTel}
                </a>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playChime();
                    onOpenReservation();
                  }}
                  className="w-full py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-300 transition-colors"
                >
                  Reserve Table / Hall
                </button>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Links (col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4 text-amber-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" onClick={() => sound.playWoodClick()} className="hover:text-amber-400 transition-colors">Digital Menu</a>
              </li>
              <li>
                <a href="#banquet" onClick={() => sound.playWoodClick()} className="hover:text-amber-400 transition-colors">Banquet Packages</a>
              </li>
              <li>
                <a href="#story" onClick={() => sound.playWoodClick()} className="hover:text-amber-400 transition-colors">Heritage Story</a>
              </li>
              <li>
                <a href="#gallery" onClick={() => sound.playWoodClick()} className="hover:text-amber-400 transition-colors">Photo Gallery</a>
              </li>
              <li>
                <a href="#reviews" onClick={() => sound.playWoodClick()} className="hover:text-amber-400 transition-colors">Customer Reviews</a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    sound.playChime();
                    onOpenDelivery();
                  }}
                  className="text-amber-400 hover:underline"
                >
                  Order Delivery
                </button>
              </li>
              <li className="pt-2">
                <a
                  href="/annapurna-heritage-website.zip"
                  download="annapurna-heritage-website.zip"
                  onClick={() => sound.playSuccess()}
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Project ZIP</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiet Sub-Footer per Guidelines */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {RESTAURANT_INFO.fullName}. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Hotel Atithi International</span>
            <span aria-hidden="true">·</span>
            <span>Siddharthanagar 00977, Nepal</span>
            <span aria-hidden="true">·</span>
            <span>Dine-in · Takeaway · Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
