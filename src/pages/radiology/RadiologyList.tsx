import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Radio } from 'lucide-react';

export default function RadiologyList() {
  return (
    <DashboardLayout title="Radiology Department">
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <Radio className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-700 mb-2">Radiology Dashboard</h2>
        <p className="text-slate-500 max-w-md">
          Manage X-Ray, CT scans, MRI, and Ultrasound requests, reports, and imaging here.
        </p>
      </div>
    </DashboardLayout>
  );
}
