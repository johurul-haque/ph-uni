import { validateRequest } from '@middlewares';
import { Router } from 'express';
import { createSemester } from './semester.controller';
import { semesterValidateSchema } from './semester.interface';

const router = Router();

router.post('/create', validateRequest(semesterValidateSchema), createSemester);

export const SemesterRoutes = router;
