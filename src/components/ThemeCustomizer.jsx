import React, { useState } from 'react';
import { Palette, Check, X, Sliders, Sparkles } from 'lucide-react';
import { THEME_PRESETS, switchPreset, THEME_COLORS } from '../theme/colors';

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePreset, setActivePreset] = useState('racingYellow');

  const handleSelectPreset = (key) => {
    setActivePreset(key);
    switchPreset(key);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Toggle Button */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 px-3.5 py-2.5 rounded-full bg-graphite border border-steel hover:border-yellow text-snow shadow-2xl transition-all duration-200 group cursor-pointer hover:scale-105"
          title="Customize Theme Colors"
        >
          <div className="w-4 h-4 rounded-full bg-yellow group-hover:scale-110 transition-transform flex items-center justify-center">
            <Palette className="w-2.5 h-2.5 text-midnight" />
          </div>
          <span className="text-xs font-bold tracking-tight text-snow">
            Theme Colors
          </span>
        </button>
      ) : (
        /* Expanded Theme Popover */
        <div className="w-80 p-5 rounded-2xl bg-graphite border border-steel shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Palette className="w-4 h-4 text-yellow" />
              <h4 className="text-sm font-bold text-snow font-heading">
                Color Theme Switcher
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-silver hover:text-snow p-1 rounded-md hover:bg-steel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-silver leading-relaxed">
            All colors are centralized in <code className="text-yellow bg-midnight px-1.5 py-0.5 rounded text-[10px]">src/theme/colors.js</code>. Edit that single file anytime to change colors permanently.
          </p>

          {/* Quick Presets */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase font-bold text-silver tracking-wider">
              Instant Automotive Palettes
            </div>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(THEME_PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => handleSelectPreset(key)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition cursor-pointer text-xs ${
                    activePreset === key
                      ? 'bg-midnight border-yellow text-snow font-bold ring-1 ring-yellow/40'
                      : 'bg-midnight/60 border-steel text-silver hover:text-snow hover:border-steel'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span 
                      className="w-3.5 h-3.5 rounded-full shadow-sm shrink-0 border border-white/20"
                      style={{ backgroundColor: preset.accent }}
                    />
                    <span className="truncate">{preset.name}</span>
                  </div>
                  {activePreset === key && (
                    <Check className="w-4 h-4 text-yellow shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-steel text-[10px] text-silver flex items-center justify-between">
            <span>Single File:</span>
            <span className="font-mono text-snow">src/theme/colors.js</span>
          </div>
        </div>
      )}
    </div>
  );
}
