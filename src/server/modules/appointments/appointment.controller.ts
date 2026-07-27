import { Request, Response } from "express";
import Appointment from "./appointment.model";

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
export const getAppointments = async (req: Request, res: Response) => {
  const appointments = await Appointment.find({})
    .populate('patient', 'firstName lastName patientId')
    .populate('doctor', 'firstName lastName')
    .sort({ date: 1, timeSlot: 1 });
  res.json(appointments);
};

// @desc    Create an appointment
// @route   POST /api/appointments
// @access  Private
export const createAppointment = async (req: Request, res: Response) => {
  const appointmentId = `APT-${Math.floor(10000 + Math.random() * 90000)}`;
  
  const appointment = await Appointment.create({
    ...req.body,
    appointmentId
  });
  
  const populatedAppointment = await Appointment.findById(appointment._id)
    .populate('patient', 'firstName lastName patientId')
    .populate('doctor', 'firstName lastName');

  res.status(201).json(populatedAppointment);
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private
export const updateAppointmentStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    appointment.status = status;
    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } else {
    res.status(404);
    throw new Error('Appointment not found');
  }
};
