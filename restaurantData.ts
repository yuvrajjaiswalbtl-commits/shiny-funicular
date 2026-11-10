import { MenuItem, BanquetPackage, ReviewItem } from '../types';

export const RESTAURANT_INFO = {
  name: "Annapurna Heritage",
  fullName: "Annapurna Heritage Restaurant & Banquet Pvt. Ltd",
  location: "Siddharthanagar, Lumbini Province 00977, Nepal",
  locatedIn: "Hotel Atithi International",
  deliveryHotline1: "071-570055",
  deliveryHotline2: "9857051796",
  receptionTel: "071-520000",
  rating: 4.8,
  reviewCount: 68,
  priceRange: "Rs 500 – 2,000 per person",
  hours: "9:00 AM – 10:00 PM Daily",
  services: ["Fine Dine-in", "Takeaway", "Express Delivery", "Luxury Banquet", "Corporate Events", "Outdoor Catering"],
  images: {
    heroCollage: "/assets/aistudio/Screenshot_2026-11-10_140206_1dd23700.png",
    interiorLounge: "/assets/aistudio/Screenshot_2026-11-10_140447_af742ebf.png",
    brandCrest: "/assets/aistudio/Screenshot_2026-11-10_140230_9c77b7b6.png",
    signboard: "/assets/aistudio/Screenshot_2026-11-10_140108_210f8a21.png",
    exteriorFacade: "/assets/aistudio/Screenshot_2026-11-10_140140_764caf85.png",
  }
};

