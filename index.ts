export interface MenuItem {
  id: string;
  name: string;
  nepaliName?: string;
  category: 'nepali' | 'tandoori' | 'mains' | 'continental' | 'beverages';
  description: string;
  price: number; // In Nepalese Rupees (Rs)
  isVeg: boolean;
  isChefSpecial?: boolean;
  spiciness?: 1 | 2 | 3; // 1 mild, 2 medium, 3 spicy
  image?: string;
  imagePlaceholder?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface BanquetPackage {
  id: string;
  name: string;
  capacityRange: string;
  recommendedFor: string;
  highlightFeatures: string[];
  startingPricePerPlate: number; // In Rs
  image: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  eventOrDish: string;
}

export interface ReservationDetails {
  fullName: string;
  phone: string;
  email?: string;
  guests: number;
  date: string;
  timeSlot: string;
  seatingArea: 'main-lounge' | 'family-booth' | 'banquet-hall' | 'outdoor-patio';
  specialOccasion?: string;
  notes?: string;
}
