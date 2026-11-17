import React from 'react';
import { 
  Warehouse, 
  Wrench, 
  Gauge, 
  Sparkles, 
  CircleDot, 
  PackageCheck, 
  Zap, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import { CATEGORIES } from '../data/automotiveData';

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

export default function CategoryGrid({ onSelectCategory }) {
  return (
    <section id="categories" className="py-16 sm:py-24 bg-midnight border-b border-steel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-yellow text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-yellow" />
              <span>Automotive Directory Categories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-snow font-heading tracking-tight">
              Explore by Specialization
            </h2>
            <p className="text-silver text-sm sm:text-base mt-2 max-w-xl">
              From routine oil renewals to full chassis track preparation and verified OEM spare components.
            </p>
          </div>

          <div className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-graphite border border-steel text-silver self-start sm:self-auto">
            8 Specialized Sectors
          </div>
        </div>

        {/* Categories 8-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORIES.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Wrench;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="card-graphite p-6 rounded-2xl flex flex-col justify-between space-y-5 cursor-pointer group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Category Icon Badge */}
                  <div className="w-12 h-12 rounded-xl bg-midnight border border-steel group-hover:border-yellow flex items-center justify-center transition-colors">
                    <IconComponent className="w-6 h-6 text-yellow group-hover:scale-110 transition-transform" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-snow group-hover:text-yellow transition-colors font-heading">
                      {cat.name}
                    </h3>
                    <p className="text-silver text-xs leading-relaxed mt-1.5">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-steel flex items-center justify-between text-xs font-semibold text-silver group-hover:text-snow">
                  <span>{cat.count}</span>
                  <div className="w-6 h-6 rounded-full bg-steel group-hover:bg-yellow group-hover:text-black flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
