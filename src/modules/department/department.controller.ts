import { catchAsync, sendResponse } from '@utils';
import { Request, Response } from 'express';
import { departmentValidation } from './department.interface';
import * as departmentServices from './department.service';

export const createDepartment = catchAsync(async function (
  req: Request,
  res: Response
) {
  const data = departmentValidation.parse(req.body),
    result = await departmentServices.create(data);

  sendResponse(res, {
    message: 'Department created successfully',
    data: result,
  });
});

export const getDepartments = catchAsync(async function (
  req: Request,
  res: Response
) {
  const data = await departmentServices.get();

  sendResponse(res, {
    message: 'Departments retrieved successfully',
    data,
  });
});

export const getDepartment = catchAsync(async function (
  req: Request,
  res: Response
) {
  const { departmentId } = req.params;
  const result = await departmentServices.getOne({ _id: departmentId });

  sendResponse(res, {
    message: 'Department retrieved successfully',
    data: result,
  });
});
