import mongoose, { Document, Schema } from "mongoose";

export interface IBed extends Document {
  bedId: string;
  wardName: string;
  type: 'ICU' | 'General' | 'Private' | 'Isolation' | 'Emergency';
  status: 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance' | 'Reserved';
  currentPatient?: mongoose.Types.ObjectId;
}

const bedSchema = new Schema<IBed>({
  bedId: { type: String, required: true, unique: true },
  wardName: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['ICU', 'General', 'Private', 'Isolation', 'Emergency'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Available', 'Occupied', 'Cleaning', 'Maintenance', 'Reserved'], 
    default: 'Available' 
  },
  currentPatient: { type: Schema.Types.ObjectId, ref: 'Patient' }
}, { timestamps: true });

const BedModel = (mongoose.models.Bed as mongoose.Model<IBed>) || mongoose.model<IBed>("Bed", bedSchema);
export default BedModel;
