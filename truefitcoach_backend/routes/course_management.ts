import express from "express";
const { trainerUpload } = require("../services/image-upload/imgUpload");

const { accessTokenValidate } = require("../middleware/verifyToken");
const courseManagementController = require("../controllers/course_management/course_management");

const router = express.Router();

router.post(
  "/createCourse",
  accessTokenValidate,
  trainerUpload.single("courseImage"),
  courseManagementController.createCourse
);

router.get(
  "/listCourses",
  accessTokenValidate,
  courseManagementController.listCourses
);

router.put(
  "/editCourse",
  accessTokenValidate,
  trainerUpload.single("courseImage"),
  courseManagementController.editCourse
);

router.delete(
  "/deleteCourses",
  accessTokenValidate,
  courseManagementController.deleteCourses
);

module.exports = router;
