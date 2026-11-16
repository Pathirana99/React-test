import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Eye, 
  Navigation, 
  Search, 
  Star, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Edit3, 
  ShieldCheck, 
  Upload, 
  ArrowUpRight,
  TrendingUp,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { MOCK_OWNER_STATS } from '../data/automotiveData';

export default function BusinessDashboard({ currentShop, onUpdateShop }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'services' | 'hours' | 'profile'
  const [servicesList, setServicesList] = useState(currentShop?.services || [
    'Major & Minor Engine Overhaul',
    'Dyno ECU Calibration',
    'Brembo & Carbon-Ceramic Brakes',
    'Laser Wheel Alignment',
    'Transmission Rebuilds'
  ]);
  const [newService, setNewService] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleAddService = (e) => {
    e.preventDefault();
    if (newService.trim()) {
      setServicesList([...servicesList, newService.trim()]);
      setNewService('');
    }
  };

  const handleDeleteService = (idx) => {
    setServicesList(servicesList.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[#0B0D10] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Dashboard Top Banner */}
        <div className="card-graphite p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#252A32]">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-xl bg-[#0B0D10] border border-[#252A32] overflow-hidden shrink-0">
              <img
                src={currentShop?.coverImage || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80'}
                alt="Workshop logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFC400]">
                  Owner Portal
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center space-x-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified &amp; Live</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F5] font-heading">
                {currentShop?.name || 'Apex Performance Garage & Tuning'}
              </h2>
              <div className="text-xs text-[#A1A7B0] flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FFC400]" />
                <span>{currentShop?.location || '482 Industrial Parkway, West District'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              className="btn-primary px-5 py-2.5 text-xs font-bold cursor-pointer"
            >
              {isSaved ? 'Changes Saved!' : 'Save & Publish Updates'}
            </button>
          </div>
        </div>

        {/* Analytics KPI Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#171A20] border border-[#252A32] space-y-2">
            <div className="flex items-center justify-between text-[#A1A7B0]">
              <span className="text-xs font-semibold">Driver Profile Visits</span>
              <Eye className="w-4 h-4 text-[#FFC400]" />
            </div>
            <div className="font-heading font-extrabold text-2xl text-[#F5F5F5]">
              {MOCK_OWNER_STATS.profileViews}
            </div>
            <div className="text-[11px] text-[#22C55E] flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% this month</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#171A20] border border-[#252A32] space-y-2">
            <div className="flex items-center justify-between text-[#A1A7B0]">
              <span className="text-xs font-semibold">Search Impressions</span>
              <Search className="w-4 h-4 text-[#3B82F6]" />
            </div>
            <div className="font-heading font-extrabold text-2xl text-[#F5F5F5]">
              {MOCK_OWNER_STATS.searchImpressions}
            </div>
            <div className="text-[11px] text-[#A1A7B0]">
              Appeared in nearby discovery
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#171A20] border border-[#252A32] space-y-2">
            <div className="flex items-center justify-between text-[#A1A7B0]">
              <span className="text-xs font-semibold">Directions Requested</span>
              <Navigation className="w-4 h-4 text-[#22C55E]" />
            </div>
            <div className="font-heading font-extrabold text-2xl text-[#F5F5F5]">
              {MOCK_OWNER_STATS.directionsRequested}
            </div>
            <div className="text-[11px] text-[#22C55E]">
              Customers navigated to bay
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#171A20] border border-[#252A32] space-y-2">
            <div className="flex items-center justify-between text-[#A1A7B0]">
              <span className="text-xs font-semibold">Average Rating</span>
              <Star className="w-4 h-4 text-[#FFC400] fill-current" />
            </div>
            <div className="font-heading font-extrabold text-2xl text-[#FFC400]">
              {MOCK_OWNER_STATS.ratingAverage} / 5.0
            </div>
            <div className="text-[11px] text-[#A1A7B0]">
              Based on {MOCK_OWNER_STATS.totalReviews} verified reviews
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-[#252A32] pb-3 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'overview', label: 'Services Catalog' },
            { id: 'hours', label: 'Operating Schedule' },
            { id: 'location', label: 'Shop Location & GPS' },
            { id: 'media', label: 'Photo Gallery' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#FFC400] text-[#0B0D10] font-bold shadow-md'
                  : 'text-[#A1A7B0] hover:text-[#F5F5F5] hover:bg-[#171A20]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Services Management */}
        {activeTab === 'overview' && (
          <div className="card-graphite p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-[#F5F5F5] font-heading">
                  Manage Published Services
                </h3>
                <p className="text-xs text-[#A1A7B0] mt-0.5">
                  Vehicle owners can filter and discover your business using these listed services.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded bg-[#0B0D10] border border-[#252A32] text-[#FFC400] self-start sm:self-auto">
                {servicesList.length} Active Services
              </span>
            </div>

            {/* Add Service Bar */}
            <form onSubmit={handleAddService} className="flex gap-2 max-w-xl">
              <input
                type="text"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="Enter new service (e.g. Carbon Cleaning, Turbocharger Upgrades)..."
                className="flex-1 input-dark px-4 py-2.5 text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="btn-primary px-4 py-2 text-xs flex items-center space-x-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </form>

            {/* Services List Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {servicesList.map((srv, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#0B0D10] border border-[#252A32] flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 rounded-full bg-[#FFC400]" />
                    <span className="text-xs font-semibold text-[#F5F5F5]">{srv}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteService(idx)}
                    className="text-[#A1A7B0] hover:text-red-400 p-1 rounded transition opacity-80 group-hover:opacity-100"
                    title="Remove Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Hours Management */}
        {activeTab === 'hours' && (
          <div className="card-graphite p-6 sm:p-8 rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#F5F5F5] font-heading">
                Operating Hours &amp; Working Days
              </h3>
              <p className="text-xs text-[#A1A7B0] mt-0.5">
                Ensure customers know when your bay doors are open for vehicle check-in.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#252A32] space-y-2">
                <label className="text-xs font-bold text-[#F5F5F5] block">Weekdays (Mon - Fri)</label>
                <input
                  type="text"
                  defaultValue="07:30 AM - 06:30 PM"
                  className="w-full input-dark px-3 py-2 text-xs"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#252A32] space-y-2">
                <label className="text-xs font-bold text-[#F5F5F5] block">Saturday</label>
                <input
                  type="text"
                  defaultValue="08:00 AM - 04:00 PM"
                  className="w-full input-dark px-3 py-2 text-xs"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#252A32] space-y-2 sm:col-span-2">
                <label className="text-xs font-bold text-[#F5F5F5] block">Sunday Status</label>
                <div className="flex items-center space-x-4 text-xs text-[#A1A7B0]">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="sun" defaultChecked className="accent-[#FFC400]" />
                    <span>Closed</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="sun" className="accent-[#FFC400]" />
                    <span>Emergency Roadside Only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Location Management */}
        {activeTab === 'location' && (
          <div className="card-graphite p-6 sm:p-8 rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#F5F5F5] font-heading">
                Shop Address &amp; Map Coordinates
              </h3>
              <p className="text-xs text-[#A1A7B0] mt-0.5">
                Used to compute distance from vehicle owners and provide turn-by-turn directions.
              </p>
            </div>

            <div className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs uppercase font-bold text-[#A1A7B0] mb-1">
                  Full Street Address
                </label>
                <input
                  type="text"
                  defaultValue="482 Industrial Parkway, West District"
                  className="w-full input-dark px-3 py-2 text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-bold text-[#A1A7B0] mb-1">
                    Latitude
                  </label>
                  <input
                    type="text"
                    defaultValue="34.0522"
                    className="w-full input-dark px-3 py-2 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-[#A1A7B0] mb-1">
                    Longitude
                  </label>
                  <input
                    type="text"
                    defaultValue="-118.2437"
                    className="w-full input-dark px-3 py-2 text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Photos */}
        {activeTab === 'media' && (
          <div className="card-graphite p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#F5F5F5] font-heading">
                  Workshop Gallery &amp; Equipment Photos
                </h3>
                <p className="text-xs text-[#A1A7B0] mt-0.5">
                  High-quality photography builds trust with performance vehicle owners.
                </p>
              </div>
              <button className="btn-secondary px-3.5 py-2 text-xs flex items-center space-x-1.5">
                <Upload className="w-3.5 h-3.5 text-[#FFC400]" />
                <span>Add Photos</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80'
              ].map((img, idx) => (
                <div key={idx} className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[#252A32] group">
                  <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button className="p-2 rounded-lg bg-black/80 text-white hover:text-[#FFC400]">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-black/80 text-white hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
