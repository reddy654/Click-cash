export interface Upgrade {
  level: number;
  cost: number;
}

export interface UpgradesState {
  multiplier: Upgrade;
}

export interface PlayerState {
  name: string;
  termsAccepted: boolean;
}

export interface Transaction {
  id: string;
  type: 'click' | 'upgrade' | 'autoclick' | 'cashout';
  description: string;
  amount: number;
  timestamp: number;
}

export interface GameState {
  rupees: number;
  upgrades: UpgradesState;
  player: PlayerState | null;
  transactions: Transaction[];
}

export type ClickAnimation = {
  id: number;
  x: number;
  y: number;
  value: number;
};
