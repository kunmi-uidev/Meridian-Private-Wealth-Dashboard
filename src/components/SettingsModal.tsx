import React from 'react';
import { X, Shield, Bell, Moon, Sliders } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isDark,
  onToggleTheme,
}) => {
  if (!isOpen) return null;

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
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-500" />
            <h3 className="font-medium text-base text-slate-900 dark:text-white">
              Dashboard Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#808080] hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-3.5">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <div className="flex items-center gap-3">
              <Moon className="w-4 h-4 text-[#808080]" />
              <div>
                <div className="text-xs font-medium">Dark Theme</div>
                <div className="text-[11px] text-[#808080]">
                  Switch between light and dark display modes
                </div>
              </div>
            </div>
            <button
              onClick={onToggleTheme}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                isDark ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                  isDark ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-[#808080]" />
              <div>
                <div className="text-xs font-medium">Market Volatility Alerts</div>
                <div className="text-[11px] text-[#808080]">
                  Real-time alerts on significant portfolio swings
                </div>
              </div>
            </div>
            <div className="w-11 h-6 rounded-full bg-blue-600 relative p-0.5 cursor-pointer">
              <div className="w-5 h-5 rounded-full bg-white shadow-xs translate-x-5" />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-[#808080]" />
              <div>
                <div className="text-xs font-medium">Two-Factor Authentication</div>
                <div className="text-[11px] text-[#808080]">
                  Secured with biometric key
                </div>
              </div>
            </div>
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
              Active
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-2 py-2 rounded-xl text-xs font-medium bg-[#0F2447] text-white hover:bg-[#153463] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
