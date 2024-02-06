import mongoose, { Document, Model, Types, Schema } from "mongoose";

export interface PurposeType extends Document {
  type: Number;
  trainingTypeName: string;
}

const purposeSchema: Schema = new mongoose.Schema(
  {
    type: { type: Number, unique: true, required: true },
    trainingTypeName: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model<PurposeType & Document>(
  "Purpose",
  purposeSchema
);
