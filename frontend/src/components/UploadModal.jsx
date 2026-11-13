import React, { useState, useRef } from 'react';
import { 
  Upload, 
  X, 
  FileText, 
  Image as ImageIcon, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SAMPLE_REPORTS } from '../data/sampleReports';

export default function UploadModal({ isOpen, onClose, onSelectReport }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStage, setProgressStage] = useState(0);

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const MAX_SIZE_BYTES = 15 * 1024 * 1024; // 15MB
  const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];

  const stages = [
    { title: 'Validating file integrity...', subtitle: 'Checking document format and size requirements' },
    { title: 'Local Privacy De-identification...', subtitle: 'Redacting personal names, phone numbers & patient IDs' },
    { title: 'Structuring Laboratory Parameters...', subtitle: 'Matching values against age/gender reference intervals' },
    { title: 'Formulating Educational Explanations...', subtitle: 'Preparing plain-language translations & doctor questions' },
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (file) => {
    setErrorMessage(null);

    if (!file) return;

    // Check file type
    const isAllowed = ALLOWED_TYPES.includes(file.type) || 
                      file.name.match(/\.(pdf|jpe?g|png|webp)$/i);
    if (!isAllowed) {
      setErrorMessage(`Unsupported file format "${file.name}". Please upload a PDF, JPG, or PNG document.`);
      return;
    }

    // Check size
    if (file.size > MAX_SIZE_BYTES) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setErrorMessage(`File is too large (${sizeMb} MB). Maximum supported file size is 15 MB.`);
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSimulatedProcess = () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setProgressStage(0);

    // Simulate multi-step processing sequence
    const interval = setInterval(() => {
      setProgressStage((prev) => {
        if (prev >= stages.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            // In demo mode, load CBC sample populated with uploaded filename
            const customReport = {
              ...SAMPLE_REPORTS[0],
              title: `${selectedFile.name.replace(/\.[^/.]+$/, "")} (Analyzed Report)`,
              reportDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
              isUserUploadedDemo: true,
              originalFileName: selectedFile.name
            };
            onSelectReport(customReport);
            onClose();
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
  };

  const handleQuickDemo = (sample) => {
    onSelectReport(sample);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Upload Laboratory Report</h3>
              <p className="text-xs text-slate-500">Fast, local educational summary</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Privacy Guarantee Pill */}
          <div className="mb-4 bg-teal-50 border border-teal-200/70 rounded-xl p-3 flex items-start gap-2.5 text-xs text-teal-900">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-teal-950">Patient Privacy First: </span>
              Names, contact info, and patient record numbers are filtered locally.
            </div>
          </div>

          {/* Processing / Loading State */}
          {isProcessing ? (
            <div className="py-8 px-4 text-center space-y-5">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-teal-100 animate-pulse" />
                <div className="w-16 h-16 rounded-full border-4 border-teal-600 border-t-transparent animate-spin flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-teal-600" />
                </div>
              </div>

              <div>
                <h4 className="text-base font-semibold text-slate-900">
                  {stages[progressStage].title}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {stages[progressStage].subtitle}
                </p>
              </div>

              {/* Progress Steps Indicator */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden max-w-sm mx-auto">
                <div 
                  className="bg-teal-600 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${((progressStage + 1) / stages.length) * 100}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400">
                Running in client-side demonstration mode
              </p>
            </div>
          ) : (
            <>
              {/* Dropzone Area */}
              {!selectedFile ? (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    dragActive
                      ? 'border-teal-500 bg-teal-50/50 scale-[0.99]'
                      : 'border-slate-300 hover:border-teal-500 hover:bg-slate-50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg,.webp"
                    onChange={handleFileChange}
                  />
                  <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    Click to select or drag and drop your report
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Accepts PDF, PNG, JPG, or JPEG (up to 15 MB)
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">PDF Documents</span>
                    <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Lab Photo Scans</span>
                  </div>
                </div>
              ) : (
                /* Selected File State */
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                        {selectedFile.type.includes('pdf') ? (
                          <FileText className="w-5 h-5" />
                        ) : (
                          <ImageIcon className="w-5 h-5" />
                        )}
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatFileSize(selectedFile.size)} • Ready for analysis
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white transition-colors"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-end gap-3">
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800"
                    >
                      Choose different file
                    </button>
                    <button
                      onClick={handleSimulatedProcess}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <span>Simulate Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Error Message Box */}
              {errorMessage && (
                <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-xs text-rose-800">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}

              {/* Sample Preload Shortcuts */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                  Or test with realistic clinical panels:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {SAMPLE_REPORTS.map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => handleQuickDemo(sample)}
                      className="text-left p-2.5 rounded-lg border border-slate-200 hover:border-teal-500 hover:bg-teal-50/40 transition-colors group"
                    >
                      <span className="font-semibold text-xs text-slate-800 group-hover:text-teal-700 block truncate">
                        {sample.title.split('(')[0]}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {sample.category} • Demo
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
          Demo Sandbox: Files remain inside your browser and are not uploaded to external servers.
        </div>
      </div>
    </div>
  );
}
