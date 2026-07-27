import React, { useState, useEffect } from 'react';
import { TestTube, Activity, Loader2 } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function LabDashboard() {
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
    <DashboardLayout title="Laboratory">
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
      ) : stats ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pending Tests</div>
              <TestTube className="h-4 w-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mt-auto">{stats.labs.pending}</div>
            <div className="text-[10px] text-amber-500 font-medium mt-1">Action Required</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Completed Today</div>
              <Activity className="h-4 w-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mt-auto">{stats.labs.completedToday}</div>
            <div className="text-[10px] text-emerald-500 font-medium mt-1">Reports generated</div>
          </div>
        </div>
      ) : (
        <div className="text-red-500">Failed to load statistics.</div>
      )}
    </DashboardLayout>
  );
}
