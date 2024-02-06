import express from "express";
import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { body, validationResult } from "express-validator";
import { TrainerGuard } from "../middleware/verifyToken";

const trainerController = require("../controllers/trainer/trainer");
const router = express.Router();

// manage trainer
router.get("/get-trainer", TrainerGuard, trainerController.getTrainer);

//manage appoint API
router.get("/get-assign", trainerController.getAssign);
router.get("/get-assignFilter", trainerController.getAssignedFilters);
router.post("/post-assign", trainerController.postAssign);
router.get("/get-Assigned", trainerController.getAssigned);
router.put("/put-Assigned", trainerController.putAssigned);
router.delete("/delete-Assigned", trainerController.deleteAppointment);

router.get("/get-progress", trainerController.getProgressCustomers);

module.exports = router;
