import z from 'zod';

export const postPatchSchema = z.object({
  slug: z.string().min(2).max(128),
  title: z.string().max(128),
  short: z.string().min(10),
  body: z.string().min(16),
  image: z.string().optional(),
  published: z.boolean().optional(),
});
