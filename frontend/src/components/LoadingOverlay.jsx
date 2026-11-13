import React from 'react';
import { Sparkles, ShieldCheck, Activity, CheckCircle2 } from 'lucide-react';
import { DEMO_PROCESSING_STAGES } from '../services/demoService';

export default function LoadingOverlay({ 
  currentStageIndex = 0, 
  fileName = 'Lab_Report_Scan.pdf', 
  fileSize = '1.2 MB' 
}) {
  const currentStage = DEMO_PROCESSING_STAGES[currentStageIndex] || DEMO_PROCESSING_STAGES[0];
  const progressPercent = Math.round(((currentStageIndex + 1) / DEMO_PROCESSING_STAGES.length) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-8 max-w-xl mx-auto my-8 animate-fadeIn text-center">
      {/* Animated Graphic */}
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-teal-100 animate-ping opacity-60" />
        <div className="w-20 h-20 rounded-full border-4 border-teal-600 border-t-transparent animate-spin flex items-center justify-center bg-teal-50/50">
          <Activity className="w-8 h-8 text-teal-600 animate-pulse" />
        </div>
      </div>

      {/* Target Document Info */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium mb-4">
        <span>Processing Document:</span>
        <span className="font-semibold text-slate-900 truncate max-w-[200px]">{fileName}</span>
        <span>({fileSize})</span>
      </div>

      {/* Primary Message */}
      <h3 className="text-xl font-bold text-slate-900 mb-1">
        {currentStage.title}
      </h3>
      <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
        {currentStage.description}
      </p>

      {/* Multi-step Visual Progress Bar */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-xs font-semibold text-slate-600">
          <span>Simulation Progress</span>
          <span className="text-teal-600">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div 
            className="bg-gradient-to-r from-teal-500 to-cyan-500 h-full rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Stage Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left mb-6">
        {DEMO_PROCESSING_STAGES.map((stg, idx) => {
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          return (
            <div 
              key={stg.step}
              className={`p-2.5 rounded-lg border text-xs flex items-center gap-2 transition-colors ${
                isDone 
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
                  : isCurrent 
                  ? 'bg-teal-50 border-teal-300 text-teal-950 font-semibold shadow-xs' 
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <span className="w-4 h-4 rounded-full border-2 border-teal-600 border-t-transparent animate-spin shrink-0" />
              ) : (
                <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] shrink-0">
                  {stg.step}
                </span>
              )}
              <span className="truncate">{stg.title}</span>
            </div>
          );
        })}
      </div>

      {/* Compliance / Restriction Banner */}
      <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-xs text-sky-900 flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
        <p>
          <strong>Demonstration Sandbox:</strong> Simulating client parsing locally. Real AI analysis is not running.
        </p>
      </div>
    </div>
  );
}
