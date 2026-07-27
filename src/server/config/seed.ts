import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User, { UserRole } from "../modules/users/user.model";
import Patient from "../modules/patients/patient.model";
import Appointment from "../modules/appointments/appointment.model";
import Bed from "../modules/beds/bed.model";
import LabReport from "../modules/labs/lab.model";
import Billing from "../modules/billing/billing.model";

export const seedDemoData = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("password123", salt);

    const demoUsers = [
      {
        firstName: "System",
        lastName: "Admin",
        email: "admin@medcore.com",
        password: "password123",
        role: UserRole.ADMIN,
      },
      {
        firstName: "Julian",
        lastName: "Vance",
        email: "doctor@medcore.com",
        password: "password123",
        role: UserRole.DOCTOR,
      },
      {
        firstName: "Sarah",
        lastName: "Miller",
        email: "nurse@medcore.com",
        password: "password123",
        role: UserRole.NURSE,
      },
      {
        firstName: "Emily",
        lastName: "Chen",
        email: "reception@medcore.com",
        password: "password123",
        role: UserRole.RECEPTIONIST,
      },
      {
        firstName: "Marcus",
        lastName: "Johnson",
        email: "lab@medcore.com",
        password: "password123",
        role: UserRole.LAB_TECHNICIAN,
      },
      {
        firstName: "David",
        lastName: "Lee",
        email: "pharmacy@medcore.com",
        password: "password123",
        role: UserRole.PHARMACIST,
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "patient@medcore.com",
        password: "password123",
        role: UserRole.PATIENT,
      }
    ];

    const createdUsers = [];
    for (const userData of demoUsers) {
      let existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        existingUser = await User.create({
          ...userData,
          isActive: true,
        });
      }
      createdUsers.push(existingUser);
    }
    console.log("Demo users ensured.");

    const patientsCount = await Patient.countDocuments();
    if (patientsCount < 5) {
      const patients = [
        { patientId: "PT-1001", firstName: "John", lastName: "Doe", dateOfBirth: new Date("1980-05-15"), gender: "Male", phone: "555-0101", status: "Outpatient" as const },
        { patientId: "PT-1002", firstName: "Jane", lastName: "Smith", dateOfBirth: new Date("1992-08-22"), gender: "Female", phone: "555-0102", status: "Admitted" as const },
        { patientId: "PT-1003", firstName: "Robert", lastName: "Johnson", dateOfBirth: new Date("1975-11-30"), gender: "Male", phone: "555-0103", status: "Discharged" as const },
        { patientId: "PT-1004", firstName: "Alice", lastName: "Williams", dateOfBirth: new Date("1988-03-10"), gender: "Female", phone: "555-0104", status: "Outpatient" as const },
        { patientId: "PT-1005", firstName: "Michael", lastName: "Brown", dateOfBirth: new Date("1965-12-05"), gender: "Male", phone: "555-0105", status: "Admitted" as const },
      ];
      
      const createdPatients = [];
      for (const p of patients) {
        const patient = await Patient.create(p);
        createdPatients.push(patient);
      }
      console.log("Patient data seeded successfully.");
      
      const doctorUser = createdUsers.find(u => u.role === UserRole.DOCTOR);
      
      if (doctorUser && createdPatients.length >= 2) {
        await Appointment.create([
          {
            appointmentId: "APT-88231",
            patient: createdPatients[0]._id,
            doctor: doctorUser._id,
            date: new Date(),
            timeSlot: "09:00 AM",
            status: "Scheduled",
            type: "Consultation",
            notes: "Routine checkup"
          },
          {
            appointmentId: "APT-88232",
            patient: createdPatients[1]._id,
            doctor: doctorUser._id,
            date: new Date(),
            timeSlot: "10:30 AM",
            status: "Waiting",
            type: "Follow-up",
            notes: "Review lab reports"
          }
        ]);
        console.log("Appointment data seeded successfully.");
      }
      
      const beds = [];
      for (let i = 1; i <= 10; i++) {
        beds.push({
          bedId: `GEN-A-${i.toString().padStart(2, '0')}`,
          wardName: "General Ward A",
          type: "General",
          status: "Available"
        });
      }
      
      for (let i = 1; i <= 5; i++) {
        beds.push({
          bedId: `ICU-1-${i.toString().padStart(2, '0')}`,
          wardName: "Intensive Care Unit 1",
          type: "ICU",
          status: "Available"
        });
      }

      if (createdPatients.length >= 2) {
        beds[0].status = "Occupied";
        beds[0].currentPatient = createdPatients[1]._id; // Jane Smith is Admitted
        
        beds[10].status = "Occupied"; // First ICU bed
        beds[10].currentPatient = createdPatients[4]._id; // Michael Brown is Admitted
      }

      for (const b of beds) {
        await Bed.create(b);
      }
      console.log("Bed data seeded successfully.");

      if (doctorUser && createdPatients.length >= 2) {
        await LabReport.create([
          {
            reportId: "LAB-401928",
            patient: createdPatients[1]._id,
            doctor: doctorUser._id,
            testName: "Complete Blood Count (CBC)",
            category: "Blood",
            status: "Completed",
            results: "WBC: 6.5, RBC: 4.8, HGB: 14.2",
            dateOrdered: new Date(Date.now() - 86400000),
            dateCompleted: new Date()
          },
          {
            reportId: "LAB-401929",
            patient: createdPatients[4]._id,
            doctor: doctorUser._id,
            testName: "Lipid Panel",
            category: "Blood",
            status: "In Progress",
            dateOrdered: new Date()
          },
          {
            reportId: "LAB-401930",
            patient: createdPatients[0]._id,
            doctor: doctorUser._id,
            testName: "Urinalysis",
            category: "Urine",
            status: "Pending",
            dateOrdered: new Date()
          }
        ]);
        console.log("Lab reports seeded successfully.");

        await Billing.create([
          {
            invoiceId: "INV-990123",
            patient: createdPatients[0]._id,
            items: [
              { description: "General Consultation", amount: 150.00 },
              { description: "Urinalysis Test", amount: 45.00 }
            ],
            totalAmount: 195.00,
            status: "Pending",
            dateIssued: new Date()
          },
          {
            invoiceId: "INV-990124",
            patient: createdPatients[1]._id,
            items: [
              { description: "Room Charges (2 Days)", amount: 1200.00 },
              { description: "CBC Test", amount: 85.00 },
              { description: "Pharmacy", amount: 120.50 }
            ],
            totalAmount: 1405.50,
            status: "Paid",
            dateIssued: new Date(Date.now() - 172800000),
            datePaid: new Date()
          }
        ]);
        console.log("Billing records seeded successfully.");
      }
    } else {
      console.log("Patient and other demo data already seeded.");
    }
  } catch (error) {
    console.error("Error seeding demo data:", error);
  }
};
