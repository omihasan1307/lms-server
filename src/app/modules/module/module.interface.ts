import { Document, Schema, Types } from 'mongoose';
import { ICourse } from '../Course/course.interface';

export interface IModule extends Document {
  title: string;
  moduleNumber: number;
  course: Types.ObjectId | ICourse;
  lectures: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
