'use server';

/**
 * @fileOverview Implements a Genkit flow to improve the tone of the virtual assistant's responses
 * based on user feedback. It takes the original response and tone feedback as input and returns
 * a modified response with the adjusted tone.
 *
 * - improveResponseTone - A function that adjusts the tone of the virtual assistant's responses.
 * - ImproveResponseToneInput - The input type for the improveResponseTone function.
 * - ImproveResponseToneOutput - The return type for the improveResponseTone function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveResponseToneInputSchema = z.object({
  originalResponse: z
    .string()
    .describe('The original response from the virtual assistant.'),
  toneFeedback: z
    .string()
    .describe(
      'Feedback on the desired tone of the response (e.g., more cheerful, less formal).'
    ),
});
export type ImproveResponseToneInput = z.infer<typeof ImproveResponseToneInputSchema>;

const ImproveResponseToneOutputSchema = z.object({
  modifiedResponse: z
    .string()
    .describe('The modified response with the adjusted tone.'),
});
export type ImproveResponseToneOutput = z.infer<typeof ImproveResponseToneOutputSchema>;

export async function improveResponseTone(
  input: ImproveResponseToneInput
): Promise<ImproveResponseToneOutput> {
  return improveResponseToneFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveResponseTonePrompt',
  input: {schema: ImproveResponseToneInputSchema},
  output: {schema: ImproveResponseToneOutputSchema},
  prompt: `You are a virtual assistant that adjusts the tone of its responses based on user feedback.

  Original Response: {{{originalResponse}}}
  Tone Feedback: {{{toneFeedback}}}

  Modify the original response to incorporate the tone feedback and return the modified response.
  The modified response should sound natural and maintain the original meaning while adjusting the tone as requested.
  Ensure that you do not miss any salient facts in the original response and ensure that the modified response contains those salient facts.
  If the tone feedback is contradictory or impossible, resolve the conflict as best as possible.
  Modified Response:`,
});

const improveResponseToneFlow = ai.defineFlow(
  {
    name: 'improveResponseToneFlow',
    inputSchema: ImproveResponseToneInputSchema,
    outputSchema: ImproveResponseToneOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
