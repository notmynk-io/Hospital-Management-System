import express from "express";
import { getStats } from "./dashboard.controller";
import { protect } from "../../middleware/auth.middleware";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.use(asyncHandler(protect));

router.route("/stats")
  .get(asyncHandler(getStats));

export default router;
