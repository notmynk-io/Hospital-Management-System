import express from "express";
import { getBeds, updateBedStatus } from "./bed.controller";
import { protect, authorize } from "../../middleware/auth.middleware";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.use(asyncHandler(protect));
router.use(authorize("ADMIN", "DOCTOR", "NURSE"));

router.route("/")
  .get(asyncHandler(getBeds));

router.route("/:id/status")
  .put(asyncHandler(updateBedStatus));

export default router;
