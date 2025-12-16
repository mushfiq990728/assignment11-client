import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import toast from 'react-hot-toast';

const Register = () => {
    const { registerWithEmailPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Fixed typo
        setError('');

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoUrl = form.photoUrl.value;
        const password = form.password.value;

        // Password validation
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            toast.error('Password must be at least 6 characters long');
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError('Password must contain at least one uppercase letter');
            toast.error('Password must contain at least one uppercase letter');
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError('Password must contain at least one lowercase letter');
            toast.error('Password must contain at least one lowercase letter');
            return;
        }

        // Register user
        registerWithEmailPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // Update profile
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photoUrl
                })
                .then(() => {
                    console.log('Profile updated:', user);
                    toast.success('Registration successful!');
                    navigate('/'); // Navigate to home page
                })
                .catch((err) => {
                    console.log('Profile update error:', err);
                    toast.error('Failed to update profile');
                });
            })
            .catch((err) => {
                console.log('Registration error:', err);
                setError(err.message);
                toast.error(err.message);
            });
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
                                    type="text" 
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