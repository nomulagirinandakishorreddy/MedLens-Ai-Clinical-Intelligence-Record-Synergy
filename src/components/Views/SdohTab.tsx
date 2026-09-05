import React from 'react';
import { HeartHandshake, Link, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { SdohReferral, PatientProfile } from '../../types/medlens';

interface SdohTabProps {
  sdoh: PatientProfile['sdoh'];
  referrals: SdohReferral[];
}

export const SdohTab: React.FC<SdohTabProps> = ({ sdoh, referrals }) => {
  return (
    <div className="space-y-6 text-xs text-slate-300">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Social Determinants of Health (SDOH) Integration</h2>
            <p className="text-xs text-slate-400">
              Correlates clinical lab anomalies (e.g. Low Vitamin B12 / Iron) with social factors like food security and transportation access.
            </p>
          </div>
        </div>
      </div>

      {/* Patient SDOH Factors Profile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-slate-400 block text-[11px]">Food Security Status</span>
          <span className="text-sm font-bold text-rose-300">{sdoh.foodSecurity} Security</span>
          <p className="text-[10px] text-rose-400/80">Linked to B12 & Iron deficit</p>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-slate-400 block text-[11px]">Housing Stability</span>
          <span className="text-sm font-bold text-emerald-300">{sdoh.housingStability}</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-slate-400 block text-[11px]">Transportation Access</span>
          <span className="text-sm font-bold text-emerald-300">{sdoh.transportationAccess}</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-slate-400 block text-[11px]">Financial Stress</span>
          <span className="text-sm font-bold text-amber-300">{sdoh.financialStress} Stress</span>
        </div>
      </div>

      {/* Recommended Local Social Service Referrals */}
      <div className="space-y-4">
        <h3 className="font-bold text-white text-sm">Automated Community Resource Referrals ({referrals.length})</h3>
        <div className="space-y-3">
          {referrals.map((r) => (
            <div key={r.id} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-lg">
              <div className="flex justify-between items-center">
                <span className="font-bold text-teal-300 text-sm">{r.programName}</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold">
                  {r.category}
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed">{r.description}</p>

              {r.linkedLabFinding && (
                <div className="p-2.5 bg-teal-950/40 border border-teal-500/30 rounded-xl text-teal-200 text-[11px]">
                  <strong>Clinical Correlation:</strong> {r.linkedLabFinding}
                </div>
              )}

              <div className="pt-2 flex justify-between items-center text-[11px] text-slate-400">
                <span>Contact: {r.contactInfo}</span>
                <span>Eligibility: {r.eligibilityCriteria}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
