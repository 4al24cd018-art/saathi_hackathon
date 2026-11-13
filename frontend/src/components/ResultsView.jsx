import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Printer, 
  Share2, 
  Check, 
  Sparkles, 
  Calendar, 
  Building2, 
  User, 
  HelpCircle, 
  Lightbulb, 
  ShieldAlert, 
  Filter, 
  FileCheck,
  Eye,
  EyeOff,
  Copy
} from 'lucide-react';
import ParameterCard from './ParameterCard';
import DisclaimerBanner from './DisclaimerBanner';

export default function ResultsView({ report, onBack, onNewUpload }) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'attention', 'normal'
  const [copiedQuestions, setCopiedQuestions] = useState(false);
  const [showPIIPreview, setShowPIIPreview] = useState(false);

  if (!report) return null;

  // Gather all tests across categories
  const allTests = report.categories?.flatMap(cat => cat.tests) || [];
  
  // Filter tests based on selected filter
  const filteredCategories = report.categories?.map(cat => {
    const tests = cat.tests.filter(test => {
      if (activeFilter === 'attention') return test.status !== 'normal';
      if (activeFilter === 'normal') return test.status === 'normal';
      return true;
    });
    return { ...cat, tests };
  }).filter(cat => cat.tests.length > 0) || [];

  const attentionCount = allTests.filter(t => t.status !== 'normal').length;
  const normalCount = allTests.filter(t => t.status === 'normal').length;

  const handleCopyQuestions = () => {
    if (!report.questionsForDoctor) return;
    const text = report.questionsForDoctor.map((q, i) => `${i + 1}. ${q}`).join('\n');
    navigator.clipboard?.writeText(text);
    setCopiedQuestions(true);
    setTimeout(() => setCopiedQuestions(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top Action Bar */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-slate-700 hover:bg-slate-50 text-sm font-medium rounded-xl border border-slate-200 shadow-sm transition-colors"
            title="Print or Save as PDF"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
          <button
            onClick={onNewUpload}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-xl shadow-sm transition-all"
          >
            <span>Analyze Another</span>
          </button>
        </div>
      </div>

      {/* Mandatory Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Report Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-teal-50 text-teal-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-teal-200">
                {report.category || 'Clinical Panel'}
              </span>
              {report.isUserUploadedDemo && (
                <span className="bg-blue-50 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-200">
                  Uploaded File Preview
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {report.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{report.reportDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>{report.labName}</span>
              </div>
              {report.patientAgeGender && (
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Demographics: {report.patientAgeGender}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex sm:flex-col gap-2 shrink-0">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center min-w-[120px]">
              <span className="text-xl font-bold text-emerald-600 block">{normalCount}</span>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">In Range</span>
            </div>
            {attentionCount > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center min-w-[120px]">
                <span className="text-xl font-bold text-amber-600 block">{attentionCount}</span>
                <span className="text-[11px] font-medium text-amber-700 uppercase tracking-wider">Out of Range</span>
              </div>
            )}
          </div>
        </div>

        {/* Patient-Friendly Summary Box */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-2 text-slate-900 font-semibold text-base">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Plain-Language Patient Summary</span>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-teal-50/40 p-4 sm:p-5 rounded-xl border border-teal-100">
            {report.summary}
          </p>
        </div>

        {/* Key Findings Bullet List */}
        {report.keyFindings && report.keyFindings.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Key Highlights at a Glance
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700">
              {report.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <FileCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Filter and Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Observed Parameters & Explanations
          </h2>
          <p className="text-xs text-slate-500">
            Click on any test to see what it does in your body and why it matters
          </p>
        </div>

        {/* Filter Pills */}
        <div className="no-print flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Tests ({allTests.length})
          </button>
          <button
            onClick={() => setActiveFilter('attention')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeFilter === 'attention'
                ? 'bg-amber-600 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Out of Range ({attentionCount})
          </button>
          <button
            onClick={() => setActiveFilter('normal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeFilter === 'normal'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Normal ({normalCount})
          </button>
        </div>
      </div>

      {/* Grouped Category Sections */}
      {filteredCategories.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <p className="text-sm text-slate-500">No parameters match the selected filter.</p>
          <button
            onClick={() => setActiveFilter('all')}
            className="mt-2 text-xs font-semibold text-teal-600 hover:text-teal-700"
          >
            Show all parameters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredCategories.map((category, catIdx) => (
            <div key={catIdx} className="space-y-3">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="text-base font-semibold text-slate-900">
                  {category.categoryName}
                </h3>
                {category.description && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    {category.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.tests.map((test, testIdx) => (
                  <ParameterCard key={testIdx} test={test} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Doctor Discussion Guide Card */}
      {report.questionsForDoctor && report.questionsForDoctor.length > 0 && (
        <div className="bg-white rounded-2xl border border-teal-200/80 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Questions for Your Doctor
                </h3>
                <p className="text-xs text-slate-500">
                  Constructive, calm questions to bring to your consultation
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyQuestions}
              className="no-print inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 transition-colors self-start sm:self-auto"
            >
              {copiedQuestions ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied to clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Questions</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {report.questionsForDoctor.map((question, qIdx) => (
              <div 
                key={qIdx}
                className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100"
              >
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  {qIdx + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  "{question}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* General Lifestyle & Nutrition Notes */}
      {report.lifestyleNotes && report.lifestyleNotes.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                General Educational Wellness Notes
              </h3>
              <p className="text-xs text-slate-500">
                Supportive habits to discuss with your healthcare provider
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
            {report.lifestyleNotes.map((note, nIdx) => (
              <div key={nIdx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 leading-relaxed">
                • {note}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Privacy De-identification Demonstration Inspector */}
      <div className="no-print bg-slate-100 rounded-2xl border border-slate-200 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-slate-600" />
            <span className="text-xs font-semibold text-slate-700">
              HIPAA & Privacy Check: Automated PII Redaction
            </span>
          </div>
          <button
            onClick={() => setShowPIIPreview(!showPIIPreview)}
            className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1"
          >
            {showPIIPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showPIIPreview ? 'Hide Redacted Stream' : 'View Redacted Raw Stream'}</span>
          </button>
        </div>

        {showPIIPreview && (
          <div className="mt-3 bg-slate-900 text-emerald-400 font-mono text-[11px] p-4 rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
            <div className="text-slate-400 mb-2">// Demonstrating regex PII redaction (patient identifiers scrubbed):</div>
            <div>[PATIENT HEADER]</div>
            <div>Patient Name: <span className="bg-emerald-950 px-1 text-emerald-200">[REDACTED_NAME]</span></div>
            <div>UHID / Patient ID: <span className="bg-emerald-950 px-1 text-emerald-200">[REDACTED_ID]</span></div>
            <div>Phone: <span className="bg-emerald-950 px-1 text-emerald-200">[REDACTED_PHONE]</span></div>
            <div>Address: <span className="bg-emerald-950 px-1 text-emerald-200">[REDACTED_ADDRESS]</span></div>
            <div className="mt-2">[CLINICAL MEASUREMENTS - PRESERVED]</div>
            <div>Hemoglobin: 11.2 g/dL [Observed] | Ref: 12.0 - 15.5 g/dL</div>
            <div>WBC: 6,900 cells/mcL [Observed] | Ref: 4,500 - 11,000</div>
            <div>Platelets: 250,000 /mcL [Observed] | Ref: 150,000 - 450,000</div>
          </div>
        )}
      </div>
    </div>
  );
}
