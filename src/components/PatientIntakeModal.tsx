import React, { useState } from 'react';
import { X, User, Activity, Pill, ShieldAlert, HeartHandshake, Save } from 'lucide-react';
import { PatientProfile, Medication, Condition, Allergy } from '../types/medlens';

interface PatientIntakeModalProps {
  patient: PatientProfile;
  medications: Medication[];
  conditions: Condition[];
  allergies: Allergy[];
  onClose: () => void;
  onSave: (
    updatedPatient: PatientProfile,
    updatedMeds: Medication[],
    updatedConditions: Condition[],
    updatedAllergies: Allergy[]
  ) => void;
}

export const PatientIntakeModal: React.FC<PatientIntakeModalProps> = ({
  patient,
  medications,
  conditions,
  allergies,
  onClose,
  onSave
}) => {
  const [profile, setProfile] = useState<PatientProfile>({ ...patient });
  const [medsList, setMedsList] = useState<Medication[]>([...medications]);
  const [condsList, setCondsList] = useState<Condition[]>([...conditions]);
  const [allergiesList, setAllergiesList] = useState<Allergy[]>([...allergies]);
  const [activeTab, setActiveTab] = useState<'profile' | 'meds' | 'conditions' | 'sdoh'>('profile');

  // Form helpers
  const handleProfileChange = (field: keyof PatientProfile, val: any) => {
    setProfile((prev) => ({ ...prev, [field]: val }));
  };

  const handleSdohChange = (field: string, val: string) => {
    setProfile((prev) => ({
      ...prev,
      sdoh: { ...prev.sdoh, [field]: val as any }
    }));
  };

  const handleAddMed = () => {
    const newMed: Medication = {
      id: `med-${Date.now()}`,
      name: 'New Medication',
      dosage: '10 mg',
      frequency: 'Once daily',
      startDate: new Date().toISOString().split('T')[0],
      prescriber: profile.primaryPhysician,
      purpose: 'Therapeutic Control',
      provenance: 'USER_PROVIDED'
    };
    setMedsList([...medsList, newMed]);
  };

  const handleSave = () => {
    onSave(profile, medsList, condsList, allergiesList);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-800/80 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Patient Intake & Demographics</h2>
              <p className="text-xs text-slate-400">Provenance-tracked patient record capture</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-6 py-2 text-xs space-x-2 font-medium">
          {[
            { id: 'profile', label: 'Demographics & Vitals', icon: User },
            { id: 'meds', label: 'Active Medications', icon: Pill },
            { id: 'conditions', label: 'Diagnoses & Allergies', icon: Activity },
            { id: 'sdoh', label: 'Social Determinants (SDOH)', icon: HeartHandshake }
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all ${
                  activeTab === t.id
                    ? 'bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-300 flex-1">
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Age & Biological Sex</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => handleProfileChange('age', parseInt(e.target.value) || 0)}
                    className="w-1/2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                  <select
                    value={profile.sex}
                    onChange={(e) => handleProfileChange('sex', e.target.value)}
                    className="w-1/2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Blood Type</label>
                <input
                  type="text"
                  value={profile.bloodType}
                  onChange={(e) => handleProfileChange('bloodType', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Primary Care Physician</label>
                <input
                  type="text"
                  value={profile.primaryPhysician}
                  onChange={(e) => handleProfileChange('primaryPhysician', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Vitals (Height & Weight)</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Height cm"
                    value={profile.heightCm}
                    onChange={(e) => handleProfileChange('heightCm', parseFloat(e.target.value) || 0)}
                    className="w-1/2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                  <input
                    type="number"
                    placeholder="Weight kg"
                    value={profile.weightKg}
                    onChange={(e) => handleProfileChange('weightKg', parseFloat(e.target.value) || 0)}
                    className="w-1/2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Blood Pressure (Systolic / Diastolic)</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={profile.bpSystolic}
                    onChange={(e) => handleProfileChange('bpSystolic', parseInt(e.target.value) || 120)}
                    className="w-1/2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                  <input
                    type="number"
                    value={profile.bpDiastolic}
                    onChange={(e) => handleProfileChange('bpDiastolic', parseInt(e.target.value) || 80)}
                    className="w-1/2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'meds' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-slate-400">Current Prescriptions & OTC Supplements</p>
                <button
                  onClick={handleAddMed}
                  className="px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs"
                >
                  + Add Medication
                </button>
              </div>

              {medsList.map((m, idx) => (
                <div key={m.id} className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={m.name}
                      onChange={(e) => {
                        const copy = [...medsList];
                        copy[idx].name = e.target.value;
                        setMedsList(copy);
                      }}
                      className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-semibold"
                    />
                    <input
                      type="text"
                      value={m.dosage}
                      onChange={(e) => {
                        const copy = [...medsList];
                        copy[idx].dosage = e.target.value;
                        setMedsList(copy);
                      }}
                      className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
                    />
                    <input
                      type="text"
                      value={m.frequency}
                      onChange={(e) => {
                        const copy = [...medsList];
                        copy[idx].frequency = e.target.value;
                        setMedsList(copy);
                      }}
                      className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-700/60">
                    <span>Purpose: {m.purpose}</span>
                    <button
                      onClick={() => setMedsList(medsList.filter((_, i) => i !== idx))}
                      className="text-rose-400 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'conditions' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-200 mb-2">Diagnosed Clinical Conditions</h3>
                {condsList.map((c) => (
                  <div key={c.id} className="flex justify-between items-center p-2.5 bg-slate-800/80 border border-slate-700 rounded-lg mb-2">
                    <div>
                      <span className="font-semibold text-white">{c.name}</span>
                      <span className="text-slate-400 text-[11px] ml-2">ICD-10: {c.icd10}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold text-slate-200 mb-2">Known Drug & Environmental Allergies</h3>
                {allergiesList.map((a) => (
                  <div key={a.id} className="flex justify-between items-center p-2.5 bg-slate-800/80 border border-slate-700 rounded-lg mb-2">
                    <div>
                      <span className="font-semibold text-rose-300">{a.allergen}</span>
                      <span className="text-slate-400 text-[11px] ml-2">Reaction: {a.reaction}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {a.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sdoh' && (
            <div className="space-y-4">
              <p className="text-slate-400 text-xs">
                Social Determinants of Health (SDOH) help MedLens contextualize abnormal lab markers with environmental factors.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Food Security Status</label>
                  <select
                    value={profile.sdoh.foodSecurity}
                    onChange={(e) => handleSdohChange('foodSecurity', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="High">High Security</option>
                    <option value="Moderate">Moderate Stress</option>
                    <option value="Low">Low (Food Insecurity)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Housing Stability</label>
                  <select
                    value={profile.sdoh.housingStability}
                    onChange={(e) => handleSdohChange('housingStability', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="Stable">Stable</option>
                    <option value="At Risk">At Risk</option>
                    <option value="Unstable">Unstable</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Transportation Access</label>
                  <select
                    value={profile.sdoh.transportationAccess}
                    onChange={(e) => handleSdohChange('transportationAccess', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="Reliable">Reliable</option>
                    <option value="Limited">Limited</option>
                    <option value="None">None</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Financial Stress Level</label>
                  <select
                    value={profile.sdoh.financialStress}
                    onChange={(e) => handleSdohChange('financialStress', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-800/80 border-t border-slate-700 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-lg shadow-sky-600/25"
          >
            <Save className="w-4 h-4" />
            <span>Save Record Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
