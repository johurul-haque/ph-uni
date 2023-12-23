import { DepartmentRoutes } from '@modules/department/department.route';
import { FacultyRoutes } from '@modules/faculty/faculty.route';
import { RegistrationRoutes } from '@modules/semester-registration/registration.route';
import { SemesterRoutes } from '@modules/semester/semester.route';
import { StudentRoutes } from '@modules/student/student.route';
import { UserRoutes } from '@modules/user/user.route';
import { Router } from 'express';

const router = Router();

router.use('/users', UserRoutes);
router.use('/students', StudentRoutes);
router.use('/semesters', SemesterRoutes);
router.use('/faculty', FacultyRoutes);
router.use('/department', DepartmentRoutes);
router.use('/semester-registration', RegistrationRoutes);


export default router;
