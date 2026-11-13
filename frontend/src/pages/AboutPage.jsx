import React from 'react';
import { 
  ShieldCheck, 
  Heart, 
  FileText, 
  Sparkles, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Lock,
  GraduationCap,
  Stethoscope,
  Activity
} from 'lucide-react';
import DisclaimerBanner from '../components/DisclaimerBanner';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="space-y-12 animate-fadeIn max-w-4xl mx-auto">
      {/* Disclaimer */}
      <DisclaimerBanner />

      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold shadow-2xs">
          <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
          <span>Educational Health Literacy Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#172554] tracking-tight">
          About ReportSaathi
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Bridging the communication divide between clinical pathology printouts and patient comprehension.
        </p>
      </div>

      {/* Core Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4 hover:-translate-y-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-50 to-teal-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-2xs">
            <Heart className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-[#172554]">Why ReportSaathi Exists</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Laboratory test sheets are written in clinical shorthand for pathologists and doctors. When patients receive 
            their test results via email or diagnostic apps, abbreviations like <em>"MCV 78 fL"</em> or <em>"SGOT 45 U/L"</em> 
            often cause unnecessary anxiety or confusing internet searches.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            ReportSaathi translates this terminology into clear, accessible language, placing each value into visual reference intervals 
            so individuals can participate as proactive partners in their personal healthcare journeys.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4 hover:-translate-y-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-50 to-cyan-50 text-teal-600 flex items-center justify-center border border-teal-100 shadow-2xs">
            <Stethoscope className="w-6 h-6 text-teal-600" />
          </div>
          <h2 className="text-xl font-bold text-[#172554]">Empowering The Doctor-Patient Dialogue</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            ReportSaathi does <strong>not</strong> provide medical diagnoses, treatment plans, or prescriptions. 
            Instead, our primary goal is to help you prepare high-quality, thoughtful questions for your medical doctor.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            By knowing what each test measures beforehand, you can spend consultation time discussing meaningful questions 
            regarding lifestyle habits, potential symptoms, and preventive measures.
          </p>
        </div>
      </div>

      {/* Privacy & Security Guarantees */}
      <section className="bg-gradient-to-br from-blue-900 via-[#172554] to-teal-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-blue-950/20 space-y-6 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2 text-cyan-300">
          <Lock className="w-5 h-5" />
          <h2 className="text-sm font-bold uppercase tracking-wider">Patient Privacy Architecture</h2>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Your Health Data Remains Your Own
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed text-blue-100/90 font-normal">
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15">
            <span className="font-bold text-white block mb-1">Local Sandbox Execution</span>
            <p>
              In demonstration mode, document processing and validation run strictly within your local browser sandbox.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15">
            <span className="font-bold text-white block mb-1">Zero File Storage</span>
            <p>
              No patient records, medical images, or personally identifiable information are uploaded to remote databases.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15">
            <span className="font-bold text-white block mb-1">De-Identification Simulation</span>
            <p>
              Patient names, addresses, phone numbers, and hospital IDs are redacted before report summaries are presented.
            </p>
          </div>
        </div>
      </section>

      {/* Educational Boundaries / Disclaimers */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 space-y-4 border-amber-200/80 bg-amber-50/60">
        <div className="flex items-center gap-2 text-amber-900 font-bold">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h2>Clear Clinical Boundaries & Disclaimers</h2>
        </div>
        <div className="space-y-2 text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
          <p>
            • <strong>No Medical Diagnosis:</strong> ReportSaathi is an educational and literacy aid. It cannot detect diseases, infections, or acute conditions.
          </p>
          <p>
            • <strong>No Treatment Guidance:</strong> ReportSaathi will never prescribe medications, dosage changes, or surgical advice.
          </p>
          <p>
            • <strong>Doctor Consultation Required:</strong> Every laboratory measurement must be reviewed in conjunction with patient symptoms, family history, and physical examination by a licensed medical practitioner.
          </p>
        </div>
      </section>

      {/* Action CTA */}
      <div className="text-center pt-2">
        <button
          onClick={() => onNavigate('upload')}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-sm rounded-2xl shadow-md shadow-blue-600/25 transition-all hover:scale-105 active:scale-95"
        >
          <span>Try ReportSaathi Lab Simulation</span>
        </button>
      </div>
    </div>
  );
}
