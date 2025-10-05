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
import { TermsModal } from './TermsModal';
import { PlayerState } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(50),
});

interface OnboardingModalProps {
  onStart: (player: PlayerState) => void;
}

export function OnboardingModal({ onStart }: OnboardingModalProps) {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onStart({ name: values.name, termsAccepted: true });
  }

  return (
    <>
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[425px]" hideCloseButton>
          <DialogHeader>
            <DialogTitle className="text-2xl">Welcome to Rupee Clicker Quest!</DialogTitle>
            <DialogDescription>
              Enter your name to start your journey to riches.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Rohan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="flex-col-reverse sm:flex-col-reverse sm:space-x-0 gap-2">
                 <Button type="submit" className="w-full">Start Game</Button>
                 <Button type="button" variant="ghost" onClick={() => setIsTermsOpen(true)} className="w-full">
                  View Terms & Conditions
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <TermsModal isOpen={isTermsOpen} onOpenChange={setIsTermsOpen} />
    </>
  );
}
