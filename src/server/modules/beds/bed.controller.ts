import { Request, Response } from "express";
import Bed from "./bed.model";

// @desc    Get all beds
// @route   GET /api/beds
// @access  Private
export const getBeds = async (req: Request, res: Response) => {
  const beds = await Bed.find({}).populate('currentPatient', 'firstName lastName patientId status');
  res.json(beds);
};

// @desc    Update bed status
// @route   PUT /api/beds/:id/status
// @access  Private
export const updateBedStatus = async (req: Request, res: Response) => {
  const { status, patientId } = req.body;
  const bed = await Bed.findById(req.params.id);

  if (bed) {
    bed.status = status;
    if (patientId) {
      bed.currentPatient = patientId;
    } else if (status === 'Available' || status === 'Cleaning' || status === 'Maintenance') {
      bed.currentPatient = undefined;
    }
    
    const updatedBed = await bed.save();
    res.json(updatedBed);
  } else {
    res.status(404);
    throw new Error('Bed not found');
  }
};
