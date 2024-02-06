import mongoose, { Document, Model, Types, Schema } from "mongoose";

interface ProvinceType {
  id: string;
  code: string;
  name_th: string;
  name_en: string;
  geography_id: string;
}

const provinceSchema: Schema = new mongoose.Schema({
  id: { type: String },
  code: { type: String },
  name_th: { type: String },
  name_en: { type: String },
  geography_id: { type: String },
});

provinceSchema.index({ id: 1, code: 1 });

module.exports = mongoose.model<ProvinceType & Document>(
  "Province",
  provinceSchema
);
