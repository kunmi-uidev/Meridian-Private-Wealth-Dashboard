import { HoldingItem, AllocationItem, MonthData, KpiCardData } from './types';

export const KPI_CARDS: KpiCardData[] = [
  {
    id: 'portfolio-value',
    title: 'Total Portfolio Value',
    value: '$4,280,960',
    change: '8.6%',
    isPositive: true,
    footer: 'Last Year: $3,942,764',
  },
  {
    id: 'available-now',
    title: 'Available Now',
    value: '$2,697,000',
    change: '35%',
    isPositive: true,
    footer: '63% of Total Value',
  },
  {
    id: 'fees',
    title: "This Year's Fees",
    value: '$38,582.46',
    change: '0.9%',
    isPositive: false,
    footer: '0.9% Blended fee rate',
  },
  {
    id: 'ytd-return',
    title: "This Year's Profit",
    value: '$338,196',
    change: '7.9%',
    isPositive: true,
    footer: 'Last year: $240,510',
  },
];

export const KPI_CARDS_SIMPLE: KpiCardData[] = [
  {
    id: 'portfolio-value-simple',
    title: 'Total Portfolio Value',
    value: '$4,280,960',
    change: '8.6%',
    isPositive: true,
    footer: 'Last Year: $3,942,764',
  },
  {
    id: 'available-now-simple',
    title: 'Available Now',
    value: '$2,697,000',
    change: '35%',
    isPositive: true,
    footer: '63% of Total Value',
  },
  {
    id: 'fees-simple',
    title: 'This year, you paid',
    value: '$38,582.46',
    change: '0.9%',
    isPositive: false,
    footer: 'About $1 for every $80 you have invested',
  },
  {
    id: 'profit-simple',
    title: "This year’s profit",
    value: '$338,196',
    change: '7.9%',
    isPositive: true,
    footer: 'Last year: $240,510',
  },
];

export const ALLOCATIONS: AllocationItem[] = [
  {
    id: 'equities',
    name: 'Global Equities',
    amount: '$1.80M',
    percentage: 68,
    barClass: 'striped-bar-blue',
    railColor: 'bg-[#CBEBFC]',
    borderColor: 'border-[#00A3FF]',
    textColor: 'text-sky-600',
  },
  {
    id: 'private-credit',
    name: 'Private Credit',
    amount: '$1.03M',
    percentage: 36,
    barClass: 'striped-bar-orange',
    railColor: 'bg-[#FFE2C8]',
    borderColor: 'border-[#F97316]',
    textColor: 'text-orange-500',
  },
  {
    id: 'fixed-income',
    name: 'Fixed Income',
    amount: '$815K',
    percentage: 28,
    barClass: 'striped-bar-purple',
    railColor: 'bg-[#EBD2FD]',
    borderColor: 'border-[#7C3AED]',
    textColor: 'text-purple-600',
  },
  {
    id: 'cash-alternatives',
    name: 'Cash & Alternatives',
    amount: '$643K',
    percentage: 22,
    barClass: 'striped-bar-lime',
    railColor: 'bg-[#E5F9BD]',
    borderColor: 'border-[#84CC16]',
    textColor: 'text-lime-600',
  },
];

