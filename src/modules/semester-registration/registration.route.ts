import { validateRequest } from '@middlewares';
import { Router } from 'express';
import {
  semesterRegistration,
  updateSemesterRegistration,
} from './registration.controller';
import { registrationSchema } from './registration.interface';

const router = Router();

router.post(
  '/register',
  validateRequest(registrationSchema),
  semesterRegistration
);
router.patch(
  '/update',
  validateRequest(registrationSchema.deepPartial()),
  updateSemesterRegistration
);

export const RegistrationRoutes = router;
