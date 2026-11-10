import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Flame, Sparkles, Plus, Check, ShoppingBag, PhoneCall } from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';
import { MenuItem } from '../types';
import { sound } from '../services/soundService';

interface InteractiveMenuProps {
  onAddToCart: (item: MenuItem) => void;
  onOpenDelivery: () => void;
  cartCount: number;
}

export const InteractiveMenu: React.FC<InteractiveMenuProps> = ({
  onAddToCart,
  onOpenDelivery,
  cartCount
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Specialties' },
    { id: 'nepali', label: 'Himalayan & Nepali' },
    { id: 'tandoori', label: 'Tandoor & Kebabs' },
    { id: 'mains', label: 'Mains & Biryani' },
    { id: 'continental', label: 'Continental & Sizzlers' },
    { id: 'beverages', label: 'Beverages & Sweets' }
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesVeg = !vegOnly || item.isVeg;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.nepaliName && item.nepaliName.includes(searchQuery)) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesVeg && matchesSearch;
  });

  const handleAddItem = (item: MenuItem) => {
    sound.playWoodClick();
    onAddToCart(item);
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 1200);
  };

  return (
    <section id="menu" className="py-24 bg-white dark:bg-[#091428] text-slate-800 dark:text-slate-100 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold mb-2 block">
            Curated Culinary Masterpieces
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            The Heritage Dining Menu
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            From regal Thakali brass thalis to sizzling tandoori delicacies. Every recipe honors authentic mountain spices and royal culinary traditions.
          </p>

          {/* Quick delivery notice */}
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-medium">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Fast delivery in Siddharthanagar: {RESTAURANT_INFO.deliveryHotline1} / {RESTAURANT_INFO.deliveryHotline2}</span>
          </div>
        </div>

        {/* Search & Quick Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g., Thakali, Sekuwa, Biryani)..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Filter Tabs / Segmented Controls per Section 1.A */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  sound.playChime();
                  setActiveCategory(cat.id);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Veg Only Toggle */}
          <button
            type="button"
            onClick={() => {
              sound.playWoodClick();
              setVegOnly(!vegOnly);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
              vegOnly
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
            <span>Pure Veg Only</span>
          </button>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="group relative p-6 rounded-2xl bg-slate-50 dark:bg-[#0d1c33] border border-slate-200 dark:border-slate-800 hover:border-amber-400/50 transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Dish Photography if available */}
                    {item.image && (
                      <div className="relative -mx-6 -mt-6 mb-4 aspect-[16/10] overflow-hidden bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                        
                        {/* Overlay badges on photo */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-medium text-white border border-white/10">
                          <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                          <span>{item.isVeg ? 'Pure Veg' : 'Non-Veg'}</span>
                        </div>

                        {item.isChefSpecial && (
                          <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase shadow-md">
                            <Sparkles className="w-3 h-3" />
                            <span>Signature</span>
                          </div>
                        )}

                        <div className="absolute bottom-2.5 right-3 font-heading text-lg font-bold text-amber-300 drop-shadow tabular-nums">
                          Rs {item.price}
                        </div>
                      </div>
                    )}

                    {/* Top Row: Category Meta + Price (shown when no image) */}
                    {!item.image && (
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`} title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'} />
                          <span className="uppercase tracking-wider font-semibold">
                            {item.isVeg ? 'Vegetarian' : 'Non-Veg'}
                          </span>
                          {item.isChefSpecial && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                                <Sparkles className="w-3 h-3" />
                                Signature
                              </span>
                            </>
                          )}
                        </div>
                        {/* Price in Nepalese Rupees */}
                        <div className="text-right shrink-0">
                          <div className="font-heading text-lg font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                            Rs {item.price}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Title and Nepali script name */}
                    <h3 className="font-heading text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    {item.nepaliName && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                        {item.nepaliName}
                      </p>
                    )}

                    {/* Description */}
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                {/* Bottom Row: Spice level & Add to order button */}
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    {item.spiciness && (
                      <span className="flex items-center" title={`Spice Level: ${item.spiciness}/3`}>
                        {Array.from({ length: item.spiciness }).map((_, i) => (
                          <Flame key={i} className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                        ))}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddItem(item)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 dark:bg-amber-400 dark:hover:bg-amber-300 text-slate-950 text-xs font-semibold shadow-sm transition-all active:scale-95 whitespace-nowrap"
                  >
                    {addedItemId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-slate-950" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Order</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state if search returns nothing */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              No dishes found matching "{searchQuery}". Try searching for another item or resetting filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setVegOnly(false);
              }}
              className="mt-4 px-4 py-2 bg-amber-400 text-slate-950 font-semibold text-xs rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Floating Delivery Tray Callout if items are in cart */}
        {cartCount > 0 && (
          <div className="mt-12 p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-600/15 to-transparent border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                  {cartCount} item{cartCount > 1 ? 's' : ''} in your Delivery Basket
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Ready to send your order for delivery or takeaway in Siddharthanagar?
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.playChime();
                onOpenDelivery();
              }}
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 whitespace-nowrap"
            >
              Review Order & Call Hotline
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
