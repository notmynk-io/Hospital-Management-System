import express from "express";
import { getUsers, createUser } from "./user.controller";
import { protect, authorize } from "../../middleware/auth.middleware";
import asyncHandler from "express-async-handler";

const router = express.Router();

// Only ADMIN can access these routes
router.use(asyncHandler(protect));
router.use(authorize("ADMIN"));

router.route("/").get(asyncHandler(getUsers)).post(asyncHandler(createUser));

export default router;
