import { env } from '@config';
import { Image } from '@modules/upload/upload.interface';
import { v2 as cloudinary } from 'cloudinary';

export async function sendImageToCloudinary(img: Image) {
  cloudinary.config({
    cloud_name: env.CLOUD_NAME,
    api_key: env.API_KEY,
    api_secret: env.API_SECRET,
  });

  console.log(img.path);

  await cloudinary.uploader.upload(
    img.path,
    { public_id: img.filename },
    (error, result) => {
      console.log(error);
    }
  );
}
