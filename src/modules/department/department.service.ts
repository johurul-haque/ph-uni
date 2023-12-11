import { Department } from './department.interface';
import { DepartmentModel } from './department.model';

export function create(payload: Department) {
  return DepartmentModel.create(payload);
}

export async function get() {
  return DepartmentModel.find().populate('academicFaculty');
}

export function getOne(query: Object) {
  return DepartmentModel.findOne(query).populate('academicFaculty');
}
