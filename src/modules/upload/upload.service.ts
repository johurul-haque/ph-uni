import { sendImageToCloudinary } from 'utils/save-to-cloudinary';
import { type Image } from './upload.interface';

export async function uploadToCloudinary(img: Image) {
  sendImageToCloudinary(img);
}
