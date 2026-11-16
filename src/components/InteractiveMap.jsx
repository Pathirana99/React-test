import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Plus, 
  Minus, 
  RotateCcw, 
  Star, 
  ExternalLink, 
  Phone,
  Clock,
  Compass,
  X
} from 'lucide-react';

export default function InteractiveMap({ 
  shops, 
  selectedShop, 
  onSelectShop, 
  onViewShopDetails, 
  activeRouteShop, 
  onToggleRoute 
}) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 });
  const [userLocation, setUserLocation] = useState({ x: 30, y: 48, active: true });

  // Map marker color by category
  const getMarkerColor = (shop) => {
    if (selectedShop?.id === shop.id) return '#FFC400';
    if (shop.categoryId === 'garages' || shop.categoryId === 'tires' || shop.categoryId === 'bodywork') {
      return '#FFC400'; // Racing Yellow
    }
    if (shop.categoryId === 'parts') {
      return '#22C55E'; // Success Green
    }
    return '#3B82F6'; // Information Blue
  };

  const handleZoom = (delta) => {
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, 0.8), 2.2));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setMapCenter({ x: 50, y: 50 });
  };

  return (
    <div className="relative w-full h-full min-h-[450px] bg-[#0B0D10] border border-[#252A32] rounded-2xl overflow-hidden select-none group">
      
      {/* Background Interactive Vector Grid & Streets */}
      <svg
        className="w-full h-full transition-transform duration-300 ease-out"
        style={{
          transform: `scale(${zoomLevel}) translate(${(50 - mapCenter.x) * 0.5}%, ${(50 - mapCenter.y) * 0.5}%)`,
          transformOrigin: 'center center'
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Subtle Grid Pattern */}
          <pattern id="streetGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#171A20" strokeWidth="0.3" />
          </pattern>
          {/* Finer Subdivision */}
          <pattern id="microGrid" width="2" height="2" patternUnits="userSpaceOnUse">
            <path d="M 2 0 L 0 0 0 2" fill="none" stroke="#12151B" strokeWidth="0.1" />
          </pattern>
        </defs>

        {/* Base Map Layers */}
        <rect width="100" height="100" fill="#0B0D10" />
        <rect width="100" height="100" fill="url(#microGrid)" />
        <rect width="100" height="100" fill="url(#streetGrid)" />

        {/* River / Coastline Dark Accent */}
        <path
          d="M 0,20 Q 30,35 60,15 T 100,25 L 100,0 L 0,0 Z"
          fill="#0e131b"
          opacity="0.9"
        />

        {/* Major Expressways / Arterials */}
        <path
          d="M 5,90 Q 40,70 50,45 T 95,10"
          fill="none"
          stroke="#252A32"
          strokeWidth="1.6"
        />
        <path
          d="M 5,90 Q 40,70 50,45 T 95,10"
          fill="none"
          stroke="#323844"
          strokeWidth="0.8"
          strokeDasharray="2 1"
        />

        <path
          d="M 10,30 C 35,35 60,50 90,85"
          fill="none"
          stroke="#252A32"
          strokeWidth="1.4"
        />

        <path
          d="M 20,10 L 25,95"
          fill="none"
          stroke="#1d222b"
          strokeWidth="1.0"
        />
        <path
          d="M 75,5 L 80,95"
          fill="none"
          stroke="#1d222b"
          strokeWidth="1.0"
        />
        <path
          d="M 5,50 L 95,50"
          fill="none"
          stroke="#1d222b"
          strokeWidth="1.0"
        />

        {/* Active Route Polyline (When directions are requested) */}
        {activeRouteShop && (
          <g>
            {/* Glow backing */}
            <path
              d={`M ${userLocation.x},${userLocation.y} Q 40,40 ${activeRouteShop.coords.x},${activeRouteShop.coords.y}`}
              fill="none"
              stroke="#FFC400"
              strokeWidth="1.5"
              strokeOpacity="0.3"
              strokeLinecap="round"
            />
            {/* Animated Dashed Navigation Path */}
            <path
              d={`M ${userLocation.x},${userLocation.y} Q 40,40 ${activeRouteShop.coords.x},${activeRouteShop.coords.y}`}
              fill="none"
              stroke="#FFC400"
              strokeWidth="0.8"
              strokeDasharray="2 1.5"
              strokeLinecap="round"
              className="animate-pulse"
            />
          </g>
        )}
      </svg>

      {/* User Current Location Beacon */}
      {userLocation.active && (
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: `${userLocation.x}%`, top: `${userLocation.y}%` }}
        >
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#3B82F6] opacity-40"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#3B82F6] border-2 border-white shadow-lg shadow-blue-500/50"></span>
          </div>
          <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-[#171A20]/90 border border-[#252A32] text-[10px] font-semibold text-[#F5F5F5]">
            You are here
          </div>
        </div>
      )}

      {/* Interactive Shop Markers */}
      {shops.map((shop) => {
        const isSelected = selectedShop?.id === shop.id;
        const color = getMarkerColor(shop);

        return (
          <div
            key={shop.id}
            onClick={() => onSelectShop(shop)}
            className="absolute z-20 -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-200"
            style={{ 
              left: `${shop.coords.x}%`, 
              top: `${shop.coords.y}%`,
              transform: isSelected ? 'translate(-50%, -100%) scale(1.25)' : 'translate(-50%, -100%) scale(1)'
            }}
          >
            <div className="relative group/pin flex flex-col items-center">
              
              {/* Pulse ring for selected marker */}
              {isSelected && (
                <div 
                  className="absolute -inset-2 rounded-full opacity-60 animate-ping"
                  style={{ backgroundColor: color }}
                />
              )}

              {/* Marker Bubble */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shadow-xl transition-transform group-hover/pin:scale-110 border-2"
                style={{
                  backgroundColor: '#171A20',
                  borderColor: color,
                  boxShadow: isSelected ? `0 0 18px ${color}` : `0 4px 12px rgba(0,0,0,0.8)`
                }}
              >
                <MapPin className="w-4 h-4" style={{ color: color }} />
              </div>

              {/* Pin stem */}
              <div 
                className="w-0.5 h-2 -mt-0.5" 
                style={{ backgroundColor: color }}
              />

              {/* Label Pill on Hover / Selected */}
              <div className={`mt-1 whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-bold tracking-tight shadow-md transition-opacity pointer-events-none ${
                isSelected 
                  ? 'bg-[#FFC400] text-[#0B0D10]' 
                  : 'bg-[#171A20]/95 text-[#F5F5F5] border border-[#252A32] opacity-80 group-hover/pin:opacity-100'
              }`}>
                {shop.name.split(' ')[0]}
              </div>

            </div>
          </div>
        );
      })}

      {/* Selected Shop Preview Floating Card */}
      {selectedShop && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 z-30 bg-[#171A20]/95 backdrop-blur-md border border-[#252A32] rounded-xl p-4 shadow-2xl animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center space-x-3">
              <img
                src={selectedShop.coverImage}
                alt={selectedShop.name}
                className="w-14 h-14 rounded-lg object-cover border border-[#252A32]"
              />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#FFC400]">
                  {selectedShop.category}
                </span>
                <h4 className="text-sm font-bold text-[#F5F5F5] line-clamp-1">
                  {selectedShop.name}
                </h4>
                <div className="flex items-center space-x-2 text-xs text-[#A1A7B0] mt-0.5">
                  <span className="flex items-center text-[#FFC400]">
                    <Star className="w-3 h-3 fill-current mr-0.5" />
                    {selectedShop.rating}
                  </span>
                  <span>•</span>
                  <span>{selectedShop.distance}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectShop(null)}
              className="text-[#A1A7B0] hover:text-[#F5F5F5] p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-[#252A32] flex items-center justify-between gap-2">
            <button
              onClick={() => onViewShopDetails(selectedShop)}
              className="btn-secondary flex-1 py-1.5 px-3 text-xs flex items-center justify-center space-x-1"
            >
              <span>View Profile</span>
              <ExternalLink className="w-3 h-3" />
            </button>

            <button
              onClick={() => onToggleRoute(selectedShop)}
              className={`flex-1 py-1.5 px-3 text-xs flex items-center justify-center space-x-1 rounded-lg font-bold transition ${
                activeRouteShop?.id === selectedShop.id
                  ? 'bg-emerald-500 text-black'
                  : 'btn-primary'
              }`}
            >
              <Navigation className="w-3 h-3" />
              <span>{activeRouteShop?.id === selectedShop.id ? 'Route Active' : 'Directions'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Map Controls */}
      <div className="absolute top-4 right-4 z-30 flex flex-col space-y-1.5 bg-[#171A20]/90 border border-[#252A32] rounded-xl p-1 shadow-xl">
        <button
          onClick={() => handleZoom(0.2)}
          className="p-2 text-[#F5F5F5] hover:text-[#FFC400] hover:bg-[#252A32] rounded-lg transition"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom(-0.2)}
          className="p-2 text-[#F5F5F5] hover:text-[#FFC400] hover:bg-[#252A32] rounded-lg transition"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="p-2 text-[#A1A7B0] hover:text-[#F5F5F5] hover:bg-[#252A32] rounded-lg transition"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Map Legend Overlay */}
      <div className="hidden sm:flex absolute top-4 left-4 z-30 items-center space-x-3 px-3 py-1.5 rounded-lg bg-[#0B0D10]/85 border border-[#252A32] text-[11px] text-[#A1A7B0]">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFC400]" />
          <span>Garages</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
          <span>Services</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
          <span>Parts</span>
        </div>
      </div>

    </div>
  );
}
