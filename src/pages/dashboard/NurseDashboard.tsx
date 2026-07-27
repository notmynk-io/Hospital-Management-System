import React, { useState, useEffect } from 'react';
import { Users, Activity, Loader2 } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function NurseDashboard() {
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
    <DashboardLayout title="Nurse Station">
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
      ) : stats ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total In-Patients</div>
              <Users className="h-4 w-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mt-auto">{stats.beds.total - stats.beds.available}</div>
            <div className="text-[10px] text-slate-400 font-medium mt-1">Across all wards</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Available Beds</div>
              <Activity className="h-4 w-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mt-auto">{stats.beds.available}</div>
            <div className="text-[10px] text-emerald-500 font-medium mt-1">Ready for admission</div>
          </div>
        </div>
      ) : (
        <div className="text-red-500">Failed to load statistics.</div>
      )}
    </DashboardLayout>
  );
}
