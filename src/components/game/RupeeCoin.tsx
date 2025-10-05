"use client";

import React from 'react';

interface RupeeCoinProps {
  onClick: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

export function RupeeCoin({ onClick }: RupeeCoinProps) {
  return (
    <div className="relative group">
      <svg
        onClick={onClick}
        className="w-48 h-48 sm:w-64 sm:h-64 cursor-pointer group-active:animate-coin-click"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="coin-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.8)" />
            <stop offset="50%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.7)" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className="transition-transform duration-200 group-hover:scale-105" style={{ filter: 'url(#glow)' }}>
          <circle cx="60" cy="60" r="50" fill="url(#coin-gradient)" />
          <circle cx="60" cy="60" r="50" stroke="hsl(var(--primary-foreground) / 0.5)" strokeWidth="3" fill="none" />
          <circle cx="60" cy="60" r="45" stroke="hsl(var(--primary-foreground) / 0.5)" strokeWidth="1" fill="none" />
          <text
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle"
            fontSize="60"
            fontWeight="bold"
            fill="hsl(var(--primary-foreground))"
            className="select-none"
          >
            ₹
          </text>
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full bg-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-2xl"></div>
      </div>
    </div>
  );
}
