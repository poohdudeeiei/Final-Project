import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { TokenExpiredError, VerifyErrors } from "jsonwebtoken";

var createError = require("http-errors");
const Trainer = require("../model/trainer");
const User = require("../model/user");

const {
  validateCurrentRefreshToken,
  encodedAccessToken,
} = require("../services/authentication/token");

// AuthGuard Middleware

interface CustomRequest extends Request {
  userId?: string; // or whatever type userId is
}

interface TrainerRequest extends Request {
  trainerId?: string; // or whatever type userId is
}

export const accessTokenValidate = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers["authorization"]) {
      return res.sendStatus(401);
    }

    const token = req.headers["authorization"].replace("Bearer ", "");

    const decoded = await encodedAccessToken(token);
    if (!decoded) {
      return res
        .status(403)
        .json({ msg: "Invalid Refresh Token or Token expired." });
    }
    req.userId = decoded._id;
    console.log(decoded._id);
    next();
    // res.json({ message: "success!", decoded });
  } catch (err) {
    console.error("Error:", err);
    return res.sendStatus(403);
  }
};

// Refresh Token Guard Middleware
export const refreshTokenValidate = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers["authorization"]) {
      return res.sendStatus(401);
    }

    const token = req.headers["authorization"].replace("Bearer ", "");

    const decoded = await validateCurrentRefreshToken(token);

    if (!decoded) {
      return res.status(403).json({ msg: "Invalid Refresh Token." });
    }

    req.userId = decoded._id;
    next();
  } catch (err) {
    console.error("RefreshTokenValidate Error:", err);
    return res.sendStatus(403);
  }
};

// Trainer middleware
export const TrainerGuard = async (
  req: TrainerRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers["authorization"]) {
      throw createError(403, "Missing token");
    }

    const token = req.headers["authorization"].replace("Bearer ", "");
    const decoded = await encodedAccessToken(token);

    if (!decoded) {
      throw createError(403, "Invalid token");
    }

    console.log(decoded)

    // Implement with verify logic in DB
    const userRole = await User.findById(decoded._id)
    if (!userRole) {
      throw createError(403, "No user data");
    }
    const trainer = await Trainer.findById({ _id : userRole.trainerId })
    console.log(trainer.id)
    if (!trainer) {
      throw createError(403, "No trainer data");
    }

    req.trainerId = trainer._id;
    next();
  } catch (error) {
    next(error);
  }
};
