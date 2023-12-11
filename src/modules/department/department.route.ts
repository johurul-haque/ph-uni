import { Router } from 'express';
import {
  createDepartment,
  getDepartment,
  getDepartments,
} from './department.controller';

const router = Router();

router.get('/', getDepartments);
router.get('/:departmentId', getDepartment);
router.post('/create', createDepartment);

export const DepartmentRoutes = router;
