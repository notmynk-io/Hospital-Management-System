import React, { useState, useEffect } from 'react';
import { BedDouble, Users, Activity, Filter, Settings, Info } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Button } from '../../components/ui/button';

export default function WardManagement() {
  const [beds, setBeds] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBeds();
  }, []);

  const fetchBeds = async () => {
    try {
      const token = localStorage.getItem('hms_token');
      const res = await fetch('/api/beds', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setBeds(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Available': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Occupied': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Cleaning': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Maintenance': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'Reserved': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Group beds by ward
  const wards = beds.reduce((acc: any, bed: any) => {
    if (!acc[bed.wardName]) acc[bed.wardName] = [];
    acc[bed.wardName].push(bed);
    return acc;
  }, {});

  return (
    <DashboardLayout title="Ward Management">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Button variant="outline" className="hidden sm:flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter Wards
          </Button>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white px-4 py-2 rounded-lg border border-slate-200">
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Available</div>
          <div className="flex items-center gap-1.5 ml-3"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Occupied</div>
          <div className="flex items-center gap-1.5 ml-3"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Cleaning</div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-400">Loading beds...</div>
      ) : Object.keys(wards).length === 0 ? (
        <div className="text-center py-12 text-slate-400">No beds configured.</div>
      ) : (
        <div className="space-y-8">
          {Object.entries(wards).map(([wardName, wardBeds]: [string, any]) => {
            const occupied = wardBeds.filter((b: any) => b.status === 'Occupied').length;
            const total = wardBeds.length;
            const occupancyRate = Math.round((occupied / total) * 100);

            return (
              <div key={wardName} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-slate-800">{wardName}</h3>
                    <span className="text-xs text-slate-500 font-medium px-2 py-1 bg-white border border-slate-200 rounded-md">
                      {wardBeds[0].type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <BedDouble className="w-4 h-4 text-slate-400" />
                      <span className="font-bold text-slate-800">{occupied}/{total}</span> Occupied
                    </div>
                    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${occupancyRate > 90 ? 'bg-rose-500' : occupancyRate > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${occupancyRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {wardBeds.map((bed: any) => (
                      <div onClick={() => alert("Bed management coming soon.")} key={bed._id} className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all hover:shadow-md cursor-pointer ${getStatusColor(bed.status)}`}>
                        <div className="w-full flex justify-between items-start mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">{bed.bedId}</span>
                          <Settings className="w-3 h-3 opacity-50" />
                        </div>
                        
                        <div className="py-2">
                          <BedDouble className="w-8 h-8 opacity-75 mb-2 mx-auto" />
                          <div className="text-sm font-bold">{bed.status}</div>
                        </div>

                        {bed.currentPatient && (
                          <div className="mt-auto w-full pt-2 border-t border-black/10 flex flex-col items-center">
                            <span className="text-xs font-semibold truncate w-full">{bed.currentPatient.firstName} {bed.currentPatient.lastName}</span>
                            <span className="text-[10px] opacity-75">{bed.currentPatient.patientId}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}
