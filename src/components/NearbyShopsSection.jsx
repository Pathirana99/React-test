import React from 'react';
import { 
  Star, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Navigation, 
  ShieldCheck, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export default function NearbyShopsSection({ 
  shops, 
  onViewShopDetails, 
  onNavigateToShop, 
  onExploreAll 
}) {
  return (
    <section className="py-16 sm:py-24 bg-[#0B0D10] border-b border-[#252A32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#FFC400] text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FFC400]" />
              <span>Verified Automotive Centers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F5F5] font-heading tracking-tight">
              Nearby Featured Garages &amp; Shops
            </h2>
            <p className="text-[#A1A7B0] text-sm sm:text-base mt-2 max-w-xl">
              Certified facilities with verified customer reviews, clear pricing, and active mechanic bays.
            </p>
          </div>

          <button
            onClick={onExploreAll}
            className="btn-secondary px-4 py-2.5 text-xs font-semibold flex items-center space-x-2 self-start sm:self-auto cursor-pointer"
          >
            <span>Explore All on Map</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FFC400]" />
          </button>
        </div>

        {/* Shop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="card-graphite rounded-2xl overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Cover Image & Status Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0B0D10]">
                  <img
                    src={shop.coverImage}
                    alt={shop.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171A20] via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#0B0D10]/80 border border-[#252A32] text-[#FFC400] backdrop-blur-sm">
                      {shop.category}
                    </span>

                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-sm flex items-center space-x-1.5 ${
                      shop.isOpen
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                        : 'bg-red-500/15 border-red-500/30 text-red-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${shop.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                      <span>{shop.isOpen ? 'Open Now' : 'Closed'}</span>
                    </span>
                  </div>

                  {/* Bottom Image Overlay: Distance & Rating */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#F5F5F5] font-semibold">
                    <div className="flex items-center space-x-1 bg-[#0B0D10]/80 px-2.5 py-1 rounded-md border border-[#252A32] backdrop-blur-sm">
                      <Star className="w-3.5 h-3.5 text-[#FFC400] fill-current" />
                      <span>{shop.rating}</span>
                      <span className="text-[#A1A7B0] font-normal">({shop.reviewCount})</span>
                    </div>

                    <div className="flex items-center space-x-1 bg-[#0B0D10]/80 px-2.5 py-1 rounded-md border border-[#252A32] text-[#A1A7B0] backdrop-blur-sm">
                      <Navigation className="w-3 h-3 text-[#3B82F6]" />
                      <span>{shop.distance}</span>
                    </div>
                  </div>
                </div>

                {/* Shop Info Container */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold text-[#F5F5F5] group-hover:text-[#FFC400] transition-colors font-heading line-clamp-1">
                      {shop.name}
                    </h3>
                    {shop.verified && (
                      <span title="Verified Business">
                        <ShieldCheck className="w-4 h-4 text-[#FFC400] shrink-0" />
                      </span>
                    )}
                  </div>

                  <div className="flex items-start space-x-2 text-xs text-[#A1A7B0]">
                    <MapPin className="w-3.5 h-3.5 text-[#A1A7B0] shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{shop.location}</span>
                  </div>

                  <p className="text-xs text-[#A1A7B0] line-clamp-2 leading-relaxed">
                    {shop.description}
                  </p>

                  {/* Key Services Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {shop.services.slice(0, 3).map((srv, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#0B0D10] border border-[#252A32] text-[10px] font-medium text-[#A1A7B0]"
                      >
                        {srv}
                      </span>
                    ))}
                    {shop.services.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-[#0B0D10] text-[10px] text-[#FFC400] font-bold">
                        +{shop.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 border-t border-[#252A32] mt-2 flex items-center justify-between gap-3">
                <button
                  onClick={() => onViewShopDetails(shop)}
                  className="btn-secondary flex-1 py-2 text-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>View Details</span>
                  <ExternalLink className="w-3 h-3 text-[#A1A7B0]" />
                </button>

                <button
                  onClick={() => onNavigateToShop(shop)}
                  className="btn-primary flex-1 py-2 text-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
