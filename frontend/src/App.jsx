import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import AllTransactions from "./pages/AllTransactions";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Goal from "./pages/Goal"; // ✅ Import the Goal page


const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/add-transaction" element={<PrivateRoute><AddTransaction /></PrivateRoute>} />
      <Route path="/all-transactions" element={<PrivateRoute><AllTransactions /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      
      <Route path="/goal" element={<PrivateRoute><Goal /></PrivateRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;