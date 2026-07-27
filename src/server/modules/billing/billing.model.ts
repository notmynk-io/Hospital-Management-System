import mongoose, { Document, Schema } from "mongoose";

export interface IBillingItem {
  description: string;
  amount: number;
}

export interface IBilling extends Document {
  invoiceId: string;
  patient: mongoose.Types.ObjectId;
  items: IBillingItem[];
  totalAmount: number;
  status: 'Pending' | 'Paid' | 'Cancelled';
  dateIssued: Date;
  datePaid?: Date;
}

const billingSchema = new Schema<IBilling>({
  invoiceId: { type: String, required: true, unique: true },
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  items: [{
    description: { type: String, required: true },
    amount: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Paid', 'Cancelled'], 
    default: 'Pending' 
  },
  dateIssued: { type: Date, default: Date.now },
  datePaid: { type: Date }
}, { timestamps: true });

const BillingModel = (mongoose.models.Billing as mongoose.Model<IBilling>) || mongoose.model<IBilling>("Billing", billingSchema);
export default BillingModel;
