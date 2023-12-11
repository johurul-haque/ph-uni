import { Faculty } from './faculty.interface';
import { FacultyModel } from './faculty.model';

export function create(payload: Faculty) {
  return FacultyModel.create(payload);
}
