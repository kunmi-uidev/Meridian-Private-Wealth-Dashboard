import React, { useState, useEffect } from 'react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
  userName?: string;
  selectedMode?: 'simple' | 'expert' | null;
  onSelectMode?: (mode: 'simple' | 'expert') => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  isDark = false,
  userName = 'Oluwabukunmi',
  selectedMode: initialMode = null,
  onSelectMode,
}) => {
  const [selected, setSelected] = useState<'simple' | 'expert' | null>(initialMode ?? null);

  useEffect(() => {
    if (initialMode !== undefined) {
      setSelected(initialMode);
    }
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSelect = (mode: 'simple' | 'expert') => {
    setSelected(mode);
    if (onSelectMode) {
      onSelectMode(mode);
    }
  };

  const handleGoToDashboard = () => {
    if (!selected) return;
    if (onSelectMode) {
      onSelectMode(selected);
    }
    onClose();
  };

  return (
    <div
      id="onboarding-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        id="onboarding-modal-card"
        className={`w-full max-w-[680px] rounded-[20px] sm:rounded-[28px] p-5 sm:p-8 md:p-9 transition-all border max-h-[92dvh] overflow-y-auto ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-200/80 text-slate-900'
        }`}
      >
        {/* Title */}
        <h2
          id="onboarding-greeting"
          className="text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-tight leading-tight"
        >
          Hi, {userName && userName.trim() ? (userName.trim().split(' ')[0] || userName) : 'there'}
        </h2>

        {/* Subtitle */}
        <p
          id="onboarding-subtitle"
          className={`text-xs sm:text-sm md:text-[14px] leading-relaxed mt-2.5 sm:mt-3 font-normal ${
            isDark ? 'text-slate-400' : 'text-[#737373]'
          }`}
        >
          Before we start, everyone reads financial information differently.
          <br className="hidden sm:inline" /> Pick the one that fits you, you can switch anytime from the sidebar.
        </p>

        {/* Two Options: Simple vs Expert */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mt-6 sm:mt-8">
          {/* Simple Card */}
          <button
            type="button"
            id="onboarding-option-simple"
            onClick={() => handleSelect('simple')}
            className={`p-5 sm:p-6 rounded-2xl text-left transition-all duration-150 cursor-pointer relative flex flex-col justify-between min-h-[110px] sm:min-h-[120px] ${
              selected === 'simple'
                ? isDark
                  ? 'border-[1.5px] border-blue-500 bg-slate-900'
                  : 'border-[1.5px] border-[#185ABC] bg-white'
                : isDark
                ? 'border border-slate-800 bg-slate-850 hover:border-slate-700'
                : 'border border-slate-200/90 bg-white hover:border-slate-300'
            }`}
          >
            <span
              className={`text-xs sm:text-sm font-normal ${
                isDark ? 'text-slate-400' : 'text-[#737373]'
              }`}
            >
              Explain everything in plain English
            </span>

            <div className="flex items-center justify-between mt-3 w-full">
              <span
                className={`text-2xl sm:text-[28px] font-medium tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Simple
              </span>

              {/* Light Green Rounded Icon Container with Circle Indicator */}
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  isDark ? 'bg-emerald-950/60' : 'bg-[#E8F8EE]'
                }`}
              >
                <div
                  className={`w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full transition-all ${
                    selected === 'simple'
                      ? 'border-[2.5px] border-[#0A306C] dark:border-blue-400 bg-white dark:bg-slate-900'
                      : 'border-2 border-[#86EFAC] dark:border-emerald-600/50 bg-white dark:bg-slate-900'
                  }`}
                />
              </div>
            </div>
          </button>

          {/* Expert Card */}
          <button
            type="button"
            id="onboarding-option-expert"
            onClick={() => handleSelect('expert')}
            className={`p-5 sm:p-6 rounded-2xl text-left transition-all duration-150 cursor-pointer relative flex flex-col justify-between min-h-[110px] sm:min-h-[120px] ${
              selected === 'expert'
                ? isDark
                  ? 'border-[1.5px] border-blue-500 bg-slate-900'
                  : 'border-[1.5px] border-[#185ABC] bg-white'
                : isDark
                ? 'border border-slate-800 bg-slate-850 hover:border-slate-700'
                : 'border border-slate-200/90 bg-white hover:border-slate-300'
            }`}
          >
            <span
              className={`text-xs sm:text-sm font-normal ${
                isDark ? 'text-slate-400' : 'text-[#737373]'
              }`}
            >
              Include all financial jargons
            </span>

            <div className="flex items-center justify-between mt-3 w-full">
              <span
                className={`text-2xl sm:text-[28px] font-medium tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Expert
              </span>

              {/* Light Green Rounded Icon Container with Circle Indicator */}
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  isDark ? 'bg-emerald-950/60' : 'bg-[#E8F8EE]'
                }`}
              >
                <div
                  className={`w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full transition-all ${
                    selected === 'expert'
                      ? 'border-[2.5px] border-[#0A306C] dark:border-blue-400 bg-white dark:bg-slate-900'
                      : 'border-2 border-[#86EFAC] dark:border-emerald-600/50 bg-white dark:bg-slate-900'
                  }`}
                />
              </div>
            </div>
          </button>
        </div>

        {/* Go to Dashboard Button */}
        <button
          type="button"
          id="onboarding-btn-dashboard"
          onClick={handleGoToDashboard}
          disabled={!selected}
          className={`w-full mt-6 sm:mt-8 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 flex items-center justify-center min-h-[44px] ${
            selected
              ? isDark
                ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer'
                : 'bg-[#06397A] hover:bg-[#052E63] text-white cursor-pointer'
              : isDark
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-[#EAEAEA] text-[#808080] cursor-not-allowed'
          }`}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};
