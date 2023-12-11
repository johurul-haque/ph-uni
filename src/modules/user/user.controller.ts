import { studentSchema } from '@modules/student/student.interface';
import { catchAsync, sendResponse } from '@utils';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as services from './user.service';

export const createStudent = catchAsync(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const student = studentSchema.parse(req.body.student);
  const password = z
    .string()
    .max(20, {
      message: "Password can't be more than 20 characters",
    })
    .parse(req.body.password);

  const result = await services.addStudent(password, student);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Student added successfully',
    data: result,
  });
});

