import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase/firebase.config';
import axios from 'axios';
import toast from 'react-hot-toast';
import { User, Mail, Droplet, MapPin, Edit, Save, X } from 'lucide-react';

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const districts = [
  "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet",
  "Rangpur", "Mymensingh", "Comilla", "Gazipur", "Narayanganj",
  "Tangail", "Bogra", "Dinajpur", "Cox's Bazar", "Jessore"
];

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${user?.email}`);
      setUserData(response.data.data);
    } catch (error) {
      console.error('❌ Error fetching user data:', error);
      toast.error('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const form = e.target;
    const updatedData = {
      name: form.name.value,
      bloodGroup: form.bloodGroup.value,
      district: form.district.value,
      upazila: form.upazila.value,
    };

    try {
      // Update Firebase profile name
      await updateProfile(auth.currentUser, {
        displayName: updatedData.name,
      });

      // Update MongoDB
      await axios.put(`http://localhost:5000/users/${user.email}`, updatedData);

      toast.success('Profile updated successfully!');
      setEditing(false);
      fetchUserData();
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setUpdating(false);
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
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-8 text-white">
          <div className="flex items-center gap-6">
            <div className="avatar">
              <div className="w-24 h-24 rounded-full ring ring-white ring-offset-4">
                <img
                  src={user?.photoURL || 'https://i.pravatar.cc/150'}
                  alt="Profile"
                />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{userData?.name || user?.displayName}</h1>
              <p className="text-blue-100">{user?.email}</p>
              <div className="flex gap-2 mt-2">
                <span className="badge badge-lg bg-white/20 border-white/30">
                  {userData?.role?.charAt(0).toUpperCase() + userData?.role?.slice(1)}
                </span>
                <span className={`badge badge-lg ${userData?.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                  {userData?.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
            {!editing ? (
              <button onClick={() => setEditing(true)} className="btn btn-primary">
                <Edit size={18} />
                Edit Profile
              </button>
            ) : (
              <button onClick={() => setEditing(false)} className="btn btn-outline">
                <X size={18} />
                Cancel
              </button>
            )}
          </div>

          {!editing ? (
            /* View Mode */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <User className="text-blue-500" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-semibold text-gray-800">{userData?.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Mail className="text-blue-500" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Email Address</p>
                    <p className="font-semibold text-gray-800">{userData?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Droplet className="text-red-500" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Blood Group</p>
                    <p className="font-semibold text-red-600">{userData?.bloodGroup}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="text-green-500" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">District</p>
                    <p className="font-semibold text-gray-800">{userData?.district}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="text-green-500" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Upazila</p>
                    <p className="font-semibold text-gray-800">{userData?.upazila}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={userData?.name}
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email Address</span>
                  </label>
                  <input
                    type="email"
                    defaultValue={userData?.email}
                    className="input input-bordered"
                    disabled
                  />
                  <label className="label">
                    <span className="label-text-alt text-gray-500">Email cannot be changed</span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Blood Group *</span>
                  </label>
                  <select
                    name="bloodGroup"
                    defaultValue={userData?.bloodGroup}
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
                    name="district"
                    defaultValue={userData?.district}
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

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text">Upazila *</span>
                  </label>
                  <input
                    type="text"
                    name="upazila"
                    defaultValue={userData?.upazila}
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={updating}
                >
                  {updating ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;