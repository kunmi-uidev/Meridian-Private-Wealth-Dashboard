import React, { useState } from 'react';
import { X, Phone, Mail, Calendar, MessageSquare, CheckCircle2 } from 'lucide-react';

interface AdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const AdvisorModal: React.FC<AdvisorModalProps> = ({
  isOpen,
  onClose,
  isDark,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div
        className={`w-full max-w-md rounded-2xl border p-6 shadow-xl transition-all ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EBF2FE] dark:bg-blue-950 text-[#1D63ED] font-medium text-sm flex items-center justify-center">
              MT
            </div>
            <div>
              <h3 className="font-medium text-base text-slate-900 dark:text-white">
                Mark Townsend
              </h3>
              <p className="text-xs text-[#808080]">
                Senior Private Wealth Advisor
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#808080] hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 flex flex-col items-center justify-center text-center gap-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            <h4 className="font-medium text-base">Request Dispatched</h4>
            <p className="text-xs text-[#808080] max-w-xs">
              Mark has received your notification and will connect via your preferred secure channel within 15 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
            <div className="flex items-center justify-around p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <Phone className="w-3.5 h-3.5 text-blue-500" />
                <span>+1 (800) 492-8810</span>
              </div>
              <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700" />
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                <span>m.townsend@meridian.com</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Message or Discussion Topic
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="E.g., Inquire about Q3 liquidity allocations, private credit drawdown schedule..."
                rows={3}
                className={`w-full p-3 text-xs rounded-xl border outline-none transition-colors ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-200 focus:border-blue-500'
                    : 'bg-white border-slate-200 text-slate-800 focus:border-blue-500'
                }`}
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 py-2 rounded-xl text-xs font-medium border cursor-pointer ${
                  isDark
                    ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl text-xs font-medium bg-[#0F2447] text-white hover:bg-[#153463] transition-colors cursor-pointer"
              >
                Request Call Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
