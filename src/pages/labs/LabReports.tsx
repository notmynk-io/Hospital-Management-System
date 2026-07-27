import React, { useState, useEffect } from 'react';
import { TestTube, Search, Plus, Filter, FileText, User, Calendar, CheckCircle, Clock } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Button } from '../../components/ui/button';

export default function LabReports() {
  const [reports, setReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('hms_token');
      const res = await fetch('/api/labs', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pending': return 'bg-slate-100 text-slate-700';
      case 'In Progress': return 'bg-amber-100 text-amber-700';
      case 'Completed': return 'bg-emerald-100 text-emerald-700';
      case 'Cancelled': return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <DashboardLayout title="Laboratory Reports">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <Button variant="outline" className="hidden sm:flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>
        <Button onClick={() => alert("New test request modal coming soon.")} className="w-full md:w-auto flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4" /> New Test Request
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-medium text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 border-b border-slate-200">Test Details</th>
                <th className="px-6 py-4 border-b border-slate-200">Patient</th>
                <th className="px-6 py-4 border-b border-slate-200">Date Ordered</th>
                <th className="px-6 py-4 border-b border-slate-200">Status</th>
                <th className="px-6 py-4 border-b border-slate-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">Loading reports...</td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">No reports found.</td>
                </tr>
              ) : reports.map((report) => (
                <tr key={report._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100">
                        <TestTube className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{report.testName}</div>
                        <div className="text-xs text-slate-500">{report.reportId} • {report.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-700">{report.patient.firstName} {report.patient.lastName}</div>
                    <div className="text-xs text-slate-500">Dr. {report.doctor.firstName} {report.doctor.lastName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-900">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {new Date(report.dateOrdered).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {report.status === 'Completed' ? (
                        <Button onClick={() => alert("Viewing report results coming soon.")} variant="ghost" className="h-8 w-8 p-0 text-indigo-600 hover:text-indigo-800" title="View Report">
                          <FileText className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button onClick={() => alert("Update status modal coming soon.")} variant="ghost" className="h-8 px-2 text-xs text-slate-500 hover:text-indigo-600 border border-slate-200" title="Update Status">
                          Update
                        </Button>
                      )}
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
