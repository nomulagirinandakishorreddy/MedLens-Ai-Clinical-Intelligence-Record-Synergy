import React from 'react';
import { ShieldCheck, Heart, Activity, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { RiskStratification } from '../../types/medlens';

interface RiskStratificationTabProps {
  risk: RiskStratification;
}

export const RiskStratificationTab: React.FC<RiskStratificationTabProps> = ({ risk }) => {
  return (
    <div className="space-y-6 text-xs text-slate-300">
      {/* Banner with Mandatory Non-Diagnostic Disclaimer */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
            <Heart className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Predictive Risk Stratification (With Guardrails)</h2>
            <p className="text-xs text-slate-400">
              Uses multi-marker machine learning models to identify elevated cardiovascular & metabolic risk categories without diagnosing.
            </p>
          </div>
        </div>

        <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-amber-200 text-[11px] flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Mandatory Safety Guardrail Disclaimer:</strong> Risk scores are statistical estimates for educational and pre-visit planning purposes. This is not a diagnosis—discuss all risk factors with your healthcare team.
          </span>
        </div>
      </div>

      {/* Two Risk Stratification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cardiovascular ASCVD Risk */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-rose-400" />
              <h3 className="font-bold text-white text-sm">10-Year ASCVD Cardiovascular Risk</h3>
            </div>
            <span className="px-2.5 py-1 rounded text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {risk.cardiovascularRisk.scorePercentage}% ({risk.cardiovascularRisk.category})
            </span>
          </div>

          {/* Score Meter */}
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 h-full transition-all"
              style={{ width: `${risk.cardiovascularRisk.scorePercentage}%` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
            <div className="p-3 bg-slate-800/60 border border-slate-700 rounded-xl space-y-1">
              <span className="font-bold text-emerald-400 block">Modifiable Drivers ({risk.cardiovascularRisk.modifiableFactors.length})</span>
              <ul className="space-y-1 text-slate-300">
                {risk.cardiovascularRisk.modifiableFactors.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-slate-800/60 border border-slate-700 rounded-xl space-y-1">
              <span className="font-bold text-slate-400 block">Non-Modifiable Drivers</span>
              <ul className="space-y-1 text-slate-300">
                {risk.cardiovascularRisk.nonModifiableFactors.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Metabolic & Renal Progression Risk */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-sky-400" />
              <h3 className="font-bold text-white text-sm">Metabolic & Renal Trajectory Risk</h3>
            </div>
            <span className="px-2.5 py-1 rounded text-xs font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              {risk.metabolicRisk.scorePercentage}% ({risk.metabolicRisk.category})
            </span>
          </div>

          {/* Score Meter */}
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 h-full transition-all"
              style={{ width: `${risk.metabolicRisk.scorePercentage}%` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
            <div className="p-3 bg-slate-800/60 border border-slate-700 rounded-xl space-y-1">
              <span className="font-bold text-emerald-400 block">Modifiable Drivers ({risk.metabolicRisk.modifiableFactors.length})</span>
              <ul className="space-y-1 text-slate-300">
                {risk.metabolicRisk.modifiableFactors.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-slate-800/60 border border-slate-700 rounded-xl space-y-1">
              <span className="font-bold text-slate-400 block">Non-Modifiable Drivers</span>
              <ul className="space-y-1 text-slate-300">
                {risk.metabolicRisk.nonModifiableFactors.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
