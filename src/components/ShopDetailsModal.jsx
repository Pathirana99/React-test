import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Star, 
  ShieldCheck, 
  Navigation, 
  Share2, 
  ExternalLink,
  CheckCircle2,
  Calendar,
  Compass,
  AlertCircle
} from 'lucide-react';

export default function ShopDetailsModal({ 
  shop, 
  onClose, 
  onNavigate, 
  isRouteActive 
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'services' | 'gallery'
  const [copiedShare, setCopiedShare] = useState(false);

  if (!shop) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Dialog Container */}
      <div 
        className="relative w-full max-w-4xl bg-[#171A20] border border-[#252A32] rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Cover Header Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#0B0D10] shrink-0">
          <img
            src={shop.coverImage}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171A20] via-[#171A20]/40 to-black/60" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#0B0D10]/80 border border-[#252A32] hover:border-[#FFC400] text-[#F5F5F5] flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Category Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg bg-[#0B0D10]/85 border border-[#252A32] text-[#FFC400] backdrop-blur-sm">
              {shop.category}
            </span>
            {shop.verified && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#FFC400]/20 border border-[#FFC400]/40 text-[#FFC400] flex items-center space-x-1 backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Facility</span>
              </span>
            )}
          </div>

          {/* Business Banner Info */}
          <div className="absolute bottom-4 left-4 right-4 z-20 space-y-1 text-[#F5F5F5]">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight drop-shadow-md">
              {shop.name}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#A1A7B0]">
              <span className="flex items-center text-[#FFC400] font-bold">
                <Star className="w-4 h-4 fill-current mr-1" />
                {shop.rating} ({shop.reviewCount} Reviews)
              </span>
              <span>•</span>
              <span className="flex items-center text-[#F5F5F5]">
                <MapPin className="w-3.5 h-3.5 text-[#A1A7B0] mr-1" />
                {shop.city} ({shop.distance})
              </span>
              <span>•</span>
              <span className={`font-semibold ${shop.isOpen ? 'text-emerald-400' : 'text-red-400'}`}>
                {shop.isOpen ? 'Open Now' : 'Closed'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Header Ribbon */}
        <div className="px-6 py-3.5 bg-[#12151B] border-b border-[#252A32] flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Quick Tabs */}
          <div className="flex items-center space-x-2 text-xs font-semibold">
            {['overview', 'services', 'gallery'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg capitalize transition cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#FFC400] text-[#0B0D10] font-bold'
                    : 'text-[#A1A7B0] hover:text-[#F5F5F5]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="btn-secondary px-3 py-1.5 text-xs flex items-center space-x-1.5"
              title="Copy Shop Link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedShare ? 'Copied!' : 'Share'}</span>
            </button>

            <a
              href={`tel:${shop.phone}`}
              className="btn-secondary px-3.5 py-1.5 text-xs flex items-center space-x-1.5 text-emerald-400 border-emerald-500/30 hover:border-emerald-500"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>

            <button
              onClick={() => onNavigate(shop)}
              className={`px-4 py-1.5 text-xs flex items-center space-x-1.5 rounded-lg font-bold transition ${
                isRouteActive
                  ? 'bg-emerald-500 text-black'
                  : 'btn-primary'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{isRouteActive ? 'Route Mapped' : 'Get Directions'}</span>
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Description & Overview */}
              <div className="space-y-2">
                <h4 className="text-sm uppercase tracking-wider font-bold text-[#FFC400]">
                  About This Facility
                </h4>
                <p className="text-sm text-[#A1A7B0] leading-relaxed">
                  {shop.description}
                </p>
              </div>

              {/* Business Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Location & Contact Card */}
                <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#252A32] space-y-3">
                  <h5 className="text-xs uppercase font-bold text-[#F5F5F5] tracking-wider flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-[#FFC400]" />
                    <span>Location &amp; Contact</span>
                  </h5>
                  <div className="space-y-2 text-xs text-[#A1A7B0]">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#F5F5F5]">Address</div>
                      <div className="text-[#F5F5F5] font-medium mt-0.5">{shop.location}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#F5F5F5]">Phone</div>
                      <div className="text-[#FFC400] font-semibold mt-0.5">{shop.phone}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#F5F5F5]">Email</div>
                      <div className="text-[#F5F5F5] mt-0.5">{shop.email}</div>
                    </div>
                  </div>
                </div>

                {/* Opening Hours Schedule */}
                <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#252A32] space-y-3">
                  <h5 className="text-xs uppercase font-bold text-[#F5F5F5] tracking-wider flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#FFC400]" />
                    <span>Operating Hours</span>
                  </h5>
                  <div className="space-y-1.5 text-xs text-[#A1A7B0]">
                    <div className="flex justify-between py-1 border-b border-[#252A32]">
                      <span>Monday – Friday</span>
                      <span className="text-[#F5F5F5] font-semibold">07:30 AM – 06:30 PM</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#252A32]">
                      <span>Saturday</span>
                      <span className="text-[#F5F5F5] font-semibold">08:00 AM – 04:00 PM</span>
                    </div>
                    <div className="flex justify-between py-1 text-red-400">
                      <span>Sunday</span>
                      <span>Closed / Roadside Only</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Service Badges Preview */}
              <div className="space-y-3">
                <h4 className="text-sm uppercase tracking-wider font-bold text-[#FFC400]">
                  Available Services &amp; Specialties
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {shop.services.map((srv, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 rounded-lg bg-[#0B0D10] border border-[#252A32] flex items-center space-x-2.5 text-xs text-[#F5F5F5]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Future Feature Architecture Note (Scalability prompt requirement) */}
              <div className="p-3.5 rounded-xl bg-[#0B0D10] border border-[#252A32] flex items-center space-x-3 text-xs text-[#A1A7B0]">
                <AlertCircle className="w-4 h-4 text-[#3B82F6] shrink-0" />
                <span>
                  <strong>Discovery Mode:</strong> Call or navigate directly to this business. Direct service scheduling will unlock in version 2.0.
                </span>
              </div>

            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-wider font-bold text-[#FFC400]">
                Full Service Catalog &amp; Diagnostic Specs
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {shop.services.map((srv, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-[#0B0D10] border border-[#252A32] flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-[#F5F5F5]">{srv}</div>
                      <div className="text-xs text-[#A1A7B0]">Certified by factory-grade protocol standards</div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E]">
                      Available Today
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-wider font-bold text-[#FFC400]">
                Facility Photos &amp; Diagnostic Bays
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {shop.gallery.map((img, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden border border-[#252A32] aspect-[16/10] bg-[#0B0D10]">
                    <img 
                      src={img} 
                      alt={`Facility Bay ${idx + 1}`} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
