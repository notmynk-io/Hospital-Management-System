import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Activity } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      localStorage.setItem('hms_token', data.token);
      localStorage.setItem('hms_user', JSON.stringify(data));
      
      // Redirect based on role
      switch (data.role) {
        case 'ADMIN':
          navigate('/admin');
          break;
        case 'DOCTOR':
          navigate('/doctor');
          break;
        case 'NURSE':
          navigate('/nurse');
          break;
        case 'RECEPTIONIST':
          navigate('/reception');
          break;
        case 'LAB_TECHNICIAN':
          navigate('/lab');
          break;
        case 'PHARMACIST':
          navigate('/pharmacy');
          break;
        case 'PATIENT':
          navigate('/patient');
          break;
        default:
          navigate('/admin'); // Fallback
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const setDemoCredentials = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            <Activity className="h-6 w-6" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-slate-900">MedCore <span className="text-indigo-600">Enterprise</span></span>
        </div>
        <h2 className="mt-6 text-center text-xl font-semibold text-slate-800">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-xs text-slate-500 font-medium uppercase tracking-wider">
          Hospital Command Centre
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md flex flex-col gap-6">
        <div className="bg-white py-8 px-4 border border-slate-200 shadow-sm sm:rounded-xl sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <div className="mt-1">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1">
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
          </form>
        </div>
        
        {/* Demo Credentials Panel */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm">
          <h3 className="font-semibold text-indigo-900 mb-2">Demo Credentials</h3>
          <p className="text-xs text-indigo-700 mb-3">Click on a role to auto-fill (Password: password123)</p>
          <div className="flex flex-col gap-2">
            <button onClick={() => setDemoCredentials('admin@medcore.com')} className="text-left px-3 py-2 bg-white rounded border border-indigo-100 hover:border-indigo-300 transition-colors text-indigo-900 font-medium text-xs flex justify-between">
              <span>Admin</span>
              <span className="text-slate-500 font-normal">admin@medcore.com</span>
            </button>
            <button onClick={() => setDemoCredentials('doctor@medcore.com')} className="text-left px-3 py-2 bg-white rounded border border-indigo-100 hover:border-indigo-300 transition-colors text-indigo-900 font-medium text-xs flex justify-between">
              <span>Doctor</span>
              <span className="text-slate-500 font-normal">doctor@medcore.com</span>
            </button>
            <button onClick={() => setDemoCredentials('nurse@medcore.com')} className="text-left px-3 py-2 bg-white rounded border border-indigo-100 hover:border-indigo-300 transition-colors text-indigo-900 font-medium text-xs flex justify-between">
              <span>Nurse</span>
              <span className="text-slate-500 font-normal">nurse@medcore.com</span>
            </button>
            <button onClick={() => setDemoCredentials('reception@medcore.com')} className="text-left px-3 py-2 bg-white rounded border border-indigo-100 hover:border-indigo-300 transition-colors text-indigo-900 font-medium text-xs flex justify-between">
              <span>Receptionist</span>
              <span className="text-slate-500 font-normal">reception@medcore.com</span>
            </button>
            <button type="button" onClick={() => setDemoCredentials('lab@medcore.com')} className="text-left px-3 py-2 bg-white rounded border border-indigo-100 hover:border-indigo-300 transition-colors text-indigo-900 font-medium text-xs flex justify-between">
              <span>Lab Technician</span>
              <span className="text-slate-500 font-normal">lab@medcore.com</span>
            </button>
            <button type="button" onClick={() => setDemoCredentials('pharmacy@medcore.com')} className="text-left px-3 py-2 bg-white rounded border border-indigo-100 hover:border-indigo-300 transition-colors text-indigo-900 font-medium text-xs flex justify-between">
              <span>Pharmacist</span>
              <span className="text-slate-500 font-normal">pharmacy@medcore.com</span>
            </button>
            <button type="button" onClick={() => setDemoCredentials('patient@medcore.com')} className="text-left px-3 py-2 bg-white rounded border border-indigo-100 hover:border-indigo-300 transition-colors text-indigo-900 font-medium text-xs flex justify-between">
              <span>Patient (User)</span>
              <span className="text-slate-500 font-normal">patient@medcore.com</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
