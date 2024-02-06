import express from "express";
import { body } from "express-validator";
import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { TrainerTypes } from "../model/trainer";

const filterCourseController = require("../controllers/filter/course");
const router = express.Router();

router.get("/get-courses", filterCourseController.getCourse);

module.exports = router;
