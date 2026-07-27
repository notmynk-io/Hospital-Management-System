import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Briefcase } from 'lucide-react';

export default function StaffList() {
  return (
    <DashboardLayout title="HR & Staff Management">
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <Briefcase className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-700 mb-2">Human Resources</h2>
        <p className="text-slate-500 max-w-md">
          Manage hospital staff, payroll, shift scheduling, leaves, and doctor attendance.
        </p>
      </div>
    </DashboardLayout>
  );
}
