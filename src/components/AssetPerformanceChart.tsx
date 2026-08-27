import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PERFORMANCE_MONTHS } from '../data';

interface AssetPerformanceChartProps {
  isDark: boolean;
}

export const AssetPerformanceChart: React.FC<AssetPerformanceChartProps> = ({
  isDark,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1 Month');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredBlock, setHoveredBlock] = useState<{
    month: string;
    col: number;
    row: number;
    label?: string;
    value?: string;
  } | null>(null);

  const timeframes = ['1 Month', '3 Months', '6 Months', 'YTD', '1 Year', 'All'];

  return (
    <div
      id="asset-performance-card"
      className={`p-4 sm:p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
        isDark
          ? 'bg-slate-900/80 border-slate-800'
          : 'bg-white border-slate-200/80 shadow-xs'
      }`}
    >
      {/* Top Header & Timeframe Selector */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div
            className={`text-xs sm:text-sm font-normal ${
              isDark ? 'text-slate-400' : 'text-[#808080]'
            }`}
          >
            Asset Performance
          </div>
          <div className="flex items-center gap-2 sm:gap-3 mt-1.5 flex-wrap">
            <span
              className={`text-xl sm:text-2xl font-medium tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              $4,280,960
            </span>
            <div
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${
                isDark
                  ? 'bg-emerald-950/60 text-emerald-400'
                  : 'bg-[#E9F9EE] text-[#16A34A]'
              }`}
            >
              <span className="text-[10px]">▲</span>
              <span>30.16%</span>
            </div>
          </div>
        </div>

        {/* Timeframe Dropdown */}
        <div className="relative flex-shrink-0">
          <button
            id="btn-timeframe-dropdown"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
            }`}
          >
            <span>{selectedTimeframe}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#808080]" />
          </button>

          {dropdownOpen && (
            <div
              className={`absolute right-0 top-full mt-1.5 w-32 rounded-xl border shadow-lg py-1 z-20 ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-200'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => {
                    setSelectedTimeframe(tf);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                    selectedTimeframe === tf
                      ? 'bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/40 dark:text-blue-300'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Visual Block Histogram Grid */}
      <div className="mt-8 relative">
        {/* Tooltip Overlay */}
        {hoveredBlock && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-md pointer-events-none z-10 whitespace-nowrap">
            {hoveredBlock.label ? (
              <span>
                <strong className="text-blue-300">{hoveredBlock.label}</strong>: {hoveredBlock.value} ({hoveredBlock.month})
              </span>
            ) : (
              <span>Standard Distribution ({hoveredBlock.month})</span>
            )}
          </div>
        )}

        <div className="flex items-end justify-between gap-2 sm:gap-4 overflow-x-auto pb-1 pt-4">
          {PERFORMANCE_MONTHS.map((monthGroup, mIdx) => (
            <div
              key={monthGroup.month}
              className="flex flex-col items-center flex-1 min-w-[70px]"
            >
              {/* Columns of Blocks */}
              <div className="flex items-end justify-center gap-1.5 h-36">
                {monthGroup.columns.map((col, cIdx) => (
                  <div
                    key={cIdx}
                    className="flex flex-col-reverse items-center gap-1.5"
                  >
                    {col.blocks.map((block, rIdx) => {
                      const isHovered =
                        hoveredBlock?.month === monthGroup.month &&
                        hoveredBlock?.col === cIdx &&
                        hoveredBlock?.row === rIdx;

                      return (
                        <div
                          key={rIdx}
                          onMouseEnter={() =>
                            setHoveredBlock({
                              month: monthGroup.month,
                              col: cIdx,
                              row: rIdx,
                              label: block.label,
                              value: block.value,
                            })
                          }
                          onMouseLeave={() => setHoveredBlock(null)}
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-xs transition-all duration-150 cursor-pointer ${
                            block.color
                          } ${
                            isDark && block.color === 'bg-slate-200'
                              ? 'bg-slate-700/80 hover:bg-slate-600'
                              : 'hover:brightness-110'
                          } ${
                            isHovered ? 'scale-125 z-10 shadow-sm ring-1 ring-white/50' : ''
                          }`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Month label */}
              <div className="mt-3 text-xs font-normal text-slate-400 dark:text-slate-500 text-center whitespace-nowrap">
                {monthGroup.month}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
