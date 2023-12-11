import mongoose from 'mongoose';
import { z } from 'zod';

export const departmentValidation = z.object({
  name: z.string(),
  academicFaculty: z.custom<mongoose.Types.ObjectId>(),
});

export type Department = z.infer<typeof departmentValidation>;
