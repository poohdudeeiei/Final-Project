import mongoose, { Document, Model, Types, Schema } from "mongoose";

interface fieldRegisterType {
  name: string;
  type: string;
  description: string;
}

interface EnrollCourseType extends Document {
  //   enrollId: string;
  courseId: Types.ObjectId;
  trainerId: Types.ObjectId;
  userId: Types.Array<string>;
  status: Number;
  trainedHour: Number;
  fieldRegister: Types.DocumentArray<fieldRegisterType>;
}

const enrollCourseSchema: Schema = new mongoose.Schema(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", index: true },
    trainerId: { type: Schema.Types.ObjectId, ref: "Course", index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    status: { type: Number, required: true, default: 0 },
    trainedHour: { type: Number },
    fieldRegister: [{ name: String, type: String, description: String }],
  },
  { timestamps: true }
);

enrollCourseSchema.index({ trainerId: 1, userId: 1 });

module.exports = mongoose.model<EnrollCourseType & Document>(
  "Enroll",
  enrollCourseSchema
);
