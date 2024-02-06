import mongoose, { Document, Model, Schema, Types } from "mongoose";

interface User extends Document {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  refreshToken: string;
  reset: string;
  profile_image: string;
  birth_date: Date;
  gender: string;
  congenital_disease: string;
  trainerId: Types.ObjectId;
}

const userSchema: Schema = new mongoose.Schema(
  {
    first_name: { type: String, default: null, required: true },
    last_name: { type: String, default: null, required: true },
    email: { type: String, unique: true, required: true, index: true },
    username: { type: String, unique: true, required: true, index: true },
    password: { type: String, required: true },
    refreshToken: { type: String, default: null },
    reset: { type: String, default: null },
    profile_image: { type: String, default: null },
    phone_number: { type: String, unique: true, sparse: true },
    birth_date: { type: Date, default: null },
    gender: { type: String, default: null },
    congenital_disease: { type: String, default: null },
    trainerId: { type: Schema.Types.ObjectId, ref: "Trainer" },
  },
  { timestamps: true }
);

userSchema.index({ email: 1, username: 1 });

module.exports = mongoose.model<User & Document>("User", userSchema);
