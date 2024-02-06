import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { TokenExpiredError, VerifyErrors } from "jsonwebtoken";
import { Document, Error } from "mongoose";
// import cryptoRandomString from "crypto-random-string";
import { randomBytes } from "crypto";
import { body, validationResult, ValidationError } from "express-validator";

var createError = require("http-errors");

const Province = require("../../model/province");
const District = require("../../model/district");
const Subdistrict = require("../../model/subdistrict");

interface District extends Request {
  query: {
    province_id: string;
  };
}

interface Subdistrict extends Request {
  query: {
    district_id: string;
  };
}

exports.getProvince = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const province = await Province.find().select("-_id id name_th name_en");
    if (!province) {
      throw createError(401, "No data exist");
    }

    return res.status(200).json({ Province: province });
  } catch (error) {
    next(error);
  }
};

exports.getDistrict = async (
  req: District,
  res: Response,
  next: NextFunction
) => {
  const province_id = req.query.province_id;
  try {
    const getDistrict = await District.find({ province_id }).select(
      "-_id id name_th name_en"
    );
    if (!getDistrict) {
      throw createError(401, "No data exist");
    }

    return res.status(200).json({ District: getDistrict });
  } catch (error) {
    next(error);
  }
};

exports.getSubdistrict = async (
  req: Subdistrict,
  res: Response,
  next: NextFunction
) => {
  const district_id = req.query.district_id;
  try {
    const getSubdistrict = await Subdistrict.find({
      amphure_id: district_id,
    }).select("-_id id name_th name_en zip_code");
    if (!getSubdistrict) {
      throw createError(401, "No data exist");
    }

    return res.status(200).json({ Subdistrict: getSubdistrict });
  } catch (error) {
    next(error);
  }
};
