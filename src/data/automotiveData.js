import { THEME_COLORS } from '../theme/colors';

/**
 * APEX AUTO - Automotive Services Discovery & Parts Marketplace Data
 * Colors dynamically reference src/theme/colors.js
 */

export const CATEGORIES = [
  {
    id: "garages",
    name: "Vehicle Garages",
    icon: "Warehouse",
    count: "48 Garages",
    description: "Full-service automotive workshops and certified mechanic bays",
    markerColor: THEME_COLORS.racingYellow
  },
  {
    id: "repair",
    name: "Vehicle Repair Services",
    icon: "Wrench",
    count: "62 Centers",
    description: "Engine diagnostics, gearbox rebuilds, suspensions, and brakes",
    markerColor: THEME_COLORS.infoBlue
  },
  {
    id: "maintenance",
    name: "Vehicle Maintenance",
    icon: "Gauge",
    count: "35 Centers",
    description: "Scheduled oil changes, filter renewals, fluid flushes, inspections",
    markerColor: THEME_COLORS.infoBlue
  },
  {
    id: "detailing",
    name: "Vehicle Washing & Detailing",
    icon: "Sparkles",
    count: "29 Centers",
    description: "Ceramic coating, paint correction, interior steam clean, PPF",
    markerColor: THEME_COLORS.infoBlue
  },
  {
    id: "tires",
    name: "Tire Shops & Alignment",
    icon: "CircleDot",
    count: "41 Centers",
    description: "High-performance tires, 3D laser alignment, balancing, puncture repair",
    markerColor: THEME_COLORS.racingYellow
  },
  {
    id: "parts",
    name: "Spare Parts & Accessories",
    icon: "PackageCheck",
    count: "84 Stores",
    description: "OEM & aftermarket parts, turbos, exhaust systems, performance chips",
    markerColor: THEME_COLORS.successGreen
  },
  {
    id: "electrical",
    name: "Auto Electrical Services",
    icon: "Zap",
    count: "24 Centers",
    description: "ECU remapping, sensor diagnostics, alternator, battery systems",
    markerColor: THEME_COLORS.infoBlue
  },
  {
    id: "bodywork",
    name: "Vehicle Body & Paint Shops",
    icon: "ShieldCheck",
    count: "19 Studios",
    description: "Accident restoration, computerized color matching, dent repair",
    markerColor: THEME_COLORS.racingYellow
  }
];

