import config from '@config';
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';

export const userModelSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    password: { type: String, maxlength: 20, required: true },
    tempPassword: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, { _id, __v, password, ...rest }) => rest,
    },
  }
);

userModelSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

export const UserModel = model('user', userModelSchema);
