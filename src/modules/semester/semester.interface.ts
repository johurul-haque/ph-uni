import { z } from 'zod';

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;
// type Month = (typeof months)[number];

export enum SemesterEnum {
  Autumn = '01',
  Summer = '02',
  Fall = '03',
}

export const semesterName = Object.keys(SemesterEnum);
export const semesterCode = Object.values(SemesterEnum);

export const semesterValidateSchema = z.object({
  name: z.enum(semesterName as [string, ...string[]]),
  code: z.enum(semesterCode as [string, ...string[]]),
  year: z.number().min(2020).max(2100),
  startMonth: z.enum(months),
  endMonth: z.enum(months),
});

export type Semester = z.infer<typeof semesterValidateSchema>;
