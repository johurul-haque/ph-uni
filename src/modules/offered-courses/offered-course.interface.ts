import { Types } from 'mongoose';
import { z } from 'zod';

export const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const;

export const offeredCourseSchema = z.object({
  registration: z.custom<Types.ObjectId>(),
  semester: z.custom<Types.ObjectId>(),
  faculty: z.custom<Types.ObjectId>(),
  department: z.custom<Types.ObjectId>(),
  course: z.custom<Types.ObjectId>(),
  maxCapacity: z.custom<Types.ObjectId>(),
  section: z.number(),
  days: z.enum(days),
  startTime: z.string().refine(validateTime, {
    message: 'Invalid format. Expected "HH:MM" in 24 hours format',
  }),
  endTime: z.string().refine(validateTime, {
    message: 'Invalid format. Expected "HH:MM" in 24 hours format',
  }),
});

function validateTime(time: string) {
  const regex = /^([01]?[0-9]2[0-3]):[0-5][0-9]$/;
  return regex.test(time);
}

export type OfferedCourse = z.infer<typeof offeredCourseSchema>;
