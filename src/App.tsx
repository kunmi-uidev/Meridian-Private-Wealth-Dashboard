/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MetricCards } from './components/MetricCards';
import { AssetPerformanceChart } from './components/AssetPerformanceChart';
import { PortfolioAllocation } from './components/PortfolioAllocation';
import { HoldingsTable } from './components/HoldingsTable';
import { FeesView } from './components/FeesView';
import { LiquidityView } from './components/LiquidityView';
import { AdvisorModal } from './components/AdvisorModal';
import { ScheduleAuditModal } from './components/ScheduleAuditModal';
import { SettingsModal } from './components/SettingsModal';
import { OnboardingModal } from './components/OnboardingModal';
import { LoginView } from './components/LoginView';

export default function App() {
  // Persistent Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('meridian_auth');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  // Persistent User Data
  const [user, setUser] = useState<{ name: string; email: string }>(() => {
    try {
      const saved = localStorage.getItem('meridian_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.name === 'string' && parsed.name.trim()) {
          return parsed;
        }
      }
    } catch {}
    return { name: '', email: '' };
  });

  // Persistent Reading Mode ('simple' | 'expert')
  const [readingMode, setReadingMode] = useState<'simple' | 'expert'>(() => {
    try {
      const saved = localStorage.getItem('meridian_reading_mode');
      if (saved === 'expert' || saved === 'simple') return saved;
    } catch {}
    return 'simple';
  });

  // Onboarding Modal opens only if user hasn't finished onboarding yet
  const [onboardingOpen, setOnboardingOpen] = useState<boolean>(() => {
    try {
      const completed = localStorage.getItem('meridian_onboarding_completed');
      const auth = localStorage.getItem('meridian_auth');
      if (auth === 'true' && completed === 'true') {
        return false;
      }
    } catch {}
    return false;
  });

  const [activeNav, setActiveNav] = useState('Overview');
  const [activeTab, setActiveTab] = useState('Overview');

  // Persistent Dark Theme
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('meridian_theme') === 'dark';
    } catch {
      return false;
    }
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('meridian_theme', next ? 'dark' : 'light');
      } catch {}
      return next;
    });
  };

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData);
    setIsAuthenticated(true);
    setOnboardingOpen(true);
    try {
      localStorage.setItem('meridian_auth', 'true');
      localStorage.setItem('meridian_user', JSON.stringify(userData));
    } catch (e) {
      console.error('Failed to persist auth to localStorage', e);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('meridian_auth');
      localStorage.removeItem('meridian_user');
      localStorage.removeItem('meridian_onboarding_completed');
    } catch (e) {
      console.error('Failed to clear localStorage', e);
    }
  };

  const handleSelectMode = (mode: 'simple' | 'expert') => {
    setReadingMode(mode);
    try {
      localStorage.setItem('meridian_reading_mode', mode);
      localStorage.setItem('meridian_onboarding_completed', 'true');
    } catch (e) {
      console.error('Failed to persist reading mode', e);
    }
  };

  // Login flow prior to onboarding
  if (!isAuthenticated) {
    return (
      <LoginView
        onNext={handleLogin}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
    );
  }

  return (
    <div
      className={`min-h-screen flex font-sans transition-colors duration-200 ${
        isDark ? 'bg-slate-950 text-slate-100 dark' : 'bg-[#F8F9FA] text-slate-900'
      }`}
    >
      {/* Sidebar (Responsive: desktop persistent + mobile drawer) */}
      <Sidebar
        activeNav={activeNav}
        setActiveNav={(nav) => {
          setActiveNav(nav);
          if (['Overview', 'Fees', 'Liquidity'].includes(nav)) {
            setActiveTab(nav);
          }
        }}
        onOpenAdvisor={() => setAdvisorModalOpen(true)}
        onOpenSchedule={() => setScheduleModalOpen(true)}
        onToggleTheme={toggleTheme}
        onOpenOnboarding={() => setOnboardingOpen(true)}
        readingMode={readingMode}
        user={user}
        onLogout={handleLogout}
        isDark={isDark}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="max-w-[1400px] w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col gap-5 sm:gap-6">
          {/* Header */}
          <Header
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setActiveNav(tab);
            }}
            onOpenAdvisor={() => setAdvisorModalOpen(true)}
            onToggleTheme={toggleTheme}
            onOpenSettings={() => setSettingsModalOpen(true)}
            onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
            userName={user.name}
            isDark={isDark}
          />

          {/* Tab Content Switching */}
          {activeTab === 'Fees' ? (
            <FeesView isDark={isDark} />
          ) : activeTab === 'Liquidity' ? (
            <LiquidityView isDark={isDark} />
          ) : (
            <>
              {/* Top 4 KPI Summary Cards */}
              <MetricCards isDark={isDark} />

              {/* Middle Row: Asset Performance + Portfolio Allocation */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
                <AssetPerformanceChart isDark={isDark} />
                <PortfolioAllocation isDark={isDark} />
              </div>

              {/* Bottom Table: Holdings */}
              <HoldingsTable isDark={isDark} />
            </>
          )}
        </div>
      </main>

      {/* Modals */}
      <AdvisorModal
        isOpen={advisorModalOpen}
        onClose={() => setAdvisorModalOpen(false)}
        isDark={isDark}
      />

      <ScheduleAuditModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        isDark={isDark}
      />

      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        isDark={isDark}
        userName={user.name}
        selectedMode={readingMode}
        onSelectMode={handleSelectMode}
      />
    </div>
  );
}
