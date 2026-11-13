import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Home, 
  LayoutDashboard, 
  ShieldCheck, 
  Menu, 
  X, 
  Sparkles,
  FlaskConical,
  Info,
  Activity
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenUpload }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload Report', icon: Upload },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-blue-100/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleNavClick('landing')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-teal-600 to-cyan-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 group-hover:shadow-blue-500/30 transition-all duration-300">
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-[#172554] tracking-tight">ReportSaathi</span>
                <span className="bg-blue-50/80 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200/80 shadow-2xs">
                  AI HEALTH
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium -mt-0.5">Plain-Language Medical Lab Reports</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-2xs'
                      : 'text-slate-600 hover:text-[#172554] hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Button & Demo Badge */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs bg-white/80 text-blue-900 px-2.5 py-1 rounded-lg border border-blue-100 shadow-2xs flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              Client Demo Mode
            </span>
            <button
              onClick={() => handleNavClick('upload')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 via-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-sm font-bold rounded-xl shadow-sm shadow-blue-600/25 transition-all hover:shadow-md hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Report</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={() => handleNavClick('upload')}
              className="p-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl shadow-xs"
              aria-label="Upload report"
            >
              <Upload className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-[#172554] hover:bg-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-blue-100/80 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-4 space-y-2 shadow-lg animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-2xs'
                    : 'text-slate-600 hover:bg-blue-50/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-blue-50">
            <button
              onClick={() => handleNavClick('upload')}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-bold text-sm shadow-sm"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Lab Report (PDF / Image)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
