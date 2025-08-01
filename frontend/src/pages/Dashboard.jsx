import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import getCurrentUser from "../utils/getCurrentUser";
import { getMonthlyGoal, setMonthlyGoal } from "../utils/goalService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [user, setUser] = useState(null);
  const [goal, setGoal] = useState({ incomeGoal: 0, expenseGoal: 0 });
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [incomeInput, setIncomeInput] = useState(0);
  const [expenseInput, setExpenseInput] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchSummary();
    fetchGoal();
  }, [month]);

  const fetchUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error("User fetch error:", error?.response?.data || error.message);
    }
  };

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/transactions/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummary(res.data);
    } catch (error) {
      console.error("Summary fetch error:", error?.response?.data || error.message);
    }
  };

  const fetchGoal = async () => {
    try {
      const data = await getMonthlyGoal(month);
      setGoal(data || { incomeGoal: 0, expenseGoal: 0 });
      setIncomeInput(data?.incomeGoal || 0);
      setExpenseInput(data?.expenseGoal || 0);
    } catch (error) {
      console.error("Goal fetch error:", error?.response?.data || error.message);
    }
  };

  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedGoal = await setMonthlyGoal({
        incomeGoal: incomeInput,
        expenseGoal: expenseInput,
        month,
      });
      setGoal(updatedGoal);
      alert("Monthly goals updated successfully!");
    } catch (error) {
      console.error("Goal update error:", error?.response?.data || error.message);
    }
  };

  const getFinancialTip = () => {
    const { income, expense } = summary;
    if (income === 0 && expense === 0) {
      return "Start tracking your income and expenses to see helpful insights!";
    } else if (income > 0 && expense === 0) {
      return "You're saving 100% of your income — consider investing!";
    } else if (income === 0 && expense > 0) {
      return "You're spending without income. Try finding income sources!";
    } else if (expense > income) {
      return "Your expenses are higher than income. Cut unnecessary costs!";
    } else if (expense === income) {
      return "You're breaking even. Aim to reduce spending and grow savings.";
    } else {
      const savings = income - expense;
      if (savings >= income * 0.3) {
        return "Awesome! You're saving a good portion of your income. Keep it up!";
      } else {
        return "You're saving, but there’s room to improve your spending habits.";
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d0f] text-white pt-16 relative overflow-hidden">
      {/* Tech grid background */}
      <div className="tech-grid"></div>

      <Header />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-10">
        {/* Welcome */}
        <section className="text-center">
          <h2 className="text-4xl font-bold neon-text font-orbitron">
            Hello, {user?.name || "User"}!
          </h2>
          <p className="text-gray-300 mt-2 text-sm sm:text-base font-inter">
            Welcome to your futuristic finance dashboard...
          </p>
        </section>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="neon-card neon-green">
            <div className="edge-line"></div>
            <div className="edge-line-vertical"></div>
            <h3 className="text-lg font-semibold font-inter">Income</h3>
            <p className="text-2xl font-bold mt-1">₹{summary.income}</p>
          </div>
          <div className="neon-card neon-red">
            <div className="edge-line"></div>
            <div className="edge-line-vertical"></div>
            <h3 className="text-lg font-semibold font-inter">Expense</h3>
            <p className="text-2xl font-bold mt-1">₹{summary.expense}</p>
          </div>
          <div className="neon-card neon-blue">
            <div className="edge-line"></div>
            <div className="edge-line-vertical"></div>
            <h3 className="text-lg font-semibold font-inter">Balance</h3>
            <p className="text-2xl font-bold mt-1">₹{summary.balance}</p>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => navigate("/add-transaction")}
            className="neon-button gradient-btn"
          >
            Add Transaction
          </button>
          <button
            onClick={() => navigate("/all-transactions")}
            className="neon-button gradient-btn"
          >
            View All Transactions
          </button>
        </section>

        {/* Monthly Goals Section */}
        <section className="neon-panel space-y-8">
          <div className="edge-line"></div>
          <div className="edge-line-vertical"></div>
          <h3 className="text-2xl font-bold text-center text-indigo-400 font-orbitron">
            Monthly Goals
          </h3>

          <form
            onSubmit={handleGoalSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div>
              <label className="block text-sm font-medium mb-1 font-inter">Month</label>
              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="cool-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 font-inter">
                Income Goal
              </label>
              <input
                type="number"
                value={incomeInput}
                onChange={(e) => setIncomeInput(Number(e.target.value))}
                className="cool-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 font-inter">
                Expense Limit
              </label>
              <input
                type="number"
                value={expenseInput}
                onChange={(e) => setExpenseInput(Number(e.target.value))}
                className="cool-input"
              />
            </div>
          </form>

          <div className="text-center">
            <button onClick={handleGoalSubmit} className="neon-button gradient-btn">
              Save Monthly Goals
            </button>
          </div>

          {/* Progress Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="progress-card neon-green">
              <div className="edge-line"></div>
              <div className="edge-line-vertical"></div>
              <h4 className="text-lg font-semibold font-inter">Income Progress</h4>
              <p className="text-sm mt-1">
                Current: ₹{summary.income} / Goal: ₹{goal.incomeGoal}
              </p>
              <div className="w-full bg-gray-800 h-4 rounded-full mt-2">
                <div
                  className="h-4 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      100,
                      (summary.income / (goal.incomeGoal || 1)) * 100
                    )}%`,
                    backgroundColor: "#22c55e",
                  }}
                />
              </div>
            </div>

            <div className="progress-card neon-red">
              <div className="edge-line"></div>
              <div className="edge-line-vertical"></div>
              <h4 className="text-lg font-semibold font-inter">Expense Progress</h4>
              <p className="text-sm mt-1">
                Current: ₹{summary.expense} / Limit: ₹{goal.expenseGoal}
              </p>
              <div className="w-full bg-gray-800 h-4 rounded-full mt-2">
                <div
                  className="h-4 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      100,
                      (summary.expense / (goal.expenseGoal || 1)) * 100
                    )}%`,
                    backgroundColor: "#ef4444",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Pie Chart */}
          <div className="neon-panel">
            <div className="edge-line"></div>
            <div className="edge-line-vertical"></div>
            <h4 className="text-lg font-semibold text-center mb-4 text-indigo-400 font-inter">
              Budget Usage
            </h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Income", value: summary.income || 0 },
                    { name: "Expense", value: summary.expense || 0 },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Financial Tip */}
          <div className="neon-panel">
            <div className="edge-line"></div>
            <div className="edge-line-vertical"></div>
            <h4 className="text-lg font-bold mb-2 text-yellow-300 font-inter">
              Smart Financial Tip
            </h4>
            <p className="text-base text-gray-300 leading-relaxed">
              {getFinancialTip()}
            </p>
          </div>
        </section>
      </main>

      <style>{`
        /* Import fonts */
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Inter:wght@400;600&display=swap');

        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }

        /* Background grid animation */
        .tech-grid {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(30,30,30,0.4), #0b0d0f),
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.03),
              rgba(255,255,255,0.03) 1px,
              transparent 1px,
              transparent 60px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.03),
              rgba(255,255,255,0.03) 1px,
              transparent 1px,
              transparent 60px
            );
          z-index: 0;
          animation: grid-move 20s linear infinite;
        }

        @keyframes grid-move {
          0% { background-position: 0 0, 0 0, 0 0; }
          100% { background-position: 100px 100px, 0 0, 0 0; }
        }

        /* Cool gradient button */
        .gradient-btn {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #22c55e);
          background-size: 200% 200%;
          animation: gradientMove 5s ease infinite;
          border: none;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Neon border, glow, edge scan animations (reuse your previous styles) */
        @keyframes neon-border {
          0% { border-image-source: linear-gradient(45deg, #22c55e, #3b82f6); }
          50% { border-image-source: linear-gradient(225deg, #3b82f6, #8b5cf6); }
          100% { border-image-source: linear-gradient(45deg, #22c55e, #3b82f6); }
        }

        @keyframes glowPulse {
          0% { box-shadow: 0 0 10px rgba(255,255,255,0.05); }
          50% { box-shadow: 0 0 20px rgba(255,255,255,0.1); }
          100% { box-shadow: 0 0 10px rgba(255,255,255,0.05); }
        }

        @keyframes cornerGlow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes edgeScan {
          0% { transform: translateX(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }

        @keyframes edgeScanVertical {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }

        .neon-card,
        .neon-panel {
          position: relative;
          background: rgba(20,20,20,0.8);
          backdrop-filter: blur(10px);
          padding: 20px;
          border-radius: 16px;
          border: 2px solid transparent;
          border-image-slice: 1;
          animation: neon-border 6s linear infinite, glowPulse 3s ease-in-out infinite;
          transition: transform 0.3s ease;
          overflow: hidden;
        }

        .neon-card:hover,
        .neon-panel:hover { transform: scale(1.04); }

        .neon-card::before,
        .neon-card::after,
        .neon-panel::before,
        .neon-panel::after {
          content: "";
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid #3b82f6;
          animation: cornerGlow 2s infinite ease-in-out;
          z-index: 2;
        }

        .neon-card::before,
        .neon-panel::before {
          top: 8px; left: 8px;
          border-right: none; border-bottom: none;
        }
        .neon-card::after,
        .neon-panel::after {
          bottom: 8px; right: 8px;
          border-left: none; border-top: none;
        }

        .edge-line {
          position: absolute;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
          height: 2px;
          width: 100%;
          top: 0;
          left: 0;
          animation: edgeScan 3s linear infinite;
          opacity: 0.4;
          z-index: 1;
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
          opacity: 0.4;
          z-index: 1;
        }

        .progress-card {
          background: #111;
          padding: 20px;
          border-radius: 14px;
          position: relative;
          overflow: hidden;
          border: 1px solid #333;
          animation: glowPulse 3s ease-in-out infinite;
        }

        .progress-card::before,
        .progress-card::after {
          content: "";
          position: absolute;
          width: 15px;
          height: 15px;
          border: 2px solid #8b5cf6;
          animation: cornerGlow 2.5s infinite ease-in-out;
          z-index: 2;
        }
        .progress-card::before {
          top: 6px; left: 6px;
          border-right: none; border-bottom: none;
        }
        .progress-card::after {
                    bottom: 6px; right: 6px;
          border-left: none; border-top: none;
        }

        .progress-card .edge-line {
          position: absolute;
          background: linear-gradient(90deg, transparent, #8b5cf6, transparent);
          height: 2px;
          width: 100%;
          top: 0;
          left: 0;
          animation: edgeScan 4s linear infinite;
          opacity: 0.5;
          z-index: 1;
        }

        .progress-card .edge-line-vertical {
          position: absolute;
          background: linear-gradient(180deg, transparent, #8b5cf6, transparent);
          width: 2px;
          height: 100%;
          top: 0;
          left: 0;
          animation: edgeScanVertical 4s linear infinite;
          animation-delay: 2s;
          opacity: 0.5;
          z-index: 1;
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
        .neon-button::after {
          content: "";
          position: absolute;
          inset: 0;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 10px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .neon-button:hover::after {
          opacity: 1;
        }
        .neon-button:hover {
          transform: scale(1.05);
        }

        /* Input styling */
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

        /* Accent color classes */
        .neon-green { background-color: rgba(34,197,94,0.15); }
        .neon-blue { background-color: rgba(59,130,246,0.15); }
        .neon-red { background-color: rgba(239,68,68,0.15); }
        .neon-purple { background-color: rgba(139,92,246,0.15); }

        .neon-text {
          text-shadow: 0 0 6px #fff, 0 0 12px #3b82f6, 0 0 24px #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;

