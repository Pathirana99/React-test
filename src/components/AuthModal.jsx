import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowRight, 
  CheckCircle2,
  ShieldCheck 
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onLoginSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onLoginSuccess && onLoginSuccess({ email, name: fullName || email.split('@')[0] });
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-md bg-[#171A20] border border-[#252A32] rounded-3xl p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#A1A7B0] hover:text-[#F5F5F5] p-1.5 rounded-lg hover:bg-[#252A32] transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#0B0D10] border border-[#252A32] text-[11px] font-bold text-[#FFC400]">
            <span>APEX AUTO ID</span>
          </div>
          <h3 className="text-2xl font-bold font-heading text-[#F5F5F5]">
            {mode === 'login' ? 'Sign In to Your Account' : 'Create Driver Account'}
          </h3>
          <p className="text-xs text-[#A1A7B0]">
            {mode === 'login' 
              ? 'Access saved garages, vehicle specs, and navigation routes.' 
              : 'Join the premium automotive marketplace network.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-[#0B0D10] border border-[#252A32] mb-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-2 rounded-lg transition ${
              mode === 'login' ? 'bg-[#FFC400] text-[#0B0D10] font-bold' : 'text-[#A1A7B0]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`py-2 rounded-lg transition ${
              mode === 'register' ? 'bg-[#FFC400] text-[#0B0D10] font-bold' : 'text-[#A1A7B0]'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'register' && (
            <div>
              <label className="block text-[11px] uppercase font-bold text-[#A1A7B0] mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A7B0]" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className="w-full input-dark pl-10 pr-4 py-2.5 text-xs sm:text-sm"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] uppercase font-bold text-[#A1A7B0] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A7B0]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="driver@example.com"
                className="w-full input-dark pl-10 pr-4 py-2.5 text-xs sm:text-sm"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-[11px] uppercase font-bold text-[#A1A7B0] mb-1">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A7B0]" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full input-dark pl-10 pr-4 py-2.5 text-xs sm:text-sm"
                />
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] uppercase font-bold text-[#A1A7B0]">
                Password
              </label>
              {mode === 'login' && (
                <a href="#forgot" className="text-[11px] text-[#FFC400] hover:underline">
                  Forgot?
                </a>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A7B0]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full input-dark pl-10 pr-4 py-2.5 text-xs sm:text-sm"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-[11px] uppercase font-bold text-[#A1A7B0] mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A7B0]" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full input-dark pl-10 pr-4 py-2.5 text-xs sm:text-sm"
                />
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded accent-[#FFC400] cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-xs text-[#A1A7B0] cursor-pointer">
                Keep me signed in on this device
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={submitted}
            className="w-full btn-primary py-3 text-xs sm:text-sm flex items-center justify-center space-x-2 mt-4 cursor-pointer shadow-lg"
          >
            {submitted ? (
              <span className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Authenticating...</span>
              </span>
            ) : (
              <span>{mode === 'login' ? 'Sign In Now' : 'Complete Registration'}</span>
            )}
          </button>
        </form>

        {/* Security badge footer */}
        <div className="mt-6 pt-4 border-t border-[#252A32] flex items-center justify-center space-x-1.5 text-[11px] text-[#A1A7B0]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
          <span>Encrypted 256-bit Automotive ID Protocol</span>
        </div>

      </div>

    </div>
  );
}
