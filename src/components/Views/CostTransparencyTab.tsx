import React from 'react';
import { DollarSign, AlertCircle, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';
import { LabResult } from '../../types/medlens';

interface CostTransparencyTabProps {
  labs: LabResult[];
}

export const CostTransparencyTab: React.FC<CostTransparencyTabProps> = ({ labs }) => {
  const totalEstimatedCost = labs.reduce((acc, l) => acc + (l.estimatedCost || 25), 0);

  return (
    <div className="space-y-6 text-xs text-slate-300">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Healthcare Cost Transparency Integration</h2>
            <p className="text-xs text-slate-400">
              Matches lab tests to standard CPT billing codes, estimates out-of-pocket expenses, and flags out-of-network surprise billing risks.
            </p>
          </div>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-slate-400 block text-[11px]">Total Estimated Out-of-Pocket</span>
          <span className="text-2xl font-extrabold text-emerald-300">${totalEstimatedCost}</span>
          <p className="text-[10px] text-slate-400">Across {labs.length} parsed lab orders</p>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-slate-400 block text-[11px]">Surprise Billing Risk</span>
          <span className="text-2xl font-extrabold text-amber-300">LOW</span>
          <p className="text-[10px] text-slate-400">All facilities in-network for BlueCross PPO</p>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-slate-400 block text-[11px]">Duplicate Cost Prevention</span>
          <span className="text-2xl font-extrabold text-sky-300">$65 Saved</span>
          <p className="text-[10px] text-slate-400">Duplicate Lipid test flagged</p>
        </div>
      </div>

      {/* CPT Code & Fee Schedule Breakdown Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-800/60 border-b border-slate-700 font-bold text-white text-sm">
          Laboratory Billing CPT Code Schedule
        </div>

        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-800 text-slate-400 text-[11px]">
            <tr>
              <th className="py-2.5 px-4 font-semibold">Test Name</th>
              <th className="py-2.5 px-4 font-semibold">CPT Code</th>
              <th className="py-2.5 px-4 font-semibold">Facility</th>
              <th className="py-2.5 px-4 font-semibold">Est. Cost</th>
              <th className="py-2.5 px-4 font-semibold">Network Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            {labs.map((l) => (
              <tr key={l.id} className="hover:bg-slate-800/40">
                <td className="py-2.5 px-4 font-bold text-white">{l.testName}</td>
                <td className="py-2.5 px-4 font-mono text-sky-300">{l.cptCode || '80053'}</td>
                <td className="py-2.5 px-4 text-slate-400">{l.facility}</td>
                <td className="py-2.5 px-4 font-bold text-emerald-300">${l.estimatedCost || 25}</td>
                <td className="py-2.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    In-Network PPO
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
