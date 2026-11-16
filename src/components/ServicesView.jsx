import React from 'react';
import { 
  CATEGORIES, 
  INITIAL_SHOPS 
} from '../data/automotiveData';
import { 
  Warehouse, 
  Wrench, 
  Gauge, 
  Sparkles, 
  CircleDot, 
  PackageCheck, 
  Zap, 
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Navigation
} from 'lucide-react';

const iconMap = {
  Warehouse,
  Wrench,
  Gauge,
  Sparkles,
  CircleDot,
  PackageCheck,
  Zap,
  ShieldCheck
};

export default function ServicesView({ onSelectCategoryOnMap }) {
  return (
    <div className="w-full bg-[#0B0D10] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#171A20] border border-[#252A32] text-xs font-bold text-[#FFC400]">
            <span>AUTOMOTIVE REPAIR &amp; PARTS DIRECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F5F5] font-heading tracking-tight">
            Specialized Automotive Services
          </h2>
          <p className="text-[#A1A7B0] text-sm sm:text-base leading-relaxed">
            Find certified centers equipped with factory-grade diagnostic computers, certified technicians, and genuine OEM inventory.
          </p>
        </div>

        {/* Detailed Grid of Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || Wrench;
            return (
              <div
                key={cat.id}
                className="card-graphite p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6 group hover:border-[#FFC400]/40 transition"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#0B0D10] border border-[#252A32] flex items-center justify-center text-[#FFC400]">
                      <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-xs font-bold text-[#FFC400] bg-[#FFC400]/10 px-3 py-1 rounded-lg border border-[#FFC400]/20">
                      {cat.count}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-heading text-[#F5F5F5] group-hover:text-[#FFC400] transition">
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A1A7B0] mt-1.5 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Typical Services Checklist */}
                  <div className="pt-3 border-t border-[#252A32] space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#A1A7B0]">
                      Common Offerings
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#F5F5F5]">
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                        <span>Factory Diagnostics</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                        <span>Certified Mechanics</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                        <span>Genuine Components</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                        <span>Turn-by-Turn GPS</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#252A32]">
                  <button
                    onClick={() => onSelectCategoryOnMap(cat.id)}
                    className="w-full btn-primary py-2.5 px-4 text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Locate {cat.name} on Map</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
