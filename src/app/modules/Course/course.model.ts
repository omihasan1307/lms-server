import { Schema, model } from 'mongoose';
import { ICourse } from './course.interface';

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    createdBy: { type: String, required: true },
    modules: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Module',
      },
    ],
  },
  { timestamps: true },
);

export const Course = model<ICourse>('Course', courseSchema);
