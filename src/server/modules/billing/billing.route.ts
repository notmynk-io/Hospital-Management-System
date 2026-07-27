import express from "express";
import { getInvoices, createInvoice, updateInvoiceStatus } from "./billing.controller";
import { protect, authorize } from "../../middleware/auth.middleware";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.use(asyncHandler(protect));
router.use(authorize("ADMIN", "RECEPTIONIST"));

router.route("/")
  .get(asyncHandler(getInvoices))
  .post(asyncHandler(createInvoice));

router.route("/:id/status")
  .put(asyncHandler(updateInvoiceStatus));

export default router;
