import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Wrench, 
  Building2, 
  User, 
  Menu, 
  X, 
  ChevronRight, 
  ShieldCheck, 
  LayoutDashboard 
} from 'lucide-react';

export default function Navbar({ activeView, setActiveView, onOpenAuth, onOpenRegister }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'explore', label: 'Explore Shops', icon: MapPin },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'dashboard', label: 'Owner Dashboard', icon: LayoutDashboard },
  ];

  const handleNavClick = (id) => {
    setActiveView(id);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-midnight/95 backdrop-blur-md border-b border-steel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveView('home')} 
          className="flex items-center space-x-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-graphite border border-steel group-hover:border-yellow flex items-center justify-center transition-all duration-200 shadow-inner">
            <span className="font-heading font-extrabold text-lg text-yellow tracking-tighter">
              AP
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-heading font-extrabold text-xl text-snow tracking-tight">
                APEX
              </span>
              <span className="font-heading font-extrabold text-xl text-yellow tracking-tight">
                AUTO
              </span>
            </div>
            <div className="text-[10px] uppercase font-semibold tracking-widest text-silver">
              Automotive Services
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                  isActive
                    ? 'text-snow bg-graphite border border-steel'
                    : 'text-silver hover:text-snow hover:bg-graphite/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-yellow' : 'text-silver'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow ml-1" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={() => onOpenRegister()}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-silver hover:text-yellow transition cursor-pointer"
          >
            <Building2 className="w-4 h-4" />
            <span>Register Business</span>
          </button>

          <button
            onClick={() => onOpenAuth('login')}
            className="btn-secondary px-4 py-2 text-xs cursor-pointer flex items-center space-x-1.5"
          >
            <User className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>

          <button
            onClick={() => setActiveView('explore')}
            className="btn-primary px-4 py-2 text-xs flex items-center space-x-1.5 cursor-pointer"
          >
            <span>Explore Map</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => setActiveView('explore')}
            className="btn-primary p-2 text-xs"
            title="Explore Map"
          >
            <MapPin className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-graphite border border-steel text-snow"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-midnight border-b border-steel px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-graphite text-yellow border border-steel'
                    : 'text-silver hover:text-snow'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-steel grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenAuth('login');
              }}
              className="btn-secondary py-2.5 text-xs text-center"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenRegister();
              }}
              className="btn-primary py-2.5 text-xs text-center"
            >
              Register Business
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
