import React from 'react';
import { Calendar, User, FileText, Settings } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function PatientDashboard() {
  return (
    <DashboardLayout title="Patient Portal">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Next Appointment</div>
            <Calendar className="h-4 w-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-800 mt-auto">2</div>
          <div className="text-[10px] text-slate-400 font-medium mt-1">Upcoming</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Lab Results</div>
            <FileText className="h-4 w-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-800 mt-auto">1</div>
          <div className="text-[10px] text-emerald-500 font-medium mt-1">Available to view</div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[400px] overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800">My Health Records</h3>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
          <User className="w-12 h-12 mb-4 text-slate-200" />
          <p className="text-sm">Your health records will appear here.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
