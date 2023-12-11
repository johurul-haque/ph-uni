import { InferSchemaType } from 'mongoose';
import { z } from 'zod';
import { userModelSchema } from './user.model';

export const userSchema = z.object({
  password: z
    .string()
    .max(20, {
      message: "Password can't be more than 20 characters",
    })
    .optional(),
});

export type User = InferSchemaType<typeof userModelSchema>;
