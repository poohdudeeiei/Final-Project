import express from "express";
import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { body, validationResult } from "express-validator";

const User = require("../model/user");
const router = express.Router();

interface CustomRequest extends Request {
  userId?: string;
}

interface UserDocumentType {
  first_name: string;
  last_name: string;
  username: string;
  profile_image: string | null;
  phone_number: string | null;
}

const { accessTokenValidate } = require("../middleware/verifyToken");

const userController = require("../controllers/user/user");
const { userUpload } = require("../services/image-upload/imgUpload");

// GET user data
router.get("/", accessTokenValidate, userController.getUser);

// GET edit user data (full data)
router.get("/edit-user", accessTokenValidate, userController.getEditUser);

router.get(
  "/profile-image",
  accessTokenValidate,
  userController.getProfileImage
);

// POST add/update image
router.post(
  "/user-image",
  accessTokenValidate,
  userUpload.single("profile"),
  userController.uploadPhotoProfile
);

// PUT edit user data
router.put(
  "/edit-user",
  accessTokenValidate,
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")

      .normalizeEmail(),
    body("phone_number")
      .isMobilePhone("th-TH", {
        strictMode: true,
      })
      .trim(),
    body("birth_date")
      .isISO8601()
      .withMessage("Please enter a valid date in ISO 8601 format."),
  ],
  userController.putEditUser
);

module.exports = router;
