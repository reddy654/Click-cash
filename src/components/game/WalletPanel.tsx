"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CASHOUT_AMOUNT } from '@/lib/constants';
import { CashoutModal } from './CashoutModal';
import { cn } from '@/lib/utils';

interface WalletPanelProps {
  rupees: number;
  onCashout: () => void;
}

export function WalletPanel({ rupees, onCashout }: WalletPanelProps) {
  const [isCashoutModalOpen, setIsCashoutModalOpen] = useState(false);
  const canCashout = rupees >= CASHOUT_AMOUNT;
  const progress = Math.min((rupees / CASHOUT_AMOUNT) * 100, 100);

  const handleCashoutClick = () => {
    if (canCashout) {
      setIsCashoutModalOpen(true);
    }
  };

  const handleConfirmCashout = () => {
    onCashout();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Wallet</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="space-y-2">
            <div className="text-sm space-y-1">
              <p className="font-medium">💰 Balance: ₹{Math.floor(rupees).toLocaleString()}</p>
              <p className="font-medium text-muted-foreground">🏦 Target: ₹{CASHOUT_AMOUNT.toLocaleString()}</p>
            </div>
            <Progress value={progress} />
            <div className="text-xs text-muted-foreground text-right">
              {canCashout
                ? "You can cash out now!"
                : `Remaining: ₹${(CASHOUT_AMOUNT - Math.floor(rupees)).toLocaleString()} left to cash out!`}
            </div>
          </div>
          <Button
            onClick={handleCashoutClick}
            disabled={!canCashout}
            className={cn(
              'w-full bg-green-500 hover:bg-green-600 text-white',
              canCashout && 'animate-pulse-glow'
            )}
          >
            💵 Cashout ₹{CASHOUT_AMOUNT.toLocaleString()}
          </Button>
        </CardContent>
      </Card>
      <CashoutModal
        isOpen={isCashoutModalOpen}
        onOpenChange={setIsCashoutModalOpen}
        onConfirm={handleConfirmCashout}
      />
    </>
  );
}
