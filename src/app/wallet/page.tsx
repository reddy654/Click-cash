"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Coins, Wallet, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGameState } from '@/hooks/use-game-state';
import { Progress } from '@/components/ui/progress';
import { CASHOUT_AMOUNT } from '@/lib/constants';

export default function WalletPage() {
  const { state } = useGameState();
  const { rupees, totalClicks = 0 } = state;

  const progress = Math.min((rupees / CASHOUT_AMOUNT) * 100, 100);
  const remainingForCashout = CASHOUT_AMOUNT - rupees;
  const canCashout = rupees >= CASHOUT_AMOUNT;

  return (
    <main className="flex min-h-[calc(100vh-52px)] flex-col items-center p-4 bg-background">
      <div className="w-full max-w-md mx-auto">
        <div className="relative mb-6 text-center">
            <Button asChild variant="ghost" size="icon" className="absolute right-0 top-0">
                <Link href="/">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close</span>
                </Link>
            </Button>
            <div className="flex items-center justify-center gap-3">
                <Wallet className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">Your Wallet</h1>
            </div>
            <p className="text-muted-foreground mt-1">Manage your earnings and cashout rewards</p>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-primary to-accent text-primary-foreground border-none shadow-lg">
            <CardContent className="p-6">
                <p className="text-sm opacity-80">Current Balance</p>
                <div className="flex items-center gap-2">
                    <p className="text-4xl font-extrabold tracking-tight">
                        ₹{Math.floor(rupees).toLocaleString()}
                    </p>
                    <Sparkles className="h-6 w-6 text-yellow-300" />
                </div>
            </CardContent>
        </Card>

        <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center text-sm font-medium">
                <p>Progress to Cashout</p>
                <p className="text-primary">{progress.toFixed(1)}%</p>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-center text-sm text-muted-foreground">
                {canCashout ? "You're eligible to cashout!" : `${remainingForCashout.toLocaleString()} more to unlock cashout`}
            </p>
        </div>

        <Button disabled={!canCashout} size="lg" className="w-full h-12 text-base font-bold mb-6">
            <Wallet className="mr-2 h-5 w-5" />
            Need ₹{CASHOUT_AMOUNT.toLocaleString()} to Cashout
        </Button>

        <div className="grid grid-cols-2 gap-4 text-center">
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{totalClicks}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Next Milestone</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold text-primary">₹{CASHOUT_AMOUNT.toLocaleString()}</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}
