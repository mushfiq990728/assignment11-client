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
  const from = location.state || "/"; // go back to where user came from

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginWithEmailPassword(email, password)
      .then((result) => {
        console.log("Logged in:", result.user);
        toast.success("Login successful");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error("Login error:", err);
        setError(err.message);
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    loginWithGoogle()
      .then((result) => {
        console.log("Google login:", result.user);
        toast.success("Logged in with Google");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error("Google Login error:", err);
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Access your pet listings, orders and adoption requests.
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
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  required
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                  required
                />
                <div className="mt-2">
                  <a className="link link-hover text-sm">Forgot password?</a>
                </div>
                <div className="mt-2 text-sm">
                  <span>Don't have an account? </span>
                  <Link className="text-blue-500" to="/signup">
                    Register
                  </Link>
                </div>
                <button
                  type="submit"
                  className="btn btn-neutral mt-4"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </fieldset>
            </form>

            <div className="divider">OR</div>

            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full"
              disabled={loading}
            >
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
