import React, { useState } from 'react';
import { Icon } from '@iconify/react';

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

interface FeeHoldingRow {
  id: string;
  name: string;
  feeRate: string;
  feePaid: string;
}

const HOLDINGS_FEES: FeeHoldingRow[] = [
  {
    id: 'h1',
    name: 'Global Equity Fund (Managed — Diversified)',
    feeRate: '0.85%',
    feePaid: '$15,304',
  },
  {
    id: 'h2',
    name: 'Private Credit Portfolio (illiquid — locked until 2028)',
    feeRate: '1.95%',
    feePaid: '$20,063',
  },
  {
    id: 'h3',
    name: 'Fixed Income Ladder (Investment grade)',
    feeRate: '0.55%',
    feePaid: '$4,480',
  },
  {
    id: 'h4',
    name: 'Cash & Alternatives (Money market + hedges)',
    feeRate: '0.00%',
    feePaid: '$0',
  },
  {
    id: 'h5',
    name: 'Advisory & platform fee',
    feeRate: '0.30%',
    feePaid: '$13,093',
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

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full animate-in fade-in duration-200">
      {/* Top 3 KPI Summary Cards matching Kunmi3.png */}
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
              $2,700,000
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
            className={`text-[11px] sm:text-xs mt-2.5 sm:mt-3 font-normal ${
              isDark ? 'text-slate-400' : 'text-[#808080]'
            }`}
          >
            Last Month: $2,000,090
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
              <span>30.16%</span>
            </div>
          </div>

          <div
            className={`text-[11px] sm:text-xs mt-2.5 sm:mt-3 font-normal ${
              isDark ? 'text-slate-400' : 'text-[#808080]'
            }`}
          >
            Last Month: $3,289,090
          </div>
        </div>

        {/* Card 3: YTD Return */}
        <div
          id="kpi-ytd-return"
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
              YTD Return
            </span>
          </div>

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
            $289,090 Increase
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

      {/* Bottom Table: Holdings Fee Rates & Paid matching Kunmi3.png */}
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
                <th className="py-4 sm:py-5 px-4 sm:px-6 font-medium w-[58%]">
                  Holdings
                </th>
                <th className="py-4 sm:py-5 px-4 sm:px-6 font-medium w-[22%]">
                  Fee Rate
                </th>
                <th className="py-4 sm:py-5 px-4 sm:px-6 font-medium w-[20%] text-right sm:text-left">
                  Fee Paid
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="text-xs sm:text-sm">
              {HOLDINGS_FEES.map((row, index) => (
                <tr
                  key={row.id}
                  id={`liquidity-holding-row-${row.id}`}
                  className={`transition-colors ${
                    index !== HOLDINGS_FEES.length - 1
                      ? isDark
                        ? 'border-b border-slate-800'
                        : 'border-b border-slate-200/70'
                      : ''
                  } ${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50/50'}`}
                >
                  {/* Name */}
                  <td
                    className={`py-4 sm:py-5 px-4 sm:px-6 font-normal ${
                      isDark ? 'text-slate-200' : 'text-[#1e1e1e]'
                    }`}
                  >
                    {row.name}
                  </td>

                  {/* Fee Rate */}
                  <td
                    className={`py-4 sm:py-5 px-4 sm:px-6 font-normal ${
                      isDark ? 'text-slate-400' : 'text-[#808080]'
                    }`}
                  >
                    {row.feeRate}
                  </td>

                  {/* Fee Paid */}
                  <td
                    className={`py-4 sm:py-5 px-4 sm:px-6 font-normal text-right sm:text-left ${
                      isDark ? 'text-slate-400' : 'text-[#808080]'
                    }`}
                  >
                    {row.feePaid}
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
