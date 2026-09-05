import React from 'react';
import { X, QrCode, ShieldAlert, Heart, Phone, FileCheck, Copy } from 'lucide-react';
import { PatientProfile, Medication, Allergy, Condition } from '../types/medlens';

interface EmergencyQRModalProps {
  patient: PatientProfile;
  medications: Medication[];
  allergies: Allergy[];
  conditions: Condition[];
  onClose: () => void;
}

export const EmergencyQRModal: React.FC<EmergencyQRModalProps> = ({
  patient,
  medications,
  allergies,
  conditions,
  onClose
}) => {
  // Simple payload simulation for QR code
  const emergencyData = {
    name: patient.name,
    age: patient.age,
    bloodType: patient.bloodType,
    contact: patient.emergencyContact,
    allergies: allergies.map((a) => `${a.allergen} (${a.severity})`),
    criticalMeds: medications.map((m) => `${m.name} ${m.dosage}`),
    conditions: conditions.map((c) => c.name)
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(emergencyData, null, 2));
    alert('Emergency patient payload copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-rose-950/60 border-b border-rose-500/30 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/40">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Emergency Patient QR & Medical Card</h2>
              <p className="text-xs text-rose-200">Scannable Offline Interoperability Data</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-xs text-slate-300">
          {/* Simulated Scannable QR Visual */}
          <div className="bg-white p-6 rounded-2xl w-56 h-56 mx-auto flex flex-col items-center justify-center shadow-xl border-4 border-slate-800 relative">
            <div className="grid grid-cols-6 gap-1 w-full h-full p-2">
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-sm ${
                    i % 2 === 0 || i % 5 === 0 ? 'bg-slate-900' : i % 3 === 0 ? 'bg-sky-600' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-sky-400 flex items-center justify-center border-2 border-white shadow-lg">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse-subtle" />
              </div>
            </div>
          </div>

          {/* Quick Critical Summary */}
          <div className="space-y-3 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center text-slate-200 font-bold border-b border-slate-700 pb-2">
              <span>{patient.name} ({patient.age}y/o {patient.sex})</span>
              <span className="text-rose-400 font-mono text-xs">{patient.bloodType}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400 block font-medium">Severe Allergies:</span>
                <span className="text-rose-300 font-semibold">
                  {allergies.map((a) => a.allergen).join(', ') || 'None recorded'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Emergency Contact:</span>
                <span className="text-white">
                  {patient.emergencyContact.name} ({patient.emergencyContact.phone})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-800/80 border-t border-slate-700 flex justify-between items-center">
          <button
            onClick={handleCopyPayload}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Raw Payload</span>
          </button>
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold">
            Close Card
          </button>
        </div>
      </div>
    </div>
  );
};
