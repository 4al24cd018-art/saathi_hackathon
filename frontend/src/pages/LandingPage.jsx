import React from 'react';
import { 
  Upload, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  Sparkles, 
  FileCheck2, 
  Activity, 
  HelpCircle, 
  HeartHandshake, 
  Lock, 
  CheckCircle,
  FileSpreadsheet,
  AlertTriangle,
  Zap,
  Dna,
  Stethoscope
} from 'lucide-react';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { SAMPLE_REPORTS } from '../data/sampleReports';

export default function LandingPage({ onNavigate, onSelectReport }) {
  const cbcDemo = SAMPLE_REPORTS[0];

  const features = [
    {
      icon: BookOpen,
      title: 'Plain-Language Translation',
      description: 'Medical jargon like "Microcytosis" or "Hypocalcemia" converted into everyday language anyone can understand.'
    },
    {
      icon: Activity,
      title: 'Visual Reference Intervals',
      description: 'Intuitive color-coded scales show at a glance whether your biomarkers sit in optimal, low, or high zones.'
    },
    {
      icon: HelpCircle,
      title: 'Doctor Discussion Guide',
      description: 'Get tailored, non-alarmist questions to ask your physician during your next clinical appointment.'
    },
    {
      icon: Lock,
      title: 'Zero Cloud Storage Privacy',
      description: 'Files are processed in local demonstration mode. Personal names and patient IDs never touch third-party servers.'
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Select or Drag Your Report',
      desc: 'Upload standard laboratory documents in PDF, JPG, or PNG format (up to 10 MB).'
    },
    {
      step: '02',
      title: 'Local De-Identification',
      desc: 'Simulated client-side privacy filtering removes your name, address, and patient reference numbers.'
    },
    {
      step: '03',
      title: 'Educational Interpretation',
      desc: 'Biomarkers are structured into clean organ panels with clear Normal, High, and Low status tags.'
    },
    {
      step: '04',
      title: 'Doctor Consultation Preparation',
      desc: 'Review doctor-friendly prompts and questions to make the most of your medical consultation.'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Educational Banner */}
      <DisclaimerBanner />

      {/* Hero Section */}
      <section className="relative pt-4 pb-8 overflow-hidden">
        {/* Abstract Flowing Shapes & Glows in Hero */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
          {/* Flowing Organic Wave 1 */}
          <svg 
            className="absolute -top-16 -left-20 w-[600px] h-[500px] text-blue-400/10 blur-xl animate-float-slow" 
            viewBox="0 0 100 100" 
            fill="currentColor"
          >
            <path d="M10,30 Q30,5 60,25 T90,60 Q70,95 40,80 T10,30 Z" />
          </svg>
          {/* Flowing Organic Wave 2 */}
          <svg 
            className="absolute top-20 -right-24 w-[650px] h-[550px] text-teal-400/10 blur-2xl animate-float" 
            viewBox="0 0 100 100" 
            fill="currentColor"
          >
            <path d="M20,20 Q60,-5 80,30 T70,85 Q30,100 15,65 T20,20 Z" />
          </svg>
        </div>

        {/* Hero Grid Container: Headline + Medical AI Graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading, Value Prop, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-blue-200/80 text-blue-900 text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Next-Gen Medical Lab Literacy Companion</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#172554] tracking-tight leading-[1.12]">
              Decode Your Lab Tests with{' '}
              <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Intelligent Medical AI
              </span>
              .
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              ReportSaathi transforms confusing diagnostic lab sheets into clear, plain-language insights. 
              Understand every biomarker, visualize reference intervals, and feel confident during your doctor's visit.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => onNavigate('upload')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/40 active:translate-y-0"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Lab Report</span>
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white/85 hover:bg-white text-[#172554] border border-blue-200/90 font-bold text-sm shadow-xs backdrop-blur-md transition-all duration-300 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5"
              >
                <span>Explore Demo Hub</span>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </button>
            </div>

            {/* Safety Guarantee Highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-500 pt-3">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                100% Free Educational Aid
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Zero Cloud Storage
              </span>
              <span className="flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-teal-600" />
                PDF, JPG & PNG Ready
              </span>
            </div>
          </div>

          {/* Right Column: Abstract Medical AI Technology Artwork */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Background Glow behind artwork */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-teal-400/20 to-transparent rounded-3xl blur-2xl" />

            {/* Floating Main Glassmorphic Art Card */}
            <div className="relative w-full max-w-md bg-white/85 backdrop-blur-xl rounded-3xl border border-blue-100 p-6 shadow-xl shadow-blue-900/10 space-y-4">
              {/* Card Header with Glowing Status */}
              <div className="flex items-center justify-between pb-3 border-b border-blue-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center text-white shadow-xs">
                    <Activity className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-[#172554] tracking-tight">AI Health Engine Active</h3>
                    <p className="text-[10px] text-teal-700 font-medium">De-identified Diagnostics</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  Live Preview
                </span>
              </div>

              {/* Animated ECG / Medical Waveform SVG Artwork */}
              <div className="relative h-28 bg-gradient-to-r from-blue-900 via-[#172554] to-teal-900 rounded-2xl p-3 overflow-hidden shadow-inner flex flex-col justify-between">
                {/* Subtle Grid in artwork */}
                <div className="absolute inset-0 medical-cross-pattern opacity-20" />
                
                <div className="relative z-10 flex items-center justify-between text-[11px] text-teal-200 font-mono">
                  <span>PULSE INTERV: OPTIMAL</span>
                  <span className="flex items-center gap-1 text-cyan-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    72 BPM
                  </span>
                </div>

                {/* Heartbeat Waveform Vector Path */}
                <svg className="w-full h-12 text-teal-400" viewBox="0 0 300 60" fill="none">
                  <path 
                    d="M0,30 L60,30 L75,10 L85,50 L95,20 L105,38 L115,30 L180,30 L195,12 L205,48 L215,22 L225,35 L235,30 L300,30" 
                    stroke="url(#pulse-gradient)" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="50%" stopColor="#2dd4bf" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="relative z-10 flex items-center justify-between text-[10px] text-blue-200">
                  <span>BIOMARKER MATCH: 100%</span>
                  <span className="text-teal-300 font-semibold">LOCAL DEMO</span>
                </div>
              </div>

              {/* Floating Medical AI Micro-Cards */}
              <div className="space-y-2 pt-1">
                <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-[#172554]">Hemoglobin (Hb)</span>
                  </div>
                  <span className="text-xs font-extrabold text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-100">
                    14.2 g/dL • Normal
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-teal-50/60 border border-teal-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                    <span className="text-xs font-bold text-[#172554]">Lipid Fraction HDL</span>
                  </div>
                  <span className="text-xs font-extrabold text-teal-800 bg-white px-2 py-0.5 rounded-md border border-teal-100">
                    55 mg/dL • Cardioprotective
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50/90 border border-blue-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    Personal Identifiers Masked
                  </span>
                  <span className="font-semibold text-blue-800">100% Client-Side</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Demo Preview Card */}
        <div className="mt-14 max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-blue-100/80 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Interactive Demo Preview
                </span>
                <span className="text-xs text-slate-500">• Simulated Hematology Panel</span>
              </div>
              <h3 className="text-xl font-bold text-[#172554] mt-1.5">Complete Blood Count (CBC) with Differential</h3>
              <p className="text-xs text-slate-500">Realistic fictional laboratory dataset formatted for education</p>
            </div>
            <button
              onClick={() => onSelectReport(cbcDemo)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-all hover:scale-105 self-start sm:self-auto shadow-2xs"
            >
              <span>Inspect Full Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Biomarker Snapshot */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-white/90 border border-blue-100 shadow-2xs hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-700">Hemoglobin (Hb)</span>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[11px] font-extrabold border border-sky-200">Low</span>
              </div>
              <div className="text-2xl font-black text-[#172554]">11.2 <span className="text-xs font-normal text-slate-500">g/dL</span></div>
              <p className="text-[11px] text-slate-500 mt-1">Standard: 12.0 - 15.5 g/dL</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-blue-100 shadow-2xs hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-700">White Blood Cells (WBC)</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-extrabold border border-emerald-200">Normal</span>
              </div>
              <div className="text-2xl font-black text-[#172554]">6,900 <span className="text-xs font-normal text-slate-500">cells/mcL</span></div>
              <p className="text-[11px] text-slate-500 mt-1">Standard: 4,500 - 11,000</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-blue-100 shadow-2xs hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-700">Platelet Count</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-extrabold border border-emerald-200">Normal</span>
              </div>
              <div className="text-2xl font-black text-[#172554]">250,000 <span className="text-xs font-normal text-slate-500">/mcL</span></div>
              <p className="text-[11px] text-slate-500 mt-1">Standard: 150,000 - 450,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-6 border-t border-blue-100/80">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200 mb-2">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>Step-by-Step Clarity</span>
          </div>
          <h3 className="text-3xl font-black text-[#172554] tracking-tight">How ReportSaathi Works</h3>
          <p className="text-sm text-slate-600 mt-2">
            Engineered to simplify medical complexity while keeping your confidential information private.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {howItWorks.map((item) => (
            <div 
              key={item.step}
              className="glass-card p-6 rounded-3xl hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 relative group"
            >
              <div className="text-3xl font-black text-blue-200/80 group-hover:text-blue-500/50 transition-colors mb-3">
                {item.step}
              </div>
              <h4 className="text-base font-bold text-[#172554] mb-2">{item.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 mb-2">
            <Dna className="w-3.5 h-3.5 text-teal-600" />
            <span>Built For Patients & Families</span>
          </div>
          <h3 className="text-3xl font-black text-[#172554] tracking-tight">Features Built For Clear Communication</h3>
          <p className="text-sm text-slate-600 mt-2">
            Everything you need to feel informed and empowered before speaking with your clinician.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div 
                key={feat.title}
                className="glass-card p-6 rounded-3xl flex items-start gap-4 hover:-translate-y-0.5 hover:border-blue-300/90 transition-all duration-300"
              >
                <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-blue-50 to-teal-50 text-blue-700 shrink-0 border border-blue-100 shadow-2xs">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#172554] mb-1">{feat.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-800 to-teal-900 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl shadow-blue-900/15 space-y-6 relative overflow-hidden">
        {/* Subtle decorative glow inside CTA */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-bold border border-white/20 backdrop-blur-md">
            Educational Healthcare Technology
          </span>
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Ready to decode your lab report?
          </h3>
          <p className="text-sm text-blue-100 leading-relaxed max-w-xl mx-auto">
            Test the experience using our instant simulated client demo or choose from realistic clinical panels.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('upload')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-blue-900 hover:bg-blue-50 rounded-2xl font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <Upload className="w-4 h-4 text-blue-700" />
              <span>Upload Report Now</span>
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-900/60 hover:bg-blue-900/80 text-white rounded-2xl font-bold text-sm border border-blue-400/30 transition-all hover:scale-105"
            >
              <span>Learn About Our Mission</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
