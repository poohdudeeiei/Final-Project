import mongoose, { Document, Model, Types, Schema } from "mongoose";

export interface CourseType extends Document {
  trainerId: Types.Array<string>;
  courseName: string;
  courseImage: string;
  trainingTypeId: Types.Array<Schema.Types.ObjectId>[];
  trainingPeriod: string;
  numDaysPerWeek: string;
  trainingTime: string;
  description: string;
  purpose: string;
  receiving: number;
  isAvailable: boolean;
  numberOfEnroll: number;
}

const courseSchema: Schema = new mongoose.Schema(
  {
    trainerId: {
      type: Schema.Types.ObjectId,
      ref: "Trainer",
      index: true,
      require: true,
    },
    trainingTypeId: {
      type: [{ type: Schema.Types.ObjectId, ref: "Purpose" }],
      ref: "Purpose",
      required: true,
    },
    courseImage: { type: String, required: false },
    courseName: { type: String, required: true },
    trainingPeriod: { type: String, required: true },
    numDaysPerWeek: { type: String, required: true },
    trainingTime: { type: String, required: true },
    purpose: { type: [String], required: true },
    description: { type: String, required: true },
    receiving: { type: Number, required: true, default: 0 },
    isAvailable: { type: Boolean, required: true },
    numberOfEnroll: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

courseSchema.index({ trainerId: 1 });

module.exports = mongoose.model<CourseType& Document>("Course", courseSchema);
