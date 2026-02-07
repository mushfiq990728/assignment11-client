import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const { registerWithEmailPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // ✅ ADDED: Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ ADDED: Start loading

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const file = form.photoUrl.files[0];

    // Validation
    if (!file) {
      toast.error("Please select a profile image");
      setLoading(false); // ✅ ADDED: Stop loading
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false); // ✅ ADDED: Stop loading
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      setLoading(false); // ✅ ADDED: Stop loading
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      setLoading(false); // ✅ ADDED: Stop loading
      return;
    }

    try {
      // 1️⃣ Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", file);

      const imgRes = await axios.post(
        "https://api.imgbb.com/1/upload?key=f9875fc28e859e2ebb3ffc00e77a46c7",
        formData
      );

      const photoURL = imgRes.data.data.display_url;

      // 2️⃣ Register with Firebase
      await registerWithEmailPassword(email, password);

      // 3️⃣ Update Firebase profile
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL,
      });

      // 4️⃣ Save user to MongoDB
      const userInfo = {
        name,
        email,
        photoURL,
        role: "user",
        createdAt: new Date(),
      };

      await axios.post("http://localhost:5000/users", userInfo);

      toast.success("Registration successful!");
      form.reset();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Registration error:", err);
      
      // ✅ IMPROVED: Better error messages
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Invalid email address");
      } else if (err.code === "auth/weak-password") {
        toast.error("Password is too weak");
      } else if (err.response) {
        // Backend error
        toast.error("Failed to save user data");
      } else if (err.message?.includes("imgbb")) {
        toast.error("Failed to upload image");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false); // ✅ ADDED: Always stop loading
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* ✅ ADDED: Hero text section for consistency with Login */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Join our pet adoption platform and help pets find their forever homes.
          </p>
        </div>
        
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-4">
              Create Account
            </h2>

            <form onSubmit={handleSubmit}>
              {/* ✅ IMPROVED: Added proper form controls with labels */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Photo</span>
                </label>
                <input
                  type="file"
                  name="photoUrl"
                  accept="image/*" // ✅ ADDED: Only allow images
                  className="file-input file-input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered"
                  required
                />
                {/* ✅ ADDED: Password requirements hint */}
                <label className="label">
                  <span className="label-text-alt text-gray-500">
                    Must be 6+ characters with uppercase and lowercase
                  </span>
                </label>
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading} // ✅ ADDED: Disable when loading
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Creating Account...
                    </>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </form>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
