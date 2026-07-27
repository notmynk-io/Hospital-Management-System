import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Activity, LogOut, Search, Bell, Users, Calendar, Syringe, TestTube, 
  Stethoscope, ClipboardList, Bed, FileText, CreditCard, Settings, Pill, 
  User, Monitor, FlaskConical, Radio, Package, Briefcase, HeartPulse 
} from 'lucide-react';
import { Button } from '../../components/ui/button';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const userStr = localStorage.getItem('hms_user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('hms_token');
    localStorage.removeItem('hms_user');
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return null;
  }

  const allNavSections = [
    {
      title: 'Dashboards',
      items: [
        { label: 'Command Centre', path: '/admin', roles: ['ADMIN'], icon: <Activity className="w-5 h-5" /> },
        { label: 'Doctor Hub', path: '/doctor', roles: ['DOCTOR'], icon: <Stethoscope className="w-5 h-5" /> },
        { label: 'Nurse Station', path: '/nurse', roles: ['NURSE'], icon: <Syringe className="w-5 h-5" /> },
        { label: 'Front Desk', path: '/reception', roles: ['RECEPTIONIST'], icon: <ClipboardList className="w-5 h-5" /> },
        { label: 'Laboratory Hub', path: '/lab', roles: ['LAB_TECHNICIAN'], icon: <TestTube className="w-5 h-5" /> },
        { label: 'Pharmacy Hub', path: '/pharmacy-hub', roles: ['PHARMACIST'], icon: <Pill className="w-5 h-5" /> },
        { label: 'My Portal', path: '/patient', roles: ['PATIENT'], icon: <User className="w-5 h-5" /> },
      ]
    },
    {
      title: 'Front Office',
      items: [
        { label: 'Live Queue', path: '/queue', roles: ['ADMIN', 'RECEPTIONIST', 'DOCTOR'], icon: <Monitor className="w-5 h-5" /> },
        { label: 'Appointments', path: '/appointments', roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'PATIENT'], icon: <Calendar className="w-5 h-5" /> },
      ]
    },
    {
      title: 'Clinical',
      items: [
        { label: 'OPD - Out Patient', path: '/opd', roles: ['ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST'], icon: <HeartPulse className="w-5 h-5" /> },
        { label: 'IPD - In Patient', path: '/ipd', roles: ['ADMIN', 'DOCTOR', 'NURSE'], icon: <Bed className="w-5 h-5" /> },
        { label: 'Pharmacy', path: '/pharmacy', roles: ['ADMIN', 'PHARMACIST', 'DOCTOR'], icon: <Pill className="w-5 h-5" /> },
        { label: 'Pathology', path: '/reports', roles: ['ADMIN', 'DOCTOR', 'LAB_TECHNICIAN', 'PATIENT'], icon: <FlaskConical className="w-5 h-5" /> },
        { label: 'Radiology', path: '/radiology', roles: ['ADMIN', 'DOCTOR', 'LAB_TECHNICIAN'], icon: <Radio className="w-5 h-5" /> },
      ]
    },
    {
      title: 'Operations',
      items: [
        { label: 'Patient Registry', path: '/patients', roles: ['ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST'], icon: <Users className="w-5 h-5" /> },
        { label: 'Ward Management', path: '/wards', roles: ['ADMIN', 'DOCTOR', 'NURSE'], icon: <Activity className="w-5 h-5" /> },
        { label: 'Inventory', path: '/inventory', roles: ['ADMIN'], icon: <Package className="w-5 h-5" /> },
        { label: 'HR & Staff', path: '/hr', roles: ['ADMIN'], icon: <Briefcase className="w-5 h-5" /> },
      ]
    },
    {
      title: 'Finance',
      items: [
        { label: 'Billing & Payments', path: '/billing', roles: ['ADMIN', 'RECEPTIONIST', 'PATIENT'], icon: <CreditCard className="w-5 h-5" /> },
      ]
    },
    {
      title: 'System',
      items: [
        { label: 'Settings', path: '/settings', roles: ['ADMIN', 'PATIENT'], icon: <Settings className="w-5 h-5" /> },
      ]
    }
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              <Activity className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">MedCore <span className="text-indigo-600">Enterprise</span></span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
          {allNavSections.map((section, idx) => {
            const allowedItems = section.items.filter(item => item.roles.includes(user.role));
            if (allowedItems.length === 0) return null;

            return (
              <div key={idx} className="space-y-1">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2 px-2">
                  {section.title}
                </div>
                {allowedItems.map((item) => {
                  const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/');
                  return (
                    <div 
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium cursor-pointer transition-colors ${
                        isActive 
                          ? 'bg-indigo-50 text-indigo-700' 
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold border border-white">
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div>
                <div className="text-xs font-bold truncate max-w-[100px]">{user.firstName} {user.lastName}</div>
                <div className="text-[10px] text-slate-500">{user.role}</div>
              </div>
            </div>
            <Button variant="ghost" className="h-8 w-8 p-0 text-slate-500 hover:text-slate-900" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
            <span className="hidden sm:flex bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> LIVE OPS
            </span>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-64 bg-slate-100 border-none rounded-full pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
              />
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
                <Bell className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
