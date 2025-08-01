import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
    description: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/transactions`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to add transaction. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <Header />
      <div className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Transaction</h2>

        {error && (
          <p className="text-red-600 mb-4 text-sm border border-red-400 rounded p-2 bg-red-100">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6">
          {/* Title */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Grocery Shopping"
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Type */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Salary, Grocery"
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Optional"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;