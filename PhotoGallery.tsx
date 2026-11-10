import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { sound } from '../services/soundService';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: 'ambience' | 'banquet' | 'exterior' | 'brand';
  description: string;
}

export const PhotoGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      src: RESTAURANT_INFO.images.interiorLounge,
      title: 'Handcrafted Wooden Dining Lounge',
      category: 'ambience',
      description: 'Cozy booths with green and blue cushions, natural timber furnishings, and ambient modern lighting for relaxed family dining.'
    },
    {
      id: 'gal-2',
      src: RESTAURANT_INFO.images.heroCollage,
      title: 'Grand Banquet Hall & Stage Facility',
      category: 'banquet',
      description: 'Comprehensive venue view featured in Khabar Patro, showcasing our raised ceremony stage, chandeliers, and seating.'
    },
    {
      id: 'gal-3',
      src: RESTAURANT_INFO.images.exteriorFacade,
      title: 'Hotel Atithi International Entrance',
      category: 'exterior',
      description: 'Architectural yellow frontage and glass entrance doors along the central roadway in Siddharthanagar.'
    },
    {
      id: 'gal-4',
      src: RESTAURANT_INFO.images.brandCrest,
      title: 'Annapurna Heritage Royal Crest & Delivery',
      category: 'brand',
      description: 'The golden AH monogram and hotline emblem for our direct food delivery service.'
    },
    {
      id: 'gal-5',
      src: RESTAURANT_INFO.images.signboard,
      title: 'Official Golden Signboard & Filigree',
      category: 'brand',
      description: 'Luxury gold filigree and stylized emblem gracing the restaurant greeting reception.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'ambience', label: 'Dining Ambience' },
    { id: 'banquet', label: 'Banquet & Stage' },
    { id: 'exterior', label: 'Facade & Hotel' },
    { id: 'brand', label: 'Royal Crest' }
  ];

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  const handleOpenPhoto = (idx: number) => {
    sound.playChime();
    setActivePhotoIdx(idx);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playWoodClick();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((activePhotoIdx - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playWoodClick();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((activePhotoIdx + 1) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#faf8f5] dark:bg-[#070e1c] text-slate-800 dark:text-slate-100 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold mb-2 block flex items-center justify-center gap-1.5">
            <Camera className="w-4 h-4" />
            Visual Tour
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            A Glimpse into Annapurna Heritage
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            Explore authentic photographs of our dining halls, grand stage, hotel exterior, and hospitality spaces in Siddharthanagar.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/80 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  sound.playWoodClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleOpenPhoto(idx)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer border border-slate-200 dark:border-slate-800 hover:border-amber-400 shadow-md hover:shadow-xl transition-all duration-300 aspect-[4/3] bg-slate-900"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Overlaid Title and Action */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-400 block mb-0.5">
                        {item.category}
                      </span>
                      <h3 className="font-heading text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-1 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhotoIdx !== null && (
        <div
          onClick={() => setActivePhotoIdx(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <button
            onClick={() => {
              sound.playWoodClick();
              setActivePhotoIdx(null);
            }}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 transition-colors"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left / Right Nav Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 hidden sm:block"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 hidden sm:block"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={filteredItems[activePhotoIdx].src}
              alt={filteredItems[activePhotoIdx].title}
              className="max-w-full max-h-[70vh] object-contain rounded-xl border border-white/20 shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center max-w-xl text-white">
              <h3 className="font-heading text-lg font-bold text-amber-400">
                {filteredItems[activePhotoIdx].title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {filteredItems[activePhotoIdx].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
