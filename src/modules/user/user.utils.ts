import { Semester } from '../semester/semester.interface';
import { UserModel } from './user.model';

export async function generateStudentId(payload: Semester) {
  const previousStudentUserId = await getPreviousStudentUserId();

  const year = previousStudentUserId?.substring(0, 4),
    semesterCode = previousStudentUserId?.substring(4, 6);

  let incrementCode: undefined | string;

  if (Number(year) === payload.year && semesterCode === payload.code) {
    incrementCode = previousStudentUserId?.substring(6);
  }

  const newIncrementCode = (Number(incrementCode || 0) + 1)
    .toString()
    .padStart(4, '0');

  return `${payload.year}${payload.code}${newIncrementCode}`;
}

export async function getPreviousStudentUserId() {
  const previousStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      userId: 1,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return previousStudent?.userId;
}
