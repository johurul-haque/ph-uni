import { model, Schema } from 'mongoose';
import {
  StudentModelMethods,
  TGuardian,
  UpdateStudentPayload,
} from './student.interface';

const guardianSchema = new Schema<TGuardian>({
  name: { type: String, required: true },
  relation: { type: String, required: true },
  occupation: { type: String, required: true },
  phone: { type: String, required: true },
});

const studentSchema = new Schema<UpdateStudentPayload, StudentModelMethods>(
  {
    userId: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'user',
    },
    name: {
      required: [true, 'Username is required'],
      type: {
        firstName: {
          type: String,
          required: true,
          maxlength: [12, 'First name cannot contain more than 12 characters'],
        },
        lastName: { type: String, required: true },
      },
      _id: false,
    },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message:
          'Gender field can only be male or female. {VALUE} is not supported.',
      },
      required: true,
    },
    avatarUrl: String,
    admittedSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'semester',
    },
    department: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'department',
    },
    dateOfBirth: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    guardian: { type: guardianSchema, required: true, _id: false },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      transform: (doc, { _id, __v, ...rest }) => rest,
    },
  }
);

studentSchema.statics.findStudent = async function (email: string) {
  return StudentModel.findOne({ email });
};

/*
studentSchema.methods.findStudent = async function (id: string) {
  return Student.findOne({ id });
};
*/

export const StudentModel = model<UpdateStudentPayload, StudentModelMethods>(
  'student',
  studentSchema
);
