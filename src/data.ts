import { HoldingItem, AllocationItem, MonthData, KpiCardData } from './types';

export const KPI_CARDS: KpiCardData[] = [
  {
    id: 'portfolio-value',
    title: 'Total Portfolio Value',
    value: '$4,280,960',
    change: '30.16%',
    isPositive: true,
    footer: 'Last Month: $3,289,090',
  },
  {
    id: 'available-now',
    title: 'Available Now',
    value: '$2,700,000',
    change: '35%',
    isPositive: true,
    footer: 'Last Month: $2,000,090',
  },
  {
    id: 'fees',
    title: "This Year's Fees",
    value: '$280,960',
    change: '1.24%',
    isPositive: false,
    footer: '1.24% Blended',
  },
  {
    id: 'ytd-return',
    title: 'YTD Return',
    value: '7.9%',
    change: '1.8%',
    isPositive: true,
    footer: '$289,090 Increase',
  },
];

export const ALLOCATIONS: AllocationItem[] = [
  {
    id: 'equities',
    name: 'Global Equities',
    amount: '$1.80M',
    percentage: 42,
    barClass: 'striped-bar-blue',
    railColor: 'bg-[#CBEBFC]',
    textColor: 'text-sky-600',
  },
  {
    id: 'private-credit',
    name: 'Private Credit',
    amount: '$1.03M',
    percentage: 24,
    barClass: 'striped-bar-orange',
    railColor: 'bg-[#FFE2C8]',
    textColor: 'text-orange-500',
  },
  {
    id: 'fixed-income',
    name: 'Fixed Income',
    amount: '$815K',
    percentage: 19,
    barClass: 'striped-bar-purple',
    railColor: 'bg-[#EBD2FD]',
    textColor: 'text-purple-600',
  },
  {
    id: 'cash-alternatives',
    name: 'Cash & Alternatives',
    amount: '$643K',
    percentage: 15,
    barClass: 'striped-bar-lime',
    railColor: 'bg-[#E5F9BD]',
    textColor: 'text-lime-600',
  },
];

export const HOLDINGS: HoldingItem[] = [
  {
    id: 'h1',
    name: 'Global Equity Fund (Managed — Diversified)',
    category: 'Global Equities',
    value: 1800540,
    valueFormatted: '$1,800,540',
    weight: 42,
    weightFormatted: '42%',
    changeQtd: 4.8,
    changeQtdFormatted: '4.8%',
    isPositive: true,
  },
  {
    id: 'h2',
    name: 'Private Credit Portfolio (illiquid — locked until 2028)',
    category: 'Private Credit',
    value: 1028865,
    valueFormatted: '$1,028,865',
    weight: 24,
    weightFormatted: '24%',
    changeQtd: 2.1,
    changeQtdFormatted: '2.1%',
    isPositive: true,
  },
  {
    id: 'h3',
    name: 'Fixed Income Ladder (Investment grade)',
    category: 'Fixed Income',
    value: 814519,
    valueFormatted: '$814,519',
    weight: 19,
    weightFormatted: '19%',
    changeQtd: 0.6,
    changeQtdFormatted: '0.6%',
    isPositive: false,
  },
  {
    id: 'h4',
    name: 'Cash & Alternatives (Money market + hedges)',
    category: 'Cash & Alternatives',
    value: 643016,
    valueFormatted: '$643,016',
    weight: 15,
    weightFormatted: '15%',
    changeQtd: 0.3,
    changeQtdFormatted: '0.3%',
    isPositive: true,
  },
];

