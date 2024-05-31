import { z } from 'zod';

export const rankResponse = z.object({ rank: z.string().nullish() });
export const aktiveRequestSchema = {
  params: z.object({
    country: z.string().describe('The country name.'),
    username: z.string().describe('The username.'),
  }),
  querystring: z.object({
    style: z
      .enum(['flat', 'plastic', 'flat-square', 'for-the-badge', 'social'])
      .default('flat')
      .describe('Set the style of the badge.'),
    label: z
      .string()
      .default('Most Active GitHub User Rank')
      .describe('Set the left-hand-side text.'),
    labelColor: z
      .string()
      .default('')
      .describe('Set background color of the left part.'),
    color: z
      .string()
      .default('')
      .describe('Set background color of the right part.'),
    rnkPrefix: z
      .string()
      .default('')
      .describe('The prefix to display before the rank value.'),
    rnkSuffix: z
      .string()
      .default('')
      .describe('The suffix to display after the rank value.'),
  }),
};

