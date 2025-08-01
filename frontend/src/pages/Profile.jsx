import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import getCurrentUser from "../utils/getCurrentUser";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getCurrentUser();
      if (!userData) return navigate("/");
      setUser(userData);
      setFormData({ name: userData.name, email: userData.email });
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/update`,
        { name: formData.name, email: formData.email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Profile updated successfully!");
      setUser(res.data.user);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Error updating profile");
    }
  };

  if (!user) return <div className="p-6 text-white">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-[#121212] text-white pt-16 relative overflow-hidden">
      {/* Animated Background */}
      <div className="animated-bg"></div>

      <Header />
      <div className="max-w-3xl mx-auto mt-10 neon-panel relative">
        <div className="edge-line"></div>
        <div className="edge-line-vertical"></div>

        <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-6 space-y-4 sm:space-y-0">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-lg"
          />
          <div className="flex-1">
            {editMode ? (
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="cool-input"
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="cool-input"
                  placeholder="Email"
                />
                <div className="space-x-3">
                  <button
                    onClick={handleUpdate}
                    className="neon-button neon-green"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="neon-button neon-blue"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-3xl font-bold neon-text">{user.name}</h2>
                <p className="text-gray-300">{user.email}</p>
                <p className="text-sm text-gray-400 mt-1">User ID: {user._id}</p>
                <button
                  onClick={() => setEditMode(true)}
                  className="mt-5 neon-button neon-purple"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        /* Animated Background */
        .animated-bg {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: moveGrid 20s linear infinite;
          z-index: 0;
        }
        @keyframes moveGrid {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 100px 100px, 100px 100px; }
        }

        .neon-panel {
          background: #1b1b1b;
          padding: 32px;
          border-radius: 18px;
          animation: glowPulse 3s ease-in-out infinite;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        @keyframes glowPulse {
          0% { box-shadow: 0 0 10px rgba(255,255,255,0.08); }
          50% { box-shadow: 0 0 20px rgba(255,255,255,0.15); }
          100% { box-shadow: 0 0 10px rgba(255,255,255,0.08); }
        }

        /* Tron-style scanning edges */
        @keyframes edgeScan {
          0%   { transform: translateX(-100%); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes edgeScanVertical {
          0%   { transform: translateY(-100%); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .edge-line {
          position: absolute;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
          height: 2px;
          width: 100%;
          top: 0;
          left: 0;
          animation: edgeScan 3s linear infinite;
          z-index: 2;
          opacity: 0.5;
        }
        .edge-line-vertical {
          position: absolute;
          background: linear-gradient(180deg, transparent, #8b5cf6, transparent);
          width: 2px;
          height: 100%;
          top: 0;
          left: 0;
          animation: edgeScanVertical 3s linear infinite;
          animation-delay: 1.5s;
          z-index: 2;
          opacity: 0.5;
        }

        .cool-input {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          background: rgba(0,0,0,0.5);
          border: 1px solid #333;
          color: #fff;
          transition: box-shadow 0.3s, border-color 0.3s;
        }
        .cool-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 10px #3b82f6;
        }

        .neon-button {
          padding: 10px 24px;
          border-radius: 10px;
          font-weight: bold;
          color: #fff;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .neon-button:hover {
          transform: scale(1.05);
        }

        .neon-green { background-color: #22c55e; }
        .neon-blue { background-color: #3b82f6; }
        .neon-purple { background-color: #8b5cf6; }

        .neon-text {
          text-shadow: 0 0 6px #fff, 0 0 12px #3b82f6, 0 0 24px #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default Profile;
