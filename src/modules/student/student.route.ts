import { validateRequest } from '@middlewares';
import express from 'express';
import * as controller from './student.controller';
import { studentUpdatePayload } from './student.interface';

const router = express.Router();

// router.post("/create", controller.createStudent);
router.get('/', controller.getStudents);
router.get('/student', controller.getStudent);
router.delete('/:id', controller.deleteStudent);
router.patch(
  '/:id',
  validateRequest(studentUpdatePayload),
  controller.patchStudent
);

export const StudentRoutes = router;
