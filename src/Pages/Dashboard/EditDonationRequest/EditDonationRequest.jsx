import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const districts = [
  "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet",
  "Rangpur", "Mymensingh", "Comilla", "Gazipur", "Narayanganj",
  "Tangail", "Bogra", "Dinajpur", "Cox's Bazar", "Jessore"
];

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/donation-requests/${id}`);
        setRequest(response.data.data);
      } catch (error) {
        console.error('❌ Error fetching request:', error);
        toast.error('Failed to fetch request details');
        navigate('/dashboard/my-donation-requests');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchRequestDetails();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const updatedRequest = {
      recipientName: form.recipientName.value,
      recipientDistrict: form.recipientDistrict.value,
      recipientUpazila: form.recipientUpazila.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      requestMessage: form.requestMessage.value,
    };

    try {
      await axios.put(
        `http://localhost:5000/donation-requests/${id}`,
        updatedRequest
      );

      toast.success('Donation request updated successfully!');
      navigate('/dashboard/my-donation-requests');
    } catch (error) {
      console.error('❌ Error updating request:', error);
      toast.error('Failed to update request');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
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
      </div>
    );
  }

  if (request.status !== 'pending') {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Only pending requests can be edited</p>
        <button onClick={() => navigate(-1)} className="btn btn-primary mt-4">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Edit Donation Request
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Requester Information (Read-only) */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Your Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={request.requesterName}
                  className="input input-bordered"
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  defaultValue={request.requesterEmail}
                  className="input input-bordered"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Recipient Information */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Recipient Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Recipient Name *</span>
                </label>
                <input
                  type="text"
                  name="recipientName"
                  defaultValue={request.recipientName}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Blood Group *</span>
                </label>
                <select
                  name="bloodGroup"
                  defaultValue={request.bloodGroup}
                  className="select select-bordered"
                  required
                >
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">District *</span>
                </label>
                <select
                  name="recipientDistrict"
                  defaultValue={request.recipientDistrict}
                  className="select select-bordered"
                  required
                >
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Upazila *</span>
                </label>
                <input
                  type="text"
                  name="recipientUpazila"
                  defaultValue={request.recipientUpazila}
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
          </div>

          {/* Hospital & Location */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Hospital & Location
            </h2>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Hospital Name *</span>
                </label>
                <input
                  type="text"
                  name="hospitalName"
                  defaultValue={request.hospitalName}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Address *</span>
                </label>
                <input
                  type="text"
                  name="fullAddress"
                  defaultValue={request.fullAddress}
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Donation Schedule
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Donation Date *</span>
                </label>
                <input
                  type="date"
                  name="donationDate"
                  defaultValue={request.donationDate}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Donation Time *</span>
                </label>
                <input
                  type="time"
                  name="donationTime"
                  defaultValue={request.donationTime}
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
          </div>

          {/* Request Message */}
          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Request Message *</span>
              </label>
              <textarea
                name="requestMessage"
                defaultValue={request.requestMessage}
                className="textarea textarea-bordered h-32"
                required
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Updating...
                </>
              ) : (
                'Update Request'
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard/my-donation-requests')}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDonationRequest;