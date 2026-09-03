import React from 'react';
import { Icon } from '@iconify/react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAdvisor: () => void;
  onToggleTheme: () => void;
  onOpenSettings: () => void;
  onToggleMobileMenu?: () => void;
  isDark: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAdvisor,
  onToggleTheme,
  onOpenSettings,
  onToggleMobileMenu,
  isDark,
}) => {
  return (
    <header className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Top Welcome & Actions Row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile menu trigger */}
          {onToggleMobileMenu && (
            <button
              id="header-btn-mobile-menu"
              onClick={onToggleMobileMenu}
              className={`p-2 rounded-xl border md:hidden flex-shrink-0 transition-colors cursor-pointer ${
                isDark
                  ? 'border-slate-800 bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-200/80 bg-white/90 text-[#808080] hover:text-slate-900 hover:bg-slate-50 shadow-xs'
              }`}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="min-w-0">
            <h1
              id="greeting-title"
              className={`text-lg sm:text-xl md:text-2xl font-medium tracking-tight truncate ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Good Morning, Oluwabukunmi
            </h1>
            <p className="text-xs sm:text-sm text-[#808080] mt-0.5 font-normal truncate">
              Here's how we are looking today
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <button
            id="header-btn-notifications"
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
              isDark
                ? 'border-slate-800 bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                : 'border-slate-200/80 bg-white/90 text-[#808080] hover:text-slate-900 hover:bg-slate-50 shadow-xs'
            }`}
            title="Notifications"
          >
            <Icon icon="solar:bell-linear" className="w-4 h-4" />
          </button>

          <button
            id="header-btn-theme"
            onClick={onToggleTheme}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
              isDark
                ? 'border-slate-800 bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                : 'border-slate-200/80 bg-white/90 text-[#808080] hover:text-slate-900 hover:bg-slate-50 shadow-xs'
            }`}
            title="Toggle theme"
          >
            <Icon icon="ph:circle-half-fill" className="w-4 h-4" />
          </button>

          <button
            id="header-btn-settings"
            onClick={onOpenSettings}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
              isDark
                ? 'border-slate-800 bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                : 'border-slate-200/80 bg-white/90 text-[#808080] hover:text-slate-900 hover:bg-slate-50 shadow-xs'
            }`}
            title="Settings"
          >
            <Icon icon="solar:settings-linear" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs & Advisor Row */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-0.5">
        {/* Navigation Tabs (Overview, Fees, Liquidity) */}
        <div
          id="dashboard-tabs"
          className={`flex items-center gap-1 p-1 rounded-xl border max-w-full overflow-x-auto ${
            isDark
              ? 'bg-slate-900/90 border-slate-800'
              : 'bg-[#F2F4F7] border-slate-200/60'
          }`}
        >
          {['Overview', 'Fees', 'Liquidity'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                id={`tab-${tab.toLowerCase()}`}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'bg-white text-slate-900 shadow-xs border border-slate-200/50'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-[#808080] hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Advisor Badge */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm text-[#808080] hidden sm:inline">
              Advisor:
            </span>
            <button
              id="advisor-pill"
              onClick={onOpenAdvisor}
              className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800/90 border-slate-700 text-slate-200 hover:border-slate-600'
                  : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-xs'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#EBF2FE] dark:bg-blue-900/60 text-[#1D63ED] dark:text-blue-300 text-[10px] font-medium flex items-center justify-center">
                MT
              </span>
              <span className="text-slate-700 dark:text-slate-200">Mark T.</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
