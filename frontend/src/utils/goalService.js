import axiosInstance from "./axiosInstance";

export const getMonthlyGoal = async (month) => {
  try {
    const response = await axiosInstance.get(`/goals/${month}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly goal:", error);
    throw error;
  }
};

export const setMonthlyGoal = async (goalData) => {
  try {
    const response = await axiosInstance.post("/goals", goalData);
    return response.data;
  } catch (error) {
    console.error("Error setting monthly goal:", error);
    throw error;
  }
};