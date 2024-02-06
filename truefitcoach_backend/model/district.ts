import mongoose, { Document, Model, Types, Schema } from "mongoose";

interface DistrictType {
  id: string;
  code: string;
  name_th: string;
  name_en: string;
  province_id: string;
}

const districtSchema: Schema = new mongoose.Schema({
  id: { type: String },
  code: { type: String },
  name_th: { type: String },
  name_en: { type: String },
  province_id: { type: String },
});

districtSchema.index({ province_id: 1, code: 1 });

module.exports = mongoose.model<DistrictType & Document>(
  "District",
  districtSchema
);
