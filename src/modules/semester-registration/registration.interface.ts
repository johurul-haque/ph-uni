import { Types } from 'mongoose';
import { z } from 'zod';

export const status = ['UPCOMING', 'ONGOING', 'ENDED'] as const;

export const registrationSchema = z.object({
  semester: z.custom<Types.ObjectId>(),
  status: z.enum(status),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  minCredit: z.number(),
  maxCredit: z.number(),
});

export type SemesterRegistration = z.infer<typeof registrationSchema>;
