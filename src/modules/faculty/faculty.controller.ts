import { catchAsync, sendResponse } from '@utils';
import { Request, Response } from 'express';
import { facultyValidateSchema } from './faculty.interface';
import * as facultyServices from './faculty.service';

export const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const data = facultyValidateSchema.parse(req.body),
    result = await facultyServices.create(data);

  sendResponse(res, {
    message: 'Faculty created successfully',
    data: result,
  });
});
