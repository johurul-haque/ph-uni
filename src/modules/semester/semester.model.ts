import { Schema, model } from 'mongoose';
import {
  Semester,
  months,
  semesterCode,
  semesterName,
} from './semester.interface';

const semesterModelSchema = new Schema<Semester>(
  {
    name: { type: String, required: true, enum: semesterName },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: semesterCode },
    startMonth: { type: String, required: true, enum: months },
    endMonth: { type: String, required: true, enum: months },
  },
  {
    toJSON: {
      transform: (doc, { _id, __v, ...rest }) => rest,
    },
  }
);

semesterModelSchema.pre('save', async function (next) {
  const doesSemesterExist = await SemesterModel.findOne({
    name: this.name,
    year: this.year,
  });

  if (doesSemesterExist)
    throw new Error(`${this.name} semester already exists in ${this.year}`);

  next();
});

export const SemesterModel = model('semester', semesterModelSchema);
