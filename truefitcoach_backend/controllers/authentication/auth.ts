import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { TokenExpiredError, VerifyErrors } from "jsonwebtoken";
import { Document, Error } from "mongoose";
// import cryptoRandomString from "crypto-random-string";
import { randomBytes } from "crypto";
import { body, validationResult, ValidationError } from "express-validator";

const User = require("../../model/user");
const Trainer = require("../../model/trainer");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const {
  jwtAccessTokenGenerate,
  jwtRefreshTokenGenerate,
} = require("../../services/authentication/token");

interface CustomRequest extends Request {
  userId?: string;
}

//Register
exports.register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      confirmPassword,
    } = req.body;

    if (
      !(
        first_name &&
        last_name &&
        username &&
        email &&
        password &&
        confirmPassword
      )
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All input is required" });
    }
    const oldUserEmail = await User.findOne({ email });
    const oldUserUsername = await User.findOne({ username });
    if (oldUserEmail && oldUserUsername) {
      return res.status(409).json({
        message: "Email and Username already exist.",
        fieldError: ["email", "username"],
      });
    } else if (oldUserEmail) {
      return res
        .status(409)
        .json({ message: "Email already exist.", fieldError: "email" });
    } else if (oldUserUsername) {
      return res
        .status(409)
        .json({ message: "Username already exist.", fieldError: "username" });
    }

    const encryptedPassword = await bcrypt.hash(password, 12);

    if (password !== confirmPassword) {
      throw createError(400, "Passwords do not match");
    }

    await User.create({
      first_name,
      last_name,
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    res.status(201).json({ success: true, message: "Register success!" });
  } catch (error) {
    next(error);
  }
};

//Login
exports.login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    if (!(email.trim() && password.trim())) {
      throw createError(401, "All input is required");
    }
    const getUser = await User.findOne({ email: email });
    if (!getUser) {
      return res
        .status(409)
        .json({ message: "Invalid E-mail", fieldError: "email" });
      // throw createError(401, "Invalid E-mail");
    }

    const isEqual = await bcrypt.compare(password, getUser.password);
    if (!isEqual) {
      return res
        .status(409)
        .json({ message: "Invalid Password", fieldError: "password" });
      // throw createError(401, "Invalid Password");
    }

    if (getUser && isEqual) {
      //Create token
      const bodyEncode = {
        _id: getUser._id,
        email: getUser.email,
      };

      const accessToken = jwtAccessTokenGenerate(bodyEncode);
      // console.log(process.env.ACCESS_TOKEN_EXPIRATION)
      const refreshToken = jwtRefreshTokenGenerate(bodyEncode);

      await User.findOneAndUpdate(
        { _id: getUser._id },
        { refreshToken: refreshToken }
      );

      return res.status(200).json({
        msg: "Login Success",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      return res.status(401).json({ msg: "Login Failed!" });
    }
  } catch (error) {
    next(error);
  }
};

exports.refresh = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById({ _id: req.userId });

    if (!user) {
      throw createError(401, "Token isn't Invalid");
    }

    const bodyEncode = {
      _id: user._id,
      email: user.email,
    };

    const accessToken = await jwtAccessTokenGenerate(bodyEncode);

    const refreshToken = await jwtRefreshTokenGenerate(bodyEncode);

    await User.findOneAndUpdate(
      { _id: req.userId },
      { refreshToken: refreshToken }
    );

    return res.json({
      message: "Refresh Token Updated.",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const resetPasswordReferString = randomBytes(20);
  try {
    const existUser = await User.findOne({ email: email });
    if (!existUser) {
      throw createError(401, "User doesn't exist.");
    }

    await User.findOneAndUpdate(
      { email: email },
      { reset: resetPasswordReferString.toString("hex").slice(0, 27) }
    );

    return res.status(200).json({ message: "E-mail have sent." });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reset } = req.query;
  const { password, confirmPassword } = req.body;
  try {
    const existReset = await User.findOne({ reset: reset });
    if (!existReset) {
      throw createError(401, "Reset Token doesn't exist.");
    }

    if (password.toString().trim() === confirmPassword.toString().trim()) {
      const encryptedPassword = await bcrypt.hash(password, 12);
      await User.findByIdAndUpdate(existReset._id, {
        password: encryptedPassword,
      });

      await User.findByIdAndUpdate(existReset._id, {
        reset: null,
      });

      return res.json({ message: "Password updated successfully." });
    } else {
      throw createError(400, "Passwords do not match");
    }
  } catch (error) {
    next(error);
  }
};

exports.trainerRegister = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    trainer_first_name,
    trainer_last_name,
    nickname,
    trainer_email,
    phone_number,
  } = req.body;

  console.log(req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    throw createError(404, errors.array());
  }

  const userId = req.userId;
  console.log(userId);

  try {
    const trainerData = await Trainer.findOne({ userId: userId });
    console.log(trainerData);
    if (trainerData) {
      throw createError(401, "This account has been registered");
    }

    const created = await Trainer.create({
      trainer_first_name,
      trainer_last_name,
      nickname,
      trainer_email,
      phone_number,
    });

    await User.findByIdAndUpdate(userId,{
      trainerId : created._id
    })

    return res
      .status(201)
      .json({ success: true, message: "Trainer account Registered" });
  } catch (error) {
    next(error);
  }
};
