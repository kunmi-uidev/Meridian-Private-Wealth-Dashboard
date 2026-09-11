import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { ChevronDown } from 'lucide-react';
import { CountUpNumber } from './CountUpNumber';

interface GlobalStocksViewProps {
  isDark: boolean;
  onBackToLiquidity: () => void;
}

interface StockItem {
  id: string;
  name: string;
  unitPrice: string;
  unitsHeld: string;
  currentRate: string;
  totalValue: string;
  exchange?: string;
  dayRange?: string;
  peRatio?: string;
  marketCap?: string;
}

const GLOBAL_STOCKS: StockItem[] = [
  {
    id: 'gs-1',
    name: 'Apple Inc.',
    unitPrice: '$182.40',
    unitsHeld: '1,850',
    currentRate: '14.2%',
    totalValue: '$337,440',
    exchange: 'NASDAQ: AAPL',
    dayRange: '$181.10 - $183.95',
    peRatio: '31.4x',
    marketCap: '$2.84T',
  },
  {
    id: 'gs-2',
    name: 'Microsoft Corporation',
    unitPrice: '$415.20',
    unitsHeld: '780',
    currentRate: '16.8%',
    totalValue: '$323,856',
    exchange: 'NASDAQ: MSFT',
    dayRange: '$412.50 - $418.00',
    peRatio: '35.8x',
    marketCap: '$3.09T',
  },
  {
    id: 'gs-3',
    name: 'Nvidia Corporation',
    unitPrice: '$122.50',
    unitsHeld: '2,400',
    currentRate: '38.5%',
    totalValue: '$294,000',
    exchange: 'NASDAQ: NVDA',
    dayRange: '$120.30 - $124.80',
    peRatio: '46.2x',
    marketCap: '$3.01T',
  },
  {
    id: 'gs-4',
    name: 'Amazon Inc.',
    unitPrice: '$122.50',
    unitsHeld: '2,400',
    currentRate: '11.3%',
    totalValue: '$211,568',
    exchange: 'NASDAQ: AMZN',
    dayRange: '$184.20 - $187.50',
    peRatio: '42.1x',
    marketCap: '$1.94T',
  },
  {
    id: 'gs-5',
    name: 'ASML Holding N.V.',
    unitPrice: '$122.50',
    unitsHeld: '2,400',
    currentRate: '9.7%',
    totalValue: '$169,100',
    exchange: 'NASDAQ: ASML',
    dayRange: '$880.00 - $898.40',
    peRatio: '41.0x',
    marketCap: '$352B',
  },
  {
    id: 'gs-6',
    name: 'Novo Nordisk A/S',
    unitPrice: '$122.50',
    unitsHeld: '2,400',
    currentRate: '21.4%',
    totalValue: '$122,176',
    exchange: 'NYSE: NVO',
    dayRange: '$128.40 - $131.20',
    peRatio: '38.9x',
    marketCap: '$580B',
  },
  {
    id: 'gs-7',
    name: 'Taiwan Semiconductor Manufacturing',
    unitPrice: '$122.50',
    unitsHeld: '2,400',
    currentRate: '15.6%',
    totalValue: '$106,762',
    exchange: 'NYSE: TSM',
    dayRange: '$164.00 - $169.50',
    peRatio: '28.3x',
    marketCap: '$860B',
  },
  {
    id: 'gs-8',
    name: 'Alphabet Inc. Class A',
    unitPrice: '$174.60',
    unitsHeld: '1,350',
    currentRate: '27.2%',
    totalValue: '$235,710',
    exchange: 'NASDAQ: GOOGL',
    dayRange: '$173.10 - $176.40',
    peRatio: '24.7x',
    marketCap: '$2.16T',
  },
];

