import React, { useState } from 'react';
import { Icon } from '@iconify/react';

interface FeesViewProps {
  isDark: boolean;
}

interface FeeItem {
  id: string;
  name: string;
  simpleName: string;
  description: string;
  feeRate: string;
  ratePerThousand: string;
  feePaid: string;
  statusBadge?: string;
  isFree?: boolean;
}

const FEE_HOLDINGS: FeeItem[] = [
  {
    id: 'f1',
    name: 'Global Equity Fund (Managed — Diversified)',
    simpleName: 'Global Stock Fund',
    description: 'Shares in ~1,200 leading worldwide companies (Apple, Microsoft, etc.) with active management.',
    feeRate: '0.85%',
    ratePerThousand: '$8.50 per $1,000 invested / yr',
    feePaid: '$15,304',
  },
  {
    id: 'f2',
    name: 'Private Credit Portfolio (illiquid — locked until 2028)',
    simpleName: 'Private Business Loans',
    description: 'Direct loans to vetted private companies earning higher interest. Committed until 2028 for stability.',
    feeRate: '1.95%',
    ratePerThousand: '$19.50 per $1,000 invested / yr',
    feePaid: '$20,063',
  },
  {
    id: 'f3',
    name: 'Fixed Income Ladder (Investment grade)',
    simpleName: 'Government & Corporate Bonds',
    description: 'Safe, low-risk bonds that pay steady and dependable interest income over time.',
    feeRate: '0.55%',
    ratePerThousand: '$5.50 per $1,000 invested / yr',
    feePaid: '$4,480',
  },
  {
    id: 'f4',
    name: 'Cash & Alternatives (Money market + hedges)',
    simpleName: 'Cash Reserves & Money Market',
    description: 'Instant cash and high-yield reserves ready for withdrawal anytime with zero lockup.',
    feeRate: '0.00%',
    ratePerThousand: '100% Free of management fees',
    feePaid: '$0',
    isFree: true,
  },
  {
    id: 'f5',
    name: 'Advisory & platform fee',
    simpleName: 'Personal Advisor & Meridian Platform',
    description: 'Direct access to your advisor (Mark T.), quarterly portfolio audits, tax rebalancing, and secure custody.',
    feeRate: '0.30%',
    ratePerThousand: '$3.00 per $1,000 invested / yr',
    feePaid: '$13,093',
  },
];

