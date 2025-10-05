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
          <radialGradient id="gold-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: '#FFF7B0' }} />
            <stop offset="50%" style={{ stopColor: '#FFD700' }} />
            <stop offset="100%" style={{ stopColor: '#C4A600' }} />
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
          <circle cx="60" cy="60" r="50" fill="url(#gold-gradient)" />
          <circle cx="60" cy="60" r="50" stroke="#A38A00" strokeWidth="3" fill="none" />
          <circle cx="60" cy="60" r="45" stroke="#A38A00" strokeWidth="1" fill="none" />
          <text
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle"
            fontSize="60"
            fontWeight="bold"
            fill="#614a00"
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
