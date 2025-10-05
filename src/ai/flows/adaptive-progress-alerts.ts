/**
 * @fileOverview Implements a Genkit flow to analyze game progress and display adaptive progress alerts and Rupee animations based on user progress.
 *
 * - analyzeProgressAndDisplayAlerts - A function that takes game state as input and returns progress alerts and animation triggers.
 * - AdaptiveProgressAlertsInput - The input type for the analyzeProgressAndDisplayAlerts function.
 * - AdaptiveProgressAlertsOutput - The return type for the analyzeProgressAndDisplayAlerts function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptiveProgressAlertsInputSchema = z.object({
  totalRupees: z.number().describe('The total number of rupees the player has.'),
  multiplierLevel: z.number().describe('The level of the multiplier upgrade.'),
  timeSinceLastUpgrade: z
    .number()
    .describe(
      'The time in seconds since the last upgrade was purchased. Use 0 if upgrades have been purchased in the last second.'
    ),
});
export type AdaptiveProgressAlertsInput = z.infer<
  typeof AdaptiveProgressAlertsInputSchema
>;

const AdaptiveProgressAlertsOutputSchema = z.object({
  progressAlert: z
    .string()
    .describe('A message to display to the user indicating progress.'),
  triggerRupeeAnimation: z
    .boolean()
    .describe('Whether to trigger the rupee animation.'),
});
export type AdaptiveProgressAlertsOutput = z.infer<
  typeof AdaptiveProgressAlertsOutputSchema
>;

export async function analyzeProgressAndDisplayAlerts(
  input: AdaptiveProgressAlertsInput
): Promise<AdaptiveProgressAlertsOutput> {
  return adaptiveProgressAlertsFlow(input);
}

const adaptiveProgressAlertsPrompt = ai.definePrompt({
  name: 'adaptiveProgressAlertsPrompt',
  input: {schema: AdaptiveProgressAlertsInputSchema},
  output: {schema: AdaptiveProgressAlertsOutputSchema},
  prompt: `You are a game progress analyzer. You will analyze the player's progress in Rupee Clicker Quest and determine if a progress alert should be displayed and whether to trigger a Rupee animation.

Consider the following game state:

Total Rupees: {{{totalRupees}}}
Multiplier Level: {{{multiplierLevel}}}
Time since last upgrade: {{{timeSinceLastUpgrade}}} seconds.

Based on this information, determine a suitable progressAlert message to display to the user to make the game more engaging. Also, decide whether to trigger the Rupee animation based on significant progress, upgrade purchases, or a lack of progress.

Specifically:
* If the player hasn't purchased an upgrade in a while (e.g., timeSinceLastUpgrade > 60), suggest they purchase a specific upgrade.
* If the player has a lot of rupees but hasn't upgraded, suggest they upgrade.
* If the player has recently purchased an upgrade, trigger the Rupee animation to celebrate.
* Vary the progressAlert messages to keep the game interesting.

If the total rupees are above 25000, do not provide a progress alert.
If no upgrade has been purchased return empty progressAlert string.

Return a JSON object with the progressAlert and triggerRupeeAnimation fields.
`,
});

const adaptiveProgressAlertsFlow = ai.defineFlow(
  {
    name: 'adaptiveProgressAlertsFlow',
    inputSchema: AdaptiveProgressAlertsInputSchema,
    outputSchema: AdaptiveProgressAlertsOutputSchema,
  },
  async input => {
    const {output} = await adaptiveProgressAlertsPrompt(input);
    return output!;
  }
);
