import React, { useState } from 'react';
import { X, FileText, Eye, AlertCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { MedicalDocument, LabResult } from '../types/medlens';

interface DocumentViewerModalProps {
  document: MedicalDocument;
  labs: LabResult[];
  activeLabId?: string;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document,
  labs,
  activeLabId,
  onClose
}) => {
  const [selectedLabId, setSelectedLabId] = useState<string | undefined>(activeLabId || labs[0]?.id);

  const selectedLab = labs.find((l) => l.id === selectedLabId) || labs[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-6xl w-full h-[90vh] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-800/90 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white truncate max-w-md">{document.fileName}</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  OCR Confidence: {document.overallConfidence}%
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Facility: {document.facility} • Date: {document.uploadDate}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Side-by-Side Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Column: Simulated PDF / Bounding Box Highlighting View */}
          <div className="lg:col-span-7 bg-slate-950 p-6 overflow-y-auto border-r border-slate-800 relative">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-slate-200">Source Document Layout & OCR Confidence Heatmap</span>
              <div className="flex items-center space-x-3 text-[11px]">
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span>High (≥90%)</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  <span>Medium (70-89%)</span>
                </span>
              </div>
            </div>

            {/* Document Render Canvas */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 font-mono text-xs text-slate-300 leading-relaxed relative min-h-[500px]">
              <pre className="whitespace-pre-wrap font-sans text-xs text-slate-300 leading-6">
                {document.rawText}
              </pre>

              {/* Bounding Box Highlight Overlay */}
              {selectedLab && (
                <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500/60 text-amber-200 relative animate-pulse-subtle">
                  <div className="flex justify-between items-center mb-1 font-sans">
                    <span className="text-xs font-bold flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Active Extraction Provenance Focus:</span>
                    </span>
                    <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded font-mono font-bold">
                      Match Confidence: {selectedLab.confidenceScore}%
                    </span>
                  </div>
                  <p className="font-mono text-xs text-white bg-slate-950/70 p-2 rounded border border-amber-500/30">
                    "{selectedLab.sourceLocation.snippet}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Structured Extracted Lab Results */}
          <div className="lg:col-span-5 bg-slate-900 p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-sky-400" />
                <span>Extracted Lab Items ({labs.length})</span>
              </h3>

              <div className="space-y-3">
                {labs.map((lab) => {
                  const isSelected = lab.id === selectedLabId;
                  return (
                    <div
                      key={lab.id}
                      onClick={() => setSelectedLabId(lab.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-sky-500/15 border-sky-500 shadow-md shadow-sky-500/10'
                          : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-white text-xs">{lab.testName}</span>
                          <p className="text-[11px] text-slate-400">Ref: {lab.referenceRangeText}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-extrabold text-white">
                            {lab.value} <span className="text-xs font-normal text-slate-400">{lab.unit}</span>
                          </span>
                          <div className="mt-1">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                lab.status === 'HIGH' || lab.status === 'CRITICAL'
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                  : lab.status === 'LOW'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              }`}
                            >
                              {lab.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Ambiguity Resolver if alternative interpretations exist */}
                      {isSelected && lab.alternativeReadings && lab.alternativeReadings.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-700/60 bg-slate-950/60 p-2.5 rounded-lg space-y-1.5">
                          <span className="text-[11px] font-bold text-amber-300 flex items-center space-x-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>OCR Ambiguity Inspector:</span>
                          </span>
                          {lab.alternativeReadings.map((alt, idx) => (
                            <div key={idx} className="flex justify-between items-center text-[11px]">
                              <span className="text-white font-mono">{alt.value}</span>
                              <span className="text-slate-400">Conf: {alt.confidence}% ({alt.reasoning})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Provenance Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800 text-slate-400 text-[11px] flex justify-between items-center">
              <span className="flex items-center space-x-1 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Source Provenance: {selectedLab?.provenance}</span>
              </span>
              <button onClick={onClose} className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium">
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
