import mongoose, { Document, Model, Types, Schema } from "mongoose";

interface SubdistrictType {
  id: string;
  zip_code: string;
  name_th: string;
  name_en: string;
  amphure_id: string;
}

const subdistrictSchema: Schema = new mongoose.Schema({
  id: { type: String },
  zip_code: { type: String },
  name_th: { type: String },
  name_en: { type: String },
  amphure_id: { type: String },
});

subdistrictSchema.index({ amphure_id: 1 });

module.exports = mongoose.model<SubdistrictType & Document>(
  "Subdistrict",
  subdistrictSchema
);
