import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  ChevronRight, 
  ShieldCheck, 
  Wrench, 
  Sparkles,
  Compass
} from 'lucide-react';

export default function HeroSection({ onSearch, onExploreMap, onUseLocation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <section className="relative w-full bg-[#0B0D10] border-b border-[#252A32] overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      
      {/* Background Visual: Cinematic Automotive Dark Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80"
          alt="Premium Automotive Performance Garage"
          className="w-full h-full object-cover object-center opacity-25 filter brightness-75 contrast-125"
        />
        {/* Radial Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/80 to-[#0B0D10]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#171A20] border border-[#252A32] text-xs font-semibold text-[#FFC400] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FFC400] animate-pulse" />
          <span className="tracking-widest uppercase">FIND. CONNECT. DRIVE BETTER.</span>
        </div>

        {/* Hero Headings */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F5F5F5] leading-[1.08] font-heading">
            Find the Right Garage. <br />
            <span className="text-[#FFC400]">Keep Your Vehicle Moving.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-[#A1A7B0] text-base sm:text-xl font-normal leading-relaxed">
            Discover trusted garages, vehicle services, and spare-parts shops near you. Real-time locations, ratings, and instant directions.
          </p>
        </div>

        {/* Prominent Search Bar Container */}
        <div className="max-w-3xl mx-auto">
          <form 
            onSubmit={handleSubmit}
            className="p-2 sm:p-2.5 rounded-2xl bg-[#171A20]/95 border border-[#252A32] shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-stretch gap-2"
          >
            {/* Search Input */}
            <div className="flex-1 flex items-center px-3 py-2 sm:py-0 space-x-2.5">
              <Search className="w-5 h-5 text-[#FFC400] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shop name, service, or parts (e.g. Brakes, Dyno, Tires)..."
                className="w-full bg-transparent text-[#F5F5F5] placeholder-[#A1A7B0] text-sm sm:text-base outline-none"
              />
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center space-x-2 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-[#252A32] sm:pl-3">
              <button
                type="button"
                onClick={onUseLocation}
                className="btn-secondary px-3 py-2.5 text-xs flex items-center space-x-1.5 whitespace-nowrap cursor-pointer hover:border-[#FFC400]"
                title="Detect GPS Location"
              >
                <Navigation className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span className="hidden sm:inline">My Location</span>
              </button>

              <button
                type="submit"
                className="btn-primary flex-1 sm:flex-none px-6 py-2.5 text-xs sm:text-sm flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer"
              >
                <span>Search</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Action Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4 text-xs">
            <span className="text-[#A1A7B0]">Popular:</span>
            {['Engine Tuning', 'Oil & Filter', 'Ceramic Detailing', 'OEM Brakes', 'Tire Alignment'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onSearch(tag)}
                className="px-2.5 py-1 rounded-lg bg-[#171A20] border border-[#252A32] text-[#A1A7B0] hover:text-[#FFC400] hover:border-[#FFC400]/40 transition text-[11px] cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Live Marketplace Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-[#171A20]/80 border border-[#252A32]">
            <div className="font-heading font-bold text-2xl text-[#FFC400]">350+</div>
            <div className="text-xs text-[#A1A7B0] mt-0.5">Verified Garages</div>
          </div>
          <div className="p-4 rounded-xl bg-[#171A20]/80 border border-[#252A32]">
            <div className="font-heading font-bold text-2xl text-[#F5F5F5]">12,000+</div>
            <div className="text-xs text-[#A1A7B0] mt-0.5">Vehicle Parts Listed</div>
          </div>
          <div className="p-4 rounded-xl bg-[#171A20]/80 border border-[#252A32]">
            <div className="font-heading font-bold text-2xl text-[#22C55E]">99.4%</div>
            <div className="text-xs text-[#A1A7B0] mt-0.5">Satisfaction Rating</div>
          </div>
          <div className="p-4 rounded-xl bg-[#171A20]/80 border border-[#252A32]">
            <div className="font-heading font-bold text-2xl text-[#3B82F6]">Live GPS</div>
            <div className="text-xs text-[#A1A7B0] mt-0.5">Interactive Discovery</div>
          </div>
        </div>

      </div>
    </section>
  );
}
