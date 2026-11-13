import React from 'react';
import { FlaskConical, ShieldCheck, Heart, AlertTriangle } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-500 text-white flex items-center justify-center shadow-md">
                <FlaskConical className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">ReportSaathi</span>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-teal-900 text-teal-300 px-2 py-0.5 rounded border border-teal-700">
                DEMO
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Empowering patients with plain-language explanations of complex diagnostic laboratory reports. 
              Bridging clinical data and patient understanding so you can have more informed conversations with your doctor.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero-Storage Guarantee: Client-side local demonstration mode.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('landing')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('upload')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Upload Lab Report
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Educational Mission & About
                </button>
              </li>
            </ul>
          </div>

          {/* Safe Health Guidelines */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Important Notice</h4>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 text-xs text-slate-400 leading-relaxed">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Not Medical Advice</span>
              </div>
              All sample values and explanations presented are realistic fictional demonstrations for educational reference only.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} ReportSaathi. Built for educational and health-literacy demonstration.
          </p>
          <p className="flex items-center gap-1">
            Engineered with care for clear health communication
          </p>
        </div>
      </div>
    </footer>
  );
}
