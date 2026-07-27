import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Shield, Users, Database, Bell, Mail } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Button } from '../../components/ui/button';

export default function Settings() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('hms_token');
      const res = await fetch('/api/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout title="System Settings">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div className="md:col-span-1 space-y-2">
          <button className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 bg-indigo-50 text-indigo-700 font-medium">
            <Users className="w-5 h-5" /> User Management
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 text-slate-600 hover:bg-slate-50 transition-colors">
            <Shield className="w-5 h-5" /> Roles & Permissions
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 text-slate-600 hover:bg-slate-50 transition-colors">
            <Bell className="w-5 h-5" /> Notifications
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 text-slate-600 hover:bg-slate-50 transition-colors">
            <Database className="w-5 h-5" /> Backup & Restore
          </button>
        </div>

        <div className="md:col-span-3">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">Staff Accounts</h3>
              <Button onClick={() => alert("Add staff modal coming soon.")} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-1.5 h-auto">
                Add New Staff
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50/50 text-slate-500 font-medium text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 border-b border-slate-200">Name</th>
                    <th className="px-6 py-4 border-b border-slate-200">Role</th>
                    <th className="px-6 py-4 border-b border-slate-200">Email</th>
                    <th className="px-6 py-4 border-b border-slate-200">Status</th>
                    <th className="px-6 py-4 border-b border-slate-200 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-400">Loading users...</td>
                    </tr>
                  ) : users.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4">
                        {user.isActive ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-400 text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button onClick={() => alert("Edit user profile coming soon.")} variant="outline" className="h-7 text-xs px-2 py-0">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
      </div>
    </DashboardLayout>
  );
}
