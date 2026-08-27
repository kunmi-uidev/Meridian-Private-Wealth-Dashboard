import React from 'react';
import { ALLOCATIONS } from '../data';

interface PortfolioAllocationProps {
  isDark: boolean;
}

export const PortfolioAllocation: React.FC<PortfolioAllocationProps> = ({
  isDark,
}) => {
  return (
    <div
      id="portfolio-allocation-card"
      className={`p-4 sm:p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
        isDark
          ? 'bg-slate-900/80 border-slate-800'
          : 'bg-white border-slate-200/80 shadow-xs'
      }`}
    >
      {/* Title */}
      <div>
        <h2
          className={`text-sm sm:text-base font-medium tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Portfolio Allocation
        </h2>
      </div>

      {/* Allocation Rows */}
      <div className="flex flex-col gap-3.5 sm:gap-4 mt-3.5 sm:mt-4">
        {ALLOCATIONS.map((item) => (
          <div key={item.id} className="flex flex-col gap-1.5">
            {/* Header: Name and Amount */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span
                className={`font-normal truncate pr-2 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                {item.name}
              </span>
              <span
                className={`font-medium flex-shrink-0 ${
                  isDark ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                {item.amount}
              </span>
            </div>

            {/* Custom Track & Striped Bar */}
            <div
              className={`relative w-full h-4 sm:h-5 rounded-md overflow-hidden ${
                isDark ? 'bg-slate-800/80' : item.railColor
              } flex items-center`}
            >
              <div
                className={`h-full ${item.barClass} rounded-l-md relative transition-all duration-500`}
                style={{ width: `${item.percentage}%` }}
              >
                {/* Rounded End Cap with subtle indicator border */}
                <div className="absolute right-0 top-0.5 bottom-0.5 w-1.5 bg-white/90 rounded-sm shadow-xs" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
