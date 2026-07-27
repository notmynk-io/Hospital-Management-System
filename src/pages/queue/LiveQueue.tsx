import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MonitorPlay, Users } from 'lucide-react';

export default function LiveQueue() {
  return (
    <DashboardLayout title="Live OPD Queue">
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <MonitorPlay className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-700 mb-2">Live Queue Display</h2>
        <p className="text-slate-500 max-w-md">
          This module is designed for large displays in waiting areas. It shows real-time token numbers, estimated wait times, and doctor availability.
        </p>
      </div>
    </DashboardLayout>
  );
}
