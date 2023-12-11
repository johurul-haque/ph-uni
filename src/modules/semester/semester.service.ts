import { Semester, SemesterEnum } from './semester.interface';
import { SemesterModel } from './semester.model';

export async function create(payload: Semester) {
  // @ts-ignore
  if (SemesterEnum[payload.name] !== payload.code)
    throw new Error('Invalid semester code');

  return SemesterModel.create(payload);
}
