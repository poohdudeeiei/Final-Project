import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { TokenExpiredError, VerifyErrors } from "jsonwebtoken";
import { Document, Error } from "mongoose";
import { clearImage } from "../utils/clear-image";
import { body, validationResult, ValidationError } from "express-validator";

const User = require("../../model/user");

var createError = require("http-errors");

interface CustomRequest extends Request {
  userId?: string;
}

exports.getUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = await User.findById({ _id: req.userId }).select(
      "first_name last_name email username profile_image trainerId -_id"
    );

    if (!userData) {
      throw createError(401, "No user exists");
    }

    return res.status(200).json({ userData });
  } catch (error) {
    next(error);
  }
};

exports.getEditUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   throw createError(404, "Form validate failed.");
  // }

  if (!userId) {
    throw createError(401, "No user exists");
  }

  try {
    const userData = await User.findById({ _id: req.userId }).select(
      "-_id first_name last_name email username profile_image phone_number birth_date gender congenital_disease"
    );

    if (!userData) {
      throw createError(401, "No user exists");
    }

    return res.status(200).json({ userData });
  } catch (error) {
    next(error);
  }
};

exports.uploadPhotoProfile = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;

  if (!userId) {
    throw createError(401, "User id doesn't exist!");
  }
  if (!req.file) {
    throw createError(400, "No file uploaded");
  }

  const profile_image = req.file.path.replace(/\\/g, "/");
  try {
    const user = await User.findById({ _id: userId });

    if (user.profile_image === null) {
      user.profile_image = profile_image;
      await user.save();
      return res.status(200).json({ message: "Profile updated." });
    }
    if (profile_image !== user.profile_image) {
      clearImage(user.profile_image);
    }
    user.profile_image = profile_image;
    await user.save();
    return res.status(200).json({ message: "Profile updated." });
  } catch (error) {
    next(error);
  }
};

exports.putEditUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  const errors = validationResult(req);
  const {
    email,
    username,
    first_name,
    last_name,
    phone_number,
    birth_date,
    gender,
    congenital_disease,
  } = req.body;

  if (!errors.isEmpty()) {
    console.log(errors);
    throw createError(404, "Form validate failed.");
  }

  if (!userId) {
    throw createError(401, "No user exists");
  }

  try {
    const user = await User.findById({ _id: userId });

    if (!user) {
      throw createError(401, "No user exists");
    }

    user.email = email;
    user.username = username;
    user.first_name = first_name;
    user.last_name = last_name;
    user.phone_number = phone_number;
    user.birth_date = birth_date;
    user.gender = gender;
    user.congenital_disease = congenital_disease;
    await user.save();
    return res.status(200).json({ message: "Profile updated." });
  } catch (error) {
    next(error);
  }
};

exports.getProfileImage = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   throw createError(404, "Form validate failed.");
  // }

  if (!userId) {
    throw createError(401, "No user exists");
  }

  try {
    const userData = await User.findById({ _id: req.userId }).select(
      "-_id profile_image"
    );

    if (!userData) {
      throw createError(401, "No user exists");
    }

    return res.status(200).json({ userData });
  } catch (error) {
    next(error);
  }
};
