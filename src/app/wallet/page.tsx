"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGameState } from '@/hooks/use-game-state';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function WalletPage() {
  const { state } = useGameState();
  const { rupees, transactions = [] } = state;

  return (
    <main className="flex min-h-[calc(100vh-52px)] flex-col items-center p-4">
       <div className="w-full max-w-2xl mx-auto">
        <div className="relative mb-8 text-center">
            <Link href="/" passHref className="absolute left-0 top-1/2 -translate-y-1/2">
                <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-6 w-6" />
                    <span className="sr-only">Back to game</span>
                </Button>
            </Link>
            <h1 className="text-3xl font-bold">Your Wallet</h1>
        </div>

        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                    <Coins className="h-8 w-8 text-primary" />
                    <span>Current Balance</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-extrabold tracking-tight">
                    {Math.floor(rupees).toLocaleString()}
                </p>
                <p className="text-muted-foreground">Rupees</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.length > 0 ? (
                        transactions.map((tx) => (
                            <TableRow key={tx.id}>
                                <TableCell className="font-medium capitalize">{tx.type}</TableCell>
                                <TableCell>{tx.description}</TableCell>
                                <TableCell className={`text-right font-bold ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))
                        ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-muted-foreground">
                            No transactions yet. Keep clicking!
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
