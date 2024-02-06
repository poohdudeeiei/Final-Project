import express from "express";
import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { body, validationResult } from "express-validator";

const addressController = require("../controllers/address/address");
const router = express.Router();

router.get("/province", addressController.getProvince);
router.get("/district", addressController.getDistrict);
router.get("/subdistrict", addressController.getSubdistrict);

module.exports = router;
