import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import { Droplet, CheckCircle, Clock } from 'lucide-react';

const VolunteerDashboard = () => {
  const { user } = useContext(AuthContext);

  const volunteerStats = [
    {
      title: 'Pending Requests',
      value: '0',
      icon: <Clock className="text-4xl" />,
      bgColor: 'bg-yellow-500',
    },
    {
      title: 'In Progress',
      value: '0',
      icon: <Droplet className="text-4xl" />,
      bgColor: 'bg-blue-500',
    },
    {
      title: 'Completed',
      value: '0',
      icon: <CheckCircle className="text-4xl" />,
      bgColor: 'bg-green-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.displayName || 'Volunteer'}! 🙋‍♂️
        </h1>
        <p className="text-purple-100">
          Thank you for your service! Help manage donation requests.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {volunteerStats.map((stat, index) => (
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

      {/* All Donation Requests */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Droplet className="text-red-500" />
          All Donation Requests
        </h2>
        <div className="text-center py-8 text-gray-500">
          <Droplet size={48} className="mx-auto mb-4 opacity-50" />
          <p>No donation requests to manage yet</p>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;