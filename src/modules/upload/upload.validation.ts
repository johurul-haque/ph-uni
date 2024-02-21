import { z } from 'zod';

export const Image = z.custom<Express.Multer.File>().refine(isTypeImage, {
  message: 'Invalid file type. Expected image.',
});

function isTypeImage(data: Express.Multer.File) {
  return data.mimetype.startsWith('image/');
}
