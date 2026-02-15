import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { loginWithEmailPassword, loginWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await loginWithEmailPassword(email, password);
      console.log("Logged in:", result.user);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      
      // Handle specific error messages
      if (err.message.includes("blocked")) {
        setError("Your account has been blocked. Please contact admin.");
        toast.error("Your account has been blocked");
      } else if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password");
        toast.error("Invalid email or password");
      } else if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password");
        toast.error("Invalid email or password");
      } else {
        setError(err.message);
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    
    try {
      const result = await loginWithGoogle();
      console.log("Google login:", result.user);
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Google Login error:", err);
      
      if (err.message.includes("blocked")) {
        setError("Your account has been blocked. Please contact admin.");
        toast.error("Your account has been blocked");
      } else {
        setError(err.message);
        toast.error("Google login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Access your blood donation dashboard and manage requests.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-2">Login</h2>

            {error && (
              <div className="alert alert-error mb-2">
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered"
                  placeholder="Enter your email"
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
                  className="input input-bordered"
                  placeholder="Enter your password"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>

            <div className="divider">OR</div>

            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full"
              disabled={loading}
            >
              Continue with Google
            </button>

            <p className="text-sm text-center mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-semibold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;