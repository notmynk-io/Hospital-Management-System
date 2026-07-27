import React, { useState, useEffect } from 'react';
import { Users, Calendar, Loader2 } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function DoctorDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('hms_token');
      const res = await fetch('/api/dashboard/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout title="Doctor Hub">
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
      ) : stats ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">My Appointments</div>
              <Calendar className="h-4 w-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mt-auto">{stats.doctorSpecific?.appointmentsToday || 0}</div>
            <div className="text-[10px] text-slate-400 font-medium mt-1">Today</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">In-Patients</div>
              <Users className="h-4 w-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mt-auto">{stats.doctorSpecific?.inPatients || 0}</div>
            <div className="text-[10px] text-emerald-500 font-medium mt-1">Under your care</div>
          </div>
        </div>
      ) : (
        <div className="text-red-500">Failed to load statistics.</div>
      )}
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[400px] overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-sm text-slate-700">Today's Schedule</h2>
        </div>
        <div className="p-4 flex items-center justify-center h-full text-slate-400 text-sm">
          Select a patient to view details
        </div>
      </div>
    </DashboardLayout>
  );
}
