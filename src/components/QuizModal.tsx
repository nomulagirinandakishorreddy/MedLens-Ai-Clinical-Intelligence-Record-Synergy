import React, { useState } from 'react';
import { X, Award, CheckCircle2, XCircle, HelpCircle, Sparkles } from 'lucide-react';
import { LiteracyQuizQuestion, AchievementBadge } from '../types/medlens';
import confetti from 'canvas-confetti';

interface QuizModalProps {
  questions: LiteracyQuizQuestion[];
  badges: AchievementBadge[];
  onClose: () => void;
  onRewardPoints: (pts: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  questions,
  badges,
  onClose,
  onRewardPoints
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const q = questions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === q.correctIndex) {
      setScore((s) => s + 50);
      onRewardPoints(50);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      alert(`Quiz completed! You earned ${score} Health Literacy Points.`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-amber-950/40 border-b border-amber-500/30 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Gamified Health Literacy Builder</h2>
              <p className="text-xs text-amber-200">Daily Micro-Lesson & Interactive Quiz</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs text-slate-300">
          {/* Progress Indicator */}
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Question {currentIdx + 1} of {questions.length}</span>
            <span className="text-amber-300 font-bold">Earned: {score} pts</span>
          </div>

          {/* Question Box */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <span className="px-2 py-0.5 rounded text-[10px] bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">
              Topic: {q.relatedTestName}
            </span>
            <h3 className="text-sm font-bold text-white leading-relaxed">{q.question}</h3>
          </div>

          {/* Options */}
          <div className="space-y-2">
            {q.options.map((opt, idx) => {
              let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-slate-600';
              if (isAnswered) {
                if (idx === q.correctIndex) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold';
                } else if (idx === selectedOpt) {
                  btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && idx === q.correctIndex && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {isAnswered && idx === selectedOpt && idx !== q.correctIndex && (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-3 bg-slate-800/90 border border-slate-700 rounded-xl space-y-1 text-slate-200">
              <span className="font-bold text-amber-300 block text-[11px]">Clinical Insight:</span>
              <p className="text-[11px] leading-relaxed">{q.explanation}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-800/80 border-t border-slate-700 flex justify-end">
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold shadow-lg shadow-amber-600/25 disabled:opacity-50"
          >
            {currentIdx < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};
