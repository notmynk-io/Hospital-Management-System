import { Request, Response } from "express";
import LabReport from "./lab.model";

// @desc    Get all lab reports
// @route   GET /api/labs
// @access  Private
export const getLabReports = async (req: Request, res: Response) => {
  const reports = await LabReport.find({})
    .populate('patient', 'firstName lastName patientId')
    .populate('doctor', 'firstName lastName')
    .sort({ dateOrdered: -1 });
  res.json(reports);
};

// @desc    Create a lab report
// @route   POST /api/labs
// @access  Private
export const createLabReport = async (req: Request, res: Response) => {
  const reportId = `LAB-${Math.floor(100000 + Math.random() * 900000)}`;
  
  const report = await LabReport.create({
    ...req.body,
    reportId
  });
  
  const populatedReport = await LabReport.findById(report._id)
    .populate('patient', 'firstName lastName patientId')
    .populate('doctor', 'firstName lastName');

  res.status(201).json(populatedReport);
};

// @desc    Update lab report status
// @route   PUT /api/labs/:id/status
// @access  Private
export const updateLabReportStatus = async (req: Request, res: Response) => {
  const { status, results } = req.body;
  const report = await LabReport.findById(req.params.id);

  if (report) {
    report.status = status;
    if (results) report.results = results;
    if (status === 'Completed' && !report.dateCompleted) {
      report.dateCompleted = new Date();
    }
    
    const updatedReport = await report.save();
    res.json(updatedReport);
  } else {
    res.status(404);
    throw new Error('Lab report not found');
  }
};