export const FeesView: React.FC<FeesViewProps> = ({ isDark }) => {
  const [showPlainEnglish, setShowPlainEnglish] = useState(true);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full animate-in fade-in duration-200">
      {/* Top 3 KPI Summary Cards matching the screenshot layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 w-full">
        {/* Card 1: This Year's Total Fees */}
        <div
          id="fee-card-total"
          className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 relative ${
            isDark
              ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span
                className={`text-xs sm:text-sm font-normal ${
                  isDark ? 'text-slate-400' : 'text-[#808080]'
                }`}
              >
                This Year's Fees
              </span>
              <button
                onClick={() => setActiveTooltip(activeTooltip === 'fees' ? null : 'fees')}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                title="What is this?"
              >
                <Icon icon="solar:info-circle-linear" className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {activeTooltip === 'fees' && (
            <div className="mt-2 p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200">
              The total cost paid across all your investments to cover management, custody, and advisor services.
            </div>
          )}

          <div className="flex items-center justify-between gap-2 mt-2 sm:mt-3">
            <span
              className={`text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-medium tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              $280,960
            </span>

            {/* Percentage Badge */}
            <div
              className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-xs font-medium ${
                isDark
                  ? 'bg-rose-950/60 text-rose-400'
                  : 'bg-[#FEECEB] text-[#DC2626]'
              }`}
            >
              <span className="text-[9px] sm:text-[10px]">▼</span>
              <span>1.24%</span>
            </div>
          </div>

          <div
            className={`text-[11px] sm:text-xs mt-2.5 sm:mt-3 font-normal ${
              isDark ? 'text-slate-400' : 'text-[#808080]'
            }`}
          >
            {showPlainEnglish ? (
              <span className="text-slate-600 dark:text-slate-300">
                <strong className="font-medium text-slate-900 dark:text-slate-100">1.24% average fee</strong> (You save vs 1.50% industry standard)
              </span>
            ) : (
              '1.24% Blended'
            )}
          </div>
        </div>

        {/* Card 2: 10-Year Impact */}
        <div
          id="fee-card-10yr"
          className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 relative ${
            isDark
              ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span
                className={`text-xs sm:text-sm font-normal ${
                  isDark ? 'text-slate-400' : 'text-[#808080]'
                }`}
              >
                10-Year Impact
              </span>
              <button
                onClick={() => setActiveTooltip(activeTooltip === 'impact' ? null : 'impact')}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                title="What is this?"
              >
                <Icon icon="solar:info-circle-linear" className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {activeTooltip === 'impact' && (
            <div className="mt-2 p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200">
              Estimated total fees over a decade of continuous compounding growth, keeping $3.6M+ in net profits for you.
            </div>
          )}

          <div className="flex items-center justify-between gap-2 mt-2 sm:mt-3">
            <span
              className={`text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-medium tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              $612,400
            </span>

            {/* Percentage Badge */}
            <div
              className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-xs font-medium ${
                isDark
                  ? 'bg-emerald-950/60 text-emerald-400'
                  : 'bg-[#E9F9EE] text-[#16A34A]'
              }`}
            >
              <span className="text-[9px] sm:text-[10px]">▲</span>
              <span>1.8%</span>
            </div>
          </div>

          <div
            className={`text-[11px] sm:text-xs mt-2.5 sm:mt-3 font-normal ${
              isDark ? 'text-slate-400' : 'text-[#808080]'
            }`}
          >
            {showPlainEnglish ? (
              <span className="text-slate-600 dark:text-slate-300">
                Estimated 10-yr fee while keeping <strong className="font-medium text-slate-900 dark:text-slate-100">$3.67M+ in net gains</strong>
              </span>
            ) : (
              'Projected Fee Drag'
            )}
          </div>
        </div>

        {/* Card 3: YTD Return */}
        <div
          id="fee-card-return"
          className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 relative ${
            isDark
              ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span
                className={`text-xs sm:text-sm font-normal ${
                  isDark ? 'text-slate-400' : 'text-[#808080]'
                }`}
              >
                YTD Return (After Fees)
              </span>
              <button
                onClick={() => setActiveTooltip(activeTooltip === 'return' ? null : 'return')}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                title="What is this?"
              >
                <Icon icon="solar:info-circle-linear" className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {activeTooltip === 'return' && (
            <div className="mt-2 p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200">
              Your pure take-home profit so far this year. All management, advisory, and platform fees are already fully deducted.
            </div>
          )}

          <div className="flex items-center justify-between gap-2 mt-2 sm:mt-3">
            <span
              className={`text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-medium tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              7.9%
            </span>

            {/* Percentage Badge */}
            <div
              className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-xs font-medium ${
                isDark
                  ? 'bg-emerald-950/60 text-emerald-400'
                  : 'bg-[#E9F9EE] text-[#16A34A]'
              }`}
            >
              <span className="text-[9px] sm:text-[10px]">▲</span>
              <span>1.8%</span>
            </div>
          </div>

          <div
            className={`text-[11px] sm:text-xs mt-2.5 sm:mt-3 font-normal ${
              isDark ? 'text-slate-400' : 'text-[#808080]'
            }`}
          >
            {showPlainEnglish ? (
              <span className="text-slate-600 dark:text-slate-300">
                <strong className="font-medium text-emerald-600 dark:text-emerald-400">+$289,090 profit</strong> added to your account after all fees
              </span>
            ) : (
              '$289,090 Increase'
            )}
          </div>
        </div>
      </div>

      {/* Beginner Clarity Helper Banner */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isDark
            ? 'bg-blue-950/30 border-blue-900/50 text-slate-300'
            : 'bg-[#F0F7FF] border-[#D0E6FC] text-slate-700'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#1D63ED]/10 text-[#1D63ED] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon icon="solar:lightbulb-bolt-bold" className="w-4 h-4 text-[#1D63ED]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white">
              Fee Summary in Plain English
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
              For every <strong>$1,000</strong> in your portfolio, you pay about <strong>$12.40 per year</strong> in total all-in fees. In return, your portfolio has generated <strong>+$79.00 per $1,000</strong> in take-home profit so far this year.
            </p>
          </div>
        </div>

        {/* Toggle plain English explanations */}
        <button
          onClick={() => setShowPlainEnglish(!showPlainEnglish)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium whitespace-nowrap cursor-pointer transition-all self-end sm:self-auto ${
            showPlainEnglish
              ? isDark
                ? 'bg-blue-900/40 border-blue-700 text-blue-300'
                : 'bg-white border-blue-200 text-[#1D63ED] shadow-2xs'
              : isDark
              ? 'bg-slate-800 border-slate-700 text-slate-400'
              : 'bg-white border-slate-200 text-slate-600'
          }`}
        >
          <Icon
            icon={showPlainEnglish ? 'solar:check-circle-bold' : 'solar:notes-linear'}
            className="w-3.5 h-3.5"
          />
          <span>{showPlainEnglish ? 'Beginner Explanations: On' : 'Standard View'}</span>
        </button>
      </div>

      {/* Holdings Fees Table matching the screenshot structure */}
      <div
        id="fees-table-card"
        className={`rounded-2xl border transition-all duration-200 ${
          isDark
            ? 'bg-slate-900/80 border-slate-800'
            : 'bg-white border-slate-200/80 shadow-xs'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[620px]">
            {/* Header */}
            <thead>
              <tr
                className={`border-b text-xs sm:text-sm ${
                  isDark
                    ? 'border-slate-800 text-slate-200'
                    : 'border-slate-200/70 text-[#1e1e1e]'
                }`}
              >
                <th className="py-4 sm:py-5 px-4 sm:px-6 font-medium w-[55%]">
                  Holdings & Services
                </th>
                <th className="py-4 sm:py-5 px-4 sm:px-6 font-medium w-[22%]">
                  Fee Rate
                </th>
                <th className="py-4 sm:py-5 px-4 sm:px-6 font-medium w-[23%] text-right sm:text-left">
                  Fee Paid
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="text-xs sm:text-sm">
              {FEE_HOLDINGS.map((row, index) => (
                <tr
                  key={row.id}
                  id={`fee-row-${row.id}`}
                  className={`transition-colors ${
                    index !== FEE_HOLDINGS.length - 1
                      ? isDark
                        ? 'border-b border-slate-800'
                        : 'border-b border-slate-200/70'
                      : ''
                  } ${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50/50'}`}
                >
                  {/* Holding Name & Description */}
                  <td className="py-4 sm:py-5 px-4 sm:px-6">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-normal ${
                            isDark ? 'text-slate-200' : 'text-[#1e1e1e]'
                          }`}
                        >
                          {row.name}
                        </span>
                        {row.isFree && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                            0% Free
                          </span>
                        )}
                      </div>

                      {/* Plain English Subtitle */}
                      {showPlainEnglish && (
                        <p className="text-[11px] sm:text-xs text-[#808080] font-normal leading-relaxed mt-0.5">
                          {row.description}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Fee Rate */}
                  <td
                    className={`py-4 sm:py-5 px-4 sm:px-6 align-top ${
                      isDark ? 'text-slate-400' : 'text-[#808080]'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-normal text-slate-700 dark:text-slate-300">
                        {row.feeRate}
                      </span>
                      {showPlainEnglish && (
                        <span className="text-[11px] text-[#808080] mt-0.5">
                          {row.ratePerThousand}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Fee Paid */}
                  <td
                    className={`py-4 sm:py-5 px-4 sm:px-6 align-top text-right sm:text-left font-normal ${
                      isDark ? 'text-slate-400' : 'text-[#808080]'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span
                        className={`font-normal ${
                          row.isFree
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : isDark
                            ? 'text-slate-200'
                            : 'text-[#1e1e1e]'
                        }`}
                      >
                        {row.feePaid}
                      </span>
                      {showPlainEnglish && !row.isFree && (
                        <span className="text-[11px] text-[#808080] mt-0.5">
                          Deducted from returns
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
