import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import {
  LayoutDashboard,
  Users,
  Droplet,
  DollarSign,
  BarChart2,
  Settings,
  LogOut,
  Home
} from 'lucide-react';
import toast from 'react-hot-toast';

const Aside = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success('Logged out successfully!');
        navigate('/login');
      })
      .catch((err) => {
        console.error('Logout error:', err);
        toast.error('Failed to logout');
      });
  };

  return (
    <div className="w-72 bg-gradient-to-b from-red-600 to-red-800 text-white min-h-screen flex flex-col shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-red-700">
        <h2 className="text-2xl font-bold">🩸 Blood Donation</h2>
        <p className="text-xs text-red-200">Admin Dashboard</p>
      </div>

      {/* Profile */}
      <div className="p-6 border-b border-red-700">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full ring ring-red-400 ring-offset-2 ring-offset-red-800">
              <img
                src={user?.photoURL || 'https://i.pravatar.cc/100'}
                alt="Profile"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold truncate">
              {user?.displayName || 'Admin User'}
            </h4>
            <p className="text-xs text-red-200 truncate">{user?.email}</p>
            <span className="badge badge-sm bg-yellow-400 text-yellow-900 border-0 mt-1">
              Admin
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-red-600 shadow-lg'
                    : 'hover:bg-red-700 hover:pl-6'
                }`
              }
            >
              <LayoutDashboard size={18} />
              <span className="font-medium">Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/all-users"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-red-600 shadow-lg'
                    : 'hover:bg-red-700 hover:pl-6'
                }`
              }
            >
              <Users size={18} />
              <span className="font-medium">All Users</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/all-donation-requests"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-red-600 shadow-lg'
                    : 'hover:bg-red-700 hover:pl-6'
                }`
              }
            >
              <Droplet size={18} />
              <span className="font-medium">Donation Requests</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/content-management"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-red-600 shadow-lg'
                    : 'hover:bg-red-700 hover:pl-6'
                }`
              }
            >
              <Settings size={18} />
              <span className="font-medium">Content Management</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/statistics"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-red-600 shadow-lg'
                    : 'hover:bg-red-700 hover:pl-6'
                }`
              }
            >
              <BarChart2 size={18} />
              <span className="font-medium">Statistics</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/funding"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-red-600 shadow-lg'
                    : 'hover:bg-red-700 hover:pl-6'
                }`
              }
            >
              <DollarSign size={18} />
              <span className="font-medium">Funding</span>
            </NavLink>
          </li>
        </ul>

        <div className="divider divider-neutral my-4"></div>

        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-700 hover:pl-6 transition-all duration-200"
            >
              <Home size={18} />
              <span className="font-medium">Back to Home</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-red-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-900 hover:bg-red-950 rounded-lg transition-colors duration-200 font-medium"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Aside;