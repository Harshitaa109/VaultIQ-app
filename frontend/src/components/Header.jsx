import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="neon-header fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4">
      {/* Logo / App name */}
      <h1
        className="text-2xl font-bold cursor-pointer neon-text"
        onClick={() => {
          navigate("/dashboard");
          setMenuOpen(false);
        }}
      >
        VaultIQ
      </h1>

      {/* Desktop navigation buttons */}
      <div className="hidden sm:flex gap-4 text-sm sm:text-base">
        <button
          onClick={() => navigate("/dashboard")}
          className="neon-button neon-bright-blue"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="neon-button neon-bright-green"
        >
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="neon-button neon-bright-pink"
        >
          Logout
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="sm:hidden focus:outline-none neon-icon"
        aria-label="Toggle menu"
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="absolute top-full right-4 mt-3 w-44 neon-panel rounded-md flex flex-col sm:hidden">
          <div className="edge-line"></div>
          <div className="edge-line-vertical"></div>

          <button
            onClick={() => {
              navigate("/dashboard");
              setMenuOpen(false);
            }}
            className="px-4 py-2 text-left hover:bg-[#2b2b2b] transition"
          >
            Home
          </button>
          <button
            onClick={() => {
              navigate("/profile");
              setMenuOpen(false);
            }}
            className="px-4 py-2 text-left hover:bg-[#2b2b2b] transition"
          >
            Profile
          </button>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="px-4 py-2 text-left text-red-400 hover:bg-[#2b2b2b] transition"
          >
            Logout
          </button>
        </div>
      )}

      <style>{`
        .neon-header {
          background: rgba(18,18,18,0.9);
          backdrop-filter: blur(6px);
          border-bottom: 2px solid rgba(255,255,255,0.1);
          animation: glowPulse 3s ease-in-out infinite;
        }

        .neon-icon {
          color: #ef4444; /* brighter pink icon */
          transition: transform 0.3s ease;
        }
        .neon-icon:hover {
          transform: scale(1.1);
        }

        @keyframes glowPulse {
          0% { box-shadow: 0 0 10px rgba(255,255,255,0.05); }
          50% { box-shadow: 0 0 20px rgba(255,255,255,0.15); }
          100% { box-shadow: 0 0 10px rgba(255,255,255,0.05); }
        }

        .neon-button {
          padding: 8px 18px;
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

        /* Brighter colors */
        .neon-bright-blue {
          background-color: #38bdf8; /* sky-400 */
        }
        .neon-bright-green {
          background-color: #4ade80; /* green-400 */
        }
        .neon-bright-pink {
          background-color: #ef4444; /* pink-400 */
        }

        .neon-text {
          text-shadow: 0 0 6px #fff, 0 0 12px #38bdf8, 0 0 24px #38bdf8;
        }
      `}</style>
    </header>
  );
};

export default Header;
