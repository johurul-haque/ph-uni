import config from '@config';
import { SemesterModel } from '@modules/semester/semester.model';
import { UpdateStudentPayload } from '@modules/student/student.interface';
import { StudentModel } from '@modules/student/student.model';
import { AppError } from '@utils';
import { startSession } from 'mongoose';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';

export async function addStudent(
  password: string = config.default_password!,
  payload: UpdateStudentPayload
) {
  const admittedSemester = await SemesterModel.findById(
    payload.admittedSemester
  );

  if (!admittedSemester) throw new AppError(403, 'Invalid semester reference');

  const session = await startSession();

  try {
    session.startTransaction();

    const userId = await generateStudentId(admittedSemester);

    const newUser = await UserModel.create(
      [
        {
          userId,
          password,
          role: 'student',
        },
      ],
      { session }
    );

    if (!newUser.length) throw new AppError(400, 'Failed to create user');

    payload.userId = newUser[0].userId;
    payload.user = newUser[0]._id;

    const newStudent = await StudentModel.create([payload], { session });

    if (!newStudent) throw new AppError(400, 'Failed to create student');

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }

  /*
  const student = new Student(studentData);
  const userExists = await student.findStudent("123456");

  if (userExists) {
    throw new Error("User already exists");
  }

  return await student.save();
  */
}
