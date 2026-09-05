import React, { useState } from 'react';
import { Activity, Mail, Key, ArrowRight, UserCheck, ArrowLeft } from 'lucide-react';
import { PatientProfile } from '../types/medlens';

interface LoginPageProps {
  onLoginSuccess: (profile: PatientProfile) => void;
  onGoToSignup: () => void;
  onBackToIntro: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onGoToSignup,
  onBackToIntro
}) => {
  const [role, setRole] = useState<'patient' | 'physician'>('patient');
  const [email, setEmail] = useState('eleanor.vance@medlens.health');
  const [password, setPassword] = useState('••••••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const userKey = role === 'patient' ? 'medlens_profile_eleanor' : 'medlens_profile_dr_vance';
      const stored = localStorage.getItem(userKey);

      let profile: PatientProfile;

      if (stored) {
        profile = JSON.parse(stored);
      } else {
        profile = {
          id: role === 'patient' ? 'pt-101' : 'md-202',
          name: role === 'patient' ? 'Eleanor Vance' : 'Dr. Marcus Vance, MD',
          age: role === 'patient' ? 54 : 58,
          sex: 'Female',
          bloodType: 'A Positive (A+)',
          heightCm: 165,
          weightKg: 78,
          bmi: 28.7,
          bpSystolic: 134,
          bpDiastolic: 86,
          primaryPhysician: 'Dr. Marcus Vance, MD (St. Jude Internal Medicine)',
          emergencyContact: {
            name: 'Robert Vance',
            relation: 'Spouse',
            phone: '+1 (555) 234-8901'
          },
          sdoh: {
            housingStability: 'Stable',
            foodSecurity: 'Low',
            transportationAccess: 'Reliable',
            financialStress: 'Moderate'
          }
        };
        localStorage.setItem(userKey, JSON.stringify(profile));
      }

      localStorage.setItem('medlens_active_user', JSON.stringify(profile));
      onLoginSuccess(profile);
    }, 400);
  };

  const handleQuickDemoFill = (demoRole: 'eleanor' | 'robert' | 'physician') => {
    let demoProfile: PatientProfile;

    if (demoRole === 'eleanor') {
      demoProfile = {
        id: 'pt-101',
        name: 'Eleanor Vance',
        age: 54,
        sex: 'Female',
        bloodType: 'A Positive (A+)',
        heightCm: 165,
        weightKg: 78,
        bmi: 28.7,
        bpSystolic: 134,
        bpDiastolic: 86,
        primaryPhysician: 'Dr. Marcus Vance, MD',
        emergencyContact: { name: 'Robert Vance', relation: 'Spouse', phone: '+1 (555) 234-8901' },
        sdoh: { housingStability: 'Stable', foodSecurity: 'Low', transportationAccess: 'Reliable', financialStress: 'Moderate' }
      };
    } else if (demoRole === 'robert') {
      demoProfile = {
        id: 'pt-102',
        name: 'Robert Vance',
        age: 57,
        sex: 'Male',
        bloodType: 'O Positive (O+)',
        heightCm: 180,
        weightKg: 85,
        bmi: 26.2,
        bpSystolic: 128,
        bpDiastolic: 82,
        primaryPhysician: 'Dr. Marcus Vance, MD',
        emergencyContact: { name: 'Eleanor Vance', relation: 'Spouse', phone: '+1 (555) 234-8901' },
        sdoh: { housingStability: 'Stable', foodSecurity: 'High', transportationAccess: 'Reliable', financialStress: 'Low' }
      };
    } else {
      demoProfile = {
        id: 'md-202',
        name: 'Dr. Marcus Vance, MD',
        age: 58,
        sex: 'Male',
        bloodType: 'B Positive (B+)',
        heightCm: 175,
        weightKg: 75,
        bmi: 24.5,
        bpSystolic: 120,
        bpDiastolic: 78,
        primaryPhysician: 'St. Jude Internal Medicine',
        emergencyContact: { name: 'Hospital Admin', relation: 'Provider', phone: '+1 (555) 999-0000' },
        sdoh: { housingStability: 'Stable', foodSecurity: 'High', transportationAccess: 'Reliable', financialStress: 'Low' }
      };
    }

    localStorage.setItem(`medlens_patient_${demoProfile.id}`, JSON.stringify(demoProfile));
    localStorage.setItem('medlens_active_user', JSON.stringify(demoProfile));
    onLoginSuccess(demoProfile);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative selection:bg-sky-500 selection:text-white">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Main Auth Container */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div
            onClick={onBackToIntro}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-sky-500/20 cursor-pointer"
          >
            <Activity className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Sign In to MedLens</h1>
          <p className="text-xs text-slate-400">Access your personalized clinical records</p>
        </div>

        {/* Role Selection */}
        <div className="flex space-x-2 text-xs font-medium bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setRole('patient')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              role === 'patient' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Patient Account
          </button>
          <button
            type="button"
            onClick={() => setRole('physician')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              role === 'physician' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Physician Account
          </button>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSignIn} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Email / Health ID</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-sky-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Password</label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-sky-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <ArrowRight className="w-4 h-4" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Switch to Separate Signup Page */}
        <div className="text-center pt-2 border-t border-slate-800/80 text-xs">
          <span className="text-slate-400">Don't have an account? </span>
          <button
            onClick={onGoToSignup}
            className="text-sky-400 font-bold hover:underline"
          >
            Sign Up Now
          </button>
        </div>

        {/* Quick Demo Access Pills */}
        <div className="pt-2 space-y-2">
          <p className="text-[11px] text-slate-400 font-semibold text-center">Quick Demo Accounts:</p>
          <div className="grid grid-cols-3 gap-1.5 text-[10px]">
            <button
              onClick={() => handleQuickDemoFill('eleanor')}
              className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-sky-300 font-medium truncate"
            >
              Eleanor (F, 54)
            </button>
            <button
              onClick={() => handleQuickDemoFill('robert')}
              className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-indigo-300 font-medium truncate"
            >
              Robert (M, 57)
            </button>
            <button
              onClick={() => handleQuickDemoFill('physician')}
              className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-purple-300 font-medium truncate"
            >
              Dr. Vance (MD)
            </button>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-1">
          <button
            onClick={onBackToIntro}
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center space-x-1 mx-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Intro Overview</span>
          </button>
        </div>
      </div>
    </div>
  );
};
