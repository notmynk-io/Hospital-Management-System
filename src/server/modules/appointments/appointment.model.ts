import mongoose, { Document, Schema } from "mongoose";

export interface IAppointment extends Document {
  appointmentId: string;
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  date: Date;
  timeSlot: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No Show' | 'Waiting';
  type: 'Consultation' | 'Follow-up' | 'Walk-in' | 'Emergency';
  notes?: string;
}

const appointmentSchema = new Schema<IAppointment>({
  appointmentId: { type: String, required: true, unique: true },
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Scheduled', 'Completed', 'Cancelled', 'No Show', 'Waiting'], 
    default: 'Scheduled' 
  },
  type: { 
    type: String, 
    enum: ['Consultation', 'Follow-up', 'Walk-in', 'Emergency'], 
    required: true 
  },
  notes: { type: String }
}, { timestamps: true });

const AppointmentModel = (mongoose.models.Appointment as mongoose.Model<IAppointment>) || mongoose.model<IAppointment>("Appointment", appointmentSchema);
export default AppointmentModel;
