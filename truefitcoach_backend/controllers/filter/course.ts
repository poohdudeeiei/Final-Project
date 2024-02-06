import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { TokenExpiredError, VerifyErrors } from "jsonwebtoken";
import { Document, Error } from "mongoose";
import { randomBytes } from "crypto";
import { body, validationResult, ValidationError } from "express-validator";

var createError = require("http-errors");
const Course = require("../../model/course");
const User = require("../../model/user");
const Purpose = require("../../model/purpose");

interface CourseFilterType extends Request {
  query: {
    types: string;
    location: string;
    page: string;
    pageSize: string;
    search: string;
  };
}

exports.getCourse = async (
  req: CourseFilterType,
  res: Response,
  next: NextFunction
) => {
  const { types, location, page, pageSize, search } = req.query;
  const size = parseInt(pageSize);
  const currentPage = parseInt(page);
  console.log(req.query);
  try {
    const typeFilter = types.split(",");
    const locationFilter = location.split(",");
    const purposeSearch =
      types !== ""
        ? await Purpose.find({ type: typeFilter }).select("_id")
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
      ? purposeSearch.map((data: {_id:string}) => data._id)
      : { $exists: true };

    const trainerQuerySearch = {
      trainingTypeId: Array.isArray(mapTypeSearch)
        ? { $in: mapTypeSearch }
        : { $exists: true },
      courseName: wordSearch,
    };

    console.log(trainerQuerySearch);

    const courses = await Course.find(trainerQuerySearch)
      .select("-_id -createdAt -updatedAt")
      .populate("trainerId", "nickname")
      .limit(size)
      .skip(size * (currentPage - 1));
    const totalDocuments = await Course.countDocuments(trainerQuerySearch);
    const totalPage = Math.ceil(totalDocuments / size);
    if (!courses || courses.length === 0) {
      throw createError(401, "No courses exist");
    }
    return res.status(200).json({ courses: courses, total: totalPage });
  } catch (error) {
    next(error);
  }
};
