import { Schema } from 'mongoose';
import { OfferedCourse, days } from './offered-course.interface';

const offeredCourseModelSchema = new Schema<OfferedCourse>({
  registration: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'registration',
  },
  department: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'department',
  },
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'course',
  },
  faculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'faculty',
  },

  days: {
    type: String,
    required: true,
    enum: days,
  },
  maxCapacity: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  section: {
    type: Number,
    required: true,
  },
  semester: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});
