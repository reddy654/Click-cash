"use client";

import React from 'react';
import { Wallet } from 'lucide-react';
import { useGameState } from '@/hooks/use-game-state';
import { OnboardingModal } from '@/components/game/OnboardingModal';
import { RupeeCoin } from '@/components/game/RupeeCoin';
import { PlusOneAnimation } from '@/components/game/PlusOneAnimation';
import { FlyingRupees } from '@/components/game/FlyingRupees';
import { SoundToggle } from '@/components/game/SoundToggle';
import Link from 'next/link';
import { CASHOUT_AMOUNT } from '@/lib/constants';

export default function Home() {
  const { state, actions, animations } = useGameState();

  if (!state.player?.termsAccepted) {
    return <OnboardingModal onStart={actions.setPlayer} />;
  }

  const { rupees, player } = state;
  const { rupeeClick } = actions;
  const { clickAnimations, showRupeeAnimation } = animations;

  return (
    <main className="flex min-h-[calc(100vh-52px)] flex-col items-center justify-between p-4 overflow-hidden relative">
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

      <div className="w-full max-w-sm">
        <Link href="/wallet" className="cursor-pointer">
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-card/80 backdrop-blur-sm shadow-lg transition-all hover:shadow-xl hover:scale-105 border">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent shadow-inner">
                <Wallet className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Your Wallet</p>
                <p className="font-bold text-lg text-foreground">
                  ₹{Math.floor(rupees).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Tap to view</p>
          </div>
        </Link>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-4">
        <SoundToggle />
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center z-10 -mt-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent py-2">
            Rupee Clicker
          </h1>
          <p className="text-lg text-muted-foreground mt-2">Welcome back, {player.name}! 👋</p>
          <p className="text-sm text-muted-foreground mt-1">Click the rupee to earn money! Reach ₹{CASHOUT_AMOUNT.toLocaleString()} to cashout</p>
      </div>
      
      <div className="w-full flex items-center justify-center">
        <RupeeCoin onClick={rupeeClick} />
      </div>

    </main>
  );
}
