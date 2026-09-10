import React, { useState } from 'react';
import { Info, X, CheckCircle2, TrendingUp, Calculator } from 'lucide-react';

interface FeesViewProps {
  isDark: boolean;
  readingMode?: 'simple' | 'expert' | null;
}

interface FeeItem {
  id: string;
  name: string;
  simpleName: string;
  description: string;
  feeRate: string;
  ratePerThousand?: string;
  feePaid: string;
  statusBadge?: string;
  isFree?: boolean;
}

const FEE_HOLDINGS_SIMPLE: FeeItem[] = [
  {
    id: 'f1',
    name: 'Global Stocks',
    simpleName: 'Global Stocks',
    description: 'Small pieces of worldwide companies — management and index tracking fees across global equity markets.',
    feeRate: '0.85%',
    feePaid: '$15,304',
  },
  {
    id: 'f2',
    name: 'Business Loans',
    simpleName: 'Business Loans',
    description: "Money lent directly to private businesses — fee for loan sourcing, underwriting, and risk monitoring until 2028.",
    feeRate: '1.95%',
    feePaid: '$20,063',
  },
  {
    id: 'f3',
    name: 'Safer Loans',
    simpleName: 'Safer Loans',
    description: 'Loans to governments and large, stable companies — low-risk bond custody and administration fees.',
    feeRate: '0.55%',
    feePaid: '$4,480',
  },
  {
    id: 'f4',
    name: 'Cash',
    simpleName: 'Cash',
    description: 'Regular cash kept safe and liquid — 100% free of management fees with instant access anytime.',
    feeRate: '0.00%',
    feePaid: '$0',
    isFree: true,
  },
  {
    id: 'f5',
    name: 'Global Stocks',
    simpleName: 'Global Stocks',
    description: 'Direct company equity holdings — international trading, custodial safekeeping, and dividend reinvestment.',
    feeRate: '0.30%',
    feePaid: '$13,093',
  },
];

const FEE_HOLDINGS_EXPERT: FeeItem[] = [
  {
    id: 'f1',
    name: 'Global Equity Fund (Managed — Diversified)',
    simpleName: 'Global Stocks',
    description: 'Small pieces of worldwide companies with active diversification and risk rebalancing.',
    feeRate: '0.85%',
    ratePerThousand: '$8.50 per $1,000 invested / yr',
    feePaid: '$15,304',
  },
  {
    id: 'f2',
    name: 'Private Credit Portfolio (illiquid — locked until 2028)',
    simpleName: 'Business Loans',
    description: "Money lent directly to vetted private businesses earning steady contractual income — locked until 2028.",
    feeRate: '1.95%',
    ratePerThousand: '$19.50 per $1,000 invested / yr',
    feePaid: '$20,063',
  },
  {
    id: 'f3',
    name: 'Fixed Income Ladder (Investment grade)',
    simpleName: 'Safer Loans',
    description: 'Government and stable corporate bonds considered low-risk, paying predictable interest income.',
    feeRate: '0.55%',
    ratePerThousand: '$5.50 per $1,000 invested / yr',
    feePaid: '$4,480',
  },
  {
    id: 'f4',
    name: 'Cash & Alternatives (Money market + hedges)',
    simpleName: 'Cash',
    description: 'Liquid cash and high-yield money market reserves kept safe and easy to access anytime with zero lockup.',
    feeRate: '0.00%',
    ratePerThousand: '100% Free of management fees',
    feePaid: '$0',
    isFree: true,
  },
  {
    id: 'f5',
    name: 'Secondary Equity / Advisory sleeve',
    simpleName: 'Global Stocks',
    description: 'Direct company equity holdings — international trading, custodial safekeeping, and dividend reinvestment.',
    feeRate: '0.30%',
    ratePerThousand: '$3.00 per $1,000 invested / yr',
    feePaid: '$13,093',
  },
];

