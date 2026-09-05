import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Mic,
  Send,
  Sparkles,
  Volume2,
  ShieldCheck,
  RotateCcw,
  Copy,
  Check,
  AlertCircle,
  FileText,
  Activity,
  Zap,
  TrendingUp,
  HelpCircle,
  Users,
  DollarSign
} from 'lucide-react';
import { LabResult, Medication, PatientProfile } from '../types/medlens';
import { MedLensAiEngine } from '../services/aiEngine';

interface AiAssistantDrawerProps {
  patient: PatientProfile;
  labs: LabResult[];
  medications: Medication[];
  onClose: () => void;
  onSelectLab?: (labId: string) => void;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  patient,
  labs,
  medications,
  onClose,
  onSelectLab
}) => {
  const [query, setQuery] = useState('');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [isSpeakingIdx, setIsSpeakingIdx] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<
    { sender: 'user' | 'ai'; text: string; relatedLabIds?: string[]; disclaimer?: string }[]
  >([
    {
      sender: 'ai',
      text: `Hello ${patient.name}. I am your **MedLens AI Clinical Assistant**.\n\nYou can ask plain English questions about your **abnormal labs**, **rising trends**, **Metformin & B12 interactions**, **doctor visit prep**, or **billing costs**.`,
      disclaimer: 'Notice: MedLens is an informational tool and does not provide medical diagnosis or treatment prescribing.'
    }
  ]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || query;
    if (!text.trim()) return;

    const userMsg = { sender: 'user' as const, text };
    setMessages((prev) => [...prev, userMsg]);
    setQuery('');

    // Process via MedLens AI Engine NLP
    setTimeout(() => {
      const response = MedLensAiEngine.processNaturalLanguageQuery(text, labs, medications, patient);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: response.text,
          relatedLabIds: response.relatedLabIds,
          disclaimer: response.disclaimer
        }
      ]);
    }, 250);
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';

      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        handleSend(transcript);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } else {
      // Fallback simulation for browsers without WebSpeech
      setIsListening(true);
      setTimeout(() => {
        const sampleQuery = 'Show my abnormal lab values and drug interactions';
        setQuery(sampleQuery);
        setIsListening(false);
        handleSend(sampleQuery);
      }, 1000);
    }
  };

  const handleSpeak = (text: string, idx: number) => {
    if ('speechSynthesis' in window) {
      if (isSpeakingIdx === idx) {
        window.speechSynthesis.cancel();
        setIsSpeakingIdx(null);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/\*\*/g, '').replace(/•/g, ''));
      utterance.onend = () => setIsSpeakingIdx(null);
      utterance.onerror = () => setIsSpeakingIdx(null);

      setIsSpeakingIdx(idx);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const handleResetChat = () => {
    setMessages([
      {
        sender: 'ai',
        text: `Conversation reset. Ask any question about ${patient.name}'s medical records.`,
        disclaimer: 'Notice: MedLens is an informational tool.'
      }
    ]);
  };

  const quickPills = [
    { label: 'Abnormal Labs Overview', query: 'Show all my abnormal out of range labs', icon: AlertCircle },
    { label: 'Metformin & B12 Interaction', query: 'Is my Metformin causing Vitamin B12 deficiency?', icon: Zap },
    { label: 'Renal & eGFR Velocity', query: 'What is my eGFR velocity and kidney trajectory?', icon: TrendingUp },
    { label: 'Doctor Visit Questions', query: 'What questions should I ask my doctor?', icon: HelpCircle },
    { label: 'Hereditary Family Risk', query: 'What hereditary health patterns run in my family?', icon: Users },
    { label: 'CPT Billing Costs', query: 'What are my estimated lab billing costs?', icon: DollarSign }
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col selection:bg-purple-500 selection:text-white">
      {/* Drawer Header */}
      <div className="p-4 bg-slate-800/90 border-b border-slate-700 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Sparkles className="w-5 h-5 animate-pulse-subtle" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">MedLens AI Clinical Assistant</h2>
            <p className="text-[11px] text-slate-400">High-Efficiency NLP & Voice Interface</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleResetChat}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Reset Chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Categorized Prompt Pills */}
      <div className="p-3 bg-slate-950/70 border-b border-slate-800 text-[11px] flex space-x-2 overflow-x-auto no-scrollbar">
        {quickPills.map((pill, idx) => {
          const Icon = pill.icon;
          return (
            <button
              key={idx}
              onClick={() => handleSend(pill.query)}
              className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700/80 font-medium flex items-center space-x-1.5 transition-all"
            >
              <Icon className="w-3.5 h-3.5 text-sky-400" />
              <span>{pill.label}</span>
            </button>
          );
        })}
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-4 rounded-2xl max-w-[88%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-sky-600 text-white rounded-br-none font-medium shadow-md'
                  : 'bg-slate-800/90 border border-slate-700 text-slate-200 rounded-bl-none shadow-md'
              }`}
            >
              <div className="flex justify-between items-center mb-1.5 pb-1 border-b border-slate-700/50">
                <span className="text-[10px] font-bold text-slate-400 flex items-center space-x-1">
                  {m.sender === 'user' ? (
                    <span className="text-sky-200">You</span>
                  ) : (
                    <span className="text-purple-300 font-bold flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      <span>MedLens AI</span>
                    </span>
                  )}
                </span>

                {m.sender === 'ai' && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCopyText(m.text, idx)}
                      className="text-slate-400 hover:text-white"
                      title="Copy response"
                    >
                      {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleSpeak(m.text, idx)}
                      className={`text-slate-400 hover:text-white ${isSpeakingIdx === idx ? 'text-purple-400 animate-pulse' : ''}`}
                      title="Read aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Response Message Body with Bold Text Parsing */}
              <div className="whitespace-pre-wrap space-y-1 text-xs">
                {m.text.split('\n').map((line, lIdx) => {
                  const parts = line.split(/(\*\*.*?\*\*)/g);
                  return (
                    <p key={lIdx}>
                      {parts.map((part, pIdx) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return (
                            <strong key={pIdx} className="text-white font-bold">
                              {part.slice(2, -2)}
                            </strong>
                          );
                        }
                        return part;
                      })}
                    </p>
                  );
                })}
              </div>

              {/* Related Source Link Triggers */}
              {m.relatedLabIds && m.relatedLabIds.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex flex-wrap gap-1.5">
                  <span className="text-[10px] text-slate-400 font-semibold block w-full">
                    Direct Source Location Triggers:
                  </span>
                  {m.relatedLabIds.map((labId) => {
                    const l = labs.find((item) => item.id === labId);
                    return (
                      <button
                        key={labId}
                        onClick={() => onSelectLab && onSelectLab(labId)}
                        className="px-2.5 py-1 rounded-lg text-[10px] bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-bold border border-sky-500/30 hover:underline flex items-center space-x-1"
                      >
                        <FileText className="w-3 h-3 text-sky-400" />
                        <span>Source Overlay: {l?.testName || labId}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {m.disclaimer && (
              <span className="text-[10px] text-slate-500 mt-1 max-w-[88%] italic">
                {m.disclaimer}
              </span>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 space-y-2">
        {isListening && (
          <div className="flex items-center space-x-2 text-rose-400 bg-rose-500/10 px-3 py-1 rounded-lg border border-rose-500/30 text-xs font-semibold animate-pulse">
            <Mic className="w-4 h-4" />
            <span>Listening to voice query... Speak now!</span>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <button
            onClick={handleVoiceInput}
            className={`p-2.5 rounded-xl border transition-all ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse border-rose-500 shadow-lg shadow-rose-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
            title="Voice Speech Input"
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            placeholder="Ask plain English questions about labs, medications, or trends..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
          />

          <button
            onClick={() => handleSend()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-md shadow-purple-600/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
