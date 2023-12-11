import { Response } from 'express';

interface TResponse<T> {
  status?: number;
  success?: boolean;
  message?: string;
  data: T;
}

export function sendResponse<T>(
  res: Response,
  {
    status = 200,
    success = true,
    message = 'Something went wrong',
    data,
  }: TResponse<T>
) {
  res.status(status).json({
    success,
    message,
    data,
  });
}
