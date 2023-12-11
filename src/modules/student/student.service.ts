import { UserModel } from '@modules/user/user.model';
import { AppError } from '@utils';
import { startSession } from 'mongoose';
import { QueryBuilder, QueryType } from 'utils/query-builder';
import { Student } from './student.interface';
import { StudentModel } from './student.model';

export function get(query: QueryType) {
  const searchFields = ['email', 'name.firstName', 'presentAddress'];
  const queryBuilder = new QueryBuilder(query, searchFields);

  const queryObject = queryBuilder.getQueryObject();
  const { sort, limit, skip } = queryBuilder.getQueryParams();

  return StudentModel.find(queryObject)
    .populate([
      'admittedSemester',
      'user',
      {
        path: 'department',
        populate: {
          path: 'academicFaculty',
        },
      },
    ])
    .skip(skip)
    .limit(limit)
    .sort(sort);
}

export function getOne(query: object) {
  return StudentModel.findOne(query);
}

export async function deleteOne(userId: string) {
  const session = await startSession();

  try {
    session.startTransaction();

    const deletedStudent = await StudentModel.findOneAndUpdate(
      { userId },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) throw new AppError(400, 'Failed to delete student');

    const deletedUser = await UserModel.findOneAndUpdate(
      { userId },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) throw new AppError(400, 'Failed to delete student');

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
}

export function updateOne(userId: string, payload: Partial<Student>) {
  const { name, guardian, ...rest } = payload,
    modifiedPayload: Record<string, unknown> = { ...rest };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedPayload[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedPayload[`guardian.${key}`] = value;
    }
  }

  return StudentModel.findOneAndUpdate({ userId }, modifiedPayload, {
    returnOriginal: false,
    runValidators: true,
  });
}
