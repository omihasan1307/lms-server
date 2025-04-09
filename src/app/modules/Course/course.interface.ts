import { Types } from 'mongoose';
import { IModule } from '../module/module.interface';

export type TPreRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted?: boolean;
  preRequisiteCourses: [TPreRequisiteCourses];
};

export type TCoursefaculty = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};

export interface ICourse {
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  createdBy: string;
  modules?: Types.ObjectId[] | IModule[]; 
  createdAt?: Date;
  updatedAt?: Date;
}
