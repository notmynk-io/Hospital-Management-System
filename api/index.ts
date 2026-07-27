import express from 'express';
import cors from 'cors';
import { connectDB } from '../src/server/config/db';
import { seedDemoData } from '../src/server/config/seed';
import { errorHandler } from '../src/server/middleware/error.middleware';

import authRoutes from '../src/server/modules/auth/auth.route';
import userRoutes from '../src/server/modules/users/user.route';
import patientRoutes from '../src/server/modules/patients/patient.route';
import appointmentRoutes from '../src/server/modules/appointments/appointment.route';
import bedRoutes from '../src/server/modules/beds/bed.route';
import dashboardRoutes from '../src/server/modules/dashboard/dashboard.route';
import labRoutes from '../src/server/modules/labs/lab.route';
import billingRoutes from '../src/server/modules/billing/billing.route';

const app = express();

let dbInitialized = false;

app.use(cors());
app.use(express.json());

// Ensure DB is connected before handling any requests in serverless environments
app.use(async (req, res, next) => {
  if (!dbInitialized) {
    await connectDB();
    
    // In a real production environment, you might not want to seed data on every cold start
    // We add it here for demo purposes so it works seamlessly on Vercel out of the box
    try {
      await seedDemoData();
    } catch (e) {
      console.log('Seed error on serverless start', e);
    }
    
    dbInitialized = true;
  }
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'HMS API on Vercel is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/beds', bedRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/labs', labRoutes);
app.use('/api/billing', billingRoutes);

app.use('/api', errorHandler);

export default app;
