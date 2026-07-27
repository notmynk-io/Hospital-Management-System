import express from "express";
import { getPatients, createPatient } from "./patient.controller";
import { protect, authorize } from "../../middleware/auth.middleware";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.use(asyncHandler(protect));
router.use(authorize("ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST"));

router.route("/")
  .get(asyncHandler(getPatients))
  .post(asyncHandler(createPatient));

export default router;
