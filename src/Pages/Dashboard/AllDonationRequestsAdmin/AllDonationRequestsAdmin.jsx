import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Calendar, Clock, MapPin, Droplet, Eye, Trash2, Filter, Search } from 'lucide-react';

const AllDonationRequestsAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchAllRequests();
  }, []);

  useEffect(() => {
    filterRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, statusFilter, requests]);

  const fetchAllRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/donation-requests');
      setRequests(response.data.data);
      setFilteredRequests(response.data.data);
    } catch (error) {
      console.error('❌ Error fetching requests:', error);
      toast.error('Failed to fetch donation requests');
    } finally {
      setLoading(false);
    }
  };

  const filterRequests = () => {
    let filtered = [...requests];

    if (searchTerm) {
      filtered = filtered.filter(
        (req) =>
          req.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.requesterEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((req) => req.status === statusFilter);
    }

    setFilteredRequests(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this request?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/donation-requests/${id}`);
      toast.success('Request deleted successfully!');
      fetchAllRequests();
    } catch (error) {
      console.error('❌ Error deleting request:', error);
      toast.error('Failed to delete request');
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">All Donation Requests</h1>
        <p className="text-gray-600 mt-1">View and manage all blood donation requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-sm text-gray-600">Total Requests</div>
          <div className="text-2xl font-bold">{requests.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-sm text-gray-600">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">
            {requests.filter((r) => r.status === 'pending').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-sm text-gray-600">In Progress</div>
          <div className="text-2xl font-bold text-blue-600">
            {requests.filter((r) => r.status === 'inprogress').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-sm text-gray-600">Completed</div>
          <div className="text-2xl font-bold text-green-600">
            {requests.filter((r) => r.status === 'done').length}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <Search size={16} />
                Search Requests
              </span>
            </label>
            <input
              type="text"
              placeholder="Search by recipient or requester..."
              className="input input-bordered"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

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
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredRequests.length} of {requests.length} requests
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Droplet size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No donation requests found
          </h3>
          <p className="text-gray-500">
            {statusFilter === 'all'
              ? 'No requests have been created yet.'
              : `No ${statusFilter} requests found.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredRequests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
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

                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Requested by:</span> {request.requesterName} ({request.requesterEmail})
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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

                {request.status === 'inprogress' && request.donorName && (
                  <div className="bg-green-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-green-800">
                      <span className="font-semibold">Donor:</span> {request.donorName} ({request.donorEmail})
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Link
                    to={`/dashboard/donation-request/${request._id}`}
                    className="btn btn-sm btn-outline"
                  >
                    <Eye size={16} />
                    View Details
                  </Link>

                  <button
                    onClick={() => handleDelete(request._id)}
                    className="btn btn-sm btn-error"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDonationRequestsAdmin;