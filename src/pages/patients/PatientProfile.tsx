import React, { useState } from 'react';
import { ArrowLeft, User, Activity, FileText, Calendar, Clock, Download, Plus, Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface PatientProfileProps {
  patient: any;
  onBack: () => void;
}

export default function PatientProfile({ patient, onBack }: PatientProfileProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'documents' | 'vitals' | 'billing'>('timeline');

  // Mock timeline data
  const timelineEvents = [
    { id: 1, type: 'appointment', title: 'Cardiology Consultation', desc: 'Dr. Sarah Jenkins - General checkup', date: 'Today, 10:30 AM', icon: <Calendar className="w-4 h-4 text-indigo-500" /> },
    { id: 2, type: 'lab', title: 'Blood Test Results', desc: 'CBC & Lipid Profile - Normal', date: 'Yesterday, 14:00 PM', icon: <FileText className="w-4 h-4 text-blue-500" /> },
    { id: 3, type: 'admission', title: 'Admitted to Ward 3', desc: 'Observation for 24h', date: '12 May 2026, 09:00 AM', icon: <Activity className="w-4 h-4 text-emerald-500" /> },
    { id: 4, type: 'registration', title: 'Patient Registration', desc: 'Initial hospital registration', date: '12 May 2026, 08:30 AM', icon: <User className="w-4 h-4 text-slate-500" /> },
  ];

  // Mock documents
  const documents = [
    { id: 1, name: 'Blood_Test_Report_May_2026.pdf', type: 'PDF', size: '2.4 MB', date: '13 May 2026', category: 'Laboratory' },
    { id: 2, name: 'Cardiology_Consultation_Notes.docx', type: 'Word', size: '1.1 MB', date: '14 May 2026', category: 'Clinical Notes' },
    { id: 3, name: 'Patient_ID_Scan.jpg', type: 'Image', size: '840 KB', date: '12 May 2026', category: 'Registration' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.20))] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={onBack} className="h-8 px-2 border-slate-200">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            {patient.firstName} {patient.lastName}
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 font-medium">Active</span>
          </h2>
          <p className="text-sm text-slate-500">MRN: {patient.patientId} • DOB: {new Date(patient.dateOfBirth).toLocaleDateString()} • {patient.gender}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white border-slate-200 text-slate-700">Edit Profile</Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Admit Patient</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1 overflow-hidden">
        {/* Left Sidebar - Patient Info */}
        <div className="col-span-1 flex flex-col gap-4 overflow-y-auto pr-2 pb-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-md flex items-center justify-center mb-4">
              <User className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="font-bold text-slate-800">{patient.firstName} {patient.lastName}</h3>
            <p className="text-sm text-slate-500 mb-4">{patient.phone}</p>
            <div className="w-full flex gap-2">
              <div className="flex-1 bg-slate-50 rounded-lg p-2 border border-slate-100">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Blood</div>
                <div className="font-semibold text-rose-600">O+</div>
              </div>
              <div className="flex-1 bg-slate-50 rounded-lg p-2 border border-slate-100">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Height</div>
                <div className="font-semibold text-slate-700">175 cm</div>
              </div>
              <div className="flex-1 bg-slate-50 rounded-lg p-2 border border-slate-100">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Weight</div>
                <div className="font-semibold text-slate-700">72 kg</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-sm text-slate-800 mb-3 flex items-center justify-between">
              Medical Alerts <Button variant="ghost" className="h-6 px-2 text-xs text-indigo-600 hover:bg-indigo-50">Add</Button>
            </h4>
            <div className="space-y-2">
              <div className="bg-rose-50 border border-rose-100 rounded-lg p-2.5 flex items-start gap-2">
                <Activity className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-rose-700">Penicillin Allergy</div>
                  <div className="text-[10px] text-rose-600/70">Severe anaphylaxis reaction</div>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-2.5 flex items-start gap-2">
                <Activity className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-amber-700">Type 2 Diabetes</div>
                  <div className="text-[10px] text-amber-600/70">Diagnosed 2021</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="col-span-1 md:col-span-3 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full pb-6">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50/50">
            <button onClick={() => setActiveTab('timeline')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'timeline' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
              Medical Timeline
            </button>
            <button onClick={() => setActiveTab('documents')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'documents' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
              Documents & Reports
            </button>
            <button onClick={() => setActiveTab('vitals')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'vitals' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
              Vitals & Charts
            </button>
            <button onClick={() => setActiveTab('billing')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'billing' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
              Billing History
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'timeline' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-800">Interaction History</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs bg-white"><Filter className="w-3 h-3 mr-1" /> Filter</Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs bg-white"><Plus className="w-3 h-3 mr-1" /> Add Note</Button>
                  </div>
                </div>
                <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  {timelineEvents.map((event, index) => (
                    <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white bg-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                        {event.icon}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-sm text-slate-800">{event.title}</h4>
                          <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> {event.date}</span>
                        </div>
                        <p className="text-sm text-slate-600">{event.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-800">Patient Documents</h3>
                  <Button size="sm" className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 text-white"><Plus className="w-3 h-3 mr-1" /> Upload Document</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documents.map(doc => (
                    <div key={doc.id} className="flex items-center p-4 border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors group">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-4 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-800 truncate">{doc.name}</h4>
                        <div className="flex items-center text-xs text-slate-500 gap-2 mt-1">
                          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-medium">{doc.category}</span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.date}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 group-hover:text-indigo-600 shrink-0 ml-2">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'vitals' && (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                <Activity className="w-12 h-12 text-slate-200" />
                <p>Vitals tracking module coming soon.</p>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                <FileText className="w-12 h-12 text-slate-200" />
                <p>Billing history for this patient will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
