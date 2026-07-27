import { Request, Response } from "express";
import Billing from "./billing.model";

// @desc    Get all invoices
// @route   GET /api/billing
// @access  Private
export const getInvoices = async (req: Request, res: Response) => {
  const invoices = await Billing.find({})
    .populate('patient', 'firstName lastName patientId')
    .sort({ dateIssued: -1 });
  res.json(invoices);
};

// @desc    Create an invoice
// @route   POST /api/billing
// @access  Private
export const createInvoice = async (req: Request, res: Response) => {
  const invoiceId = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
  
  const totalAmount = req.body.items.reduce((acc: number, item: any) => acc + item.amount, 0);

  const invoice = await Billing.create({
    ...req.body,
    invoiceId,
    totalAmount
  });
  
  const populatedInvoice = await Billing.findById(invoice._id)
    .populate('patient', 'firstName lastName patientId');

  res.status(201).json(populatedInvoice);
};

// @desc    Update invoice status
// @route   PUT /api/billing/:id/status
// @access  Private
export const updateInvoiceStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  const invoice = await Billing.findById(req.params.id);

  if (invoice) {
    invoice.status = status;
    if (status === 'Paid' && !invoice.datePaid) {
      invoice.datePaid = new Date();
    }
    
    const updatedInvoice = await invoice.save();
    res.json(updatedInvoice);
  } else {
    res.status(404);
    throw new Error('Invoice not found');
  }
};
