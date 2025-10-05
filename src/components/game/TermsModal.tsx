"use client";

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface TermsModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function TermsModal({ isOpen, onOpenChange }: TermsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Terms & Conditions</DialogTitle>
        </DialogHeader>
        <DialogDescription className="py-4 text-foreground">
          This is a fun simulation game. No real money or withdrawals are involved. All coins and transactions are purely virtual and for entertainment purposes only.
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>I Understand</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
