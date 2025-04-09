import mongoose, { Schema } from 'mongoose';
import { ILecture } from './lecture.interface';

const lectureSchema = new Schema<ILecture>(
  {
    title: { type: String, required: true, unique: true },
    videoUrl: { type: String, required: true },
    pdfNotes: [{ type: String }],
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
      required: true,
    },
  },
  { timestamps: true },
);

// Export the Lecture model
export const Lecture = mongoose.model<ILecture>('Lecture', lectureSchema);
