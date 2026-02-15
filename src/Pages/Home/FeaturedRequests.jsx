import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Droplet, MapPin, Calendar, ArrowRight } from 'lucide-react';

const FeaturedRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedRequests();
  }, []);

  const fetchFeaturedRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/donation-requests');
      // Get only pending requests, latest 6
      const pendingRequests = response.data.data
        .filter((req) => req.status === 'pending')
        .slice(0, 6);
      setRequests(pendingRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Urgent Blood Donation Requests
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These people need your help urgently. Your donation can save a life today.
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-12">
            <Droplet size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No pending donation requests at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests.map((request) => (
                <div
                  key={request._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-red-100 p-3 rounded-full">
                        <Droplet className="text-red-500" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">
                          {request.recipientName}
                        </h3>
                        <span className="text-sm text-red-600 font-semibold">
                          Blood Group: {request.bloodGroup}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <MapPin size={16} />
                        <span>{request.recipientDistrict}, {request.recipientUpazila}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Calendar size={16} />
                        <span>{request.donationDate} at {request.donationTime}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {request.requestMessage}
                      </p>
                    </div>

                    <Link
                      to="/login"
                      className="btn btn-primary btn-sm w-full"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to="/login" className="btn btn-outline btn-lg">
                View All Requests
                <ArrowRight size={20} />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedRequests;