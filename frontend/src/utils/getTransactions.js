// src/api/getTransactions.js
import axios from "axios";

const getTransactions = async (token) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/transactions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.data; // assuming backend sends { data: [...] }
};

export default getTransactions;