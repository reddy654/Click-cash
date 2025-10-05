"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CheckCircle } from 'lucide-react';

const formSchema = z.object({
  upiId: z.string().min(3, { message: 'UPI ID must be at least 3 characters.' }).regex(/@/, { message: 'Please enter a valid UPI ID.' }),
});

interface CashoutModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
}

export function CashoutModal({ isOpen, onOpenChange, onConfirm }: CashoutModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      upiId: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Withdrawal to:', values.upiId);
    setIsSuccess(true);
    onConfirm();
    setTimeout(() => {
      onOpenChange(false);
      // Reset state for next time
      setTimeout(() => {
        setIsSuccess(false);
        form.reset();
      }, 500);
    }, 3000);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>Enter your UPI ID</DialogTitle>
              <DialogDescription>
                This is a simulation. No real money will be transferred.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="upiId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UPI ID</FormLabel>
                      <FormControl>
                        <Input placeholder="yourname@upi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Confirm Withdrawal</Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h2 className="text-xl font-bold">Withdrawal Initiated!</h2>
              <p className="text-center text-muted-foreground">
                ✅ Yeah! Your withdrawal is successfully initiated. It will be credited to your account within 12 hours.
              </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
