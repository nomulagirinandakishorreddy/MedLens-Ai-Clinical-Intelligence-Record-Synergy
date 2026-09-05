import React from 'react';
import { Users, GitBranch, AlertCircle, Sparkles, Heart } from 'lucide-react';
import { FamilyMemberRecord, FamilyPatternAlert } from '../../types/medlens';

interface FamilyPedigreeTabProps {
  members: FamilyMemberRecord[];
  alerts: FamilyPatternAlert[];
}

export const FamilyPedigreeTab: React.FC<FamilyPedigreeTabProps> = ({ members, alerts }) => {
  return (
    <div className="space-y-6 text-xs text-slate-300">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Family Health Pattern Detection & Pedigree Tree</h2>
            <p className="text-xs text-slate-400">
              Cross-analyzes uploaded records from consenting family members to flag hereditary patterns and shared environmental risks.
            </p>
          </div>
        </div>
      </div>

      {/* Hereditary Pattern Alerts */}
      <div className="space-y-3">
        <h3 className="font-bold text-white text-sm">Detected Familial Health Patterns ({alerts.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts.map((a) => (
            <div key={a.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 shadow-lg">
              <div className="flex justify-between items-center">
                <span className="font-bold text-purple-300 text-xs">{a.patternName}</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                  {a.affectedMembersCount} Relatives Affected
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">{a.description}</p>
              <div className="p-2 bg-purple-950/40 border border-purple-500/20 rounded-lg text-purple-200 text-[11px]">
                <strong>Genomic Strategy:</strong> {a.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Family Pedigree Tree Visualization */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
        <h3 className="font-bold text-white text-sm flex items-center space-x-2">
          <Users className="w-4 h-4 text-purple-400" />
          <span>Interactive Family Pedigree Graph</span>
        </h3>

        {/* Visual Pedigree Nodes */}
        <div className="flex flex-col items-center space-y-6 py-4">
          {/* Generation 1: Parents */}
          <div className="flex space-x-12">
            {members
              .filter((m) => m.relation === 'Father' || m.relation === 'Mother')
              .map((m) => (
                <div key={m.id} className="p-4 bg-slate-800/80 border border-slate-700 rounded-xl text-center w-48 space-y-1">
                  <div className="w-10 h-10 mx-auto rounded-full bg-purple-600/30 text-purple-300 flex items-center justify-center font-bold text-xs border border-purple-500/40">
                    {m.relation[0]}
                  </div>
                  <h4 className="font-bold text-white text-xs">{m.name} ({m.relation})</h4>
                  <p className="text-[10px] text-slate-400">Age: {m.age}</p>
                  <div className="pt-1 border-t border-slate-700 flex flex-wrap gap-1 justify-center">
                    {m.conditions.map((c, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded text-[9px] bg-rose-500/20 text-rose-300">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          {/* Connection Line */}
          <div className="w-0.5 h-6 bg-slate-700" />

          {/* Generation 2: Patient & Siblings */}
          <div className="flex space-x-12">
            {/* Patient Node */}
            <div className="p-4 bg-sky-950/60 border-2 border-sky-500 rounded-xl text-center w-52 space-y-1 shadow-lg shadow-sky-500/10">
              <div className="w-10 h-10 mx-auto rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xs">
                SELF
              </div>
              <h4 className="font-bold text-white text-xs">Eleanor Vance (Patient)</h4>
              <p className="text-[10px] text-sky-300">Target Proband</p>
              <div className="pt-1 border-t border-slate-700 flex flex-wrap gap-1 justify-center">
                <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-500/20 text-amber-300">TSH Shift 4.2</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] bg-rose-500/20 text-rose-300">T2D</span>
              </div>
            </div>

            {/* Sibling Node */}
            {members
              .filter((m) => m.relation === 'Sister' || m.relation === 'Brother')
              .map((m) => (
                <div key={m.id} className="p-4 bg-slate-800/80 border border-slate-700 rounded-xl text-center w-48 space-y-1">
                  <div className="w-10 h-10 mx-auto rounded-full bg-purple-600/30 text-purple-300 flex items-center justify-center font-bold text-xs border border-purple-500/40">
                    {m.relation[0]}
                  </div>
                  <h4 className="font-bold text-white text-xs">{m.name} ({m.relation})</h4>
                  <p className="text-[10px] text-slate-400">Age: {m.age}</p>
                  <div className="pt-1 border-t border-slate-700 flex flex-wrap gap-1 justify-center">
                    {m.conditions.map((c, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded text-[9px] bg-purple-500/20 text-purple-300">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
