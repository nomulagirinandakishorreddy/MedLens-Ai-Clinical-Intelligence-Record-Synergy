import React, { useState } from 'react';
import { X, Mic, Square, Sparkles, CheckCircle2, FileText, Calendar, AlertCircle } from 'lucide-react';
import { AmbientTranscript } from '../types/medlens';

interface AmbientRecorderModalProps {
  transcript: AmbientTranscript;
  onClose: () => void;
  onSaveActionItems: (items: any[]) => void;
}

export const AmbientRecorderModal: React.FC<AmbientRecorderModalProps> = ({
  transcript,
  onClose,
  onSaveActionItems
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [activeTranscript, setActiveTranscript] = useState<AmbientTranscript>(transcript);

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      setIsTranscribing(true);
      setTimeout(() => {
        setIsTranscribing(false);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-800/90 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Ambient Visit Documentation Assistant</h2>
              <p className="text-xs text-slate-400">Transcribe doctor-patient conversation & extract action items</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 flex-1">
          {/* Recording Control Banner */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleToggleRecording}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/40'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                }`}
              >
                {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              <div>
                <h3 className="font-bold text-white text-sm">
                  {isRecording ? 'Listening & Recording Visit Audio...' : 'Start Doctor Visit Audio Recording'}
                </h3>
                <p className="text-slate-400 text-xs">
                  {isRecording
                    ? 'Capturing audio stream with patient consent...'
                    : 'Click microphone during consultation to auto-summarize key instructions.'}
                </p>
              </div>
            </div>

            {isTranscribing && (
              <div className="flex items-center space-x-2 text-sky-400 bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/30">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span className="font-semibold text-xs">Extracting Action Items...</span>
              </div>
            )}
          </div>

          {/* Extracted Clinical Action Items */}
          <div>
            <h3 className="font-bold text-white text-xs mb-3 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>AI-Extracted Visit Action Items & Recommendations</span>
            </h3>
            <div className="space-y-2">
              {activeTranscript.extractedActionItems.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-800/60 border border-slate-700 rounded-xl flex justify-between items-center">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-semibold text-white">{item.task}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.dueDate && (
                      <span className="text-[10px] text-slate-400 flex items-center space-x-1 bg-slate-900 px-2 py-0.5 rounded">
                        <Calendar className="w-3 h-3 text-sky-400" />
                        <span>Due: {item.dueDate}</span>
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded text-[10px] bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Visit Transcript Text */}
          <div>
            <h3 className="font-bold text-white text-xs mb-2 flex items-center space-x-1.5">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Visit Audio Dialogue Transcript</span>
            </h3>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl max-h-48 overflow-y-auto font-mono text-[11px] text-slate-300 leading-relaxed whitespace-pre-wrap">
              {activeTranscript.rawText}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-800/80 border-t border-slate-700 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold">
            Save & Exit Assistant
          </button>
        </div>
      </div>
    </div>
  );
};
