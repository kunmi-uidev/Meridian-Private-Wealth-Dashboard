import React from 'react';
import { KPI_CARDS } from '../data';

interface MetricCardsProps {
  isDark: boolean;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ isDark }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 w-full">
      {KPI_CARDS.map((card) => {
        return (
          <div
            key={card.id}
            id={`metric-card-${card.id}`}
            className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
            }`}
          >
            {/* Title */}
            <div
              className={`text-xs sm:text-sm font-normal ${
                isDark ? 'text-slate-400' : 'text-[#808080]'
              }`}
            >
              {card.title}
            </div>

            {/* Value & Badge Row */}
            <div className="flex items-center justify-between gap-2 mt-2 sm:mt-3">
              <span
                className={`text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-medium tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {card.value}
              </span>

              {/* Percentage Badge */}
              <div
                className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-xs font-medium ${
                  card.isPositive
                    ? isDark
                      ? 'bg-emerald-950/60 text-emerald-400'
                      : 'bg-[#E9F9EE] text-[#16A34A]'
                    : isDark
                    ? 'bg-rose-950/60 text-rose-400'
                    : 'bg-[#FEECEB] text-[#DC2626]'
                }`}
              >
                <span className="text-[9px] sm:text-[10px]">
                  {card.isPositive ? '▲' : '▼'}
                </span>
                <span>{card.change}</span>
              </div>
            </div>

            {/* Footer subtext */}
            <div
              className={`text-[11px] sm:text-xs mt-2.5 sm:mt-3 font-normal ${
                isDark ? 'text-slate-400' : 'text-[#808080]'
              }`}
            >
              {card.footer}
            </div>
          </div>
        );
      })}
    </div>
  );
};
