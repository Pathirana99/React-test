import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Navigation, 
  Star, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  X, 
  SlidersHorizontal, 
  ChevronDown, 
  Sparkles 
} from 'lucide-react';
import InteractiveMap from './InteractiveMap';

export default function ExploreMapPage({ 
  shops, 
  selectedShop, 
  onSelectShop, 
  onViewShopDetails,
  activeRouteShop,
  onToggleRoute,
  initialQuery = ''
}) {
  const [query, setQuery] = useState(initialQuery);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [highRatedOnly, setHighRatedOnly] = useState(false);
  const [mobileViewTab, setMobileViewTab] = useState('both'); // 'list' | 'map' | 'both'

  // Filter logic
  const filteredShops = useMemo(() => {
    return shops.filter((shop) => {
      // Text search
      const textMatches = 
        !query ||
        shop.name.toLowerCase().includes(query.toLowerCase()) ||
        shop.category.toLowerCase().includes(query.toLowerCase()) ||
        shop.location.toLowerCase().includes(query.toLowerCase()) ||
        shop.services.some((s) => s.toLowerCase().includes(query.toLowerCase()));

      // Category filter
      const categoryMatches = 
        categoryFilter === 'all' || 
        shop.categoryId === categoryFilter;

      // Status filters
      const openMatches = !openNowOnly || shop.isOpen;
      const ratingMatches = !highRatedOnly || shop.rating >= 4.8;

      return textMatches && categoryMatches && openMatches && ratingMatches;
    });
  }, [shops, query, categoryFilter, openNowOnly, highRatedOnly]);

  const categoriesTabs = [
    { id: 'all', label: 'All Shops' },
    { id: 'garages', label: 'Garages' },
    { id: 'repair', label: 'Repairs' },
    { id: 'parts', label: 'Spare Parts' },
    { id: 'tires', label: 'Tires' },
    { id: 'detailing', label: 'Detailing' },
    { id: 'electrical', label: 'Auto Electric' },
  ];

  return (
    <div className="w-full h-[calc(100vh-5rem)] min-h-[600px] flex flex-col bg-midnight overflow-hidden">
      
      {/* Top Filter & Search Bar */}
      <div className="bg-graphite border-b border-steel px-4 sm:px-6 py-3.5 z-20 space-y-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by business name, automotive service, or location..."
              className="w-full bg-midnight border border-steel focus:border-yellow text-snow placeholder-silver text-xs sm:text-sm pl-10 pr-9 py-2.5 rounded-xl outline-none transition"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-silver hover:text-snow"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Toggle Toggles */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 text-xs">
            <button
              onClick={() => setOpenNowOnly(!openNowOnly)}
              className={`px-3 py-2 rounded-xl border flex items-center space-x-1.5 whitespace-nowrap transition cursor-pointer ${
                openNowOnly
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                  : 'bg-midnight border-steel text-silver hover:text-snow'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${openNowOnly ? 'bg-emerald-400' : 'bg-silver'}`} />
              <span>Open Now</span>
            </button>

            <button
              onClick={() => setHighRatedOnly(!highRatedOnly)}
              className={`px-3 py-2 rounded-xl border flex items-center space-x-1.5 whitespace-nowrap transition cursor-pointer ${
                highRatedOnly
                  ? 'bg-yellow/10 border-yellow text-yellow font-bold'
                  : 'bg-midnight border-steel text-silver hover:text-snow'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Top Rated (4.8+)</span>
            </button>

            {/* Mobile View Toggle (List vs Map) */}
            <div className="md:hidden flex items-center p-0.5 rounded-lg bg-midnight border border-steel">
              <button
                onClick={() => setMobileViewTab('list')}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold ${
                  mobileViewTab === 'list' ? 'bg-yellow text-midnight' : 'text-silver'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setMobileViewTab('map')}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold ${
                  mobileViewTab === 'map' ? 'bg-yellow text-midnight' : 'text-silver'
                }`}
              >
                Map
              </button>
            </div>
          </div>

        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="max-w-7xl mx-auto flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {categoriesTabs.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-yellow text-midnight font-bold shadow-sm'
                  : 'bg-midnight border border-steel text-silver hover:text-snow hover:border-silver/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Screen Discovery Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Side: Synchronized Results List */}
        <div className={`w-full md:w-[420px] lg:w-[460px] h-full flex flex-col bg-midnight border-r border-steel z-10 ${
          mobileViewTab === 'map' ? 'hidden md:flex' : 'flex'
        }`}>
          {/* Header Count */}
          <div className="p-4 border-b border-steel flex items-center justify-between text-xs text-silver bg-graphite">
            <span>Found <strong className="text-yellow">{filteredShops.length}</strong> Automotive Businesses</span>
            {activeRouteShop && (
              <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                <Navigation className="w-3 h-3" />
                <span>Navigating</span>
              </span>
            )}
          </div>

          {/* Scrollable Cards Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {filteredShops.length === 0 ? (
              <div className="p-8 text-center text-silver space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-graphite border border-steel flex items-center justify-center text-yellow">
                  <Search className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-snow">No matching shops found</h4>
                <p className="text-xs">Try clearing some filters or searching for a broader term.</p>
                <button
                  onClick={() => {
                    setQuery('');
                    setCategoryFilter('all');
                    setOpenNowOnly(false);
                    setHighRatedOnly(false);
                  }}
                  className="btn-secondary px-3 py-1.5 text-xs text-yellow"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              filteredShops.map((shop) => {
                const isSelected = selectedShop?.id === shop.id;
                return (
                  <div
                    key={shop.id}
                    onClick={() => onSelectShop(shop)}
                    className={`card-graphite p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                      isSelected
                        ? 'border-yellow bg-graphite-elevated shadow-lg ring-1 ring-yellow/50'
                        : 'border-steel hover:border-yellow/40'
                    }`}
                  >
                    <div className="flex gap-3">
                      <img
                        src={shop.coverImage}
                        alt={shop.name}
                        className="w-20 h-20 rounded-lg object-cover border border-steel shrink-0"
                      />

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-yellow">
                            {shop.category}
                          </span>
                          <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                            shop.isOpen ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'
                          }`}>
                            {shop.isOpen ? 'Open' : 'Closed'}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-snow truncate font-heading">
                          {shop.name}
                        </h4>

                        <div className="flex items-center space-x-2 text-xs text-silver">
                          <span className="flex items-center text-yellow font-semibold">
                            <Star className="w-3 h-3 fill-current mr-0.5" />
                            {shop.rating}
                          </span>
                          <span>•</span>
                          <span className="truncate">{shop.distance}</span>
                        </div>

                        <div className="flex items-center space-x-1 text-[11px] text-silver truncate pt-0.5">
                          <MapPin className="w-3 h-3 text-silver shrink-0" />
                          <span className="truncate">{shop.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="mt-3 pt-2.5 border-t border-steel flex items-center justify-between gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewShopDetails(shop);
                        }}
                        className="btn-secondary py-1 px-3 text-xs flex items-center space-x-1"
                      >
                        <span>Details</span>
                        <ExternalLink className="w-3 h-3 text-silver" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleRoute(shop);
                        }}
                        className={`py-1 px-3 text-xs rounded-lg font-bold flex items-center space-x-1 transition ${
                          activeRouteShop?.id === shop.id
                            ? 'bg-emerald-500 text-black'
                            : 'btn-primary'
                        }`}
                      >
                        <Navigation className="w-3 h-3" />
                        <span>{activeRouteShop?.id === shop.id ? 'Route Active' : 'Directions'}</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Interactive Discovery Map */}
        <div className={`flex-1 h-full relative ${
          mobileViewTab === 'list' ? 'hidden md:block' : 'block'
        }`}>
          <InteractiveMap
            shops={filteredShops}
            selectedShop={selectedShop}
            onSelectShop={onSelectShop}
            onViewShopDetails={onViewShopDetails}
            activeRouteShop={activeRouteShop}
            onToggleRoute={onToggleRoute}
          />
        </div>

      </div>

    </div>
  );
}
