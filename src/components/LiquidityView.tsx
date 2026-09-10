import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { ChevronDown } from 'lucide-react';

interface LiquidityViewProps {
  isDark: boolean;
}

interface AllocationRow {
  id: string;
  name: string;
  amount: string;
  percentage: number;
  barClass: string;
  railColor: string;
}

const LIQUIDITY_ALLOCATIONS: AllocationRow[] = [
  {
    id: 'global-equities',
    name: 'Global Equities',
    amount: '$1.80M',
    percentage: 48,
    barClass: 'striped-bar-blue',
    railColor: 'bg-[#CBEBFC]',
  },
  {
    id: 'private-credit',
    name: 'Private Credit',
    amount: '$1.03M',
    percentage: 26,
    barClass: 'striped-bar-orange',
    railColor: 'bg-[#FFE2C8]',
  },
  {
    id: 'fixed-income',
    name: 'Fixed Income',
    amount: '$815K',
    percentage: 21,
    barClass: 'striped-bar-purple',
    railColor: 'bg-[#EBD2FD]',
  },
];

interface DonutSegment {
  id: string;
  name: string;
  amount: string;
  percentage: number;
  color: string;
  darkColor: string;
  startAngle: number;
  endAngle: number;
}

// Angles configured to match the screenshot Kunmi3.png exactly:
// Sky Blue (top/right), Orange (top-left), Purple (bottom-left), Lime (bottom-right)
const DONUT_SEGMENTS: DonutSegment[] = [
  {
    id: 'equities',
    name: 'Global Equities',
    amount: '$1.80M',
    percentage: 42,
    color: '#00A3FF',
    darkColor: '#00A3FF',
    startAngle: 345,
    endAngle: 496.2, // 345 + 151.2
  },
  {
    id: 'credit',
    name: 'Private Credit',
    amount: '$1.03M',
    percentage: 24,
    color: '#FF7A00',
    darkColor: '#FF7A00',
    startAngle: 136.2,
    endAngle: 222.6, // 136.2 + 86.4
  },
  {
    id: 'income',
    name: 'Fixed Income',
    amount: '$815K',
    percentage: 19,
    color: '#6D28D9',
    darkColor: '#7C3AED',
    startAngle: 222.6,
    endAngle: 291, // 222.6 + 68.4
  },
  {
    id: 'cash',
    name: 'Cash',
    amount: '$643K',
    percentage: 15,
    color: '#A3E635',
    darkColor: '#A3E635',
    startAngle: 291,
    endAngle: 345, // 291 + 54
  },
];

interface LiquidityHoldingRow {
  id: string;
  name: string;
  feePaid: string;
  status: 'Daily' | 'Locked' | 'Quarterly';
  explanation: string;
}

const LIQUIDITY_HOLDINGS: LiquidityHoldingRow[] = [
  {
    id: 'lh1',
    name: 'Global Stocks',
    feePaid: '$1.80M',
    status: 'Daily',
    explanation:
      'You can ask to take this money out whenever you like. It usually takes about 2 days to reach your account. No waiting periods.',
  },
  {
    id: 'lh2',
    name: 'Business Loans',
    feePaid: '$1.03M',
    status: 'Locked',
    explanation:
      "This money is lent out to businesses, so it can't be taken out early — it's stuck until March 2028. In exchange for waiting, it's designed to earn more than money you can access right away.",
  },
  {
    id: 'lh3',
    name: 'Safer Loans',
    feePaid: '$4,480',
    status: 'Quarterly',
    explanation:
      'You can only take money out on set dates, about once every 3 months. The next date you can do this is 1 Oct 2026.',
  },
  {
    id: 'lh4',
    name: 'Cash',
    feePaid: '$643K',
    status: 'Daily',
    explanation: 'This is just cash. You can take it out any time, right away.',
  },
];

