import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white">
      {/* Background animated gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.1),_transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(0,0,0,0.2),_transparent_60%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="text-center lg:text-left space-y-6">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Welcome to <span className="text-yellow-300">VaultIQ</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-100 max-w-xl mx-auto lg:mx-0">
            Smarter control over your money. Track, save, and grow with
            intelligence and style.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
            <Link
              to="/login"
              className="relative inline-block px-8 py-3 text-lg font-semibold text-indigo-900 bg-white rounded-lg shadow-lg overflow-hidden group"
            >
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            </Link>
            <Link
              to="/signup"
              className="relative inline-block px-8 py-3 text-lg font-semibold text-white border border-white rounded-lg shadow-lg overflow-hidden group"
            >
              <span className="relative z-10">Sign Up</span>
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            </Link>
          </div>
        </div>

        {/* Right Side Illustration */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-72 h-72 lg:w-96 lg:h-96">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-300 via-pink-300 to-purple-400 animate-pulse opacity-70 blur-3xl"></div>
            <div className="relative rounded-xl bg-white/10 p-8 backdrop-blur-lg border border-white/20 shadow-xl">
              <h2 className="text-2xl font-semibold mb-4 text-yellow-200">
                Why VaultIQ?
              </h2>
              <ul className="text-left text-base text-gray-100 space-y-3">
                <li>• Track your income and expenses effortlessly</li>
                <li>• Set goals and monitor progress</li>
                <li>• Smart insights to grow savings</li>
                <li>• Beautiful, futuristic dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
