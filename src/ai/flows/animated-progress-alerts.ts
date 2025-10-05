'use server';

/**
 * @fileOverview Implements a Genkit flow to analyze game progress and display progress alerts and Rupee animations.
 *
 * - analyzeProgressAndDisplayAlerts - A function that takes game state as input and returns progress alerts and animation triggers.
 * - AnimatedProgressAlertsInput - The input type for the analyzeProgressAndDisplayAlerts function.
 * - AnimatedProgressAlertsOutput - The return type for the analyzeProgressAndDisplayAlerts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnimatedProgressAlertsInputSchema = z.object({
  totalRupees: z.number().describe('The total number of rupees the player has.'),
  multiplierLevel: z.number().describe('The level of the multiplier upgrade.'),
});
export type AnimatedProgressAlertsInput = z.infer<
  typeof AnimatedProgressAlertsInputSchema
>;

const AnimatedProgressAlertsOutputSchema = z.object({
  progressAlert: z
    .string()
    .describe('A message to display to the user indicating progress.'),
  triggerRupeeAnimation: z
    .boolean()
    .describe('Whether to trigger the rupee animation.'),
});
export type AnimatedProgressAlertsOutput = z.infer<
  typeof AnimatedProgressAlertsOutputSchema
>;

export async function analyzeProgressAndDisplayAlerts(
  input: AnimatedProgressAlertsInput
): Promise<AnimatedProgressAlertsOutput> {
  return animatedProgressAlertsFlow(input);
}

const animatedProgressAlertsPrompt = ai.definePrompt({
  name: 'animatedProgressAlertsPrompt',
  input: {schema: AnimatedProgressAlertsInputSchema},
  output: {schema: AnimatedProgressAlertsOutputSchema},
  prompt: `You are a game progress analyzer. You will analyze the player's progress in Rupee Clicker Quest and determine if a progress alert should be displayed and whether to trigger a Rupee animation.

Consider the following game state:

Total Rupees: {{{totalRupees}}}
Multiplier Level: {{{multiplierLevel}}}

Based on this information, determine a suitable progressAlert message to display to the user to make the game more engaging. Also, decide whether to trigger the Rupee animation based on significant progress or upgrade purchases.

If the total rupees are above 25000, do not provide a progress alert.
If no upgrade has been purchased return empty progressAlert string.

Return a JSON object with the progressAlert and triggerRupeeAnimation fields.
`,
});

const animatedProgressAlertsFlow = ai.defineFlow(
  {
    name: 'animatedProgressAlertsFlow',
    inputSchema: AnimatedProgressAlertsInputSchema,
    outputSchema: AnimatedProgressAlertsOutputSchema,
  },
  async input => {
    const {output} = await animatedProgressAlertsPrompt(input);
    return output!;
  }
);
