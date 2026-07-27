import React, { useState, useEffect } from 'react';
import { Calendar, Search, Plus, Filter, MoreHorizontal, User, Clock, CheckCircle, XCircle } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Button } from '../../components/ui/button';

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('hms_token');
      const res = await fetch('/api/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-700';
      case 'Waiting': return 'bg-amber-100 text-amber-700';
      case 'Completed': return 'bg-emerald-100 text-emerald-700';
      case 'Cancelled': return 'bg-rose-100 text-rose-700';
      case 'No Show': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <DashboardLayout title="Appointments">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search appointments..." 
              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <Button variant="outline" className="hidden sm:flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>
        <Button onClick={() => alert("New appointment modal coming soon.")} className="w-full md:w-auto flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4" /> New Appointment
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-medium text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 border-b border-slate-200">Patient</th>
                <th className="px-6 py-4 border-b border-slate-200">Doctor</th>
                <th className="px-6 py-4 border-b border-slate-200">Date & Time</th>
                <th className="px-6 py-4 border-b border-slate-200">Type</th>
                <th className="px-6 py-4 border-b border-slate-200">Status</th>
                <th className="px-6 py-4 border-b border-slate-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">Loading appointments...</td>
                </tr>
              ) : appointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">No appointments found.</td>
                </tr>
              ) : appointments.map((apt) => (
                <tr key={apt._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{apt.patient.firstName} {apt.patient.lastName}</div>
                    <div className="text-xs text-slate-500">{apt.patient.patientId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Dr. {apt.doctor.firstName} {apt.doctor.lastName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-900 font-medium">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {new Date(apt.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <Clock className="w-3 h-3" />
                      {apt.timeSlot}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {apt.type}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button onClick={() => alert("Marking as completed... (Demo)")} variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-emerald-600" title="Mark Completed">
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => alert("Cancelling appointment... (Demo)")} variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-rose-600" title="Cancel">
                        <XCircle className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => alert("More options coming soon.")} variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-900">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
