import express from "express";
import { body } from "express-validator";
import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { TrainerTypes } from "../model/trainer";

const {
  accessTokenValidate,
  refreshTokenValidate,
} = require("../middleware/verifyToken");
const authController = require("../controllers/authentication/auth");
const User = require("../model/user");
const Trainer = require("../model/trainer");

const router = express.Router();

interface CustomRequest extends Request {
  userId?: string; // or whatever type userId is
}

// Register an account
router.post("/register", authController.register);

// Login with validate user token
router.post("/login", authController.login);

// Refresh token for validate user
router.get("/refresh", refreshTokenValidate, authController.refresh);

// Forgot Password
router.post("/forgot", authController.forgotPassword);

// Forgot Password
router.post("/reset", authController.resetPassword);

// Test Access Token ROUTE for an user id
router.get(
  "/",
  accessTokenValidate,
  (req: CustomRequest, res: Response, next: NextFunction) => {
    res.json({ msg: "Successful!", id: req.userId });
  }
);

//====================================================================

// Register a trainer account
router.post(
  "/trainer-register",
  accessTokenValidate,
  [
    body("trainer_first_name").trim().not().isEmpty(),
    body("trainer_last_name").trim().not().isEmpty(),
    body("nickname").trim().not().isEmpty(),
    body("trainer_email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return Trainer.findOne({ email: value }).then(
          (existAccount: TrainerTypes) => {
            if (existAccount) {
              throw new Error("E-mail address already exists");
            }
          }
        );
      })
      .normalizeEmail(),
    body("phone_number")
      .isMobilePhone("th-TH", {
        strictMode: true,
      })
      .trim(),
  ],
  authController.trainerRegister
);

module.exports = router;
