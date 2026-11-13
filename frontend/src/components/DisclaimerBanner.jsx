import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, X, Info } from 'lucide-react';

export default function DisclaimerBanner({ compact = false }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed && compact) return null;

  return (
    <div 
      role="alert" 
      aria-label="Educational Disclaimer"
      className="bg-amber-50/90 border-y sm:border sm:rounded-xl border-amber-200 p-4 transition-all shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-start gap-3">
        <div className="p-1.5 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="flex-1 text-sm text-amber-900 leading-relaxed">
          <div className="font-semibold text-amber-950 flex flex-wrap items-center gap-2">
            <span>Educational Notice & Medical Disclaimer</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-200/90 text-amber-900">
              DEMO DATA ONLY • NOT A DIAGNOSIS
            </span>
          </div>
          <p className="mt-1 text-amber-900/90 text-xs sm:text-sm">
            <strong>ReportSaathi</strong> translates complex diagnostic laboratory parameters into plain, understandable language 
            for <strong>educational and informational purposes only</strong>. It is not an automated medical diagnosis, does not prescribe 
            treatments or medication, and does not claim to replace evaluation by a licensed physician or healthcare specialist. 
            Always consult your personal physician before making any healthcare decisions.
          </p>
        </div>
        {compact && (
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-amber-700 hover:text-amber-950 rounded hover:bg-amber-100 transition-colors"
            title="Dismiss notice"
            aria-label="Dismiss notice"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
