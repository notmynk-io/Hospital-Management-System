import { Request, Response } from "express";
import Patient from "../patients/patient.model";
import Appointment from "../appointments/appointment.model";
import Bed from "../beds/bed.model";
import LabReport from "../labs/lab.model";
import User, { UserRole } from "../users/user.model";

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private
export const getStats = async (req: any, res: Response) => {
  try {
    const totalPatients = await Patient.countDocuments();
    
    // Appointments today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const appointmentsToday = await Appointment.countDocuments({
      date: { $gte: startOfDay, $lte: endOfDay }
    });
    
    const pendingAppointments = await Appointment.countDocuments({
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ['Scheduled', 'Waiting'] }
    });

    const totalBeds = await Bed.countDocuments();
    const availableBeds = await Bed.countDocuments({ status: 'Available' });

    const totalDoctors = await User.countDocuments({ role: UserRole.DOCTOR, isActive: true });
    
    const pendingLabs = await LabReport.countDocuments({ status: { $in: ['Pending', 'In Progress'] } });
    const completedLabsToday = await LabReport.countDocuments({
      status: 'Completed',
      dateCompleted: { $gte: startOfDay, $lte: endOfDay }
    });

    let doctorSpecific = null;
    if (req.user && req.user.role === UserRole.DOCTOR) {
      const myAppointmentsToday = await Appointment.countDocuments({
        doctor: req.user._id,
        date: { $gte: startOfDay, $lte: endOfDay }
      });
      const myPatients = await Appointment.distinct('patient', { doctor: req.user._id });
      const myInpatients = await Bed.countDocuments({
        status: 'Occupied',
        currentPatient: { $in: myPatients }
      });
      
      doctorSpecific = {
        appointmentsToday: myAppointmentsToday,
        inPatients: myInpatients
      };
    }

    res.json({
      patients: {
        total: totalPatients,
        active: await Patient.countDocuments({ status: { $ne: 'Discharged' } })
      },
      appointments: {
        today: appointmentsToday,
        pending: pendingAppointments
      },
      beds: {
        total: totalBeds,
        available: availableBeds
      },
      doctors: {
        total: totalDoctors,
        available: totalDoctors // Simplify for now
      },
      labs: {
        pending: pendingLabs,
        completedToday: completedLabsToday
      },
      doctorSpecific
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
