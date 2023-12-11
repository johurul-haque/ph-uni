import { catchAsync, sendResponse } from '@utils';
import { Request, Response } from 'express';
import { z } from 'zod';
import * as services from './student.service';

export const getStudents = catchAsync(async (req: Request, res: Response) => {
  const data = await services.get(req.query);

  sendResponse(res, {
    message: 'Students successfully retrieved',
    data,
  });
});

export const getStudent = catchAsync(async (req: Request, res: Response) => {
  const email = z.string().email().parse(req.query.email),
    data = await services.getOne({ email });

  sendResponse(res, {
    message: 'Student successfully retrieved',
    data,
  });
});

export const deleteStudent = catchAsync(async function (
  req: Request,
  res: Response
) {
  const { id } = req.params;
  const result = await services.deleteOne(id);

  sendResponse(res, {
    message: 'Student deleted successfully🥲',
    data: result,
  });
});

export const patchStudent = catchAsync(async function (
  req: Request,
  res: Response
) {
  const userId = req.params.id,
    payload = req.body,
    result = await services.updateOne(userId, payload);

  sendResponse(res, {
    message: result ? 'Student updated successfully' : 'Already up to date',
    data: result || undefined,
  });
});
