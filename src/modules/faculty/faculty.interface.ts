import { z } from 'zod';

export const facultyValidateSchema = z.object({
  name: z.string(),
});

export type Faculty = z.infer<typeof facultyValidateSchema>;
