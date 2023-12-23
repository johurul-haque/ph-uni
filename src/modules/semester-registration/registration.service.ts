import { SemesterModel } from '@modules/semester/semester.model';
import { AppError } from '@utils';
import { Types } from 'mongoose';
import { SemesterRegistration } from './registration.interface';
import { RegistrationModel } from './registration.model';

export async function register(payload: SemesterRegistration) {
  const isExisting = await RegistrationModel.findOne({
    semester: payload.semester,
  });

  if (!isExisting) throw new AppError(409, 'Semester already registered');

  const isValidReference = await SemesterModel.findById(payload.semester);

  if (!isValidReference) throw new AppError(400, 'Invalid semester reference');

  const upcomingOrOngoingSemester = await RegistrationModel.findOne({
    $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
  });

  if (upcomingOrOngoingSemester)
    throw new AppError(
      409,
      `A semester already ${upcomingOrOngoingSemester.status.toLowerCase()}`
    );

  return RegistrationModel.create(payload);
}

export async function update(
  id: Types.ObjectId,
  payload: Partial<SemesterRegistration>
) {
  const doc = await RegistrationModel.findById(id);

  if (!doc) throw new AppError(404, 'Not found');

  // UPCOMING -> ONGOING -> ENDED

  if (doc.status === 'ENDED')
    throw new AppError(400, 'This semester already ended');

  if (payload.status === 'ENDED' && doc.status === 'UPCOMING') {
    throw new AppError(
      400,
      'Invalid status update: A semester with status UPCOMING cannot be changed to ENDED'
    );
  }

  if (payload.status === 'UPCOMING' && doc.status === 'ONGOING') {
    throw new AppError(
      400,
      'Invalid status update: A semester with status UPCOMING cannot be changed to ENDED'
    );
  }

  return RegistrationModel.findByIdAndUpdate(id, payload, {
    returnOriginal: false,
    runValidators: true,
  });
}
