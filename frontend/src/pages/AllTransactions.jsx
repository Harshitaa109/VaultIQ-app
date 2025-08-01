import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/transactions`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTransactions(res.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTransactions((prev) => prev.filter((txn) => txn._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />
      <main className="p-6 pt-24 flex-1">
        <h2 className="text-2xl font-bold mb-4">All Transactions</h2>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : transactions.length === 0 ? (
          <p className="text-gray-500">No transactions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-blue-100 text-blue-800">
                  <th className="py-3 px-4 border-b text-left">Title</th>
                  <th className="py-3 px-4 border-b text-left">Amount</th>
                  <th className="py-3 px-4 border-b text-left">Type</th>
                  <th className="py-3 px-4 border-b text-left">Date</th>
                  <th className="py-3 px-4 border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{txn.title}</td>
                    <td className="py-2 px-4 border-b font-medium">₹{txn.amount}</td>
                    <td
                      className={`py-2 px-4 border-b font-semibold ${
                        txn.type === "income" ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {txn.type}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {new Date(txn.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => deleteTransaction(txn._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllTransactions;