import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import NurseDashboard from "./pages/dashboard/NurseDashboard";
import ReceptionDashboard from "./pages/dashboard/ReceptionDashboard";
import LabDashboard from "./pages/dashboard/LabDashboard";
import PharmacyDashboard from "./pages/dashboard/PharmacyDashboard";
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import PatientRegistry from "./pages/patients/PatientRegistry";
import AppointmentList from "./pages/appointments/AppointmentList";
import WardManagement from "./pages/wards/WardManagement";
import LabReports from "./pages/labs/LabReports";
import BillingDashboard from "./pages/billing/BillingDashboard";
import Settings from "./pages/settings/Settings";
import OpdList from "./pages/opd/OpdList";
import IpdList from "./pages/ipd/IpdList";
import LiveQueue from "./pages/queue/LiveQueue";
import RadiologyList from "./pages/radiology/RadiologyList";
import InventoryList from "./pages/inventory/InventoryList";
import StaffList from "./pages/hr/StaffList";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/doctor" element={<DoctorDashboard />} />
      <Route path="/nurse" element={<NurseDashboard />} />
      <Route path="/reception" element={<ReceptionDashboard />} />
      <Route path="/lab" element={<LabDashboard />} />
      <Route path="/pharmacy-hub" element={<PharmacyDashboard />} />
      <Route path="/pharmacy" element={<PharmacyDashboard />} />
      <Route path="/patient" element={<PatientDashboard />} />
      
      {/* Front Office */}
      <Route path="/queue" element={<LiveQueue />} />
      <Route path="/appointments" element={<AppointmentList />} />
      
      {/* Clinical */}
      <Route path="/opd" element={<OpdList />} />
      <Route path="/ipd" element={<IpdList />} />
      <Route path="/reports" element={<LabReports />} />
      <Route path="/radiology" element={<RadiologyList />} />
      
      {/* Operations */}
      <Route path="/patients" element={<PatientRegistry />} />
      <Route path="/wards" element={<WardManagement />} />
      <Route path="/inventory" element={<InventoryList />} />
      <Route path="/hr" element={<StaffList />} />
      
      {/* Finance & System */}
      <Route path="/billing" element={<BillingDashboard />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
