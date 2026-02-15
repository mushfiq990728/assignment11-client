import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import { Users, DollarSign, Droplet, TrendingUp } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunding: 0,
    totalRequests: 0,
    activeDonors: 0,
  });

  useEffect(() => {
    // Fetch statistics from backend
    const fetchStats = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:5000/users');
        const users = usersResponse.data.data;
        
        setStats({
          totalUsers: users.length,
          totalFunding: 0, // Will implement later
          totalRequests: 0, // Will implement later
          activeDonors: users.filter(u => u.role === 'donor' && u.status === 'active').length,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  const adminStats = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <Users className="text-4xl" />,
      bgColor: 'bg-blue-500',
      change: '+12.5%',
    },
    {
      title: 'Total Funding',
      value: `$${stats.totalFunding}`,
      icon: <DollarSign className="text-4xl" />,
      bgColor: 'bg-green-500',
      change: '+8.2%',
    },
    {
      title: 'Blood Requests',
      value: stats.totalRequests,
      icon: <Droplet className="text-4xl" />,
      bgColor: 'bg-red-500',
      change: '+15.3%',
    },
    {
      title: 'Active Donors',
      value: stats.activeDonors,
      icon: <TrendingUp className="text-4xl" />,
      bgColor: 'bg-purple-500',
      change: '+5.7%',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, Admin {user?.displayName}! 👨‍💼
        </h1>
        <p className="text-blue-100">
          Here's what's happening with your blood donation platform today.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer">
          <Users className="text-blue-500 mb-3" size={32} />
          <h3 className="font-bold text-lg mb-2">Manage Users</h3>
          <p className="text-gray-600 text-sm">View and manage all users</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer">
          <Droplet className="text-red-500 mb-3" size={32} />
          <h3 className="font-bold text-lg mb-2">Donation Requests</h3>
          <p className="text-gray-600 text-sm">Manage all donation requests</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer">
          <DollarSign className="text-green-500 mb-3" size={32} />
          <h3 className="font-bold text-lg mb-2">View Funding</h3>
          <p className="text-gray-600 text-sm">Track donations and funding</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;