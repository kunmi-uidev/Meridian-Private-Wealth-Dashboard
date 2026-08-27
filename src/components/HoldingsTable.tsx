import React from 'react';
import { HOLDINGS } from '../data';

interface HoldingsTableProps {
  isDark: boolean;
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({ isDark }) => {
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
                className={`py-4 sm:py-5 px-4 sm:px-6 font-medium w-[44%] ${
                  isDark ? 'text-slate-200' : 'text-[#1e1e1e]'
                }`}
              >
                Holdings
              </th>
              <th
                className={`py-4 sm:py-5 px-4 sm:px-6 font-medium w-[20%] ${
                  isDark ? 'text-slate-200' : 'text-[#1e1e1e]'
                }`}
              >
                Value
              </th>
              <th
                className={`py-4 sm:py-5 px-4 sm:px-6 font-medium w-[16%] ${
                  isDark ? 'text-slate-200' : 'text-[#1e1e1e]'
                }`}
              >
                Weight
              </th>
              <th
                className={`py-4 sm:py-5 px-4 sm:px-6 font-medium w-[20%] ${
                  isDark ? 'text-slate-200' : 'text-[#1e1e1e]'
                }`}
              >
                Change (QTD)
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="text-xs sm:text-sm">
            {HOLDINGS.map((row, index) => (
              <tr
                key={row.id}
                id={`holding-row-${row.id}`}
                className={`transition-colors ${
                  index !== HOLDINGS.length - 1
                    ? isDark
                      ? 'border-b border-slate-800'
                      : 'border-b border-slate-200/70'
                    : ''
                } ${
                  isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50/50'
                }`}
              >
                {/* Holding Name */}
                <td
                  className={`py-4 sm:py-5 px-4 sm:px-6 font-normal ${
                    isDark ? 'text-slate-200' : 'text-[#1e1e1e]'
                  }`}
                >
                  {row.name}
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

                {/* Change (QTD) Badge */}
                <td className="py-4 sm:py-5 px-4 sm:px-6">
                  <div
                    className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[11px] sm:text-xs font-medium ${
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

