import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Printer, 
  Share2, 
  Download, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Calendar, 
  User, 
  Building2, 
  Copy, 
  Check, 
  FileText,
  Sparkles,
  Info
} from 'lucide-react';
import ParameterCard from '../components/ParameterCard';
import DisclaimerBanner from '../components/DisclaimerBanner';

export default function ResultsPage({ report, onBack, onNavigateUpload }) {
  const [filter, setFilter] = useState('all'); // all, attention, normal
  const [copiedQuestionIdx, setCopiedQuestionIdx] = useState(null);

  if (!report) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-[#172554]">No report selected</h2>
        <p className="text-sm text-slate-500">Please choose or upload a lab report to view the analysis.</p>
        <button
          onClick={onBack}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-sm"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Flatten tests to allow filtering
  const allTests = report.categories?.flatMap((c) => c.tests) || [];
  const normalTests = allTests.filter((t) => t.status?.toLowerCase() === 'normal');
  const attentionTests = allTests.filter((t) => t.status?.toLowerCase() !== 'normal');

  const displayedTests = 
    filter === 'attention' ? attentionTests :
    filter === 'normal' ? normalTests :
    allTests;

  const handleCopyQuestion = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedQuestionIdx(idx);
    setTimeout(() => setCopiedQuestionIdx(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Top Navigation & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#172554] transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4 text-blue-600" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200 shadow-2xs">
            DEMO DATA • EDUCATIONAL USE ONLY
          </span>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-blue-200/90 bg-white/90 hover:bg-white text-[#172554] text-xs font-bold shadow-2xs transition-all hover:scale-105"
            title="Print or Save PDF"
          >
            <Printer className="w-3.5 h-3.5 text-blue-600" />
            <span>Print Report</span>
          </button>
          <button
            onClick={onNavigateUpload}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-xs font-bold shadow-xs transition-all hover:scale-105"
          >
            <span>Analyze Another</span>
          </button>
        </div>
      </div>

      {/* Prominent Educational Disclaimer */}
      <DisclaimerBanner />

      {/* Main Report Header Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-blue-100">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                {report.category || 'Clinical Panel'}
              </span>
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-white text-slate-600 border border-blue-100">
                Fictional Clinical Dataset
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#172554] tracking-tight">
              {report.title}
            </h1>
          </div>

          <div className="shrink-0">
            {report.overallStatus === 'normal' ? (
              <div className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Overall: In Healthy Range</span>
              </div>
            ) : (
              <div className="px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-2 shadow-2xs">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Overall: Review & Discuss with Doctor</span>
              </div>
            )}
          </div>
        </div>

        {/* Demographics & Metadata Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/70 border border-blue-100 text-xs text-slate-600">
          <div>
            <span className="text-[11px] text-slate-400 block font-bold">Patient Demographic</span>
            <div className="font-bold text-[#172554] mt-0.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-500" />
              <span>{report.patientAgeGender || 'Demographics De-identified'}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 block font-bold">Date of Specimen</span>
            <div className="font-bold text-[#172554] mt-0.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-500" />
              <span>{report.reportDate || 'Recent'}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 block font-bold">Testing Facility</span>
            <div className="font-bold text-[#172554] mt-0.5 flex items-center gap-1.5 truncate">
              <Building2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="truncate">{report.labName || 'Standard Lab'}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 block font-bold">Report Source</span>
            <div className="font-bold text-[#172554] mt-0.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              <span>{report.uploadedFileName ? 'Uploaded Document' : 'Preloaded Sample'}</span>
            </div>
          </div>
        </div>

        {/* Plain-Language High-Level Overview */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-teal-50/80 border border-blue-100 text-[#172554] space-y-2">
          <div className="flex items-center gap-2 font-black text-sm text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Plain-Language Report Summary</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
            {report.summary}
          </p>
        </div>

        {/* Key Findings List */}
        {report.keyFindings && report.keyFindings.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Key Educational Observations:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {report.keyFindings.map((finding, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/90 border border-blue-100 text-xs text-slate-700 flex items-start gap-2 shadow-2xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0" />
                  <span>{finding}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Extracted Biomarkers Section */}
      <section className="space-y-4">
        {/* Filter Controls Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#172554]">Extracted Laboratory Values</h2>
            <p className="text-xs text-slate-500 font-medium">Values matched against standard reference intervals with plain explanations.</p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-white/80 border border-blue-100 rounded-2xl self-start sm:self-auto text-xs font-bold shadow-2xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filter === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-[#172554]'
              }`}
            >
              All Biomarkers ({allTests.length})
            </button>
            <button
              onClick={() => setFilter('attention')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filter === 'attention' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-[#172554]'
              }`}
            >
              Outside Range ({attentionTests.length})
            </button>
            <button
              onClick={() => setFilter('normal')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filter === 'normal' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-[#172554]'
              }`}
            >
              Normal ({normalTests.length})
            </button>
          </div>
        </div>

        {/* Tests Grid */}
        {displayedTests.length === 0 ? (
          <div className="glass-card rounded-3xl p-8 text-center text-xs text-slate-500 font-medium">
            No biomarkers match the selected filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedTests.map((test, idx) => (
              <ParameterCard key={idx} test={test} />
            ))}
          </div>
        )}
      </section>

      {/* Questions to Ask Your Doctor */}
      {report.questionsForDoctor && report.questionsForDoctor.length > 0 && (
        <section className="glass-card rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#172554]">Questions to Ask Your Doctor</h3>
                <p className="text-xs text-slate-500 font-medium">Prepared prompts to empower your clinical dialogue.</p>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-600">Click to copy</span>
          </div>

          <div className="space-y-2.5">
            {report.questionsForDoctor.map((question, idx) => {
              const isCopied = copiedQuestionIdx === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => handleCopyQuestion(question, idx)}
                  className="p-4 rounded-2xl border border-blue-100/90 hover:border-blue-300 bg-white/70 hover:bg-white transition-all flex items-start justify-between gap-3 cursor-pointer group shadow-2xs"
                  title="Click to copy question"
                >
                  <p className="text-xs sm:text-sm text-slate-700 group-hover:text-[#172554] leading-relaxed font-medium">
                    "{question}"
                  </p>
                  <button 
                    className="p-1.5 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0 rounded-lg hover:bg-blue-50"
                    aria-label="Copy to clipboard"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Educational Lifestyle & Wellness Context */}
      {report.lifestyleNotes && report.lifestyleNotes.length > 0 && (
        <section className="glass-card rounded-3xl p-6 sm:p-8 space-y-3">
          <h3 className="text-sm font-bold text-[#172554] flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600" />
            <span>General Lifestyle & Nutrition Information (Non-Prescriptive)</span>
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-slate-600 font-medium">
            {report.lifestyleNotes.map((note, idx) => (
              <li key={idx} className="p-3.5 rounded-2xl bg-white/80 border border-blue-100 flex items-start gap-2.5 shadow-2xs">
                <span className="text-blue-600 font-black">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
