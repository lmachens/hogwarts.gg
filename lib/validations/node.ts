import z from 'zod';

export const nodeSchema = z.object({
  title: z.string().min(3).max(128),
  description: z.string().min(3).optional(),
  type: z.string(),
  latLng: z.number().array().length(2),
});
