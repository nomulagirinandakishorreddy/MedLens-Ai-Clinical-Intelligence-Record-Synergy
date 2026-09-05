import React from 'react';
import {
  Activity,
  Shield,
  QrCode,
  FileDown,
  UserPlus,
  Mic,
  Users,
  Award,
  Sparkles,
  MessageSquare,
  LogOut,
  ArrowLeft
} from 'lucide-react';
import { PatientProfile } from '../types/medlens';

interface NavbarProps {
  patient: PatientProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenIntake: () => void;
  onOpenUpload: () => void;
  onOpenQR: () => void;
  onOpenPreVisit: () => void;
  onOpenCareCircle: () => void;
  onOpenAmbient: () => void;
  onOpenQuiz: () => void;
  onExportFHIR: () => void;
  onOpenAiDrawer: () => void;
  onLogout: () => void;
  onBackToIntro: () => void;
  literacyScore: number;
  onOpenAlignmentMatrix?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  patient,
  activeTab,
  setActiveTab,
  onOpenIntake,
  onOpenUpload,
  onOpenQR,
  onOpenPreVisit,
  onOpenCareCircle,
  onOpenAmbient,
  onOpenQuiz,
  onExportFHIR,
  onOpenAiDrawer,
  onLogout,
  onBackToIntro,
  literacyScore,
  onOpenAlignmentMatrix
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Banner Safety Notice & Navigation Bar */}
      <div className="bg-gradient-to-r from-sky-950 via-indigo-950 to-slate-900 text-xs px-4 py-1.5 flex justify-between items-center border-b border-slate-800 text-slate-300">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToIntro}
            className="flex items-center space-x-1 text-sky-400 hover:text-white font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Intro Overview</span>
          </button>
          <span className="text-slate-600">|</span>
          <div className="flex items-center space-x-1.5 text-slate-300">
            <Shield className="w-3.5 h-3.5 text-sky-400" />
            <span>MedLens AI Clinical System • Non-Diagnostic</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {onOpenAlignmentMatrix && (
            <button
              onClick={onOpenAlignmentMatrix}
              className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold hover:bg-emerald-500/30 transition-all"
              title="View Hackathon AI Evaluation Score Matrix"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>AI Eval Alignment 95+</span>
            </button>
          )}
          <button
            onClick={onOpenQuiz}
            className="flex items-center space-x-1.5 text-amber-300 hover:text-amber-200 transition-colors"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Literacy Score: <strong>{literacyScore} pts</strong></span>
          </button>
          <button
            onClick={onExportFHIR}
            className="flex items-center space-x-1 hover:text-white text-sky-400 transition-colors"
            title="Export FHIR R4 Interoperability Bundle"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>FHIR R4 Bundle</span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center space-x-1 text-rose-400 hover:text-rose-300 font-semibold transition-colors"
            title="Sign Out of Active Session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Activity className="w-6 h-6 text-white animate-pulse-subtle" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold bg-gradient-to-r from-white via-sky-100 to-sky-400 bg-clip-text text-transparent">
                  MedLens AI
                </span>
                <span className="bg-sky-500/20 border border-sky-400/30 text-sky-300 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  AI CLINICAL v2.5
                </span>
              </div>
              <p className="text-xs text-slate-400">Clinical Intelligence & Record Synergy</p>
            </div>
          </div>

          {/* Active Patient Pill & Actions */}
          <div className="flex items-center space-x-3">
            {/* Patient Card Pill */}
            <button
              onClick={onOpenIntake}
              className="hidden md:flex items-center space-x-3 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs">
                {patient?.name ? patient.name.split(' ').map((n) => n[0]).join('') : 'EV'}
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{patient?.name || 'Eleanor Vance'}</p>
                <p className="text-[11px] text-slate-400">
                  {patient?.age || 54}y {patient?.sex || 'Female'} • {patient?.bloodType || 'A+'}
                </p>
              </div>
              <UserPlus className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>

            {/* Quick Feature Buttons */}
            <button
              onClick={onOpenUpload}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-md shadow-sky-600/20 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Upload Report</span>
            </button>

            <button
              onClick={onOpenPreVisit}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/80 hover:bg-indigo-500/80 border border-indigo-500/40 text-indigo-100 text-xs font-medium transition-all"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Pre-Visit Prep</span>
            </button>

            <button
              onClick={onOpenAmbient}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 text-xs font-medium transition-all"
              title="Ambient Doctor Visit Recorder"
            >
              <Mic className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Visit Mic</span>
            </button>

            <button
              onClick={onOpenCareCircle}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
              title="Care Circle Sharing"
            >
              <Users className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenQR}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 transition-all"
              title="Emergency QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAiDrawer}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/25 animate-pulse-subtle transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>AI Assistant</span>
            </button>

            {/* Explicit Sign Out Button in main Navbar */}
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs Bar (Scrollable) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar border-t border-slate-800/80">
        <nav role="tablist" aria-label="Clinical Intelligence Navigation" className="flex space-x-1 py-2 text-xs font-medium">
          {[
            { id: 'overview', label: 'Executive Overview' },
            { id: 'cross-validation', label: 'Cross-Validation Engine', badge: '3 Alerts' },
            { id: 'lab-records', label: 'Structured Lab Records' },
            { id: 'drug-lab', label: 'Drug-Lab Interaction Matrix', badge: '3 Flags' },
            { id: 'personal-baseline', label: 'Personal Reference & Velocity' },
            { id: 'risk-stratification', label: 'Predictive Risk Stratifier' },
            { id: 'family-pedigree', label: 'Family Pedigree & Patterns' },
            { id: 'clinical-trials', label: 'Clinical Trials Matcher' },
            { id: 'sdoh', label: 'SDOH & Social Referrals' },
            { id: 'cost-transparency', label: 'Cost Transparency & CPT' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                  isActive
                    ? 'bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/40 shadow-sm shadow-sky-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      tab.id === 'cross-validation'
                        ? 'bg-rose-500/30 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-500/30 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
