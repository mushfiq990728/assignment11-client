import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import { Users, DollarSign, Droplet, TrendingUp } from 'lucide-react';

const MainDashboard = () => {
  const { user } = useContext(AuthContext);

  // Mock data - Replace with actual API calls
  const stats = [
    {
      title: 'Total Users',
      value: '1,284',
      icon: <Users className="text-4xl" />,
      bgColor: 'bg-blue-500',
      change: '+12.5%',
    },
    {
      title: 'Total Funding',
      value: '$45,230',
      icon: <DollarSign className="text-4xl" />,
      bgColor: 'bg-green-500',
      change: '+8.2%',
    },
    {
      title: 'Blood Donation Requests',
      value: '328',
      icon: <Droplet className="text-4xl" />,
      bgColor: 'bg-red-500',
      change: '+15.3%',
    },
    {
      title: 'Active Donors',
      value: '856',
      icon: <TrendingUp className="text-4xl" />,
      bgColor: 'bg-purple-500',
      change: '+5.7%',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.displayName || 'Admin'}! 👋
        </h1>
        <p className="text-red-100">
          Here's what's happening with your blood donation platform today.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
                <div className="badge badge-success">{stat.change}</div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Droplet className="text-red-500" />
            Recent Donation Requests
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="bg-red-500 text-white rounded-full w-10">
                      <span>AB+</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-gray-500">Dhaka Medical</p>
                  </div>
                </div>
                <span className="badge badge-warning">Pending</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="text-blue-500" />
            Recent Registrations
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src="https://i.pravatar.cc/40" alt="User" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">Jane Smith</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <span className="badge badge-success">Donor</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;