export const GlobalStocksView: React.FC<GlobalStocksViewProps> = ({
  isDark,
  onBackToLiquidity,
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const exportCSV = () => {
    const headers = ['Name of Stocks', 'Unit Price', 'Units you hold', 'Current Rate', 'Total Value'];
    const rows = GLOBAL_STOCKS.map((stock) => [
      `"${stock.name}"`,
      `"${stock.unitPrice}"`,
      `"${stock.unitsHeld}"`,
      `"${stock.currentRate}"`,
      `"${stock.totalValue}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'global_stocks_holdings.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full animate-in fade-in duration-200">
      {/* Breadcrumb & Export CSV Row matching screenshot */}
      <div className="flex items-center justify-between gap-3 w-full flex-wrap">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm">
          <button
            type="button"
            onClick={onBackToLiquidity}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            Liquidity
          </button>
          <span className="text-slate-400 dark:text-slate-600">/</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            Global Stocks
          </span>
        </div>

        <button
          type="button"
          id="btn-export-csv"
          onClick={exportCSV}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#0F2447] hover:bg-[#1A3668] text-white text-xs sm:text-sm font-medium transition-all duration-150 shadow-xs cursor-pointer active:scale-98"
        >
          <Icon icon="solar:file-download-linear" className="w-4 h-4 text-white" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Top 3 KPI Summary Cards matching Screenshot 2026-09-11 160700.png */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 w-full">
        {/* Card 1: Total Stock Value */}
        <div
          id="kpi-total-stock-value"
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
              Total Stock Value
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-2 sm:mt-3">
            <span
              className={`text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-medium tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              <CountUpNumber value="$1.80M" />
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

        {/* Card 2: Highest Performer */}
        <div
          id="kpi-highest-performer"
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
              Highest Performer
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-2 sm:mt-3">
            <span
              className={`text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-medium tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              NVIDIA
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
              <span>38.5%</span>
            </div>
          </div>

          <div
            className={`text-xs sm:text-[13px] mt-2.5 sm:mt-3 font-normal ${
              isDark ? 'text-slate-400' : 'text-[#808080]'
            }`}
          >
            Your worth: $294,000
          </div>
        </div>

        {/* Card 3: Least Performer */}
        <div
          id="kpi-least-performer"
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
              Least Performer
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-2 sm:mt-3">
            <span
              className={`text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-medium tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              ASML Holdings
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
              <span>9.7%</span>
            </div>
          </div>

          <div
            className={`text-xs sm:text-[13px] mt-2.5 sm:mt-3 font-normal ${
              isDark ? 'text-slate-400' : 'text-[#808080]'
            }`}
          >
            Your worth: $169,100
          </div>
        </div>
      </div>

      {/* Stocks Table matching screenshot */}
      <div
        id="global-stocks-table-card"
        className={`rounded-2xl border transition-all duration-200 ${
          isDark
            ? 'bg-slate-900/80 border-slate-800'
            : 'bg-white border-slate-200/80 shadow-xs'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[720px]">
            {/* Table Header */}
            <thead>
              <tr
                className={`border-b text-xs sm:text-sm ${
                  isDark
                    ? 'border-slate-800 text-slate-200'
                    : 'border-slate-200/70 text-[#1e1e1e]'
                }`}
              >
                <th className="py-4 sm:py-5 px-4 sm:px-6 font-medium w-[34%]">
                  Name of Stocks
                </th>
                <th className="py-4 sm:py-5 px-4 sm:px-6 font-medium w-[16%]">
                  Unit Price
                </th>
                <th className="py-4 sm:py-5 px-4 sm:px-6 font-medium w-[16%]">
                  Units you hold
                </th>
                <th className="py-4 sm:py-5 px-4 sm:px-6 font-medium w-[16%]">
                  Current Rate
                </th>
                <th className="py-4 sm:py-5 px-4 sm:px-6 font-medium w-[14%]">
                  Total Value
                </th>
                <th className="py-4 sm:py-5 px-3 sm:px-4 font-medium w-[4%]"></th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-xs sm:text-sm">
              {GLOBAL_STOCKS.map((row, index) => {
                const isExpanded = expandedIds.has(row.id);

                return (
                  <React.Fragment key={row.id}>
                    <tr
                      id={`stock-row-${row.id}`}
                      onClick={() => toggleRow(row.id)}
                      className={`group transition-all duration-150 cursor-pointer select-none ${
                        index !== GLOBAL_STOCKS.length - 1 || isExpanded
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
                      {/* Name of Stocks */}
                      <td className="py-4 sm:py-5 px-4 sm:px-6 align-middle font-normal">
                        <span
                          className={`transition-colors duration-150 ${
                            isDark ? 'text-slate-200' : 'text-[#1e1e1e]'
                          } group-hover:text-[#1D63ED] dark:group-hover:text-sky-400`}
                        >
                          {row.name}
                        </span>
                      </td>

                      {/* Unit Price */}
                      <td
                        className={`py-4 sm:py-5 px-4 sm:px-6 align-middle font-normal ${
                          isDark ? 'text-slate-400' : 'text-[#808080]'
                        }`}
                      >
                        {row.unitPrice}
                      </td>

                      {/* Units you hold */}
                      <td
                        className={`py-4 sm:py-5 px-4 sm:px-6 align-middle font-normal ${
                          isDark ? 'text-slate-400' : 'text-[#808080]'
                        }`}
                      >
                        {row.unitsHeld}
                      </td>

                      {/* Current Rate */}
                      <td className="py-4 sm:py-5 px-4 sm:px-6 align-middle font-normal">
                        <div
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 sm:py-1 rounded-md text-xs font-medium ${
                            isDark
                              ? 'bg-emerald-950/60 text-emerald-400'
                              : 'bg-[#E9F9EE] text-[#16A34A]'
                          }`}
                        >
                          <span className="text-[9px]">▲</span>
                          <span>{row.currentRate}</span>
                        </div>
                      </td>

                      {/* Total Value */}
                      <td
                        className={`py-4 sm:py-5 px-4 sm:px-6 align-middle font-normal ${
                          isDark ? 'text-slate-300' : 'text-[#1e1e1e]'
                        }`}
                      >
                        {row.totalValue}
                      </td>

                      {/* Chevron Down */}
                      <td className="py-4 sm:py-5 px-3 sm:px-4 align-middle text-right pr-4 sm:pr-6">
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-[#1D63ED] dark:text-sky-400' : ''
                          }`}
                        />
                      </td>
                    </tr>

                    {/* Expandable details row */}
                    {isExpanded && (
                      <tr
                        className={`transition-colors ${
                          index !== GLOBAL_STOCKS.length - 1
                            ? isDark
                              ? 'border-b border-slate-800'
                              : 'border-b border-slate-200/70'
                            : ''
                        } ${isDark ? 'bg-slate-800/20' : 'bg-slate-50/50'}`}
                      >
                        <td colSpan={6} className="py-3 px-4 sm:px-6 text-xs animate-in fade-in duration-150">
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-500 dark:text-slate-400">
                            <div>
                              <span className="font-medium text-slate-700 dark:text-slate-300">Ticker: </span>
                              {row.exchange}
                            </div>
                            <div>
                              <span className="font-medium text-slate-700 dark:text-slate-300">Day Range: </span>
                              {row.dayRange}
                            </div>
                            <div>
                              <span className="font-medium text-slate-700 dark:text-slate-300">P/E Ratio: </span>
                              {row.peRatio}
                            </div>
                            <div>
                              <span className="font-medium text-slate-700 dark:text-slate-300">Market Cap: </span>
                              {row.marketCap}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
