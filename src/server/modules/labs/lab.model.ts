import mongoose, { Document, Schema } from "mongoose";

export interface ILabReport extends Document {
  reportId: string;
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  testName: string;
  category: 'Blood' | 'Urine' | 'Pathology' | 'Microbiology' | 'Imaging';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  results?: string;
  dateOrdered: Date;
  dateCompleted?: Date;
}

const labReportSchema = new Schema<ILabReport>({
  reportId: { type: String, required: true, unique: true },
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  testName: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Blood', 'Urine', 'Pathology', 'Microbiology', 'Imaging'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'], 
    default: 'Pending' 
  },
  results: { type: String },
  dateOrdered: { type: Date, default: Date.now },
  dateCompleted: { type: Date }
}, { timestamps: true });

const LabReportModel = (mongoose.models.LabReport as mongoose.Model<ILabReport>) || mongoose.model<ILabReport>("LabReport", labReportSchema);
export default LabReportModel;
