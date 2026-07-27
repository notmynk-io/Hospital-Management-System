import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Package } from 'lucide-react';

export default function InventoryList() {
  return (
    <DashboardLayout title="Inventory Management">
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <Package className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-700 mb-2">Inventory Stock & Equipment</h2>
        <p className="text-slate-500 max-w-md">
          Track medical equipment, consumables, beds, oxygen cylinders, and manage purchase orders.
        </p>
      </div>
    </DashboardLayout>
  );
}
