import { Router } from 'express';
import { upload } from 'utils/save-temporary';
import { uploadImage } from './upload.controller';

const router = Router();

router.post('/', [upload.single('image')], uploadImage);

export const UploadRoutes = router;
