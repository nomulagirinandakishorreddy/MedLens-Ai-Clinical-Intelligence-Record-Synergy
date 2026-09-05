import React from 'react';
import { Microscope, Award, ExternalLink, Download, CheckCircle2 } from 'lucide-react';
import { ClinicalTrialMatch } from '../../types/medlens';

interface ClinicalTrialsTabProps {
  trials: ClinicalTrialMatch[];
}

export const ClinicalTrialsTab: React.FC<ClinicalTrialsTabProps> = ({ trials }) => {
  const handleExportDataPackage = () => {
    alert('Exported anonymized research dataset package (JSON) with patient consent token!');
  };

  return (
    <div className="space-y-6 text-xs text-slate-300">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <Microscope className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Clinical Trial & Research Matching Engine</h2>
            <p className="text-xs text-slate-400">
              Matches patient biomarker levels (eGFR, HbA1c) against active clinical trial eligibility criteria.
            </p>
          </div>
        </div>

        <button
          onClick={handleExportDataPackage}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-600/25"
        >
          <Download className="w-4 h-4" />
          <span>Export Research Package</span>
        </button>
      </div>

      {/* Trial Cards */}
      <div className="space-y-4">
        {trials.map((trial) => (
          <div
            key={trial.id}
            className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-lg hover:border-slate-700 transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-sm">{trial.title}</span>
                  <span className="text-[10px] font-mono text-slate-400">{trial.nctId}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Sponsor: {trial.sponsor} • Facility: {trial.location}
                </p>
              </div>

              <div className="text-right">
                <span className="px-2.5 py-1 rounded text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {trial.matchScore}% Eligibility Match
                </span>
                <p className="text-[10px] text-emerald-400 mt-1">{trial.status}</p>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed">{trial.eligibilitySummary}</p>

            <div className="flex flex-wrap gap-1.5">
              <span className="text-slate-400 text-[11px] self-center">Matching Biomarkers:</span>
              {trial.matchingBiomarkers.map((b, i) => (
                <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  {b}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
