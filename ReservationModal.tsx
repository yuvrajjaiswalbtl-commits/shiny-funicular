import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, MapPin, Sparkles, CheckCircle2, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { sound } from '../services/soundService';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedHall?: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  preselectedHall
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    guests: 4,
    date: new Date().toISOString().split('T')[0],
    timeSlot: '19:30',
    area: preselectedHall || 'main-lounge',
    specialOccasion: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    const ref = `AH-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0d1c33] border border-amber-500/30 text-slate-800 dark:text-slate-100 shadow-2xl p-6 sm:p-8"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playWoodClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close reservation dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="text-center mb-6">
              <span className="text-[11px] uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold mb-1 block">
                Annapurna Heritage Hospitality
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Table & Banquet Reservation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Located at Hotel Atithi International, Siddharthanagar
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9857051796"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Date, Time & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Time Slot *
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="12:00">12:00 PM (Lunch)</option>
                    <option value="13:30">01:30 PM (Lunch)</option>
                    <option value="16:00">04:00 PM (High Tea)</option>
                    <option value="18:30">06:30 PM (Dinner)</option>
                    <option value="19:30">07:30 PM (Dinner)</option>
                    <option value="20:30">08:30 PM (Dinner)</option>
                    <option value="21:15">09:15 PM (Late Dining)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Guests Count *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="450"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 tabular-nums"
                  />
                </div>
              </div>

              {/* Seating / Hall Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Venue Area
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="main-lounge">Handcrafted Wooden Dining Lounge</option>
                  <option value="family-booth">Private Family Seating Booth</option>
                  <option value="Grand Royal Banquet Hall">Grand Royal Banquet Hall (Stage & Chandeliers)</option>
                  <option value="executive-suite">Executive Meeting / Conference Suite</option>
                </select>
              </div>

              {/* Special Occasion & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Special Occasion (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.specialOccasion}
                    onChange={(e) => setFormData({ ...formData, specialOccasion: e.target.value })}
                    placeholder="e.g. Birthday, Anniversary, Wedding"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Special Requests
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Jain food, cake, projector"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all active:scale-95 text-center flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Reservation Request</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-slate-500 dark:text-slate-400">
                Immediate confirmation available via phone: {RESTAURANT_INFO.deliveryHotline1}
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 mx-auto mb-4 animate-in zoom-in-75">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">
              Reservation Received
            </span>
            <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Namaste, {formData.fullName}!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              Your reservation request has been submitted to the hostess desk at Hotel Atithi International.
            </p>

            {/* Booking Details Card */}
            <div className="my-6 p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-amber-500/20 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Booking Reference:</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Guests & Time:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formData.guests} Guests at {formData.timeSlot} on {formData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="text-slate-900 dark:text-white">Hotel Atithi International, Siddharthanagar</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact:</span>
                <span className="text-slate-900 dark:text-white">{formData.phone}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`tel:${RESTAURANT_INFO.deliveryHotline1}`}
                onClick={() => sound.playWoodClick()}
                className="w-full py-3 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Hostess Desk ({RESTAURANT_INFO.deliveryHotline1})</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
              >
                Close & Return
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
