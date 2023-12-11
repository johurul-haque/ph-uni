import { AppError } from '@utils';
import { Schema, model } from 'mongoose';
import { Department } from './department.interface';

const departmentModelSchema = new Schema<Department>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'faculty',
    },
  },
  {
    timestamps: true,
  }
);

departmentModelSchema.pre('save', async function (next) {
  const isExisting = await DepartmentModel.findOne({
    name: this.name,
  });

  if (isExisting) throw new AppError(403, 'Department already exists!');

  next();
});

export const DepartmentModel = model<Department>(
  'department',
  departmentModelSchema
);
