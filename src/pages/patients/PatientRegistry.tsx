import React, { useState, useEffect } from 'react';
import { Users, Search, Plus, Filter, MoreHorizontal, User, FileText, Activity } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Button } from '../../components/ui/button';
import PatientProfile from './PatientProfile';

export default function PatientRegistry() {
  const [patients, setPatients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem('hms_token');
      const res = await fetch('/api/patients', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (selectedPatient) {
    return (
      <DashboardLayout title="Patient Registry">
        <PatientProfile patient={selectedPatient} onBack={() => setSelectedPatient(null)} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Patient Registry">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by ID, Name, or Phone..." 
              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <Button variant="outline" className="hidden sm:flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>
        <Button onClick={() => alert("New patient modal coming soon.")} className="w-full md:w-auto flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4" /> New Patient
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-medium text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 border-b border-slate-200">Patient Details</th>
                <th className="px-6 py-4 border-b border-slate-200">ID & Contact</th>
                <th className="px-6 py-4 border-b border-slate-200">Demographics</th>
                <th className="px-6 py-4 border-b border-slate-200">Status</th>
                <th className="px-6 py-4 border-b border-slate-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">Loading patients...</td>
                </tr>
              ) : patients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">No patients found.</td>
                </tr>
              ) : patients.map((patient) => (
                <tr key={patient._id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group" onClick={() => setSelectedPatient(patient)}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold border border-indigo-100">
                        {patient.firstName[0]}{patient.lastName[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{patient.firstName} {patient.lastName}</div>
                        <div className="text-xs text-slate-500">Registered: {new Date(patient.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-700">{patient.patientId}</div>
                    <div className="text-xs text-slate-500">{patient.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-700">{patient.gender}, {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()}y</div>
                    <div className="text-xs text-slate-500">{patient.bloodGroup || 'Blood Group: N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      patient.status === 'Admitted' ? 'bg-amber-100 text-amber-700' :
                      patient.status === 'Discharged' ? 'bg-slate-100 text-slate-600' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button onClick={(e) => { e.stopPropagation(); setSelectedPatient(patient); }} variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600">
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button onClick={(e) => { e.stopPropagation(); alert("More options coming soon") }} variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-900">
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
