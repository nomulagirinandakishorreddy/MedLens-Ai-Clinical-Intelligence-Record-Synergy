import React from 'react';
import {
  Activity,
  AlertCircle,
  FileText,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Zap,
  ArrowRight,
  Eye,
  CheckCircle2
} from 'lucide-react';
import {
  PatientProfile,
  LabResult,
  CrossValidationAlert,
  DrugLabInteractionAlert,
  MedicalDocument
} from '../../types/medlens';

interface OverviewTabProps {
  patient: PatientProfile;
  labs: LabResult[];
  documents: MedicalDocument[];
  crossValidationAlerts: CrossValidationAlert[];
  drugLabAlerts: DrugLabInteractionAlert[];
  onNavigateTab: (tab: string) => void;
  onOpenDocumentViewer: (docId: string, labId?: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  patient,
  labs,
  documents,
  crossValidationAlerts,
  drugLabAlerts,
  onNavigateTab,
  onOpenDocumentViewer
}) => {
  const abnormalCount = labs.filter((l) => l.status !== 'NORMAL').length;
  const criticalAlertsCount = crossValidationAlerts.filter((a) => a.severity === 'CRITICAL').length;

  return (
    <div className="space-y-6">
      {/* AI Clinical Summary Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/70 via-indigo-950/70 to-slate-900 border border-sky-500/30 shadow-xl relative overflow-hidden">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
            <Sparkles className="w-4 h-4 animate-pulse-subtle" />
          </div>
          <h2 className="text-base font-bold text-white">AI Executive Clinical Record Synergy</h2>
          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
            AI-PROVENANCE TRACKED
          </span>
        </div>

        <p className="text-xs text-slate-200 leading-relaxed max-w-4xl">
          Patient <strong className="text-white">{patient.name}</strong> ({patient.age}y/o {patient.sex}) exhibits a multi-system metabolic and renal trajectory. Across {documents.length} parsed reports, <strong className="text-rose-300">{abnormalCount} abnormal biomarkers</strong> have been flagged. Fasting Glucose (118 mg/dL) and HbA1c (7.1%) indicate sub-optimal glycemic control. Serum Creatinine (1.45 mg/dL) and eGFR (52 mL/min) show a 27.7% downward velocity in renal clearance, compounded by regular OTC Ibuprofen (NSAID) consumption. Vitamin B12 is depleted (185 pg/mL) due to long-term Metformin therapy.
        </p>

        {/* Provenance Legend */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-4 text-[11px] text-slate-400">
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            <span>AI Extracted from Reports ({documents.length} files)</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>User Intake & Physician Verified</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Personal Baseline Learning Active</span>
          </span>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Total Parsed Labs</span>
            <Activity className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-bold text-white">{labs.length}</p>
          <p className="text-[11px] text-slate-400 mt-1">{abnormalCount} values out of range</p>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Cross-Validation Alerts</span>
            <AlertCircle className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl font-bold text-rose-300">{crossValidationAlerts.length}</p>
          <p className="text-[11px] text-rose-400/80 mt-1">{criticalAlertsCount} critical surveillance gap</p>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Drug-Lab Interactions</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-amber-300">{drugLabAlerts.length}</p>
          <p className="text-[11px] text-slate-400 mt-1">NSAID + Metformin B12 flags</p>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Personal Anomaly Baseline</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-300">TSH 4.2</p>
          <p className="text-[11px] text-slate-400 mt-1">High for Eleanor (+50% shift)</p>
        </div>
      </div>

      {/* Two Column Grid: Critical Alerts & Latest Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Critical Synergy Alerts */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>Multi-Document Cross-Validation Summary</span>
            </h3>
            <button
              onClick={() => onNavigateTab('cross-validation')}
              className="text-xs text-sky-400 hover:text-sky-300 flex items-center space-x-1 font-semibold"
            >
              <span>View All Engines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {crossValidationAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-2 text-xs"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-xs">{alert.title}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      alert.severity === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">{alert.description}</p>
                {alert.actionRequired && (
                  <p className="text-[11px] text-sky-300 bg-sky-500/10 p-2 rounded border border-sky-500/20 font-medium">
                    Recommended Action: {alert.actionRequired}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: Source Reports & Explainable Highlighting */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center space-x-2">
            <FileText className="w-4 h-4 text-sky-400" />
            <span>Source Reports & Bounding Box Viewer</span>
          </h3>

          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/40 transition-all space-y-2 text-xs"
              >
                <div className="flex justify-between items-start">
                  <div className="pr-2">
                    <span className="font-bold text-white text-xs block truncate max-w-[220px]">
                      {doc.fileName}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {doc.facility} • {doc.uploadDate}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                    Conf: {doc.overallConfidence}%
                  </span>
                </div>

                <div className="pt-2 flex justify-between items-center border-t border-slate-800/80 text-[11px]">
                  <span className="text-slate-400">{doc.extractedLabCount} extracted items</span>
                  <button
                    onClick={() => onOpenDocumentViewer(doc.id)}
                    className="flex items-center space-x-1 text-sky-400 hover:text-sky-300 font-semibold"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Explainable Highlights</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
