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

export default function App() {
  const [activeNav, setActiveNav] = useState('Overview');
  const [activeTab, setActiveTab] = useState('Overview');
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

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
    </div>
  );
}
