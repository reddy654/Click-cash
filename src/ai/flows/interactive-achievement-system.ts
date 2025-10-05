'use server';

/**
 * @fileOverview Implements a Genkit flow to analyze game progress and display progress alerts and Rupee animations.
 *
 * - analyzeProgressAndDisplayAlerts - A function that takes game state as input and returns progress alerts and animation triggers.
 * - InteractiveAchievementSystemInput - The input type for the analyzeProgressAndDisplayAlerts function.
 * - InteractiveAchievementSystemOutput - The return type for the analyzeProgressAndDisplayAlerts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InteractiveAchievementSystemInputSchema = z.object({
  totalRupees: z.number().describe('The total number of rupees the player has.'),
  autoClickerLevel: z.number().describe('The level of the auto clicker upgrade.'),
  multiplierLevel: z.number().describe('The level of the multiplier upgrade.'),
  doubleRupeesPurchased: z
    .boolean()
    .describe('Whether the double rupees upgrade has been purchased.'),
  lastClickRupees: z.number().describe('The number of rupees earned from the last click.'),
});
export type InteractiveAchievementSystemInput = z.infer<
  typeof InteractiveAchievementSystemInputSchema
>;

const InteractiveAchievementSystemOutputSchema = z.object({
  triggerRupeeAnimation: z
    .boolean()
    .describe('Whether to trigger the rupee animation.'),
});
export type InteractiveAchievementSystemOutput = z.infer<
  typeof InteractiveAchievementSystemOutputSchema
>;

export async function analyzeProgressAndTriggerAnimation(
  input: InteractiveAchievementSystemInput
): Promise<InteractiveAchievementSystemOutput> {
  return interactiveAchievementSystemFlow(input);
}

const interactiveAchievementSystemPrompt = ai.definePrompt({
  name: 'interactiveAchievementSystemPrompt',
  input: {schema: InteractiveAchievementSystemInputSchema},
  output: {schema: InteractiveAchievementSystemOutputSchema},
  prompt: `You are a game progress analyzer. You will analyze the player's progress in Rupee Clicker Quest and determine if a Rupee animation should be triggered.

Consider the following game state:

Total Rupees: {{{totalRupees}}}
Auto Clicker Level: {{{autoClickerLevel}}}
Multiplier Level: {{{multiplierLevel}}}
Double Rupees Purchased: {{{doubleRupeesPurchased}}}
Last Click Rupees: {{{lastClickRupees}}}

Base the decision on whether to trigger the Rupee animation based on significant progress, upgrade purchases, or a large number of rupees earned from the last click.

Return a JSON object with the triggerRupeeAnimation field.
`,
});

const interactiveAchievementSystemFlow = ai.defineFlow(
  {
    name: 'interactiveAchievementSystemFlow',
    inputSchema: InteractiveAchievementSystemInputSchema,
    outputSchema: InteractiveAchievementSystemOutputSchema,
  },
  async input => {
    const {output} = await interactiveAchievementSystemPrompt(input);
    return output!;
  }
);
