import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { TokenExpiredError, VerifyErrors } from "jsonwebtoken";
import { Document, Error } from "mongoose";
// import cryptoRandomString from "crypto-random-string";
import { randomBytes } from "crypto";
import { body, validationResult, ValidationError } from "express-validator";

var createError = require("http-errors");
const Purpose = require("../../model/purpose");

exports.getTrainingType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const purpose = await Purpose.find().select("trainingTypeName type _id");
    if (!purpose) {
      throw createError(401, "No training type exist");
    }
    return res.status(200).json({ purpose });
  } catch (error) {
    next(error);
  }
};
