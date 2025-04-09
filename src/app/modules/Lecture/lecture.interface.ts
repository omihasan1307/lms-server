import { Document, Schema } from 'mongoose';

export interface ILecture extends Document {
  title: string;
  videoUrl: string;
  pdfNotes: string[];
  module: Schema.Types.ObjectId;
}
