"use client";

import { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PlusOneAnimationProps {
  id: number;
  x: number;
  y: number;
  value: number;
  onAnimationComplete: (id: number) => void;
}

export function PlusOneAnimation({
  id,
  x,
  y,
  value,
  onAnimationComplete,
}: PlusOneAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationComplete(id);
    }, 1000); // Must match animation duration
    return () => clearTimeout(timer);
  }, [id, onAnimationComplete]);

  return (
    <div
      className={cn(
        'pointer-events-none absolute z-50 text-2xl font-bold text-primary-foreground drop-shadow-lg',
        'animate-fly-up'
      )}
      style={{ left: x, top: y }}
    >
      +{value}
    </div>
  );
}
