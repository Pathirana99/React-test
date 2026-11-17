import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Wrench, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  Clock, 
  ShieldCheck, 
  Navigation 
} from 'lucide-react';
import { CATEGORIES } from '../data/automotiveData';

export default function BusinessRegistrationModal({ isOpen, onClose, onRegisterComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    businessName: '',
    category: 'Vehicle Garages',
    categoryId: 'garages',
    description: '',
    phone: '',
    email: '',
    address: '',
    city: 'Metropolis',
    province: 'Western',
    postalCode: '',
    lat: '34.0530',
    lng: '-118.2420',
    coords: { x: 50, y: 50 },
    services: ['Computerized Engine Diagnostics', 'Oil & Filter Renewal'],
    openingHours: 'Mon - Sat: 08:00 AM - 06:00 PM',
    photoUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80'
  });

  const [newServiceInput, setNewServiceInput] = useState('');

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddService = () => {
    if (newServiceInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, newServiceInput.trim()]
      }));
      setNewServiceInput('');
    }
  };

  const handleRemoveService = (index) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    const lat = (34.02 + (100 - y) * 0.0006).toFixed(4);
    const lng = (-118.28 + x * 0.0007).toFixed(4);

    setFormData((prev) => ({
      ...prev,
      coords: { x, y },
      lat,
      lng
    }));
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onRegisterComplete(formData);
      onClose();
    }, 1200);
  };

  const steps = [
    { num: 1, title: 'Business Info', icon: Building2 },
    { num: 2, title: 'Location & Map', icon: MapPin },
    { num: 3, title: 'Services & Hours', icon: Wrench },
    { num: 4, title: 'Review & Publish', icon: CheckCircle2 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-3xl bg-graphite border border-steel rounded-3xl shadow-2xl p-6 sm:p-8 my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-silver hover:text-snow p-1.5 rounded-lg hover:bg-steel transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wizard Header */}
        <div className="space-y-1 mb-6 text-left">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-midnight border border-steel text-[11px] font-bold text-yellow">
            <span>PARTNER WITH APEX AUTO</span>
          </div>
          <h3 className="text-2xl font-bold font-heading text-snow">
            Register Your Automotive Business
          </h3>
          <p className="text-xs text-silver">
            Publish your workshop on the live discovery map and reach thousands of drivers.
          </p>
        </div>

        {/* Multi-Step Indicator */}
        <div className="grid grid-cols-4 gap-2 mb-8 border-b border-steel pb-5">
          {steps.map((s) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <div 
                key={s.num}
                className={`flex flex-col items-center sm:items-start space-y-1.5 transition ${
                  isCurrent ? 'text-yellow' : isCompleted ? 'text-emerald-400' : 'text-silver'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border ${
                    isCurrent 
                      ? 'bg-yellow text-midnight border-yellow' 
                      : isCompleted 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                      : 'bg-midnight border-steel text-silver'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold">{s.title}</span>
                </div>
                <div className={`w-full h-1 rounded-full mt-1 ${
                  isCurrent ? 'bg-yellow' : isCompleted ? 'bg-emerald-400' : 'bg-steel'
                }`} />
              </div>
            );
          })}
        </div>

        {/* Step Content Body */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-1">
          
          {/* STEP 1: BUSINESS INFO */}
          {currentStep === 1 && (
            <div className="space-y-4 text-left">
              <div>
                <label className="block text-[11px] uppercase font-bold text-silver mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => handleChange('businessName', e.target.value)}
                  placeholder="e.g. Apex Performance Garage & Tuning"
                  className="w-full input-dark px-4 py-2.5 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-silver mb-1">
                  Primary Category *
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => {
                    const selected = CATEGORIES.find((c) => c.id === e.target.value);
                    handleChange('categoryId', e.target.value);
                    handleChange('category', selected ? selected.name : 'Vehicle Garages');
                  }}
                  className="w-full input-dark px-4 py-2.5 text-xs sm:text-sm cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-graphite text-snow">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-silver mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Briefly describe your workshop specialties, equipment, certifications, and experience..."
                  className="w-full input-dark px-4 py-2.5 text-xs sm:text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-silver mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full input-dark px-4 py-2.5 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-silver mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="contact@workshop.com"
                    className="w-full input-dark px-4 py-2.5 text-xs sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: BUSINESS LOCATION & MAP PIN DROPPER */}
          {currentStep === 2 && (
            <div className="space-y-4 text-left">
              <div>
                <label className="block text-[11px] uppercase font-bold text-silver mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="e.g. 482 Industrial Parkway, West District"
                  className="w-full input-dark px-4 py-2.5 text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-silver mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full input-dark px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold text-silver mb-1">
                    Province / State
                  </label>
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(e) => handleChange('province', e.target.value)}
                    className="w-full input-dark px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold text-silver mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                    placeholder="90210"
                    className="w-full input-dark px-3 py-2 text-xs"
                  />
                </div>
              </div>

              {/* Interactive Pin Dropper Map */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-snow flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-yellow" />
                    <span>Click on the Map to Pin Exact Location</span>
                  </span>
                  <span className="text-yellow text-[11px]">
                    Lat: {formData.lat}, Lng: {formData.lng}
                  </span>
                </div>

                <div 
                  onClick={handleMapClick}
                  className="relative w-full h-52 rounded-xl bg-midnight border-2 border-steel hover:border-yellow/50 cursor-crosshair overflow-hidden group select-none"
                >
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-graphite)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-graphite)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  
                  {/* Interactive Pinned Marker */}
                  <div 
                    className="absolute z-20 -translate-x-1/2 -translate-y-full transition-all duration-200"
                    style={{ left: `${formData.coords.x}%`, top: `${formData.coords.y}%` }}
                  >
                    <div className="relative flex flex-col items-center">
                      <span className="animate-ping absolute -inset-1 rounded-full bg-yellow opacity-75" />
                      <div className="relative w-8 h-8 rounded-full bg-yellow text-midnight flex items-center justify-center font-bold shadow-lg shadow-yellow/50">
                        <MapPin className="w-4 h-4 fill-current" />
                      </div>
                      <div className="text-[10px] bg-midnight text-yellow border border-steel px-2 py-0.5 rounded mt-1 font-bold whitespace-nowrap">
                        Pinned Shop
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-graphite/80 border border-steel text-[10px] text-silver">
                    Click anywhere on this grid to relocate your shop pin
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SERVICES AND DETAILS */}
          {currentStep === 3 && (
            <div className="space-y-4 text-left">
              <div>
                <label className="block text-[11px] uppercase font-bold text-silver mb-1">
                  Operating Hours
                </label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-silver" />
                  <input
                    type="text"
                    value={formData.openingHours}
                    onChange={(e) => handleChange('openingHours', e.target.value)}
                    placeholder="e.g. Mon - Sat: 08:00 AM - 07:00 PM"
                    className="w-full input-dark pl-10 pr-4 py-2.5 text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Service Badges Builder */}
              <div className="space-y-2">
                <label className="block text-[11px] uppercase font-bold text-silver">
                  Available Services &amp; Specialties
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newServiceInput}
                    onChange={(e) => setNewServiceInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddService())}
                    placeholder="Add a service (e.g. Ceramic Coating, Brake Pad Replacement)..."
                    className="flex-1 input-dark px-3 py-2 text-xs sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddService}
                    className="btn-secondary px-4 py-2 text-xs font-bold text-yellow"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {formData.services.map((srv, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-midnight border border-steel text-xs text-snow flex items-center space-x-1.5"
                    >
                      <span>{srv}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveService(idx)}
                        className="text-silver hover:text-red-400 font-bold ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Photos & Cover */}
              <div>
                <label className="block text-[11px] uppercase font-bold text-silver mb-1">
                  Workshop Cover Photo URL
                </label>
                <input
                  type="url"
                  value={formData.photoUrl}
                  onChange={(e) => handleChange('photoUrl', e.target.value)}
                  className="w-full input-dark px-4 py-2.5 text-xs sm:text-sm"
                />
                <div className="mt-2 h-28 rounded-xl overflow-hidden border border-steel bg-midnight">
                  <img
                    src={formData.photoUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW AND PUBLISH */}
          {currentStep === 4 && (
            <div className="space-y-4 text-left">
              <div className="p-4 rounded-xl bg-midnight border border-steel space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-yellow">
                    {formData.category}
                  </span>
                  <span className="text-xs text-emerald-400 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Ready for Verification</span>
                  </span>
                </div>

                <h4 className="text-xl font-bold font-heading text-snow">
                  {formData.businessName || 'Untitled Automotive Business'}
                </h4>

                <p className="text-xs text-silver">
                  {formData.description || 'No description provided.'}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-steel text-xs text-silver">
                  <div><strong>Address:</strong> {formData.address || 'Not specified'}, {formData.city}</div>
                  <div><strong>Phone:</strong> {formData.phone || 'N/A'}</div>
                  <div><strong>GPS Coordinates:</strong> {formData.lat}, {formData.lng}</div>
                  <div><strong>Operating Hours:</strong> {formData.openingHours}</div>
                </div>

                <div className="pt-2">
                  <div className="text-[10px] uppercase font-bold text-silver mb-1.5">
                    Cataloged Services ({formData.services.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.services.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-graphite border border-steel text-[11px] text-snow">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>By submitting, you confirm that your workshop is physically located at the pinned coordinates.</span>
              </div>
            </div>
          )}

        </div>

        {/* Wizard Footer Navigation Controls */}
        <div className="mt-6 pt-4 border-t border-steel flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="btn-secondary px-4 py-2 text-xs flex items-center space-x-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() => {
                if (currentStep === 1 && !formData.businessName) {
                  alert('Please enter your business name before continuing.');
                  return;
                }
                setCurrentStep((prev) => prev + 1);
              }}
              className="btn-primary px-6 py-2.5 text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Continue</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={submitted}
              onClick={handleFinalSubmit}
              className="btn-primary px-7 py-2.5 text-xs font-bold flex items-center space-x-2 cursor-pointer shadow-lg"
            >
              {submitted ? (
                <span>Publishing to Map...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Business Registration</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
