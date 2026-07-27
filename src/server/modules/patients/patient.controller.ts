import { Request, Response } from "express";
import Patient from "./patient.model";

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private
export const getPatients = async (req: Request, res: Response) => {
  const patients = await Patient.find({}).sort({ createdAt: -1 });
  res.json(patients);
};

// @desc    Create a patient
// @route   POST /api/patients
// @access  Private
export const createPatient = async (req: Request, res: Response) => {
  const patientId = `PT-${Math.floor(1000 + Math.random() * 9000)}`;
  
  const patient = await Patient.create({
    ...req.body,
    patientId
  });
  
  res.status(201).json(patient);
};