// Block Performance Graph Data (Columns from left to right for each month)
export const PERFORMANCE_MONTHS: MonthData[] = [
  {
    month: 'May 2026',
    columns: [
      { blocks: [{ color: 'bg-slate-200' }, { color: 'bg-slate-200' }] },
      { blocks: [{ color: 'bg-slate-200' }, { color: 'bg-slate-200' }, { color: 'bg-slate-200' }] },
      { blocks: [{ color: 'bg-slate-200' }, { color: 'bg-slate-200' }, { color: 'bg-slate-200' }, { color: 'bg-slate-200' }, { color: 'bg-slate-200' }] },
      { blocks: [{ color: 'bg-slate-200' }, { color: 'bg-slate-200' }, { color: 'bg-slate-200' }, { color: 'bg-slate-200' }] },
      { blocks: [{ color: 'bg-slate-200' }, { color: 'bg-slate-200' }, { color: 'bg-slate-200' }] },
      { blocks: [{ color: 'bg-slate-200' }, { color: 'bg-slate-200' }] },
    ],
  },
  {
    month: 'June 2026',
    isHighlighted: true,
    columns: [
      {
        blocks: [
          { color: 'bg-[#00A3FF]', label: 'Equities', value: '+$34,200' },
          { color: 'bg-[#F97316]', label: 'Credit', value: '+$18,900' },
        ],
      },
      {
        blocks: [
          { color: 'bg-[#00A3FF]', label: 'Equities', value: '+$42,100' },
          { color: 'bg-[#F97316]', label: 'Credit', value: '+$21,400' },
          { color: 'bg-[#7C3AED]', label: 'Income', value: '+$15,600' },
          { color: 'bg-[#84CC16]', label: 'Yield', value: '+$12,800' },
        ],
      },
      {
        blocks: [
          { color: 'bg-[#00A3FF]', label: 'Equities', value: '+$55,000' },
          { color: 'bg-[#F97316]', label: 'Credit', value: '+$28,300' },
          { color: 'bg-[#7C3AED]', label: 'Income', value: '+$19,200' },
          { color: 'bg-[#84CC16]', label: 'Yield', value: '+$24,500' },
          { color: 'bg-[#84CC16]', label: 'Surplus', value: '+$29,100' },
        ],
      },
      {
        blocks: [
          { color: 'bg-[#00A3FF]', label: 'Equities', value: '+$48,000' },
          { color: 'bg-[#F97316]', label: 'Credit', value: '+$22,000' },
          { color: 'bg-[#7C3AED]', label: 'Income', value: '+$17,400' },
          { color: 'bg-[#84CC16]', label: 'Yield', value: '+$19,800' },
          { color: 'bg-[#84CC16]', label: 'Surplus', value: '+$26,300' },
        ],
      },
      {
        blocks: [
          { color: 'bg-[#00A3FF]', label: 'Equities', value: '+$39,200' },
          { color: 'bg-[#F97316]', label: 'Credit', value: '+$19,500' },
          { color: 'bg-[#7C3AED]', label: 'Income', value: '+$14,200' },
          { color: 'bg-[#84CC16]', label: 'Yield', value: '+$16,000' },
        ],
      },
      {
        blocks: [
          { color: 'bg-[#00A3FF]', label: 'Equities', value: '+$29,400' },
          { color: 'bg-[#F97316]', label: 'Credit', value: '+$16,100' },
        ],
      },
    ],
  },
  {
    month: 'July 2026',
    columns: [
      { blocks: [{ color: 'bg-slate-200' }, { color: 'bg-slate-200' }] },
      { blocks: [{ color: 'bg-slate-200' }, { color: 'bg-slate-200' }, { color: 'bg-slate-200' }, { color: 'bg-slate-200' }] },
      { blocks: [{ color: 'bg-slate-200' }, { color: 'bg-slate-200' }, { color: 'bg-slate-200' }, { color: 'bg-slate-200' }, { color: 'bg-slate-200' }] },
      { blocks: [{ color: 'bg-slate-200' }, { color: 'bg-slate-200' }, { color: 'bg-slate-200' }, { color: 'bg-slate-200' }] },
      { blocks: [{ color: 'bg-slate-200' }, { color: 'bg-slate-200' }, { color: 'bg-slate-200' }] },
      { blocks: [{ color: 'bg-slate-200' }, { color: 'bg-slate-200' }] },
    ],
  },
  {
    month: 'Aug 2026',
    columns: [
      { blocks: [{ color: 'bg-slate-200' }, { color: 'bg-slate-200' }, { color: 'bg-slate-200' }] },
      { blocks: [{ color: 'bg-slate-200' }, { color: 'bg-slate-200' }] },
    ],
  },
];
