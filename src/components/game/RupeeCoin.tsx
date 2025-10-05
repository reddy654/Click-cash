"use client";

import React from 'react';
import Image from 'next/image';

interface RupeeCoinProps {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function RupeeCoin({ onClick }: RupeeCoinProps) {
  return (
    <div 
      onClick={onClick}
      className="relative group cursor-pointer"
    >
      <Image
        src="/rupee-coin.png"
        alt="Rupee Coin"
        width={256}
        height={256}
        className="w-48 h-48 sm:w-64 sm:h-64 group-active:animate-coin-click transition-transform duration-300 ease-in-out group-hover:scale-110"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full bg-accent opacity-0 group-hover:opacity-25 transition-opacity duration-500 blur-3xl"></div>
      </div>
    </div>
  );
}
