import mongoose, { Document, Schema } from "mongoose";

export interface IPatient extends Document {
  patientId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  phone: string;
  bloodGroup?: string;
  address?: string;
  status: 'Admitted' | 'Discharged' | 'Outpatient';
}

const patientSchema = new Schema<IPatient>({
  patientId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  bloodGroup: { type: String },
  address: { type: String },
  status: { type: String, enum: ['Admitted', 'Discharged', 'Outpatient'], default: 'Outpatient' }
}, { timestamps: true });

const PatientModel = (mongoose.models.Patient as mongoose.Model<IPatient>) || mongoose.model<IPatient>("Patient", patientSchema);
export default PatientModel;
