import { validateRequest } from '@middlewares';
import { Router } from 'express';
import { semesterRegistration } from './registration.controller';
import { registrationSchema } from './registration.interface';

const router = Router();

router.post(
  '/register',
  validateRequest(registrationSchema),
  semesterRegistration
);

export const RegistrationRoutes = router;
