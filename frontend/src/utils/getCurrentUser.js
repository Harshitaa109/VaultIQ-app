import axios from "axios";

const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/auth/current`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Added Bearer prefix
        },
      }
    );
    return res.data.user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

export default getCurrentUser;