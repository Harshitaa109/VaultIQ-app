import React, { useEffect, useState } from "react";
import { getMonthlyGoal, setMonthlyGoal } from "../utils/goalService";
import getCurrentUser from "../utils/getCurrentUser";

const Goal = () => {
  const [incomeGoal, setIncomeGoal] = useState(0);
  const [expenseGoal, setExpenseGoal] = useState(0);
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));

  useEffect(() => {
    const fetchGoal = async () => {
      const data = await getMonthlyGoal(month);
      setIncomeGoal(data.incomeGoal || 0);
      setExpenseGoal(data.expenseGoal || 0);
    };
    fetchGoal();
  }, [month]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setMonthlyGoal({ incomeGoal, expenseGoal, month });
    alert("Goals saved!");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Set Monthly Goals</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Month</label>
        <input type="month" value={month} onChange={e => setMonth(e.target.value)} className="border p-2 w-full mb-4" />
        
        <label className="block mb-2">Income Goal</label>
        <input type="number" value={incomeGoal} onChange={e => setIncomeGoal(Number(e.target.value))} className="border p-2 w-full mb-4" />
        
        <label className="block mb-2">Expense Goal</label>
        <input type="number" value={expenseGoal} onChange={e => setExpenseGoal(Number(e.target.value))} className="border p-2 w-full mb-4" />
        
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save Goals</button>
      </form>
    </div>
  );
};

export default Goal;