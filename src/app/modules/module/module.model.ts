// models/module.model.ts
import mongoose, { Schema } from 'mongoose';
import { IModule } from './module.interface';

const moduleSchema = new Schema<IModule>(
  {
    title: { type: String, required: true },
    moduleNumber: { type: Number, required: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
  },
  { timestamps: true },
);

moduleSchema.virtual('lectures', {
  ref: 'Lecture',
  localField: '_id',
  foreignField: 'module',
});

moduleSchema.set('toObject', { virtuals: true });
moduleSchema.set('toJSON', { virtuals: true });

export const Module = mongoose.model<IModule>('Module', moduleSchema);
