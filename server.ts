import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import { connectDB } from "./src/server/config/db";
import { seedDemoData } from "./src/server/config/seed";
import { errorHandler } from "./src/server/middleware/error.middleware";
// Import routes
import authRoutes from "./src/server/modules/auth/auth.route";
import userRoutes from "./src/server/modules/users/user.route";
import patientRoutes from "./src/server/modules/patients/patient.route";
import appointmentRoutes from "./src/server/modules/appointments/appointment.route";
import bedRoutes from "./src/server/modules/beds/bed.route";
import dashboardRoutes from "./src/server/modules/dashboard/dashboard.route";
import labRoutes from "./src/server/modules/labs/lab.route";

import billingRoutes from "./src/server/modules/billing/billing.route";

// We will add more routes here

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Connect to MongoDB
  await connectDB();
  
  // Seed demo data
  await seedDemoData();

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "HMS Server is running" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/patients", patientRoutes);
  app.use("/api/appointments", appointmentRoutes);
  app.use("/api/beds", bedRoutes);
  app.use("/api/dashboard", dashboardRoutes);
  app.use("/api/labs", labRoutes);
  app.use("/api/billing", billingRoutes);

  // Global Error Handler for API routes
  app.use('/api', errorHandler);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // For Express 4.x
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT as number, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);
