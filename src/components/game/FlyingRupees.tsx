"use client";

import React, { useEffect, useState } from 'react';
import { Gem } from 'lucide-react';

const Rupee = ({ style }: { style: React.CSSProperties }) => (
  <Gem
    className="absolute text-primary opacity-0"
    style={style}
    size={Math.random() * 20 + 20}
  />
);

export function FlyingRupees() {
  const [rupees, setRupees] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    const generateRupees = () => {
      const newRupees = Array.from({ length: 30 }).map((_, i) => {
        const style: React.CSSProperties = {
          left: `${Math.random() * 100}vw`,
          animation: `rupee-rain ${Math.random() * 3 + 4}s linear ${Math.random() * 5}s infinite`,
        };
        return <Rupee key={i} style={style} />;
      });
      setRupees(newRupees);
    };

    generateRupees();
  }, []);

  return <div className="fixed inset-0 w-full h-full pointer-events-none z-50">{rupees}</div>;
}
