import mongoose, { Model } from 'mongoose';
import { z } from 'zod';

export const guardianSchema = z.object({
  name: z.string().max(25, {
    message: "Name can't be more than 25 characters",
  }),
  relation: z.string(),
  occupation: z.string(),
  phone: z.string(),
});

export const studentSchema = z.object({
  userId: z.string(),
  name: z.object({
    firstName: z.string().max(15, {
      message: "First name can't contain more than 15 characters",
    }),
    lastName: z.string().max(15, {
      message: "Last name can't contain more than 15 characters'",
    }),
  }),
  avatarUrl: z.string().url(),
  email: z.string().email().min(5),
  phone: z.string(),
  user: z.custom<mongoose.Types.ObjectId>().optional(),
  admittedSemester: z.custom<mongoose.Types.ObjectId>(),
  department: z.custom<mongoose.Types.ObjectId>(),
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.string(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianSchema,
  isDeleted: z.boolean().optional(),
});

export const studentUpdatePayload = studentSchema.deepPartial();

export type Student = z.infer<typeof studentSchema>;
export type UpdateStudentPayload = z.infer<typeof studentUpdatePayload>;
export type TGuardian = z.infer<typeof guardianSchema>;

export interface StudentModelMethods extends Model<Student> {
  findStudent(email: string): Promise<Student | null>;
}

/*
 * For creating instance
export type StudentMethod = {
  findStudent(id: string): Promise<TStudent | null>;
};

export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethod
>;
 */
