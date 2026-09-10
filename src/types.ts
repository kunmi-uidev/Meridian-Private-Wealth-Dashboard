export interface HoldingItem {
  id: string;
  name: string;
  simpleName?: string;
  description?: string;
  category: string;
  value: number;
  valueFormatted: string;
  weight: number;
  weightFormatted: string;
  changeQtd: number;
  changeQtdFormatted: string;
  isPositive: boolean;
}

export interface AllocationItem {
  id: string;
  name: string;
  amount: string;
  percentage: number;
  barClass: string;
  railColor: string;
  textColor: string;
  borderColor?: string;
}

export interface MonthData {
  month: string;
  isHighlighted?: boolean;
  columns: {
    blocks: {
      color: string;
      label?: string;
      value?: string;
      tooltipText?: string;
      hexColor?: string;
    }[];
  }[];
}

export interface KpiCardData {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  footer: string;
}