export const INITIAL_SHOPS = [
  {
    id: "shop-1",
    name: "Apex Performance Garage & Tuning",
    category: "Vehicle Garages",
    categoryId: "garages",
    rating: 4.9,
    reviewCount: 142,
    distance: "1.2 km away",
    location: "482 Industrial Parkway, West District",
    city: "Metropolis",
    isOpen: true,
    openingHours: "Mon - Sat: 08:00 AM - 07:00 PM",
    phone: "+1 (555) 839-2041",
    email: "contact@apexperformance.com",
    verified: true,
    coverImage: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Specialized in German performance platforms and sports car maintenance. Certified technicians with factory-grade diagnostic suites and dyno-tuning facilities.",
    services: [
      "Dyno ECU Calibration",
      "Major & Minor Engine Overhaul",
      "Brembo & Carbon-Ceramic Brakes",
      "Performance Suspension Tuning",
      "Track Day Preparation",
      "Laser Wheel Alignment"
    ],
    coords: { x: 38, y: 44 }, // Percentage coordinates on interactive vector map
    lat: 34.0522,
    lng: -118.2437
  },
  {
    id: "shop-2",
    name: "Titan Motorwerks Repair Hub",
    category: "Vehicle Repair Services",
    categoryId: "repair",
    rating: 4.8,
    reviewCount: 98,
    distance: "2.4 km away",
    location: "128 Commerce Way, Eastside",
    city: "Metropolis",
    isOpen: true,
    openingHours: "Mon - Fri: 07:30 AM - 06:30 PM",
    phone: "+1 (555) 749-9182",
    email: "service@titanmotorwerks.com",
    verified: true,
    coverImage: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80"
    ],
    description: "State-of-the-art repair center offering full engine diagnostics, transmission replacement, and electrical system restoration with genuine manufacturer warranties.",
    services: [
      "Computerized Engine Diagnostics",
      "Dual-Clutch Transmission Repair",
      "Air Conditioning Service",
      "Suspension Bushing Replacements",
      "Exhaust Leak & Catalytic Repair"
    ],
    coords: { x: 62, y: 35 },
    lat: 34.0625,
    lng: -118.2312
  },
  {
    id: "shop-3",
    name: "Veloce OEM & Race Parts Marketplace",
    category: "Spare Parts & Accessories",
    categoryId: "parts",
    rating: 4.9,
    reviewCount: 215,
    distance: "3.1 km away",
    location: "92 Motorsport Avenue, North Bay",
    city: "Metropolis",
    isOpen: true,
    openingHours: "Mon - Sat: 08:30 AM - 08:00 PM",
    phone: "+1 (555) 612-4409",
    email: "parts@veloceauto.com",
    verified: true,
    coverImage: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The largest catalog of OEM factory replacement parts, forged alloy wheels, aftermarket turbos, coilover kits, and authentic carbon-fiber aerodynamic parts.",
    services: [
      "OEM Factory Part Sourcing",
      "Performance Intake & Exhaust",
      "Forged Wheels & Tires",
      "Braking Pads, Rotors & Lines",
      "Engine Oil & Specialty Lubricants",
      "Same-Day Courier Dispatch"
    ],
    coords: { x: 26, y: 65 },
    lat: 34.0418,
    lng: -118.2589
  },
  {
    id: "shop-4",
    name: "Obsidian Auto Detail & Ceramic Lab",
    category: "Vehicle Washing & Detailing",
    categoryId: "detailing",
    rating: 4.9,
    reviewCount: 88,
    distance: "3.8 km away",
    location: "710 Boulevard of Speed, Midtown",
    city: "Metropolis",
    isOpen: false,
    openingHours: "Tue - Sun: 09:00 AM - 06:00 PM (Closed Mon)",
    phone: "+1 (555) 492-3310",
    email: "concierge@obsidiandetail.com",
    verified: true,
    coverImage: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Dust-free, temperature-controlled studio delivering multi-stage paint correction, self-healing paint protection film (PPF), and Gyeon quartz ceramic coatings.",
    services: [
      "9H Multi-Year Ceramic Coatings",
      "Self-Healing PPF Full Wrap",
      "3-Stage Machine Paint Correction",
      "Alcantara & Leather Conditioning",
      "Hand Foam Wash & Underbody Flush"
    ],
    coords: { x: 74, y: 68 },
    lat: 34.0389,
    lng: -118.2251
  },
  {
    id: "shop-5",
    name: "Circuit Tire & Track Alignment Center",
    category: "Tire Shops & Alignment",
    categoryId: "tires",
    rating: 4.7,
    reviewCount: 76,
    distance: "4.5 km away",
    location: "305 Racing Loop, South Harbor",
    city: "Metropolis",
    isOpen: true,
    openingHours: "Mon - Sat: 08:00 AM - 06:00 PM",
    phone: "+1 (555) 301-8842",
    email: "tires@circuittire.com",
    verified: true,
    coverImage: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Hunter HawkEye Elite 3D laser alignment systems, road-force balance machines, and stock of Michelin Pilot Sport, Pirelli P Zero, and Continental semi-slicks.",
    services: [
      "Hunter 3D Laser Alignment",
      "Road-Force Wheel Balancing",
      "Track Day Corner Balancing",
      "Run-Flat & Low-Profile Mounting",
      "Nitrogen Tire Fill"
    ],
    coords: { x: 48, y: 80 },
    lat: 34.0298,
    lng: -118.2411
  },
  {
    id: "shop-6",
    name: "Precision Auto Electric & ECU Tech",
    category: "Auto Electrical Services",
    categoryId: "electrical",
    rating: 4.8,
    reviewCount: 63,
    distance: "5.1 km away",
    location: "15 Circuit Plaza, Tech District",
    city: "Metropolis",
    isOpen: true,
    openingHours: "Mon - Fri: 08:00 AM - 06:00 PM",
    phone: "+1 (555) 219-5501",
    email: "diagnostics@precisionelectric.com",
    verified: false,
    coverImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Specialists in modern vehicle harness wiring, high-voltage EV/hybrid modules, keyless entry programming, alternators, and advanced CAN-bus diagnostics.",
    services: [
      "CAN-Bus Protocol Analysis",
      "Alternator & Starter Overhaul",
      "Lithium Battery Diagnostics",
      "ECU Coding & Immobilizer Reset",
      "Radar & ADAS Sensor Calibration"
    ],
    coords: { x: 82, y: 25 },
    lat: 34.0712,
    lng: -118.2198
  }
];

export const MOCK_OWNER_STATS = {
  profileViews: "2,840",
  searchImpressions: "14,920",
  directionsRequested: "348",
  ratingAverage: "4.9",
  totalReviews: "142",
  listingStatus: "Verified & Active"
};
