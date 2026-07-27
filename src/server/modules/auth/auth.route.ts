import express from "express";
import { loginUser, registerAdmin, getUserProfile } from "./auth.controller";
import { protect } from "../../middleware/auth.middleware";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.post("/login", asyncHandler(loginUser));
router.post("/register-admin", asyncHandler(registerAdmin));
router.get("/profile", asyncHandler(protect), asyncHandler(getUserProfile));

export default router;