export const MENU_ITEMS: MenuItem[] = [
  // Nepali & Himalayan Heritage
  {
    id: "nep-1",
    name: "Annapurna Royal Thakali Thali (Mutton)",
    nepaliName: "अन्नपूर्ण विशेष थकाली थाली (खसीको मासु)",
    category: "nepali",
    description: "Traditional Himalayan brass plate with slow-cooked mountain mutton curry, black lentil dal, gundruk bhatmas sadeko, steamed fragrant basmati rice, mustard greens, homemade pickles and curd.",
    price: 850,
    isVeg: false,
    isChefSpecial: true,
    spiciness: 2,
    image: "/src/assets/images/thakali_thali_mutton_1794307259929.jpg",
  },
  {
    id: "nep-2",
    name: "Heritage Thakali Special (Pure Veg)",
    nepaliName: "शान्दार शाकाहारी थकाली थाली",
    category: "nepali",
    description: "Authentic multi-course vegetarian platter: paneer gravy, timur aloo dum, jimbu-tempered black lentils, sauteed saag, spicy tomato achar, papad, and fresh sweet kheer.",
    price: 550,
    isVeg: true,
    isChefSpecial: false,
    spiciness: 1,
    image: "/src/assets/images/veg_thakali_thali_1794307467734.jpg",
  },
  {
    id: "nep-3",
    name: "Himalayan Kothey Momo (Chicken / Buff)",
    nepaliName: "हिमालयन कोथे म:म:",
    category: "nepali",
    description: "Pan-crisped handmade dumplings infused with fresh ginger, coriander, and Himalayan herbs, served with spicy Sichuan pepper (timur) dip and sesame broth.",
    price: 360,
    isVeg: false,
    isChefSpecial: true,
    spiciness: 2,
    image: "/src/assets/images/himalayan_kothey_momo_1794307261251.jpg",
  },
  {
    id: "nep-4",
    name: "Chicken Sekuwa & Beaten Rice",
    nepaliName: "चिकन सेकुवा र चिउरा",
    category: "nepali",
    description: "Charcoal-grilled country chicken morsels marinated in roasted cumin, garlic, and mustard oil, served with crisp baji (chiura) and radish pickle.",
    price: 490,
    isVeg: false,
    isChefSpecial: true,
    spiciness: 2,
    image: "/src/assets/images/chicken_sekuwa_nepali_1794307262512.jpg",
  },

  // Royal Tandoori & Kebabs
  {
    id: "tan-1",
    name: "Heritage Murgh Tandoori (Whole / Half)",
    nepaliName: "शाही तन्दुरी चिकेन",
    category: "tandoori",
    description: "Spring chicken steeped in Kashmiri chilli marinade, hung yogurt, and stone-ground spices, clay-oven roasted to tender smoky perfection.",
    price: 780,
    isVeg: false,
    isChefSpecial: true,
    spiciness: 2,
    image: "/src/assets/images/murgh_tandoori_royal_1794307262784.jpg",
  },
  {
    id: "tan-2",
    name: "Paneer Tikka Peshawari",
    nepaliName: "पेशावरी पनिर टिक्का",
    category: "tandoori",
    description: "Generous cubes of cottage cheese layered with bell peppers and Spanish onions, basted with saffron-infused yogurt glaze and cooked over embers.",
    price: 480,
    isVeg: true,
    isChefSpecial: false,
    spiciness: 1,
    image: "/src/assets/images/paneer_tikka_peshawari_1794307468000.jpg",
  },
  {
    id: "tan-3",
    name: "Bhairahawa Tandoori Platter",
    nepaliName: "भैरहवा तन्दुरी मिक्स्ड प्लाटर",
    category: "tandoori",
    description: "Grand assortment of chicken tikka, mutton seekh kebab, fish ajwaini tikka, and tandoori wings served on a sizzling iron skillet with mint chutney.",
    price: 1350,
    isVeg: false,
    isChefSpecial: true,
    spiciness: 2,
    image: "/src/assets/images/tandoori_mixed_platter_1794307505552.jpg",
  },

  // Mains & Curries
  {
    id: "main-1",
    name: "Mutton Rogan Josh Kashmiri",
    nepaliName: "शाही मटन रोगन जोश",
    category: "mains",
    description: "Tender goat meat slow-simmered in an aromatic gravy infused with ratanjot, cardamom pods, fennel, and whole Indian spices.",
    price: 890,
    isVeg: false,
    isChefSpecial: true,
    spiciness: 2,
    image: "/src/assets/images/mutton_rogan_josh_1794307469104.jpg",
  },
  {
    id: "main-2",
    name: "Butter Chicken Heritage Royale",
    nepaliName: "हेरिटेज बटर चिकेन",
    category: "mains",
    description: "Tandoori chicken pulled and braised in a silky, rich reduction of ripe vine tomatoes, butter, cashew paste, and wild fenugreek leaves.",
    price: 720,
    isVeg: false,
    isChefSpecial: true,
    spiciness: 1,
    image: "/src/assets/images/butter_chicken_royale_1794307263392.jpg",
  },
  {
    id: "main-3",
    name: "Dal Makhani Grand Heritage",
    nepaliName: "शाही दाल मखनी",
    category: "mains",
    description: "Whole black urad lentils and kidney beans simmered overnight on a low flame with fresh cream, churned butter, and gentle ginger notes.",
    price: 450,
    isVeg: true,
    isChefSpecial: false,
    spiciness: 1,
    image: "/src/assets/images/dal_makhani_royal_1794307506940.jpg",
  },
  {
    id: "main-4",
    name: "Hydrabadi Dum Biryani (Chicken/Mutton)",
    nepaliName: "शाही हैदराबादी दम बिर्यानी",
    category: "mains",
    description: "Long-grain aged basmati rice cooked on sealed 'dum' with saffron milk, caramelised onions, fresh mint, and spiced meat. Accompanied by burani raita.",
    price: 680,
    isVeg: false,
    isChefSpecial: false,
    spiciness: 2,
    image: "/src/assets/images/dum_biryani_royal_1794307470324.jpg",
  },

  // Continental & Sizzlers
  {
    id: "cont-1",
    name: "Annapurna Signature Himalayan Sizzler",
    nepaliName: "अन्नपूर्ण हिमालयन सिज्लर",
    category: "continental",
    description: "Steaming hot cast-iron platter loaded with grilled chicken breast, buttered seasonal greens, herb-roasted potato wedges, and mushroom pepper sauce.",
    price: 820,
    isVeg: false,
    isChefSpecial: true,
    spiciness: 2,
    image: "/src/assets/images/himalayan_sizzler_1794307469839.jpg",
  },
  {
    id: "cont-2",
    name: "Crispy Chilli Chicken Indo-Chinese",
    nepaliName: "चिकन चिल्ली",
    category: "continental",
    description: "Wok-tossed chicken chunks with crispy garlic, green chillies, spring onions, and oriental dark soya reduction.",
    price: 490,
    isVeg: false,
    isChefSpecial: false,
    spiciness: 3,
    image: "/src/assets/images/crispy_chilli_chicken_1794307505355.jpg",
  },
  {
    id: "cont-3",
    name: "Heritage Vegetable Sizzler with Fried Rice",
    nepaliName: "शाकाहारी भेज सिज्लर",
    category: "continental",
    description: "Grilled cottage cheese steaks on a bed of oriental vegetable fried rice, steamed broccoli, baby corn, and garlic pepper sauce.",
    price: 650,
    isVeg: true,
    isChefSpecial: false,
    spiciness: 1,
    image: "/src/assets/images/himalayan_sizzler_1794307469839.jpg",
  },

  // Beverages & Sweets
  {
    id: "bev-1",
    name: "Royal Kesar Pista Lassi",
    nepaliName: "शाही केसर पिस्ता लस्सी",
    category: "beverages",
    description: "Thick curd whipped with pure saffron threads, crushed pistachios, cardamom, and rose water in a traditional terracotta style.",
    price: 240,
    isVeg: true,
    isChefSpecial: true,
    image: "/src/assets/images/royal_kesar_lassi_1794307503522.jpg",
  },
  {
    id: "bev-2",
    name: "Fresh Mint & Lemon Masala Mojito",
    nepaliName: "पुदिना र कागती मोजिटो",
    category: "beverages",
    description: "Muddled fresh garden mint, Himalayan rock salt, lime juice, and sparkling soda - supremely refreshing for Lumbini afternoons.",
    price: 210,
    isVeg: true,
    isChefSpecial: false,
    image: "/src/assets/images/royal_kesar_lassi_1794307503522.jpg",
  },
  {
    id: "bev-3",
    name: "Hot Gulab Jamun with Shahi Rabdi",
    nepaliName: "गुलाब जामुन र शाही रबडी",
    category: "beverages",
    description: "Warm milk dumplings soaked in green cardamom syrup, crowned with chilled slow-reduced clotted cream and slivered almonds.",
    price: 280,
    isVeg: true,
    isChefSpecial: true,
    image: "/src/assets/images/gulab_jamun_rabdi_1794307504452.jpg",
  }
];

