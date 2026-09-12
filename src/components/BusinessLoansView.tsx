import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { ChevronDown } from 'lucide-react';
import { CountUpNumber } from './CountUpNumber';

interface BusinessLoansViewProps {
  isDark: boolean;
  onBackToLiquidity: () => void;
}

interface LoanItem {
  id: string;
  name: string;
  unitPrice: string;
  unitsHeld: string;
  currentRate: string;
  totalValue: string;
  facility?: string;
  maturity?: string;
  rating?: string;
  collateral?: string;
}

const BUSINESS_LOANS: LoanItem[] = [
  {
    id: 'bl-1',
    name: 'Ares Direct Lending Loan B',
    unitPrice: '$100.00',
    unitsHeld: '3,200',
    currentRate: '10.8%',
    totalValue: '$320,000',
    facility: 'Senior Secured Term Loan',
    maturity: 'March 2028',
    rating: 'Investment Grade Equivalent',
    collateral: 'First Lien on Operating Assets',
  },
  {
    id: 'bl-2',
    name: 'Blackstone MedTech',
    unitPrice: '$100.00',
    unitsHeld: '2,800',
    currentRate: '9.9%',
    totalValue: '$280,000',
    facility: 'Healthcare Equipment Facility',
    maturity: 'June 2028',
    rating: 'Senior Secured Credit',
    collateral: 'Medical Patent & Receivables',
  },
  {
    id: 'bl-3',
    name: 'Brookfield Logistics',
    unitPrice: '$100.00',
    unitsHeld: '2,450',
    currentRate: '9.4%',
    totalValue: '$245,000',
    facility: 'Infrastructure Real Estate Loan',
    maturity: 'November 2027',
    rating: 'First Lien Infrastructure',
    collateral: 'Warehouse & Port Terminals',
  },
  {
    id: 'bl-4',
    name: 'Blue Owl Software Recurring Loan',
    unitPrice: '$100.00',
    unitsHeld: '1,838',
    currentRate: '8.7%',
    totalValue: '$183,865',
    facility: 'Enterprise SaaS ARR Financing',
    maturity: 'January 2028',
    rating: 'Recurring Revenue Term Note',
    collateral: 'Software IP & Cash Flows',
  },
];

export const BusinessLoansView: React.FC<BusinessLoansViewProps> = ({
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
    const rows = BUSINESS_LOANS.map((loan) => [
      `"${loan.name}"`,
      `"${loan.unitPrice}"`,
      `"${loan.unitsHeld}"`,
      `"${loan.currentRate}"`,
      `"${loan.totalValue}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'business_loans_holdings.csv');
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
            Business Loans
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

      {/* Top 3 KPI Summary Cards matching image.png */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 w-full">
        {/* Card 1: Total Stock Value */}
        <div
          id="kpi-total-loan-value"
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
              <CountUpNumber value="$1.03M" />
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
            24% of Total Value
          </div>
        </div>

        {/* Card 2: Highest Asset */}
        <div
          id="kpi-highest-asset"
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
              Highest Asset
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-2 sm:mt-3">
            <span
              className={`text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-medium tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Ares-TL
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
              <span>10.8%</span>
            </div>
          </div>

          <div
            className={`text-xs sm:text-[13px] mt-2.5 sm:mt-3 font-normal ${
              isDark ? 'text-slate-400' : 'text-[#808080]'
            }`}
          >
            Worth: $320,000
          </div>
        </div>

        {/* Card 3: Least Asset */}
        <div
          id="kpi-least-asset"
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
              Least Asset
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-2 sm:mt-3">
            <span
              className={`text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-medium tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              OWL - SaaS
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
              <span>8.7%</span>
            </div>
          </div>

          <div
            className={`text-xs sm:text-[13px] mt-2.5 sm:mt-3 font-normal ${
              isDark ? 'text-slate-400' : 'text-[#808080]'
            }`}
          >
            Worth: $183,865
          </div>
        </div>
      </div>

      {/* Loans Table matching screenshot */}
      <div
        id="business-loans-table-card"
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
              {BUSINESS_LOANS.map((row, index) => {
                const isExpanded = expandedIds.has(row.id);

                return (
                  <React.Fragment key={row.id}>
                    <tr
                      id={`loan-row-${row.id}`}
                      onClick={() => toggleRow(row.id)}
                      className={`group transition-all duration-150 cursor-pointer select-none ${
                        index !== BUSINESS_LOANS.length - 1 || isExpanded
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
                      {/* Name */}
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
                        className={`py-4 sm:py-5 px-4 sm:px-6 align-middle font-medium ${
                          isDark ? 'text-slate-200' : 'text-[#1e1e1e]'
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
                          index !== BUSINESS_LOANS.length - 1
                            ? isDark
                              ? 'border-b border-slate-800'
                              : 'border-b border-slate-200/70'
                            : ''
                        } ${isDark ? 'bg-slate-800/20' : 'bg-slate-50/50'}`}
                      >
                        <td colSpan={6} className="py-3 px-4 sm:px-6 text-xs animate-in fade-in duration-150">
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-500 dark:text-slate-400">
                            <div>
                              <span className="font-medium text-slate-700 dark:text-slate-300">Loan Facility: </span>
                              {row.facility}
                            </div>
                            <div>
                              <span className="font-medium text-slate-700 dark:text-slate-300">Maturity Date: </span>
                              {row.maturity}
                            </div>
                            <div>
                              <span className="font-medium text-slate-700 dark:text-slate-300">Credit Rating: </span>
                              {row.rating}
                            </div>
                            <div>
                              <span className="font-medium text-slate-700 dark:text-slate-300">Security / Collateral: </span>
                              {row.collateral}
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
