import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, FileText, HeartPulse, Stethoscope, Clock, CheckCircle } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Button } from '../../components/ui/button';

export default function OpdList() {
  const [opdVisits, setOpdVisits] = useState([
    {
      id: 'OPD-26101',
      token: '24',
      patient: { name: 'Sarah Jenkins', age: 34, gender: 'Female', id: 'PT-1002' },
      consultant: 'Dr. Robert Chen (Cardiology)',
      date: new Date().toISOString(),
      symptoms: 'Chest pain, shortness of breath',
      status: 'Waiting',
      waitTime: '15 mins'
    },
    {
      id: 'OPD-26102',
      token: '25',
      patient: { name: 'Michael Chang', age: 45, gender: 'Male', id: 'PT-1045' },
      consultant: 'Dr. Emily Watson (General)',
      date: new Date().toISOString(),
      symptoms: 'Fever, cough',
      status: 'Consulting',
      waitTime: '-'
    },
    {
      id: 'OPD-26099',
      token: '21',
      patient: { name: 'Emma Wilson', age: 28, gender: 'Female', id: 'PT-0982' },
      consultant: 'Dr. Sarah Jenkins (Cardiology)',
      date: new Date(Date.now() - 3600000).toISOString(),
      symptoms: 'Routine Checkup',
      status: 'Completed',
      waitTime: '-'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Waiting':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200 flex items-center gap-1"><Clock className="w-3 h-3" /> Waiting</span>;
      case 'Consulting':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center gap-1"><Stethoscope className="w-3 h-3" /> Consulting</span>;
      case 'Completed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Completed</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">{status}</span>;
    }
  };

  return (
    <DashboardLayout title="OPD Management (Out Patient)">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex-1 w-full md:w-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by Patient Name, OPD No, or Phone..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none flex items-center gap-2 bg-white">
            <Filter className="w-4 h-4" /> Filters
          </Button>
          <Button onClick={() => alert("New OPD Registration coming soon.")} className="flex-1 md:flex-none flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="w-4 h-4" /> New OPD Visit
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">OPD No. / Token</th>
                <th className="px-6 py-4">Patient Details</th>
                <th className="px-6 py-4">Consultant</th>
                <th className="px-6 py-4">Symptoms</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {opdVisits.map((visit) => (
                <tr key={visit.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-indigo-600">{visit.id}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Token: <span className="font-bold text-slate-700">{visit.token}</span></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{visit.patient.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{visit.patient.age}y • {visit.patient.gender} • {visit.patient.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-700">{visit.consultant}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{new Date(visit.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600 max-w-xs truncate" title={visit.symptoms}>{visit.symptoms}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-start gap-1">
                      {getStatusBadge(visit.status)}
                      {visit.status === 'Waiting' && <span className="text-[10px] font-medium text-amber-600 ml-1">Wait: {visit.waitTime}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button onClick={() => alert("Write Prescription coming soon.")} variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600" title="Write Prescription">
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => alert("Capture Vitals coming soon.")} variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-rose-600" title="Capture Vitals">
                        <HeartPulse className="w-4 h-4" />
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
