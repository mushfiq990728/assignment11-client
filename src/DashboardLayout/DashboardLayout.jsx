import React from 'react';
import { Outlet } from 'react-router-dom'; // ✅ FIXED: Import from react-router-dom
import Aside from '../components/Aside/Aside';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Aside />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;