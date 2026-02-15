import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Calendar, Clock, MapPin, Droplet, User, Mail, Building, ArrowLeft } from 'lucide-react';

const ViewDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/donation-requests/${id}`);
        setRequest(response.data.data);
      } catch (error) {
        console.error('❌ Error fetching request details:', error);
        toast.error('Failed to fetch request details');
        navigate('/dashboard/my-donation-requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [id, navigate]);

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

  if (!request) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Request not found</p>
        <Link to="/dashboard/my-donation-requests" className="btn btn-primary mt-4">
          Back to My Requests
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="btn btn-ghost mb-4">
        <ArrowLeft size={20} />
        Back
      </button>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-700 p-6 text-white">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-full">
                <Droplet size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{request.recipientName}</h1>
                <p className="text-red-100 text-lg">Blood Group: {request.bloodGroup}</p>
              </div>
            </div>
            <span className={`badge ${getStatusBadge(request.status)} badge-lg`}>
              {getStatusText(request.status)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Requester Information */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Requester Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <User className="text-blue-500" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold">{request.requesterName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-blue-500" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold">{request.requesterEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recipient Information */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recipient Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <User className="text-red-500" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold">{request.recipientName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Droplet className="text-red-500" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Blood Group</p>
                  <p className="font-semibold text-red-600">{request.bloodGroup}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-red-500" size={20} />
                <div>
                  <p className="text-sm text-gray-600">District</p>
                  <p className="font-semibold">{request.recipientDistrict}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-red-500" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Upazila</p>
                  <p className="font-semibold">{request.recipientUpazila}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hospital & Location */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Hospital & Location</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Building className="text-green-500 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Hospital Name</p>
                  <p className="font-semibold">{request.hospitalName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-green-500 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Full Address</p>
                  <p className="font-semibold">{request.fullAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Donation Schedule</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="text-purple-500" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold">{request.donationDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-purple-500" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-semibold">{request.donationTime}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Request Message */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Request Message</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap">{request.requestMessage}</p>
            </div>
          </div>

          {/* Donor Information (if in progress) */}
          {request.status === 'inprogress' && request.donorName && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Donor Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="text-blue-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Donor Name</p>
                    <p className="font-semibold">{request.donorName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-blue-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Donor Email</p>
                    <p className="font-semibold">{request.donorEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {request.status === 'pending' && (
              <Link
                to={`/dashboard/edit-donation-request/${request._id}`}
                className="btn btn-primary"
              >
                Edit Request
              </Link>
            )}
            <Link
              to="/dashboard/my-donation-requests"
              className="btn btn-outline"
            >
              Back to My Requests
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDonationRequest;