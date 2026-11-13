import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight, 
  ChevronDown, 
  ChevronUp, 
  Info,
  Activity
} from 'lucide-react';

export default function ParameterCard({ test }) {
  const [expanded, setExpanded] = useState(false);

  // Status mapping - ensuring Normal, High, and Low are explicitly labeled
  const getStatusBadge = (status) => {
    const s = status?.toLowerCase() || '';
    if (s === 'normal') {
      return {
        label: 'Normal',
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500',
        icon: CheckCircle2,
        textColor: 'text-emerald-700',
        barColor: 'bg-emerald-500'
      };
    } else if (s === 'low' || s === 'below') {
      return {
        label: 'Low',
        bg: 'bg-sky-50 text-sky-800 border-sky-200',
        dot: 'bg-sky-500',
        icon: ArrowDownRight,
        textColor: 'text-sky-700',
        barColor: 'bg-sky-500'
      };
    } else if (s === 'high' || s === 'above') {
      return {
        label: 'High',
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
        icon: ArrowUpRight,
        textColor: 'text-amber-700',
        barColor: 'bg-amber-500'
      };
    } else {
      return {
        label: 'Attention',
        bg: 'bg-rose-50 text-rose-800 border-rose-200',
        dot: 'bg-rose-500',
        icon: AlertCircle,
        textColor: 'text-rose-700',
        barColor: 'bg-rose-500'
      };
    }
  };

  const badge = getStatusBadge(test.status);
  const StatusIcon = badge.icon;

  // Calculate position percentage for visual range meter if numbers exist
  const hasRangeNumbers = test.minVal !== undefined && test.maxVal !== undefined && test.numVal !== undefined;
  let percentPos = 50;
  let refMinPercent = 25;
  let refMaxPercent = 75;

  if (hasRangeNumbers) {
    const rangeSpan = test.maxVal - test.minVal;
    if (rangeSpan > 0) {
      percentPos = Math.min(100, Math.max(0, ((test.numVal - test.minVal) / rangeSpan) * 100));
      if (test.refMin !== undefined && test.refMax !== undefined) {
        refMinPercent = Math.min(100, Math.max(0, ((test.refMin - test.minVal) / rangeSpan) * 100));
        refMaxPercent = Math.min(100, Math.max(0, ((test.refMax - test.minVal) / rangeSpan) * 100));
      }
    }
  }

  return (
    <div className="glass-card rounded-3xl overflow-hidden hover:-translate-y-0.5 hover:border-blue-300">
      <div className="p-5 sm:p-6">
        {/* Top Header: Name and Status Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-base font-bold text-[#172554] tracking-tight">
              {test.name}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Reference Range: <span className="font-semibold text-slate-700">{test.referenceRange || 'Standard Lab Zone'}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span 
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${badge.bg} shadow-2xs`}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              <span>{badge.label}</span>
            </span>
          </div>
        </div>

        {/* Value and Measurement Bar */}
        <div className="mt-4 pt-3 border-t border-blue-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#172554]">
              {test.value}
            </span>
            {test.unit && (
              <span className="text-sm font-semibold text-slate-500">
                {test.unit}
              </span>
            )}
          </div>

          {/* Visual Range Indicator Bar */}
          {hasRangeNumbers && (
            <div className="flex-1 max-w-xs md:max-w-sm">
              <div className="flex justify-between text-[10px] text-slate-400 font-bold mb-1">
                <span>Min ({test.minVal})</span>
                <span className="text-blue-700 font-extrabold">Standard ({test.refMin} - {test.refMax})</span>
                <span>Max ({test.maxVal})</span>
              </div>
              <div className="relative h-2.5 bg-blue-50/80 rounded-full overflow-hidden border border-blue-200/80">
                {/* Target Normal Zone */}
                <div 
                  className="absolute top-0 bottom-0 bg-blue-100 border-x border-blue-300"
                  style={{
                    left: `${refMinPercent}%`,
                    width: `${Math.max(4, refMaxPercent - refMinPercent)}%`
                  }}
                  title="Target Reference Range"
                />
                {/* Observed Value Indicator Marker */}
                <div 
                  className={`absolute top-0 bottom-0 w-2.5 rounded-full shadow-sm -ml-1 transition-all ${
                    test.status === 'normal' 
                      ? 'bg-emerald-600 ring-2 ring-emerald-200' 
                      : test.status === 'low'
                      ? 'bg-sky-600 ring-2 ring-sky-200'
                      : 'bg-amber-600 ring-2 ring-amber-200'
                  }`}
                  style={{ left: `${percentPos}%` }}
                  title={`Your Value: ${test.value} ${test.unit}`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Quick Summary Pill */}
        <div className="mt-3.5 bg-white/80 p-3 rounded-2xl border border-blue-100/80 flex items-start gap-2 shadow-2xs">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            {test.summary}
          </p>
        </div>

        {/* Expandable Plain-Language Explanation */}
        <div className="mt-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between text-xs font-bold text-blue-700 hover:text-blue-800 pt-2 transition-colors focus:outline-none"
            aria-expanded={expanded}
          >
            <span>{expanded ? 'Hide plain-language guide' : 'Explain this in plain language'}</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {expanded && (
            <div className="mt-3 pt-3 border-t border-blue-50 space-y-2.5 text-xs text-slate-600 animate-fadeIn">
              <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100">
                <span className="font-bold text-[#172554] block mb-1">
                  What does this biomarker do in your body?
                </span>
                <p className="leading-relaxed text-slate-700">
                  {test.whatItMeans}
                </p>
              </div>

              {test.clinicalRelevance && (
                <div className="p-3.5 bg-white/90 rounded-2xl border border-blue-100">
                  <span className="font-bold text-[#172554] block mb-1">
                    Why does your doctor monitor this test?
                  </span>
                  <p className="leading-relaxed text-slate-600">
                    {test.clinicalRelevance}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
