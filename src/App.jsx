import React, { useState } from 'react';
import { Sparkles, Code2, Layers, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm text-center space-y-6">
        
        {/* Status Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>App is live &amp; ready</span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
            <Code2 className="w-8 h-8 text-sky-400" />
            <span>React App</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Clean template ready for your components and pages.
          </p>
        </div>

        {/* Interactive State Demo */}
        <div className="p-4 rounded-xl bg-slate-850 bg-slate-800/40 border border-slate-800 space-y-3">
          <div className="text-xs text-slate-400">State Test</div>
          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm transition cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-sky-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Count is {count}</span>
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 gap-2 text-left text-xs text-slate-300">
          <div className="p-3 rounded-lg bg-slate-800/20 border border-slate-800 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Tailwind CSS</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/20 border border-slate-800 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Vite + React</span>
          </div>
        </div>

      </div>

      <footer className="mt-8 text-xs text-slate-500">
        Edit <code className="text-slate-400">src/App.jsx</code> to start building
      </footer>
    </div>
  );
}
