import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Edit, Trash2, Eye, Calendar, Clock, MapPin, Droplet } from 'lucide-react';

const MyDonationRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchMyRequests();
  }, [user]);

  const fetchMyRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/donation-requests/user/${user?.email}`
      );
      setRequests(response.data.data);
      console.log('✅ Fetched donation requests:', response.data.data);
    } catch (error) {
      console.error('❌ Error fetching requests:', error);
      toast.error('Failed to fetch donation requests');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this request?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/donation-requests/${id}`);
      toast.success('Request deleted successfully!');
      fetchMyRequests(); // Refresh the list
    } catch (error) {
      console.error('❌ Error deleting request:', error);
      toast.error('Failed to delete request');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/donation-requests/${id}/status`, {
        status: newStatus,
      });
      toast.success(`Request status updated to ${newStatus}!`);
      fetchMyRequests(); // Refresh the list
    } catch (error) {
      console.error('❌ Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge-warning',
      inprogress: 'badge-info',
      done: 'badge-success',
      canceled: 'badge-error',
    };
    return badges[status] || 'badge-ghost';
  };

  const getStatusText = (status) => {
    const text = {
      pending: 'Pending',
      inprogress: 'In Progress',
      done: 'Done',
      canceled: 'Canceled',
    };
    return text[status] || status;
  };

  const filteredRequests = requests.filter((req) => {
    if (filter === 'all') return true;
    return req.status === filter;
  });

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            My Donation Requests
          </h1>
          <p className="text-gray-600 mt-1">
            Manage all your blood donation requests
          </p>
        </div>
        <Link to="/dashboard/create-donation-request" className="btn btn-primary">
          + Create New Request
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
          >
            All ({requests.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`btn btn-sm ${filter === 'pending' ? 'btn-warning' : 'btn-ghost'}`}
          >
            Pending ({requests.filter((r) => r.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('inprogress')}
            className={`btn btn-sm ${filter === 'inprogress' ? 'btn-info' : 'btn-ghost'}`}
          >
            In Progress ({requests.filter((r) => r.status === 'inprogress').length})
          </button>
          <button
            onClick={() => setFilter('done')}
            className={`btn btn-sm ${filter === 'done' ? 'btn-success' : 'btn-ghost'}`}
          >
            Done ({requests.filter((r) => r.status === 'done').length})
          </button>
          <button
            onClick={() => setFilter('canceled')}
            className={`btn btn-sm ${filter === 'canceled' ? 'btn-error' : 'btn-ghost'}`}
          >
            Canceled ({requests.filter((r) => r.status === 'canceled').length})
          </button>
        </div>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Droplet size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No donation requests found
          </h3>
          <p className="text-gray-500 mb-6">
            {filter === 'all'
              ? "You haven't created any donation requests yet."
              : `No ${filter} requests found.`}
          </p>
          <Link to="/dashboard/create-donation-request" className="btn btn-primary">
            Create Your First Request
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredRequests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-3 rounded-full">
                      <Droplet className="text-red-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {request.recipientName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Blood Group: <span className="font-semibold text-red-600">{request.bloodGroup}</span>
                      </p>
                    </div>
                  </div>
                  <span className={`badge ${getStatusBadge(request.status)}`}>
                    {getStatusText(request.status)}
                  </span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} />
                    <span className="text-sm">
                      {request.recipientDistrict}, {request.recipientUpazila}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    <span className="text-sm">{request.donationDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <span className="text-sm">{request.donationTime}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Hospital:</span> {request.hospitalName}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Address:</span> {request.fullAddress}
                  </p>
                </div>

                {/* Message Preview */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {request.requestMessage}
                  </p>
                </div>

                {/* Donor Info (if in progress) */}
                {request.status === 'inprogress' && request.donorName && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-blue-800">
                      <span className="font-semibold">Donor:</span> {request.donorName} ({request.donorEmail})
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/dashboard/donation-request/${request._id}`}
                    className="btn btn-sm btn-outline"
                  >
                    <Eye size={16} />
                    View Details
                  </Link>

                  {/* Only show edit/delete for pending requests */}
                  {request.status === 'pending' && (
                    <>
                      <Link
                        to={`/dashboard/edit-donation-request/${request._id}`}
                        className="btn btn-sm btn-info"
                      >
                        <Edit size={16} />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(request._id)}
                        className="btn btn-sm btn-error"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </>
                  )}

                  {/* Status change buttons for inprogress */}
                  {request.status === 'inprogress' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(request._id, 'done')}
                        className="btn btn-sm btn-success"
                      >
                        Mark as Done
                      </button>
                      <button
                        onClick={() => handleStatusChange(request._id, 'canceled')}
                        className="btn btn-sm btn-error"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;