export const BANQUET_HALLS: BanquetPackage[] = [
  {
    id: "royal-banquet-hall",
    name: "Grand Royal Banquet Hall",
    capacityRange: "150 – 400+ Guests",
    recommendedFor: "Weddings, Grand Receptions, National Conferences & Award Nights",
    startingPricePerPlate: 1250,
    image: "/assets/aistudio/Screenshot_2026-11-10_140206_1dd23700.png",
    highlightFeatures: [
      "Raised ceremonial stage with decorative backdrop framing",
      "Theatrical chandeliers, ambient mood illumination & LED spotlights",
      "State-of-the-art concert acoustic sound system & high-lumen projector",
      "Separate grand buffet & beverage service lounge",
      "Fully climate-controlled multi-zone air conditioning",
      "Dedicated green room / bridal preparation suite",
      "Hotel Atithi International parking & valet assistance"
    ]
  },
  {
    id: "heritage-dining-lounge",
    name: "Heritage Dining Lounge & Terrace",
    capacityRange: "50 – 120 Guests",
    recommendedFor: "Birthday Bashes, Anniversaries, Ring Ceremonies & Family Gatherings",
    startingPricePerPlate: 950,
    image: "/assets/aistudio/Screenshot_2026-11-10_140447_af742ebf.png",
    highlightFeatures: [
      "Handcrafted wooden booth sofas with plush contemporary seating",
      "Modern mocktail bar and live counter setup",
      "Private audio system with microphone and background music playlist",
      "Customizable floral & balloon celebration styling",
      "Flexible table layouts (Cocktail, Banquet round, or U-shape)"
    ]
  },
  {
    id: "executive-meeting-suite",
    name: "Executive Conference & Seminar Suite",
    capacityRange: "25 – 70 Delegates",
    recommendedFor: "Corporate Board Meetings, NGO Seminars, Product Launches",
    startingPricePerPlate: 850,
    image: "/assets/aistudio/Screenshot_2026-11-10_140140_764caf85.png",
    highlightFeatures: [
      "Wide projector screen with HDMI & wireless presentation mirroring",
      "High-speed business fiber Wi-Fi throughout",
      "Executive tea, high-tea snack breaks & plated lunch packages",
      "Stationery pads, laser pointers & conference podium"
    ]
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Bikash Shrestha",
    location: "Siddharthanagar (Bhairahawa)",
    rating: 5,
    date: "2 weeks ago",
    eventOrDish: "Wedding Reception for 280 Guests",
    comment: "Hosted our younger brother's wedding reception at Annapurna Heritage Banquet inside Hotel Atithi International. The stage setup, lighting, and stage acoustics were top notch! The food received praises from all guests—especially the mutton rogan josh and hot naan. The management took care of everything seamlessly."
  },
  {
    id: "rev-2",
    author: "Prerana Thapa",
    location: "Butwal, Lumbini",
    rating: 5,
    date: "1 month ago",
    eventOrDish: "Family Dinner & Thakali Thali",
    comment: "The interior with warm wooden seating is very cozy and premium compared to other places in Siddharthanagar. Their Royal Thakali Thali is rich and authentic with mountain herbs. Friendly staff and ample parking space. A definite 5-star experience."
  },
  {
    id: "rev-3",
    author: "Rajesh Kumar Jaiswal",
    location: "Siddharthanagar",
    rating: 5,
    date: "Recent Customer",
    eventOrDish: "Home Delivery Service (071-570055)",
    comment: "We ordered tandoori chicken, biryani, and butter paneer for a home get-together. Delivered piping hot within 35 minutes! Clean packaging and generous portion sizes. Super convenient delivery hotline."
  },
  {
    id: "rev-4",
    author: "Dr. Anupama Sharma",
    location: "Kathmandu (Traveler to Lumbini)",
    rating: 4.8,
    date: "3 weeks ago",
    eventOrDish: "Dine-in & Sizzler",
    comment: "Stopped here while staying in Siddharthanagar on our way to Mayadevi Temple, Lumbini. The ambience is soothing, air conditioning is great, and the chicken sizzler was sizzling with deep smoky flavors. Highly recommended when in Bhairahawa!"
  }
];

