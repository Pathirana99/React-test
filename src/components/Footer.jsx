import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Compass, 
  Wrench,
  ArrowUp
} from 'lucide-react';

export default function Footer({ onNavigate, onOpenRegister }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-midnight border-t border-steel text-xs text-silver pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={scrollToTop}>
              <div className="w-9 h-9 rounded-xl bg-graphite border border-steel flex items-center justify-center">
                <span className="font-heading font-extrabold text-base text-yellow">AP</span>
              </div>
              <div className="flex items-center space-x-1.5 font-heading font-extrabold text-lg text-snow">
                <span>APEX</span>
                <span className="text-yellow">AUTO</span>
              </div>
            </div>

            <p className="text-silver text-xs leading-relaxed max-w-sm">
              The premier location discovery and vehicle parts marketplace connecting drivers with high-standard automotive centers and certified garages.
            </p>

            <div className="text-[11px] font-bold tracking-widest text-yellow uppercase">
              FIND. CONNECT. DRIVE BETTER.
            </div>
          </div>

          {/* Quick Discovery Links */}
          <div className="space-y-3">
            <div className="font-heading font-bold text-xs uppercase tracking-wider text-snow">
              Discovery
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-yellow transition">
                  Interactive Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-yellow transition">
                  Automotive Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-yellow transition">
                  Garages Near Me
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-yellow transition">
                  Spare Parts Stores
                </button>
              </li>
            </ul>
          </div>

          {/* Business Owners */}
          <div className="space-y-3">
            <div className="font-heading font-bold text-xs uppercase tracking-wider text-snow">
              Business Owners
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenRegister} className="text-yellow hover:underline font-semibold">
                  Register Your Business
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-yellow transition">
                  Owner Dashboard
                </button>
              </li>
              <li>
                <a href="#verification" className="hover:text-yellow transition">
                  Verification Guidelines
                </a>
              </li>
              <li>
                <a href="#partner" className="hover:text-yellow transition">
                  Partner Directory
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Safety */}
          <div className="space-y-3">
            <div className="font-heading font-bold text-xs uppercase tracking-wider text-snow">
              Platform &amp; Legal
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#privacy" className="hover:text-yellow transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-yellow transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-yellow transition">
                  Safety &amp; Compliance
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-yellow transition">
                  Help &amp; Support
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 border-t border-steel flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-silver">
          <div>
            © {new Date().getFullYear()} APEX AUTO Technologies. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <span>Built for High Performance Vehicles</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-snow hover:text-yellow transition cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
