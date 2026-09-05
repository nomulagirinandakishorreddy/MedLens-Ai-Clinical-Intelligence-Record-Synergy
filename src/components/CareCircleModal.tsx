import React, { useState } from 'react';
import { X, Users, ShieldCheck, Clock, Plus, Link, Mail } from 'lucide-react';
import { CareCircleShare } from '../types/medlens';

interface CareCircleModalProps {
  shares: CareCircleShare[];
  onClose: () => void;
  onAddShare: (newShare: CareCircleShare) => void;
}

export const CareCircleModal: React.FC<CareCircleModalProps> = ({
  shares,
  onClose,
  onAddShare
}) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Endocrinologist');
  const [days, setDays] = useState(30);

  const handleCreateShare = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const newShare: CareCircleShare = {
      id: `share-${Date.now()}`,
      recipientEmail: email,
      recipientRole: role,
      grantedDate: new Date().toISOString().split('T')[0],
      expiresInDays: days,
      accessibleCategories: ['Metabolic', 'Lipid', 'Renal'],
      accessLink: `https://medlens.health/share/token-${Math.floor(Math.random() * 900000 + 100000)}`
    };

    onAddShare(newShare);
    setEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-800/90 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Collaborative Care Circle & Time-Limited Sharing</h2>
              <p className="text-xs text-slate-400">Role-based access matrix with automatic access expiration</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs text-slate-300">
          {/* Grant New Shared Access Form */}
          <form onSubmit={handleCreateShare} className="p-4 bg-slate-800/60 border border-slate-700 rounded-xl space-y-3">
            <h3 className="font-bold text-white text-xs flex items-center space-x-2">
              <Plus className="w-4 h-4 text-sky-400" />
              <span>Grant Secure Role-Based Access Link</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input
                type="email"
                placeholder="Doctor / Specialist Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-sky-500"
                required
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
              >
                <option value="Endocrinologist">Endocrinologist</option>
                <option value="Nephrologist">Nephrologist</option>
                <option value="Clinical Nutritionist">Clinical Nutritionist</option>
                <option value="Family Caregiver">Family Caregiver</option>
              </select>
              <select
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
              >
                <option value={7}>7 Days Access</option>
                <option value={14}>14 Days Access</option>
                <option value={30}>30 Days Access</option>
                <option value={90}>90 Days Access</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg shadow-md shadow-purple-600/20 transition-all"
            >
              Generate Time-Bound Share Link
            </button>
          </form>

          {/* Active Care Circle Links */}
          <div>
            <h3 className="font-bold text-white text-xs mb-3">Active Care Team Access Links ({shares.length})</h3>
            <div className="space-y-2">
              {shares.map((s) => (
                <div key={s.id} className="p-3.5 bg-slate-800/40 border border-slate-700 rounded-xl flex justify-between items-center">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3.5 h-3.5 text-purple-400" />
                      <span className="font-bold text-white">{s.recipientEmail}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {s.recipientRole}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>Expires in {s.expiresInDays} days • Scope: {s.accessibleCategories.join(', ')}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(s.accessLink);
                      alert('Share link copied!');
                    }}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-lg border border-slate-700 text-[11px]"
                  >
                    <Link className="w-3 h-3" />
                    <span>Copy Link</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-800/80 border-t border-slate-700 flex justify-between items-center text-slate-400 text-xs">
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted patient-mediated sharing</span>
          </span>
          <button onClick={onClose} className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
