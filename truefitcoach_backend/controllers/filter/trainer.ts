import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { TokenExpiredError, VerifyErrors } from "jsonwebtoken";
import { Document, Error } from "mongoose";
import { randomBytes } from "crypto";
import { body, validationResult, ValidationError } from "express-validator";

var createError = require("http-errors");
const Trainer = require("../../model/trainer");
const User = require("../../model/user");
const Purpose = require("../../model/purpose");

interface TrainerFilterType extends Request {
  query: {
    types: string;
    location: string;
    rating: string;
    page: string;
    pageSize: string;
    search: string;
  };
}

exports.getTrainer = async (
  req: TrainerFilterType,
  res: Response,
  next: NextFunction
) => {
  const { types, rating, location, page, pageSize, search } = req.query;
  const size = parseInt(pageSize);
  const currentPage = parseInt(page);
  console.log(req.query);
  try {
    const typeFilter = types.split(",");
    const ratingFilter = rating.split(",");
    const locationFilter = location.split(",");
    const purposeSearch =
      types !== ""
        ? await Purpose.find({ type: typeFilter }).select("_id")
        : { $exists: true };
    const ratingSearch =
      rating !== ""
        ? { $gte: ratingFilter[0], $lte: ratingFilter[1] }
        : { $exists: true };
    const provinceSearch =
      location === ""
        ? { $exists: true }
        : { district: { $in: locationFilter[0] } };
    const districtSearch =
      location === ""
        ? { $exists: true }
        : locationFilter[1] !== ""
        ? { $in: locationFilter[1] }
        : { $exists: true };
    const subdistrictSearch =
      location === ""
        ? { $exists: true }
        : locationFilter[2] !== ""
        ? { $in: locationFilter[2] }
        : { $exists: true };
    const wordSearch =
      search === "" ? { $exists: true } : { $regex: new RegExp(search, "i") };

    const mapTypeSearch = Array.isArray(purposeSearch)
      ? purposeSearch.map((data: any) => data._id)
      : { $exists: true };
    console.log(mapTypeSearch);

    const trainerQuerySearch = {
      trainingTypeId: Array.isArray(mapTypeSearch)
        ? { $in: mapTypeSearch }
        : { $exists: true },
      province: provinceSearch,
      district: districtSearch,
      subdistrict: subdistrictSearch,
      nickname: wordSearch,
      rating: ratingSearch,
    };

    const trainers = await Trainer.find(trainerQuerySearch)
      .select("-_id -createdAt -updatedAt")
      .limit(size)
      .skip(size * (currentPage - 1));
    const totalDocuments = await Trainer.countDocuments(trainerQuerySearch);
    const totalPage = Math.ceil(totalDocuments / size);
    if (!trainers || trainers.length === 0) {
      throw createError(401, "No courses exist");
    }
    return res.status(200).json({ trainers: trainers, total: totalPage });
  } catch (error) {
    next(error);
  }
};
