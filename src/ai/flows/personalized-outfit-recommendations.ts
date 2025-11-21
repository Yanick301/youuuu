'use server';

/**
 * @fileOverview Provides personalized outfit recommendations based on user browsing history and preferences.
 *
 * - getPersonalizedOutfitRecommendations - A function that retrieves personalized outfit recommendations.
 * - PersonalizedOutfitRecommendationsInput - The input type for the getPersonalizedOutfitRecommendations function.
 * - PersonalizedOutfitRecommendationsOutput - The return type for the getPersonalizedOutfitRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedOutfitRecommendationsInputSchema = z.object({
  browsingHistory: z
    .string()
    .describe(
      'A description of the user browsing history and preferences.  Include viewed items, categories, and brands.  Make sure to pass the data as a long string.'
    ),
  stylePreferences: z
    .string()
    .describe('A description of the users style preferences.'),
});
export type PersonalizedOutfitRecommendationsInput = z.infer<
  typeof PersonalizedOutfitRecommendationsInputSchema
>;

const RecommendedProductSchema = z.object({
  productName: z.string().describe("The name of the recommended product."),
  reasoning: z.string().describe("A brief explanation of why this product is recommended for the user."),
});

const PersonalizedOutfitRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(RecommendedProductSchema)
    .describe('A list of personalized outfit recommendations, including the product name and the reasoning.'),
});
export type PersonalizedOutfitRecommendationsOutput = z.infer<
  typeof PersonalizedOutfitRecommendationsOutputSchema
>;

export async function getPersonalizedOutfitRecommendations(
  input: PersonalizedOutfitRecommendationsInput
): Promise<PersonalizedOutfitRecommendationsOutput> {
  return personalizedOutfitRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedOutfitRecommendationsPrompt',
  input: {schema: PersonalizedOutfitRecommendationsInputSchema},
  output: {schema: PersonalizedOutfitRecommendationsOutputSchema},
  prompt: `You are an expert personal stylist for a luxury fashion brand called EZENTIALS.
Your task is to provide personalized outfit recommendations based on the user's browsing history and their stated style preferences.

Analyze the user's browsing history to understand their implicit tastes (e.g., categories, gender, specific items).
Analyze the user's explicit style preferences for the current request.

Based on this analysis, suggest a list of specific, compelling products. For each product, provide a short, encouraging reason why it's a great fit for them, connecting it to their history and preferences.

User's Browsing History:
{{{browsingHistory}}}

User's Style Preferences:
"{{{stylePreferences}}}"

Generate a list of recommended products with your reasoning for each.`,
});

const personalizedOutfitRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedOutfitRecommendationsFlow',
    inputSchema: PersonalizedOutfitRecommendationsInputSchema,
    outputSchema: PersonalizedOutfitRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("Unable to get recommendations");
    }
    return output;
  }
);
