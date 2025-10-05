"use client";

import { useReducer, useEffect, useMemo, useState, useCallback, MouseEvent } from 'react';
import {
  GameState,
  UpgradesState,
  PlayerState,
  ClickAnimation,
  Transaction
} from '@/lib/types';
import {
  CASHOUT_AMOUNT,
  MULTIPLIER_BASE_COST,
  COST_INCREASE_FACTOR,
} from '@/lib/constants';
import { playClickSound, playUpgradeSound, playCashoutSound } from '@/lib/sounds';
import { analyzeProgressAndDisplayAlerts } from '@/ai/flows/animated-progress-alerts';
import { useToast } from '@/hooks/use-toast';

type Action =
  | { type: 'SET_STATE'; payload: GameState }
  | { type: 'CLICK_RUPEE'; payload: number }
  | { type: 'BUY_UPGRADE'; payload: { upgrade: keyof UpgradesState; cost: number; name: string } }
  | { type: 'SET_PLAYER'; payload: PlayerState }
  | { type: 'CASHOUT' };

const initialUpgrades: UpgradesState = {
  multiplier: { level: 1, cost: MULTIPLIER_BASE_COST },
};

const initialState: GameState = {
  rupees: 0,
  upgrades: initialUpgrades,
  player: null,
  transactions: [],
};

const MAX_TRANSACTIONS = 20;

function gameReducer(state: GameState, action: Action): GameState {
  let newTransactions = [...state.transactions];

  const addTransaction = (type: Transaction['type'], description: string, amount: number) => {
    const newTx: Transaction = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      description,
      amount,
      timestamp: Date.now(),
    };
    newTransactions = [newTx, ...newTransactions].slice(0, MAX_TRANSACTIONS);
  }

  switch (action.type) {
    case 'SET_STATE':
      // This is a simplified version. In a real app, you'd want to merge state
      // more carefully, especially with versioning.
      return {
        ...action.payload,
        upgrades: { // Ensure upgrades are not malformed from old state
          multiplier: action.payload.upgrades.multiplier || initialUpgrades.multiplier,
        }
      };
    case 'CLICK_RUPEE':
      // Clicks can be too frequent to log, so we don't add a transaction here.
      return { ...state, rupees: state.rupees + action.payload };
    case 'BUY_UPGRADE': {
      const { upgrade, cost, name } = action.payload;
      const newUpgrades = { ...state.upgrades };
      const currentUpgrade = newUpgrades[upgrade];
      
      addTransaction('upgrade', `Purchased ${name}`, -cost);

      currentUpgrade.level += 1;
      currentUpgrade.cost = currentUpgrade.cost * COST_INCREASE_FACTOR;
      
      return {
        ...state,
        rupees: state.rupees - cost,
        upgrades: newUpgrades,
        transactions: newTransactions
      };
    }
    case 'SET_PLAYER':
      return { ...state, player: action.payload };
    case 'CASHOUT':
      addTransaction('cashout', `Cashed out`, -CASHOUT_AMOUNT);
      return { ...state, rupees: state.rupees - CASHOUT_AMOUNT, transactions: newTransactions };
    default:
      return state;
  }
}

export const useGameState = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { toast } = useToast();
  const [isInitialized, setIsInitialized] = useState(false);

  const [clickAnimations, setClickAnimations] = useState<ClickAnimation[]>([]);
  const [showRupeeAnimation, setShowRupeeAnimation] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('rupee-quest-state');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // Basic validation to prevent loading corrupted state
        if (parsedState.rupees !== undefined && parsedState.upgrades && parsedState.player) {
          // ensure transactions is an array
          if (!Array.isArray(parsedState.transactions)) {
            parsedState.transactions = [];
          }
          dispatch({ type: 'SET_STATE', payload: parsedState });
        }
      }
    } catch (error) {
      console.error('Failed to load game state:', error);
    }
    setIsInitialized(true);
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('rupee-quest-state', JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save game state:', error);
      }
    }
  }, [state, isInitialized]);

  const handleAIProgressCheck = useCallback(async () => {
    if (!state.player) return;

    try {
      const result = await analyzeProgressAndDisplayAlerts({
        totalRupees: state.rupees,
        multiplierLevel: state.upgrades.multiplier.level,
      });

      if (result.progressAlert) {
        toast({
          title: 'Achievement Unlocked!',
          description: result.progressAlert,
        });
      }

      if (result.triggerRupeeAnimation) {
        setShowRupeeAnimation(true);
        setTimeout(() => setShowRupeeAnimation(false), 8000); // Animation duration
      }
    } catch (e) {
      console.error("AI flow failed:", e);
    }
  }, [state.rupees, state.upgrades, state.player, toast]);


  const clickValue = useMemo(() => {
    return state.upgrades.multiplier.level;
  }, [state.upgrades.multiplier.level]);


  const rupeeClick = useCallback((event: MouseEvent) => {
    dispatch({ type: 'CLICK_RUPEE', payload: clickValue });
    playClickSound();

    const newAnimation: ClickAnimation = {
      id: Date.now() + Math.random(),
      x: event.clientX,
      y: event.clientY,
      value: clickValue
    };
    setClickAnimations(current => [...current, newAnimation]);
  }, [clickValue]);

  const removeClickAnimation = useCallback((id: number) => {
    setClickAnimations(current => current.filter(anim => anim.id !== id));
  }, []);

  const buyUpgrade = useCallback((upgrade: keyof UpgradesState, name: string) => {
    const currentUpgrade = state.upgrades[upgrade];
    if (state.rupees >= currentUpgrade.cost) {
      dispatch({ type: 'BUY_UPGRADE', payload: { upgrade, cost: currentUpgrade.cost, name } });
      playUpgradeSound();
      handleAIProgressCheck();
    }
  }, [state.rupees, state.upgrades, handleAIProgressCheck]);

  const setPlayer = useCallback((player: PlayerState) => {
    dispatch({ type: 'SET_PLAYER', payload: player });
  }, []);

  const cashOut = useCallback(() => {
    if (state.rupees >= CASHOUT_AMOUNT) {
      dispatch({ type: 'CASHOUT' });
      playCashoutSound();
    }
  }, [state.rupees]);

  return {
    state,
    actions: useMemo(() => ({
      rupeeClick,
      buyUpgrade,
      setPlayer,
      cashOut,
    }), [rupeeClick, buyUpgrade, setPlayer, cashOut]),
    animations: useMemo(() => ({
      clickAnimations,
      removeClickAnimation,
      showRupeeAnimation,
    }), [clickAnimations, removeClickAnimation, showRupeeAnimation]),
  };
};
