import React from 'react';
import { X, Printer, FileText, HelpCircle, AlertTriangle, Calendar, User, ShieldCheck } from 'lucide-react';
import { PatientProfile, LabResult, Medication, Condition } from '../types/medlens';

interface PreVisitPrepModalProps {
  patient: PatientProfile;
  abnormalLabs: LabResult[];
  medications: Medication[];
  conditions: Condition[];
  onClose: () => void;
}

export const PreVisitPrepModal: React.FC<PreVisitPrepModalProps> = ({
  patient,
  abnormalLabs,
  medications,
  conditions,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] shadow-2xl overflow-hidden flex flex-col">
        {/* Header - No Print */}
        <div className="px-6 py-4 bg-slate-800/90 border-b border-slate-700 flex justify-between items-center no-print">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Pre-Visit Appointment Brief & Prep Generator</h2>
              <p className="text-xs text-slate-400">Optimized 1-Page Summary for 15-Minute Physician Visits</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/25"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Export PDF</span>
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable 1-Page Content Container */}
        <div className="p-8 overflow-y-auto space-y-6 text-xs text-slate-300 print-card bg-slate-900">
          {/* Patient Header Brief */}
          <div className="border-b border-slate-700/80 pb-4 flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">{patient.name}</h1>
              <p className="text-slate-400 mt-0.5">
                Age: {patient.age} • Sex: {patient.sex} • Primary MD: {patient.primaryPhysician}
              </p>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30 text-[11px]">
                PRE-VISIT PREPARATION SHEET
              </span>
              <p className="text-[11px] text-slate-400 mt-1">Generated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Top 3 Prioritized Consultation Questions */}
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-3">
            <h3 className="font-bold text-sm text-indigo-300 flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              <span>Top Recommended Questions for Doctor Visit</span>
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-200 leading-relaxed font-medium">
              <li className="pl-1">
                <strong className="text-white">Renal Trajectory & Medications:</strong> "My eGFR dropped to 52 mL/min (Creatinine 1.45). Should we discontinue my OTC Ibuprofen and re-evaluate Lisinopril?"
              </li>
              <li className="pl-1">
                <strong className="text-white">Glycemic & B12 Status:</strong> "My Fasting Glucose rose to 118 mg/dL and HbA1c to 7.1%. Also, my Vitamin B12 dropped to 185 pg/mL on Metformin. Should I begin B12 supplements?"
              </li>
              <li className="pl-1">
                <strong className="text-white">Thyroid Trend & Hereditary Screening:</strong> "My TSH rose 50% from baseline to 4.2 mIU/L. Given my mother and sister have thyroid conditions, should we run an Anti-TPO panel?"
              </li>
            </ol>
          </div>

          {/* Abnormal Lab Results Summary Table */}
          <div>
            <h3 className="font-bold text-xs text-slate-200 mb-2 flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Abnormal Lab Values Requiring Discussion ({abnormalLabs.length})</span>
            </h3>
            <div className="border border-slate-700 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-800 text-slate-400 text-[11px]">
                  <tr>
                    <th className="py-2 px-3 font-semibold">Test Name</th>
                    <th className="py-2 px-3 font-semibold">Recent Value</th>
                    <th className="py-2 px-3 font-semibold">Lab Range</th>
                    <th className="py-2 px-3 font-semibold">Personal Velocity</th>
                    <th className="py-2 px-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200 text-xs">
                  {abnormalLabs.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-800/40">
                      <td className="py-2 px-3 font-bold text-white">{l.testName}</td>
                      <td className="py-2 px-3 font-mono font-semibold">
                        {l.value} {l.unit}
                      </td>
                      <td className="py-2 px-3 text-slate-400">{l.referenceRangeText}</td>
                      <td className="py-2 px-3 text-amber-300 font-medium">{l.velocityChange || 'N/A'}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            l.status === 'HIGH' || l.status === 'CRITICAL'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {l.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Medications & Surveillance Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-800/60 border border-slate-700 rounded-xl space-y-2">
              <h4 className="font-bold text-slate-200 text-xs">Active Medication Regimen</h4>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                {medications.map((m) => (
                  <li key={m.id} className="flex justify-between">
                    <span className="font-semibold text-white">{m.name} ({m.dosage})</span>
                    <span className="text-slate-400">{m.frequency}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 bg-slate-800/60 border border-slate-700 rounded-xl space-y-2">
              <h4 className="font-bold text-rose-300 text-xs">Identified Information & Screening Gaps</h4>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                <li className="flex items-center space-x-1.5 text-rose-300">
                  <span>• Microalbuminuria screening (Urine ACR) overdue (&gt; 14 months)</span>
                </li>
                <li className="flex items-center space-x-1.5 text-amber-300">
                  <span>• Lithium level check overdue (&gt; 10 months)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Disclaimer */}
          <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
            <div className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Generated by MedLens AI Clinical Intelligence. Not a definitive diagnosis.</span>
            </div>
            <span>Page 1 of 1</span>
          </div>
        </div>
      </div>
    </div>
  );
};
