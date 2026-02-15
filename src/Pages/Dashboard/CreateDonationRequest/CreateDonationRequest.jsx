import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const districts = [
  "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet",
  "Rangpur", "Mymensingh", "Comilla", "Gazipur", "Narayanganj",
  "Tangail", "Bogra", "Dinajpur", "Cox's Bazar", "Jessore"
];

const CreateDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const donationRequest = {
      requesterName: form.requesterName.value,
      requesterEmail: form.requesterEmail.value,
      recipientName: form.recipientName.value,
      recipientDistrict: form.recipientDistrict.value,
      recipientUpazila: form.recipientUpazila.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      requestMessage: form.requestMessage.value,
      status: 'pending',
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/donation-requests',
        donationRequest
      );

      console.log('✅ Donation request created:', response.data);
      toast.success('Donation request created successfully!');
      form.reset();
      navigate('/dashboard/my-donation-requests');
    } catch (error) {
      console.error('❌ Error creating donation request:', error);
      toast.error('Failed to create donation request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create Donation Request
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Requester Information */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Your Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name *</span>
                </label>
                <input
                  type="text"
                  name="requesterName"
                  defaultValue={user?.displayName || ''}
                  className="input input-bordered"
                  required
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email *</span>
                </label>
                <input
                  type="email"
                  name="requesterEmail"
                  defaultValue={user?.email || ''}
                  className="input input-bordered"
                  required
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
                  placeholder="Enter recipient name"
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
                  className="select select-bordered"
                  required
                >
                  <option value="">Select blood group</option>
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
                  className="select select-bordered"
                  required
                >
                  <option value="">Select district</option>
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
                  placeholder="Enter upazila"
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
                  placeholder="e.g., Dhaka Medical College Hospital"
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
                  placeholder="e.g., Zahir Raihan Rd, Dhaka 1000"
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
                placeholder="Please describe why you need blood donation..."
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
                  Creating Request...
                </>
              ) : (
                'Create Request'
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
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

export default CreateDonationRequest;