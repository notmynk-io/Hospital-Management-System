import React, { useState, useEffect } from 'react';
import { Activity, Users, Calendar, Activity as Heart, Loader2, AlertCircle, TrendingUp, Clock, Syringe, TestTube, ArrowUpRight, ArrowDownRight, BedDouble } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock real-time data for the command center to supplement existing API data
  const commandCenterData = {
    admissionsToday: 24,
    dischargesToday: 18,
    icuOccupancy: 85,
    emergencyQueue: 5,
    doctorsConsulting: 12,
    patientsWaiting: 38,
    labPending: 42,
    radiologyPending: 15,
    revenueToday: 145000,
    revenueGrowth: 8.4,
    criticalAlerts: [
      { id: 1, type: 'emergency', message: 'Code Blue in Ward 3', time: '2 mins ago' },
      { id: 2, type: 'inventory', message: 'Oxygen cylinders low in ICU', time: '15 mins ago' },
      { id: 3, type: 'staffing', message: 'Night shift nurse shortage', time: '1 hr ago' },
    ],
    liveQueue: [
      { token: 'OPD-102', department: 'Cardiology', waitTime: '15m' },
      { token: 'OPD-103', department: 'Orthopaedics', waitTime: '22m' },
      { token: 'OPD-104', department: 'General', waitTime: '25m' },
      { token: 'OPD-105', department: 'Paediatrics', waitTime: '30m' },
    ]
  };

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
    <DashboardLayout title="Hospital Command Centre">
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
      ) : stats ? (
        <div className="space-y-6">
          {/* Primary Operations Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Patients</div>
                <Users className="h-4 w-4 text-slate-400" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-auto">{stats.patients.total}</div>
              <div className="text-[10px] text-emerald-600 font-medium mt-1">{stats.patients.active} Active Registry</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Appointments Today</div>
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-auto">{stats.appointments.today}</div>
              <div className="text-[10px] text-slate-500 font-medium mt-1">{stats.appointments.pending} Pending</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-rose-50 rounded-bl-full -z-10"></div>
              <div className="flex justify-between items-start mb-2">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Emergency Queue</div>
                <AlertCircle className="h-4 w-4 text-rose-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-auto">{commandCenterData.emergencyQueue}</div>
              <div className="text-[10px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> Critical Priority
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Available Beds</div>
                <BedDouble className="h-4 w-4 text-slate-400" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-auto">{stats.beds.available} <span className="text-sm font-normal text-slate-400">/ {stats.beds.total}</span></div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(stats.beds.available / stats.beds.total) * 100}%` }}></div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col hidden lg:flex relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-50 rounded-bl-full -z-10"></div>
              <div className="flex justify-between items-start mb-2">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Revenue Today</div>
                <TrendingUp className="h-4 w-4 text-indigo-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-auto">${(commandCenterData.revenueToday / 1000).toFixed(1)}k</div>
              <div className="text-[10px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> {commandCenterData.revenueGrowth}% vs yesterday
              </div>
            </div>

          </div>

          {/* Secondary Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Admissions / Discharges</div>
                <div className="text-lg font-bold text-slate-800">{commandCenterData.admissionsToday} <span className="text-slate-400 text-sm font-normal">/ {commandCenterData.dischargesToday}</span></div>
              </div>
              <Activity className="h-5 w-5 text-indigo-400 opacity-50" />
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">ICU Occupancy</div>
                <div className="text-lg font-bold text-slate-800">{commandCenterData.icuOccupancy}%</div>
              </div>
              <Heart className="h-5 w-5 text-rose-400 opacity-50" />
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Doctors / Waiting</div>
                <div className="text-lg font-bold text-slate-800">{commandCenterData.doctorsConsulting} <span className="text-slate-400 text-sm font-normal">/ {commandCenterData.patientsWaiting}</span></div>
              </div>
              <Clock className="h-5 w-5 text-amber-400 opacity-50" />
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Lab / Rad Pending</div>
                <div className="text-lg font-bold text-slate-800">{commandCenterData.labPending} <span className="text-slate-400 text-sm font-normal">/ {commandCenterData.radiologyPending}</span></div>
              </div>
              <TestTube className="h-5 w-5 text-blue-400 opacity-50" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Live Queue Monitor */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-96">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-xl">
                <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live OPD Queue
                </h3>
                <span className="text-xs font-medium text-slate-500 bg-white px-2 py-1 rounded shadow-sm border border-slate-100">{commandCenterData.patientsWaiting} Waiting</span>
              </div>
              <div className="p-0 overflow-y-auto flex-1">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 bg-slate-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 font-medium">Token</th>
                      <th className="px-4 py-3 font-medium">Department</th>
                      <th className="px-4 py-3 font-medium text-right">Est. Wait</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {commandCenterData.liveQueue.map((item, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-indigo-600">{item.token}</td>
                        <td className="px-4 py-3 text-slate-700">{item.department}</td>
                        <td className="px-4 py-3 text-right text-slate-500 font-medium">{item.waitTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Main Visualizer (Chart Placeholder) */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm lg:col-span-2 flex flex-col h-96">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-800">Hospital Activity Timeline (24h)</h3>
                <select className="text-xs border-slate-200 rounded text-slate-600 py-1 pl-2 pr-6">
                  <option>Today</option>
                  <option>Yesterday</option>
                  <option>Last 7 Days</option>
                </select>
              </div>
              <div className="flex-1 p-6">
                <div className="w-full h-full flex flex-col justify-center items-center text-slate-400 text-sm bg-slate-50/50 rounded-lg border border-dashed border-slate-200">
                  <Activity className="w-8 h-8 text-slate-300 mb-2" />
                  Activity Timeline Chart Visualization
                </div>
              </div>
            </div>

          </div>

          {/* System Notifications / Alerts */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-rose-50/30 rounded-t-xl">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                System Alerts & Notifications
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {commandCenterData.criticalAlerts.map((alert) => (
                <div key={alert.id} className="p-4 flex items-start gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className={`p-2 rounded-lg ${alert.type === 'emergency' ? 'bg-rose-100 text-rose-600' : alert.type === 'inventory' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                    {alert.type === 'emergency' ? <Heart className="w-4 h-4" /> : alert.type === 'inventory' ? <Syringe className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{alert.message}</p>
                    <p className="text-xs text-slate-500 mt-1 capitalize">{alert.type} Alert • {alert.time}</p>
                  </div>
                  <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800">Acknowledge</button>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        <div className="text-red-500">Failed to load statistics.</div>
      )}
    </DashboardLayout>
  );
}


