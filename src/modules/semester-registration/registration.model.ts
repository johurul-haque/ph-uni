import { Schema, model } from 'mongoose';
import { SemesterRegistration, status } from './registration.interface';

const registrationModelSchema = new Schema<SemesterRegistration>(
  {
    semester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'semester',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: status,
      default: 'UPCOMING',
    },
    minCredit: {
      type: Number,
      required: true,
    },
    maxCredit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const RegistrationModel = model('registration', registrationModelSchema);
