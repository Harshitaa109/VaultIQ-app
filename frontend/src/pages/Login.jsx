import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import getCurrentUser from "../utils/getCurrentUser";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        data
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="box w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Login
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded outline-indigo-500 bg-transparent text-white placeholder-gray-400"
            value={data.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded outline-indigo-500 bg-transparent text-white placeholder-gray-400"
            value={data.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className={`w-full py-2 rounded text-white ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-300">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-400 font-medium">
            Sign up
          </Link>
        </p>
      </div>

      {/* Custom CSS directly here */}
      <style>{`
        .box {
          position: relative;
          background: #2d2d39;
          border-radius: 20px;
          overflow: hidden;
          z-index: 1;
        }

        .box::before {
          content: "";
          position: absolute;
          top: -40%;
          left: -40%;
          width: 180%;
          height: 180%;
          background: conic-gradient(
            from 0deg,
            #ff00c8,
            #0066ff,
            #00ffea,
            #ffea00,
            #ff00c8
          );
          border-radius: 50%;
          animation: rotating 4s linear infinite;
          filter: blur(50px);
          z-index: -2;
        }

        .box::after {
          content: "";
          position: absolute;
          inset: 4px;
          background: #2d2d39;
          border-radius: 16px;
          z-index: -1;
        }

        @keyframes rotating {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .box input {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          border: 1px solid #444;
        }

        .box input:focus {
          border-color: #6b46c1;
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default Login;
