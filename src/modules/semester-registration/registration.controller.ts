import { catchAsync, sendResponse } from '@utils';
import { Request, Response } from 'express';
import * as registrationServices from './registration.service';

export const semesterRegistration = catchAsync(async function (
  req: Request,
  res: Response
) {
  const result = await registrationServices.register(req.body);

  sendResponse(res, {
    data: result,
    message: 'Registration successful',
  });
});

export const updateSemesterRegistration = catchAsync(async function (
  req: Request,
  res: Response
) {
 const result = await registrationServices.update(req.params.id, req.body);

 sendResponse(res, {
   data: result,
   message: 'Registration updated successfully',
 });
});
