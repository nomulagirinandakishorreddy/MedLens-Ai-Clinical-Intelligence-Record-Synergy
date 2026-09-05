import React from 'react';
import { Zap, Pill, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { DrugLabInteractionAlert, Medication } from '../../types/medlens';

interface DrugLabCheckerTabProps {
  alerts: DrugLabInteractionAlert[];
  medications: Medication[];
}

export const DrugLabCheckerTab: React.FC<DrugLabCheckerTabProps> = ({ alerts, medications }) => {
  return (
    <div className="space-y-6 text-xs text-slate-300">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Medication-Lab Interaction Checker</h2>
            <p className="text-xs text-slate-400">
              Connects active prescriptions directly to longitudinal lab trends, flagging side-effects, monitoring gaps, and renal contraindications.
            </p>
          </div>
        </div>
      </div>

      {/* Flagged Interaction Cards */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-lg hover:border-slate-700 transition-all"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Pill className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white text-sm">
                  {alert.medicationName} ↔ {alert.labTestName}
                </span>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                  alert.severity === 'HIGH'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {alert.severity} SEVERITY • {alert.type}
              </span>
            </div>

            <p className="text-slate-200 leading-relaxed">{alert.explanation}</p>

            <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl space-y-1">
              <span className="font-semibold text-amber-300 block">Prescriber Action Recommendation:</span>
              <p className="text-slate-200">{alert.recommendation}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Active Prescription Monitoring Status Matrix */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
        <h3 className="font-bold text-white text-sm">Active Prescription Monitoring Surveillance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {medications.map((m) => (
            <div key={m.id} className="p-3 bg-slate-800/60 border border-slate-700 rounded-xl space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">{m.name} ({m.dosage})</span>
                <span className="text-[10px] text-slate-400">Freq: {m.frequency}</span>
              </div>
              <p className="text-[11px] text-slate-400">Target: {m.purpose}</p>
              {m.monitoringIntervalMonths && (
                <p className="text-[10px] text-sky-300">
                  Required Surveillance Interval: Every {m.monitoringIntervalMonths} months
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
