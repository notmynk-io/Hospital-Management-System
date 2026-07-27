import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, BedDouble, FileText, UserMinus } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Button } from '../../components/ui/button';

export default function IpdList() {
  const [ipdAdmissions, setIpdAdmissions] = useState([
    {
      id: 'IPD-26101',
      patient: { name: 'Sarah Jenkins', age: 34, gender: 'Female', id: 'PT-1002' },
      consultant: 'Dr. Robert Chen (Cardiology)',
      admissionDate: new Date(Date.now() - 86400000 * 2).toISOString(),
      ward: 'General Ward - A',
      bed: 'Bed-104',
      status: 'Admitted',
      diagnosis: 'Acute Coronary Syndrome'
    },
    {
      id: 'IPD-26105',
      patient: { name: 'James Smith', age: 52, gender: 'Male', id: 'PT-1105' },
      consultant: 'Dr. Emily Watson (General)',
      admissionDate: new Date(Date.now() - 86400000 * 5).toISOString(),
      ward: 'ICU',
      bed: 'ICU-3',
      status: 'Admitted',
      diagnosis: 'Severe Pneumonia'
    },
    {
      id: 'IPD-26088',
      patient: { name: 'Emma Wilson', age: 28, gender: 'Female', id: 'PT-0982' },
      consultant: 'Dr. Sarah Jenkins (Cardiology)',
      admissionDate: new Date(Date.now() - 86400000 * 8).toISOString(),
      ward: 'Private Suite',
      bed: 'P-101',
      status: 'Discharged',
      diagnosis: 'Post-op observation'
    }
  ]);

  const getStatusBadge = (status: string) => {
    if (status === 'Admitted') {
      return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">Admitted</span>;
    }
    return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">Discharged</span>;
  };

  return (
    <DashboardLayout title="IPD Management (In Patient)">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex-1 w-full md:w-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by Patient Name, IPD No, or Phone..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none flex items-center gap-2 bg-white">
            <Filter className="w-4 h-4" /> Filters
          </Button>
          <Button onClick={() => alert("New IPD Admission coming soon.")} className="flex-1 md:flex-none flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="w-4 h-4" /> Admit Patient
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">IPD No.</th>
                <th className="px-6 py-4">Patient Details</th>
                <th className="px-6 py-4">Ward / Bed</th>
                <th className="px-6 py-4">Consultant</th>
                <th className="px-6 py-4">Admission Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ipdAdmissions.map((admission) => (
                <tr key={admission.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-indigo-600">{admission.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{admission.patient.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{admission.patient.age}y • {admission.patient.gender} • {admission.patient.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-700 flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-indigo-400" /> {admission.bed}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{admission.ward}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-700">{admission.consultant}</div>
                    <div className="text-xs text-slate-500 mt-0.5 truncate max-w-[150px]" title={admission.diagnosis}>Dx: {admission.diagnosis}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-700">{new Date(admission.admissionDate).toLocaleDateString()}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{new Date(admission.admissionDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(admission.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button onClick={() => alert("Daily notes coming soon.")} variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600" title="Clinical Notes">
                        <FileText className="w-4 h-4" />
                      </Button>
                      {admission.status === 'Admitted' && (
                        <Button onClick={() => alert("Initiate discharge process coming soon.")} variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-emerald-600" title="Discharge Patient">
                          <UserMinus className="w-4 h-4" />
                        </Button>
                      )}
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
