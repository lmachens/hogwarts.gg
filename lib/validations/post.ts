import z from 'zod';

export const postPatchSchema = z.object({
  title: z.string().max(128).optional(),
  short: z.string().optional(),
  body: z.string().optional(),
  image: z.string().optional(),
  published: z.boolean().optional(),
});
