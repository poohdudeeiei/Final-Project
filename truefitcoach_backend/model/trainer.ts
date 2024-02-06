import mongoose, { Document, Model, Types, Schema } from "mongoose";

interface experienceType {
  detail: string;
  experience_title: number;
  photo: Types.Array<string>;
}

interface educationType {
  place: string;
  detail: string;
  photo: Types.Array<string>;
}

interface expertiseType {
  expertise_title: string;
  detail: string;
  photo: Types.Array<string>;
}

interface certificateType {
  certificate_title: string;
  detail: string;
  photo: Types.Array<string>;
}

export interface TrainerTypes extends Document {
  trainer_email: string;
  trainer_first_name: string;
  trainer_last_name: string;
  nickname: string;
  phone_number: string;
  facebook_url: string;
  instagram_url: string;
  line_url: string;
  province: string;
  district: string;
  sub_district: string;
  address: string;
  trainer_profile_image: string; //Path to photo
  education: Types.DocumentArray<educationType>;
  experience: Types.DocumentArray<experienceType>;
  expertise: Types.DocumentArray<expertiseType>;
  certificate: Types.DocumentArray<certificateType>;
  trainingTypeId: Types.ObjectId;
  publish: boolean;
  verify: number;
}

const trainerSchema: Schema = new mongoose.Schema(
  
  {
    trainer_email: { type: String, unique: true, required: true },
    trainer_first_name: { type: String, required: true },
    trainer_last_name: { type: String, required: true },
    nickname: { type: String, required: false },
    phone_number: { type: String, unique: true, required: true },
    facebook_url: { type: String },
    instagram_url: { type: String },
    line_url: { type: String },
    province: { type: String },
    district: { type: String },
    subdistrict: { type: String },
    address: { type: String },
    trainer_profile_image: { type: String, default: null },
    education: [{ place: String, detail: String, photo: [String] }],
    experience: [{ detail: String, experience_title: Number, photo: [String] }],
    expertise: [{ expertise_title: String, detail: String, photo: [String] }],
    certificate: [
      { certificate_title: String, detail: String, photo: [String] },
    ],
    trainingTypeId: { type: Schema.Types.ObjectId, ref: "Purpose" },
    publish: { type: String, default: false },
    verify: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model<TrainerTypes & Document>(
  "Trainer",
  trainerSchema
);
