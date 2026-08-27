import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';

interface ScheduleAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const ScheduleAuditModal: React.FC<ScheduleAuditModalProps> = ({
  isOpen,
  onClose,
  isDark,
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-09-07');
  const [auditType, setAuditType] = useState('Quarterly Comprehensive');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      onClose();
    }, 1800);
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
          <div className="flex items-center gap-2.5">
            <CalendarIcon className="w-5 h-5 text-blue-500" />
            <h3 className="font-medium text-base text-slate-900 dark:text-white">
              Schedule Portfolio Audit
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#808080] hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="py-8 flex flex-col items-center justify-center text-center gap-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            <h4 className="font-medium text-base">Audit Session Booked</h4>
            <p className="text-xs text-[#808080]">
              Scheduled for {selectedDate} with Meridian Private Advisory Group.
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="mt-4 flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Audit Scope
              </label>
              <select
                value={auditType}
                onChange={(e) => setAuditType(e.target.value)}
                className={`w-full mt-1.5 p-2.5 text-xs rounded-xl border outline-none ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <option>Quarterly Comprehensive Review</option>
                <option>Tax Optimization & Estate Review</option>
                <option>Private Asset & Liquidity Rebalance</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Proposed Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={`w-full mt-1.5 p-2.5 text-xs rounded-xl border outline-none ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800'
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
                Confirm Schedule
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
