import React from 'react';
import { 
  Upload, 
  FileText, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  User, 
  Building2, 
  HelpCircle,
  Lightbulb,
  Sparkles,
  Info
} from 'lucide-react';
import { SAMPLE_REPORTS } from '../data/sampleReports';
import DisclaimerBanner from '../components/DisclaimerBanner';

export default function DashboardPage({ onNavigate, onSelectReport }) {
  // Demo statistics clearly labeled as sample data
  const stats = [
    { label: 'Sample Reports', value: '4', sub: 'Demo panels available', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50/80', border: 'border-blue-100' },
    { label: 'Total Biomarkers', value: '15', sub: 'Across 4 clinical panels', icon: Activity, color: 'text-teal-600', bg: 'bg-teal-50/80', border: 'border-teal-100' },
    { label: 'In Healthy Range', value: '11', sub: 'Optimal reference values', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50/80', border: 'border-emerald-100' },
    { label: 'Review / Attention', value: '4', sub: 'Borderline or outside range', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50/80', border: 'border-amber-100' },
  ];

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'normal':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Normal
          </span>
        );
      case 'borderline':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle className="w-3 h-3" /> Borderline
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3 h-3" /> Review Needed
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Disclaimer */}
      <DisclaimerBanner compact={true} />

      {/* Welcome Heading & Upload Action */}
      <div className="bg-gradient-to-r from-blue-900 via-[#172554] to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-950/15 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-bold border border-white/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>ReportSaathi Overview Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome to your Health Literacy Dashboard
            </h1>
            <p className="text-sm text-blue-100/90 leading-relaxed font-normal">
              Explore realistic sample lab panels or simulate parsing your own document to see plain-language interpretations, 
              reference intervals, and physician discussion prompts.
            </p>
          </div>

          <button
            onClick={() => onNavigate('upload')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-blue-50 text-[#172554] font-bold text-sm rounded-2xl shadow-md transition-all self-start md:self-auto shrink-0 hover:scale-105 active:scale-95"
          >
            <Upload className="w-4 h-4 text-blue-600" />
            <span>Upload New Report</span>
          </button>
        </div>
      </div>

      {/* Quick Statistics (Clearly labelled sample data) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#172554]">Lab Literacy Metrics</h2>
            <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-50/80 text-blue-700 px-2 py-0.5 rounded-md border border-blue-200/80">
              DEMO DATA • Local Sandbox
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium">Sample clinical counts</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.label}
                className="glass-card p-5 rounded-3xl hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-600">{item.label}</span>
                  <div className={`p-2.5 rounded-xl ${item.bg} ${item.color} border ${item.border}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-[#172554]">{item.value}</div>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">{item.sub}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Demo Reports */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#172554]">Recent Demo Reports</h2>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-teal-50 text-teal-800 px-2 py-0.5 rounded-full border border-teal-200">
                Fictional Clinical Panels
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Select any preloaded panel to examine how ReportSaathi transforms dense lab tables into clear insights.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_REPORTS.map((report) => (
            <div 
              key={report.id}
              className="glass-card rounded-3xl p-6 hover:-translate-y-1 hover:border-blue-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-blue-50/80 text-blue-700 border border-blue-100">
                    {report.category}
                  </span>
                  {getStatusBadge(report.overallStatus)}
                </div>

                <h3 className="text-base font-bold text-[#172554] group-hover:text-blue-600 transition-colors">
                  {report.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                  {report.summary}
                </p>

                <div className="mt-4 pt-3 border-t border-blue-50 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    {report.reportDate}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <User className="w-3.5 h-3.5 text-blue-500" />
                    {report.patientAgeGender}
                  </span>
                  <span className="flex items-center gap-1 truncate max-w-[150px] font-medium">
                    <Building2 className="w-3.5 h-3.5 text-blue-500" />
                    {report.labName}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-blue-50 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">
                  {report.categories?.reduce((acc, c) => acc + (c.tests?.length || 0), 0) || 4} Parameters Extracted
                </span>
                <button
                  onClick={() => onSelectReport(report)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-50 to-teal-50 hover:from-blue-100 hover:to-teal-100 text-blue-700 text-xs font-bold transition-all hover:scale-105 border border-blue-200/60 shadow-2xs"
                >
                  <span>View Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Helpful Instructions */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-blue-900">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#172554]">Helpful Instructions: How to Read Your Lab Results</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed text-slate-600">
          <div className="bg-white/90 p-4 rounded-2xl border border-blue-100/80 shadow-2xs">
            <span className="font-bold text-[#172554] block mb-1">1. Focus on Trends, Not Single Outliers</span>
            <p>
              A single parameter slightly above or below the reference window does not automatically signify an illness. Doctors evaluate trends over months alongside physical exams.
            </p>
          </div>

          <div className="bg-white/90 p-4 rounded-2xl border border-blue-100/80 shadow-2xs">
            <span className="font-bold text-[#172554] block mb-1">2. Every Laboratory Has Its Own Range</span>
            <p>
              Reference ranges vary based on the analyzer machine, test kit reagents, and patient demographic baselines. Always rely on the reference intervals printed on your specific lab sheet.
            </p>
          </div>

          <div className="bg-white/90 p-4 rounded-2xl border border-blue-100/80 shadow-2xs">
            <span className="font-bold text-[#172554] block mb-1">3. Prepare Your Questions in Advance</span>
            <p>
              Use the "Questions to Ask Your Doctor" section in our report results page to guide your conversation, ask about lifestyle options, and clarify next steps.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
