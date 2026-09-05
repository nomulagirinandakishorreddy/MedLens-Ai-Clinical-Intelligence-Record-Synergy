import React from 'react';
import { TrendingUp, Activity, AlertCircle, Sparkles } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine
} from 'recharts';
import { LabResult } from '../../types/medlens';

interface PersonalBaselineTabProps {
  labs: LabResult[];
}

export const PersonalBaselineTab: React.FC<PersonalBaselineTabProps> = ({ labs }) => {
  // Longitudinal trend dataset for Fasting Glucose & eGFR & TSH
  const trendData = [
    { date: '2025-08', glucose: 98, egfr: 74, tsh: 2.2, creatinine: 0.92 },
    { date: '2026-02', glucose: 108, egfr: 64, tsh: 2.8, creatinine: 1.18 },
    { date: '2026-08', glucose: 118, egfr: 52, tsh: 4.2, creatinine: 1.45 }
  ];

  return (
    <div className="space-y-6 text-xs text-slate-300">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Patient-Specific Reference Range & Velocity Learning</h2>
            <p className="text-xs text-slate-400">
              Learns personal historical baselines (individual mean ± std dev). Alerts on velocity shifts and personal anomalies even when still within standard population reference bounds.
            </p>
          </div>
        </div>
      </div>

      {/* Recharts Graphical Trends Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: TSH Personal Baseline Anomaly */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-white text-sm">TSH Longitudinal Shift vs Population Bounds</h3>
              <p className="text-[11px] text-slate-400">Eleanor's Mean Baseline: 2.7 mIU/L (Std: 0.4)</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              PERSONAL ANOMALY (+50% Shift)
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis domain={[0, 6]} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                {/* Population Ref Range Band: 0.45 to 4.5 */}
                <ReferenceLine y={4.5} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Pop Max 4.5', fill: '#ef4444', fontSize: 10 }} />
                <ReferenceLine y={2.7} stroke="#10b981" label={{ value: 'Personal Mean 2.7', fill: '#10b981', fontSize: 10 }} />
                <Line type="monotone" dataKey="tsh" stroke="#fbbf24" strokeWidth={3} dot={{ r: 6, fill: '#fbbf24' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-amber-300 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
            <strong>Clinical Highlight:</strong> TSH = 4.2 mIU/L is mathematically normal by broad population standards (&lt; 4.5), but represents a +50% jump above Eleanor's personal mean, triggering early thyroiditis surveillance.
          </p>
        </div>

        {/* Chart 2: eGFR & Renal Clearance Velocity Drop */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-white text-sm">eGFR Renal Filtration Velocity Rate</h3>
              <p className="text-[11px] text-slate-400">Rapid -27.7% decline over 12 months</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
              HIGH VELOCITY DROP
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis domain={[30, 90]} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <ReferenceLine y={60} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'CKD Threshold 60', fill: '#ef4444', fontSize: 10 }} />
                <Line type="monotone" dataKey="egfr" stroke="#f43f5e" strokeWidth={3} dot={{ r: 6, fill: '#f43f5e' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-rose-300 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
            <strong>Velocity Alert:</strong> eGFR dropped from 74 → 64 → 52 mL/min. Velocity rate &gt; 5 mL/min/year requires prompt nephrological assessment and NSAID cessation.
          </p>
        </div>
      </div>
    </div>
  );
};
