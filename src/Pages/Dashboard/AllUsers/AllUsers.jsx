import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserCheck, UserX, Shield, User, Search, Filter } from 'lucide-react';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, statusFilter, roleFilter, users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
    } catch (error) {
      console.error('❌ Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((user) => user.status === statusFilter);
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleBlockUser = async (email, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    const action = newStatus === 'blocked' ? 'block' : 'unblock';

    if (!window.confirm(`Are you sure you want to ${action} this user?`)) {
      return;
    }

    try {
      await axios.patch(`http://localhost:5000/users/${email}/status`, {
        status: newStatus,
      });
      toast.success(`User ${action}ed successfully!`);
      fetchUsers();
    } catch (error) {
      console.error('❌ Error updating user status:', error);
      toast.error(`Failed to ${action} user`);
    }
  };

  const handleRoleChange = async (email, newRole) => {
    if (!window.confirm(`Change user role to ${newRole}?`)) {
      return;
    }

    try {
      await axios.patch(`http://localhost:5000/users/${email}/role`, {
        role: newRole,
      });
      toast.success(`User role updated to ${newRole}!`);
      fetchUsers();
    } catch (error) {
      console.error('❌ Error updating user role:', error);
      toast.error('Failed to update user role');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">All Users</h1>
        <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <Search size={16} />
                Search Users
              </span>
            </label>
            <input
              type="text"
              placeholder="Search by name or email..."
              className="input input-bordered"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <Filter size={16} />
                Status
              </span>
            </label>
            <select
              className="select select-bordered"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>

          {/* Role Filter */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <Filter size={16} />
                Role
              </span>
            </label>
            <select
              className="select select-bordered"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="donor">Donor</option>
              <option value="volunteer">Volunteer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="bg-gray-100">
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Blood Group</th>
                <th>District</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    {/* User Info */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-full">
                            <img
                              src={user.avatar || 'https://i.pravatar.cc/100'}
                              alt={user.name}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.name}</div>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="text-sm">{user.email}</td>

                    {/* Blood Group */}
                    <td>
                      <span className="badge badge-error badge-outline">
                        {user.bloodGroup}
                      </span>
                    </td>

                    {/* District */}
                    <td className="text-sm">{user.district}</td>

                    {/* Role */}
                    <td>
                      <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-sm btn-ghost">
                          <span
                            className={`badge ${
                              user.role === 'admin'
                                ? 'badge-primary'
                                : user.role === 'volunteer'
                                ? 'badge-info'
                                : 'badge-secondary'
                            }`}
                          >
                            {user.role}
                          </span>
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10"
                        >
                          <li>
                            <button onClick={() => handleRoleChange(user.email, 'donor')}>
                              <User size={16} />
                              Make Donor
                            </button>
                          </li>
                          <li>
                            <button onClick={() => handleRoleChange(user.email, 'volunteer')}>
                              <UserCheck size={16} />
                              Make Volunteer
                            </button>
                          </li>
                          <li>
                            <button onClick={() => handleRoleChange(user.email, 'admin')}>
                              <Shield size={16} />
                              Make Admin
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`badge ${
                          user.status === 'active' ? 'badge-success' : 'badge-error'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <button
                        onClick={() => handleBlockUser(user.email, user.status)}
                        className={`btn btn-sm ${
                          user.status === 'active' ? 'btn-error' : 'btn-success'
                        }`}
                      >
                        {user.status === 'active' ? (
                          <>
                            <UserX size={16} />
                            Block
                          </>
                        ) : (
                          <>
                            <UserCheck size={16} />
                            Unblock
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;