export const FAQS = [
  {
    q: "Where is Annapurna Heritage Restaurant & Banquet located?",
    a: "We are prominently situated inside Hotel Atithi International on the main arterial road of Siddharthanagar (Bhairahawa), Lumbini Province 00977, Nepal. Convenient access from Gautam Buddha International Airport and Bhairahawa bus terminus."
  },
  {
    q: "How do I order food delivery to my home or hotel?",
    a: "You can directly call our delivery hotlines at 071-570055 or 9857051796, or use the online order tray on this website to build your order with fast delivery across Siddharthanagar and nearby areas."
  },
  {
    q: "What is the capacity of the banquet hall?",
    a: "Our Grand Royal Banquet Hall accommodates up to 400+ guests for weddings and large receptions. For smaller private gatherings like birthdays, anniversaries, or conferences, we offer intimate lounges accommodating 30 to 120 guests."
  },
  {
    q: "Do you offer pure vegetarian or custom menu options for weddings?",
    a: "Yes! We specialize in tailored culinary menus including pure vegetarian Jain/Swaminarayan banquets, traditional Newari feasts, royal Mughlai spreads, and multi-cuisine buffet spreads with live chaat and dessert counters."
  },
  {
    q: "Is parking available for large events?",
    a: "Yes, Hotel Atithi International provides dedicated vehicle parking facilities with security and valet assistance for banquet guests."
  }
];
