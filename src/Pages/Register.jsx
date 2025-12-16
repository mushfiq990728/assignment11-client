import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import toast from 'react-hot-toast';
import axios from 'axios';


const Register = () => {
    const { registerWithEmailPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

   const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  const file = form.photoUrl.files[0];

  if (!file) {
    toast.error("Please select an image");
    return;
  }

  // Password validation
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return;
  }
  if (!/[A-Z]/.test(password)) {
    toast.error("Password must contain an uppercase letter");
    return;
  }
  if (!/[a-z]/.test(password)) {
    toast.error("Password must contain a lowercase letter");
    return;
  }

  try {
    // 1️⃣ FormData for ImgBB
    const formData = new FormData();
    formData.append("image", file);

    // 2️⃣ Upload image to ImgBB
    const res = await axios.post(
      "https://api.imgbb.com/1/upload?key=f9875fc28e859e2ebb3ffc00e77a46c7",
      formData
    );
    

    const mainPhotoUrl = res.data.data.display_url;

    // 3️⃣ Register user
    await registerWithEmailPassword(email, password);

    // 4️⃣ Update Firebase profile with ImgBB image
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: mainPhotoUrl,
    });

    toast.success("Registration successful!");
    navigate("/");
  } catch (error) {
    console.error(error);
    toast.error("Registration failed");
  }
};


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                        Create your account to access all pet care services
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                        
                        {error && (
                            <div className="alert alert-error">
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input 
                                    name='name' 
                                    type="text" 
                                    className="input input-bordered" 
                                    placeholder="Enter your name" 
                                    required 
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input 
                                    name='email' 
                                    type="email" 
                                    className="input input-bordered" 
                                    placeholder="Email" 
                                    required 
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                  <input 
                                    name='photoUrl' 
                                    type="file" 
                                    className="input input-bordered" 
                                    placeholder="Enter your photo URL" 
                                    required 
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input 
                                    name='password' 
                                    type="password" 
                                    className="input input-bordered" 
                                    placeholder="Password" 
                                    required 
                                />
                            </div>

                            <div className="form-control mt-2">
                                <label className="label cursor-pointer justify-start gap-2">
                                    <input type="checkbox" className="checkbox checkbox-sm" required />
                                    <span className="label-text">I accept the terms and conditions</span>
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>

                        <div className="divider">OR</div>

                        <div className="text-center">
                            <p className="text-sm">
                                Already have an account? 
                                <Link className='text-blue-500 ml-1 font-semibold' to='/login'>
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;