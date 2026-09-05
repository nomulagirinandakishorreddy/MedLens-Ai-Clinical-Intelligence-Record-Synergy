import React from 'react';
import {
  Activity,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Zap,
  Eye,
  GitBranch,
  Microscope,
  Lock,
  FileText,
  QrCode,
  UserPlus
} from 'lucide-react';

interface IntroPageProps {
  onGoToLogin: () => void;
  onGoToSignup: () => void;
}

export const IntroPage: React.FC<IntroPageProps> = ({ onGoToLogin, onGoToSignup }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-sky-950 via-indigo-950 to-slate-900 border-b border-slate-800 py-2 px-4 text-center text-xs text-slate-300">
        <span className="inline-flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>
            <strong className="text-white">MedLens Platform v2.5:</strong> AI-powered clinical record synergy with FHIR R4 interoperability & 15 intelligence engines.
          </span>
        </span>
      </div>

      {/* Main Navigation Bar for Intro Page */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onGoToLogin}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-sky-100 to-sky-400 bg-clip-text text-transparent">
                MedLens
              </span>
              <span className="text-xs text-slate-400 block -mt-1">Clinical Information Intelligence</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onGoToLogin}
              className="text-xs font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-all"
            >
              Sign In
            </button>
            <button
              onClick={onGoToSignup}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>
            <button
              onClick={onGoToLogin}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-sky-500/25 transition-all"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold animate-pulse-subtle">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span>Transform Fragmented Records into Traceable Clinical Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          AI-Powered Synergy for <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Complex Patient Records</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          MedLens collects patient history, laboratory reports, prescriptions, and clinical notes to synthesize structured, explainable, and reviewable records—featuring multi-document cross-validation, explainable source highlighting, and drug-lab interaction checking.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onGoToLogin}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <Activity className="w-5 h-5" />
            <span>Sign In to Clinical Workspace</span>
          </button>
          <button
            onClick={onGoToSignup}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition-all"
          >
            <UserPlus className="w-5 h-5 text-indigo-400" />
            <span>Create New Patient Account</span>
          </button>
        </div>

        {/* Key Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-5xl mx-auto">
          {[
            { metric: '15+', label: 'Clinical AI Engines' },
            { metric: '100%', label: 'Source Provenance Transparency' },
            { metric: 'FHIR R4', label: 'Interoperability Standard' },
            { metric: 'Zero', label: 'Synthetic Range Hallucinations' }
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-extrabold text-sky-400">{stat.metric}</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">15 Advanced Clinical Intelligence Engines</h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Beyond standard AI summaries: MedLens builds entity resolution, personal baselines, and safety guardrails directly into patient workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: 'Multi-Document Cross-Validation',
              desc: 'Cross-references values across multiple providers to detect conflicting diagnoses, duplicate tests, and routine surveillance gaps.'
            },
            {
              icon: Eye,
              title: 'Explainable AI & Source Highlighting',
              desc: 'Click-to-source bounding box viewer with OCR confidence heatmaps and alternative reading resolution.'
            },
            {
              icon: Activity,
              title: 'Personal Baseline Learning',
              desc: 'Calculates individual longitudinal baselines to alert on velocity shifts even when within population lab limits.'
            },
            {
              icon: ShieldCheck,
              title: 'Medication-Lab Interaction Matrix',
              desc: 'Checks active prescriptions against lab trends for Metformin B12 depletion, Lithium monitoring gaps, and NSAID renal risks.'
            },
            {
              icon: Sparkles,
              title: 'Natural Language Voice Assistant',
              desc: 'Plain-English conversational query interface with speech recognition, vocal synthesis, and direct source link triggers.'
            },
            {
              icon: FileText,
              title: 'Pre-Visit Preparation Generator',
              desc: 'Auto-generates 1-page printable briefs optimized for 15-minute consultations with top physician questions.'
            },
            {
              icon: GitBranch,
              title: 'Family Health Pedigree Graph',
              desc: 'Cross-analyzes family member records to detect hereditary patterns and visualize interactive pedigree trees.'
            },
            {
              icon: Microscope,
              title: 'Clinical Trial & Research Matcher',
              desc: 'Matches patient biomarker profiles against active clinical trials and exports anonymized research data packages.'
            },
            {
              icon: QrCode,
              title: 'FHIR R4 & Emergency QR Bridge',
              desc: 'Exports standardized FHIR JSON resources and renders scannable offline Emergency QR code cards.'
            }
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                onClick={onGoToLogin}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 cursor-pointer transition-all space-y-3 group hover:shadow-xl hover:shadow-sky-500/5"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20 group-hover:bg-sky-500/20 transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-sky-400" />
            <span className="font-semibold text-slate-400">MedLens Clinical Intelligence System</span>
          </div>
          <p>© 2026 MedLens Health Inc. Strictly Non-Diagnostic & Safety Guardrailed.</p>
        </div>
      </footer>
    </div>
  );
};
