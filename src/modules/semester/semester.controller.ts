import { catchAsync, sendResponse } from '@utils';
import { Request, Response } from 'express';
import { semesterValidateSchema } from './semester.interface';
import * as semesterServices from './semester.service';

export const createSemester = catchAsync(
  async (req: Request, res: Response) => {
    const data = semesterValidateSchema.parse(req.body);

    const result = await semesterServices.create(data);

    sendResponse(res, {
      data: result,
      message: 'Semester created successfully',
    });
  }
);
