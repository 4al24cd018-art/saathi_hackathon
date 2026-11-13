import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  RefreshCw,
  FileCheck,
  Info
} from 'lucide-react';
import { 
  validateReportFile, 
  formatBytes, 
  simulateDemoAnalysis 
} from '../services/demoService';
import { SAMPLE_REPORTS } from '../data/sampleReports';
import LoadingOverlay from '../components/LoadingOverlay';
import DisclaimerBanner from '../components/DisclaimerBanner';

export default function UploadPage({ onSelectReport, onNavigate }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processSelectedFile = (file) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!file) return;

    const validation = validateReportFile(file);
    if (!validation.valid) {
      setErrorMessage(validation.error);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setSuccessMessage(`File "${file.name}" (${formatBytes(file.size)}) validated successfully. Ready for local simulated analysis.`);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setErrorMessage(null);
    setSuccessMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setCurrentStageIndex(0);

    try {
      const simulatedResult = await simulateDemoAnalysis(
        selectedFile, 
        (stageIdx) => setCurrentStageIndex(stageIdx)
      );
      setIsLoading(false);
      onSelectReport(simulatedResult);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('An unexpected simulation error occurred. Please try again.');
    }
  };

  const handlePreloadSample = (sample) => {
    onSelectReport(sample);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Disclaimer */}
      <DisclaimerBanner compact={true} />

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold shadow-2xs">
          <Upload className="w-3.5 h-3.5 text-blue-600" />
          <span>Upload Lab Report (Client Simulation)</span>
        </div>
        <h1 className="text-3xl font-black text-[#172554] tracking-tight">
          Translate Your Diagnostic Lab Document
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Upload your blood test, lipid panel, or metabolic screening. ReportSaathi de-identifies your data locally 
          and generates structured, plain-language explanations.
        </p>
      </div>

      {/* Active Loading State */}
      {isLoading ? (
        <LoadingOverlay 
          currentStageIndex={currentStageIndex}
          fileName={selectedFile?.name || 'Selected_Report.pdf'}
          fileSize={formatBytes(selectedFile?.size || 0)}
        />
      ) : (
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
          {/* Status Messages */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50/90 border border-rose-200 text-rose-800 text-xs flex items-start gap-3 animate-fadeIn">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold block">Upload Validation Notice:</span>
                <p className="mt-0.5">{errorMessage}</p>
              </div>
              <button 
                onClick={() => setErrorMessage(null)} 
                className="text-rose-500 hover:text-rose-800 p-1"
                aria-label="Dismiss error"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {successMessage && !errorMessage && (
            <div className="p-4 rounded-2xl bg-teal-50/90 border border-teal-200 text-teal-900 text-xs flex items-start gap-3 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold block">Document Ready:</span>
                <p className="mt-0.5">{successMessage}</p>
              </div>
              <button 
                onClick={() => setSuccessMessage(null)} 
                className="text-teal-700 hover:text-teal-900 p-1"
                aria-label="Dismiss message"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Upload Drop Zone / Empty State */}
          {!selectedFile ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-300 ${
                dragActive
                  ? 'border-blue-500 bg-blue-50/60 scale-[0.99] shadow-inner'
                  : 'border-blue-200 hover:border-blue-400 bg-white/60 hover:bg-white/90'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
              />

              <div className="w-16 h-16 bg-gradient-to-tr from-blue-50 to-teal-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-blue-100">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>

              <h3 className="text-base font-bold text-[#172554] mb-1">
                Drag and drop your lab report here
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                or click to browse documents from your device
              </p>

              {/* Supported format pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-white text-slate-700 font-semibold border border-blue-100 shadow-2xs">
                  PDF Documents
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white text-slate-700 font-semibold border border-blue-100 shadow-2xs">
                  JPG / JPEG
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white text-slate-700 font-semibold border border-blue-100 shadow-2xs">
                  PNG Images
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold border border-blue-200 shadow-2xs">
                  Max: 10 MB
                </span>
              </div>
            </div>
          ) : (
            /* Selected File State */
            <div className="bg-white/90 border border-blue-100 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-100 to-teal-50 text-blue-700 flex items-center justify-center shrink-0 shadow-xs border border-blue-200">
                    {selectedFile.type.includes('pdf') || selectedFile.name.endsWith('.pdf') ? (
                      <FileText className="w-6 h-6 text-blue-600" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-teal-600" />
                    )}
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-bold text-[#172554] truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                      {formatBytes(selectedFile.size)} • File validated successfully
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleRemoveFile}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
                  title="Remove selected file"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Remove File</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto text-xs font-bold text-slate-600 hover:text-[#172554] px-3 py-2 transition-colors"
                >
                  Choose a different file
                </button>

                <button
                  onClick={handleStartAnalysis}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-sm rounded-2xl shadow-md shadow-blue-600/25 transition-all hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Report</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Privacy Note */}
          <div className="bg-white/80 border border-blue-100/90 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-600 shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#172554]">Security & Privacy Assurance:</span>
              <p className="mt-0.5 text-slate-500 leading-relaxed">
                Your medical files never leave your browser sandbox. ReportSaathi is running in client demonstration mode 
                with simulated de-identification. No documents are uploaded or stored.
              </p>
            </div>
          </div>

          {/* Realistic Clinical Preload Shortcuts */}
          <div className="pt-4 border-t border-blue-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Or explore preloaded clinical demo panels:
              </span>
              <span className="text-[10px] text-blue-600 font-bold">1-Click Instant Demo</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {SAMPLE_REPORTS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handlePreloadSample(sample)}
                  className="text-left p-3.5 rounded-2xl border border-blue-100/80 bg-white/70 hover:border-blue-400 hover:bg-white transition-all duration-200 group shadow-2xs"
                >
                  <div className="text-xs font-bold text-[#172554] group-hover:text-blue-600 truncate">
                    {sample.title.split('(')[0]}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                    <span>{sample.category}</span>
                    <span className="text-blue-600 group-hover:translate-x-0.5 transition-transform font-bold">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
