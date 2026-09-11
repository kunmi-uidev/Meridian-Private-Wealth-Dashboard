import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { HOLDINGS, HOLDINGS_SIMPLE } from '../data';

interface HoldingsTableProps {
  isDark: boolean;
  readingMode?: 'simple' | 'expert' | null;
  onNavigate?: (screen: string) => void;
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({
  isDark,
  readingMode,
  onNavigate,
}) => {
  const isSimple = readingMode === 'simple';
  const holdings = isSimple ? HOLDINGS_SIMPLE : HOLDINGS;

  // Track expanded rows individually by id
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

  return (
    <div
      id="holdings-table-card"
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
              <th
                className={`py-4 sm:py-5 px-4 sm:px-6 font-medium ${
                  isSimple ? 'w-[48%]' : 'w-[44%]'
                } ${isDark ? 'text-slate-200' : 'text-[#1e1e1e]'}`}
              >
                {isSimple ? 'Holdings' : 'Holdings & Strategy'}
              </th>
              <th
                className={`py-4 sm:py-5 px-4 sm:px-6 font-medium ${
                  isSimple ? 'w-[18%]' : 'w-[20%]'
                } ${isDark ? 'text-slate-200' : 'text-[#1e1e1e]'}`}
              >
                Value
              </th>
              <th
                className={`py-4 sm:py-5 px-4 sm:px-6 font-medium ${
                  isSimple ? 'w-[14%]' : 'w-[16%]'
                } ${isDark ? 'text-slate-200' : 'text-[#1e1e1e]'}`}
              >
                Weight
              </th>
              <th
                className={`py-4 sm:py-5 px-4 sm:px-6 font-medium ${
                  isSimple ? 'w-[20%]' : 'w-[20%]'
                } ${isDark ? 'text-slate-200' : 'text-[#1e1e1e]'}`}
              >
                Change (QTD)
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="text-xs sm:text-sm">
            {holdings.map((row, index) => {
              const isExpanded = expandedIds.has(row.id);

              const isGlobalStocks = row.simpleName === 'Global Stocks' || row.name === 'Global Stocks';
              const isBusinessLoans = row.simpleName === 'Business Loans' || row.name === 'Business Loans';
              const isNavigable = isGlobalStocks || isBusinessLoans;

              return (
                <tr
                  key={row.id}
                  id={`holding-row-${row.id}`}
                  onClick={() => {
                    if (isGlobalStocks && onNavigate) {
                      onNavigate('Global Stocks');
                    } else if (isBusinessLoans && onNavigate) {
                      onNavigate('Business Loans');
                    } else if (isSimple) {
                      toggleRow(row.id);
                    }
                  }}
                  className={`group transition-all duration-150 select-none ${
                    isSimple || isNavigable ? 'cursor-pointer' : ''
                  } ${
                    index !== holdings.length - 1
                      ? isDark
                        ? 'border-b border-slate-800'
                        : 'border-b border-slate-200/70'
                      : ''
                  } ${
                    isDark
                      ? isSimple || isNavigable
                        ? 'hover:bg-slate-800/60 active:bg-slate-800/80'
                        : 'hover:bg-slate-800/40'
                      : isSimple || isNavigable
                      ? 'hover:bg-slate-50/90 active:bg-slate-100/70'
                      : 'hover:bg-slate-50/70'
                  } ${
                    isSimple && isExpanded
                      ? isDark
                        ? 'bg-slate-800/25'
                        : 'bg-blue-50/20'
                      : ''
                  }`}
                >
                  {/* Holding Name & Description */}
                  <td className="py-4 sm:py-5 px-4 sm:px-6">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-medium sm:font-normal text-xs sm:text-sm transition-colors duration-150 ${
                            isDark ? 'text-slate-200' : 'text-[#1e1e1e]'
                          } ${
                            isSimple || isNavigable
                              ? 'group-hover:text-[#1D63ED] dark:group-hover:text-sky-400 group-hover:font-medium'
                              : ''
                          }`}
                        >
                          {isSimple ? row.simpleName || row.name : row.name}
                        </span>
                        {isNavigable && (
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-[#1D63ED] dark:text-sky-400 font-medium hidden sm:inline">
                            View breakdown →
                          </span>
                        )}
                      </div>

                      {/* Simple Mode Plain-English Subtitle (Only opens for expanded row) */}
                      {isSimple && isExpanded && row.description && (
                        <span
                          className={`text-[11px] sm:text-xs mt-1.5 leading-relaxed font-normal transition-opacity duration-200 ${
                            isDark ? 'text-slate-400' : 'text-[#808080]'
                          }`}
                        >
                          {row.description}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Value */}
                  <td
                    className={`py-4 sm:py-5 px-4 sm:px-6 font-normal ${
                      isDark ? 'text-slate-400' : 'text-[#808080]'
                    }`}
                  >
                    {row.valueFormatted}
                  </td>

                  {/* Weight */}
                  <td
                    className={`py-4 sm:py-5 px-4 sm:px-6 font-normal ${
                      isDark ? 'text-slate-400' : 'text-[#808080]'
                    }`}
                  >
                    {row.weightFormatted}
                  </td>

                  {/* Change (QTD) Badge + Info Icon */}
                  <td className="py-4 sm:py-5 px-4 sm:px-6">
                    <div className="flex items-center justify-between gap-3">
                      <div
                        className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[11px] sm:text-xs font-medium transition-transform duration-150 ${
                          isSimple ? 'group-hover:scale-[1.03]' : ''
                        } ${
                          row.isPositive
                            ? isDark
                              ? 'bg-emerald-950/60 text-emerald-400'
                              : 'bg-[#E7F8EC] text-[#16A34A]'
                            : isDark
                            ? 'bg-rose-950/60 text-rose-400'
                            : 'bg-[#FEECEB] text-[#DC2626]'
                        }`}
                      >
                        <span className="text-[8px] sm:text-[9px] leading-none">
                          {row.isPositive ? '▲' : '▼'}
                        </span>
                        <span>{row.changeQtdFormatted}</span>
                      </div>

                      {/* Info Icon Button (Simple Mode) */}
                      {isSimple && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRow(row.id);
                          }}
                          title={
                            isExpanded
                              ? `Click to hide ${row.name} details`
                              : `Click to view ${row.name} details`
                          }
                          aria-label={`Toggle ${row.name} details`}
                          className="p-1 rounded-full transition-all duration-150 flex items-center justify-center cursor-pointer focus:outline-hidden hover:bg-slate-200/60 dark:hover:bg-slate-700/60 group-hover:scale-110"
                        >
                          <Info
                            className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors duration-150 ${
                              isExpanded
                                ? 'text-[#1D63ED] dark:text-sky-400'
                                : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                            }`}
                          />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};


