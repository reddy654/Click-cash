"use client";

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface UpgradeItemProps {
  icon: React.ElementType;
  name: string;
  description: string;
  level: number;
  cost: number;
  onBuy: () => void;
  disabled?: boolean;
  isPurchased?: boolean;
}

export function UpgradeItem({
  icon: Icon,
  name,
  description,
  level,
  cost,
  onBuy,
  disabled,
  isPurchased,
}: UpgradeItemProps) {
  return (
    <div className="flex items-center gap-4 p-2 rounded-lg transition-colors hover:bg-secondary/50">
      <div className="bg-secondary p-3 rounded-lg">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold flex items-center gap-2">
          {name}
          {level > 0 && <Badge variant="secondary">Lvl {level}</Badge>}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div>
        {isPurchased ? (
          <Badge variant="default" className="bg-green-500">Purchased</Badge>
        ) : (
          <Button onClick={onBuy} disabled={disabled} size="sm">
            ₹{Math.ceil(cost).toLocaleString()}
          </Button>
        )}
      </div>
    </div>
  );
}
