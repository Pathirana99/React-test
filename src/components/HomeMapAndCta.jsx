import React from 'react';
import { 
  Building2, 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Compass 
} from 'lucide-react';
import InteractiveMap from './InteractiveMap';

export default function HomeMapAndCta({ 
  shops, 
  selectedShop, 
  onSelectShop, 
  onViewShopDetails, 
  onExploreAll, 
  onOpenRegister 
}) {
  return (
    <div className="bg-midnight border-b border-steel space-y-16 py-16 sm:py-24">
      
      {/* 1. Interactive Map Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-yellow text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-yellow" />
              <span>Real-Time Discovery Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-snow font-heading tracking-tight">
              Interactive Map Preview
            </h2>
            <p className="text-silver text-sm sm:text-base mt-2 max-w-xl">
              Pinpoint nearby garages, tap any marker to inspect certified specialties, and plot direct driving routes.
            </p>
          </div>

          <button
            onClick={onExploreAll}
            className="btn-primary px-5 py-2.5 text-xs font-bold flex items-center space-x-2 self-start sm:self-auto cursor-pointer"
          >
            <span>Launch Full Map Experience</span>
            <Compass className="w-4 h-4" />
          </button>
        </div>

        {/* Map Preview Container */}
        <div className="h-[460px] sm:h-[520px] rounded-2xl overflow-hidden shadow-2xl border border-steel">
          <InteractiveMap
            shops={shops}
            selectedShop={selectedShop}
            onSelectShop={onSelectShop}
            onViewShopDetails={onViewShopDetails}
            activeRouteShop={null}
            onToggleRoute={() => onExploreAll()}
          />
        </div>
      </section>

      {/* 2. Business Registration CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-graphite via-graphite-elevated to-graphite border border-steel p-8 sm:p-14 shadow-2xl">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-yellow/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-yellow/10 border border-yellow/25 text-xs font-bold text-yellow">
                <Building2 className="w-3.5 h-3.5" />
                <span>FOR AUTOMOTIVE BUSINESS OWNERS</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-extrabold text-snow font-heading tracking-tight leading-tight">
                Own an Automotive Business?
              </h3>

              <p className="text-silver text-base sm:text-lg max-w-2xl leading-relaxed">
                Bring your business online and help more vehicle owners discover your services, inventory, and workshop location in seconds.
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs font-medium text-snow">
                <div className="flex items-center space-x-2 p-2.5 rounded-lg bg-midnight/50 border border-steel">
                  <CheckCircle2 className="w-4 h-4 text-yellow shrink-0" />
                  <span>Free Location Listing</span>
                </div>
                <div className="flex items-center space-x-2 p-2.5 rounded-lg bg-midnight/50 border border-steel">
                  <TrendingUp className="w-4 h-4 text-success shrink-0" />
                  <span>Reach Active Drivers</span>
                </div>
                <div className="flex items-center space-x-2 p-2.5 rounded-lg bg-midnight/50 border border-steel">
                  <ShieldCheck className="w-4 h-4 text-info shrink-0" />
                  <span>Verified Profile Badge</span>
                </div>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <button
                onClick={onOpenRegister}
                className="btn-primary w-full sm:w-auto px-8 py-4 text-sm font-bold flex items-center justify-center space-x-2 cursor-pointer shadow-xl text-center"
              >
                <span>Register Your Business</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-[11px] text-silver mt-2.5 text-center lg:text-right w-full">
                Setup takes under 3 minutes • No upfront fee
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