export const ALLOCATIONS_SIMPLE: AllocationItem[] = [
  {
    id: 'equities',
    name: 'Global Equities',
    amount: '$1.80M',
    percentage: 68,
    barClass: 'striped-bar-blue',
    railColor: 'bg-[#D8F0FE]',
    borderColor: 'border-[#00A3FF]',
    textColor: 'text-sky-600',
  },
  {
    id: 'private-credit',
    name: 'Private Credit',
    amount: '$1.03M',
    percentage: 36,
    barClass: 'striped-bar-orange',
    railColor: 'bg-[#FFE8D6]',
    borderColor: 'border-[#F97316]',
    textColor: 'text-orange-500',
  },
  {
    id: 'fixed-income',
    name: 'Fixed Income',
    amount: '$815K',
    percentage: 28,
    barClass: 'striped-bar-purple',
    railColor: 'bg-[#F3E8FF]',
    borderColor: 'border-[#7C3AED]',
    textColor: 'text-purple-600',
  },
  {
    id: 'cash-alternatives',
    name: 'Cash & Alternatives',
    amount: '$643K',
    percentage: 22,
    barClass: 'striped-bar-lime',
    railColor: 'bg-[#ECFCCB]',
    borderColor: 'border-[#84CC16]',
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

export const HOLDINGS_SIMPLE: HoldingItem[] = [
  {
    id: 'h1',
    name: 'Global Stocks',
    simpleName: 'Global Stocks',
    description: 'Small pieces of many companies worldwide — you own a tiny bit of each one',
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
    name: 'Business Loans',
    simpleName: 'Business Loans',
    description: "Money you've lent to businesses — you can't take this out until 2028",
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
    name: 'Safer Loans',
    simpleName: 'Safer Loans',
    description: 'Loans to governments and large, stable companies — considered low-risk',
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
    name: 'Cash',
    simpleName: 'Cash',
    description: 'Regular cash, kept safe and easy to access anytime, like a savings account',
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

export const PERFORMANCE_MONTHS_SIMPLE: MonthData[] = [
  {
    month: 'May 2026',
    columns: [
      {
        blocks: [
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $31,500 in May 2026' },
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $31,500 in May 2026' },
        ],
      },
      {
        blocks: [
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $31,500 in May 2026' },
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $31,500 in May 2026' },
          { color: 'bg-slate-200', hexColor: '#F97316', tooltipText: 'Private Credit generated $19,200 in May 2026' },
        ],
      },
      {
        blocks: [
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $31,500 in May 2026' },
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $31,500 in May 2026' },
          { color: 'bg-slate-200', hexColor: '#F97316', tooltipText: 'Private Credit generated $19,200 in May 2026' },
          { color: 'bg-slate-200', hexColor: '#6D28D9', tooltipText: 'Fixed Income generated $14,100 in May 2026' },
          { color: 'bg-slate-200', hexColor: '#A3E635', tooltipText: 'Cash & Alternatives generated $7,900 in May 2026' },
        ],
      },
      {
        blocks: [
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $31,500 in May 2026' },
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $31,500 in May 2026' },
          { color: 'bg-slate-200', hexColor: '#F97316', tooltipText: 'Private Credit generated $19,200 in May 2026' },
          { color: 'bg-slate-200', hexColor: '#6D28D9', tooltipText: 'Fixed Income generated $14,100 in May 2026' },
          { color: 'bg-slate-200', hexColor: '#A3E635', tooltipText: 'Cash & Alternatives generated $7,900 in May 2026' },
          { color: 'bg-slate-200', hexColor: '#A3E635', tooltipText: 'Cash & Alternatives generated $7,900 in May 2026' },
        ],
      },
      {
        blocks: [
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $31,500 in May 2026' },
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $31,500 in May 2026' },
          { color: 'bg-slate-200', hexColor: '#F97316', tooltipText: 'Private Credit generated $19,200 in May 2026' },
          { color: 'bg-slate-200', hexColor: '#6D28D9', tooltipText: 'Fixed Income generated $14,100 in May 2026' },
        ],
      },
      {
        blocks: [
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $31,500 in May 2026' },
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $31,500 in May 2026' },
          { color: 'bg-slate-200', hexColor: '#F97316', tooltipText: 'Private Credit generated $19,200 in May 2026' },
        ],
      },
    ],
  },
  {
    month: 'June 2026',
    isHighlighted: true,
    columns: [
      {
        blocks: [
          { color: 'bg-[#00A3FF]', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $34,200 in June 2026' },
          { color: 'bg-[#00A3FF]', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $34,200 in June 2026' },
          { color: 'bg-[#F97316]', hexColor: '#F97316', tooltipText: 'Private Credit generated $21,400 in June 2026' },
        ],
      },
      {
        blocks: [
          { color: 'bg-[#00A3FF]', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $34,200 in June 2026' },
          { color: 'bg-[#00A3FF]', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $34,200 in June 2026' },
          { color: 'bg-[#F97316]', hexColor: '#F97316', tooltipText: 'Private Credit generated $21,400 in June 2026' },
          { color: 'bg-[#6D28D9]', hexColor: '#6D28D9', tooltipText: 'Fixed Income generated $15,600 in June 2026' },
          { color: 'bg-[#A3E635]', hexColor: '#A3E635', tooltipText: 'Cash & Alternatives generated $8,600 in June 2026' },
        ],
      },
      {
        blocks: [
          { color: 'bg-[#00A3FF]', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $34,200 in June 2026' },
          { color: 'bg-[#00A3FF]', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $34,200 in June 2026' },
          { color: 'bg-[#F97316]', hexColor: '#F97316', tooltipText: 'Private Credit generated $21,400 in June 2026' },
          { color: 'bg-[#6D28D9]', hexColor: '#6D28D9', tooltipText: 'Fixed Income generated $15,600 in June 2026' },
          { color: 'bg-[#A3E635]', hexColor: '#A3E635', tooltipText: 'Cash & Alternatives generated $8,600 in June 2026' },
          { color: 'bg-[#A3E635]', hexColor: '#A3E635', tooltipText: 'Cash & Alternatives generated $8,600 in June 2026' },
        ],
      },
      {
        blocks: [
          { color: 'bg-[#00A3FF]', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $34,200 in June 2026' },
          { color: 'bg-[#00A3FF]', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $34,200 in June 2026' },
          { color: 'bg-[#F97316]', hexColor: '#F97316', tooltipText: 'Private Credit generated $21,400 in June 2026' },
          { color: 'bg-[#6D28D9]', hexColor: '#6D28D9', tooltipText: 'Fixed Income generated $15,600 in June 2026' },
          { color: 'bg-[#A3E635]', hexColor: '#A3E635', tooltipText: 'Cash & Alternatives generated $8,600 in June 2026' },
          { color: 'bg-[#A3E635]', hexColor: '#A3E635', tooltipText: 'Cash & Alternatives generated $8,600 in June 2026' },
        ],
      },
      {
        blocks: [
          { color: 'bg-[#00A3FF]', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $34,200 in June 2026' },
          { color: 'bg-[#00A3FF]', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $34,200 in June 2026' },
          { color: 'bg-[#F97316]', hexColor: '#F97316', tooltipText: 'Private Credit generated $21,400 in June 2026' },
          { color: 'bg-[#6D28D9]', hexColor: '#6D28D9', tooltipText: 'Fixed Income generated $15,600 in June 2026' },
          { color: 'bg-[#A3E635]', hexColor: '#A3E635', tooltipText: 'Cash & Alternatives generated $8,600 in June 2026' },
        ],
      },
      {
        blocks: [
          { color: 'bg-[#00A3FF]', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $34,200 in June 2026' },
          { color: 'bg-[#00A3FF]', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $34,200 in June 2026' },
          { color: 'bg-[#F97316]', hexColor: '#F97316', tooltipText: 'Private Credit generated $21,400 in June 2026' },
          { color: 'bg-[#6D28D9]', hexColor: '#6D28D9', tooltipText: 'Fixed Income generated $15,600 in June 2026' },
        ],
      },
    ],
  },
  {
    month: 'July 2026',
    columns: [
      {
        blocks: [
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $36,100 in July 2026' },
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $36,100 in July 2026' },
        ],
      },
      {
        blocks: [
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $36,100 in July 2026' },
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $36,100 in July 2026' },
          { color: 'bg-slate-200', hexColor: '#F97316', tooltipText: 'Private Credit generated $22,500 in July 2026' },
        ],
      },
      {
        blocks: [
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $36,100 in July 2026' },
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $36,100 in July 2026' },
          { color: 'bg-slate-200', hexColor: '#F97316', tooltipText: 'Private Credit generated $22,500 in July 2026' },
          { color: 'bg-slate-200', hexColor: '#6D28D9', tooltipText: 'Fixed Income generated $16,300 in July 2026' },
          { color: 'bg-slate-200', hexColor: '#A3E635', tooltipText: 'Cash & Alternatives generated $9,100 in July 2026' },
        ],
      },
      {
        blocks: [
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $36,100 in July 2026' },
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $36,100 in July 2026' },
          { color: 'bg-slate-200', hexColor: '#F97316', tooltipText: 'Private Credit generated $22,500 in July 2026' },
          { color: 'bg-slate-200', hexColor: '#6D28D9', tooltipText: 'Fixed Income generated $16,300 in July 2026' },
          { color: 'bg-slate-200', hexColor: '#A3E635', tooltipText: 'Cash & Alternatives generated $9,100 in July 2026' },
          { color: 'bg-slate-200', hexColor: '#A3E635', tooltipText: 'Cash & Alternatives generated $9,100 in July 2026' },
        ],
      },
      {
        blocks: [
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $36,100 in July 2026' },
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $36,100 in July 2026' },
          { color: 'bg-slate-200', hexColor: '#F97316', tooltipText: 'Private Credit generated $22,500 in July 2026' },
          { color: 'bg-slate-200', hexColor: '#6D28D9', tooltipText: 'Fixed Income generated $16,300 in July 2026' },
        ],
      },
      {
        blocks: [
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $36,100 in July 2026' },
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $36,100 in July 2026' },
          { color: 'bg-slate-200', hexColor: '#F97316', tooltipText: 'Private Credit generated $22,500 in July 2026' },
        ],
      },
    ],
  },
  {
    month: 'Aug 2026',
    columns: [
      {
        blocks: [
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $33,400 in August 2026' },
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $33,400 in August 2026' },
          { color: 'bg-slate-200', hexColor: '#F97316', tooltipText: 'Private Credit generated $20,100 in August 2026' },
        ],
      },
      {
        blocks: [
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $33,400 in August 2026' },
          { color: 'bg-slate-200', hexColor: '#00A3FF', tooltipText: 'Global Stocks generated $33,400 in August 2026' },
        ],
      },
    ],
  },
];
