import React, { useEffect, useState } from 'react';

interface CountUpNumberProps {
  value: string;
  className?: string;
  durationMs?: number;
  startRatio?: number; // default 0.80 (starts at 80% of value, not zero)
}

interface ParsedNumber {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
}

function parseFormattedNumber(str: string): ParsedNumber | null {
  if (!str) return null;

  // Regex to extract prefix, number (with commas/decimals), and suffix
  const match = str.trim().match(/^([^0-9.]*)([0-9,]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return null;

  const prefix = match[1] || '';
  const numStr = match[2].replace(/,/g, '');
  const suffix = match[3] || '';

  const target = parseFloat(numStr);
  if (isNaN(target)) return null;

  const decimalPart = match[2].split('.')[1];
  const decimals = decimalPart ? decimalPart.length : 0;

  return { prefix, target, suffix, decimals };
}

export const CountUpNumber: React.FC<CountUpNumberProps> = ({
  value,
  className = '',
  durationMs = 1250,
  startRatio = 0.82,
}) => {
  const [displayValue, setDisplayValue] = useState<string>(value);

  useEffect(() => {
    // Check for reduced motion preference
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setDisplayValue(value);
      return;
    }

    const parsed = parseFormattedNumber(value);
    if (!parsed) {
      setDisplayValue(value);
      return;
    }

    const { prefix, target, suffix, decimals } = parsed;

    // "It shouldn't necessarily start counting from zero"
    // Start at a realistic baseline (around 82% of target)
    const start = target > 0 ? target * startRatio : 0;
    const range = target - start;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeOutCubic(progress);

      const currentVal = start + range * easedProgress;

      const formattedNum = currentVal.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        // Guarantee exact match with original string at the end
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [value, durationMs, startRatio]);

  return <span className={className}>{displayValue}</span>;
};
