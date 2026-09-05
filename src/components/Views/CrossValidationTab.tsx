import React from 'react';
import { AlertCircle, ShieldAlert, Copy, FileSearch, CheckCircle2 } from 'lucide-react';
import { CrossValidationAlert } from '../../types/medlens';

interface CrossValidationTabProps {
  alerts: CrossValidationAlert[];
  onOpenDocumentViewer: (docId: string) => void;
}

export const CrossValidationTab: React.FC<CrossValidationTabProps> = ({
  alerts,
  onOpenDocumentViewer
}) => {
  return (
    <div className="space-y-6 text-xs text-slate-300">
      {/* Engine Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Multi-Document Cross-Validation Engine</h2>
            <p className="text-xs text-slate-400">
              Cross-references values across multiple reports to detect inconsistencies, conflicting diagnoses, duplicate tests, and missing standard surveillance.
            </p>
          </div>
        </div>
      </div>

      {/* Alerts Matrix Cards */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-lg hover:border-slate-700 transition-all"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    alert.severity === 'CRITICAL' ? 'bg-rose-500 animate-ping' : 'bg-amber-500'
                  }`}
                />
                <span className="font-bold text-white text-sm">{alert.title}</span>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                  alert.severity === 'CRITICAL'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : alert.severity === 'WARNING'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                }`}
              >
                {alert.severity} • {alert.type}
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed">{alert.description}</p>

            {alert.actionRequired && (
              <div className="p-3 bg-sky-950/40 border border-sky-500/30 rounded-xl space-y-1">
                <span className="font-semibold text-sky-300 block">Required Action / Clinical Protocol:</span>
                <p className="text-slate-200">{alert.actionRequired}</p>
              </div>
            )}

            {alert.affectedDocuments && alert.affectedDocuments.length > 0 && (
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                <span>Affected Documents: {alert.affectedDocuments.join(', ')}</span>
                <button
                  onClick={() => onOpenDocumentViewer(alert.affectedDocuments![0])}
                  className="flex items-center space-x-1 text-sky-400 hover:text-sky-300 font-semibold"
                >
                  <FileSearch className="w-3.5 h-3.5" />
                  <span>Inspect Source Document</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
