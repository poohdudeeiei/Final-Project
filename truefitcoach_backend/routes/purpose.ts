import express from "express";
import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { body, validationResult } from "express-validator";

const purposeController = require("../controllers/purpose/purpose");
const router = express.Router();

router.get("/training-type", purposeController.getTrainingType);

module.exports = router;
