"use client";

import React from 'react';
import { Coins, Zap, Gem, ChevronsRight, HelpCircle, X, Wallet } from 'lucide-react';
import { useGameState } from '@/hooks/use-game-state';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OnboardingModal } from '@/components/game/OnboardingModal';
import { RupeeCoin } from '@/components/game/RupeeCoin';
import { WalletPanel } from '@/components/game/WalletPanel';
import { UpgradeItem } from '@/components/game/UpgradeItem';
import { PlusOneAnimation } from '@/components/game/PlusOneAnimation';
import { FlyingRupees } from '@/components/game/FlyingRupees';
import { SoundToggle } from '@/components/game/SoundToggle';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MULTIPLIER_MAX_LEVEL } from '@/lib/constants';

export default function Home() {
  const { state, actions, animations } = useGameState();

  if (!state.player?.termsAccepted) {
    return <OnboardingModal onStart={actions.setPlayer} />;
  }

  const { rupees, upgrades, player } = state;
  const { rupeeClick, buyUpgrade } = actions;
  const { clickAnimations, showRupeeAnimation } = animations;

  const isMultiplierMaxed = upgrades.multiplier.level >= MULTIPLIER_MAX_LEVEL;

  return (
    <main className="flex min-h-[calc(100vh-52px)] flex-col items-center justify-center p-4 overflow-hidden relative">
      {showRupeeAnimation && <FlyingRupees />}
      {clickAnimations.map((anim) => (
        <PlusOneAnimation
          key={anim.id}
          x={anim.x}
          y={anim.y}
          value={anim.value}
          onAnimationComplete={animations.removeClickAnimation}
          id={anim.id}
        />
      ))}

      <div className="absolute top-4 left-4">
        <Link href="/wallet" passHref>
          <Button variant="ghost" size="icon">
            <Wallet className="h-6 w-6" />
            <span className="sr-only">Open Wallet</span>
          </Button>
        </Link>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-4">
        <SoundToggle />
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center z-10">
        <div className="text-center mb-4">
          <p className="text-lg text-muted-foreground">Welcome back, {player.name}!</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center justify-center gap-2">
            <Coins className="h-10 w-10 text-primary" />
            <span>{Math.floor(rupees).toLocaleString()}</span>
          </h1>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-1 flex flex-col gap-6 order-2 md:order-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Upgrades</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <UpgradeItem
                  icon={ChevronsRight}
                  name="Multiplier"
                  description={isMultiplierMaxed ? 'Max level reached!' : '+1 Rupee per click'}
                  level={upgrades.multiplier.level}
                  cost={upgrades.multiplier.cost}
                  onBuy={() => buyUpgrade('multiplier', 'Multiplier')}
                  disabled={rupees < upgrades.multiplier.cost || isMultiplierMaxed}
                  isPurchased={isMultiplierMaxed}
                />
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1 flex items-center justify-center order-1 md:order-2">
            <RupeeCoin onClick={rupeeClick} />
          </div>
        </div>
      </div>
    </main>
  );
}
