import { Router } from 'express';
import { createFaculty } from './faculty.controller';

const router = Router();

router.post('/create', createFaculty);

export const FacultyRoutes = router;
