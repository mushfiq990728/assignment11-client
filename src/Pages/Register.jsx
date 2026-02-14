import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";
import { toast } from "react-hot-toast";

const Register = () => {
  const { registerWithEmailPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const file = form.photoUrl.files[0];
    const role = form.role.value; // ✅ FIXED: Use 'form' instead of 'e.target'

    console.log("📝 Form data:", { name, email, role, file });

    // Validation
    if (!file) {
      toast.error("Please select a profile image");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      setLoading(false);
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Upload image to ImgBB
      console.log("🔵 Uploading image...");
      const formData = new FormData();
      formData.append("image", file);

      const imgRes = await axios.post(
        "https://api.imgbb.com/1/upload?key=f9875fc28e859e2ebb3ffc00e77a46c7",
        formData
      );
      console.log("✅ Image uploaded:", imgRes.data.data.display_url);

      const photoURL = imgRes.data.data.display_url;

      // 2️⃣ Register with Firebase
      console.log("🔵 Registering with Firebase...");
      const userCredential = await registerWithEmailPassword(email, password);
      console.log("✅ Firebase registration:", userCredential.user.email);

      // 3️⃣ Update Firebase profile
      console.log("🔵 Updating Firebase profile...");
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL,
      });
      console.log("✅ Profile updated");

      // 4️⃣ Save user to MongoDB
      const userInfo = {
        name,
        email,
        password,
        photoURL,
        role, // ✅ FIXED: Only one role property
        createdAt: new Date(),
      };

      console.log("📤 Sending to backend:", userInfo);

      const response = await axios.post("http://localhost:5000/users", userInfo);
      console.log("✅ Backend response:", response.data);

      toast.success("Registration successful!");
      form.reset();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("❌ Registration error:", err);

      // Better error messages
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Invalid email address");
      } else if (err.code === "auth/weak-password") {
        toast.error("Password is too weak");
      } else if (err.response) {
        // Backend error
        console.error("Backend error:", err.response.data);
        toast.error(err.response.data.message || "Failed to save user data");
      } else if (err.message?.includes("imgbb")) {
        toast.error("Failed to upload image");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Join our pet adoption platform and help pets find their forever
            homes.
          </p>
        </div>

        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-4">
              Create Account
            </h2>

            <form onSubmit={handleSubmit}>
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
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  name="role"
                  className="select select-bordered w-full"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Choose Role
                  </option>
                  <option value="Manager">Manager</option>
                  <option value="Buyer">Buyer</option>
                </select>
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
                  disabled={loading}
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