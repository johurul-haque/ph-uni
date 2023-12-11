import { Schema, model } from 'mongoose';

const facultyModelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FacultyModel = model('faculty', facultyModelSchema);