export const FeesView: React.FC<FeesViewProps> = ({ isDark, readingMode }) => {
  const isSimple = readingMode === 'simple';
  const feeList = isSimple ? FEE_HOLDINGS_SIMPLE : FEE_HOLDINGS_EXPERT;
  const [showCalculationModal, setShowCalculationModal] = useState(false);
  const [expandedRowIds, setExpandedRowIds] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    setExpandedRowIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full animate-in fade-in duration-200">
      {/* Top 3 KPI Summary Cards matching the screenshot layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 w-full">
        {/* Card 1: This Year's Total Fees */}
        <div
          id="fee-card-total"
          className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 relative ${
            isDark
              ? 'bg-slate-900/80 border-slate-800'
              : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs sm:text-sm font-normal ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              This Year's Fees
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-2.5 sm:mt-3">
            <span
              className={`text-xl sm:text-2xl lg:text-[28px] font-medium tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              $38,582.46
            </span>

            {/* Percentage Badge */}
            <div
              className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-xs font-medium ${
                isDark
                  ? 'bg-rose-950/60 text-rose-400'
                  : 'bg-[#FEECEB] text-[#DC2626]'
              }`}
            >
              <span className="text-[10px]">▼</span>
              <span>0.9%</span>
            </div>
          </div>

          <div
            className={`text-xs sm:text-[13px] mt-3 font-normal ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            About $1 for every $80 you have invested
          </div>
        </div>

        {/* Card 2: 10-Year Impact */}
        <div
          id="fee-card-10yr"
          className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 relative ${
            isDark
              ? 'bg-slate-900/80 border-slate-800'
              : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs sm:text-sm font-normal ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              10-Year Impact
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-2.5 sm:mt-3">
            <span
              className={`text-xl sm:text-2xl lg:text-[28px] font-medium tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              $627,500
            </span>

            {/* Percentage Badge */}
            <div
              className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-xs font-medium ${
                isDark
                  ? 'bg-emerald-950/60 text-emerald-400'
                  : 'bg-[#E9F9EE] text-[#16A34A]'
              }`}
            >
              <span className="text-[10px]">▲</span>
              <span>1.8%</span>
            </div>
          </div>

          <div className="mt-3">
            <button
              type="button"
              id="how-we-calculated-button"
              onClick={() => setShowCalculationModal(true)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] text-[#1D63ED] dark:text-sky-400 hover:text-blue-700 dark:hover:text-sky-300 font-normal transition-colors cursor-pointer group"
            >
              <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1D63ED] dark:text-sky-400 group-hover:scale-110 transition-transform" />
              <span className="hover:underline">How we calculated this</span>
            </button>
          </div>
        </div>

        {/* Card 3: This year's profit */}
        <div
          id="fee-card-profit"
          className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 relative ${
            isDark
              ? 'bg-slate-900/80 border-slate-800'
              : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs sm:text-sm font-normal ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              This year's profit
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-2.5 sm:mt-3">
            <span
              className={`text-xl sm:text-2xl lg:text-[28px] font-medium tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              $338,196
            </span>

            {/* Percentage Badge */}
            <div
              className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-xs font-medium ${
                isDark
                  ? 'bg-emerald-950/60 text-emerald-400'
                  : 'bg-[#E9F9EE] text-[#16A34A]'
              }`}
            >
              <span className="text-[10px]">▲</span>
              <span>7.9%</span>
            </div>
          </div>

          <div
            className={`text-xs sm:text-[13px] mt-3 font-normal ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Last year: $240,510
          </div>
        </div>
      </div>

      {/* Holdings Fees Table */}
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
            {/* Header matching screenshot */}
            <thead>
              <tr
                className={`border-b text-xs sm:text-sm ${
                  isDark
                    ? 'border-slate-800 text-slate-200'
                    : 'border-slate-200/70 text-[#1e1e1e]'
                }`}
              >
                <th className="py-4 sm:py-5 px-4 sm:px-6 font-medium w-[52%]">
                  Holdings
                </th>
                <th className="py-4 sm:py-5 px-4 sm:px-6 font-medium w-[24%]">
                  Fee Rate
                </th>
                <th className="py-4 sm:py-5 px-4 sm:px-6 font-medium w-[24%] pr-6 sm:pr-8">
                  Fee Paid
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="text-xs sm:text-sm">
              {feeList.map((row, index) => {
                const isExpanded = expandedRowIds.has(row.id);

                return (
                  <tr
                    key={row.id}
                    id={`fee-row-${row.id}`}
                    onClick={() => toggleRow(row.id)}
                    className={`group transition-all duration-150 cursor-pointer select-none ${
                      index !== feeList.length - 1
                        ? isDark
                          ? 'border-b border-slate-800'
                          : 'border-b border-slate-200/70'
                        : ''
                    } ${
                      isDark
                        ? 'hover:bg-slate-800/50 active:bg-slate-800/70'
                        : 'hover:bg-slate-50/80 active:bg-slate-100/60'
                    } ${
                      isExpanded
                        ? isDark
                          ? 'bg-slate-800/30'
                          : 'bg-blue-50/20'
                        : ''
                    }`}
                  >
                    {/* Holding Name & Expandable Description */}
                    <td className="py-4 sm:py-5 px-4 sm:px-6 align-top">
                      <div className="flex flex-col">
                        <span
                          className={`font-normal text-xs sm:text-sm transition-colors duration-150 ${
                            isDark ? 'text-slate-200' : 'text-[#1e1e1e]'
                          } group-hover:text-[#1D63ED] dark:group-hover:text-sky-400`}
                        >
                          {isSimple ? row.simpleName : row.name}
                        </span>

                        {/* Description ONLY shown when row is clicked */}
                        {isExpanded && (
                          <p
                            className={`text-[11px] sm:text-xs font-normal leading-relaxed mt-2 animate-in fade-in duration-200 ${
                              isDark ? 'text-slate-400' : 'text-[#808080]'
                            }`}
                          >
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
                      <span className="font-normal text-slate-700 dark:text-slate-300">
                        {row.feeRate}
                      </span>
                    </td>

                    {/* Fee Paid with right-edge Info Icon */}
                    <td
                      className={`py-4 sm:py-5 px-4 sm:px-6 pr-6 sm:pr-8 align-top font-normal ${
                        isDark ? 'text-slate-400' : 'text-[#808080]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-normal ${
                            isDark ? 'text-slate-200' : 'text-[#1e1e1e]'
                          }`}
                        >
                          {row.feePaid}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRow(row.id);
                          }}
                          title={
                            isExpanded
                              ? `Hide explanation for ${row.simpleName}`
                              : `View explanation for ${row.simpleName}`
                          }
                          className="p-1 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors ml-3 cursor-pointer"
                        >
                          <Info
                            className={`w-4 h-4 transition-colors ${
                              isExpanded
                                ? 'text-[#1D63ED] dark:text-sky-400'
                                : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                            }`}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 10-Year Calculation Modal */}
      {showCalculationModal && (
        <div
          id="calculation-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setShowCalculationModal(false)}
        >
          <div
            id="calculation-modal-card"
            className={`w-full max-w-lg rounded-2xl p-6 sm:p-7 shadow-2xl border transition-all ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#1D63ED] dark:text-sky-400 flex items-center justify-center">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold tracking-tight">
                    How We Calculated the 10-Year Impact
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Transparent compounding fee modeling
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCalculationModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-4 space-y-4 text-xs sm:text-sm">
              <div
                className={`p-3.5 rounded-xl border ${
                  isDark
                    ? 'bg-slate-800/50 border-slate-700/60'
                    : 'bg-slate-50 border-slate-200/70'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-slate-500 dark:text-slate-400">
                    Projected 10-Year Total Fee Drag
                  </span>
                  <span className="text-base font-semibold text-slate-900 dark:text-white">
                    $627,500
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Current Portfolio Value</span>
                  <span>$4,280,960</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>Blended Annual Fee Rate</span>
                  <span>0.90%</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>Assumed Annual Portfolio Growth</span>
                  <span>7.0% / year</span>
                </div>
              </div>

              <div className="space-y-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Direct Fees Paid:</strong> Approximately $478,200 in total advisory, custody, and fund management fees over 10 years.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-[#1D63ED] dark:text-sky-400 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Compounding Effect:</strong> ~$149,300 in foregone compound growth that would have been earned on fee payments.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm">💡</span>
                  <p>
                    <strong>Your Net Benefit:</strong> By keeping fees at 0.90% instead of the standard 1.50% wealth management tier, you preserve over <strong>$392,500</strong> in additional wealth.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setShowCalculationModal(false)}
                className="px-4 py-2 text-xs font-medium rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition-opacity cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
