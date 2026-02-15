import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import DonorDashboard from './DonorDashboard/DonorDashboard';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import VolunteerDashboard from './VolunteerDashboard/VolunteerDashboard';

const RoleBasedDashboard = () => {
  const { role, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Render dashboard based on role
  if (role === 'admin') {
    return <AdminDashboard />;
  } else if (role === 'volunteer') {
    return <VolunteerDashboard />;
  } else {
    // Default to donor dashboard
    return <DonorDashboard />;
  }
};

export default RoleBasedDashboard;