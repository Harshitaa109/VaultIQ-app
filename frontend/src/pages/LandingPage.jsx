import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
      <h1 className="text-5xl font-bold mb-6">Welcome to FinTrack</h1>
      <p className="mb-8 text-lg">Your personal finance tracker</p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-white text-indigo-600 px-6 py-2 rounded shadow hover:bg-gray-100"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-white text-indigo-600 px-6 py-2 rounded shadow hover:bg-gray-100"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;