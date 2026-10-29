import React, { useState, useEffect } from 'react';
import { techIconMap } from './components/TechIcons';
import { 
  Code2, 
  Cpu, 
  Globe, 
  Mail, 
  ExternalLink, 
  Layers, 
  Send,
  ChevronRight,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  Menu,
  X,
  Home,
  ArrowUp
} from 'lucide-react';
import { THEMES } from './config/themes';
import { 
  personalInfo, 
  navLinks, 
  socialLinks, 
  highlights, 
  projectCategories, 
  projects, 
  skills, 
  experience, 
  education 
} from './data/portfolioData';

const currentYear = new Date().getFullYear();

// Protocol helper for external links
const ensureUrl = (url) => {
  if (!url) return '#';
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') 
    ? url 
    : `https://${url}`;
};

const ensureEmail = (email) => {
  if (!email) return '#';
  return email.startsWith('mailto:') ? email : `mailto:${email}`;
};

// Resolve public asset paths with Vite base URL for GitHub Pages
const resolveAsset = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

// Modern Clean SVG Icons
const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [formStatus, setFormStatus] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    document.title = "Sunith P Pathirana | Full-Stack Software Engineer";

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    const handleScroll = () => {
      // Enable button when scrolled down past 300px
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const scrollToHome = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Message received! I will respond promptly.');
    setTimeout(() => setFormStatus(''), 4500);
  };

  return (
    <div className="min-h-screen bg-[#080b12] text-slate-100 selection:bg-sky-500/30 selection:text-white relative overflow-x-hidden font-sans">
      
      {/* Background Subtle Tech Pattern & Top Ambient Radial Light */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern z-0" />
      <div className="fixed top-0 left-0 right-0 h-[650px] hero-radial-glow pointer-events-none z-0" />

      {/* ==========================================================================
          Header & Navigation Bar: Full-Width Rounded Modern Sticky Bar
          ========================================================================== */}
      <header className="sticky top-4 z-50 w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="w-full bg-[#0d121f]/85 backdrop-blur-xl border border-white/[0.08] rounded-2xl px-5 sm:px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/50 transition-all">
          
          {/* Brand Logo & Active Signal */}
          <a href="#home" className="flex items-center space-x-3 group">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-base font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
              {personalInfo.brandName || "Sunith.dev"}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Action Button & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            <a 
              href="#contact" 
              className="hidden sm:inline-flex items-center space-x-1.5 btn-primary px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide"
            >
              <span>Get in Touch</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-3 bg-[#0d121f]/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl space-y-1 shadow-2xl animate-fade-in">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center mt-2 btn-primary px-4 py-2.5 rounded-xl text-sm font-semibold"
            >
              Get in Touch
            </a>
          </div>
        )}
      </header>

      {/* ==========================================================================
          Main Content Sections
          ========================================================================== */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-24 sm:space-y-32 relative z-10">

        {/* ==========================================================================
            Hero Section: Modern Clean Engineering Persona
            ========================================================================== */}
        <section 
          id="home" 
          className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center text-center pb-12 scroll-mt-24"
        >
          <div className="space-y-6 max-w-3xl mx-auto">
            
            {/* Live Availability Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-sky-500/[0.08] border border-sky-400/20 text-xs font-semibold text-sky-300 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Full-Stack &amp; Software Engineering Roles</span>
            </div>
            
            {/* Primary Headline with Perfect Typography Hierarchy */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                {personalInfo.headline}
              </h1>
              <div className="text-3xl sm:text-5xl lg:text-6xl font-extrabold gradient-accent tracking-tight leading-[1.15]">
                {personalInfo.headlineGradient}
              </div>
            </div>

            {/* Subtitle Bio */}
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed pt-1">
              {personalInfo.bio}
            </p>

            {/* Quick Metrics Bento Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs text-slate-300 font-medium">
              <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-white/[0.08] flex items-center space-x-1.5">
                <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                <span>{personalInfo.experienceYears}</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-white/[0.08] flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-white/[0.08] flex items-center space-x-1.5">
                <Code2 className="w-3.5 h-3.5 text-sky-400" />
                <span>{skills.length} Core Technologies</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <a 
                href="#projects"
                className="btn-primary px-7 py-3 rounded-xl font-semibold text-sm flex items-center space-x-2 cursor-pointer shadow-lg tracking-wide"
              >
                <span>View Projects</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a 
                href="#about"
                className="btn-secondary px-6 py-3 rounded-xl font-medium text-sm flex items-center space-x-2 cursor-pointer"
              >
                <span>About Me</span>
              </a>

              <div className="flex items-center space-x-2 pl-1">
                <a 
                  href={ensureUrl(socialLinks.github)} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a 
                  href={ensureUrl(socialLinks.linkedin)} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ==========================================================================
            About Bento Section
            ========================================================================== */}
        <section id="about" className="space-y-8 scroll-mt-24">
          <div className="flex items-center space-x-2 text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>Profile &amp; Background</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Column: Portrait Bento Card */}
            <div className="lg:col-span-5 modern-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="flex flex-col items-center text-center space-y-4">
                
                {/* Modern Avatar Portrait Frame */}
                <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-slate-900 relative group">
                  <img
                    src={resolveAsset(personalInfo.avatarUrl)}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextElementSibling) {
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center font-extrabold text-5xl text-white bg-gradient-to-tr from-sky-500 to-indigo-600">
                    {personalInfo.name.charAt(0)}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{personalInfo.name}</h3>
                  <p className="text-sky-400 text-sm font-medium mt-0.5">{personalInfo.role}</p>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/[0.08] text-left">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Experience</span>
                  <div className="text-sm font-semibold text-white mt-0.5">{personalInfo.experienceYears}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Location</span>
                  <div className="text-sm font-semibold text-white mt-0.5">{personalInfo.location}</div>
                </div>
              </div>

              {/* Social Link Row */}
              <div className="flex items-center space-x-3 pt-1">
                <a 
                  href={ensureUrl(socialLinks.github)} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center space-x-2 text-xs font-semibold text-slate-200 transition"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a 
                  href={ensureUrl(socialLinks.linkedin)} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center space-x-2 text-xs font-semibold text-slate-200 transition"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Right Column: Bio & Highlights Bento */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              
              {/* Bio Card */}
              <div className="modern-card rounded-3xl p-6 sm:p-8 space-y-4 flex-1">
                <span className="text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  About Me
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-2">
                  Passionate Software Engineer
                </h2>
                <p className="text-slate-300 text-base font-normal leading-relaxed">
                  {personalInfo.bio}
                </p>
                <div className="pt-2 flex items-center space-x-2 text-xs text-sky-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span>Focused on Clean Code, High Concurrency, and Scalable Architecture</span>
                </div>
              </div>

              {/* Highlights 3-Card Bento Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {highlights.map((h) => {
                  const Icon = h.icon === 'Cpu' ? Cpu : h.icon === 'Layers' ? Layers : Globe;
                  return (
                    <div key={h.id} className="modern-card rounded-2xl p-4 space-y-2 text-left">
                      <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-tight">{h.title}</h4>
                      <p className="text-slate-400 text-xs font-normal leading-snug">{h.description}</p>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </section>

        {/* ==========================================================================
            Experience Section (Modern Connected Timeline with Node Badges)
            ========================================================================== */}
        <section id="experience" className="space-y-8 scroll-mt-24">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              Career Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-3">Professional Experience</h2>
            <p className="text-slate-400 text-sm mt-1">Industry track record and practical software development experience.</p>
          </div>

          {/* Timeline Track with Connected Squircle Nodes */}
          <div className="relative pl-12 sm:pl-16 space-y-6 sm:space-y-8 before:absolute before:top-6 before:bottom-6 before:left-[19px] sm:before:left-[23px] before:w-[2px] before:bg-gradient-to-b before:from-sky-400 before:via-sky-500/50 before:to-indigo-500/30">
            {experience.map((item) => (
              <div key={item.id} className="relative group">
                {/* Connected Squircle Node Badge (Matching Reference) */}
                <div className="absolute -left-12 sm:-left-16 top-4 sm:top-5 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#0c111e] border border-sky-400/40 group-hover:border-sky-400 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center text-sky-400 shadow-[0_0_12px_-2px_rgba(56,189,248,0.25)] transition-all duration-300 z-10">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 group-hover:scale-110 transition-transform" />
                </div>

                {/* Timeline Content Card */}
                <div className="modern-card rounded-2xl sm:rounded-3xl p-6 sm:p-7 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">{item.role}</h3>
                      <div className="text-sm font-semibold text-sky-400 mt-0.5">{item.company}</div>
                    </div>
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-slate-300 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5 text-sky-400" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm font-normal leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.06]">
                    {item.technologies.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 rounded-lg bg-slate-900/60 text-[11px] font-medium text-slate-300 border border-white/[0.08]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================================================
            Education Section (Modern Connected Timeline with Node Badges)
            ========================================================================== */}
        <section id="education" className="space-y-8 scroll-mt-24">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              Education
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-3">Academic Background</h2>
            <p className="text-slate-400 text-sm mt-1">Foundational knowledge in computing, engineering, and system design.</p>
          </div>

          {/* Timeline Track with Connected Squircle Nodes */}
          <div className="relative pl-12 sm:pl-16 space-y-6 sm:space-y-8 before:absolute before:top-6 before:bottom-6 before:left-[19px] sm:before:left-[23px] before:w-[2px] before:bg-gradient-to-b before:from-sky-400 before:via-sky-500/50 before:to-indigo-500/30">
            {education.map((item) => (
              <div key={item.id} className="relative group">
                {/* Connected Squircle Node Badge */}
                <div className="absolute -left-12 sm:-left-16 top-4 sm:top-5 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#0c111e] border border-sky-400/40 group-hover:border-sky-400 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center text-sky-400 shadow-[0_0_12px_-2px_rgba(56,189,248,0.25)] transition-all duration-300 z-10">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 group-hover:scale-110 transition-transform" />
                </div>

                {/* Timeline Content Card */}
                <div className="modern-card rounded-2xl sm:rounded-3xl p-6 sm:p-7 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">{item.degree}</h3>
                      <div className="text-sm font-semibold text-sky-400 mt-0.5">{item.institution}</div>
                    </div>
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-slate-300 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5 text-sky-400" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================================================
            Projects Showcase Section (Modern 2-Column Bento)
            ========================================================================== */}
        <section id="projects" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>Featured Engineering Works</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Portfolio Projects</h2>
              <p className="text-slate-400 text-sm mt-1">High-concurrency systems, distributed storage, and polished interfaces.</p>
            </div>
            
            {/* Category Filter Pills */}
            <div className="flex items-center space-x-1 p-1 rounded-xl bg-slate-900/60 border border-white/[0.08] self-start sm:self-auto overflow-x-auto">
              {projectCategories.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium capitalize transition cursor-pointer ${
                    activeTab === tab.id
                      ? 'modern-pill-active font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="modern-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  
                  {/* Project Cover Image with Modern Zoom */}
                  {project.image && (
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.08] bg-slate-900">
                      <img 
                        src={resolveAsset(project.image)} 
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080b12]/90 via-transparent to-transparent pointer-events-none" />

                      {/* Floating Category Tag */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-lg backdrop-blur-md bg-black/60 border border-white/20 text-sky-300 shadow-sm">
                          {project.category}
                        </span>
                      </div>

                      {/* Floating Action Links */}
                      <div className="absolute top-3 right-3 z-10 flex items-center space-x-2">
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-8 h-8 rounded-lg backdrop-blur-md bg-black/60 border border-white/20 flex items-center justify-center text-slate-200 hover:text-white hover:border-sky-400/50 hover:bg-black/80 transition"
                          title="View Source on GitHub"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                        <a 
                          href={project.live} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-8 h-8 rounded-lg backdrop-blur-md bg-black/60 border border-white/20 flex items-center justify-center text-slate-200 hover:text-white hover:border-sky-400/50 hover:bg-black/80 transition"
                          title="Live Deployment"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 text-sm font-normal leading-relaxed mt-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                  {project.tech.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 rounded-lg bg-slate-900/60 text-[11px] font-medium text-slate-300 border border-white/[0.08] group-hover:border-white/20 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================================================
            Technical Arsenal (Skills) Section
            ========================================================================== */}
        <section id="skills" className="modern-card rounded-3xl p-8 sm:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>Core Capabilities &amp; Tooling</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Technical Arsenal</h2>
              <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl font-normal">
                Modern enterprise frameworks, distributed architectures, database engines, and continuous integration workflows.
              </p>
            </div>
            <div className="text-xs font-medium px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-white/[0.08] text-slate-300 w-fit">
              <span className="text-sky-400 font-bold">{skills.length}</span> Core Technologies
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
            {skills.map((skill, index) => {
              const IconComponent = techIconMap[skill.id] || Code2;
              return (
                <div 
                  key={skill.id || index} 
                  className="group relative p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-sky-400/30 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center text-center gap-2.5 cursor-default"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center p-2 bg-slate-900/80 border border-white/[0.08] group-hover:border-sky-400/40 group-hover:scale-110 transition-all duration-300 shadow-inner">
                    <IconComponent className="w-6 h-6 transition-all" />
                  </div>

                  <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors tracking-tight">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==========================================================================
            Contact Section (Modern Bento Form)
            ========================================================================== */}
        <section id="contact" className="modern-card rounded-3xl p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  Get in Touch
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-3">
                  {personalInfo.contactTitle}
                </h2>
                <p className="text-slate-400 text-sm sm:text-base mt-2 font-normal leading-relaxed">
                  {personalInfo.contactSubtitle}
                </p>
              </div>

              {/* Direct Info Tiles */}
              <div className="space-y-3 pt-2">
                <a 
                  href={ensureEmail(socialLinks.email)}
                  className="flex items-center space-x-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-sky-400/30 text-slate-300 hover:text-white transition group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 group-hover:scale-105 transition">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Direct Email</div>
                    <div className="text-sm font-medium text-white">{socialLinks.email.replace('mailto:', '')}</div>
                  </div>
                </a>

                <div className="flex items-center space-x-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Location</div>
                    <div className="text-sm font-medium text-white">{personalInfo.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  required
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30 transition"
                />
                <input 
                  type="email" 
                  required
                  placeholder="Email Address" 
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30 transition"
                />
              </div>
              <textarea 
                rows={4} 
                required
                placeholder="Your Message..." 
                className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30 transition resize-none"
              ></textarea>
              
              <div className="flex items-center justify-between pt-2">
                <button 
                  type="submit" 
                  className="btn-primary px-6 py-3 rounded-xl font-semibold text-sm flex items-center space-x-2 cursor-pointer shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>

                {formStatus && (
                  <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1.5 animate-fade-in">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{formStatus}</span>
                  </span>
                )}
              </div>
            </form>

          </div>
        </section>

      </main>

      {/* ==========================================================================
          Clean Modern Footer
          ========================================================================== */}
      <footer className="mt-28 py-10 border-t border-white/[0.06] text-center text-xs text-slate-400 relative z-10 flex flex-col items-center gap-4">
        <div className="flex items-center space-x-4">
          <a href={ensureUrl(socialLinks.github)} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-white/20">
            <GithubIcon className="w-4 h-4" />
          </a>
          <a href={ensureUrl(socialLinks.linkedin)} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-white/20">
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a href={ensureEmail(socialLinks.email)} className="text-slate-400 hover:text-white transition p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-white/20">
            <Mail className="w-4 h-4" />
          </a>
        </div>
        <p>© {currentYear} {personalInfo.footerCopyright}</p>
      </footer>

      {/* ==========================================================================
          Floating Center Back-to-Home Button (Visible only on scroll down)
          ========================================================================== */}
      {showBackToTop && (
        <button
          onClick={scrollToHome}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#0d121f]/90 backdrop-blur-xl border border-sky-400/40 text-white shadow-[0_10px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(56,189,248,0.3)] hover:border-sky-400 hover:shadow-[0_12px_36px_rgba(56,189,248,0.45)] transition-all duration-300 hover:-translate-y-1 group cursor-pointer animate-fade-in"
          aria-label="Back to Home"
          title="Back to Home"
        >
          <Home className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-200 group-hover:text-white">
            Home
          </span>
          <ArrowUp className="w-3.5 h-3.5 text-sky-400 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

    </div>
  );
}
