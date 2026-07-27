import express from "express";
import { getAppointments, createAppointment, updateAppointmentStatus } from "./appointment.controller";
import { protect, authorize } from "../../middleware/auth.middleware";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.use(asyncHandler(protect));
router.use(authorize("ADMIN", "DOCTOR", "RECEPTIONIST", "NURSE"));

router.route("/")
  .get(asyncHandler(getAppointments))
  .post(asyncHandler(createAppointment));

router.route("/:id/status")
  .put(asyncHandler(updateAppointmentStatus));

export default router;