function getDonutSlicePath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startAngleDeg: number,
  endAngleDeg: number,
  padAngle = 1.2
) {
  const rad = Math.PI / 180;
  const start = (startAngleDeg + padAngle) * rad;
  const end = (endAngleDeg - padAngle) * rad;

  const x1 = cx + rOuter * Math.cos(start);
  const y1 = cy + rOuter * Math.sin(start);
  const x2 = cx + rOuter * Math.cos(end);
  const y2 = cy + rOuter * Math.sin(end);

  const x3 = cx + rInner * Math.cos(end);
  const y3 = cy + rInner * Math.sin(end);
  const x4 = cx + rInner * Math.cos(start);
  const y4 = cy + rInner * Math.sin(start);

  const largeArc = endAngleDeg - startAngleDeg > 180 ? 1 : 0;

  return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4} Z`;
}

export const LiquidityView: React.FC<LiquidityViewProps> = ({ isDark }) => {
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);
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
      {/* Top 3 KPI Summary Cards matching the screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 w-full">
        {/* Card 1: Available Now */}
        <div
          id="kpi-available-now"
          className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
            isDark
              ? 'bg-slate-900/80 border-slate-800'
              : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs sm:text-sm font-normal ${
                isDark ? 'text-slate-400' : 'text-[#808080]'
              }`}
            >
              Available Now
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-2 sm:mt-3">
            <span
              className={`text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-medium tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              $2,697,000
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
              <span>35%</span>
            </div>
          </div>

          <div
            className={`text-xs sm:text-[13px] mt-2.5 sm:mt-3 font-normal ${
              isDark ? 'text-slate-400' : 'text-[#808080]'
            }`}
          >
            63% of Total Value
          </div>
        </div>

        {/* Card 2: Total Portfolio Value */}
        <div
          id="kpi-portfolio-value"
          className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
            isDark
              ? 'bg-slate-900/80 border-slate-800'
              : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs sm:text-sm font-normal ${
                isDark ? 'text-slate-400' : 'text-[#808080]'
              }`}
            >
              Total Portfolio Value
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-2 sm:mt-3">
            <span
              className={`text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-medium tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              $4,280,960
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
              <span>8.6%</span>
            </div>
          </div>

          <div
            className={`text-xs sm:text-[13px] mt-2.5 sm:mt-3 font-normal ${
              isDark ? 'text-slate-400' : 'text-[#808080]'
            }`}
          >
            Last Year: $3,942,764
          </div>
        </div>

        {/* Card 3: This year's profit */}
        <div
          id="kpi-ytd-profit"
          className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
            isDark
              ? 'bg-slate-900/80 border-slate-800'
              : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs sm:text-sm font-normal ${
                isDark ? 'text-slate-400' : 'text-[#808080]'
              }`}
            >
              This year's profit
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-2 sm:mt-3">
            <span
              className={`text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-medium tracking-tight ${
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
              <span className="text-[9px] sm:text-[10px]">▲</span>
              <span>7.9%</span>
            </div>
          </div>

          <div
            className={`text-xs sm:text-[13px] mt-2.5 sm:mt-3 font-normal ${
              isDark ? 'text-slate-400' : 'text-[#808080]'
            }`}
          >
            Last year: $240,510
          </div>
        </div>
      </div>

      {/* Middle Row: Two Portfolio Allocation Cards side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
        {/* Left Card: Horizontal Striped Bars Allocation */}
        <div
          id="liquidity-allocation-bars-card"
          className={`p-4 sm:p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
            isDark
              ? 'bg-slate-900/80 border-slate-800'
              : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          <div>
            <h2
              className={`text-sm sm:text-base font-medium tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Portfolio Allocation
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:gap-5 mt-4 sm:mt-5">
            {LIQUIDITY_ALLOCATIONS.map((item) => (
              <div key={item.id} className="flex flex-col gap-1.5">
                {/* Label & Amount */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span
                    className={`font-normal ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    className={`font-medium ${
                      isDark ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  >
                    {item.amount}
                  </span>
                </div>

                {/* Striped Track Bar */}
                <div
                  className={`relative w-full h-4 sm:h-5 rounded-md overflow-hidden ${
                    isDark ? 'bg-slate-800/80' : item.railColor
                  } flex items-center`}
                >
                  <div
                    className={`h-full ${item.barClass} rounded-l-md relative transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  >
                    {/* Vertical marker on the edge */}
                    <div className="absolute right-0 top-0.5 bottom-0.5 w-1.5 bg-white/90 rounded-sm shadow-xs" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: Donut Chart + 2x2 Grid Allocation matching Kunmi3.png */}
        <div
          id="liquidity-allocation-donut-card"
          className={`p-4 sm:p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
            isDark
              ? 'bg-slate-900/80 border-slate-800'
              : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          <div>
            <h2
              className={`text-sm sm:text-base font-medium tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Portfolio Allocation
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-3 sm:mt-4">
            {/* Donut Chart SVG */}
            <div className="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                {DONUT_SEGMENTS.map((seg) => {
                  const isHovered = hoveredSlice === seg.id;
                  return (
                    <path
                      key={seg.id}
                      d={getDonutSlicePath(
                        100,
                        100,
                        isHovered ? 92 : 88,
                        32,
                        seg.startAngle,
                        seg.endAngle
                      )}
                      fill={seg.color}
                      className="transition-all duration-300 cursor-pointer"
                      onMouseEnter={() => setHoveredSlice(seg.id)}
                      onMouseLeave={() => setHoveredSlice(null)}
                    />
                  );
                })}
                {/* Center Circle Cutout */}
                <circle
                  cx="100"
                  cy="100"
                  r="28"
                  fill={isDark ? '#0f172a' : '#ffffff'}
                  className="transition-colors duration-200"
                />
              </svg>
            </div>

            {/* 2x2 Legend Metric Grid matching Kunmi3.png */}
            <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-5 w-full">
              {/* Row 1 Col 1: Global Equities */}
              <div className="flex flex-col">
                <span
                  className={`text-xs sm:text-sm font-normal ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Global Equities
                </span>
                <span
                  className={`text-base sm:text-lg font-medium tracking-tight mt-0.5 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  $1.80M
                </span>
              </div>

              {/* Row 1 Col 2: Private Credit */}
              <div className="flex flex-col">
                <span
                  className={`text-xs sm:text-sm font-normal ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Private Credit
                </span>
                <span
                  className={`text-base sm:text-lg font-medium tracking-tight mt-0.5 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  $1.03M
                </span>
              </div>

              {/* Row 2 Col 1: Fixed Income */}
              <div className="flex flex-col">
                <span
                  className={`text-xs sm:text-sm font-normal ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Fixed Income
                </span>
                <span
                  className={`text-base sm:text-lg font-medium tracking-tight mt-0.5 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  $815K
                </span>
              </div>

              {/* Row 2 Col 2: Cash */}
              <div className="flex flex-col">
                <span
                  className={`text-xs sm:text-sm font-normal ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Cash
                </span>
                <span
                  className={`text-base sm:text-lg font-medium tracking-tight mt-0.5 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  $643K
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Table: Holdings, Fee Paid, Status matching the screenshot */}
      <div
        id="liquidity-holdings-table-card"
        className={`rounded-2xl border transition-all duration-200 ${
          isDark
            ? 'bg-slate-900/80 border-slate-800'
            : 'bg-white border-slate-200/80 shadow-xs'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[560px]">
            {/* Header */}
            <thead>
              <tr
                className={`border-b text-xs sm:text-sm ${
                  isDark
                    ? 'border-slate-800 text-slate-200'
                    : 'border-slate-200/70 text-[#1e1e1e]'
                }`}
              >
                <th className="py-4 sm:py-5 px-4 sm:px-6 font-medium w-[54%]">
                  Holdings
                </th>
                <th className="py-4 sm:py-5 px-4 sm:px-6 font-medium w-[24%]">
                  Fee Paid
                </th>
                <th className="py-4 sm:py-5 px-4 sm:px-6 font-medium w-[22%] pr-6 sm:pr-8">
                  Status
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="text-xs sm:text-sm">
              {LIQUIDITY_HOLDINGS.map((row, index) => {
                const isExpanded = expandedRowIds.has(row.id);

                return (
                  <tr
                    key={row.id}
                    id={`liquidity-holding-row-${row.id}`}
                    onClick={() => toggleRow(row.id)}
                    className={`group transition-all duration-150 cursor-pointer select-none ${
                      index !== LIQUIDITY_HOLDINGS.length - 1
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
                    {/* Holding Name & Expandable Explanation */}
                    <td className="py-4 sm:py-5 px-4 sm:px-6 align-top">
                      <div className="flex flex-col">
                        <span
                          className={`font-normal text-xs sm:text-sm transition-colors duration-150 ${
                            isDark ? 'text-slate-200' : 'text-[#1e1e1e]'
                          } group-hover:text-[#1D63ED] dark:group-hover:text-sky-400`}
                        >
                          {row.name}
                        </span>

                        {/* Explanation ONLY shown when row is clicked */}
                        {isExpanded && (
                          <p
                            className={`text-[11px] sm:text-xs font-normal leading-relaxed mt-2 animate-in fade-in duration-200 ${
                              isDark ? 'text-slate-400' : 'text-[#808080]'
                            }`}
                          >
                            {row.explanation}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Fee Paid */}
                    <td
                      className={`py-4 sm:py-5 px-4 sm:px-6 align-top font-normal ${
                        isDark ? 'text-slate-400' : 'text-[#808080]'
                      }`}
                    >
                      <span className="font-normal text-slate-700 dark:text-slate-300">
                        {row.feePaid}
                      </span>
                    </td>

                    {/* Status Badge + Chevron Icon */}
                    <td className="py-4 sm:py-5 px-4 sm:px-6 pr-6 sm:pr-8 align-top font-normal">
                      <div className="flex items-center justify-between">
                        <span
                          className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-normal tracking-wide ${
                            row.status === 'Daily'
                              ? isDark
                                ? 'bg-emerald-950/60 text-emerald-400'
                                : 'bg-[#DCFCE7] text-[#15803D]'
                              : row.status === 'Locked'
                              ? isDark
                                ? 'bg-rose-950/60 text-rose-400'
                                : 'bg-[#FEE2E2] text-[#DC2626]'
                              : isDark
                              ? 'bg-amber-950/60 text-amber-400'
                              : 'bg-[#FEF3C7] text-[#B45309]'
                          }`}
                        >
                          {row.status}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRow(row.id);
                          }}
                          title={isExpanded ? `Collapse ${row.name}` : `Expand ${row.name}`}
                          className="p-1 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors ml-2 cursor-pointer text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[#1D63ED] dark:text-sky-400' : ''
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
    </div>
  );
};
