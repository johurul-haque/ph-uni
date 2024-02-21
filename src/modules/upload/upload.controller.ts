import { catchAsync } from '@utils';
import * as uploadServices from './upload.service';
import { Image } from './upload.validation';

export const uploadImage = catchAsync(async (req, res) => {
  const img = Image.parse(req.file);

  await uploadServices.uploadToCloudinary(img);
});
