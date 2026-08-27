import React from 'react';
import { Icon } from '@iconify/react';
import { ChevronsUpDown, X } from 'lucide-react';

interface SidebarProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
  onOpenAdvisor: () => void;
  onOpenSchedule: () => void;
  onToggleTheme: () => void;
  isDark: boolean;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeNav,
  setActiveNav,
  onOpenAdvisor,
  onOpenSchedule,
  onToggleTheme,
  isDark,
  mobileOpen = false,
  onCloseMobile,
}) => {
  const handleNavClick = (nav: string, action?: () => void) => {
    if (action) {
      action();
    } else {
      setActiveNav(nav);
    }
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const renderNavContent = () => (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-6">
        {/* Logo & Mobile Close Header */}
        <div className="flex items-center justify-between px-1 pt-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0F2447] flex items-center justify-center shadow-xs flex-shrink-0">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 4h3.5l4.5 7.5L16.5 4H20v16h-3.5v-8.5L12 19l-4.5-7.5V20H4V4z" />
              </svg>
            </div>
            <span
              className={`text-lg font-medium tracking-tight font-serif-brand ${
                isDark ? 'text-white' : 'text-[#0F2447]'
              }`}
            >
              Meridian Private
            </span>
          </div>

          {/* Close button on mobile */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className={`p-1.5 rounded-lg md:hidden transition-colors cursor-pointer ${
                isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-[#808080] hover:text-slate-900 hover:bg-slate-100'
              }`}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Speak to an Advisor CTA */}
        <button
          id="btn-speak-advisor"
          onClick={() => {
            onOpenAdvisor();
            if (onCloseMobile) onCloseMobile();
          }}
          className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-center gap-2.5 text-sm font-medium transition-all duration-150 cursor-pointer ${
            isDark
              ? 'border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-xs'
          }`}
        >
          <Icon icon="solar:phone-calling-linear" className="w-4 h-4 text-[#808080]" />
          <span>Speak to an Advisor</span>
        </button>

        {/* Nav list */}
        <nav className="flex flex-col gap-1 text-sm font-medium">
          {/* Overview */}
          <button
            id="nav-overview"
            onClick={() => handleNavClick('Overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
              activeNav === 'Overview'
                ? isDark
                  ? 'bg-blue-950/60 text-blue-400 font-medium'
                  : 'bg-[#EBF2FE] text-[#1D63ED] font-medium'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                : 'text-[#808080] hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Icon
              icon={activeNav === 'Overview' ? 'solar:widget-2-bold' : 'solar:widget-2-linear'}
              className={`w-5 h-5 ${
                activeNav === 'Overview'
                  ? isDark
                    ? 'text-blue-400'
                    : 'text-[#1D63ED]'
                  : isDark
                  ? 'text-slate-400'
                  : 'text-[#808080]'
              }`}
            />
            <span>Overview</span>
          </button>

          {/* Fees */}
          <button
            id="nav-fees"
            onClick={() => handleNavClick('Fees')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
              activeNav === 'Fees'
                ? isDark
                  ? 'bg-blue-950/60 text-blue-400 font-medium'
                  : 'bg-[#EBF2FE] text-[#1D63ED] font-medium'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                : 'text-[#808080] hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Icon
              icon={activeNav === 'Fees' ? 'solar:bill-bold' : 'solar:bill-linear'}
              className={`w-5 h-5 ${
                activeNav === 'Fees'
                  ? isDark
                    ? 'text-blue-400'
                    : 'text-[#1D63ED]'
                  : isDark
                  ? 'text-slate-400'
                  : 'text-[#808080]'
              }`}
            />
            <span>Fees</span>
          </button>

          {/* Liquidity */}
          <button
            id="nav-liquidity"
            onClick={() => handleNavClick('Liquidity')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
              activeNav === 'Liquidity'
                ? isDark
                  ? 'bg-blue-950/60 text-blue-400 font-medium'
                  : 'bg-[#EBF2FE] text-[#1D63ED] font-medium'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                : 'text-[#808080] hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Icon
              icon={activeNav === 'Liquidity' ? 'solar:money-bag-bold' : 'solar:money-bag-linear'}
              className={`w-5 h-5 ${
                activeNav === 'Liquidity'
                  ? isDark
                    ? 'text-blue-400'
                    : 'text-[#1D63ED]'
                  : isDark
                  ? 'text-slate-400'
                  : 'text-[#808080]'
              }`}
            />
            <span>Liquidity</span>
          </button>

          {/* Activity */}
          <button
            id="nav-activity"
            onClick={() => handleNavClick('Activity')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
              activeNav === 'Activity'
                ? isDark
                  ? 'bg-blue-950/60 text-blue-400 font-medium'
                  : 'bg-[#EBF2FE] text-[#1D63ED] font-medium'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                : 'text-[#808080] hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Icon
              icon={activeNav === 'Activity' ? 'solar:chart-square-bold' : 'solar:chart-square-linear'}
              className={`w-5 h-5 ${
                activeNav === 'Activity'
                  ? isDark
                    ? 'text-blue-400'
                    : 'text-[#1D63ED]'
                  : isDark
                  ? 'text-slate-400'
                  : 'text-[#808080]'
              }`}
            />
            <span>Activity</span>
          </button>

          {/* Divider */}
          <div className="my-2 border-t border-slate-100 dark:border-slate-800" />

          {/* Schedule Audit */}
          <button
            id="nav-schedule-audit"
            onClick={() => handleNavClick('Schedule Audit', onOpenSchedule)}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
              activeNav === 'Schedule Audit'
                ? isDark
                  ? 'bg-blue-950/60 text-blue-400 font-medium'
                  : 'bg-[#EBF2FE] text-[#1D63ED] font-medium'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                : 'text-[#808080] hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Icon
              icon={activeNav === 'Schedule Audit' ? 'solar:calendar-date-bold' : 'solar:calendar-date-linear'}
              className={`w-5 h-5 ${
                activeNav === 'Schedule Audit'
                  ? isDark
                    ? 'text-blue-400'
                    : 'text-[#1D63ED]'
                  : isDark
                  ? 'text-slate-400'
                  : 'text-[#808080]'
              }`}
            />
            <span>Schedule Audit</span>
          </button>

          {/* Audit History */}
          <button
            id="nav-audit-history"
            onClick={() => handleNavClick('Audit History')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
              activeNav === 'Audit History'
                ? isDark
                  ? 'bg-blue-950/60 text-blue-400 font-medium'
                  : 'bg-[#EBF2FE] text-[#1D63ED] font-medium'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                : 'text-[#808080] hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Icon
              icon={activeNav === 'Audit History' ? 'solar:history-bold' : 'solar:history-linear'}
              className={`w-5 h-5 ${
                activeNav === 'Audit History'
                  ? isDark
                    ? 'text-blue-400'
                    : 'text-[#1D63ED]'
                  : isDark
                  ? 'text-slate-400'
                  : 'text-[#808080]'
              }`}
            />
            <span>Audit History</span>
          </button>

          {/* Markets */}
          <button
            id="nav-markets"
            onClick={() => handleNavClick('Markets')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
              activeNav === 'Markets'
                ? isDark
                  ? 'bg-blue-950/60 text-blue-400 font-medium'
                  : 'bg-[#EBF2FE] text-[#1D63ED] font-medium'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                : 'text-[#808080] hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Icon
              icon={activeNav === 'Markets' ? 'solar:graph-up-bold' : 'solar:graph-up-linear'}
              className={`w-5 h-5 ${
                activeNav === 'Markets'
                  ? isDark
                    ? 'text-blue-400'
                    : 'text-[#1D63ED]'
                  : isDark
                  ? 'text-slate-400'
                  : 'text-[#808080]'
              }`}
            />
            <span>Markets</span>
          </button>

          {/* Divider */}
          <div className="my-2 border-t border-slate-100 dark:border-slate-800" />

          {/* Help */}
          <button
            id="nav-help"
            onClick={() => handleNavClick('Help')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
              activeNav === 'Help'
                ? isDark
                  ? 'bg-blue-950/60 text-blue-400 font-medium'
                  : 'bg-[#EBF2FE] text-[#1D63ED] font-medium'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                : 'text-[#808080] hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Icon
              icon={activeNav === 'Help' ? 'solar:question-circle-bold' : 'solar:question-circle-linear'}
              className={`w-5 h-5 ${
                activeNav === 'Help'
                  ? isDark
                    ? 'text-blue-400'
                    : 'text-[#1D63ED]'
                  : isDark
                  ? 'text-slate-400'
                  : 'text-[#808080]'
              }`}
            />
            <span>Help</span>
          </button>

          {/* Theme */}
          <button
            id="nav-theme"
            onClick={onToggleTheme}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer text-[#808080] dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            <Icon icon="ph:circle-half-fill" className="w-5 h-5 text-[#808080]" />
            <span>Theme</span>
          </button>

          {/* Settings */}
          <button
            id="nav-settings"
            onClick={() => handleNavClick('Settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
              activeNav === 'Settings'
                ? isDark
                  ? 'bg-blue-950/60 text-blue-400 font-medium'
                  : 'bg-[#EBF2FE] text-[#1D63ED] font-medium'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                : 'text-[#808080] hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Icon
              icon={activeNav === 'Settings' ? 'solar:settings-bold' : 'solar:settings-linear'}
              className={`w-5 h-5 ${
                activeNav === 'Settings'
                  ? isDark
                    ? 'text-blue-400'
                    : 'text-[#1D63ED]'
                  : isDark
                  ? 'text-slate-400'
                  : 'text-[#808080]'
              }`}
            />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Footer Area */}
      <div className="flex flex-col gap-5 pt-4">
        {/* Portfolio Audit progress */}
        <div className="flex flex-col gap-2 px-1">
          <div
            className={`text-xs font-normal ${
              isDark ? 'text-slate-400' : 'text-[#808080]'
            }`}
          >
            Portfolio Audit in 13 days
          </div>
          <div className="relative w-full h-4 bg-[#C9DCF8] dark:bg-slate-700 rounded-md overflow-hidden flex items-center">
            {/* Dark navy active fill with white indicator line */}
            <div
              className="h-full bg-[#0F2447] dark:bg-blue-600 relative rounded-l-sm"
              style={{ width: '70%' }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white opacity-90 shadow-sm" />
            </div>
          </div>
        </div>

        {/* User Profile Card */}
        <div
          id="user-profile-widget"
          className={`flex items-center justify-between p-2 rounded-xl transition-colors cursor-pointer ${
            isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#DCEBFE] dark:bg-blue-900/60 text-[#1D63ED] dark:text-blue-300 font-medium text-xs flex items-center justify-center flex-shrink-0">
              OO
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className={`text-xs font-medium truncate ${
                  isDark ? 'text-slate-200' : 'text-slate-900'
                }`}
              >
                Oluwabukunmi Ogunneye
              </span>
              <span className="text-[11px] text-[#808080] truncate">
                bukunmiogunneye0@gmail.com
              </span>
            </div>
          </div>
          <ChevronsUpDown className="w-3.5 h-3.5 text-[#808080] flex-shrink-0 ml-1" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        id="main-sidebar"
        className={`hidden md:flex w-64 flex-shrink-0 flex-col justify-between border-r ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-200'
            : 'bg-white border-slate-200/80 text-slate-700'
        } min-h-screen p-5 select-none transition-colors duration-200`}
      >
        {renderNavContent()}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer Body */}
          <aside
            id="mobile-sidebar"
            className={`relative z-10 w-72 max-w-[85vw] flex flex-col justify-between border-r shadow-2xl ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-200'
                : 'bg-white border-slate-200 text-slate-700'
            } min-h-full p-5 select-none overflow-y-auto`}
          >
            {renderNavContent()}
          </aside>
        </div>
      )}
    </>
  );
};

