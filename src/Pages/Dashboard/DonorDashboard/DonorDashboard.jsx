import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import { Droplet, Plus, List, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonorDashboard = () => {
  const { user } = useContext(AuthContext);

  const donorStats = [
    {
      title: 'My Requests',
      value: '0',
      icon: <List className="text-4xl" />,
      bgColor: 'bg-blue-500',
      link: '/dashboard/my-donation-requests',
    },
    {
      title: 'Pending',
      value: '0',
      icon: <Droplet className="text-4xl" />,
      bgColor: 'bg-yellow-500',
    },
    {
      title: 'Completed',
      value: '0',
      icon: <Droplet className="text-4xl" />,
      bgColor: 'bg-green-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.displayName || 'Donor'}! 🩸
        </h1>
        <p className="text-red-100">
          Thank you for being a lifesaver! Manage your donation requests here.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/dashboard/create-donation-request"
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex items-center gap-4 cursor-pointer border-2 border-transparent hover:border-red-500"
        >
          <div className="bg-red-500 text-white p-4 rounded-lg">
            <Plus size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Create Request</h3>
            <p className="text-gray-600">Request blood donation</p>
          </div>
        </Link>

        <Link
          to="/dashboard/profile"
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex items-center gap-4 cursor-pointer border-2 border-transparent hover:border-blue-500"
        >
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            <User size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">My Profile</h3>
            <p className="text-gray-600">View and edit profile</p>
          </div>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {donorStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`${stat.bgColor} text-white p-4 rounded-lg shadow-lg`}
                >
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Requests Preview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Droplet className="text-red-500" />
          My Recent Donation Requests
        </h2>
        <div className="text-center py-8 text-gray-500">
          <Droplet size={48} className="mx-auto mb-4 opacity-50" />
          <p>No donation requests yet</p>
          <Link
            to="/dashboard/create-donation-request"
            className="btn btn-primary mt-4"
          >
            Create Your First Request
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;