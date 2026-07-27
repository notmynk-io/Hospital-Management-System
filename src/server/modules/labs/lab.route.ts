import express from "express";
import { getLabReports, createLabReport, updateLabReportStatus } from "./lab.controller";
import { protect, authorize } from "../../middleware/auth.middleware";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.use(asyncHandler(protect));
router.use(authorize("ADMIN", "DOCTOR", "LAB_TECHNICIAN", "NURSE"));

router.route("/")
  .get(asyncHandler(getLabReports))
  .post(asyncHandler(createLabReport));

router.route("/:id/status")
  .put(asyncHandler(updateLabReportStatus));

export default router;
