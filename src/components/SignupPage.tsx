import React, { useState } from 'react';
import { Activity, UserPlus, ArrowLeft } from 'lucide-react';
import { PatientProfile } from '../types/medlens';

interface SignupPageProps {
  onSignupSuccess: (profile: PatientProfile) => void;
  onGoToLogin: () => void;
  onBackToIntro: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({
  onSignupSuccess,
  onGoToLogin,
  onBackToIntro
}) => {
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState<number>(45);
  const [newSex, setNewSex] = useState<'Female' | 'Male' | 'Other'>('Female');
  const [newBloodType, setNewBloodType] = useState('O Positive (O+)');
  const [newPhysician, setNewPhysician] = useState('Dr. Marcus Vance, MD');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const newId = `pt-${Date.now()}`;
      const newProfile: PatientProfile = {
        id: newId,
        name: newName,
        age: newAge,
        sex: newSex,
        bloodType: newBloodType,
        heightCm: 170,
        weightKg: 70,
        bmi: 24.2,
        bpSystolic: 120,
        bpDiastolic: 80,
        primaryPhysician: newPhysician,
        emergencyContact: {
          name: 'Primary Contact',
          relation: 'Family',
          phone: '+1 (555) 000-1122'
        },
        sdoh: {
          housingStability: 'Stable',
          foodSecurity: 'High',
          transportationAccess: 'Reliable',
          financialStress: 'Low'
        }
      };

      // Save to localStorage under patient ID and active user key
      localStorage.setItem(`medlens_patient_${newId}`, JSON.stringify(newProfile));
      localStorage.setItem('medlens_active_user', JSON.stringify(newProfile));

      onSignupSuccess(newProfile);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative selection:bg-sky-500 selection:text-white">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Main Auth Container */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div
            onClick={onBackToIntro}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/20 cursor-pointer"
          >
            <Activity className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Create Patient Account</h1>
          <p className="text-xs text-slate-400">Register to generate your clinical record vault</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Full Legal Name</label>
            <input
              type="text"
              placeholder="e.g. Sarah Jenkins"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Age</label>
              <input
                type="number"
                value={newAge}
                onChange={(e) => setNewAge(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Sex</label>
              <select
                value={newSex}
                onChange={(e) => setNewSex(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Blood Type</label>
            <input
              type="text"
              value={newBloodType}
              onChange={(e) => setNewBloodType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Primary Care Physician</label>
            <input
              type="text"
              value={newPhysician}
              onChange={(e) => setNewPhysician(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </>
            )}
          </button>
        </form>

        {/* Switch to Separate Login Page */}
        <div className="text-center pt-2 border-t border-slate-800/80 text-xs">
          <span className="text-slate-400">Already have an account? </span>
          <button onClick={onGoToLogin} className="text-sky-400 font-bold hover:underline">
            Sign In
          </button>
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
