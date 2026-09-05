import React, { useState } from 'react';
import { FileText, Eye, Filter, ShieldCheck, Sparkles, MessageSquare, Plus } from 'lucide-react';
import { LabResult } from '../../types/medlens';

interface LabRecordTabProps {
  labs: LabResult[];
  onOpenDocumentViewer: (docId: string, labId: string) => void;
  onAddComment: (labId: string, text: string) => void;
}

export const LabRecordTab: React.FC<LabRecordTabProps> = ({
  labs,
  onOpenDocumentViewer,
  onAddComment
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [commentInput, setCommentInput] = useState<{ [key: string]: string }>({});

  const categories = ['ALL', 'Metabolic', 'Renal', 'Thyroid', 'Lipid', 'Hematology'];

  const filteredLabs = labs.filter((l) => {
    if (categoryFilter !== 'ALL' && l.category !== categoryFilter) return false;
    if (statusFilter === 'ABNORMAL' && l.status === 'NORMAL') return false;
    if (statusFilter === 'ANOMALY' && !l.isPersonalAnomaly) return false;
    return true;
  });

  const handleSendComment = (labId: string) => {
    const text = commentInput[labId];
    if (!text || !text.trim()) return;
    onAddComment(labId, text);
    setCommentInput({ ...commentInput, [labId]: '' });
  };

  return (
    <div className="space-y-6 text-xs text-slate-300">
      {/* Filters Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-sky-400" />
          <span className="font-bold text-white">Filter Categories:</span>
          <div className="flex space-x-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  categoryFilter === cat
                    ? 'bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-bold text-white">Status Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
          >
            <option value="ALL">All Statuses</option>
            <option value="ABNORMAL">Abnormal Out-of-Range</option>
            <option value="ANOMALY">Personal Baseline Anomalies</option>
          </select>
        </div>
      </div>

      {/* Structured Lab Results Table & Cards */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-800/60 border-b border-slate-700 flex justify-between items-center">
          <h3 className="font-bold text-white text-sm flex items-center space-x-2">
            <FileText className="w-4 h-4 text-sky-400" />
            <span>Structured Patient Medical Record ({filteredLabs.length} Items)</span>
          </h3>
          <span className="text-slate-400 text-[11px]">Click any item to view source highlighting</span>
        </div>

        <div className="divide-y divide-slate-800">
          {filteredLabs.map((lab) => (
            <div key={lab.id} className="p-4 hover:bg-slate-800/40 transition-all space-y-3">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">{lab.testName}</span>
                    {lab.loincCode && (
                      <span className="text-[10px] text-slate-500 font-mono">LOINC: {lab.loincCode}</span>
                    )}
                    {lab.isPersonalAnomaly && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                        Personal Baseline Anomaly
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Tested: {lab.testDate} • Facility: {lab.facility} • Category: {lab.category}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Numeric Value & Units */}
                  <div className="text-right">
                    <span className="text-base font-extrabold text-white">
                      {lab.value} <span className="text-xs font-normal text-slate-400">{lab.unit}</span>
                    </span>
                    <p className="text-[11px] text-slate-400">Ref: {lab.referenceRangeText}</p>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      lab.status === 'HIGH' || lab.status === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : lab.status === 'LOW'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {lab.status}
                  </span>

                  {/* Source Highlighting Button */}
                  <button
                    onClick={() => onOpenDocumentViewer(lab.documentId, lab.id)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30 text-xs font-semibold transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </button>
                </div>
              </div>

              {/* Velocity Change Banner if available */}
              {lab.velocityChange && (
                <div className="text-[11px] text-amber-300 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20 inline-block font-medium">
                  Trajectory Velocity: {lab.velocityChange}
                </div>
              )}

              {/* Line-item Comments Thread (Feature #13 Collaborative Care Circle) */}
              <div className="pt-2 border-t border-slate-800/60 space-y-2">
                {lab.comments && lab.comments.length > 0 && (
                  <div className="space-y-1.5">
                    {lab.comments.map((c) => (
                      <div key={c.id} className="p-2 bg-slate-950/60 rounded-lg text-[11px] flex justify-between">
                        <div>
                          <strong className="text-sky-300">{c.authorName} ({c.authorRole}): </strong>
                          <span className="text-slate-200">{c.text}</span>
                        </div>
                        <span className="text-slate-500 text-[10px] ml-2">{c.timestamp}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Add clinical note or care circle annotation..."
                    value={commentInput[lab.id] || ''}
                    onChange={(e) => setCommentInput({ ...commentInput, [lab.id]: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendComment(lab.id)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                  <button
                    onClick={() => handleSendComment(lab.id)}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-semibold"
                  >
                    Annotate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
