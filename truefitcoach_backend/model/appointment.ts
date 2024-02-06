import mongoose, { Document, Model, Types, Schema } from "mongoose";

interface CommentType {
  detail: string;
  date: Date;
  fieldName: string;
}

interface AppointmentType extends Document {
  trainerId: Types.ObjectId;
  courseId: Types.ObjectId;
  enrollId: Types.ObjectId;
  event_id: string;
  title: string;
  start: string;
  end: string;
  description: string;
  assign: Types.ObjectId;
  come: boolean;
  comment: Types.DocumentArray<CommentType>;
}

const appointmentSchema: Schema = new mongoose.Schema(
  {
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      required: true,
      index: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    enrollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EnrollCourse",
      required: true,
      index: true,
    },
    event_id: { type: String, unique: true, required: true },
    title: { type: String },
    start: { type: String },
    end: { type: String },
    description: { type: String },
    assign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    come: { type: Boolean },
    comment: [
      {
        detail: String,
        date: Date,
        fieldName: String,
      },
    ],
  },
  { timestamps: true }
);

appointmentSchema.index({ trainerId: 1, courseId: 1, enrollId: 1, assign: 1 });

module.exports = mongoose.model<AppointmentType & Document>(
  "Appointment",
  appointmentSchema
);
